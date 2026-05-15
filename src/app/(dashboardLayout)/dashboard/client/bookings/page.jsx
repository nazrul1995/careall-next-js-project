'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdAttachMoney, 
  MdDelete, 
  MdEdit, 
  MdPayment 
} from 'react-icons/md';

const ClientBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();


  useEffect(() => {
     const fetchBookings = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/bookings?email=${session.user.email}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };
    fetchBookings();
  }, [session]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const res = await fetch(`/api/bookings?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Booking cancelled successfully');
        fetchBookings();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to cancel booking');
    }
  };

  // Handle Payment (You can redirect to payment page)
  const handlePayment = (booking) => {
    alert(`Redirecting to payment for booking #${booking._id.slice(-6)}`);
    // Example: router.push(`/payment/${booking._id}`);
  };

  // Handle Update (Example: Open modal or change status)
  const handleUpdate = (booking) => {
    const newStatus = prompt('Update status (pending/confirmed/cancelled):', booking.status);
    if (!newStatus) return;

    fetch(`/api/bookings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId: booking._id, status: newStatus }),
    })
      .then(res => res.json())
      .then(() => {
        alert('Booking updated!');
        fetchBookings();
      })
      .catch(err => console.error(err));
  };

  if (loading) return <div className="text-center py-12">Loading your bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        My Bookings 
        <span className="text-lg font-normal text-slate-500">({bookings.length})</span>
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-slate-500 py-12">No bookings found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="py-5 px-6 text-left">Caregiver</th>
                  <th className="py-5 px-6 text-left">Service</th>
                  <th className="py-5 px-6 text-left">Date & Time</th>
                  <th className="py-5 px-6 text-center">Duration</th>
                  <th className="py-5 px-6 text-right">Amount</th>
                  <th className="py-5 px-6 text-center">Status</th>
                  <th className="py-5 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={booking.caregiverImage}
                          alt={booking.caregiverName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">{booking.caregiverName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-slate-600 dark:text-slate-400">
                      {booking.serviceType}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <MdCalendarToday />
                        {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MdAccessTime />
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center font-medium">
                      {booking.durationHours} hrs
                    </td>
                    <td className="py-5 px-6 text-right font-bold text-lg">
                      ${booking.totalPrice}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium capitalize
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' : 
                          'bg-red-100 text-red-700 dark:bg-red-900/30'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(booking)}
                          className="p-3 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-2xl text-blue-600 transition"
                          title="Update"
                        >
                          <MdEdit size={20} />
                        </button>

                        <button
                          onClick={() => handlePayment(booking)}
                          className="p-3 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-2xl text-emerald-600 transition"
                          title="Pay Now"
                          disabled={booking.paymentStatus === 'paid'}
                        >
                          <MdPayment size={20} />
                        </button>

                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-3 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl text-red-600 transition"
                          title="Cancel"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={booking.caregiverImage}
                    alt={booking.caregiverName}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{booking.caregiverName}</h3>
                    <p className="text-slate-500">{booking.serviceType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <p className="text-slate-500">Date</p>
                    <p className="font-medium">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Time</p>
                    <p className="font-medium">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Duration</p>
                    <p className="font-medium">{booking.durationHours} hours</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Total</p>
                    <p className="font-bold text-lg text-primary">${booking.totalPrice}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-5">
                  <span className={`px-5 py-2 rounded-2xl text-sm font-medium capitalize
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(booking)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition"
                  >
                    <MdEdit /> Update
                  </button>

                  <button
                    onClick={() => handlePayment(booking)}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-2xl hover:bg-emerald-700 transition"
                    disabled={booking.paymentStatus === 'paid'}
                  >
                    <MdPayment /> Pay Now
                  </button>

                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-2xl hover:bg-red-700 transition"
                  >
                    <MdDelete /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClientBooking;