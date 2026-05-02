'use client';

import { li } from 'framer-motion/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  MdSearch,
  MdTune,
  MdStar,
  MdChevronLeft,
  MdChevronRight,
  MdVerified,
  MdLocationOn,
} from 'react-icons/md';

const CareGiversPage = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    specialties: [],
    minRate: 15,
    maxRate: 50,
    sort: 'rating',
    page: 1,
    limit: 6,
  });

  const fetchCaretakers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.search) params.append('search', filters.search);
      if (filters.specialties.length)
      params.append('specialties', filters.specialties.join(','));
      params.append('minRate', filters.minRate);
      params.append('maxRate', filters.maxRate);
      params.append('sort', filters.sort);
      params.append('page', filters.page);
params.append('limit', filters.limit);
      const res = await fetch(`/api/caregivers?${params.toString()}`);
      const data = await res.json();

      setCaretakers(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchCaretakers();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [filters]);

  const toggleSpecialty = (type) => {
    setFilters((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(type)
        ? prev.specialties.filter((t) => t !== type)
        : [...prev.specialties, type],
      page: 1,
    }));
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 });
  };
const getPageNumbers = () => {
  const total = totalPages;
  const current = filters.page;
  const delta = 1; // how many pages around current

  const pages = [];

  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(total - 1, current + delta);

  pages.push(1); // always show first page

  if (rangeStart > 2) {
    pages.push('...');
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < total - 1) {
    pages.push('...');
  }

  if (total > 1) {
    pages.push(total); // always show last page
  }

  return pages;
};
  return (
    < >
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Find Your Perfect Caregiver
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Trusted, background-checked professionals ready to support your family
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <MdTune className="text-primary" /> Filters
                </h3>
                <button
                  onClick={() =>
                    setFilters({
                      search: '',
                      specialties: [],
                      minRate: 15,
                      maxRate: 50,
                      sort: 'rating',
                      page: 1,
                      limit: 6,
                    })
                  }
                  className="text-sm text-slate-500 hover:text-primary transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Search inside filters (optional) */}
              <div className="mb-6">
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                  <MdSearch className="text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    className="w-full bg-transparent outline-none text-sm"
                    value={filters.search}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3 text-slate-500">Service Type</p>
                {['Elderly Care', 'Babysitting', 'Special Needs'].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 py-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.specialties.includes(type)}
                      onChange={() => toggleSpecialty(type)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>

              {/* Hourly Rate */}
              <div>
                <p className="text-sm font-semibold mb-3 text-slate-500">Hourly Rate (USD)</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">Min</p>
                    <input
                      type="number"
                      value={filters.minRate}
                      onChange={(e) =>
                        setFilters({ ...filters, minRate: Number(e.target.value), page: 1 })
                      }
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 text-center"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">Max</p>
                    <input
                      type="number"
                      value={filters.maxRate}
                      onChange={(e) =>
                        setFilters({ ...filters, maxRate: Number(e.target.value), page: 1 })
                      }
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Caretakers Near You
              </h2>

              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
                className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="rating">Highest Rated</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>

            {/* Loading & Empty States */}
            {loading && <p className="text-center py-12 text-slate-500">Finding the best caregivers...</p>}

            {!loading && caretakers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-500">No caregivers found matching your criteria.</p>
              </div>
            )}

            {/* Caretaker Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {caretakers.map((c) => (
                <div
                  key={c._id}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={c.photo || '/default-avatar.jpg'}
                      alt={c.name}
                      className="w-full h-56 object-cover"
                    />
                    {c.verified && (
                      <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 text-primary rounded-full p-1 shadow">
                        <MdVerified size={22} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-xl">{c.name}</h3>
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                          <MdLocationOn size={16} />
                          {c.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-2xl text-sm font-medium">
                        <MdStar />
                        {c.rating}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-5 text-sm leading-relaxed">
                      {c.description}
                    </p>

                    {/* Specialties Tags */}
                    {c.specialties && c.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {c.specialties.slice(0, 3).map((spec, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-2xl font-bold text-primary">${c.hourlyRate}</span>
                        <span className="text-sm text-slate-500">/hr</span>
                      </div>

                      <Link
                        href={`/caregivers/${c._id}`}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-semibold transition-all active:scale-95"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
{caretakers.length > 0 && (
  <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

    {/* Prev */}
    <button
      onClick={() =>
        setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
      }
      disabled={filters.page === 1}
      className="px-4 py-2 rounded-xl border disabled:opacity-40"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {getPageNumbers().map((p, i) =>
      p === '...' ? (
        <span key={i} className="px-3 py-2 text-slate-400">
          ...
        </span>
      ) : (
        <button
          key={i}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: p }))
          }
          className={`px-4 py-2 rounded-xl border ${
            filters.page === p
              ? 'bg-primary text-white'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {p}
        </button>
      )
    )}

    {/* Next */}
    <button
      onClick={() =>
        setFilters((p) => ({
          ...p,
          page: Math.min(totalPages, p.page + 1),
        }))
      }
      disabled={filters.page >= totalPages}
      className="px-4 py-2 rounded-xl border disabled:opacity-40"
    >
      Next
    </button>

  </div>
)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareGiversPage;