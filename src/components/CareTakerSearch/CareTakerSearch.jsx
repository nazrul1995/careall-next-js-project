'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdSearch } from 'react-icons/md';

const CareTakerSearch = ({ initialValue = '', onSearch }) => {
    const [query, setQuery] = useState(initialValue);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
            return;
        }
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (query) {
            params.set('search', query);
        } else {
            params.delete('search');
        }
        router.push(`/services?${params.toString()}`);
    };

    // if onSearch is provided, debounce live updates
    useEffect(() => {
        if (!onSearch) return;
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
            <input
                name="search"
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search caretakers..."
                aria-label="Search caretakers"
                className="flex-1 px-4 py-2 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
                type="submit"
                aria-label="Execute search"
                className="px-4 py-2 bg-primary text-white hover:bg-primary/90 flex items-center justify-center"
            >
                <MdSearch size={20} />
            </button>
        </form>
    );
};

export default CareTakerSearch;