'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdMenu, MdClose, MdVolunteerActivism } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'For Caregivers', href: '/caregivers' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
              <MdVolunteerActivism className="text-white text-2xl sm:text-3xl" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
              Care<span className="text-cyan-500">.</span>xyz
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg transition-all ${
                  isActive(link.href)
                    ? 'text-cyan-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-cyan-500'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4 ml-6 lg:ml-8">
            <Link
              href="/login"
              className="px-4 lg:px-6 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-5 lg:px-7 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    isActive(link.href) ? 'text-cyan-600 font-semibold' : 'text-zinc-700 dark:text-zinc-300 hover:text-cyan-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-3 px-6 rounded-xl text-center font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;