// components/CaregiverProfile.tsx
'use client';

import React from 'react';
import { 
  MdStar, 
  MdFavoriteBorder, 
  MdShare, 
  MdLocationOn, 
  MdCalendarToday, 
  MdVerified, 
  MdChevronLeft, 
  MdChevronRight 
} from 'react-icons/md';

const CaregiverProfile = () => {
  return (
    <main className="mx-auto max-w-7xl w-full px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
        <a href="#" className="hover:text-primary transition-colors">Home</a>
        <span className="text-xs">›</span>
        <a href="#" className="hover:text-primary transition-colors">Caretakers</a>
        <span className="text-xs">›</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium">Elena Rodriguez</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Profile Section */}
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="relative group shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden ring-4 ring-primary/10">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS3PaH-MLIvOP8OOg94pPtnxTyuXBuTokeZQTDAR8FnGSXkrEOKe8Zc4CwaVdJX_Cbju_iDBYt5STypI2Zv_zY32XWBrmuH-Lrh6cCbDrlSB8XTVrbjbGCPMLXzOy0aE2LgOEJigntVFhf4UDHqGg3-cBjqXwQmmjnjaEIMiHYHinLbOcEFXJQGVOupUB82YfHVot0ZMR3dyZ-amHePbq7ILSMDe2z1Ea6g9OTCC3XvBlKdI1JZMnezLdmDRUpQ35rjb9Yj5p9l-A8"
                    alt="Elena Rodriguez"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
                <div 
                  className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-md"
                  title="Verified Professional"
                >
                  <MdVerified className="text-lg" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      Elena Rodriguez, CNA
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                      <MdLocationOn className="text-primary" />
                      Brooklyn, New York • 5 miles away
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <MdFavoriteBorder className="text-xl text-slate-600 dark:text-slate-300" />
                    </button>
                    <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <MdShare className="text-xl text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                      Rating
                    </p>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">4.9</span>
                      <MdStar className="text-yellow-400 text-xl" />
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                      Exp.
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12 Yrs</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                      Jobs
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">320+</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs & Content */}
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
              <button className="py-4 px-6 text-sm md:text-base font-bold border-b-2 border-primary text-primary whitespace-nowrap">
                About Me
              </button>
              <button className="py-4 px-6 text-sm md:text-base font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 whitespace-nowrap">
                Reviews
              </button>
              <button className="py-4 px-6 text-sm md:text-base font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 whitespace-nowrap">
                Availability
              </button>
              <button className="py-4 px-6 text-sm md:text-base font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 whitespace-nowrap">
                Credentials
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8 space-y-10">
              {/* About */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Professional Biography
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  I am a dedicated Certified Nursing Assistant with over 12 years of experience in providing compassionate care for both elderly patients and children. My background in medical settings allows me to handle complex needs with patience and professional expertise. I believe in fostering a safe, nurturing environment where families feel completely at ease.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["First Aid Certified", "CPR Certified", "Special Needs Care", "Bilingual (Eng/Esp)"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <hr className="border-slate-100 dark:border-slate-800 my-8" />

              {/* Reviews Summary */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    Family Reviews
                  </h3>
                  <a href="#" className="text-primary text-sm md:text-base font-bold hover:underline">
                    See all 48 reviews
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Rating Bars */}
                  <div className="space-y-4">
                    {[5, 4, 3].map((stars) => (
                      <div key={stars} className="flex items-center gap-4">
                        <span className="text-sm font-medium w-5 text-right">{stars}</span>
                        <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 transition-all"
                            style={{ width: stars === 5 ? '92%' : stars === 4 ? '6%' : '2%' }}
                          />
                        </div>
                        <span className="text-sm text-slate-500 w-10">
                          {stars === 5 ? '92%' : stars === 4 ? '6%' : '2%'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sample Review */}
                  <div className="bg-primary/5 dark:bg-primary/10 p-5 rounded-xl">
                    <p className="text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed">
                      &quot;Elena has been a godsend for our family. She cared for our elderly father with such dignity and grace. Highly recommended!&quot;
                    </p>
                    <p className="mt-3 text-primary font-bold text-xs">
                      - Sarah M., New York
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-slate-100 dark:border-slate-800 my-8" />

              {/* Availability */}
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
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <span key={day} className="text-slate-400 font-medium">{day}</span>
                    ))}
                  </div>

                  {/* Calendar Days (mock) */}
                  <div className="grid grid-cols-7 gap-1 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={`prev-${i}`} className="h-10 flex items-center justify-center text-slate-300">
                        {26 + i}
                      </div>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(day => (
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
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">$35</span>
                <span className="text-slate-500 text-sm font-medium"> / hour</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                <MdStar className="fill-current" />
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
                  8 hours × $35.00
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

            <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all mb-4">
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
        </div>
      </div>
    </main>
  );
}

export default CaregiverProfile;