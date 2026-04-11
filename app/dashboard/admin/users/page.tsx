'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  AlertCircle,
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  UserCog,
  ArrowRight,
  Shield,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalCustomers: number;
  activeUsers: number;
  suspendedUsers: number;
  totalOrders: number;
  totalCategories: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats', {
          credentials: 'include',
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setStats(null);
        }
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const dashboardSections = [
    {
      title: 'User Management',
      description: 'Manage all users, providers, and customers',
      icon: Users,
      href: '/dashboard/admin/users/list',
      color: '#ff4d00',
      stats: stats
        ? `${stats.totalUsers} total • ${stats.activeUsers} active`
        : 'View all users',
    },
    {
      title: 'Orders Overview',
      description: 'Monitor and manage all platform orders',
      icon: ShoppingBag,
      href: '/dashboard/admin/orders',
      color: '#10b981',
      stats: stats ? `${stats.totalOrders} orders` : 'View all orders',
    },
    {
      title: 'Categories',
      description: 'Manage meal categories and classifications',
      icon: FolderTree,
      href: '/dashboard/admin/categories',
      color: '#3b82f6',
      stats: stats ? `${stats.totalCategories} categories` : 'Manage categories',
    },
  ];

  const quickStats = [
    {
      label: 'Total Users',
      value: stats?.totalUsers ?? '-',
      icon: Users,
      color: '#ff4d00',
    },
    {
      label: 'Providers',
      value: stats?.totalProviders ?? '-',
      icon: UserCog,
      color: '#3b82f6',
    },
    {
      label: 'Active Users',
      value: stats?.activeUsers ?? '-',
      icon: TrendingUp,
      color: '#10b981',
    },
    {
      label: 'Suspended',
      value: stats?.suspendedUsers ?? '-',
      icon: Shield,
      color: '#ef4444',
    },
  ];

  return (
    <div className='py-6 space-y-8 mx-auto max-w-7xl w-full'>
      {/* Header */}
      <div className='space-y-2'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center'>
            <Shield className='w-5 h-5 text-[#ff4d00]' />
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>
            Admin Dashboard
          </h1>
        </div>
        <p className='text-zinc-400'>
          Manage your platform, users, and orders from one central hub
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {loading
          ? [...Array(4)].map((_, i) => (
              <Card key={i} className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='p-4'>
                  <Skeleton className='h-4 w-20 bg-zinc-800 mb-2' />
                  <Skeleton className='h-8 w-16 bg-zinc-800' />
                </CardContent>
              </Card>
            ))
          : quickStats.map((stat) => (
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

      {/* Main Sections Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
              <CardContent className='space-y-2'>
                <CardTitle className='text-lg text-white group-hover:text-[#ff4d00] transition-colors'>
                  {section.title}
                </CardTitle>
                <p className='text-sm text-zinc-500'>{section.description}</p>
                <p className='text-xs text-zinc-600 pt-2 border-t border-zinc-800/50 mt-3'>
                  {section.stats}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* System Status / Info */}
      <Card className='bg-zinc-900/30 border-zinc-800/50'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-white flex items-center gap-2 text-base'>
            <LayoutDashboard className='w-4 h-4 text-[#ff4d00]' />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-3'>
            <Link href='/dashboard'>
              <Button
                variant='outline'
                size='sm'
                className='border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              >
                <LayoutDashboard className='w-4 h-4 mr-2' />
                Main Dashboard
              </Button>
            </Link>
            <Link href='/meals'>
              <Button
                variant='outline'
                size='sm'
                className='border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              >
                <ShoppingBag className='w-4 h-4 mr-2' />
                Browse Meals
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3'>
          <AlertCircle className='w-5 h-5 text-red-500 shrink-0' />
          <p className='text-red-400 text-sm'>{error}</p>
        </div>
      )}
    </div>
  );
}
