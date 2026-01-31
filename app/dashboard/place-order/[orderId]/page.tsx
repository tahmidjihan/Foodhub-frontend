'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

interface Meal {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  Meal: Meal;
}

function Page() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId;
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      address: 'nowhere',
    },
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart/${orderId}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setCartItem(data));
  }, [orderId]);
  console.log(cartItem);

  const onSubmit = async (data: any) => {
    const orderData = {
      MealId: cartItem?.Meal?.id,
      total: (cartItem?.Meal?.price || 0) * data.quantity,
      quantity: data.quantity,
      address: data.address,
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (res.ok) {
          toast.success('Order placed successfully!');
          fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart/${orderId}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } else {
          toast.error('Failed to place order');
        }
      })
      .catch(() => {
        toast.error('Error placing order');
      });
  };

  return (
    <div className='p-8 space-y-6 mx-auto max-w-2xl w-full'>
      <div>
        <h1 className='text-3xl font-bold text-neutral-50'>Place Order</h1>
        <p className='text-neutral-400 mt-2'>{cartItem?.Meal?.name}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Label
            htmlFor='address'
            className='text-sm font-medium text-foreground'
          >
            Delivery Address
          </Label>
          <Input
            id='address'
            placeholder='Enter your address'
            className='mt-2 bg-background/50 border-white/10 text-white'
            {...register('address', { required: true })}
          />
          {errors.address && (
            <p className='py-1 text-xs text-red-500'>Address is required</p>
          )}
        </div>

        <div>
          <Label
            htmlFor='quantity'
            className='text-sm font-medium text-foreground'
          >
            Quantity
          </Label>
          <Input
            id='quantity'
            type='number'
            min='1'
            placeholder='1'
            className='mt-2 bg-background/50 border-white/10 text-white'
            {...register('quantity', {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
          />
          {errors.quantity && (
            <p className='py-1 text-xs text-red-500'>Quantity is required</p>
          )}
        </div>

        <div className='flex gap-2 pt-4'>
          <Button type='submit' className='flex-1'>
            Place Order - ${cartItem?.Meal?.price || 0}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
