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

import Navbar from '@/app/components/Navbar';
import MealClient from './mealClient';

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
  let data: any[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/meals?skip=${pagination.skip}&take=${pagination.take}`,
    );
    if (res.ok) {
      const body = await res.json();
      data = body;
    }
  } catch (error) {
    console.error('Error fetching public meals:', error);
    data = [];
  }
  if (!Array.isArray(data)) data = [];

  return (
    <div className='bg-black h-screen'>
      <Navbar />
      <MealClient data={data} />
    </div>
  );
}

export default Page;
