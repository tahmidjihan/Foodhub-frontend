'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getMealReviews, type Review } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  meal: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    // Fetch reviews from recent meals to use as testimonials
    const fetchTestimonials = async () => {
      try {
        // Get reviews from a sample of meals or from a dedicated endpoint
        // For now, we'll check if we have any reviews to display
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/review?limit=10`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((review: Review & { Meal?: { name: string } }) => ({
              id: review.id,
              name: review.User?.name || 'Customer',
              role: 'Verified Customer',
              avatar: (review.User?.name || 'C').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
              content: review.description,
              rating: review.rating || 5,
              meal: review.Meal?.name || 'Delicious Meal',
            }));
            setTestimonials(formatted);
          }
        }
      } catch {
        // No testimonials available
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const next = () => {
    setCurrent((prev) =>
      prev + visibleCount >= testimonials.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev - 1 < 0 ? Math.max(0, testimonials.length - visibleCount) : prev - 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    current,
    current + visibleCount
  );

  // Don't render section if no real testimonials and not loading
  if (!loading && testimonials.length === 0) {
    return null;
  }

  return (
    <section className='py-20 bg-zinc-50 dark:bg-zinc-950'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
            Testimonials
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black mt-2'>
            What Our Customers Say
          </h2>
          <p className='text-zinc-500 mt-4 max-w-2xl mx-auto'>
            Hear from our community of food lovers
          </p>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='bg-white dark:bg-zinc-900 rounded-2xl p-6 lg:p-8'>
                <Skeleton className='h-4 w-24 mb-4' />
                <Skeleton className='h-20 w-full mb-6' />
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-12 h-12 rounded-full' />
                  <div>
                    <Skeleton className='h-4 w-24 mb-1' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Testimonials Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className='bg-white dark:bg-zinc-900 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow relative'
                >
                  <Quote className='w-8 h-8 text-[#ff4d00]/20 absolute top-6 right-6' />
                  <div className='flex items-center gap-1 mb-4'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className='text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed text-sm'>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-full bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00] font-bold text-sm'>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className='font-bold text-sm text-zinc-900 dark:text-zinc-100'>{testimonial.name}</p>
                      <p className='text-zinc-500 text-xs'>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className='mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800'>
                    <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                      Favorite: <span className='text-[#ff4d00] font-semibold'>{testimonial.meal}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation - only show if more testimonials than visible */}
            {testimonials.length > visibleCount && (
              <div className='flex justify-center gap-3 mt-10'>
                <button
                  onClick={prev}
                  className='w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-[#ff4d00] hover:border-[#ff4d00] hover:text-white transition-all'
                  aria-label='Previous testimonials'
                >
                  <ChevronLeft className='w-5 h-5' />
                </button>
                <button
                  onClick={next}
                  className='w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-[#ff4d00] hover:border-[#ff4d00] hover:text-white transition-all'
                  aria-label='Next testimonials'
                >
                  <ChevronRight className='w-5 h-5' />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
