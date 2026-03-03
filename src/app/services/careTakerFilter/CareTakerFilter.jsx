'use client'
import React from 'react';
import { MdTune } from 'react-icons/md';


const CareTakerFilter = () => {
    
  return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <MdTune className="text-primary" />
            <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
          </div>
        </div>
    );
};

export default CareTakerFilter;