'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getMealById, addToCart } from '@/lib/api';
import { MealDetails, Meal, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  ShoppingCart,
  Share2,
  Heart,
  ArrowLeft,
  ChefHat,
  Clock,
  MapPin,
  MessageSquare,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import MealCard from '@/app/meals/mealCard';

function MealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mealId = params.id as string;

  const [meal, setMeal] = useState<MealDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError(null);
      const response = await getMealById(mealId);
      if (response.data) {
        setMeal(response.data);
      } else {
        setError(response.error || 'Failed to fetch meal details');
      }
      setLoading(false);
    };

    fetchMeal();
  }, [mealId]);

  const handleAddToCart = async () => {
    if (!meal) return;
    setAddingToCart(true);
    const response = await addToCart(meal.id, quantity);
    if (response.data) {
      toast.success(`Added ${quantity} item(s) to cart!`);
    } else {
      toast.error(response.error || 'Failed to add to cart');
    }
    setAddingToCart(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meal?.name,
        text: meal?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className='bg-black min-h-screen'>
        <Navbar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Breadcrumb skeleton */}
          <Skeleton className='h-6 w-48 mb-6 bg-zinc-800' />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Image skeleton */}
            <Skeleton className='aspect-square rounded-2xl bg-zinc-800' />

            {/* Details skeleton */}
            <div className='space-y-4'>
              <Skeleton className='h-10 w-3/4 bg-zinc-800' />
              <Skeleton className='h-6 w-1/4 bg-zinc-800' />
              <Skeleton className='h-4 w-full bg-zinc-800' />
              <Skeleton className='h-4 w-5/6 bg-zinc-800' />
              <div className='flex gap-2 pt-4'>
                <Skeleton className='h-8 w-20 rounded-full bg-zinc-800' />
                <Skeleton className='h-8 w-24 rounded-full bg-zinc-800' />
              </div>
              <Separator className='bg-zinc-800' />
              <Skeleton className='h-12 w-full bg-zinc-800' />
              <Skeleton className='h-12 w-full bg-zinc-800' />
            </div>
          </div>

          {/* Reviews skeleton */}
          <div className='mt-12 space-y-4'>
            <Skeleton className='h-8 w-48 bg-zinc-800' />
            <Skeleton className='h-24 w-full bg-zinc-800' />
            <Skeleton className='h-24 w-full bg-zinc-800' />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className='bg-black min-h-screen'>
        <Navbar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Meal Not Found
          </h1>
          <p className='text-zinc-400 mb-8'>
            {error || 'The meal you are looking for does not exist.'}
          </p>
          <Button
            onClick={() => router.push('/meals')}
            className='bg-[#ff4d00] hover:bg-[#ff7433] text-white'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Meals
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm text-zinc-400 mb-6'>
          <Link href='/meals' className='hover:text-[#ff4d00] transition-colors'>
            Meals
          </Link>
          <span>/</span>
          {meal.Category && (
            <>
              <Link
                href={`/meals?category=${meal.Category.name}`}
                className='hover:text-[#ff4d00] transition-colors'
              >
                {meal.Category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className='text-white truncate'>{meal.name}</span>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
          {/* Image Section */}
          <div className='space-y-4'>
            <div className='relative aspect-square rounded-2xl overflow-hidden bg-zinc-900'>
              <img
                src={meal.image}
                alt={meal.name}
                className='w-full h-full object-cover'
              />
              <div className='absolute top-4 right-4 flex gap-2'>
                <Button
                  size='icon'
                  variant='secondary'
                  className='bg-black/70 backdrop-blur-sm hover:bg-black/80 text-white'
                  onClick={handleShare}
                >
                  <Share2 className='w-4 h-4' />
                </Button>
              </div>
              {meal.avgRating && (
                <div className='absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2'>
                  <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                  <span className='text-white font-medium'>
                    {meal.avgRating.toFixed(1)}
                  </span>
                  {meal.reviewCount && (
                    <span className='text-zinc-300 text-sm'>
                      ({meal.reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Meal Details */}
          <div className='space-y-6'>
            <div>
              <div className='flex items-start justify-between gap-4 mb-4'>
                <h1 className='text-3xl md:text-4xl font-bold text-white'>
                  {meal.name}
                </h1>
                <Badge
                  className={
                    meal.type === 'veg'
                      ? 'bg-green-600 text-white'
                      : meal.type === 'non-veg'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-700 text-white'
                  }
                >
                  {meal.type}
                </Badge>
              </div>

              {meal.Category && (
                <Badge
                  variant='outline'
                  className='border-zinc-700 text-zinc-300 mb-4'
                >
                  {meal.Category.name}
                </Badge>
              )}

              <p className='text-zinc-300 text-lg leading-relaxed'>
                {meal.description}
              </p>
            </div>

            <Separator className='bg-zinc-800' />

            {/* Provider Info */}
            {meal.provider && (
              <div className='bg-zinc-900/50 rounded-xl p-4 border border-zinc-800'>
                <div className='flex items-center gap-3'>
                  {meal.provider.image ? (
                    <img
                      src={meal.provider.image}
                      alt={meal.provider.name}
                      className='w-12 h-12 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center'>
                      <ChefHat className='w-6 h-6 text-zinc-400' />
                    </div>
                  )}
                  <div>
                    <p className='text-sm text-zinc-400'>Prepared by</p>
                    <p className='text-white font-medium'>
                      {meal.provider.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Price & Actions */}
            <div className='bg-zinc-900/50 rounded-xl p-6 border border-zinc-800'>
              <div className='flex items-baseline gap-2 mb-4'>
                <span className='text-4xl font-bold text-[#ff4d00]'>
                  ${meal.price.toFixed(2)}
                </span>
                <span className='text-zinc-400'>per serving</span>
              </div>

              {/* Quantity Selector */}
              <div className='flex items-center gap-4 mb-4'>
                <label className='text-zinc-300 font-medium'>Quantity:</label>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-zinc-700 text-white hover:bg-zinc-800'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className='text-white font-medium w-12 text-center'>
                    {quantity}
                  </span>
                  <Button
                    variant='outline'
                    size='icon'
                    className='border-zinc-700 text-white hover:bg-zinc-800'
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                <Button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  size='lg'
                  className='w-full bg-[#ff4d00] hover:bg-[#ff7433] text-white text-lg'
                >
                  <ShoppingCart className='w-5 h-5 mr-2' />
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    className='flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    onClick={() => toast.info('Wishlist coming soon!')}
                  >
                    <Heart className='w-4 h-4 mr-2' />
                    Save
                  </Button>
                  <Button
                    variant='outline'
                    className='flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    onClick={handleShare}
                  >
                    <Share2 className='w-4 h-4 mr-2' />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Tags */}
            {meal.tags && meal.tags.length > 0 && (
              <div>
                <p className='text-sm text-zinc-400 mb-2'>Tags:</p>
                <div className='flex gap-2 flex-wrap'>
                  {meal.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className='border-zinc-700 text-zinc-300'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold text-white mb-6'>
            Reviews & Feedback
          </h2>

          {meal.reviews && meal.reviews.length > 0 ? (
            <div className='space-y-4'>
              {meal.reviews.map((review: Review) => (
                <Card
                  key={review.id}
                  className='bg-zinc-900/50 border-zinc-800'
                >
                  <CardContent className='pt-6'>
                    <div className='flex items-start gap-4'>
                      {review.User?.image ? (
                        <img
                          src={review.User.image}
                          alt={review.User.name}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center'>
                          <User className='w-5 h-5 text-zinc-400' />
                        </div>
                      )}
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                          <p className='text-white font-medium'>
                            {review.User?.name || 'Anonymous'}
                          </p>
                          {review.createdAt && (
                            <p className='text-sm text-zinc-500'>
                              {new Date(review.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </p>
                          )}
                        </div>
                        {review.rating && (
                          <div className='flex items-center gap-1 mb-2'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating!
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-zinc-600'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <p className='text-zinc-300'>{review.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className='bg-zinc-900/50 rounded-xl p-8 text-center border border-zinc-800'>
              <MessageSquare className='w-12 h-12 text-zinc-600 mx-auto mb-4' />
              <p className='text-zinc-400 text-lg mb-2'>No reviews yet</p>
              <p className='text-zinc-500 text-sm'>
                Be the first to review this meal!
              </p>
            </div>
          )}
        </div>

        {/* Related Meals */}
        {meal.relatedMeals && meal.relatedMeals.length > 0 && (
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-white mb-6'>
              You Might Also Like
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {meal.relatedMeals.slice(0, 4).map((relatedMeal: Meal) => (
                <MealCard key={relatedMeal.id} item={relatedMeal} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MealDetailPage;
