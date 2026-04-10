'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Gift, Clock, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  expiry: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const OffersSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Check if there's an offers/promotions endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/offers?active=true`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setOffers(data);
          }
        }
      } catch {
        // No offers available
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Don't render section if no real offers and not loading
  if (!loading && offers.length === 0) {
    return null;
  }

  return (
    <section className='py-16 md:py-20 bg-zinc-50 dark:bg-zinc-950'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10 md:mb-12'>
          <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
            Special Deals
          </span>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-black mt-2'>
            Hot Offers & Promotions
          </h2>
          <p className='text-zinc-500 mt-4 max-w-2xl mx-auto text-sm md:text-base'>
            Check out our current promotions and save on your favorite meals
          </p>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='rounded-2xl bg-white dark:bg-zinc-900 p-6 md:p-8'>
                <Skeleton className='h-14 w-14 rounded-xl mb-6' />
                <Skeleton className='h-6 w-3/4 mb-2' />
                <Skeleton className='h-4 w-full mb-6' />
                <Skeleton className='h-8 w-32' />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {offers.map((offer) => (
              <div
                key={offer.id}
                className='group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all'
              >
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${offer.gradient}`} />

                <div className='p-6 md:p-8'>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${offer.gradient} flex items-center justify-center mb-6`}>
                    <offer.icon className='w-7 h-7 text-white' />
                  </div>

                  <h3 className='text-lg md:text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100'>
                    {offer.title}
                  </h3>
                  <p className='text-zinc-500 dark:text-zinc-400 text-sm mb-6'>
                    {offer.description}
                  </p>

                  <div className='flex items-center justify-between flex-wrap gap-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-zinc-500 dark:text-zinc-400'>Code:</span>
                      <span className='font-mono font-bold text-sm bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-900 dark:text-zinc-100'>
                        {offer.code}
                      </span>
                    </div>
                    <span className='text-xs text-zinc-400 dark:text-zinc-500'>{offer.expiry}</span>
                  </div>

                  <Link
                    href='/meals'
                    className='mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ff4d00] group-hover:gap-3 transition-all'
                  >
                    Order Now <ArrowRight className='w-4 h-4' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersSection;
