'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { MdBook, MdCancel, MdCheckCircle, MdDelete, MdInfo, MdLockClock, MdPayment } from 'react-icons/md';

export default function BookingsList({ onRefresh }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed, cancelled
  const [selectedBooking, setSelectedBooking] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, [onRefresh]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/bookings');

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cancel' }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to cancel booking');
        }

        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
        fetchBookings();
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  const handlePayment = (booking) => {
    if (booking.paymentStatus === 'completed') {
      Swal.fire('Already Paid', 'Payment for this booking is already completed.', 'info');
      return;
    }
    router.push(`/dashboard/client/payment/${booking._id}`);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const statusBadgeColor = (status, paymentStatus) => {
    if (status === 'confirmed' && paymentStatus === 'completed')
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    if (status === 'completed') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (status === 'cancelled') return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          Error loading bookings: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-50 dark:bg-slate-700 rounded-lg p-5 border border-gray-200 dark:border-slate-600 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {booking.caretakerName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColor(booking.status, booking.paymentStatus)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {booking.serviceType}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {booking.durationHours} hours
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Price</p>
                      <p className="font-bold text-primary text-lg">${booking.totalPrice}</p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-600 rounded border border-gray-200 dark:border-slate-500">
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Notes:</span> {booking.notes}
                      </p>
                    </div>
                  )}

                  {/* Payment Status */}
                  <div className="mt-3 flex items-center gap-2">
                    {booking.paymentStatus === 'completed' ? (
                      <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
                        <MdCheckCircle/> Payment Completed
                      </span>
                    ) : booking.paymentStatus === 'pending' ? (
                      <span className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        <MdLockClock /> Pending Payment
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 font-medium">
                        <MdCancel /> Payment Failed
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-col">
                  {booking.paymentStatus === 'pending' && booking.status !== 'cancelled' && (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition flex items-center gap-2 whitespace-nowrap"
                    >
                      <MdPayment/> Pay Now
                    </button>
                  )}

                  {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition flex items-center gap-2 whitespace-nowrap"
                    >
                      <MdDelete /> Cancel
                    </button>
                  )}

                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-slate-500 transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <MdInfo /> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-12 text-center border border-gray-200 dark:border-slate-600">
          <MdBook className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">No bookings found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Start by booking a caregiver service
          </p>
          <button
            onClick={() => router.push('/services')}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Browse Services
          </button>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Booking Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Caregiver</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedBooking.caretakerName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Service Type</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedBooking.serviceType}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check-in Date</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {new Date(selectedBooking.checkInDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedBooking.durationHours} hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hourly Rate</p>
                  <p className="font-bold text-slate-900 dark:text-white">${selectedBooking.hourlyRate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service Charge</p>
                  <p className="font-bold text-slate-900 dark:text-white">${selectedBooking.serviceCharge}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Price</p>
                  <p className="font-bold text-primary text-lg">${selectedBooking.totalPrice}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notes</p>
                  <p className="text-slate-900 dark:text-white">{selectedBooking.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <p className={`font-bold text-sm px-3 py-1 rounded-full inline-block ${statusBadgeColor(selectedBooking.status, selectedBooking.paymentStatus)}`}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
                    <p className={`font-bold text-sm px-3 py-1 rounded-full inline-block ${
                      selectedBooking.paymentStatus === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
