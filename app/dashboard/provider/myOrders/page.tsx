'use client';

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
import OrderRow from './orderRow';
import { useAuth } from '@/app/auth/useAuth';

interface Props {}

function Page(props: Props) {
  const session = useAuth();
  const [data, setData] = React.useState<any[]>([]);
  const providerId = session.data?.user?.id;

  React.useEffect(() => {
    if (providerId) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/orders/provider/${providerId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((fetchedData) => {
          setData(fetchedData);
          console.log('My Orders data:', fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching My Orders data:', error);
          setData([]);
        });
    }
  }, [providerId]);

  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>My Orders</h1>
        </div>
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Meal</TableHead>
              <TableHead className='w-[100px]'>Customer</TableHead>
              <TableHead className='w-[50px]'>Qty</TableHead>
              <TableHead className='w-[80px]'>Total</TableHead>
              <TableHead className='w-[100px]'>Status</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item: any) => <OrderRow key={item.id} item={item} />)
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-center text-muted-foreground py-8'
                >
                  No orders yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Page;
