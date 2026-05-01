'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { MdArrowForward, MdVerified } from 'react-icons/md';

const Banner = () => {
  const session = useSession();
  return (
          <section className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[5%] h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <MdVerified className="text-base" />
                <span>Trusted by 10,000+ families</span>
                <p>{JSON.stringify(session)}</p>
              </div>

              <h1 className="font-display text-5xl font-extrabold leading-[1.1] text-slate-900 dark:text-slate-50 sm:text-6xl">
                Trusted Care for Your <span className="text-primary">Loved Ones</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Connecting families with premium babysitting, elderly care, and specialized support services.
                Safety and compassion are our top priorities.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all flex items-center gap-2">
                  Find Caretaker <MdArrowForward />
                </button>
                <button className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Become a Caregiver
                </button>
              </div>
            </div>

            {/* Hero Image + Glass Card */}
            <div className="relative">
              <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl">
                <Image
                width={500}
                height={500}
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2dwWEsUj9IV4D_8Cv-vKwkv2-u8ZDB7q_ASJ28iG4XZ9wRvrT1hGHp06Z4krGleDvXEkOFZi4pH0fgqqx4uIqeX8DRGekzYGpV25-humswOhhbn_EHRrEROzpcdIM-MRDRKY-OMr9LmsqTQaGE3MOq7cw-Viks4Kuzc3xgp_9MVBI255qMoD2FpIjGoEub7ZIwcXszA6eIDitw3mTuuUuOBxalcGmpb-G8mXJS-6Jgg_yTvQXpMDvR4tLluDtHkpy73iaM5DRVmUA"
                  alt="Friendly caregiver smiling with an elderly woman"
                />

                {/* Glass Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300" />
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      <span className="block font-bold">Top Rated Caregivers</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Available in your area now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Banner;