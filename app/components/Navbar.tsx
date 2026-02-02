'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAuth } from '../auth/useAuth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className='container mx-auto px-6 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <span className='text-2xl font-black tracking-tighter text-primary'>
            FOOD<span className='text-foreground'>HUB</span>
          </span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          <Link
            href='/meals'
            className='font-semibold text-white transition-colors'
          >
            Meals
          </Link>
          <Link
            href='/providers'
            className='font-semibold text-white transition-colors'
          >
            Providers
          </Link>
          <Link
            href='#register'
            className='font-semibold text-white transition-colors'
          ></Link>
        </div>

        <div className='flex items-center gap-4'>
          <Link
            href='/auth/login'
            className='hidden sm:block font-bold text-white transition-colors'
          >
            Sign In
          </Link>
          <Link
            href='/auth/register'
            className='bg-orange-500 btn py-3 font-bold rounded-full px-5 text-sm'
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
