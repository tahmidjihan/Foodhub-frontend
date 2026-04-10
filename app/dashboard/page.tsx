'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getDashboardStats,
  getDashboardChartData,
  getDashboardStatusDistribution,
  getRecentOrders,
} from '@/lib/api';
import {
  DashboardStats,
  ChartDataPoint,
  StatusDistribution,
  Order,
} from '@/types';
import {
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Link from 'next/link';

function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [statusData, setStatusData] = useState<StatusDistribution[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [statsRes, chartRes, statusRes, ordersRes] = await Promise.all([
          getDashboardStats(),
          getDashboardChartData(),
          getDashboardStatusDistribution(),
          getRecentOrders(5),
        ]);

        if (statsRes.data) setStats(statsRes.data);
        if (chartRes.data) setChartData(chartRes.data);
        if (statusRes.data) setStatusData(statusRes.data);
        if (ordersRes.data) setRecentOrders(ordersRes.data);

        if (
          statsRes.error ||
          chartRes.error ||
          statusRes.error ||
          ordersRes.error
        ) {
          setError('Failed to load some dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className='space-y-6'>
        {/* Stats cards skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='pt-6'>
                <Skeleton className='h-4 w-24 bg-zinc-800 mb-2' />
                <Skeleton className='h-8 w-32 bg-zinc-800' />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='pt-6'>
              <Skeleton className='h-64 w-full bg-zinc-800' />
            </Card>
          </Card>
          <Card className='bg-zinc-900/50 border-zinc-800'>
            <CardContent className='pt-6'>
              <Skeleton className='h-64 w-full bg-zinc-800' />
            </Card>
          </Card>
        </div>

        {/* Table skeleton */}
        <Card className='bg-zinc-900/50 border-zinc-800'>
          <CardContent className='pt-6'>
            <Skeleton className='h-8 w-48 bg-zinc-800 mb-4' />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-12 w-full bg-zinc-800 mb-2' />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className='bg-zinc-900/50 border-zinc-800'>
        <CardContent className='pt-6 text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-zinc-400'>{error}</p>
          <p className='text-zinc-500 text-sm mt-2'>
            Please try refreshing the page
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-zinc-400 mb-1'>Total Orders</p>
                <p className='text-3xl font-bold text-white'>
                  {stats?.totalOrders || 0}
                </p>
              </div>
              <div className='w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center'>
                <ShoppingBag className='w-6 h-6 text-[#ff4d00]' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-zinc-400 mb-1'>Total Spending</p>
                <p className='text-3xl font-bold text-[#008148]'>
                  ${stats?.totalSpending?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className='w-12 h-12 bg-[#008148]/10 rounded-xl flex items-center justify-center'>
                <DollarSign className='w-6 h-6 text-[#008148]' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-zinc-400 mb-1'>Active Orders</p>
                <p className='text-3xl font-bold text-blue-500'>
                  {stats?.activeOrders || 0}
                </p>
              </div>
              <div className='w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center'>
                <Clock className='w-6 h-6 text-blue-500' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-zinc-400 mb-1'>Completed</p>
                <p className='text-3xl font-bold text-[#008148]'>
                  {stats?.completedOrders || 0}
                </p>
              </div>
              <div className='w-12 h-12 bg-[#008148]/10 rounded-xl flex items-center justify-center'>
                <CheckCircle className='w-6 h-6 text-[#008148]' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Line/Bar Chart - Order Trends */}
        <Card className='bg-zinc-900/50 border-zinc-800'>
          <CardHeader>
            <CardTitle className='text-white'>Order Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#3f3f46' />
                  <XAxis
                    dataKey='date'
                    stroke='#71717a'
                    fontSize={12}
                  />
                  <YAxis stroke='#71717a' fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #3f3f46',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type='monotone'
                    dataKey='orders'
                    stroke='#ff4d00'
                    strokeWidth={2}
                    dot={{ fill: '#ff4d00', r: 4 }}
                  />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    stroke='#008148'
                    strokeWidth={2}
                    dot={{ fill: '#008148', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className='h-[300px] flex items-center justify-center text-zinc-400'>
                No order trend data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart - Status Distribution */}
        <Card className='bg-zinc-900/50 border-zinc-800'>
          <CardHeader>
            <CardTitle className='text-white'>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #3f3f46',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='h-[300px] flex items-center justify-center text-zinc-400'>
                No status data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className='bg-zinc-900/50 border-zinc-800'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-white'>Recent Orders</CardTitle>
            <Link
              href='/dashboard/orders'
              className='text-sm text-[#ff4d00] hover:underline'
            >
              View All →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-zinc-800'>
                    <th className='text-left py-3 px-4 text-zinc-400 font-medium text-sm'>
                      Order ID
                    </th>
                    <th className='text-left py-3 px-4 text-zinc-400 font-medium text-sm'>
                      Meal
                    </th>
                    <th className='text-left py-3 px-4 text-zinc-400 font-medium text-sm'>
                      Quantity
                    </th>
                    <th className='text-left py-3 px-4 text-zinc-400 font-medium text-sm'>
                      Total
                    </th>
                    <th className='text-left py-3 px-4 text-zinc-400 font-medium text-sm'>
                      Status
                    </th>
                    <th className='text-left py-3 px-4 text-zinc-400 font-medium text-sm'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className='border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors'
                    >
                      <td className='py-3 px-4 text-white font-mono text-sm'>
                        #{order.id.slice(-6)}
                      </td>
                      <td className='py-3 px-4 text-zinc-300'>
                        {order.Meal?.name || 'Unknown'}
                      </td>
                      <td className='py-3 px-4 text-zinc-300'>
                        {order.quantity}
                      </td>
                      <td className='py-3 px-4 text-white font-medium'>
                        ${order.total.toFixed(2)}
                      </td>
                      <td className='py-3 px-4'>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Pending'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : order.status === 'InProgress'
                              ? 'bg-blue-500/10 text-blue-400'
                              : order.status === 'Completed'
                              ? 'bg-[#008148]/10 text-[#008148]'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {order.status === 'Pending' && (
                            <Clock className='w-3 h-3' />
                          )}
                          {order.status === 'InProgress' && (
                            <AlertCircle className='w-3 h-3' />
                          )}
                          {order.status === 'Completed' && (
                            <CheckCircle className='w-3 h-3' />
                          )}
                          {order.status === 'Cancelled' && (
                            <XCircle className='w-3 h-3' />
                          )}
                          {order.status}
                        </span>
                      </td>
                      <td className='py-3 px-4 text-zinc-400 text-sm'>
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-center py-8 text-zinc-400'>
              <ShoppingBag className='w-12 h-12 text-zinc-600 mx-auto mb-4' />
              <p>No orders yet</p>
              <Link
                href='/meals'
                className='text-[#ff4d00] hover:underline mt-2 inline-block'
              >
                Browse meals to place your first order
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardHome;
