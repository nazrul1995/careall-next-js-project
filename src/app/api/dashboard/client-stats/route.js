import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Role-based check: Only clients can view dashboard
    if (session.user.role !== 'Client' && session.user.role !== 'User') {
      return new Response(
        JSON.stringify({ error: 'Only clients can view dashboard' }),
        { status: 403 }
      );
    }

    const bookingsCollection = await dbConnect(collections.booking);

    // Get all client's bookings
    const bookings = await bookingsCollection
      .find({ clientId: session.user.id })
      .toArray();

    // Calculate statistics
    const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      completedBookings: bookings.filter(b => b.status === 'completed').length,
      cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
      
      // Payment stats
      paidBookings: bookings.filter(b => b.paymentStatus === 'completed').length,
      pendingPaymentBookings: bookings.filter(b => b.paymentStatus === 'pending').length,
      totalSpent: bookings
        .filter(b => b.paymentStatus === 'completed')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
      
      // Recent bookings
      recentBookings: bookings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(b => ({
          _id: b._id.toString(),
          caretakerName: b.caretakerName,
          serviceType: b.serviceType,
          checkInDate: b.checkInDate?.toISOString(),
          totalPrice: b.totalPrice,
          status: b.status,
          paymentStatus: b.paymentStatus,
        }))
    };

    return new Response(
      JSON.stringify({ stats }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500 }
    );
  }
}
