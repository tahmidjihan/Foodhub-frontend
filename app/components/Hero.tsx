'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const slides = [
  {
    id: 1,
    headline: 'Flavor Delivered To Your Door',
    subheadline:
      'Experience the best local kitchens and gourmet providers. Healthy, fresh, and delicious meals delivered in minutes.',
    cta: 'Explore Meals',
    ctaHref: '/meals',
    ctaSecondary: 'View Providers',
    ctaSecondaryHref: '/providers',
    gradient: 'from-black/80 via-black/50 to-transparent',
    bgImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    headline: 'Premium Local Kitchens',
    subheadline:
      'Discover top-rated chefs and home cooks in your area. From gourmet pasta to authentic street food.',
    cta: 'Browse Kitchens',
    ctaHref: '/providers',
    ctaSecondary: 'Become a Provider',
    ctaSecondaryHref: '/auth/register',
    gradient: 'from-black/80 via-black/50 to-transparent',
    bgImage:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    headline: 'Fresh Ingredients, Fast Delivery',
    subheadline:
      'Quality meals prepared with locally sourced ingredients, delivered to your doorstep in under 30 minutes.',
    cta: 'Order Now',
    ctaHref: '/meals',
    ctaSecondary: 'See How It Works',
    ctaSecondaryHref: '/#how-it-works',
    gradient: 'from-black/80 via-black/50 to-transparent',
    bgImage:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 4,
    headline: 'Join Thousands of Happy Foodies',
    subheadline:
      'Over 10,000 customers trust FoodHub for their daily meals. Join our growing community today.',
    cta: 'Sign Up Free',
    ctaHref: '/auth/register',
    ctaSecondary: 'Learn More',
    ctaSecondaryHref: '/about',
    gradient: 'from-black/80 via-black/50 to-transparent',
    bgImage:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className='relative h-[70vh] min-h-[500px] flex items-center overflow-hidden py-12'>
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
          />
        </div>
      ))}

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 text-white w-full'>
        <div className='max-w-2xl'>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute pointer-events-none'
              }`}
            >
              {index === currentSlide && (
                <>
                  <h1 className='text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6'>
                    {slide.headline.split(' ').slice(0, -1).join(' ')}{' '}
                    <br />
                    <span className='text-[#ff4d00]'>
                      {slide.headline.split(' ').slice(-1)}
                    </span>
                  </h1>
                  <p className='text-base md:text-lg text-zinc-300 mb-10 max-w-lg leading-relaxed'>
                    {slide.subheadline}
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Link
                      href={slide.ctaHref}
                      className='bg-[#ff4d00] hover:bg-[#ff7433] text-white font-bold py-3.5 px-8 rounded-full text-center transition-all shadow-lg hover:shadow-[#ff4d00]/30'
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      href={slide.ctaSecondaryHref}
                      className='border-2 border-white/30 hover:border-white/60 text-white font-bold py-3.5 px-8 rounded-full text-center transition-all backdrop-blur-sm'
                    >
                      {slide.ctaSecondary}
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* User Social Proof */}
          <div className='mt-16 flex items-center gap-4'>
            <div className='flex -space-x-3'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='w-10 h-10 rounded-full border-2 border-white bg-zinc-700 overflow-hidden flex items-center justify-center text-xs font-bold'
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className='text-sm font-medium'>
              Join <span className='text-[#ff4d00] font-bold'>10,000+</span>{' '}
              happy food lovers
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className='absolute z-20 bottom-8 left-0 right-0 flex items-center justify-between px-4 max-w-7xl mx-auto'>
        {/* Dots */}
        <div className='flex gap-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-[#ff4d00]'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className='flex gap-2'>
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className='w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors'
            aria-label='Previous slide'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className='w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors'
            aria-label='Next slide'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className='absolute z-20 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce'>
        <span className='text-xs text-white/60'>Scroll to explore</span>
        <ChevronDown className='w-5 h-5 text-white/60' />
      </div>
    </section>
  );
};

export default Hero;
