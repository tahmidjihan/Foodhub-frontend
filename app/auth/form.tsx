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
import { toast } from 'sonner';

// Google Icon Component
const GoogleIcon = () => (
  <svg
    className='w-4 h-4 mr-2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      fill='#4285F4'
    />
    <path
      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      fill='#34A853'
    />
    <path
      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      fill='#FBBC05'
    />
    <path
      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      fill='#EA4335'
    />
  </svg>
);

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
    if (session?.data?.user && !session.isPending) {
      redirect('/dashboard');
    }
  }, [session]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const callbackURL =
    typeof window !== 'undefined'
      ? window.location.origin + '/dashboard'
      : process.env.NEXT_PUBLIC_FRONTEND_URL
        ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`
        : 'http://localhost:5000/dashboard';

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name = 'Unknown', email, password, role } = data;
    console.log(data);
    if (isLogin) {
      try {
        const { data: session, error } = await authClient.signIn.email({
          email,
          password,
          rememberMe: true,
        });
        if (error) {
          console.error('Error signing in:', error);
          toast.error(error.message || 'Sign in failed');
        } else {
          console.log('User signed in successfully:', session);
          setTimeout(() => {
            redirect('/dashboard');
          }, 1000);
        }
      } catch (err) {
        console.error('Network error during sign in:', err);
        toast.error(
          err instanceof Error ? err.message : 'Failed to connect to server',
        );
      }
    } else {
      try {
        const { data: authData, error } = await authClient.signUp.email(
          {
            email,
            password,
            name,
            // @ts-ignore
            role,
          },
          {
            onRequest: (ctx) => {},
            onSuccess: (ctx) => {
              console.log('User signed up successfully:', ctx.data);
              if (role == 'Provider') {
                fetch(`/api/providers`, {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name,
                    userId: ctx.data.user.id,
                  }),
                })
                  .then((res) => {
                    setTimeout(() => {
                      redirect('/dashboard');
                    }, 2000);
                  })
                  .catch((err) => {
                    console.error('Error creating provider:', err);
                  });
              } else {
                setTimeout(() => {
                  redirect('/dashboard');
                }, 1000);
              }
            },
            onError: (ctx) => {
              console.error('Sign up error:', ctx.error);
              toast.error(ctx.error.message || 'Sign up failed');
            },
          },
        );
      } catch (err) {
        console.error('Network error during sign up:', err);
        toast.error(
          err instanceof Error ? err.message : 'Failed to connect to server',
        );
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL,
      });
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google');
    }
  };

  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-center text-2xl font-bold text-foreground'>
          {isLogin ? 'Sign in' : 'Sign up'} to your account
        </h2>

        {/* Social Login (Google) */}
        <>
          <Separator className='my-4 bg-zinc-700' />
          <div className='space-y-2'>
            <p className='text-xs text-center text-zinc-500'>
              Or continue with
            </p>
            <Button
              type='button'
              variant='outline'
              className='w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon />
              {isLogin ? 'Sign in' : 'Sign up'} with Google
            </Button>
          </div>
        </>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          {!isLogin && (
            <>
              {' '}
              <div>
                <Label
                  htmlFor='name'
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
                  <p className='py-1 text-xs text-red-500'>Name is required</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor='role'
                  className='text-sm font-medium text-foreground dark:text-foreground'
                >
                  Role
                </Label>
                <Input
                  type='text'
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
              htmlFor='email'
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
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>
        </form>

        <p className='mt-4 text-xs text-muted-foreground dark:text-muted-foreground'>
          By signing in, you agree to our{' '}
          <a href='/terms' className='underline underline-offset-4'>
            terms of service
          </a>{' '}
          and{' '}
          <a href='/privacy' className='underline underline-offset-4'>
            privacy policy
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default Form;
