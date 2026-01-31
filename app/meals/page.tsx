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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import MealCard from './mealCard';
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
      `${process.env.NEXT_PUBLIC_BACKEND}/api/meals?skip=${pagination.skip}&take=${pagination.take}`,
      { headers: { cookie: cookieStore.toString() } }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error('Error fetching public meals:', error);
    data = [];
  }
  if (!Array.isArray(data)) data = [];

  return (
    <>
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full'>
        <div>
          <h1 className='text-3xl font-bold text-neutral-50'>Meals</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data.map((item: any) => (
            <MealCard key={item.id} item={item} />
          ))}
        </div>
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
