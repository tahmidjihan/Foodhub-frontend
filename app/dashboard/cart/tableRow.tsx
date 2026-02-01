'use client';
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
function TR({ item }: any) {
  function deleteCart() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart/${item.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          //   console.log('Added to Cart successfully');
          toast.success('Deleted Cart successfully');
          window.location.reload();
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error deleting Cart');
      });
  }
  return (
    <TableRow key={item.id}>
      <TableCell className='font-medium  text-white'>
        {item.Meal.name}
        {/* {item.name} */}
      </TableCell>
      <TableCell className='font-medium  text-white'>
        <Link href={`/dashboard/place-order/${item.id}`}>
          <Button>Order Now</Button>
        </Link>
      </TableCell>
      <TableCell className='font-medium  text-white'>
        <Button onClick={deleteCart}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default TR;
