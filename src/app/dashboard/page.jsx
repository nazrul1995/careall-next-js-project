// components/Dashboard.tsx
'use client';

import React, { useState } from 'react';
import { 
  MdDashboard, 
  MdCalendarToday, 
  MdPerson, 
  MdMessage, 
  MdSettings, 
  MdNotifications, 
  MdAdd, 
  MdSearch, 
  MdMoreVert, 
  MdCheckCircle, 
  MdSchedule, 
  MdPendingActions,
  MdLocationOn,
  MdZoomIn,
  MdChevronLeft
} from 'react-icons/md';
import { HiOutlineHeart } from 'react-icons/hi';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: MdDashboard, label: 'Dashboard', active: true },
    { icon: MdCalendarToday, label: 'Bookings' },
    { icon: MdPerson, label: 'Profile' },
    { icon: MdMessage, label: 'Messages' },
    { icon: MdSettings, label: 'Settings' },
  ];

  const recentBookings = [
    {
      client: 'Elena Rodriguez',
      type: 'Elderly Care',
      date: 'Oct 24, 2023',
      time: '09:00 AM - 05:00 PM',
      amount: '$120.00',
      status: 'Approved',
      statusColor: 'text-green-600 bg-green-50 dark:bg-green-900/30',
    },
    {
      client: 'Marcus Chen',
      type: 'Babysitting',
      date: 'Oct 26, 2023',
      time: '06:00 PM - 10:00 PM',
      amount: '$80.00',
      status: 'Pending',
      statusColor: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
    },
    {
      client: 'Sarah Jenkins',
      type: 'Elderly Care',
      date: 'Oct 20, 2023',
      time: '08:00 AM - 02:00 PM',
      amount: '$95.00',
      status: 'Completed',
      statusColor: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30',
    },
  ];

  const todaysSchedule = [
    {
      time: '09:00 AM',
      title: 'Morning Visit: Mrs. Peterson',
      location: '224 Baker St, London',
    },
    {
      time: '02:30 PM',
      title: 'Virtual Consultation',
      location: 'CareConnect Zoom',
      isVirtual: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <MdDashboard className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">CC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">CareConnect</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Care Management</p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services, caretakers or bookings..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <MdNotifications className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              </button>

              <button className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all">
                <MdAdd className="h-5 w-5" />
                New Booking
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile close */}
          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <MdChevronLeft className="h-6 w-6" />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, Alex!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here&apos;s a summary of your caregiving activities and schedule.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'Total Bookings', value: '124', change: '+12.5%', color: 'indigo', icon: MdDashboard },
              { title: 'Pending Requests', value: '8', status: 'Requires Attention', color: 'amber', icon: MdPendingActions },
              { title: 'Completed Visits', value: '116', subtitle: 'This month', color: 'green', icon: MdCheckCircle },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                {stat.change && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">{stat.change}</p>
                )}
                {stat.status && (
                  <p className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-400">{stat.status}</p>
                )}
                {stat.subtitle && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
                )}
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-10">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium flex items-center gap-1">
                View all bookings
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    {['Caretaker / Client', 'Service Type', 'Date & Time', 'Amount', 'Status', 'Actions'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentBookings.map((booking) => (
                    <tr key={booking.client} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            {/* Avatar placeholder */}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{booking.client}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                          {booking.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {booking.date}<br />
                        <span className="text-xs">{booking.time}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {booking.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.statusColor}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <MdMoreVert />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Section: Invite + Today's Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Invite Card */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800/50 text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg">
                  <HiOutlineHeart className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  Invite your friends & get $20
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Share CareConnect with friends and family. They&apos;ll get 10% off their first booking, and you&apos;ll get a $20 credit.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg transition-all">
                  Invite Friends
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <MdCalendarToday className="text-indigo-600 dark:text-indigo-400" />
                Today&apos;s Schedule
              </h3>

              <div className="space-y-6">
                {todaysSchedule.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                      {event.isVirtual ? <MdZoomIn className="text-indigo-600 text-2xl" /> : <MdLocationOn className="text-indigo-600 text-2xl" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{event.time}</p>
                      <p className="text-gray-700 dark:text-gray-300">{event.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                        {event.isVirtual ? 'Zoom' : <MdLocationOn className="text-sm" />}
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}