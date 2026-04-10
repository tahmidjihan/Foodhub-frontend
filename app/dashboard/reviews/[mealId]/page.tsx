'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Page() {
  const params = useParams();
  const router = useRouter();
  const mealId = params.mealId as string;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!review.trim()) {
      toast.error('Please write a review before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/review`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MealId: mealId,
          description: review.trim(),
          rating,
        }),
      });

      if (res.ok) {
        toast.success('Review submitted successfully!');
        setReview('');
        setTimeout(() => {
          router.push('/dashboard/orders');
        }, 1500);
      } else {
        toast.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-8 space-y-6 mx-auto max-w-2xl w-full'>
      <div>
        <h1 className='text-3xl font-bold text-neutral-50'>Write a Review</h1>
        <p className='text-neutral-400 mt-2'>
          Share your experience with this meal
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Rating Stars */}
        <div>
          <Label className='text-sm font-medium text-zinc-300 mb-2 block'>
            Rating
          </Label>
          <div className='flex items-center gap-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type='button'
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className='p-1 transition-transform hover:scale-110'
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-zinc-600'
                  }`}
                />
              </button>
            ))}
            <span className='ml-2 text-sm text-zinc-400'>
              {rating}/5
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <Label
            htmlFor='review'
            className='text-sm font-medium text-zinc-300'
          >
            Your Review
          </Label>
          <textarea
            id='review'
            placeholder='Tell us about your experience with this meal...'
            className='mt-2 bg-background/50 border border-white/10 text-white min-h-[150px] resize-none w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/50'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className='flex gap-2 pt-4'>
          <Button
            type='submit'
            disabled={isSubmitting || !review.trim()}
            className='flex-1 bg-[#ff4d00] hover:bg-[#ff7433] text-white'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
