'use client';
import React from 'react';

export default function ReviewsTab({ id }) {
  // in a real implementation you might fetch reviews using the id
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          Family Reviews
        </h3>
        <a href="#" className="text-primary text-sm md:text-base font-bold hover:underline">
          See all reviews
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Rating Bars (static for now) */}
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
            &quot;Elena has been a godsend for our family. She cared for our elderly father
            with such dignity and grace. Highly recommended!&quot;
          </p>
          <p className="mt-3 text-primary font-bold text-xs">- Sarah M., New York</p>
        </div>
      </div>
    </section>
  );
}
