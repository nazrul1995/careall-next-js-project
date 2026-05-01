import React from 'react';
import CareTakerSearch from '@/components/CareTakerSearch/CareTakerSearch';

const SearchHeader = ({ search = '', count = 0, sort = '', onSearchChange, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="w-full sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Caretakers near you
        </h2>
        <CareTakerSearch initialValue={search} onSearch={onSearchChange} />
        <p className="text-sm text-slate-500 mt-1">
          {count} verified professional{count === 1 ? '' : 's'} found
          {search && (
            <span>
              {' '}
              for <span className="font-medium">&quot;{search}&quot;</span>
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2.5 px-4 focus:ring-primary"
        >
          <option value="ratingDesc">Highest Rated</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="experienceDesc">Most Experienced</option>
        </select>
      </div>
    </div>
  );
};

export default SearchHeader;
