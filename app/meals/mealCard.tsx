'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

function MealCard({ item }: any) {
  async function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`/api/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ MealId: item.id, quantity: 1 }),
      });
      if (res.ok) {
        toast.success('Added to cart!');
      } else {
        toast.error('Failed to add to cart');
      }
    } catch {
      toast.error('Error adding to cart');
    }
  }

  return (
    <Link href={`/meals/${item.id}`} className='group block h-full'>
      <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all h-full flex flex-col'>
        <div className='relative aspect-video overflow-hidden rounded-t-xl'>
          <img
            src={item.image}
            alt={item.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          {item.avgRating && (
            <div className='absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1'>
              <Star className='w-3 h-3 text-yellow-400 fill-yellow-400' />
              <span className='text-xs text-white font-medium'>
                {item.avgRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <CardHeader className='pb-2 flex-1'>
          <CardTitle className='text-lg text-white group-hover:text-[#ff4d00] transition-colors line-clamp-1'>
            {item.name}
          </CardTitle>
          <CardDescription className='line-clamp-2 text-sm text-zinc-400'>
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-2'>
          <div className='flex items-center gap-2 flex-wrap'>
            <Badge className='bg-zinc-800 text-zinc-300 capitalize'>
              {item.type}
            </Badge>
            {item.Category && (
              <Badge
                variant='outline'
                className='border-zinc-700 text-zinc-400'
              >
                {item.Category.name}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-between pt-2 border-t border-zinc-800'>
          <span className='text-xl font-bold text-[#ff4d00]'>
            ${item.price.toFixed(2)}
          </span>
          <Button
            onClick={addToCart}
            size='sm'
            className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'
          >
            <ShoppingCart className='w-4 h-4 mr-1' />
            Add
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default MealCard;
