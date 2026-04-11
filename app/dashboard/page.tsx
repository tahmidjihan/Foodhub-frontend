'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  getDashboardStats,
  getRecentOrders,
} from '@/lib/api';
import { DashboardStats, Order, User } from '@/types';
import {
  ShoppingBag,
  Utensils,
  ChefHat,
  UserCircle,
  Package,
  CreditCard,
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/auth/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
};

function DashboardHome() {
  const session = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = session.data?.user as User | undefined;
  const userName = user?.name || 'Guest';
  const firstName = userName.split(' ')[0];
  const userRole = user?.role || 'Customer';

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [statsRes, ordersRes] = await Promise.all([
          getDashboardStats(),
          getRecentOrders(3),
        ]);

        const hasAuthError =
          statsRes.error?.includes('401') ||
          ordersRes.error?.includes('401') ||
          statsRes.error?.includes('Unauthorized') ||
          ordersRes.error?.includes('Unauthorized');

        if (hasAuthError) {
          setError('Please sign in to view your dashboard');
          setLoading(false);
          return;
        }

        if (statsRes.data) setStats(statsRes.data);
        if (ordersRes.data) setRecentOrders(ordersRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Dashboard navigation sections
  const dashboardSections = [
    {
      title: 'My Orders',
      description: 'View and track all your food orders',
      icon: ShoppingBag,
      href: '/dashboard/orders',
      color: '#ff4d00',
      stat: stats?.activeOrders
        ? `${stats.activeOrders} active`
        : 'View orders',
    },
    {
      title: 'Browse Meals',
      description: 'Discover delicious meals from providers',
      icon: Utensils,
      href: '/meals',
      color: '#10b981',
      stat: 'Explore menu',
    },
    {
      title: 'Find Providers',
      description: 'See all available food providers',
      icon: ChefHat,
      href: '/providers',
      color: '#3b82f6',
      stat: 'View providers',
    },
    {
      title: 'My Cart',
      description: 'Items ready for checkout',
      icon: Package,
      href: '/dashboard/cart',
      color: '#f59e0b',
      stat: 'Go to cart',
    },
    {
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: UserCircle,
      href: '/dashboard/edit-profile',
      color: '#8b5cf6',
      stat: 'Manage profile',
    },
    {
      title: 'My Reviews',
      description: 'See and manage your reviews',
      icon: Star,
      href: '/dashboard/reviews',
      color: '#ec4899',
      stat: 'View reviews',
    },
  ];

  // Provider-only sections
  const providerSections = [
    {
      title: 'My Meals',
      description: 'Manage your meal offerings',
      icon: Utensils,
      href: '/dashboard/provider/myMeals',
      color: '#ff4d00',
      stat: 'Manage menu',
    },
    {
      title: 'Provider Orders',
      description: 'View orders for your meals',
      icon: ShoppingBag,
      href: '/dashboard/provider/orders',
      color: '#10b981',
      stat: 'View orders',
    },
    {
      title: 'Add Meal',
      description: 'Create a new meal offering',
      icon: ChefHat,
      href: '/dashboard/provider/meals/add',
      color: '#3b82f6',
      stat: 'Add new',
    },
  ];

  // Quick stats cards
  const quickStats = [
    {
      label: 'Total Orders',
      value: stats?.totalOrders ?? '-',
      icon: ShoppingBag,
      color: '#ff4d00',
    },
    {
      label: 'Active Orders',
      value: stats?.activeOrders ?? '-',
      icon: Clock,
      color: '#3b82f6',
    },
    {
      label: 'Completed',
      value: stats?.completedOrders ?? '-',
      icon: CheckCircle,
      color: '#10b981',
    },
    {
      label: 'Total Spent',
      value: stats?.totalSpending
        ? `$${stats.totalSpending.toFixed(0)}`
        : '-',
      icon: CreditCard,
      color: '#8b5cf6',
    },
  ];

  if (loading) {
    return (
      <div className='space-y-6 py-6'>
        <Skeleton className='h-10 w-64 bg-zinc-800' />
        <Skeleton className='h-4 w-96 bg-zinc-800' />

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='p-4'>
                <Skeleton className='h-4 w-20 bg-zinc-800 mb-2' />
                <Skeleton className='h-8 w-16 bg-zinc-800' />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, i) => (
            <Card key={i} className='bg-zinc-900/50 border-zinc-800'>
              <CardHeader className='pb-3'>
                <Skeleton className='h-12 w-12 bg-zinc-800 rounded-xl' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-5 w-32 bg-zinc-800 mb-2' />
                <Skeleton className='h-4 w-full bg-zinc-800' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='py-6'
      >
        <motion.div variants={itemVariants}>
          <Card className='bg-red-500/10 border-red-500/30'>
            <CardContent className='p-8 text-center'>
              <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
              <p className='text-red-400 text-lg'>{error}</p>
              <Link href='/auth/login'>
                <Button className='mt-4 bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
                  Go to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='space-y-8 py-6 pb-8'
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className='space-y-2'>
        <div className='flex items-center gap-2 flex-wrap'>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>
            {getGreeting()}, {firstName}
          </h1>
          <Sparkles className='w-5 h-5 sm:w-6 sm:h-6 text-[#ff4d00]' />
        </div>
        <p className='text-zinc-400 text-sm sm:text-base'>
          Welcome to your dashboard. Here&apos;s everything you can do.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {quickStats.map((stat) => (
            <Card
              key={stat.label}
              className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors'
            >
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-xs text-zinc-500 mb-1'>{stat.label}</p>
                    <p className='text-xl sm:text-2xl font-bold text-white'>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className='w-10 h-10 rounded-lg flex items-center justify-center'
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon
                      className='w-5 h-5'
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Main Navigation Grid */}
      <motion.div variants={itemVariants} className='space-y-2'>
        <h2 className='text-lg font-semibold text-white'>Quick Access</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {dashboardSections.map((section) => (
            <Link key={section.title} href={section.href} className='group'>
              <Card className='h-full bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all group-hover:translate-y-[-2px]'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div
                      className='w-12 h-12 rounded-xl flex items-center justify-center'
                      style={{ backgroundColor: `${section.color}15` }}
                    >
                      <section.icon
                        className='w-6 h-6'
                        style={{ color: section.color }}
                      />
                    </div>
                    <ArrowRight className='w-5 h-5 text-zinc-600 group-hover:text-[#ff4d00] transition-colors' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-1'>
                  <CardTitle className='text-lg text-white group-hover:text-[#ff4d00] transition-colors'>
                    {section.title}
                  </CardTitle>
                  <p className='text-sm text-zinc-500'>{section.description}</p>
                  <p className='text-xs text-zinc-600 pt-2 border-t border-zinc-800/50 mt-2'>
                    {section.stat}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Provider Sections (only for providers) */}
      {userRole === 'Provider' && (
        <motion.div variants={itemVariants} className='space-y-2'>
          <h2 className='text-lg font-semibold text-white'>Provider Tools</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {providerSections.map((section) => (
              <Link key={section.title} href={section.href} className='group'>
                <Card className='h-full bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all group-hover:translate-y-[-2px]'>
                  <CardHeader className='pb-3'>
                    <div className='flex items-start justify-between'>
                      <div
                        className='w-12 h-12 rounded-xl flex items-center justify-center'
                        style={{ backgroundColor: `${section.color}15` }}
                      >
                        <section.icon
                          className='w-6 h-6'
                          style={{ color: section.color }}
                        />
                      </div>
                      <ArrowRight className='w-5 h-5 text-zinc-600 group-hover:text-[#ff4d00] transition-colors' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-1'>
                    <CardTitle className='text-lg text-white group-hover:text-[#ff4d00] transition-colors'>
                      {section.title}
                    </CardTitle>
                    <p className='text-sm text-zinc-500'>{section.description}</p>
                    <p className='text-xs text-zinc-600 pt-2 border-t border-zinc-800/50 mt-2'>
                      {section.stat}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Orders Preview */}
      {recentOrders.length > 0 && (
        <motion.div variants={itemVariants} className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-white'>Recent Orders</h2>
            <Link href='/dashboard/orders'>
              <Button
                variant='ghost'
                size='sm'
                className='text-[#ff4d00] hover:text-[#ff7433] hover:bg-[#ff4d00]/10'
              >
                View All
                <ArrowRight className='w-4 h-4 ml-1' />
              </Button>
            </Link>
          </div>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='p-4 space-y-2'>
              {recentOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className='flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center'>
                      <Utensils className='w-4 h-4 text-zinc-500' />
                    </div>
                    <div>
                      <p className='font-medium text-white text-sm'>
                        {order.Meal?.name || 'Unknown Meal'}
                      </p>
                      <p className='text-xs text-zinc-500'>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Completed'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : order.status === 'Pending'
                          ? 'bg-yellow-500/15 text-yellow-400'
                          : 'bg-blue-500/15 text-blue-400'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

export default DashboardHome;
