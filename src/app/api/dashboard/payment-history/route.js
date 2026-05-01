import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Role-based check: Only clients can view payment history
    if (session.user.role !== 'Client' && session.user.role !== 'User') {
      return new Response(
        JSON.stringify({ error: 'Only clients can view payment history' }),
        { status: 403 }
      );
    }

    const bookingsCollection = await dbConnect(collections.booking);

    // Get all paid bookings for this client
    const payments = await bookingsCollection
      .find({
        clientId: session.user.id,
        paymentStatus: 'completed'
      })
      .sort({ updatedAt: -1 })
      .toArray();

    const normalizedPayments = payments.map(p => ({
      _id: p._id.toString(),
      bookingId: p._id.toString(),
      caretakerName: p.caretakerName,
      serviceType: p.serviceType,
      amount: p.totalPrice,
      date: p.updatedAt?.toISOString(),
      status: p.status,
      stripePaymentIntentId: p.stripePaymentIntentId,
      checkInDate: p.checkInDate?.toISOString(),
      startTime: p.startTime,
      endTime: p.endTime,
      durationHours: p.durationHours,
    }));

    return new Response(
      JSON.stringify({
        payments: normalizedPayments,
        total: normalizedPayments.length,
        totalAmount: normalizedPayments.reduce((sum, p) => sum + p.amount, 0),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment history error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500 }
    );
  }
}
