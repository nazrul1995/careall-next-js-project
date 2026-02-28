import React from 'react';

const Cta = () => {
    return (
        <div className="bg-gradient-to-br from-cyan-600 to-teal-600 py-24 text-white">
            <div className="max-w-3xl mx-auto text-center px-6">
                <div className="text-6xl font-bold tracking-tighter leading-none mb-6">
                    Ready for peace of mind?
                </div>
                <p className="text-2xl opacity-90 mb-10">Join thousands of families who found the perfect caregiver this month.</p>
                <button className="bg-white text-cyan-700 hover:bg-white/90 font-semibold text-xl px-16 py-7 rounded-3xl shadow-2xl shadow-cyan-900/30 transition-all active:scale-95">
                    Start Your Search — It’s Free
                </button>
                <p className="text-sm mt-6 opacity-75">Takes less than 90 seconds • No credit card required</p>
            </div>
        </div>
    );
};

export default Cta;