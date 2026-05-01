import Stripe from 'stripe';
import { dbConnect, collections } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
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
        const { bookingId, caretakerId } = paymentIntent.metadata;

        if (bookingId && caretakerId) {
          // Update booking status to confirmed and payment completed
          const booking = await bookingsCollection.findOneAndUpdate(
            { _id: new ObjectId(bookingId) },
            {
              $set: {
                status: 'confirmed',
                paymentStatus: 'completed',
                updatedAt: new Date(),
              }
            },
            { returnDocument: 'after' }
          );

          // Update caregiver's job status to accepted (pending caregiver acceptance)
          if (booking.value) {
            await caretakersCollection.updateOne(
              {
                _id: new ObjectId(caretakerId),
                'jobs.bookingId': bookingId,
              },
              {
                $set: {
                  'jobs.$.status': 'waiting_acceptance', // Waiting for caregiver acceptance
                  'jobs.$.paymentConfirmed': true,
                  'jobs.$.updatedAt': new Date(),
                }
              }
            );
          }

          console.log('Booking confirmed and payment processed:', bookingId);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const { bookingId } = paymentIntent.metadata;

        if (bookingId) {
          // Update booking payment status to failed
          await bookingsCollection.updateOne(
            { _id: new ObjectId(bookingId) },
            {
              $set: {
                paymentStatus: 'failed',
                updatedAt: new Date(),
              }
            }
          );

          console.log('Payment failed for booking:', bookingId);
        }
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object;
        const { bookingId } = paymentIntent.metadata;

        if (bookingId) {
          // Update booking payment status to cancelled
          await bookingsCollection.updateOne(
            { _id: new ObjectId(bookingId) },
            {
              $set: {
                paymentStatus: 'cancelled',
                status: 'cancelled',
                updatedAt: new Date(),
              }
            }
          );

          console.log('Payment cancelled for booking:', bookingId);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed', details: error.message }),
      { status: 500 }
    );
  }
}
