'use client';

import Navbar from '@/components/layouts/Navbar';
import React from 'react';
import {
  MdDiversity3,
  MdVerified,
  MdSearch,
  MdArrowForward,
  MdChildCare,
  MdElderly,
  MdPsychology,
  MdStar,
  MdChat,
  MdEventAvailable,
} from 'react-icons/md';

const caretakers = [
  {
    name: "Sarah M.",
    title: "Certified Pediatric Nurse • 5y exp",
    price: "$25",
    rating: "4.9",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmfKNear-LixPD0Y9GrJtR4x2dN5ShGJ9c4S5tfWWNETqpCEfm5Dn7dsEp-0YtEzR8VshVBM-3UrQMRRK40X_F6ALilU35a3-76R_QQL7s_WslEvmtGakF5YbwP8lkrO3LtZ75rjB6BvFpw7FMCFAUYtP0JX8qkX8Oa6D_bPJ_O7_p-VG9z5QwWwPqmZwZobOK9CqMGJnZeQ_vjJj2wGV6pDhIcQbQKuehzIaDUlQywMNa-1fZfrlJgz3gjcC1_0pE8L0VjazEpDZh",
  },
  {
    name: "David R.",
    title: "Elderly Support Expert • 8y exp",
    price: "$30",
    rating: "5.0",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqmpPsBgjKTaAjM2lIZmCwpq8Btu08ikIUFYEn10t3lbBDW5XXptI1XagpqekGMHrdrepn231KMr7XURqRqv1pAlddDByhIf7kXCPF3KppWA-ZECN9fFpJ0QRegyz_D5ugrNssOWcteq2wB9PME52N4vzkQYPycxY7dL_b_Pdm7SZ7k5I5WDjHai6Ub1vmkxfUurNefgdAjFQwvwg9NqUHDXaT0-bbg1Sb4coL-xgdTHUawNEUoUAO4RdP5bGWG5ztc93v3lgTTFja",
  },
  {
    name: "Emily L.",
    title: "Special Needs Educator • 4y exp",
    price: "$28",
    rating: "4.8",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHm2p1VhORkPBRaKSmO-3tQAwjeSNfxATu90u-lb9EE5Pjfz3VfuEdgNmyB8RGAVzdPAH6FBOxME7w6pvcqDdzHugI6bsI8fVJ-YC70r94nG7IMeKYv1DME7oaudollBwAcfQsvLmezdw-HJZN4xNQLrK_BQAWEcPAnRP5GmCGp8qWsHdmJTLlh-vcTSF2ecoeDphedvEGYImS-WSDhM8bACNKhQHiOPJmTDO1vAKnKIDKL4BMsYDApEovJM46xrohUn8a3s9wy1Kl",
  },
  {
    name: "Michael K.",
    title: "Senior Living Specialist • 10y exp",
    price: "$35",
    rating: "4.9",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpN5PzllfGTe8JjnSgVj2C72nX4U2NXMQItDHUlDkTmdNk1EfTV38Je5EL8iQygHppvSubq_WbBUPcQppYzOaUbtXQ_YwvOcU2yRojGYhRxR5N07q6l_zo4sdEAKTEnJHy42eTpI8ghj_EhYLnzS6BnHiGtXm1Y08OIphE0oAsShMe5neAGkz_yF7mUCRURVYMYtKyqd90qA8D_pOohEgTu7bwLbY08SBRazlSPbyTQ_BIyZ7HkpA0GvuBhQVR5NxDAtdytUYLc2Ht",
  },
];

const Home = () => {


  return (
  <>
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[5%] h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <MdVerified className="text-base" />
                <span>Trusted by 10,000+ families</span>
              </div>

              <h1 className="font-display text-5xl font-extrabold leading-[1.1] text-slate-900 dark:text-slate-50 sm:text-6xl">
                Trusted Care for Your <span className="text-primary">Loved Ones</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Connecting families with premium babysitting, elderly care, and specialized support services.
                Safety and compassion are our top priorities.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all flex items-center gap-2">
                  Find Caretaker <MdArrowForward />
                </button>
                <button className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Become a Caregiver
                </button>
              </div>
            </div>

            {/* Hero Image + Glass Card */}
            <div className="relative">
              <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2dwWEsUj9IV4D_8Cv-vKwkv2-u8ZDB7q_ASJ28iG4XZ9wRvrT1hGHp06Z4krGleDvXEkOFZi4pH0fgqqx4uIqeX8DRGekzYGpV25-humswOhhbn_EHRrEROzpcdIM-MRDRKY-OMr9LmsqTQaGE3MOq7cw-Viks4Kuzc3xgp_9MVBI255qMoD2FpIjGoEub7ZIwcXszA6eIDitw3mTuuUuOBxalcGmpb-G8mXJS-6Jgg_yTvQXpMDvR4tLluDtHkpy73iaM5DRVmUA"
                  alt="Friendly caregiver smiling with an elderly woman"
                />

                {/* Glass Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300" />
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      <span className="block font-bold">Top Rated Caregivers</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Available in your area now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">Our Care Services</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Tailored support for every member of your family</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Babysitting */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <MdChildCare className="text-2xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold font-display">Babysitting</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Professional, background-checked child care for all ages, from newborns to teens.
              </p>
              <a href="#" className="mt-6 inline-flex items-center text-sm font-bold text-primary">
                Learn more <MdArrowForward className="ml-1 text-sm" />
              </a>
            </div>

            {/* Elderly Care */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <MdElderly className="text-2xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold font-display">Elderly Care</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Compassionate daily support, medication reminders, and companionship for seniors.
              </p>
              <a href="#" className="mt-6 inline-flex items-center text-sm font-bold text-teal-600">
                Learn more <MdArrowForward className="ml-1 text-sm" />
              </a>
            </div>

            {/* Special Needs */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <MdPsychology className="text-2xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold font-display">Special Needs</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Specialized assistance and therapy support from experienced medical professionals.
              </p>
              <a href="#" className="mt-6 inline-flex items-center text-sm font-bold text-indigo-600">
                Learn more <MdArrowForward className="ml-1 text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Caretakers */}
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
            {caretakers.map((caretaker, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative mb-4">
                  <img
                    className="h-48 w-full rounded-xl object-cover"
                    src={caretaker.image}
                    alt={caretaker.name}
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white">
                    <MdStar className="text-yellow-500 text-[14px]" /> {caretaker.rating}
                  </div>
                </div>

                <h4 className="font-display font-bold text-slate-900 dark:text-slate-100">{caretaker.name}</h4>
                <p className="text-xs text-slate-500 mb-4">{caretaker.title}</p>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="text-sm">
                    <span className="font-bold text-primary">{caretaker.price}</span>
                    <span className="text-slate-500">/hr</span>
                  </div>
                  <button className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold hover:bg-primary hover:text-white transition-colors group-hover:bg-primary group-hover:text-white">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Finding reliable care is simple and secure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-primary/20" />

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 z-10">
                <MdSearch className="text-2xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold font-display">1. Search</h3>
              <p className="text-slate-600 dark:text-slate-400">Browse through thousands of vetted profiles based on your needs.</p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 z-10">
                <MdChat className="text-2xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold font-display">2. Connect</h3>
              <p className="text-slate-600 dark:text-slate-400">Interview and chat directly with caregivers to find the perfect fit.</p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 z-10">
                <MdEventAvailable className="text-2xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold font-display">3. Book</h3>
              <p className="text-slate-600 dark:text-slate-400">Schedule your care sessions and pay securely through our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold">What Families Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                &quot;Care.xyz changed our lives. We found an incredible nanny for our twins in just two days. The background checks give us such peace of mind.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <h5 className="font-bold text-sm">Amanda Chen</h5>
                  <p className="text-xs text-slate-500">Mother of two</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                &quot;Finding specialized care for my father was stressful until I used this platform. David is professional, kind, and incredibly patient.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <h5 className="font-bold text-sm">Robert Wilson</h5>
                  <p className="text-xs text-slate-500">Senior Care Client</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                &quot;The interface is so clean and easy to use. I love being able to see verified ratings and hourly rates upfront. Great service!&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <h5 className="font-bold text-sm">Jessica Smith</h5>
                  <p className="text-xs text-slate-500">Working Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-8 py-16 text-center text-white shadow-2xl shadow-primary/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-teal-500 opacity-50" />
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="font-display text-4xl font-bold leading-tight">
              Ready to find the best care <br />for your family?
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl opacity-90">
              Join thousands of families who trust Care.xyz for their caregiving needs. Safe, verified, and reliable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="rounded-xl bg-white px-10 py-4 text-base font-bold text-primary shadow-lg hover:translate-y-[-2px] transition-all">
                Get Started Now
              </button>
              <button className="rounded-xl border-2 border-white/30 px-10 py-4 text-base font-bold text-white hover:bg-white/10 transition-all">
                Learn About Safety
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;