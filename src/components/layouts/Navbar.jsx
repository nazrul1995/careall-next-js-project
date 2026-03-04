'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { MdMenu, MdClose, MdVolunteerActivism } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();

  if (pathname.startsWith('/dashboard')) return <> </>; // hide navbar on caretakers page

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
            {!session && (
              <>
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
              </>
            )}
            {session && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'user'}
                      className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-cyan-500 transition-all"
                    />
                  )}
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {session.user?.name || 'User'}
                  </span>
                </button>
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 z-50"
                    >
                      <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                        {session.user?.image && (
                          <img
                            src={session.user.image}
                            alt={session.user.name || 'user'}
                            className="w-10 h-10 rounded-full mb-2"
                          />
                        )}
                        <p className="font-semibold text-zinc-900 dark:text-white">
                          {session.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-cyan-50 dark:hover:bg-zinc-800 rounded transition-colors"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-cyan-50 dark:hover:bg-zinc-800 rounded transition-colors"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: '/' });
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-800 rounded transition-colors border-t border-zinc-200 dark:border-zinc-700 mt-1"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
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

              {!session && (
                <>
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
                </>
              )}
              {session && (
                <>
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 py-2"
                    >
                      {session.user?.image && (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'user'}
                          className="inline-block w-6 h-6 rounded-full cursor-pointer"
                        />
                      )}
                      <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                        {session.user?.name || 'User'}
                      </span>
                    </button>
                    {/* Mobile Dropdown Menu */}
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 space-y-1 bg-zinc-50 dark:bg-zinc-800 rounded p-2"
                        >
                          <Link
                            href="/dashboard"
                            onClick={() => {
                              setIsProfileOpen(false);
                              setIsOpen(false);
                            }}
                            className="block py-2 px-4 text-base font-medium text-zinc-700 dark:text-zinc-200 hover:bg-cyan-100 dark:hover:bg-zinc-700 rounded transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => {
                              setIsProfileOpen(false);
                              setIsOpen(false);
                            }}
                            className="block py-2 px-4 text-base font-medium text-zinc-700 dark:text-zinc-200 hover:bg-cyan-100 dark:hover:bg-zinc-700 rounded transition-colors"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => {
                              signOut({ callbackUrl: '/' });
                              setIsProfileOpen(false);
                              setIsOpen(false);
                            }}
                            className="w-full text-left py-2 px-4 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-zinc-700 rounded transition-colors"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;