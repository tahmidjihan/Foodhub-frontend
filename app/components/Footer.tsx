'use client';

import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/foodhub',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/foodhub',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/foodhub',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/foodhub',
      icon: Linkedin,
    },
  ];

  return (
    <footer className='bg-[#0f0703] text-white pt-20 pb-10'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16'>
          {/* Brand Column */}
          <div className='lg:col-span-2'>
            <span className='text-3xl font-black tracking-tighter text-[#ff4d00]'>
              FOOD<span className='text-white'>HUB</span>
            </span>
            <p className='mt-4 text-zinc-400 max-w-sm leading-relaxed'>
              We connect local food lovers with premium kitchens and providers.
              Quality food, delivered fast, every single time.
            </p>

            {/* Social Links */}
            <div className='flex gap-3 mt-6'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-[#ff4d00] hover:border-[#ff4d00] transition-all cursor-pointer group'
                  aria-label={social.name}
                >
                  <social.icon className='w-4 h-4 text-zinc-400 group-hover:text-white transition-colors' />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className='mt-8 space-y-3'>
              <a
                href='mailto:hello@foodhub.com'
                className='flex items-center gap-3 text-zinc-400 hover:text-[#ff4d00] transition-colors'
              >
                <Mail className='w-4 h-4' />
                <span className='text-sm'>hello@foodhub.com</span>
              </a>
              <a
                href='tel:+1234567890'
                className='flex items-center gap-3 text-zinc-400 hover:text-[#ff4d00] transition-colors'
              >
                <Phone className='w-4 h-4' />
                <span className='text-sm'>+1 (234) 567-890</span>
              </a>
              <div className='flex items-center gap-3 text-zinc-400'>
                <MapPin className='w-4 h-4 shrink-0' />
                <span className='text-sm'>
                  123 Food Street, Cuisine City, FC 12345
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-bold mb-6'>Quick Links</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/meals'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  Find Food
                </Link>
              </li>
              <li>
                <Link
                  href='/providers'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  Our Providers
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-lg font-bold mb-6'>Support</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/help'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  FAQ / Help
                </Link>
              </li>
              <li>
                <a
                  href='/contact'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  Customer Support
                </a>
              </li>
              <li>
                <Link
                  href='/help#delivery'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link
                  href='/help#payments'
                  className='text-zinc-400 hover:text-[#ff4d00] transition-colors text-sm'
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='text-lg font-bold mb-6'>Stay Updated</h4>
            <p className='text-zinc-400 mb-4 text-sm'>
              Get exclusive deals and new restaurant alerts in your inbox.
            </p>
            <div className='flex bg-zinc-800/80 rounded-full p-1.5 border border-zinc-700'>
              <input
                type='email'
                placeholder='Your email'
                className='bg-transparent px-4 py-2 flex-grow outline-none text-sm text-white placeholder:text-zinc-500'
              />
              <button className='bg-[#ff4d00] hover:bg-[#ff7433] text-white p-2.5 rounded-full transition-colors'>
                <Send className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500'>
          <p>&copy; {currentYear} FoodHub Inc. All rights reserved.</p>
          <div className='flex flex-wrap gap-6'>
            <Link
              href='/privacy'
              className='hover:text-white transition-colors'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='hover:text-white transition-colors'
            >
              Terms of Service
            </Link>
            <Link
              href='/cookies'
              className='hover:text-white transition-colors'
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
