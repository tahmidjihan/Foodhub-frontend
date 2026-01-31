'use client';
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
function TR({ item }: any) {
  const orderData = {
    MealId: item.Meal.id,
    total: item.Meal.price,
    quantity: 1,
  };
  async function placeOrder() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (res) {
          //   console.log('Added to Cart successfully');
          toast.success('Placed Order successfully');
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error placing order');
      });
  }
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
        <Button onClick={placeOrder}>Order Now</Button>
      </TableCell>
      <TableCell className='font-medium  text-white'>
        <Button onClick={deleteCart}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default TR;
