
import Banner from '@/components/Home/Banner';
import Caretakers from '@/components/Home/Services/Caretakers';
import { getServerSession } from 'next-auth';
import React from 'react';
import {
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


const Home = async () => {

  const serverSession = await getServerSession();
  return (
  <>
      {/* Hero Section */}
      <Banner></Banner>
      <p>{JSON.stringify(serverSession)}</p>
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
      <Caretakers/>

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