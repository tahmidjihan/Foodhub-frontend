'use client';

import React, { useState } from 'react';
import { Star, ShoppingCart, UtensilsCrossed, Tag, User, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface MealDetails {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  description: string;
  type: string;
  providerId: string;
  categoryId: string;
  Category?: { id: string; name: string; image: string | null; createdAt: string };
  provider?: { id: string; name: string; image: string | null };
  avgRating?: number;
  reviewCount?: number;
}

interface Review {
  id: string;
  description: string;
  rating?: number;
  UserId: string;
  MealId: string;
  User: { id: string; name: string; image: string | null };
  createdAt?: string;
}

interface MealCardProps {
  meal: MealDetails;
  reviews: Review[];
}

export default function MealDetailClient({ meal, reviews }: MealCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : meal.avgRating || 0;

  async function addToCart() {
    setIsAdding(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ MealId: meal.id, quantity: 1 }),
      });
      if (res.ok) {
        setAdded(true);
        toast.success('Added to cart!');
        setTimeout(() => setAdded(false), 2000);
      } else {
        toast.error('Failed to add to cart');
      }
    } catch {
      toast.error('Error adding to cart');
    } finally {
      setIsAdding(false);
    }
  }

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: meal.name, text: meal.description, url });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setShareCopied(false), 2000);
    }
  }

  return (
    <>
      {/* Hero Image */}
      <div className='relative w-full h-[50vh] md:h-[60vh] overflow-hidden'>
        <div className='absolute inset-0 bg-black/40 z-10' />
        <img
          src={meal.image}
          alt={meal.name}
          className='w-full h-full object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-wrap gap-2 mb-3'>
              <Badge className='bg-[#ff4d00] hover:bg-[#ff4d00] text-white capitalize'>
                {meal.type}
              </Badge>
              {meal.Category && (
                <Badge className='bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'>
                  {meal.Category.name}
                </Badge>
              )}
            </div>
            <h1 className='text-3xl md:text-5xl font-bold text-white mb-2'>
              {meal.name}
            </h1>
            {meal.provider && (
              <div className='flex items-center gap-2 text-white/90'>
                <User className='w-4 h-4' />
                <span className='text-sm'>By {meal.provider.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left - Description & Reviews */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Description */}
            <Card className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='p-6'>
                <h2 className='text-2xl font-bold text-neutral-50 mb-4'>
                  About this meal
                </h2>
                <p className='text-zinc-300 leading-relaxed'>
                  {meal.description || 'No description available.'}
                </p>
                {meal.tags && meal.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {meal.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant='outline'
                        className='border-zinc-700 text-zinc-300'
                      >
                        <Tag className='w-3 h-3 mr-1' />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className='bg-zinc-900/50 border-zinc-800'>
              <CardContent className='p-6'>
                <h2 className='text-2xl font-bold text-neutral-50 mb-6'>
                  Reviews ({reviews.length})
                </h2>
                {reviews.length > 0 ? (
                  <div className='space-y-4'>
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className='p-4 bg-zinc-800/50 rounded-xl border border-zinc-700'
                      >
                        <div className='flex items-center justify-between mb-2'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-[#ff4d00]/20 flex items-center justify-center'>
                              <User className='w-5 h-5 text-[#ff4d00]' />
                            </div>
                            <div>
                              <p className='font-semibold text-neutral-50'>
                                {review.User?.name || 'Anonymous'}
                              </p>
                              {review.createdAt && (
                                <p className='text-xs text-zinc-500'>
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          {review.rating && (
                            <div className='flex items-center gap-1'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating!
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-zinc-600'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className='text-zinc-300 text-sm'>
                          {review.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <UtensilsCrossed className='w-12 h-12 text-zinc-600 mx-auto mb-3' />
                    <p className='text-zinc-400'>
                      No reviews yet. Be the first to review!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right - Order Summary */}
          <div className='lg:col-span-1'>
            <Card className='bg-zinc-900/50 border-zinc-800 sticky top-24'>
              <CardContent className='p-6 space-y-6'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-sm text-zinc-400 mb-1'>Price</p>
                    <p className='text-4xl font-bold text-[#ff4d00]'>
                      ${meal.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={handleShare}
                    className='p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors'
                    aria-label='Share this meal'
                    title='Share'
                  >
                    {shareCopied ? (
                      <Check className='w-5 h-5 text-[#008148]' />
                    ) : (
                      <Share2 className='w-5 h-5 text-zinc-400' />
                    )}
                  </button>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-zinc-400'>Type</span>
                    <span className='text-neutral-50 font-medium capitalize'>
                      {meal.type}
                    </span>
                  </div>
                  {meal.Category && (
                    <div className='flex items-center justify-between'>
                      <span className='text-zinc-400'>Category</span>
                      <span className='text-neutral-50 font-medium'>
                        {meal.Category.name}
                      </span>
                    </div>
                  )}
                  {avgRating > 0 && (
                    <div className='flex items-center justify-between'>
                      <span className='text-zinc-400'>Rating</span>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                        <span className='text-neutral-50 font-medium'>
                          {avgRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  className='w-full bg-[#ff4d00] hover:bg-[#ff7433] text-white py-6 text-lg font-semibold disabled:opacity-70'
                  size='lg'
                  onClick={addToCart}
                  disabled={isAdding || added}
                >
                  {added ? (
                    <>
                      <Check className='w-5 h-5 mr-2' />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className='w-5 h-5 mr-2' />
                      {isAdding ? 'Adding...' : 'Add to Cart'}
                    </>
                  )}
                </Button>

                <p className='text-xs text-zinc-500 text-center'>
                  Fast delivery • Fresh food • Quality guaranteed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
