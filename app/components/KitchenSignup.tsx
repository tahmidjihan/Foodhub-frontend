import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const KitchenSignup = () => {
  return (
    <section id='register' className='py-24 bg-zinc-50 dark:bg-zinc-950'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='relative rounded-3xl overflow-hidden bg-dark text-white p-8 md:p-16 lg:flex items-center gap-16'>
          {/* Background Decorative Gradient */}
          <div className='absolute top-0 right-0 w-1/2 h-full bg-[#ff4d00]/10 blur-[100px] -z-10' />

          <div className='lg:w-1/2 relative z-10'>
            <span className='inline-block py-1 px-4 rounded-full bg-[#ff4d00]/20 text-[#ff4d00] font-bold text-sm mb-6 border border-[#ff4d00]/30'>
              FOR KITCHEN OWNERS
            </span>
            <h2 className='text-4xl md:text-5xl font-black mb-6 leading-tight'>
              Turn Your Kitchen Into A{' '}
              <br />
              <span className='text-[#ff4d00]'>Thriving Business</span>
            </h2>
            <p className='text-zinc-400 text-lg mb-10 max-w-lg'>
              Partner with FoodHub to reach thousands of customers in your area.
              We provide the platform, the tools, and the delivery - you focus on
              the cooking.
            </p>

            <div className='space-y-6 mb-12'>
              {[
                'Reach 10k+ potential customers weekly',
                'Advanced dashboard for order management',
                'Reliable logistics and fast delivery fleet',
                'Transparent weekly payouts',
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-4'>
                  <div className='w-6 h-6 rounded-full bg-[#ff4d00]/20 flex items-center justify-center border border-[#ff4d00]/40 shrink-0'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 text-[#ff4d00]'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <span className='font-semibold text-zinc-300'>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href='/auth/register'
              className='inline-block bg-[#ff4d00] hover:bg-[#ff7433] text-white font-bold py-4 px-12 rounded-full text-lg transition-all shadow-lg hover:shadow-[#ff4d00]/30'
            >
              Register Your Kitchen
            </Link>
          </div>

          <div className='hidden lg:block lg:w-1/2 relative h-[500px]'>
            <div className='absolute inset-0 rounded-3xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl border-4 border-white/10 bg-zinc-800'>
              <Image
                src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
                alt='Professional Chef'
                fill
                className='object-cover'
              />
            </div>
            {/* Status Card Overlay */}
            <div className='absolute bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl border border-white/20'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-[#008148] rounded-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                </div>
                <div>
                  <p className='text-dark font-bold text-lg'>+142%</p>
                  <p className='text-zinc-500 text-xs'>Revenue Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenSignup;
