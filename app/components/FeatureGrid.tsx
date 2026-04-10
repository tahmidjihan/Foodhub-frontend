'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMeals, type Meal } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const FeatureGrid = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'trending' | 'newest'>('newest');

  useEffect(() => {
    setLoading(true);
    getMeals({
      take: 4,
      sortBy: filter === 'newest' ? undefined : 'price',
      sortOrder: filter === 'trending' ? 'desc' : 'desc',
    }).then((res) => {
      if (res.data) setMeals(res.data);
      setLoading(false);
    });
  }, [filter]);

  return (
    <section className='py-20 bg-zinc-50 dark:bg-zinc-950'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
          <div>
            <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
              Deliciously Selected
            </span>
            <h2 className='text-3xl md:text-5xl font-black mt-2'>
              Popular Dishes
            </h2>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setFilter('newest')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                filter === 'newest'
                  ? 'bg-dark dark:bg-white text-white dark:text-dark'
                  : 'border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-[#ff4d00]'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                filter === 'trending'
                  ? 'bg-dark dark:bg-white text-white dark:text-dark'
                  : 'border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-[#ff4d00]'
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center'>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className='group'>
                <Skeleton className='h-64 rounded-[2rem] mb-4' />
                <Skeleton className='w-32 h-5 mb-2' />
                <Skeleton className='w-24 h-4' />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center'>
            {meals.map((meal) => (
              <Link key={meal.id} href={`/meals/${meal.id}`} className='group cursor-pointer'>
                <div className='relative h-64 mb-6 rounded-[2rem] overflow-hidden card-hover'>
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute top-4 right-4 bg-white/90 dark:bg-dark/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1'>
                    <Star className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400' />
                    <span className='text-xs font-bold text-dark'>
                      {meal.avgRating || '4.8'}
                    </span>
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6'>
                    <button className='w-full bg-[#ff4d00] hover:bg-[#ff7433] text-white py-2.5 rounded-full font-bold transition-colors'>
                      View Details
                    </button>
                  </div>
                </div>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='text-lg font-bold group-hover:text-[#ff4d00] transition-colors line-clamp-1'>
                      {meal.name}
                    </h3>
                    <p className='text-zinc-500 text-sm'>
                      {meal.Category?.name || meal.type}
                    </p>
                  </div>
                  <p className='text-lg font-black text-[#ff4d00]'>
                    ${meal.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className='text-center mt-12'>
          <Link
            href='/meals'
            className='inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff7433] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-[#ff4d00]/30'
          >
            Explore All Meals <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
