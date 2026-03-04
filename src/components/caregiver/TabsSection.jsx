'use client';
import React, { useState } from 'react';
import AboutTab from './AboutTab';
import ReviewsTab from './ReviewsTab';
import AvailabilityCalendar from './AvailabilityCalendar';
import CredentialsTab from './CredentialsTab';

export default function TabsSection({ profile }) {
  const [tab, setTab] = useState('about');

  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          ['about', 'About Me'],
          ['reviews', 'Reviews'],
          ['availability', 'Availability'],
          ['credentials', 'Credentials'],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`py-4 px-6 text-sm md:text-base whitespace-nowrap ${
              tab === key
                ? 'font-bold border-b-2 border-primary text-primary'
                : 'font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 space-y-10">
        {tab === 'about' && <AboutTab profile={profile} />}
        {tab === 'reviews' && <ReviewsTab id={profile?.id} />}
        {tab === 'availability' && <AvailabilityCalendar id={profile?.id} />}
        {tab === 'credentials' && <CredentialsTab profile={profile} />}
      </div>
    </section>
  );
}
