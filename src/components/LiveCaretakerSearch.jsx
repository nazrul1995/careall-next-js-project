'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ServicesFilter from '@/components/ServicesFilter/ServicesFilter';
import SearchHeader from '@/components/SearchHeader/SearchHeader';
import ServicesCard from '@/components/Card/ServicesCard';
import Breadcrumb from '@/components/Breadcrumb';
import Pagination from '@/components/Pagination';

const DEFAULT_PAGE_SIZE = 9;

const LiveCaretakerSearch = ({
  initialCaretakers = [],
  initialTotal = 0,
  initialFilters = {},
}) => {
  const [caretakers, setCaretakers] = useState(initialCaretakers);
  const [total, setTotal] = useState(initialTotal);

  const [filters, setFilters] = useState({
    ...initialFilters,
    page: Number(initialFilters.page || 1),
    limit: Number(initialFilters.limit || DEFAULT_PAGE_SIZE),
    sort: initialFilters.sort || 'rating',
  });

  const debounceRef = useRef(null);

  // ================= FETCH =================
  const fetchData = async (currentFilters) => {
    const params = new URLSearchParams();

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ''
      )
        return;

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, String(value));
      }
    });

    const res = await fetch(`/api/caregivers?${params.toString()}`);
    const json = await res.json();

    setCaretakers(json.data || []);
    setTotal(json.total || 0);
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchData(filters);
    }, 300); // debounce search

    return () => clearTimeout(debounceRef.current);
  }, [filters]);

  // ================= HANDLERS =================
  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  }, []);

  const handleSearch = useCallback((q) => {
    setFilters((prev) => ({
      ...prev,
      search: q,
      page: 1,
    }));
  }, []);

  const handlePage = useCallback((p) => {
    setFilters((prev) => ({ ...prev, page: p }));
  }, []);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <ServicesFilter
          selectedServices={filters.service || []}
          minExp={filters.minExp || ''}
          minRate={filters.minRate || ''}
          maxRate={filters.maxRate || ''}
          onChange={handleFilterChange}
        />

        <div className="flex-1">
          <SearchHeader
            search={filters.search || ''}
            count={total}
            sort={filters.sort}
            onSearchChange={handleSearch}
            onSortChange={(s) =>
              setFilters((p) => ({ ...p, sort: s, page: 1 }))
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caretakers.map((c) => (
              <ServicesCard key={c._id} caretaker={c} />
            ))}
          </div>

          <Pagination
            total={total}
            page={filters.page}
            pageSize={filters.limit}
            onPage={handlePage}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveCaretakerSearch;