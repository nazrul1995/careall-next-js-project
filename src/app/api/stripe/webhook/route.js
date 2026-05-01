import Stripe from 'stripe';
import { dbConnect, collections } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return new Response(
      JSON.stringify({ error: 'Invalid signature' }),
      { status: 400 }
    );
  }

  try {
    const bookingsCollection = await dbConnect(collections.booking);
    const caretakersCollection = await dbConnect(collections.CARETAKERS);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const { bookingId } = paymentIntent.metadata;

        // Update booking payment status
        const booking = await bookingsCollection.findOne({
          _id: new ObjectId(bookingId),
        });

        if (booking) {
          await bookingsCollection.updateOne(
            { _id: new ObjectId(bookingId) },
            {
              $set: {
                paymentStatus: 'completed',
                status: 'confirmed', // Auto-confirm after payment
                stripePaymentIntentId: paymentIntent.id,
                updatedAt: new Date(),
              },
            }
          );

          // Update caregiver job status to 'accepted'
          await caretakersCollection.updateOne(
            { _id: new ObjectId(booking.caretakerId) },
            {
              $set: {
                'jobs.$[elem].status': 'accepted',
                'jobs.$[elem].updatedAt': new Date(),
              },
            },
            {
              arrayFilters: [{ 'elem.bookingId': bookingId }],
            }
          );

          console.log(`Payment succeeded for booking ${bookingId}`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const { bookingId } = paymentIntent.metadata;

        // Update booking payment status to failed
        await bookingsCollection.updateOne(
          { _id: new ObjectId(bookingId) },
          {
            $set: {
              paymentStatus: 'failed',
              updatedAt: new Date(),
            },
          }
        );

        console.log(`Payment failed for booking ${bookingId}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;

        // Find booking by payment intent ID
        const booking = await bookingsCollection.findOne({
          stripePaymentIntentId: paymentIntentId,
        });

        if (booking) {
          // Update booking status
          await bookingsCollection.updateOne(
            { _id: booking._id },
            {
              $set: {
                status: 'cancelled',
                paymentStatus: 'refunded',
                updatedAt: new Date(),
              },
            }
          );

          // Update caregiver job status
          await caretakersCollection.updateOne(
            { _id: new ObjectId(booking.caretakerId) },
            {
              $set: {
                'jobs.$[elem].status': 'cancelled',
                'jobs.$[elem].updatedAt': new Date(),
              },
            },
            {
              arrayFilters: [{ 'elem.bookingId': booking._id.toString() }],
            }
          );

          console.log(`Payment refunded for booking ${booking._id}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 500 }
    );
  }
}
