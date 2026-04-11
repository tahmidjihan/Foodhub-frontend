'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ShoppingBag, MapPin, DollarSign, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: string;
  UserId: string;
  MealId: string;
  quantity: number;
  Meal: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export default function PlaceOrderPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: '',
    },
  });

  useEffect(() => {
    fetch(`/api/cart`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setCartItems([]);
        setLoading(false);
      });
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Meal.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const onSubmit = async (data: { address: string }) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      // Place orders for each cart item
      const orderPromises = cartItems.map((item) =>
        fetch(`/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mealId: item.MealId,
            quantity: item.quantity,
            total: item.Meal.price * item.quantity,
            address: data.address,
          }),
        })
      );

      const results = await Promise.all(orderPromises);
      const successCount = results.filter((r) => r.ok).length;

      if (successCount > 0) {
        // Clear cart after successful orders
        await Promise.all(
          cartItems.map((item) =>
            fetch(`/api/cart/${item.id}`, {
              method: 'DELETE',
              credentials: 'include',
            })
          )
        );

        toast.success(
          `${successCount} order${successCount > 1 ? 's' : ''} placed successfully!`
        );
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        toast.error('Failed to place orders. Please try again.');
      }
    } catch {
      toast.error('Error placing orders');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='p-8 space-y-6 mx-auto max-w-4xl w-full animate-pulse'>
        <div className='h-10 bg-zinc-800 rounded-lg w-64' />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-zinc-800 rounded-xl p-4 h-24' />
            ))}
          </div>
          <div className='bg-zinc-800 rounded-xl h-64' />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='p-8 mx-auto max-w-4xl w-full'>
        <div className='text-center py-16'>
          <ShoppingBag className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-white mb-2'>
            Your cart is empty
          </h2>
          <p className='text-zinc-400 mb-6'>
            Add some delicious meals to your cart before placing an order.
          </p>
          <Link href='/meals'>
            <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
              Browse Meals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='p-8 mx-auto max-w-4xl w-full'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-neutral-50'>Place Order</h1>
        <p className='text-zinc-400 mt-2'>
          Review your order and provide delivery address
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Order Items */}
          <div className='space-y-4'>
            <h2 className='text-xl font-bold text-white flex items-center gap-2'>
              <ShoppingBag className='w-5 h-5 text-[#ff4d00]' />
              Order Items ({cartItems.length})
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className='bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex gap-4'
              >
                <img
                  src={item.Meal.image}
                  alt={item.Meal.name}
                  className='w-20 h-20 object-cover rounded-lg'
                />
                <div className='flex-1'>
                  <h3 className='font-semibold text-white'>{item.Meal.name}</h3>
                  <p className='text-sm text-zinc-400 mt-1'>
                    Qty: {item.quantity}
                  </p>
                  <p className='text-[#ff4d00] font-bold mt-1'>
                    ${(item.Meal.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Address */}
          <div className='space-y-6'>
            {/* Delivery Address */}
            <div className='bg-zinc-900/50 border border-zinc-800 rounded-xl p-6'>
              <h2 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                <MapPin className='w-5 h-5 text-[#ff4d00]' />
                Delivery Address
              </h2>
              <div>
                <Label
                  htmlFor='address'
                  className='text-sm font-medium text-zinc-300'
                >
                  Address
                </Label>
                <Input
                  id='address'
                  placeholder='Enter your delivery address'
                  className='mt-2 bg-background/50 border-white/10 text-white'
                  {...register('address', {
                    required: 'Delivery address is required',
                  })}
                />
                {errors.address && (
                  <p className='py-1 text-xs text-red-500'>
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className='bg-zinc-900/50 border border-zinc-800 rounded-xl p-6'>
              <h2 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
                <DollarSign className='w-5 h-5 text-[#ff4d00]' />
                Order Summary
              </h2>

              <div className='space-y-3'>
                <div className='flex items-center justify-between text-zinc-300'>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex items-center justify-between text-zinc-300'>
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className='border-t border-zinc-700 pt-3 flex items-center justify-between'>
                  <span className='text-lg font-bold text-white'>Total</span>
                  <span className='text-2xl font-bold text-[#ff4d00]'>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                type='submit'
                disabled={submitting}
                className='w-full mt-6 bg-[#ff4d00] hover:bg-[#ff7433] text-white py-6 text-lg font-semibold disabled:opacity-50'
              >
                {submitting ? (
                  <>
                    <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - $${total.toFixed(2)}`
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
