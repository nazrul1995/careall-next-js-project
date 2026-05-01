import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { dbConnect, collections } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Please sign in first.' }),
        { status: 401 }
      );
    }

    // Role-based authorization: Only Client/User can make payments
    if (session.user.role !== 'Client' && session.user.role !== 'User') {
      return new Response(
        JSON.stringify({ error: 'Forbidden. Only clients can make payments.' }),
        { status: 403 }
      );
    }

    const { bookingId, amount, currency = 'usd' } = await request.json();

    // Validate required fields
    if (!bookingId || !amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid booking ID or amount' }),
        { status: 400 }
      );
    }

    // Verify booking exists and belongs to the client
    const bookingsCollection = await dbConnect(collections.booking);
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(bookingId),
      clientId: session.user.id,
    });

    if (!booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found or does not belong to you' }),
        { status: 404 }
      );
    }

    // Prevent double payment
    if (booking.paymentStatus === 'completed') {
      return new Response(
        JSON.stringify({ error: 'This booking has already been paid' }),
        { status: 400 }
      );
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        bookingId: bookingId,
        clientId: session.user.id,
        clientEmail: session.user.email,
      },
      description: `Booking payment for ${booking.serviceType} - ${booking.caretakerName}`,
    });

    // Update booking with payment intent ID
    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          stripePaymentIntentId: paymentIntent.id,
          updatedAt: new Date(),
        },
      }
    );

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create payment intent',
        details: error.message 
      }),
      { status: 500 }
    );
  }
}
