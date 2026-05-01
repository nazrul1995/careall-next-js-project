'use client';

import React, { useEffect, useState } from 'react';
import {
  MdBook,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdCurrencyBitcoin,
  MdArrowUpward,
  MdArrowDownward,
  MdTrendingUp,
  MdCalendarToday,
} from 'react-icons/md';

export default function DashboardOverview({ onRefresh }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [onRefresh]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/dashboard/client-stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          Error loading statistics: {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data available
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings || 0,
      icon: MdBook,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      trend: '+2 this month',
    },
    {
      title: 'Confirmed',
      value: stats.confirmedBookings || 0,
      icon: MdCheckCircle,
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      trend: 'Ready to go',
    },
    {
      title: 'Pending',
      value: stats.pendingBookings || 0,
      icon: MdPending,
      color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      trend: 'Awaiting payment',
    },
    {
      title: 'Completed',
      value: stats.completedBookings || 0,
      icon: MdCheckCircle,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      trend: 'Great work',
    },
  ];

  const paymentStats = [
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent?.toFixed(2) || '0.00'}`,
      icon: MdCurrencyBitcoin,
      color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
    },
    {
      title: 'Paid Bookings',
      value: stats.paidBookings || 0,
      icon: MdCheckCircle,
      color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
    {
      title: 'Pending Payment',
      value: stats.pendingPaymentBookings || 0,
      icon: MdPending,
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Booking Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="text-2xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Stats */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Payment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="text-2xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Bookings</h2>
        {stats.recentBookings && stats.recentBookings.length > 0 ? (
          <div className="space-y-3">
            {stats.recentBookings.map((booking, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{booking.caretakerName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{booking.serviceType}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white">${booking.totalPrice}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-8 text-center">
            <MdBook className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No bookings yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
