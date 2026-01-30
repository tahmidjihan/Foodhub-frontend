'use client';
import React, { JSX, SVGProps, use, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForm, SubmitHandler } from 'react-hook-form';
import { authClient } from './auth';
import { redirect } from 'next/navigation';
import { useAuth } from './useAuth';
type Inputs = {
  name?: string;
  email: string;
  password: string;
};

interface Props {}

function Form({ isLogin }: { isLogin?: boolean }) {
  const session = useAuth();
  useEffect(() => {
    if (session?.data?.user) {
      redirect('/');
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name = 'Unknown', email, password } = data;
    if (isLogin) {
      const { data: session, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: 'http://localhost:5000/',
        rememberMe: true,
      });
      if (error) {
        console.log('Error signing in:', error);
      } else {
        console.log('User signed in successfully:', session);
        setTimeout(() => {
          redirect('/');
        }, 1000);
      }
    } else {
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: 'http://localhost:5000/',
        },
        {
          onRequest: (ctx) => {},
          onSuccess: (ctx) => {
            console.log('User signed up successfully:', ctx.data);
            setTimeout(() => {
              redirect('/');
            }, 1000);
          },
          onError: (ctx) => {
            // alert(ctx.error.message);
            console.log(ctx.error);
          },
        },
      );
    }
  };

  const GoogleIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
  ) => (
    <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path d='M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z' />
    </svg>
  );
  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-center text-2xl font-bold text-foreground'>
          {isLogin ? 'Sign in' : 'Sign up'} to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          {!isLogin && (
            <div>
              <Label
                htmlFor='email-login'
                className='text-sm font-medium text-foreground dark:text-foreground'
              >
                Name
              </Label>
              <Input
                type='text'
                id='name'
                autoComplete='name'
                placeholder='John Doe'
                className='mt-2 bg-background/50 border-white/10'
                {...register('name', { required: true })}
              />

              {errors.name?.type === 'required' && (
                <p className='py-1 text-xs text-red-500'>
                  First name is required
                </p>
              )}
            </div>
          )}
          <div>
            <Label
              htmlFor='email-login'
              className='text-sm font-medium text-foreground dark:text-foreground'
            >
              Email
            </Label>
            <Input
              type='email'
              id='email'
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
                minLength: 5,
                maxLength: 30,
              })}
              autoComplete='email'
              placeholder='johndoe@example.com'
              className='mt-2 bg-background/50 border-white/10'
            />
            {errors.email?.type === 'required' && (
              <p className='py-1 text-xs text-red-500'>
                First name is required
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className='py-1 text-xs text-red-500'>
                Enter a valid email address
              </p>
            )}
            {errors.email?.type === 'minLength' && (
              <p className='py-1 text-xs text-red-500'>
                Email should be at least 5 characters
              </p>
            )}
            {errors.email?.type === 'maxLength' && (
              <p className='py-1 text-xs text-red-500'>
                Email should be at most 30 characters
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor='password'
              className='text-sm font-medium text-foreground dark:text-foreground'
            >
              Password
            </Label>
            <Input
              type='password'
              id='password'
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
              autoComplete='password'
              placeholder='**************'
              className='mt-2 bg-background/50 border-white/10'
            />
            {errors.password?.type === 'required' && (
              <p className='py-1 text-xs text-red-500'>Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className='py-1 text-xs text-red-500'>
                Password should be at least 6 characters
              </p>
            )}
            {errors.password?.type === 'maxLength' && (
              <p className='py-1 text-xs text-red-500'>
                Password should be at most 30 characters
              </p>
            )}
          </div>
          <Button type='submit' className='mt-4 w-full py-2 font-medium'>
            Sign in
          </Button>
        </form>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <Separator className='w-full opacity-20' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-transparent px-2 text-muted-foreground'>
              or with
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          className='flex w-full items-center justify-center space-x-2 py-2 border-white/10 bg-white/5 hover:bg-white/10'
          asChild
        >
          <a href='#'>
            <GoogleIcon className='size-5' aria-hidden={true} />
            <span className='text-sm font-medium'>Sign in with Google</span>
          </a>
        </Button>

        <p className='mt-4 text-xs text-muted-foreground dark:text-muted-foreground'>
          By signing in, you agree to our{' '}
          <a href='#' className='underline underline-offset-4'>
            terms of service
          </a>{' '}
          and{' '}
          <a href='#' className='underline underline-offset-4'>
            privacy policy
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default Form;
