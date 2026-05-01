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

    const caregiverCollection = await dbConnect(collections.caregiver);

    const caretaker = await caregiverCollection.findOne({
      email: caregiverEmail,
    });

    if (!caretaker) {
      return new Response(
        JSON.stringify({ error: 'Caretaker not found' }),
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

    // ✅ Job Task
    const jobTask = {
      bookingId,
      clientName: session.user.name,
      clientEmail: session.user.email,
      serviceType,
      checkInDate: new Date(checkInDate),
      startTime,
      endTime,
      durationHours,
      totalPrice,
      status: 'pending',
      notes,
      createdAt: new Date(),
    };

    // ✅ Push safely
    await caregiverCollection.updateOne(
      { _id: caretakerObjectId },
      {
        $push: {
          jobs: jobTask,
          bookedDates: new Date(checkInDate),
        },
        $set: { updatedAt: new Date() },
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

