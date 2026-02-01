'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';

function MealForm({
  mealId,
  initialData,
}: {
  mealId?: string;
  initialData?: any;
}) {
  const [categories, setCategories] = React.useState<any[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  });
  const isEdit = !!mealId && !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
      ? {
          name: initialData.name,
          price: String(initialData.price),
          image: initialData.image,
          type: initialData.type,
          tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(', ')
            : '',
        }
      : undefined,
  });

  const onSubmit = async (data: any) => {
    const payload = {
      name: data.name,
      price: parseFloat(data.price),
      image: data.image,
      type: data.type,
      tags: data.tags
        ? data.tags
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [],
    };

    if (isEdit) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/meals/${mealId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        toast.success('Meal updated successfully');
        window.location.reload();
      } else {
        toast.error('Failed to update meal');
      }
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/meals`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        toast.success('Meal created successfully');
        window.location.reload();
      } else {
        toast.error('Failed to create meal');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
      <div>
        <Label
          htmlFor='name'
          className='text-sm font-medium text-foreground dark:text-foreground'
        >
          Name
        </Label>
        <Input
          id='name'
          placeholder='Meal name'
          className='mt-2 bg-background/50 border-white/10 text-white'
          {...register('name', { required: true })}
        />
        {errors.name?.type === 'required' && (
          <p className='py-1 text-xs text-red-500'>Name is required</p>
        )}
      </div>
      <div>
        <Label htmlFor='price' className='text-sm font-medium text-foreground'>
          Price
        </Label>
        <Input
          id='price'
          type='number'
          step='0.01'
          placeholder='0.00'
          className='mt-2 bg-background/50 border-white/10 text-white'
          {...register('price', { required: true, min: 0 })}
        />
        {errors.price?.type === 'required' && (
          <p className='py-1 text-xs text-red-500'>Price is required</p>
        )}
      </div>
      <div>
        <Label
          htmlFor='image'
          className='text-sm font-medium text-foreground dark:text-foreground'
        >
          Image URL
        </Label>
        <Input
          id='image'
          placeholder='https://example.com/image.jpg'
          className='mt-2 bg-background/50 border-white/10 text-white'
          {...register('image', { required: true })}
        />
        {errors.image?.type === 'required' && (
          <p className='py-1 text-xs text-red-500'>Image URL is required</p>
        )}
      </div>
      <div>
        <Label htmlFor='type' className='text-sm font-medium text-foreground'>
          Type
        </Label>
        <Input
          id='type'
          placeholder='e.g. Veg, Non-veg, etc.'
          className='mt-2 bg-background/50 border-white/10 text-white'
          {...register('type', { required: true })}
        />
        {errors.type?.type === 'required' && (
          <p className='py-1 text-xs text-red-500'>Type is required</p>
        )}
      </div>
      <div>
        <Label
          htmlFor='tags'
          className='text-sm font-medium text-foreground dark:text-foreground'
        >
          Tags (comma-separated)
        </Label>
        <Input
          id='tags'
          placeholder='vegetarian, spicy, gluten-free'
          className='mt-2 bg-background/50 border-white/10 text-white'
          {...register('tags')}
        />
      </div>
      <div className='flex gap-2 pt-4'>
        <Button type='submit' className='mt-4 w-full py-2 font-medium'>
          {isEdit ? 'Update Meal' : 'Create Meal'}
        </Button>
      </div>
    </form>
  );
}

export default MealForm;
