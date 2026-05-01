'use client';

import React, { useState, useEffect } from 'react';
import { MdVisibility, MdCancel, MdReceipt, MdRefresh } from 'react-icons/md';

const ClientBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings'); // Adjust route if needed
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'All') return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      confirmed: 'bg-primary/10 text-primary',
      completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your care service bookings</p>
        </div>

        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          <MdRefresh className="text-xl" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
              filter === status
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Desktop Table / Mobile Cards */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400">No bookings found in this filter.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Caretaker</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-5 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-900 dark:text-white">{booking.serviceType}</div>
                        <div className="text-xs text-slate-500">with {booking.caretakerName}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium">
                          {new Date(booking.checkInDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="text-xs text-slate-500">
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {booking.caretakerImage && (
                            <img 
                              src={booking.caretakerImage} 
                              alt={booking.caretakerName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span className="text-sm font-medium">{booking.caretakerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-semibold text-slate-900 dark:text-white">
                        ${booking.totalPrice}
                      </td>
                      <td className="px-6 py-5">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="px-4 py-2 text-xs font-medium text-primary hover:bg-primary/5 rounded-xl border border-primary/20 transition flex items-center gap-1">
                            <MdVisibility /> View
                          </button>

                          {booking.status.toLowerCase() === 'pending' && (
                            <button className="px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition flex items-center gap-1">
                              <MdCancel /> Cancel
                            </button>
                          )}

                          {booking.status.toLowerCase() === 'completed' && (
                            <button className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-primary transition">
                              <MdReceipt /> Invoice
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredBookings.map((booking) => (
              <div 
                key={booking._id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{booking.serviceType}</h3>
                    <p className="text-sm text-slate-500">with {booking.caretakerName}</p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                  <div>
                    <p className="text-slate-500 text-xs">Date</p>
                    <p className="font-medium">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Time</p>
                    <p className="font-medium">{booking.startTime} - {booking.endTime}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Total</p>
                    <p className="font-semibold text-lg">${booking.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Duration</p>
                    <p className="font-medium">{booking.durationHours} hrs</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-primary text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition">
                    <MdVisibility /> View Details
                  </button>

                  {booking.status.toLowerCase() === 'pending' && (
                    <button className="flex-1 py-3 border border-red-300 text-red-500 rounded-2xl font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition">
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClientBookings;