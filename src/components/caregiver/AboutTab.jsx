import React from 'react';

export default function AboutTab({ profile }) {
  return (
    <article>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
        Professional Biography
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {profile?.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {profile?.specialties?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
