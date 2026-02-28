import React from 'react';

const TrustBar = () => {
    return (
        <div>
            {/* Trust Bar */}
            <div className="border-y border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-9">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center">
                    {[
                        ["12,458", "Families helped"],
                        ["4.98", "Average rating"],
                        ["2,340", "Active caregivers"],
                        ["24/7", "Dedicated support"]
                    ].map(([num, label], i) => (
                        <div key={i}>
                            <div className="text-4xl font-semibold text-cyan-500 mb-1 tracking-tighter">{num}</div>
                            <div className="text-sm text-zinc-500 font-medium">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBar;