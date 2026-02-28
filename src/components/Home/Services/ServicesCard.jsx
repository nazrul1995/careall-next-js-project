import Link from 'next/link';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import * as MdIcons from "react-icons/md";

const ServicesCard = ({ service, ind }) => {
      const IconComponent = MdIcons[service.icon];
    return (
        <div key={ind} className="group bg-white dark:bg-zinc-950 border border-transparent hover:border-cyan-200 dark:hover:border-cyan-900 rounded-3xl p-10 transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className={`${service.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-5xl group-hover:scale-110 transition-transform`}>
                {IconComponent && <IconComponent />}
            </div>
            <h4 className="text-3xl font-semibold mb-3">{service.title}</h4>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{service.desc}</p>
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-xs text-zinc-500 block">Starting at</span>
                    <span className="text-2xl font-semibold text-cyan-600">{service.price}</span>
                </div>
                <Link href={`/services/${service._id}`} className="text-cyan-500 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore <MdArrowForward className="text-lg" />
                </Link>
            </div>
        </div>
    );
};

export default ServicesCard;