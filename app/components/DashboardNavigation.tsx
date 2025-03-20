'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function DashboardNavigation({ 'aria-label': ariaLabel = 'Dashboard Navigation' }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only the specified links in the requested order
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Calendar', href: '/dashboard/calendar' },
    { name: 'Course', href: '/dashboard/course-contents' },
    { name: 'Question Bank', href: '/dashboard/question-bank' },
    { name: 'Full Lengths', href: '/dashboard/full-lengths' },
    { name: 'Analytics', href: '/dashboard/analytics' },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-white shadow-sm" aria-label={ariaLabel}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
            528Prep
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="flex-1 flex justify-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium ${
                  isActive(item.href)
                    ? 'text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Profile Link */}
          <Link
            href="/dashboard/profile"
            className={`text-base font-medium ${
              isActive('/dashboard/profile')
                ? 'text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600'
            } transition-colors`}
          >
            Profile
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[...navigationItems, { name: 'Profile', href: '/dashboard/profile' }].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 