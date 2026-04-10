import React from 'react';
import { Search, Utensils, Truck, Smile } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse & Discover',
    description:
      'Explore hundreds of meals from top-rated local kitchens and providers.',
    color: 'bg-blue-500',
  },
  {
    icon: Utensils,
    title: 'Choose Your Meal',
    description:
      'Filter by cuisine, price, dietary preference, and more to find your perfect meal.',
    color: 'bg-[#ff4d00]',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description:
      'Your meal is prepared fresh and delivered hot to your doorstep in minutes.',
    color: 'bg-[#008148]',
  },
  {
    icon: Smile,
    title: 'Enjoy & Review',
    description:
      'Savor every bite and share your experience with the community.',
    color: 'bg-purple-500',
  },
];

const HowItWorksSection = () => {
  return (
    <section id='how-it-works' className='py-20 bg-zinc-50 dark:bg-zinc-950'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-16'>
          <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
            Simple Process
          </span>
          <h2 className='text-3xl md:text-5xl font-black mt-2'>
            How It Works
          </h2>
          <p className='text-zinc-500 mt-4 max-w-2xl mx-auto'>
            Getting delicious food delivered is as easy as 1-2-3-4
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, idx) => (
            <div key={idx} className='relative text-center'>
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className='hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#ff4d00]/30 to-transparent' />
              )}

              {/* Icon */}
              <div
                className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
              >
                <step.icon className='w-10 h-10 text-white' />
              </div>

              {/* Step Number */}
              <div className='absolute top-0 right-1/2 translate-x-8 -translate-y-1 w-8 h-8 bg-dark dark:bg-white text-white dark:text-dark rounded-full flex items-center justify-center text-sm font-bold'>
                {idx + 1}
              </div>

              <h3 className='text-xl font-bold mb-3'>{step.title}</h3>
              <p className='text-zinc-500 text-sm leading-relaxed'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
