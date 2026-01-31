'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Page() {
  const params = useParams();
  const router = useRouter();
  const mealId = params.mealId;
  const [review, setReview] = useState('');
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

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label
            htmlFor='review'
            className='text-sm font-medium text-foreground'
          >
            Your Review
          </Label>
          <textarea
            id='review'
            placeholder='Write your review here...'
            className='mt-2 bg-background/50 border-white/10 text-white min-h-[150px] resize-none w-full p-3 rounded-md border'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className='flex gap-2 pt-4'>
          <Button type='submit' disabled={isSubmitting} className='flex-1'>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
