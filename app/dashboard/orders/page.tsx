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
import { cookies } from 'next/headers';

interface Props {
  searchParams: { skip?: string; take?: string };
}

async function Page(props: Props) {
  const { searchParams } = props;
  const { skip = '0', take = '10' } = searchParams;
  const pagination = {
    skip: Math.max(0, parseInt(skip) || 0),
    take: Math.min(50, parseInt(take) || 10),
  };

  const cookieStore = cookies();
  let data: any[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/orders?skip=${pagination.skip}&take=${pagination.take}`,
      {
        credentials: 'include',
      }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    data = [];
  }
  if (!Array.isArray(data)) data = [];

  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
      <h1 className='text-3xl font-bold text-neutral-50'>Orders</h1>
      <Table>
        <TableCaption>A list of all your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Order ID</TableHead>
            <TableHead className='w-[150px]'>Meal</TableHead>
            <TableHead className='w-[100px]'>Quantity</TableHead>
            <TableHead className='w-[100px]'>Total</TableHead>
            <TableHead className='w-[150px]'>Address</TableHead>
            <TableHead className='w-[120px]'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium text-white'>
                  {order.id}
                </TableCell>
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className='text-center text-muted-foreground py-8'
              >
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
