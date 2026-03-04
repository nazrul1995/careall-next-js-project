'use client';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function AvailabilityCalendar({ id }) {
  // id could be used to fetch availability
  return (
    <section>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5">
        Availability
      </h3>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-5">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">
            October 2023
          </h4>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <MdChevronLeft />
            </button>
            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <MdChevronRight />
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-3">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={`weekday-${idx}`} className="text-slate-400 font-medium">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Days (mock) */}
        <div className="grid grid-cols-7 gap-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`prev-${i}`}
              className="h-10 flex items-center justify-center text-slate-300"
            >
              {26 + i}
            </div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((day) => (
            <div
              key={day}
              className={`h-10 flex items-center justify-center rounded font-medium border border-transparent transition-colors ${
                day === 3 || day === 4
                  ? 'bg-primary text-white font-bold'
                  : day >= 6 && day <= 9
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
