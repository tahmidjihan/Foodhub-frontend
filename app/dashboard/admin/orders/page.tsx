import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  let orders: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/admin/orders`,
      {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: 'no-store',
      },
    );
    if (res.ok) {
      const data = await res.json();
      orders = Array.isArray(data) ? data : [];
    } else {
      error = 'Failed to fetch orders';
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
    error = 'Error connecting to server';
  }

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-neutral-50'>Admin - Orders</h1>
      </div>

      {error && (
        <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <p className='text-red-400'>{error}</p>
          <p className='text-zinc-500 text-sm mt-2'>Please try refreshing the page</p>
        </div>
      )}

      {!error && orders.length > 0 ? (
        <Table>
          <TableCaption>A list of all orders in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Meal</TableHead>
              <TableHead className='w-[150px]'>Customer</TableHead>
              <TableHead className='w-[80px]'>Qty</TableHead>
              <TableHead className='w-[100px]'>Total</TableHead>
              <TableHead className='w-[200px]'>Address</TableHead>
              <TableHead className='w-[100px]'>Status</TableHead>
              <TableHead className='w-[120px]'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium text-white'>
                  {order.Meal?.name || 'Unknown'}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {order.User?.name || order.User?.email || 'Unknown'}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {order.quantity}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  ${Number(order.total).toFixed(2)}
                </TableCell>
                <TableCell className='font-medium text-white text-sm truncate max-w-[200px]'>
                  {order.address}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : order.status === 'InProgress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : order.status === 'Cancelled'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className='font-medium text-white text-sm'>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        !error && (
          <div className='text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-xl'>
            <ShoppingBag className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-white mb-2'>No orders found</h3>
            <p className='text-zinc-400 mb-6'>
              There are no orders in the system yet.
            </p>
            <Link href='/dashboard'>
              <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
