import React from 'react';
import Image from 'next/image';
import {
  MdVerified,
  MdFavoriteBorder,
  MdShare,
  MdLocationOn,
  MdStar,
} from 'react-icons/md';

export default function ProfileHero({ profile }) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Photo */}
        <div className="relative group shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden ring-4 ring-primary/10">
            <Image
              width={500}
              height={500}
              src={profile?.photo}
              alt={profile?.name}
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
                {profile?.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                <MdLocationOn className="text-primary" /> {profile?.location}
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
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {profile?.rating}
                </span>
                <MdStar className="text-yellow-400 text-xl" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Exp.
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {profile?.experience} Yrs
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Jobs
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {profile?.jobs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
