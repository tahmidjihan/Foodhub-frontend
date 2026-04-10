'use client';
import React, { useState } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

function TR({ item }: any) {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [updating, setUpdating] = useState(false);

  async function updateQuantity(newQuantity: number) {
    if (newQuantity < 1) return;
    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/cart/${item.id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (res.ok) {
        setQuantity(newQuantity);
        toast.success('Quantity updated');
      } else {
        toast.error('Failed to update quantity');
      }
    } catch {
      toast.error('Error updating quantity');
    } finally {
      setUpdating(false);
    }
  }

  async function deleteCartItem() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/cart/${item.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (res.ok) {
        toast.success('Item removed from cart');
        window.location.reload();
      } else {
        toast.error('Failed to remove item');
      }
    } catch {
      toast.error('Error removing item from cart');
    }
  }

  const itemTotal = (item.Meal?.price || 0) * quantity;

  return (
    <TableRow key={item.id}>
      <TableCell className='font-medium text-white'>
        <div className='flex items-center gap-3'>
          {item.Meal?.image && (
            <img
              src={item.Meal.image}
              alt={item.Meal.name}
              className='w-12 h-12 object-cover rounded-lg'
            />
          )}
          <div>
            <p className='font-medium'>{item.Meal?.name || 'Unknown Meal'}</p>
            <p className='text-xs text-zinc-400'>
              ${item.Meal?.price?.toFixed(2)} each
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-8 w-8 p-0 border-zinc-700'
            onClick={() => updateQuantity(quantity - 1)}
            disabled={quantity <= 1 || updating}
          >
            <Minus className='w-3 h-3' />
          </Button>
          <span className='text-white font-medium w-8 text-center'>
            {quantity}
          </span>
          <Button
            variant='outline'
            size='sm'
            className='h-8 w-8 p-0 border-zinc-700'
            onClick={() => updateQuantity(quantity + 1)}
            disabled={updating}
          >
            <Plus className='w-3 h-3' />
          </Button>
        </div>
      </TableCell>
      <TableCell className='font-medium text-[#ff4d00]'>
        ${itemTotal.toFixed(2)}
      </TableCell>
      <TableCell>
        <Link href={`/dashboard/place-order/${item.id}`}>
          <Button size='sm' className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
            Order Now
          </Button>
        </Link>
      </TableCell>
      <TableCell>
        <Button
          variant='ghost'
          size='sm'
          onClick={deleteCartItem}
          className='text-red-400 hover:text-red-300 hover:bg-red-500/10'
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TR;
