import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Users,
  Target,
  Award,
  ChefHat,
  MapPin,
  Clock,
  Star,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

function AboutPage() {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-2 rounded-full mb-6'>
            <Heart className='w-4 h-4' />
            <span className='text-sm font-medium'>Our Story</span>
          </div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            About FoodHub
          </h1>
          <p className='text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed'>
            We are on a mission to connect food lovers with amazing home-cooked
            meals from talented local providers in their community.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Our Mission & Values
            </h2>
            <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
              At FoodHub, we believe that great food brings people together. Our
              platform empowers local food providers to share their culinary
              creations with their communities.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
              <CardContent className='pt-6'>
                <div className='w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center mb-4'>
                  <Heart className='w-6 h-6 text-[#ff4d00]' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Community First
                </h3>
                <p className='text-zinc-400'>
                  We strengthen local communities by connecting food enthusiasts
                  with talented home cooks and small kitchens in their
                  neighborhood.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
              <CardContent className='pt-6'>
                <div className='w-12 h-12 bg-[#008148]/10 rounded-xl flex items-center justify-center mb-4'>
                  <Award className='w-6 h-6 text-[#008148]' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Quality & Authenticity
                </h3>
                <p className='text-zinc-400'>
                  Every meal on our platform is prepared with care using fresh
                  ingredients. We prioritize authenticity and homemade quality
                  in every dish.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all'>
              <CardContent className='pt-6'>
                <div className='w-12 h-12 bg-[#ff4d00]/10 rounded-xl flex items-center justify-center mb-4'>
                  <Users className='w-6 h-6 text-[#ff4d00]' />
                </div>
                <h3 className='text-xl font-bold text-white mb-2'>
                  Empowering Providers
                </h3>
                <p className='text-zinc-400'>
                  We provide local food providers with the tools they need to
                  grow their business, manage orders, and build a loyal
                  customer base.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                How FoodHub Started
              </h2>
              <div className='space-y-4 text-zinc-300 leading-relaxed'>
                <p>
                  FoodHub was born from a simple observation: there are
                  incredible home cooks and small food businesses in every
                  community, but they often lack the platform to reach their
                  potential customers.
                </p>
                <p>
                  We saw an opportunity to bridge this gap by creating a
                  user-friendly marketplace where food providers can showcase
                  their offerings, manage orders efficiently, and build
                  lasting relationships with their customers.
                </p>
                <p>
                  Today, FoodHub serves thousands of users, connecting them
                  with delicious meals from trusted local providers. Our
                  platform continues to grow, and we remain committed to our
                  founding vision of empowering local food communities.
                </p>
              </div>
            </div>
            <div className='relative'>
              <div className='aspect-square rounded-2xl overflow-hidden bg-zinc-900'>
                <img
                  src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop'
                  alt='Food preparation in a modern kitchen'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-6 -left-6 bg-[#ff4d00] rounded-xl p-6 shadow-xl'>
                <div className='text-white'>
                  <p className='text-3xl font-bold'>1000+</p>
                  <p className='text-sm'>Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-[#ff4d00]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <ChefHat className='w-8 h-8 text-[#ff4d00]' />
              </div>
              <p className='text-3xl md:text-4xl font-bold text-white mb-2'>
                150+
              </p>
              <p className='text-zinc-400'>Food Providers</p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-[#008148]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Star className='w-8 h-8 text-[#008148]' />
              </div>
              <p className='text-3xl md:text-4xl font-bold text-white mb-2'>
                500+
              </p>
              <p className='text-zinc-400'>Meals Available</p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-[#ff4d00]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Users className='w-8 h-8 text-[#ff4d00]' />
              </div>
              <p className='text-3xl md:text-4xl font-bold text-white mb-2'>
                5000+
              </p>
              <p className='text-zinc-400'>Happy Customers</p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-[#008148]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MapPin className='w-8 h-8 text-[#008148]' />
              </div>
              <p className='text-3xl md:text-4xl font-bold text-white mb-2'>
                50+
              </p>
              <p className='text-zinc-400'>Communities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              Meet Our Team
            </h2>
            <p className='text-zinc-400 text-lg max-w-2xl mx-auto'>
              The passionate individuals behind FoodHub who work tirelessly to
              bring you the best local food experience.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='pt-6 text-center'>
                <div className='w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-4 flex items-center justify-center'>
                  <ChefHat className='w-12 h-12 text-[#ff4d00]' />
                </div>
                <h3 className='text-xl font-bold text-white mb-1'>
                  Sarah Johnson
                </h3>
                <p className='text-[#ff4d00] mb-3'>Founder & CEO</p>
                <p className='text-zinc-400 text-sm'>
                  Passionate about connecting communities through great food
                  and empowering local entrepreneurs.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='pt-6 text-center'>
                <div className='w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-4 flex items-center justify-center'>
                  <Target className='w-12 h-12 text-[#008148]' />
                </div>
                <h3 className='text-xl font-bold text-white mb-1'>
                  Michael Chen
                </h3>
                <p className='text-[#008148] mb-3'>Head of Operations</p>
                <p className='text-zinc-400 text-sm'>
                  Ensures smooth daily operations and works closely with food
                  providers to maintain quality standards.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='pt-6 text-center'>
                <div className='w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-4 flex items-center justify-center'>
                  <Star className='w-12 h-12 text-[#ff4d00]' />
                </div>
                <h3 className='text-xl font-bold text-white mb-1'>
                  Emily Rodriguez
                </h3>
                <p className='text-[#ff4d00] mb-3'>Community Manager</p>
                <p className='text-zinc-400 text-sm'>
                  Builds relationships with our community of providers and
                  customers, ensuring everyone feels valued.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#ff4d00]/10 to-[#008148]/10'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Ready to Join FoodHub?
          </h2>
          <p className='text-zinc-300 text-lg mb-8'>
            Whether you are a food provider looking to grow your business or a
            food enthusiast searching for amazing local meals, FoodHub is here
            for you.
          </p>
          <div className='flex gap-4 justify-center flex-wrap'>
            <Link href='/auth/register'>
              <Button
                size='lg'
                className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'
              >
                Become a Provider
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </Link>
            <Link href='/meals'>
              <Button
                size='lg'
                variant='outline'
                className='border-zinc-700 text-white hover:bg-zinc-800'
              >
                Browse Meals
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;
