import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import MealCard from '../../meals/mealCard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

interface Props {
  params: Promise<{ providerId: string }>;
}

async function Page({ params }: Props) {
  const resolvedParams = await params;
  const providerId = resolvedParams.providerId;

  let data: any[] = [];
  let providerInfo: any = null;
  let error: string | null = null;

  try {
    const [mealsRes, providerRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/meals/provider/${providerId}`, {
        cache: 'no-store',
      }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/providers/${providerId}`, {
        cache: 'no-store',
      }),
    ]);

    if (mealsRes.ok) {
      data = await mealsRes.json();
      if (!Array.isArray(data)) data = [];
    }

    if (providerRes.ok) {
      providerInfo = await providerRes.json();
    }
  } catch (err) {
    console.error('Error fetching provider data:', err);
    error = 'Failed to load provider information';
  }

  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <div className='p-8 space-y-6 mx-auto max-w-7xl w-full pt-32'>
        {/* Provider Header */}
        {providerInfo ? (
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-neutral-50'>
              {providerInfo.name || providerInfo.user?.name || 'Provider'}
            </h1>
            <p className='text-zinc-400 mt-2'>
              {data.length} meal{data.length !== 1 ? 's' : ''} available
            </p>
          </div>
        ) : (
          <div className='mb-8'>
            <Skeleton className='h-10 w-64 mb-2' />
            <Skeleton className='h-5 w-40' />
          </div>
        )}

        {error && (
          <div className='bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center'>
            <p className='text-red-400'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md'
            >
              Try Again
            </button>
          </div>
        )}

        {data.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center'>
            {data.map((item: any) => (
              <MealCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          !error && (
            <div className='text-center py-16'>
              <div className='w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-4xl'>🍽️</span>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>
                No meals available
              </h3>
              <p className='text-zinc-400 mb-6'>
                This provider has not added any meals yet. Check back later!
              </p>
              <Link href='/providers'>
                <Button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'>
                  View All Providers
                </Button>
              </Link>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Page;
