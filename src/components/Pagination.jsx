'use client';

import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Pagination = ({ total, page = 1, pageSize = 10, onPage }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
      >
        <MdChevronLeft size={20} />
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
            p === page
              ? 'bg-primary text-white'
              : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;