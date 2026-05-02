'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { MdMenu, MdClose, MdVolunteerActivism } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AuthButtons from '../Buttons/AuthButtons';
import Logo from '../shared/Logo';

const Navbar = () => {
  const pathname = usePathname();

  const { data: session } = useSession();
  console.log("this if from session", session)
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Caregivers', href: '/caregivers' },
  ];

  const isActive = (href) => pathname === href;
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/40 dark:border-zinc-800/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">
          <Logo/>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 transition"
              >
                {link.name}

                {isActive(link.href) && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-cyan-500 rounded"
                  />
                )}
              </Link>
            ))}

          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">

            {!session && (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:scale-105 transition shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}

            {session && (
              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={session.user?.image ||'/avatar.png'}
                    width={50}
                    height={50}
                    alt="user"
                    className="w-9 h-9 rounded-full ring-2 ring-transparent hover:ring-cyan-400 transition"
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                    >

                      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                        <p className="font-semibold text-sm text-zinc-900 dark:text-white">
                          {session.user?.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {session.user?.email}
                        </p>
                      </div>

                      <div className="p-2">

                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          Dashboard
                        </Link>

                        <Link
                          href="/profile"
                          className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          Profile
                        </Link>

                       <AuthButtons></AuthButtons>

                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;