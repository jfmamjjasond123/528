'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ 'aria-label': ariaLabel = 'Navigation' }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white shadow-sm" aria-label={ariaLabel}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            528Prep
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="flex-1 flex justify-center space-x-8">
            <Link
              href="/features"
              className={`text-base font-medium ${
                isActive('/features')
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              } transition-colors`}
            >
              Features
            </Link>
            <Link
              href="/about-us"
              className={`text-base font-medium ${
                isActive('/about-us')
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              } transition-colors`}
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className={`text-base font-medium ${
                isActive('/contact-us')
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              } transition-colors`}
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className={`text-base font-medium ${
                isActive('/faq')
                  ? 'text-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600'
              } transition-colors`}
            >
              FAQ
            </Link>
          </nav>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/authentication/signin"
              className="text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/authentication/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-base font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 