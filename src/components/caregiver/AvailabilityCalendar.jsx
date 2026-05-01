'use client';
import React, { useEffect } from 'react';

export default function AvailabilityCalendar({ id }) {

  useEffect(() => {
    import("cally");
  }, []);

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Availability
      </h3>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">

        <calendar-date
          class="cally w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4"
        >
          <calendar-month></calendar-month>
        </calendar-date>

      </div>
    </section>
  );
}