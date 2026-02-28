import React from 'react';

const HowWorks = () => {
    return (
          <section id="how" className="py-28 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="text-cyan-500 font-semibold tracking-widest">3 STEPS. 5 MINUTES.</div>
            <h3 className="text-5xl font-bold tracking-tighter mt-4">From “I need help” to “I feel supported”</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Tell us what you need", desc: "Answer a few quick questions about your loved one’s needs and schedule." },
              { step: "02", title: "Meet your perfect match", desc: "Get handpicked, background-checked caregivers who actually fit your family." },
              { step: "03", title: "Book with confidence", desc: "Choose dates, meet virtually or in-person, then book securely." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-zinc-100 dark:text-zinc-900 absolute -top-8 -left-4 tracking-tighter">{item.step}</div>
                <div className="pt-16">
                  <h4 className="font-semibold text-2xl mb-4">{item.title}</h4>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default HowWorks;