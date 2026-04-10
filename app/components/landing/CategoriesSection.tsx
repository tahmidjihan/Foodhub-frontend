'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories, type Category } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((res) => {
      if (res.data) setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const categoryIcons = [
    '🍕', '🍔', '🍣', '🥗', '🍜', '🍰', '🌮', '🍱', '☕',
  ];

  return (
    <section className='py-20 bg-white dark:bg-[#0f0703]'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
            Explore
          </span>
          <h2 className='text-3xl md:text-5xl font-black mt-2'>
            Food Categories
          </h2>
          <p className='text-zinc-500 mt-4 max-w-2xl mx-auto'>
            Browse through our diverse range of cuisines and find exactly what
            you're craving today.
          </p>
        </div>

        {loading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='flex flex-col items-center gap-3 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900'
              >
                <Skeleton className='w-16 h-16 rounded-full' />
                <Skeleton className='w-20 h-4' />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/meals?category=${cat.id}`}
                className='group flex flex-col items-center gap-3 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 hover:bg-[#ff4d00]/5 dark:hover:bg-[#ff4d00]/10 transition-all hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='w-16 h-16 rounded-full bg-[#ff4d00]/10 flex items-center justify-center group-hover:bg-[#ff4d00]/20 transition-colors text-2xl'>
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={32}
                      height={32}
                      className='rounded-full object-cover'
                    />
                  ) : (
                    categoryIcons[idx % categoryIcons.length]
                  )}
                </div>
                <span className='text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center group-hover:text-[#ff4d00] transition-colors'>
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className='text-center mt-10'>
          <Link
            href='/meals'
            className='inline-flex items-center gap-2 text-[#ff4d00] font-bold hover:gap-3 transition-all'
          >
            View All Meals <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
