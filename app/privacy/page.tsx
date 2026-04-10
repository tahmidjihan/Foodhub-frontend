import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Separator } from '@/components/ui/separator';

function PrivacyPage() {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Privacy Policy
        </h1>
        <p className='text-zinc-400 mb-8'>
          Last updated: April 10, 2026
        </p>

        <div className='space-y-8 text-zinc-300 leading-relaxed'>
          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              1. Introduction
            </h2>
            <p>
              FoodHub ("we", "our", or "us") respects your privacy and is
              committed to protecting your personal data. This Privacy Policy
              explains how we collect, use, store, and share your information
              when you use our platform, and tells you about your privacy rights
              and how the law protects you.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              2. Information We Collect
            </h2>
            <h3 className='text-xl font-semibold text-white mb-2'>
              2.1 Information You Provide
            </h3>
            <p className='mb-4'>
              We collect information that you voluntarily provide when using our
              platform, including:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>Account information (name, email address, phone number)</li>
              <li>Delivery addresses and order preferences</li>
              <li>Payment information when processing orders</li>
              <li>Reviews, ratings, and feedback about meals and providers</li>
              <li>Profile information and photographs</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className='text-xl font-semibold text-white mb-2 mt-6'>
              2.2 Information Automatically Collected
            </h3>
            <p className='mb-4'>
              When you access our platform, we may automatically collect:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and features used</li>
              <li>Time and date of your visits</li>
              <li>Referring URLs and clickstream data</li>
            </ul>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              3. How We Use Your Information
            </h2>
            <p className='mb-4'>We use your information to:</p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>Process and fulfill your orders</li>
              <li>Create and manage your account</li>
              <li>Connect you with food providers in your area</li>
              <li>Send order confirmations and status updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our platform and user experience</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              4. Sharing Your Information
            </h2>
            <p className='mb-4'>
              We may share your information with:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>
                <strong>Food Providers:</strong> Your name, contact information,
                and delivery address are shared with the provider fulfilling
                your order so they can prepare and deliver your meal.
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party companies that
                help us operate our platform (hosting, analytics, payment
                processing, email delivery).
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law,
                regulation, or legal process, or to protect the rights and safety
                of FoodHub, our users, or others.
              </li>
            </ul>
            <p className='mt-4'>
              We do not sell your personal information to third parties.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              5. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. These include secure
              servers, encrypted communications, and access controls. However,
              no method of transmission over the Internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              6. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as your account is
              active or as needed to provide you services. We may also retain
              certain information to comply with legal obligations, resolve
              disputes, and enforce our agreements. You can request deletion of
              your account and associated data by contacting our support team.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              7. Your Rights
            </h2>
            <p className='mb-4'>
              Depending on your location, you may have the right to:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Request portability of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className='mt-4'>
              To exercise these rights, please contact us at
              privacy@foodhub.com.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              8. Children Privacy
            </h2>
            <p>
              FoodHub is not intended for children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If we become aware that we have inadvertently collected such
              information, we will take steps to delete it promptly.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by posting the updated policy on
              this page with a new "Last updated" date. We encourage you to
              review this policy periodically.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <div className='mt-4 bg-zinc-900/50 rounded-lg p-6 border border-zinc-800'>
              <p className='text-white font-medium'>FoodHub Privacy Team</p>
              <p>Email: privacy@foodhub.com</p>
              <p>Address: 123 Food Street, Kitchen City, FC 12345</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPage;
