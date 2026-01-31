'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function MealRow({ item }: { item: any }) {
  const router = useRouter();

  async function deleteMeal() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/meals/${item.id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (res.ok) {
      toast.success('Meal deleted successfully');
      router.refresh();
    } else {
      toast.error('Failed to delete meal');
    }
  }

  return (
    <TableRow key={item.id}>
      <TableCell className='font-medium text-white'>
        {item.name ?? '—'}
      </TableCell>
      <TableCell className='font-medium text-white'>
        ${Number(item.price).toFixed(2)}
      </TableCell>
      <TableCell className='font-medium text-white'>
        {item.type ?? '—'}
      </TableCell>
      <TableCell className='font-medium text-white'>
        <Button variant='destructive' size='sm' onClick={deleteMeal}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default MealRow;
