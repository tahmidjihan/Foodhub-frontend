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
import Link from 'next/link';

interface Props {
  searchParams: { skip?: string; take?: string };
}

async function Page(props: Props) {
  const cookieStore = await cookies();
  let data: any[] = [];

  const cookieHeaders = cookieStore.toString();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeaders && { cookie: cookieHeaders }),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      data = [];
    } else {
      const responseData = await res.json();
      data = Array.isArray(responseData) ? responseData : [];
    }
  } catch (networkError) {
    console.error('Network error fetching orders:', networkError);
    data = [];
  }

  if (!Array.isArray(data)) {
    console.warn('API returned non-array data:', data);
    data = [];
  }

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <h1 className='text-3xl font-bold text-neutral-50'>Orders</h1>

      <Table>
        <TableCaption>A list of all your orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[150px]'>Meal</TableHead>
            <TableHead className='w-[100px]'>Quantity</TableHead>
            <TableHead className='w-[100px]'>Total</TableHead>
            <TableHead className='w-[150px]'>Address</TableHead>
            <TableHead className='w-[120px]'>Status</TableHead>
            <TableHead className='w-[100px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium text-white'>
                  {order.Meal?.name || 'Unknown Meal'}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {order.quantity}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  ${order.total}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {order.address}
                </TableCell>
                <TableCell className='font-medium text-white'>
                  {order.status || 'Pending'}
                </TableCell>
                {order.status === 'Completed' && (
                  <TableCell className='font-medium text-white'>
                    <Link href={`/dashboard/reviews/${order.Meal?.id}`}>
                      <Button>Review</Button>
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) :   null}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;

