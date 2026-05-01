import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    let bookingId;
    try {
      bookingId = new ObjectId(id);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid booking ID' }),
        { status: 400 }
      );
    }

    const bookingsCollection = await dbConnect(collections.booking);
    const booking = await bookingsCollection.findOne({ _id: bookingId });

    if (!booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found' }),
        { status: 404 }
      );
    }

    // Authorization: Only client or admin can view booking details
    if (
      session.user.role !== 'Admin' &&
      booking.clientId !== session.user.id
    ) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized to view this booking' }),
        { status: 403 }
      );
    }

    const normalized = {
      ...booking,
      _id: booking._id.toString(),
      checkInDate: booking.checkInDate?.toISOString()
    };

    return new Response(
      JSON.stringify({ booking: normalized }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch booking error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500 }
    );
  }
}


export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    let bookingId;
    try {
      bookingId = new ObjectId(id);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid booking ID' }),
        { status: 400 }
      );
    }

    const bookingsCollection = await dbConnect(collections.booking);
    const booking = await bookingsCollection.findOne({ _id: bookingId });

    if (!booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found' }),
        { status: 404 }
      );
    }

    // Authorization: Only client can cancel their booking (if pending payment)
    if (booking.clientId !== session.user.id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized to modify this booking' }),
        { status: 403 }
      );
    }

    const { action } = await request.json();

    if (!action || action !== 'cancel') {
      return new Response(
        JSON.stringify({ error: 'Invalid action' }),
        { status: 400 }
      );
    }

    // Only allow cancellation if payment not completed
    if (booking.paymentStatus === 'completed') {
      return new Response(
        JSON.stringify({ error: 'Cannot cancel a paid booking. Contact support.' }),
        { status: 400 }
      );
    }

    // Cancel booking
    await bookingsCollection.updateOne(
      { _id: bookingId },
      {
        $set: {
          status: 'cancelled',
          updatedAt: new Date(),
        }
      }
    );

    // Cancel job in caregiver's list
    const caretakersCollection = await dbConnect(collections.CARETAKERS);
    await caretakersCollection.updateOne(
      { 'jobs.bookingId': id },
      {
        $set: {
          'jobs.$.status': 'cancelled',
          'jobs.$.updatedAt': new Date(),
        }
      }
    );

    return new Response(
      JSON.stringify({ message: 'Booking cancelled successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Update booking error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500 }
    );
  }
}
