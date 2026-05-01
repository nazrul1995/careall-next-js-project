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

    // Role-based check: Only caregivers can view jobs
    if (session.user.role !== 'Caregiver' && session.user.role !== 'Service Provider') {
      return new Response(
        JSON.stringify({ error: 'Only caregivers can view jobs' }),
        { status: 403 }
      );
    }

    // Get caregiver's profile to get their jobs
    const caretakersCollection = await dbConnect(collections.CARETAKERS);
    
    // Find caregiver by email or id
    const caregiver = await caretakersCollection.findOne({
      $or: [
        { email: session.user.email },
        { _id: new ObjectId(session.user.id) }
      ]
    });

    if (!caregiver) {
      return new Response(
        JSON.stringify({ error: 'Caregiver profile not found' }),
        { status: 404 }
      );
    }

    // Get jobs with optional filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // Filter by job status: pending, accepted, rejected, etc.

    let jobs = caregiver.jobs || [];

    // Filter by status if provided
    if (status) {
      jobs = jobs.filter(job => job.status === status);
    }

    // Sort by most recent first
    jobs = jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Enrich jobs with booking details
    const bookingsCollection = await dbConnect(collections.booking);
    const enrichedJobs = await Promise.all(
      jobs.map(async (job) => {
        const booking = await bookingsCollection.findOne({
          _id: new ObjectId(job.bookingId)
        });
        return {
          ...job,
          bookingDetails: booking ? {
            status: booking.status,
            paymentStatus: booking.paymentStatus,
            clientPhone: booking.clientPhone || null,
          } : {}
        };
      })
    );

    return new Response(
      JSON.stringify({
        jobs: enrichedJobs,
        total: enrichedJobs.length,
        caregiverId: caregiver._id.toString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch jobs error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Role-based check: Only caregivers can update jobs
    if (session.user.role !== 'Caregiver' && session.user.role !== 'Service Provider') {
      return new Response(
        JSON.stringify({ error: 'Only caregivers can update jobs' }),
        { status: 403 }
      );
    }

    const { bookingId, action } = await request.json();

    if (!bookingId || !action) {
      return new Response(
        JSON.stringify({ error: 'Booking ID and action are required' }),
        { status: 400 }
      );
    }

    // Validate action
    if (!['accept', 'reject', 'complete', 'cancel'].includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Must be: accept, reject, complete, or cancel' }),
        { status: 400 }
      );
    }

    const caretakersCollection = await dbConnect(collections.CARETAKERS);
    const bookingsCollection = await dbConnect(collections.booking);

    // Get booking to verify it exists and get caregiver info
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

    // Find caregiver and verify they own this job
    const caregiver = await caretakersCollection.findOne({
      $or: [
        { email: session.user.email },
        { _id: new ObjectId(session.user.id) }
      ]
    });

    if (!caregiver) {
      return new Response(
        JSON.stringify({ error: 'Caregiver profile not found' }),
        { status: 404 }
      );
    }

    const jobIndex = caregiver.jobs?.findIndex(j => j.bookingId === bookingId);
    if (jobIndex === undefined || jobIndex === -1) {
      return new Response(
        JSON.stringify({ error: 'Job not found for this caregiver' }),
        { status: 404 }
      );
    }

    // Map action to job status
    const statusMap = {
      accept: 'accepted',
      reject: 'rejected',
      complete: 'completed',
      cancel: 'cancelled'
    };

    const newJobStatus = statusMap[action];

    // Update job status in caregiver document
    await caretakersCollection.updateOne(
      { _id: caregiver._id, 'jobs.bookingId': bookingId },
      {
        $set: {
          'jobs.$.status': newJobStatus,
          'jobs.$.updatedAt': new Date(),
        }
      }
    );

    // Update booking status accordingly
    let bookingStatus = booking.status;
    if (action === 'accept') {
      bookingStatus = 'confirmed';
    } else if (action === 'reject' || action === 'cancel') {
      bookingStatus = 'cancelled';
    } else if (action === 'complete') {
      bookingStatus = 'completed';
    }

    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          status: bookingStatus,
          updatedAt: new Date(),
        }
      }
    );

    return new Response(
      JSON.stringify({
        message: `Job ${action}ed successfully`,
        bookingId,
        newStatus: newJobStatus,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Update job error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500 }
    );
  }
}
