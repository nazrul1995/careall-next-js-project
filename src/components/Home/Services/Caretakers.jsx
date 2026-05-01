import { getCaretakers } from '@/actions/server/caretakers';
import React from 'react';
import { MdArrowForward, MdStar } from 'react-icons/md';
import ServicesCard from '../../Card/ServicesCard';


const Caretakers = async () => {
  const { results: caretakers } = await getCaretakers();
  return (
          <section className="py-20 px-4">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 flex flex-col sm:flex-row items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">Featured Caretakers</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">Available caretakers with the highest community ratings.</p>
                </div>
                <button className="text-sm font-bold text-primary flex items-center gap-1">
                  View All Caregivers <MdArrowForward className="text-sm" />
                </button>
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {caretakers.slice(0,4).map((caretaker, index) => (
                  <ServicesCard key={index} caretaker={caretaker} />
                ))}
              </div>
            </div>
          </section>
  );
};

export default Caretakers;