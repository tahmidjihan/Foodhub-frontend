import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import MealClient from './mealClient';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  searchParams: Promise<{
    skip?: string;
    take?: string;
    category?: string;
    search?: string;
    type?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }>;
}

async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const {
    skip = '0',
    take = '12',
    category,
    search,
    type,
    sortBy,
    sortOrder,
  } = searchParams;

  const pagination = {
    skip: Math.max(0, parseInt(skip) || 0),
    take: Math.min(50, parseInt(take) || 12),
  };

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.set('skip', String(pagination.skip));
  queryParams.set('take', String(pagination.take));
  if (category) queryParams.set('category', category);
  if (search) queryParams.set('search', search);
  if (type && type !== 'both') queryParams.set('type', type);
  if (sortBy) queryParams.set('sortBy', sortBy);
  if (sortOrder) queryParams.set('sortOrder', sortOrder);

  let data: any[] = [];
  let error: string | null = null;
  let total = 0;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/meals?${queryParams.toString()}`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      const body = await res.json();
      data = Array.isArray(body) ? body : [];
      // Check if backend returns total for pagination
      total = body.total || data.length;
    } else {
      error = 'Failed to fetch meals';
    }
  } catch (err) {
    console.error('Error fetching public meals:', err);
    error = 'Error connecting to server';
    data = [];
  }

  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <MealClient
        data={data}
        error={error}
        initialFilters={{
          category: category || '',
          search: search || '',
          type: type || 'both',
          sortBy: sortBy || '',
          sortOrder: sortOrder || '',
          skip: pagination.skip,
          take: pagination.take,
        }}
        total={total}
      />
      <Footer />
    </div>
  );
}

export default Page;
