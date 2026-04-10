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
import { ShoppingBag } from 'lucide-react';
import OrderRow from './orderRow';

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

      {data.length > 0 ? (
        <Table>
          <TableCaption>A list of all your orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[150px]'>Meal</TableHead>
              <TableHead className='w-[100px]'>Quantity</TableHead>
              <TableHead className='w-[100px]'>Total</TableHead>
              <TableHead className='w-[150px]'>Address</TableHead>
              <TableHead className='w-[120px]'>Status</TableHead>
              <TableHead className='w-[150px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order: any) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className='text-center py-16'>
          <ShoppingBag className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-white mb-2'>No orders yet</h3>
          <p className='text-zinc-400 mb-6'>
            Looks like you have not placed any orders yet. Browse our delicious
            meals and make your first order today!
          </p>
          <Link href='/meals'>
            <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
              Browse Meals
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Page;
