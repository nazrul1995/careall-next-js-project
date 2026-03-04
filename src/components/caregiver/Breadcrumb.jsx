import React from 'react';

export default function Breadcrumb({ profile }) {
  return (
    <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
      <a href="#" className="hover:text-primary transition-colors">
        Home
      </a>
      <span className="text-xs">›</span>
      <a href="#" className="hover:text-primary transition-colors">
        Caretakers
      </a>
      <span className="text-xs">›</span>
      <span className="text-slate-900 dark:text-slate-200 font-medium">
        {profile?.name}
      </span>
    </nav>
  );
}
