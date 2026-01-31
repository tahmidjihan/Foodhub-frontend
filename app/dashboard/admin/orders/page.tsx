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
import { cookies } from 'next/headers';

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const orders: any = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/admin/orders`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  ).then((res) => res.json());
  console.log(orders);
  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-neutral-50'>Admin - Orders</h1>
      </div>

      <Table>
        <TableCaption>A list of all orders in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[80px]'>Qty</TableHead>
            <TableHead className='w-[100px]'>Total</TableHead>
            <TableHead className='w-[200px]'>Address</TableHead>
            <TableHead className='w-[100px]'>Status</TableHead>
            <TableHead className='w-[120px]'>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell className='font-medium text-white'>
                {order.quantity}
              </TableCell>
              <TableCell className='font-medium text-white'>
                ${order.total}
              </TableCell>
              <TableCell className='font-medium text-white text-sm truncate max-w-[200px]'>
                {order.address}
              </TableCell>
              <TableCell className='font-medium text-white'>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    order.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : order.status === 'In Progress'
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
                {order.createdAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
