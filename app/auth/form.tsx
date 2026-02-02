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
  role: 'Customer' | 'Provider';
  password: string;
};

interface Props {}

function Form({ isLogin }: { isLogin?: boolean }) {
  const session = useAuth();
  useEffect(() => {
    if (session?.data?.user) {
      redirect('/dashboard');
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name = 'Unknown', email, password, role } = data;
    console.log(data);
    if (isLogin) {
      const { data: session, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: 'https://foodhub-frontend-sigma.vercel.app',
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
      const { data: authData, error } = await authClient.signUp.email(
        {
          email,
          password,
          name,
          // @ts-ignore
          role,
          callbackURL: 'https://foodhub-frontend-sigma.vercel.app/',
        },
        {
          onRequest: (ctx) => {},
          onSuccess: (ctx) => {
            // console.log(ctx);
            // console.log('User signed up successfully:', ctx.data)
            if (role == 'Provider') {
              const data = fetch(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/providers`,
                {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name,
                    userId: ctx.data.user.id,
                  }),
                },
              ).then((res) => {
                setTimeout(() => {
                  redirect('/');
                }, 1000);
              });
            }
          },
          onError: (ctx) => {
            // alert(ctx.error.message);
            console.log(ctx.error);
          },
        },
      );
    }
  };

  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-center text-2xl font-bold text-foreground'>
          {isLogin ? 'Sign in' : 'Sign up'} to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          {!isLogin && (
            <>
              {' '}
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
              <div>
                <Label
                  htmlFor='email-login'
                  className='text-sm font-medium text-foreground dark:text-foreground'
                >
                  Role
                </Label>
                <Input
                  type=' text'
                  id='role'
                  autoComplete='role'
                  placeholder='Customer or Provider'
                  className='mt-2 bg-background/50 border-white/10'
                  {...register('role', { required: true })}
                />

                {errors.role?.type === 'required' && (
                  <p className='py-1 text-xs text-red-500'>Role is required</p>
                )}
              </div>
            </>
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
              <p className='py-1 text-xs text-red-500'>Email is required</p>
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
