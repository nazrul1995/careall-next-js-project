'use client';
import React from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BookingCard({ rate = 0 }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleConfirm = () => {
    if (!session) {
      // redirect to login or open sign-in modal
      signIn();
      return;
    }

    // TODO: perform booking action (e.g. call API)
    console.log('booking confirmed');
  };

  return (
    <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            ${rate}
          </span>
          <span className="text-slate-500 text-sm font-medium"> / hour</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
          <MdCalendarToday className="fill-current" />
          4.9
        </div>
      </div>

      <div className="space-y-5 mb-6">
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Check-in Date
          </label>
          <div className="flex items-center gap-3 w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <MdCalendarToday className="text-slate-400" />
            <span className="text-sm">Oct 3, 2023</span>
          </div>
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 block px-1">
            Service Type
          </label>
          <select className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary">
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
              defaultValue="09:00"
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 block px-1">
              End Time
            </label>
            <input
              type="time"
              defaultValue="17:00"
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 underline cursor-help">
            8 hours × ${rate}.00
          </span>
          <span className="text-slate-900 dark:text-white">$280.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 underline cursor-help">
            Service fee
          </span>
          <span className="text-slate-900 dark:text-white">$12.00</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-slate-900 dark:text-white">Total</span>
          <span className="text-slate-900 dark:text-white">$292.00</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all mb-4"
      >
        Confirm Booking
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
