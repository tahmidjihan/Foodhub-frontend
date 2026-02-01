'use client';
import React, { useEffect, useMemo, useState } from 'react';
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
import { Label } from '@/components/ui/label';
interface Props {
  data: any[];
}

function MealClient({ data }: Props) {
  const [preference, setPreference] = useState('both');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/categories`,
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null);
  const memo = useMemo(() => {
    let filteredData = [...data];
    if (preference !== 'both') {
      filteredData = filteredData.filter(
        (item: any) => item.type === preference,
      );
    }
    if (category !== 'all') {
      filteredData = filteredData.filter(
        (item: any) => item.categoryId === category,
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
  }, [preference, sort, data, category]);
  return (
    <div className='p-8 space-y-6 mx-auto max-w-7xl w-full pt-20'>
      <div>
        <h1 className='text-3xl font-bold text-neutral-50'>Meals</h1>
      </div>
      <div className='flex justify-between flex-wrap gap-5'>
        <div className='flex gap-4'>
          <Button onClick={() => setPreference('veg')}>Veg</Button>
          <Button onClick={() => setPreference('non-veg')}>Non Veg</Button>
          <Button onClick={() => setPreference('both')}>Both</Button>
        </div>
        <div>
          <div>
            <div className='dark'>
              <select
                id='category'
                onChange={(e) => setCategory(e.target.value)}
                className=' w-full bg-background/50 border-white/10 text-white p-3 rounded-md border'
              >
                <option value='all' className='bg-gray-800'>
                  Select a category
                </option>
                {categories.map((category: any) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className='bg-gray-800'
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
