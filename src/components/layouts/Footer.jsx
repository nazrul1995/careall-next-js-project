const { MdVolunteerActivism } = require("react-icons/md");

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 text-zinc-400 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center">
                                <MdVolunteerActivism className="text-white text-2xl" />
                            </div>
                            <span className="text-2xl font-bold text-white">Care.xyz</span>
                        </div>
                        <p className="max-w-xs">Modern care for modern families. Compassionate. Secure. Instant.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-16 gap-y-12 text-sm">
                        <div>
                            <div className="font-semibold text-white mb-4">Platform</div>
                            <div className="space-y-3">
                                <div>Find Caregivers</div>
                                <div>Browse Services</div>
                                <div>Pricing</div>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-white mb-4">Company</div>
                            <div className="space-y-3">
                                <div>About Us</div>
                                <div>Careers</div>
                                <div>Blog</div>
                                <div>Contact</div>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-white mb-4">Legal</div>
                            <div className="space-y-3">
                                <div>Safety First</div>
                                <div>Privacy</div>
                                <div>Terms</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-zinc-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>© 2026 Care.xyz • All rights reserved</div>
                    <div className="flex gap-6">
                        <div>support@care.xyz</div>
                        <div>Made with ❤️ for families everywhere</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;