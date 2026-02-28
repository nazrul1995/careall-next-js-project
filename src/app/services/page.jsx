// app/caretakers/page.tsx   or   components/CaretakerSearch.tsx

'use client';

import React, { useState } from 'react';
import { 
  MdSearch, 
  MdTune, 
  MdStar, 
  MdFavoriteBorder, 
  MdChevronLeft, 
  MdChevronRight, 
  MdVolunteerActivism,
  MdLocationOn,
  MdAccessTime
} from 'react-icons/md';

const CaretakerSearch = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sample data (in real app → from API / server component)
  const caretakers = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 4.9,
      reviews: 128,
      hourlyRate: 25,
      specialties: ["Elderly Care", "First Aid Certified"],
      description: "Dedicated caregiver with 8 years of experience helping elderly clients with daily living activities and medication...",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
      available: true,
      location: "Chattogram",
      experience: "8+ years"
    },
    {
      id: 2,
      name: "David Miller",
      rating: 4.8,
      reviews: 94,
      hourlyRate: 30,
      specialties: ["Babysitting", "Certified Teacher"],
      description: "Experienced childcare provider focusing on educational games and creative play for kids ages 2-10.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      available: true,
      location: "Dhaka",
      experience: "6+ years"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      rating: 5.0,
      reviews: 52,
      hourlyRate: 45,
      specialties: ["Special Needs", "Nurse Assistant"],
      description: "Registered nurse assistant specializing in palliative care and chronic condition management.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      available: false,
      location: "Sylhet",
      experience: "12+ years"
    },
    // ... you can add more
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <aside className="w-full lg:w-80 lg:shrink-0 hidden lg:block">
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
                        className="rounded text-primary focus:ring-primary w-4 h-4" 
                        defaultChecked={type === 'Elderly Care'}
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
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Experience</label>
                  <span className="text-xs font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-full">
                    2+ Years
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full relative">
                  <div className="absolute inset-y-0 left-0 w-[40%] bg-primary rounded-full"></div>
                  <div className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0 yrs</span>
                  <span>15+ yrs</span>
                </div>
              </div>

              {/* Price Range - simplified */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Hourly Rate
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input 
                      type="number" 
                      defaultValue={15}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input 
                      type="number" 
                      defaultValue={50}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full py-3 mt-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Caretakers near you
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  248 verified professionals found
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
                <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2.5 px-4 focus:ring-primary">
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Experienced</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caretakers.map(c => (
                <div 
                  key={c.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10">
                        <img 
                          src={c.photo} 
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {c.available && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-lg truncate">{c.name}</h3>
                        <MdFavoriteBorder className="text-slate-300 hover:text-red-500 cursor-pointer flex-shrink-0 transition-colors" size={20} />
                      </div>

                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <MdStar 
                              key={i} 
                              className={i < Math.floor(c.rating) ? "fill-current" : ""} 
                              size={14} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">{c.rating}</span>
                        <span className="text-xs text-slate-400">({c.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {c.specialties.map((s, i) => (
                      <span 
                        key={i}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          i === 0 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-grow">
                    {c.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-slate-900 dark:text-white">
                        ${c.hourlyRate}
                      </span>
                      <span className="text-xs text-slate-500">/ hour</span>
                    </div>

                    <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
              <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <MdChevronLeft size={20} />
              </button>
              
              {[1, 2, 3, '...', 12].map((page, i) => (
                <button
                  key={i}
                  className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
                    page === 1 
                      ? 'bg-primary text-white' 
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <MdChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaretakerSearch;