'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

function MealCard({ item }: any) {
  // const cookieStore = useCookies();
  async function addToCart() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MealId: item.id,
        quantity: 1,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Added to Cart successfully');
          toast.success('Added to Cart successfully');
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error adding to Cart');
      });
  }
  return (
    <Card key={item.id} className='relative mx-auto w-full max-w-sm pt-0'>
      <div className='absolute inset-0 z-30 aspect-video bg-black/35' />
      <img
        src={item.image}
        alt='Event cover'
        className='relative rounded-t-md z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40'
      />
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            addToCart();
          }}
          className='w-full'
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MealCard;
