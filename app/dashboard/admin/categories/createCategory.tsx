'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface CategoryFormData {
  name: string;
  description: string;
}

function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>();

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      // Get cookies from the browser
      const cookieString = document.cookie;
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/categories`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': cookieString,
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log('Category created successfully');
        reset();
        window.location.reload();
      } else {
        console.error('Failed to create category');
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
      <Input
        type='text'
        placeholder='Enter category name'
        {...register('name', { required: 'Category name is required' })}
        className='bg-background/50 border-white/10 text-white'
      />
      <Button type='submit'>Create</Button>
    </form>
  );
}

export default CreateCategory;
