'use client'
import Link from 'next/link';
import React from 'react';
import { MdVolunteerActivism } from 'react-icons/md';

const Logo = () => {
    return (
        <div>
                 {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-md group-hover:shadow-cyan-400/40 transition-all">
              <MdVolunteerActivism className="text-white text-2xl" />
            </div>

            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              Care<span className="text-cyan-500">.</span>xyz
            </span>
          </Link>
        </div>
    );
};

export default Logo;