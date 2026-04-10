'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does FoodHub work?',
    answer:
      'FoodHub connects you with local kitchens and food providers. Browse meals, place your order, and get delicious food delivered to your doorstep. It\'s that simple!',
  },
  {
    question: 'What areas do you deliver to?',
    answer:
      'We currently deliver to 25+ cities and are expanding rapidly. Enter your address on the meals page to check if we deliver to your area.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Most orders are delivered within 30-45 minutes. You can track your order status in real-time from your dashboard.',
  },
  {
    question: 'Can I customize my order?',
    answer:
      'Many of our providers offer customization options. Look for the "Customize" button on meal details pages to add special instructions or modify ingredients.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards, digital wallets, and cash on delivery. All transactions are secure and encrypted.',
  },
  {
    question: 'How do I become a food provider?',
    answer:
      'Click "Get Started" and register as a Provider. We\'ll review your application and help you set up your kitchen on our platform. It\'s free to join!',
  },
  {
    question: 'What if I\'m not satisfied with my order?',
    answer:
      'Your satisfaction is our priority. Contact our support team within 24 hours of delivery, and we\'ll work to make it right with a refund or replacement.',
  },
  {
    question: 'Are there any delivery fees?',
    answer:
      'Delivery fees vary based on distance and order value. Orders above a certain threshold qualify for free delivery. Check the checkout page for exact fees.',
  },
];

const FAQSection = () => {
  return (
    <section className='py-20 bg-white dark:bg-[#0f0703]'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <span className='text-[#ff4d00] font-bold tracking-widest uppercase text-sm'>
            FAQ
          </span>
          <h2 className='text-3xl md:text-5xl font-black mt-2'>
            Frequently Asked Questions
          </h2>
          <p className='text-zinc-500 mt-4 max-w-2xl mx-auto'>
            Everything you need to know about FoodHub
          </p>
        </div>

        <Accordion type='single' collapsible className='space-y-4'>
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className='border border-zinc-200 dark:border-zinc-800 rounded-xl px-6'
            >
              <AccordionTrigger className='text-left font-semibold text-base hover:text-[#ff4d00] hover:no-underline py-4'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-zinc-500 pb-4'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
