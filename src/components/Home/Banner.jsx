'use client';
import React from 'react';
import { MdArrowForward, MdLocationOn } from 'react-icons/md';

const Banner = () => {
  return (
    <div>
      {/* Hero Section - Modern & Emotional */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_70%_30%,rgba(34,211,238,0.12),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-2.5 bg-white dark:bg-zinc-900 px-5 py-2 rounded-3xl border border-cyan-100 dark:border-cyan-900 text-sm font-semibold text-cyan-600">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                Trusted by 12,000+ families
              </div>

              <h1 className="text-7xl lg:text-[5.2rem] leading-[1.05] font-bold tracking-tighter">
                Care that feels like<br />
                <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">family.</span>
              </h1>

              <p className="text-2xl text-zinc-600 dark:text-zinc-400 max-w-xl">
                Verified caregivers for newborns, seniors, and everyone in between. 
                Book in minutes. Peace of mind guaranteed.
              </p>

              {/* Smart Search Bar */}
              <div className="bg-white dark:bg-zinc-900 p-2 rounded-3xl shadow-2xl shadow-zinc-200/60 dark:shadow-black/40 max-w-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                    <MdLocationOn className="text-zinc-400 text-2xl" />
                    <input
                      type="text"
                      placeholder="New York, NY or zip code"
                      className="bg-transparent outline-none flex-1 placeholder-zinc-400 text-lg"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:brightness-110 text-white px-12 py-4 rounded-2xl font-semibold flex items-center gap-3 text-lg transition-all active:scale-[0.98]">
                    Find Care Now
                    <MdArrowForward />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-8 text-sm">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-2xl border-2 border-white dark:border-zinc-900 overflow-hidden"
                    >
                      <img
                        src={`https://randomuser.me/api/portraits/women/${i}.jpg`}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-semibold">
                    4.98 <span className="text-amber-500">★</span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    from 3,284 reviews this month
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=2070&q=85"
                  alt="Happy family with caregiver"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Trust Card */}
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-900 p-7 rounded-3xl shadow-2xl flex items-center gap-5 border border-zinc-100 dark:border-zinc-800">
                <div className="text-5xl">🛡️</div>
                <div>
                  <div className="font-semibold text-xl">100% vetted</div>
                  <div className="text-sm text-zinc-500">
                    Background • Training • References
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest text-zinc-400">
          SCROLL TO EXPLORE
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-zinc-400 to-transparent" />
        </div>
      </section>
    </div>
  );
};

export default Banner;