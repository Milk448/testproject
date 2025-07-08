'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              width={32}
              height={32}
              src="/images/cover.jpg"
              alt="Workshops.io"
              className="h-8 w-8 rounded-full object-cover"
              onError={() => console.error('Logo image failed to load: /images/cover.jpg')}
            />
            <span className="text-2xl font-bold text-indigo-600 font-poppins sm:text-xl">
              Workshops.io
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              href="/workshops"
              className="text-blue-400 hover:text-blue-500 hover:underline font-poppins text-sm transition-all duration-300"
            >
              Browse Workshops
            </Link>
            {token ? (
              <>
              
              <Link href="/my-bookings" className="text-blue-400 hover:text-blue-500 hover:underline font-poppins text-sm transition-all duration-300">My Bookings</Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-poppins text-sm hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-amber-400 hover:text-amber-500 hover:underline font-poppins text-sm transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg font-poppins text-sm hover:bg-teal-600 hover:scale-105 transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-indigo-600 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 py-4 px-4 transition-all duration-300">
            <Link
              href="/workshops"
              className="block py-2 text-amber-400 hover:text-amber-500 hover:underline font-poppins text-sm"
              onClick={toggleMobileMenu}
            >
              Browse Workshops
            </Link>
            {token ? (
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left py-2 text-indigo-600 hover:text-indigo-700 hover:underline font-poppins text-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 text-amber-400 hover:text-amber-500 hover:underline font-poppins text-sm"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 text-teal-500 hover:text-teal-600 hover:underline font-poppins text-sm"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;