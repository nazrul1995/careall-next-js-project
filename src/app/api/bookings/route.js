import { dbConnect, collections } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    // ✅ Role check
    if (!['Client', 'User'].includes(session.user.role)) {
      return new Response(
        JSON.stringify({ error: 'Only clients can book services' }),
        { status: 403 }
      );
    }

    const body = await request.json();
    console.log(body)
    const {
      clientEmail,
      caregiverEmail,
      caregiverName,
      caregiverImage,
      serviceType,
      checkInDate,
      startTime,
      endTime,
      durationHours,
      hourlyRate,
      serviceCharge,
      totalPrice,
      notes,
    } = body;

  

    // ✅ Validate numbers
    if (Number(durationHours) <= 0 || Number(totalPrice) <= 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid duration or price' }),
        { status: 400 }
      );
    }

    const caregiverCollection = await dbConnect(collections.caregivers);
    const caregiver = await caregiverCollection.findOne({
      email: caregiverEmail,
    });

    if (!caregiver) {
      return new Response(
        JSON.stringify({ error: 'Caregiver not found' }),
        { status: 404 }
      );
    }

    // ✅ Booking document
    const booking = {
      clientEmail,
      caregiverEmail,
      caregiverName,
      caregiverImage,
      serviceType,
      checkInDate: new Date(checkInDate),
      startTime,
      endTime,
      durationHours: Number(durationHours),
      hourlyRate: Number(hourlyRate),
      serviceCharge: Number(serviceCharge),
      totalPrice: Number(totalPrice),
      notes: notes || '',
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const bookingsCollection = await dbConnect(collections.booking);
    const result = await bookingsCollection.insertOne(booking);

    const bookingId = result.insertedId;


    await caregiverCollection.updateOne(
      { _id: caregiver._id },
      {
        $inc:{jobs: 1},
        $set: { updatedAt: new Date() },
        $push:{bookedDates: new Date(checkInDate)}
      },

      { upsert: false }
    );

    return new Response(
      JSON.stringify({
        message: 'Booking created successfully',
        bookingId: bookingId.toString(),
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}

// ====================== GET ======================
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || session.user.email;
    const status = searchParams.get('status');
    const role = session.user.role;

    const bookingsCollection = await dbConnect(collections.booking);

    let query = {};

    if (role === 'Client' || role === 'User') {
      query.clientEmail = email;
    } else if (role === 'Caregiver') {
      query.caregiverEmail = email;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid role' }), { status: 403 });
    }

    if (status) query.status = status;

    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(
      JSON.stringify({ bookings }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking GET Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

// ====================== PUT (Update Status) ======================
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { bookingId, status, notes } = body;

    if (!bookingId || !status) {
      return new Response(JSON.stringify({ error: 'Booking ID and status are required' }), { status: 400 });
    }

    const bookingsCollection = await dbConnect(collections.booking);
    const booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });

    if (!booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    // Authorization: Only involved parties can update
    const isClient = booking.clientEmail === session.user.email;
    const isCaregiver = booking.caregiverEmail === session.user.email;

    if (!isClient && !isCaregiver) {
      return new Response(JSON.stringify({ error: 'Not authorized' }), { status: 403 });
    }

    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (notes) updateData.notes = notes;

    // Optional: Add more logic (e.g., paymentStatus when status becomes 'confirmed')

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: 'Booking updated successfully', status }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking PUT Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}

// ====================== DELETE (Cancel Booking) ======================
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return new Response(JSON.stringify({ error: 'Booking ID is required' }), { status: 400 });
    }

    const bookingsCollection = await dbConnect(collections.booking);
    const booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });

    if (!booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    const isClient = booking.clientEmail === session.user.email;
    const isCaregiver = booking.caregiverEmail === session.user.email;

    if (!isClient && !isCaregiver) {
      return new Response(JSON.stringify({ error: 'Not authorized to cancel this booking' }), { status: 403 });
    }

    // Optional: Only allow cancellation if status is pending
    if (booking.status !== 'pending') {
      return new Response(JSON.stringify({ error: 'Only pending bookings can be cancelled' }), { status: 400 });
    }

    await bookingsCollection.deleteOne({ _id: new ObjectId(bookingId) });

    return new Response(
      JSON.stringify({ message: 'Booking cancelled successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking DELETE Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}