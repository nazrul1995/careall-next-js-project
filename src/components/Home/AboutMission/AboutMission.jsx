import React from 'react';

const AboutMission = () => {
    return (
            <section id="about" className="py-28 bg-white dark:bg-zinc-950">
               <div className="max-w-7xl mx-auto px-6">
                 <div className="grid lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-8">
                     <div className="uppercase text-cyan-500 font-semibold tracking-[3px] text-sm">OUR STORY</div>
                     <h2 className="text-5xl font-bold leading-tight tracking-tighter">
                       Care isn’t a service.<br />It’s a relationship.
                     </h2>
                     <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-md">
                       We match families with caregivers who don’t just show up — they become part of the family.
                     </p>
       
                     <div className="grid grid-cols-3 gap-6 pt-6">
                       {[
                         { num: "98%", label: "Match success" },
                         { num: "4.8x", label: "Faster than industry" },
                         { num: "100%", label: "Money-back guarantee" },
                       ].map((stat, i) => (
                         <div key={i} className="text-center">
                           <div className="text-4xl font-bold text-cyan-500 mb-1">{stat.num}</div>
                           <div className="text-xs uppercase tracking-widest text-zinc-500">{stat.label}</div>
                         </div>
                       ))}
                     </div>
                   </div>
       
                   <div className="grid grid-cols-2 gap-6">
                     <img 
                       src="https://images.unsplash.com/photo-1581578731547-79b7e2d8d6e3?auto=format&fit=crop&w=800&q=85" 
                       alt="Elderly woman smiling with caregiver"
                       className="rounded-3xl aspect-square object-cover shadow-xl"
                     />
                     <div className="space-y-6 pt-12">
                       <img 
                         src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85" 
                         alt="Baby care"
                         className="rounded-3xl aspect-video object-cover shadow-xl"
                       />
                       <img 
                         src="https://images.unsplash.com/photo-1576765607924-3f7b8410a787?auto=format&fit=crop&w=800&q=85" 
                         alt="Senior care"
                         className="rounded-3xl aspect-video object-cover shadow-xl"
                       />
                     </div>
                   </div>
                 </div>
               </div>
             </section>
    );
};

export default AboutMission;