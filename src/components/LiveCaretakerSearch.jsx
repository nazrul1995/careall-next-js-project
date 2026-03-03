'use client';
import React, { useState, useEffect, useCallback } from 'react';
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
    page: initialFilters.page ? Number(initialFilters.page) : 1,
    limit: initialFilters.limit ? Number(initialFilters.limit) : DEFAULT_PAGE_SIZE,
    sort: initialFilters.sort || 'ratingDesc',
  });

  // fetch data whenever filters change, but avoid duplicates
  const lastFilterString = React.useRef('');
  useEffect(() => {
    const current = JSON.stringify(filters);
    if (current === lastFilterString.current) return;
    lastFilterString.current = current;

    async function fetchData() {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v === undefined || v === '' || v === null) return;
        if (Array.isArray(v)) {
          v.forEach(val => params.append(k, val));
        } else {
          params.set(k, String(v));
        }
      });
      const res = await fetch(`/api/caretaker-services?${params.toString()}`);
      const json = await res.json();
      setCaretakers(json.caretakers);
      setTotal(json.total);
    }
    fetchData();
  }, [filters]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const handleSearch = useCallback((q) => {
    setFilters(prev => ({ ...prev, search: q, page: 1 }));
  }, []);

  const handlePage = useCallback((p) => {
    setFilters(prev => ({ ...prev, page: p }));
  }, []);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
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
            onSortChange={(s) => setFilters(prev => ({ ...prev, sort: s, page: 1 }))}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caretakers.map(c => (
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