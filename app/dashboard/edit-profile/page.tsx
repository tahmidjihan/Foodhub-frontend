'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { authClient } from '@/app/auth/auth';

function Page() {
  const session = authClient.useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      role: 'User',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // This is just UI - no real functionality
      authClient.updateUser(data);
      toast.success('Profile updated successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <div className='p-8 space-y-6 mx-auto max-w-2xl w-full'>
      <div>
        <h1 className='text-3xl font-bold text-neutral-50'>Edit Profile</h1>
        <p className='text-neutral-400 mt-2'>
          Update your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Label htmlFor='name' className='text-sm font-medium text-foreground'>
            Name
          </Label>
          <Input
            id='name'
            placeholder='Enter your name'
            className='mt-2 bg-background/50 border-white/10 text-white'
            {...register('name', { required: 'Name is required' })}
            disabled={isSubmitting}
            defaultValue={session?.data?.user?.name}
          />
          {errors.name && (
            <p className='py-1 text-xs text-red-500'>
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='role' className='text-sm font-medium text-foreground'>
            Role
          </Label>
          <select
            id='role'
            className='mt-2 w-full bg-background/50 border-white/10 text-white p-3 rounded-md border'
            {...register('role')}
            disabled={isSubmitting}
          >
            <option value='User' className='bg-gray-800'>
              User
            </option>
            <option value='Provider' className='bg-gray-800'>
              Provider
            </option>
          </select>
        </div>{' '}
        <div className='flex gap-2 pt-4'>
          <Button type='submit' disabled={isSubmitting} className='flex-1'>
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
