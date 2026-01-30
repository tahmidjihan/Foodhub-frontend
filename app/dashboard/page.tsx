// app/dashboard/page.tsx or pages/dashboard/index.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChefHat, Pizza } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className='min-h-screen p-4 md:p-6 space-y-4 md:space-y-6'>
      {/* First Banner - Order Food Now */}
      <Card className='overflow-hidden border-0 shadow-lg'>
        <CardContent className='p-0 h-[60vh] max-h-150 '>
          <div className='relative h-full'>
            {/* Background Image */}
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
              }}
            >
              {/* Overlay for better text readability */}
              <div className='absolute inset-0 bg-black/40' />
            </div>

            {/* Content */}
            <div className='relative h-full flex flex-col justify-center p-8 md:p-12 text-white'>
              <div className='max-w-2xl'>
                <div className='flex items-center gap-2 mb-6'>
                  <Pizza className='w-8 h-8' />
                  <span className='text-lg font-semibold bg-black/50 px-4 py-2 rounded-full'>
                    Fast Delivery
                  </span>
                </div>

                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
                  Order Food Now
                </h2>

                <p className='text-xl mb-8 opacity-90 max-w-xl'>
                  Get your favorite pizza delivered hot and fresh in under 30
                  minutes
                </p>

                <Button
                  size='lg'
                  className='bg-orange-500 hover:bg-orange-600 text-white w-fit px-8'
                >
                  Order Now
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second Banner - Preferred Provider */}
      <Card className='overflow-hidden border-0 shadow-lg'>
        <CardContent className='p-0 h-[40vh] max-h-75'>
          <div className='relative h-full'>
            {/* Background Image */}
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
              }}
            >
              {/* Overlay for better text readability */}
              <div className='absolute inset-0 bg-black/40' />
            </div>

            {/* Content */}
            <div className='relative h-full flex flex-col justify-center p-8 md:p-12 text-white'>
              <div className='max-w-2xl'>
                <div className='flex items-center gap-2 mb-6'>
                  <ChefHat className='w-8 h-8' />
                  <span className='text-lg font-semibold bg-black/50 px-4 py-2 rounded-full'>
                    Professional Chefs
                  </span>
                </div>

                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
                  See Your Preferred Provider
                </h2>

                <p className='text-lg md:text-xl mb-8 opacity-90 max-w-xl'>
                  Connect with certified chefs and kitchen experts near you
                </p>

                <Button
                  variant='outline'
                  size='lg'
                  className='bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white w-fit px-8'
                >
                  Browse Providers
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
