'use client';

import React, { useEffect, useState, useRef } from 'react';
import { getDashboardStats } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const StatisticsSection = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.data) {
          const realStats: Stat[] = [
            { 
              label: 'Total Orders', 
              value: response.data.totalOrders || 0, 
              suffix: '+', 
              icon: '🍽️' 
            },
            { 
              label: 'Happy Customers', 
              value: response.data.totalCustomers || 0, 
              suffix: '+', 
              icon: '😊' 
            },
            { 
              label: 'Active Providers', 
              value: response.data.totalProviders || 0, 
              suffix: '+', 
              icon: '👨‍🍳' 
            },
            { 
              label: 'Meals Available', 
              value: response.data.totalMeals || 0, 
              suffix: '+', 
              icon: '🍔' 
            },
          ];
          setStats(realStats);
        }
      } catch {
        // Silently fail - section won't show if no stats
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Don't render if no real stats and not loading
  if (!loading && stats.length === 0) {
    return null;
  }

  return (
    <section className='py-16 md:py-20 bg-[#ff4d00] text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10 md:mb-12'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-black'>
            Our Impact in Numbers
          </h2>
          <p className='text-white/80 mt-4 max-w-2xl mx-auto text-sm md:text-base'>
            FoodHub has been transforming the way people eat
          </p>
        </div>

        {loading ? (
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 place-items-center'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='text-center'>
                <Skeleton className='h-12 w-12 rounded-full mx-auto mb-4 bg-white/20' />
                <Skeleton className='h-8 w-24 mx-auto mb-2 bg-white/20' />
                <Skeleton className='h-4 w-20 mx-auto bg-white/20' />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 place-items-center'>
            {stats.map((stat, idx) => (
              <div key={idx} className='text-center'>
                <div className='text-4xl md:text-5xl mb-3 md:mb-4'>{stat.icon}</div>
                <div className='text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2'>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className='text-white/80 font-medium text-sm md:text-base'>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatisticsSection;
