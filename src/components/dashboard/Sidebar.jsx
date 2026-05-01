'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdDashboard,
  MdCalendarToday,
  MdPerson,
  MdMessage,
  MdSettings
} from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "../shared/Logo";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const role = session?.user?.role || "Client";

  const menus = {
    Client: [
      { label: "Dashboard", path: "/dashboard/client", icon: MdDashboard },
      { label: "Paymen History", path: "/dashboard/client/payment", icon: MdDashboard },
      { label: "My Bookings", path: "/dashboard/client/bookings", icon: MdCalendarToday },
      { label: "Profile", path: "/dashboard/client/profile", icon: MdPerson },
    ],
    Caregiver: [
      { label: "Dashboard", path: "/dashboard/caregiver", icon: MdDashboard },
      { label: "Available Jobs", path: "/dashboard/caregiver/jobs", icon: MdCalendarToday },
      { label: "Messages", path: "/dashboard/caregiver/messages", icon: MdMessage },
    ],
    Admin: [
      { label: "Dashboard", path: "/dashboard/admin", icon: MdDashboard },
      { label: "Users", path: "/dashboard/admin/users", icon: MdPerson },
      { label: "Settings", path: "/dashboard/admin/settings", icon: MdSettings },
    ],
  };

  const navItems = menus[role] || menus.Client;

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
      >
        {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 lg:w-64 bg-white dark:bg-slate-900 
        border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5">

          <Logo />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-200 ${active
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                <Icon className="text-2xl" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-4 flex items-center gap-3">
            <img
              src={session?.user?.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-slate-900 dark:text-white">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {role} • Premium
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}