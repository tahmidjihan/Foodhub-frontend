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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MealRow from './mealRow';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/app/auth/auth';
import { useAuth } from '@/app/auth/useAuth';

interface Props {
  searchParams: Promise<{ skip?: string; take?: string }>;
}

function Page(props: Props) {
  const { searchParams } = props;
  // const { skip = '1', take = '10' } = searchParams;
  // const page = Math.max(1, parseInt(skip) || 1); // 1-based page number for URL
  // const takeNum = Math.min(50, parseInt(take) || 10);
  // const cookieStore = await cookies();
  const session = useAuth();
  // console.log(session);
  // let data: any[] = [];
  const [data, setData] = React.useState<any[]>([]);
  const id = session.data?.user?.id;
  // console.log(id);
  try {
    const res = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/meals/provider/${id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => {
      res.json().then((data) => setData(data));
    });
  } catch {
    setData([]);
  }
  if (!Array.isArray(data)) {
    setData([]);
  }
  if (!Array.isArray(data)) setData([]);

  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-neutral-50'>My Meals</h1>
          <Button asChild>
            <Link href='/dashboard/provider/createMeal'>Create Meal</Link>
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your meals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
              <TableHead className='w-[80px]'>Price</TableHead>
              <TableHead className='w-[100px]'>Type</TableHead>
              <TableHead className='w-[100px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item: any) => <MealRow key={item.id} item={item} />)
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='text-center text-muted-foreground py-8'
                >
                  No meals yet
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
