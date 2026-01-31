import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MealForm from './mealForm';

interface Props {
  searchParams: Promise<{ mealId?: string }>;
}

async function Page(props: Props) {
  const { searchParams } = props;
  const { mealId } = await searchParams;
  let initialData = null;

  if (mealId) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/meals/${mealId}`,
        { headers: { cookie: cookieStore.toString() } }
      );
      if (res.ok) {
        initialData = await res.json();
      }
    } catch {
      initialData = null;
    }
  }

  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
      <h2 className='text-center text-2xl font-bold text-foreground'>
        {mealId && initialData ? 'Edit Meal' : 'Create Meal'}
      </h2>
      <MealForm mealId={mealId} initialData={initialData} />
    </div>
  );
}

export default Page;
