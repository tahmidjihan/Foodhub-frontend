'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProviders, type ProviderProfile } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, ArrowRight, ChefHat } from 'lucide-react';

const TopProvidersSection = () => {
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviders().then((res) => {
      if (res.data) {
        // Sort by rating and slice top 4
        const sorted = res.data
          .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
          .slice(0, 4);
        setProviders(sorted);
      }
      setLoading(false);
    });
  }, []);

  // Don't render if no providers and not loading
  if (!loading && providers.length === 0) {
    return null;
  }

  return (
    <section className='py-16 md:py-20 bg-white dark:bg-[#0f0703]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4'>
          <div>
            <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
              Top Rated
            </span>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-black mt-2'>
              Featured Providers
            </h2>
            <p className='text-zinc-500 mt-2 text-sm md:text-base'>
              Discover our highest-rated kitchens and chefs
            </p>
          </div>
          <Link
            href='/providers'
            className='inline-flex items-center gap-2 text-[#ff4d00] font-bold hover:gap-3 transition-all shrink-0'
          >
            View All <ArrowRight className='w-4 h-4' />
          </Link>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 place-items-center'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-900'
              >
                <Skeleton className='w-16 h-16 rounded-full mb-4' />
                <Skeleton className='w-32 h-5 mb-2' />
                <Skeleton className='w-24 h-4' />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 place-items-center'>
            {providers.map((provider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className='group block rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-900 hover:bg-[#ff4d00]/5 dark:hover:bg-[#ff4d00]/10 transition-all hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='w-16 h-16 rounded-full bg-[#ff4d00]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4d00]/20 transition-colors'>
                  <ChefHat className='w-8 h-8 text-[#ff4d00]' />
                </div>
                <h3 className='text-lg font-bold mb-1 group-hover:text-[#ff4d00] transition-colors text-zinc-900 dark:text-zinc-100'>
                  {provider.name || provider.user?.name || 'Provider'}
                </h3>
                <div className='flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400'>
                  <span>{provider.mealCount || 0} meals</span>
                  {provider.avgRating && (
                    <span className='flex items-center gap-1'>
                      <Star className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400' />
                      {provider.avgRating.toFixed(1)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopProvidersSection;
