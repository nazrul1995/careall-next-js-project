'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function Breadcrumb({ profile }) {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
      <Link href="/" className="hover:text-primary transition-colors">
        Home
      </Link>

      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;

        return (
          <React.Fragment key={href}>
            <span className="text-xs">›</span>

            {isLast ? (
              <span className="text-slate-900 dark:text-slate-200 font-medium">
                {profile?.name || decodeURIComponent(segment)}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-primary transition-colors"
              >
                {decodeURIComponent(segment)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}