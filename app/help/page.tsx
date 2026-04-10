'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FAQItem } from '@/types';
import {
  Search,
  HelpCircle,
  ShoppingBag,
  CreditCard,
  Truck,
  UserCircle,
  ChefHat,
} from 'lucide-react';

const faqData: FAQItem[] = [
  // Orders
  {
    category: 'Orders',
    question: 'How do I place an order?',
    answer:
      'Browse our meals page, find a dish you love, and click the "Add to Cart" button. Once you are ready, go to your cart, review your items, and proceed to checkout. You will need to provide a delivery address and confirm your order details. Your order will then be sent to the food provider.',
  },
  {
    category: 'Orders',
    question: 'Can I cancel my order?',
    answer:
      'You can cancel an order if it is still in "Pending" status. Go to your dashboard, navigate to the Orders page, find the order you want to cancel, and click the "Cancel Order" button. Once an order moves to "In Progress" or "Completed" status, it can no longer be cancelled. Please contact the food provider directly for orders that are already being prepared.',
  },
  {
    category: 'Orders',
    question: 'How can I track my order status?',
    answer:
      'You can track your order status in real-time from your dashboard. Navigate to the Orders page where you will see all your orders with their current status: Pending, In Progress, Completed, or Cancelled. The food provider updates the status as they prepare your meal.',
  },
  {
    category: 'Orders',
    question: 'What do the order statuses mean?',
    answer:
      'Pending means your order has been placed and is awaiting provider confirmation. In Progress means the provider is actively preparing your meal. Completed means your meal is ready and has been delivered. Cancelled means the order was cancelled by either you or the provider.',
  },

  // Payments
  {
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer:
      'Currently, FoodHub supports cash on delivery for all orders. We are working on integrating online payment methods including credit/debit cards, mobile wallets, and other digital payment options. Stay tuned for updates!',
  },
  {
    category: 'Payments',
    question: 'When do I pay for my order?',
    answer:
      'Payment is collected upon delivery. When your meal arrives, you will pay the delivery person or the food provider directly, depending on the delivery arrangement specified by the provider.',
  },
  {
    category: 'Payments',
    question: 'Are there any additional fees?',
    answer:
      'The price you see on the meal listing is the price you pay. There are no hidden service charges or platform fees. However, some providers may have a minimum order quantity or delivery charges, which will be clearly indicated on the meal details page.',
  },
  {
    category: 'Payments',
    question: 'Can I get a refund?',
    answer:
      'If you experience an issue with your order (wrong item, poor quality, etc.), please contact the food provider directly through the contact information provided on their profile. If the issue cannot be resolved, reach out to FoodHub support at support@foodhub.com and we will investigate and assist with a refund if appropriate.',
  },

  // Delivery
  {
    category: 'Delivery',
    question: 'How long does delivery take?',
    answer:
      'Delivery times vary depending on the food provider and your location. Most providers prepare meals within 30-60 minutes of order confirmation. The estimated delivery time is provided by the provider when they accept your order. You can track the status in your dashboard.',
  },
  {
    category: 'Delivery',
    question: 'What areas do you deliver to?',
    answer:
      'Delivery coverage depends on each individual food provider. When browsing meals, you will see the provider location. Some providers offer delivery within a certain radius, while others may offer pickup only. Check the meal details or contact the provider directly for specific delivery area information.',
  },
  {
    category: 'Delivery',
    question: 'Can I pick up my order instead?',
    answer:
      'Many providers offer pickup as an option. When placing your order, you can specify whether you would like delivery or pickup. If you choose pickup, the provider will let you know when your meal is ready for collection.',
  },
  {
    category: 'Delivery',
    question: 'What if I am not home during delivery?',
    answer:
      'If you are not available to receive your order, please provide clear delivery instructions in the address field or contact the provider directly. Providers will make reasonable efforts to accommodate your situation, but uncollected orders may be subject to a fee.',
  },

  // Account
  {
    category: 'Account',
    question: 'How do I create an account?',
    answer:
      'Click the "Sign Up" button in the navbar, fill in your name, email address, and create a password. You can register as a Customer to order meals, or as a Provider if you want to sell your food on FoodHub. You will receive a confirmation email to verify your account.',
  },
  {
    category: 'Account',
    question: 'I forgot my password. How do I reset it?',
    answer:
      'On the login page, click the "Forgot Password" link. Enter the email address associated with your account, and we will send you a password reset link. Follow the instructions in the email to create a new password. If you do not receive the email, check your spam folder.',
  },
  {
    category: 'Account',
    question: 'How do I update my profile information?',
    answer:
      'Log in to your account and go to your dashboard. Click on "Edit Profile" in the sidebar menu. From there, you can update your name, profile picture, contact number, and saved delivery address. Click save to apply your changes.',
  },
  {
    category: 'Account',
    question: 'Can I delete my account?',
    answer:
      'Yes, you can request account deletion by contacting our support team at support@foodhub.com. Please note that deleting your account will remove all your order history, saved addresses, and any pending orders will be cancelled. This action cannot be undone.',
  },

  // Providers
  {
    category: 'Providers',
    question: 'How do I become a food provider on FoodHub?',
    answer:
      'Register for an account and select "Provider" as your role. Once registered, you will have access to the provider dashboard where you can create your profile, add meals, set prices, and manage orders. Providers are responsible for maintaining food quality and timely order fulfillment.',
  },
  {
    category: 'Providers',
    question: 'Is there a fee to sell on FoodHub?',
    answer:
      'FoodHub currently offers free registration for all food providers. We believe in empowering local food businesses. Our platform provides you with tools to manage your menu, track orders, and grow your customer base at no cost.',
  },
  {
    category: 'Providers',
    question: 'How do I manage my meals and menu?',
    answer:
      'From your provider dashboard, navigate to "My Meals" where you can add new meals, edit existing ones, update prices, and manage availability. Each meal includes a name, description, price, image, category, and dietary type (veg, non-veg, vegan, etc.).',
  },
  {
    category: 'Providers',
    question: 'How do I update order status?',
    answer:
      'When you receive a new order, it will appear in your "My Orders" section. You can update the status from Pending to In Progress when you start preparing the meal, and to Completed once it is delivered. You can also cancel an order if necessary. Keeping status updated helps customers track their orders.',
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Orders: <ShoppingBag className='w-5 h-5' />,
  Payments: <CreditCard className='w-5 h-5' />,
  Delivery: <Truck className='w-5 h-5' />,
  Account: <UserCircle className='w-5 h-5' />,
  Providers: <ChefHat className='w-5 h-5' />,
};

const categoryColors: Record<string, string> = {
  Orders: 'bg-[#ff4d00]/10 text-[#ff4d00] hover:bg-[#ff4d00]/20',
  Payments: 'bg-[#008148]/10 text-[#008148] hover:bg-[#008148]/20',
  Delivery: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20',
  Account: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
  Providers: 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20',
};

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: string[] = Array.from(
    new Set(faqData.map((item) => item.category).filter((c): c is string => !!c))
  );

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='bg-black min-h-screen'>
      <Navbar />

      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-2 rounded-full mb-6'>
            <HelpCircle className='w-4 h-4' />
            <span className='text-sm font-medium'>Help Center</span>
          </div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
            How Can We Help?
          </h1>
          <p className='text-xl text-zinc-300 max-w-2xl mx-auto mb-8'>
            Find answers to frequently asked questions about ordering, payments,
            delivery, and using FoodHub.
          </p>

          {/* Search Bar */}
          <div className='max-w-xl mx-auto relative'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500' />
            <Input
              type='text'
              placeholder='Search for help...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 pl-12 pr-4 h-12'
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          {/* Category Filters */}
          <div className='flex gap-3 flex-wrap justify-center mb-8'>
            <Badge
              className={`cursor-pointer px-4 py-2 text-sm ${
                selectedCategory === null
                  ? 'bg-[#ff4d00] text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                className={`cursor-pointer px-4 py-2 text-sm flex items-center gap-2 ${
                  selectedCategory === category
                    ? categoryColors[category]
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryIcons[category]}
                {category}
              </Badge>
            ))}
          </div>

          {/* FAQ Accordion */}
          {filteredFaqs.length > 0 ? (
            <Accordion type='single' collapsible className='space-y-4'>
              {filteredFaqs.map((faq, index) => (
                <Card
                  key={index}
                  className='bg-zinc-900/50 border-zinc-800'
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className='border-none'
                  >
                    <AccordionTrigger className='px-6 py-4 text-white hover:text-[#ff4d00] hover:no-underline'>
                      <div className='flex items-center gap-3'>
                        <Badge
                          variant='outline'
                          className='border-zinc-700 text-zinc-400 text-xs'
                        >
                          {faq.category}
                        </Badge>
                        <span className='text-left'>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='px-6 pb-4 text-zinc-300 leading-relaxed'>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          ) : (
            <div className='text-center py-12'>
              <HelpCircle className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
              <p className='text-zinc-400 text-lg mb-2'>
                No results found
              </p>
              <p className='text-zinc-500'>
                Try adjusting your search or browse all categories
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/30'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Still Need Help?
          </h2>
          <p className='text-zinc-300 text-lg mb-8'>
            Can not find what you are looking for? Our support team is here to
            assist you.
          </p>
          <div className='flex gap-4 justify-center flex-wrap'>
            <a
              href='mailto:support@foodhub.com'
              className='inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff7433] text-white px-6 py-3 rounded-md font-medium transition-colors'
            >
              Email Us
            </a>
            <a
              href='/contact'
              className='inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-md font-medium transition-colors'
            >
              Contact Form
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HelpPage;
