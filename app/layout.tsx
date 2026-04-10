import type { Metadata } from 'next';
import { Outfit, Ubuntu } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'FoodHub - Discover Delicious Meals Near You',
    template: '%s | FoodHub',
  },
  description:
    'Order fresh, delicious meals from local food providers. Fast delivery, quality guaranteed. Browse meals, place orders, and enjoy restaurant-quality food at home.',
  keywords: ['food delivery', 'meals', 'restaurant', 'local food', 'order online'],
  authors: [{ name: 'FoodHub Inc.' }],
  openGraph: {
    title: 'FoodHub - Discover Delicious Meals Near You',
    description: 'Order fresh, delicious meals from local food providers. Fast delivery, quality guaranteed.',
    type: 'website',
    locale: 'en_US',
    siteName: 'FoodHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodHub - Discover Delicious Meals Near You',
    description: 'Order fresh, delicious meals from local food providers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${outfit.variable} ${ubuntu.variable} font-sans antialiased`}
      >
        <Toaster />
        <main className='dark'>{children}</main>
      </body>
    </html>
  );
}
