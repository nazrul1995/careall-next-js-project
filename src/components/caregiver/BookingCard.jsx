'use client';
import React, { useState, useEffect } from 'react';
import { MdCalendarToday, MdError, MdCheckCircle } from 'react-icons/md';
import { useSession, signIn } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export default function BookingCard({profile}) {
  
  const { data: session } = useSession();
  const router = useRouter();
  const path = usePathname();
console.log(profile)
  // Form state
  const [checkInDate, setCheckInDate] = useState('');
  const [serviceType, setServiceType] = useState('Elderly Companion Care');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Calculate duration in hours
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startTotalMin = startHour * 60 + startMin;
    const endTotalMin = endHour * 60 + endMin;
    return Math.max(0, (endTotalMin - startTotalMin) / 60);
  };

  const durationHours = calculateDuration();
  const serviceCharge = 12.0;
  const subtotal = durationHours * (profile?.hourlyRate || 0);
  const totalPrice = subtotal + serviceCharge;

  // Get minimum date (today)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Check if user is logged in
    if (!session || !session.user) {
      router.push(`/login?callbackUrl=${path}`);
      return;
    }

    // Validation
    if (!checkInDate) {
      setError('Please select a check-in date');
      return;
    }

    if (durationHours <= 0) {
      setError('End time must be after start time');
      return;
    }

    if (durationHours > 24) {
      setError('Booking cannot exceed 24 hours');
      return;
    }

    // Proceed with booking
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail:session?.user?.email,
          caregiverEmail: profile?.email || '',
          caregiverName: profile?.name || '',
          caregiverImage: profile?.photo,
          serviceType,
          checkInDate,
          startTime,
          endTime,
          durationHours,
          hourlyRate: profile.hourlyRate || 0,
          serviceCharge,
          totalPrice,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Booking failed. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      // Reset form
      setCheckInDate('');
      setServiceType('Elderly Companion Care');
      setStartTime('09:00');
      setEndTime('17:00');
      setNotes('');

      // Redirect to bookings page after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/bookings');
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            ${profile?.hourlyRate || 0}
          </span>
          <span className="text-slate-500 text-sm font-medium"> / hour</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
          <MdCalendarToday className="fill-current" />
          4.9
        </div>
      </div>

      <div className="space-y-5 mb-6">
        {/* Caregiver email (from session) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Client Email
          </label>
          <input
            type="email"
            value={session?.user?.email || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
          />
        </div>

        {/* Caretaker email (from profile) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Caregiver Email
          </label>
          <input
            type="email"
            value={profile?.email || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
          />
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Check-in Date
          </label>
          <div className="flex items-center gap-3 w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <MdCalendarToday className="text-slate-400" />
            <input
              type="date"
              min={getTodayDate()}
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="bg-transparent text-sm text-slate-900 dark:text-white outline-none flex-1"
              required
            />
          </div>
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary"
          >
            <option>Elderly Companion Care</option>
            <option>Babysitting & Childcare</option>
            <option>Medical Support</option>
          </select>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 block px-1">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 block px-1">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special requests or notes..."
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary resize-none h-20"
          />
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 underline cursor-help">
            {durationHours || 0} hours × ${profile?.hourlyRate || 0}
          </span>
          <span className="text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 underline cursor-help">
            Service fee
          </span>
          <span className="text-slate-900 dark:text-white">${serviceCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-slate-900 dark:text-white">Total</span>
          <span className="text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
          <MdError className="text-red-500 text-lg flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
          <MdCheckCircle className="text-green-500 text-lg flex-shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-400">Booking confirmed! Redirecting...</p>
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={loading || !checkInDate}
        type="button"
        className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all mb-4"
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </button>
      <p className="text-center text-xs text-slate-500 mb-6">
        You won&apos;t be charged yet
      </p>

      <div className="flex items-center justify-center gap-3 text-slate-400 text-xs uppercase font-bold tracking-wider">
        <span className="material-symbols-outlined text-xl">security</span>
        Secure Payment Processing
      </div>
    </div>
  );
}
