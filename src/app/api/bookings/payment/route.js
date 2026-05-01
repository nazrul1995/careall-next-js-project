import Stripe from 'stripe';
import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Role-based check: Only clients can make payments
    if (session.user.role !== 'Client' && session.user.role !== 'User') {
      return new Response(
        JSON.stringify({ error: 'Only clients can make payments' }),
        { status: 403 }
      );
    }

    const { bookingId } = await request.json();

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: 'Booking ID is required' }),
        { status: 400 }
      );
    }

    // Get booking from database
    const bookingsCollection = await dbConnect(collections.booking);
    let booking;
    try {
      booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid booking ID' }),
        { status: 400 }
      );
    }

    if (!booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found' }),
        { status: 404 }
      );
    }

    // Verify booking belongs to logged-in client
    if (booking.clientId !== session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. This booking does not belong to you.' }),
        { status: 403 }
      );
    }

    // Check if already paid
    if (booking.paymentStatus === 'completed') {
      return new Response(
        JSON.stringify({ 
          error: 'Booking already paid',
          message: 'Payment has already been processed for this booking'
        }),
        { status: 400 }
      );
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId: bookingId,
        clientId: session.user.id,
        caretakerId: booking.caretakerId,
        serviceType: booking.serviceType,
      },
      description: `Booking for ${booking.serviceType} - ${booking.caretakerName}`,
    });

    // Update booking with Stripe payment intent ID
    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          stripePaymentIntentId: paymentIntent.id,
          updatedAt: new Date(),
        }
      }
    );

    return new Response(
      JSON.stringify({
        message: 'Payment intent created',
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: booking.totalPrice,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment intent error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create payment intent', details: error.message }),
      { status: 500 }
    );
  }
}
