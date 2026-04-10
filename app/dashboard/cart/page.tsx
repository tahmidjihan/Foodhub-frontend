import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import TR from './tableRow';

interface Props {}

async function Page(props: Props) {
  const cookieStore = await cookies();
  let data: any[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const responseData = await res.json();
      data = Array.isArray(responseData) ? responseData : [];
    } else {
      error = 'Failed to fetch cart items';
    }
  } catch (err) {
    console.error('Error fetching cart:', err);
    error = 'Error connecting to server';
    data = [];
  }

  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Your Cart</h1>
          <p className='text-zinc-400 text-sm mt-1'>
            {data.length} item{data.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {error && (
          <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
            <p className='text-red-400'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md'
            >
              Try Again
            </button>
          </div>
        )}

        {data.length > 0 ? (
          <Table>
            <TableCaption>A list of meals in your cart.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px]'>Meal</TableHead>
                <TableHead className='w-[100px]'>Quantity</TableHead>
                <TableHead className='w-[100px]'>Price</TableHead>
                <TableHead className='w-[120px]'>Actions</TableHead>
                <TableHead className='w-[100px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TR key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        ) : (
          !error && (
            <div className='text-center py-16'>
              <ShoppingBag className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-white mb-2'>
                Your cart is empty
              </h3>
              <p className='text-zinc-400 mb-6'>
                Looks like you have not added any meals to your cart yet. Browse
                our delicious selection to get started!
              </p>
              <Link href='/meals'>
                <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
                  Browse Meals
                </Button>
              </Link>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Page;
