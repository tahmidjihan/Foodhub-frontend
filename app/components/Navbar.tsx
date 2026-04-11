'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/auth/useAuth';
import { getCategories, type Category } from '@/lib/api';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  UtensilsCrossed,
  Users,
  Info,
  Phone,
  Grid3X3,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import Image from 'next/image';
import { authClient } from '@/app/auth/auth';
import { toast } from 'sonner';

const navRoutes = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Meals', href: '/meals', icon: UtensilsCrossed },
  { name: 'Providers', href: '/providers', icon: Users },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const session = useAuth();
  const user = session?.data?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (categoriesOpen && categories.length === 0 && !categoriesLoading) {
      setCategoriesLoading(true);
      getCategories().then((res) => {
        if (res.data) setCategories(res.data);
        setCategoriesLoading(false);
      });
    }
  }, [categoriesOpen]);

  // Fetch cart count
  useEffect(() => {
    if (user) {
      fetch(`/api/cart`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setCartCount(data.length);
        })
        .catch(() => setCartCount(0));
    }
  }, [user]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-dark/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 group'>
          <span className='text-2xl font-black tracking-tighter text-[#ff4d00] group-hover:text-[#ff7433] transition-colors'>
            FOOD
            <span className='text-white'>HUB</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden lg:flex items-center gap-1'>
          {navRoutes.map((route) => (
            <Link
              key={route.name}
              href={route.href}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all rounded-lg ${
                isActive(route.href)
                  ? 'text-[#ff4d00] bg-white/5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <route.icon className='w-4 h-4' />
              {route.name}
            </Link>
          ))}

          {/* Categories Mega Menu */}
          <div
            className='relative'
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all rounded-lg ${
                categoriesOpen
                  ? 'text-[#ff4d00] bg-white/5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Grid3X3 className='w-4 h-4' />
              Categories
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Mega Menu */}
            {categoriesOpen && (
              <div className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 z-50'>
                <h4 className='text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4'>
                  Browse by Category
                </h4>
                {categoriesLoading ? (
                  <div className='grid grid-cols-3 gap-4'>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className='flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse'
                      >
                        <div className='w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700' />
                        <div className='w-16 h-3 bg-zinc-200 dark:bg-zinc-700 rounded' />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='grid grid-cols-3 gap-3'>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/meals?category=${cat.id}`}
                        className='flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group'
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <div className='w-12 h-12 rounded-full bg-[#ff4d00]/10 flex items-center justify-center group-hover:bg-[#ff4d00]/20 transition-colors'>
                          {cat.image ? (
                            <Image
                              src={cat.image}
                              alt={cat.name}
                              width={28}
                              height={28}
                              className='rounded-full object-cover'
                            />
                          ) : (
                            <UtensilsCrossed className='w-5 h-5 text-[#ff4d00]' />
                          )}
                        </div>
                        <span className='text-xs font-semibold text-zinc-700 dark:text-zinc-300 text-center'>
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Auth Buttons & Cart */}
        <div className='flex items-center gap-3'>
          {user && (
            <Link
              href='/dashboard/cart'
              className='relative text-white/80 hover:text-white transition-colors p-2'
            >
              <ShoppingCart className='w-5 h-5' />
              {cartCount > 0 && (
                <span className='absolute -top-1 -right-1 w-5 h-5 bg-[#ff4d00] text-white text-xs font-bold rounded-full flex items-center justify-center'>
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className='hidden sm:flex items-center gap-2'>
              <Link
                href='/dashboard'
                className='flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all'
              >
                <LayoutDashboard className='w-4 h-4' />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className='flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white/80 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all'
              >
                <LogOut className='w-4 h-4' />
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href='/auth/login'
              className='hidden sm:block text-sm font-semibold text-white/80 hover:text-white transition-colors px-4 py-2'
            >
              Sign In
            </Link>
          )}
          <Link
            href='/auth/register'
            className='bg-[#ff4d00] hover:bg-[#ff7433] text-white py-2.5 px-5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-[#ff4d00]/25'
          >
            Get Started
          </Link>

          {/* Mobile Toggle */}
          <button
            className='lg:hidden text-white p-2'
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Toggle menu'
          >
            {mobileOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className='lg:hidden bg-dark/95 backdrop-blur-md border-t border-white/10 mt-2 max-h-[calc(100vh-80px)] overflow-y-auto'>
          <div className='max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1'>
            {navRoutes.map((route) => (
              <Link
                key={route.name}
                href={route.href}
                className={`flex items-center gap-3 px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                  isActive(route.href)
                    ? 'text-[#ff4d00] bg-white/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <route.icon className='w-5 h-5' />
                {route.name}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className='px-4 py-2'>
              <p className='text-sm font-semibold text-white/60 uppercase tracking-wider mb-2'>
                Categories
              </p>
              {categoriesLoading ? (
                <div className='grid grid-cols-3 gap-2'>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className='flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 animate-pulse'
                    >
                      <div className='w-8 h-8 rounded-full bg-white/10' />
                      <div className='w-12 h-2 bg-white/10 rounded' />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='grid grid-cols-3 gap-2'>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/meals?category=${cat.id}`}
                      className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors'
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className='w-8 h-8 rounded-full bg-[#ff4d00]/10 flex items-center justify-center'>
                        {cat.image ? (
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            width={20}
                            height={20}
                            className='rounded-full object-cover'
                          />
                        ) : (
                          <UtensilsCrossed className='w-4 h-4 text-[#ff4d00]' />
                        )}
                      </div>
                      <span className='text-xs font-medium text-white/80 text-center truncate w-full'>
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className='border-t border-white/10 my-2' />
            {user ? (
              <>
                <Link
                  href='/dashboard'
                  className='flex items-center gap-3 px-4 py-3 text-base font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all'
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className='w-5 h-5' />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  className='flex items-center gap-3 px-4 py-3 text-base font-semibold text-red-400 hover:bg-white/10 rounded-lg transition-all text-left'
                >
                  <LogOut className='w-5 h-5' />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href='/auth/login'
                className='flex items-center gap-3 px-4 py-3 text-base font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all'
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
