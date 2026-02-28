import React from 'react';

const Testimonial = () => {
    return (
            <section className="py-28 bg-zinc-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold tracking-tight">Real families. Real love.</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "Elena has been with us for 9 months. My mom lights up every time she walks in. This platform is a miracle.",
                name: "Priya Sharma",
                role: "Daughter, New Jersey",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "Found a night nanny within 48 hours when I was desperate. She’s gentle, experienced, and my baby sleeps through the night now.",
                name: "Marcus Chen",
                role: "New dad, California",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-10 rounded-3xl">
                <div className="flex gap-1 text-amber-400 mb-6">★★★★★</div>
                <p className="text-xl leading-relaxed italic text-zinc-700 dark:text-zinc-300">“{t.quote}”</p>
                <div className="mt-10 flex gap-4 items-center">
                  <img src={t.avatar} alt="" className="w-12 h-12 rounded-2xl" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Testimonial;