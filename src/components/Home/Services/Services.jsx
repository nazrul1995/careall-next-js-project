import React from 'react';
import { MdArrowForward, MdChildCare, MdElderly, MdMedicalServices } from 'react-icons/md';
import ServicesCard from './ServicesCard';
import ServicesData  from '@/data/service';

const Services = ({service}) => {
    return (
            <section id="services" className="py-28 bg-zinc-100 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline text-cyan-500 font-semibold tracking-widest text-sm">WHAT WE OFFER</div>
            <h3 className="text-5xl font-bold tracking-tighter mt-3">Care for every chapter of life</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {
            ServicesData.map((service, ind) => <ServicesCard key={ind} service={service} />)}
          </div>
        </div>
      </section>
    );
};

export default Services;