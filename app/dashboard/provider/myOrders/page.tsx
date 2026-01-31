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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cookies } from 'next/headers';
import OrderRow from './orderRow';

interface Props {
  searchParams: Promise<{ skip?: string; take?: string }>;
}

async function Page(props: Props) {
  const { searchParams } = props;
  const { skip = '0', take = '10' } = await searchParams;
  const pagination = {
    skip: Math.max(0, parseInt(skip) || 0),
    take: Math.min(50, parseInt(take) || 10),
  };
  const cookieStore = await cookies();
  let data: any[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/orders?skip=${pagination.skip}&take=${pagination.take}`,
      { headers: { cookie: cookieStore.toString() } }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch {
    data = [];
  }
  if (!Array.isArray(data)) data = [];

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
        {data.length === pagination.take && (
          <div className='bg-orange-500 rounded-md py-2 flex items-center justify-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?skip=${Math.max(
                      0,
                      pagination.skip - pagination.take
                    )}&take=${pagination.take}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`?skip=${pagination.skip}&take=${pagination.take}`}
                    isActive
                  >
                    {pagination.skip / pagination.take + 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={`?skip=${pagination.skip + pagination.take}&take=${
                      pagination.take
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
