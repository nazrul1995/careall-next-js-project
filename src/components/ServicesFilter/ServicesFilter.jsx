'use client';
import React, { useState, useEffect } from 'react';
import { MdTune } from 'react-icons/md';

const ServicesFilter = ({
  selectedServices: initialServices = [],
  minExp: initialMinExp = '',
  minRate: initialMinRate = '',
  maxRate: initialMaxRate = '',
  onChange,
}) => {
  const [selectedServices, setSelectedServices] = useState(initialServices);
  const [minExp, setMinExp] = useState(initialMinExp);
  const [minRate, setMinRate] = useState(initialMinRate);
  const [maxRate, setMaxRate] = useState(initialMaxRate);

  // notify parent when any value changes (skip first render)
  const hasMounted = React.useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      onChange?.({
        service: selectedServices,
        minExp,
        minRate,
        maxRate,
      });
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, minExp, minRate, maxRate]);

  const toggleService = (type) => {
    setSelectedServices(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const reset = () => {
    setSelectedServices([]);
    setMinExp('');
    setMinRate('');
    setMaxRate('');
  };

  return (
    <aside className="w-full lg:w-80 lg:shrink-0">
      {/* use details/summary for mobile toggle; always open by default so sidebar content shows */}
      <details open className="lg:block">
        <summary className="lg:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm cursor-pointer">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Filters</span>
          <MdTune className="text-primary" size={20} />
        </summary>
        <div className="sticky top-20 space-y-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-5">
              <MdTune className="text-primary" /> Filters
            </h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-6">
              Refine your search
            </p>
          </div>

          {/* Service Type */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Service Type
            </label>
            <div className="space-y-2">
              {['Elderly Care', 'Babysitting', 'Special Needs', 'Pet Sitting', 'Housekeeping'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="service"
                    value={type}
                    className="rounded text-primary focus:ring-primary w-4 h-4"
                    checked={selectedServices.includes(type)}
                    onChange={() => toggleService(type)}
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Min. experience (yrs)
            </label>
            <input
              type="number"
              name="minExp"
              min="0"
              value={minExp}
              onChange={e => setMinExp(e.target.value)}
              className="w-full pl-3 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Hourly rate
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  name="minRate"
                  min="0"
                  value={minRate}
                  onChange={e => setMinRate(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  name="maxRate"
                  min="0"
                  value={maxRate}
                  onChange={e => setMaxRate(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={reset}
              type="button"
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </details>
    </aside>
  );
};

export default ServicesFilter;
