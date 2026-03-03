import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdStar } from 'react-icons/md';

const ServicesCard = ({caretaker}) => {
  return (
        <div>
            <div
            
                    className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="relative mb-4">
                      <Image
                        className="h-48 w-full rounded-xl object-cover"
                        src={caretaker?.photo || '/default-profile.png'}
                        alt={caretaker.name}
                        width={300}
                        height={300}
                      />
                      <div className="absolute top-2 right-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white">
                        <MdStar className="text-yellow-500 text-[14px]" /> {caretaker.rating}
                      </div>
                    </div>
    
                            <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display font-bold text-slate-900 dark:text-slate-100">{caretaker.name}</h4>
                      {caretaker.available && (
                        <div className="w-3 h-3 bg-green-500 rounded-full" title="Available"></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-2 truncate">{caretaker.title}</p>

                    {caretaker.specialties && caretaker.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {caretaker.specialties.map((s, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-700 dark:text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {caretaker.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{caretaker.description}</p>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <div className="text-sm">
                        <span className="font-bold text-primary">{caretaker.hourlyRate}</span>
                        <span className="text-slate-500">/hr</span>
                      </div>
                      <Link href={`/caretakers/${caretaker._id}`} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold hover:bg-primary hover:text-white transition-colors group-hover:bg-primary group-hover:text-white">
                        Book Now
                      </Link>
                    </div>
                  </div>
        </div>
    );
};

export default ServicesCard;