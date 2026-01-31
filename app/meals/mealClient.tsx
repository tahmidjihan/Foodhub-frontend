'use client';
import React, { useMemo, useState } from 'react';
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
interface Props {
  data: any[];
}

function MealClient({ data }: Props) {
  const [preference, setPreference] = useState('both');
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null);
  const memo = useMemo(() => {
    let filteredData = [...data];
    if (preference !== 'both') {
      filteredData = filteredData.filter(
        (item: any) => item.type === preference,
      );
    }
    if (sort === 'asc') {
      filteredData.sort((a: any, b: any) => a.price - b.price);
    } else if (sort === 'desc') {
      filteredData.sort((a: any, b: any) => b.price - a.price);
    }
    if (filteredData !== data) {
      //   setData(filteredData);
      console.log(filteredData);
    }
    return filteredData;
  }, [preference, sort, data]);
  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full pt-20'>
      <div>
        <h1 className='text-3xl font-bold text-neutral-50'>Meals</h1>
      </div>
      <div className='flex justify-between flex-wrap'>
        <div className='flex gap-4'>
          <Button onClick={() => setPreference('veg')}>Veg</Button>
          <Button onClick={() => setPreference('non-veg')}>Non Veg</Button>
          <Button onClick={() => setPreference('both')}>Both</Button>
        </div>
        <div className='flex gap-4'>
          {' '}
          <Button
            onClick={() => {
              setSort('asc');
            }}
          >
            Ascending
          </Button>
          <Button
            onClick={() => {
              setSort('desc');
            }}
          >
            Descending
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {memo.map((item: any) => (
          <MealCard key={item.id} item={item} />
        ))}
      </div>
      {/* {data.length === pagination.take && (
        <div className='bg-orange-500 rounded-md py-2 flex items-center justify-center'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?skip=${Math.max(
                    0,
                    pagination.skip - pagination.take,
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
      )} */}
    </div>
  );
}

export default MealClient;
