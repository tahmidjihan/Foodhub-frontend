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
import MealRow from './mealRow';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
  searchParams: Promise<{ skip?: string; take?: string }>;
}

async function Page(props: Props) {
  const { searchParams } = props;
  const { skip = '1', take = '10' } = await searchParams;
  const page = Math.max(1, parseInt(skip) || 1);
  const takeNum = Math.min(50, parseInt(take) || 10);
  const cookieStore = await cookies();
  let data: any[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/meals?skip=${page}&take=${takeNum}`,
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
        {data.length === takeNum && (
          <div className='bg-orange-500 rounded-md py-2 flex items-center justify-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?skip=${Math.max(1, page - 1)}&take=${takeNum}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href={`?skip=${page}&take=${takeNum}`}
                    isActive
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href={`?skip=${page + 1}&take=${takeNum}`} />
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
