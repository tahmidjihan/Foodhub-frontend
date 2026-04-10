import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Separator } from '@/components/ui/separator';

function TermsPage() {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Terms of Service
        </h1>
        <p className='text-zinc-400 mb-8'>
          Last updated: April 10, 2026
        </p>

        <div className='space-y-8 text-zinc-300 leading-relaxed'>
          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the FoodHub platform ("Platform", "Service",
              "we", "us", or "our"), you agree to be bound by these Terms of
              Service ("Terms"). If you do not agree to all of these Terms, do
              not use our Platform. These Terms apply to all users, including
              customers, food providers, and visitors.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              2. Description of Service
            </h2>
            <p>
              FoodHub is an online marketplace that connects food enthusiasts
              with local food providers. Our platform enables:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>
                Customers to browse, discover, and order meals from local
                providers
              </li>
              <li>
                Food providers to showcase their offerings, manage orders, and
                grow their business
              </li>
              <li>
                Secure communication between customers and providers
              </li>
              <li>Order tracking and status updates</li>
            </ul>
            <p className='mt-4'>
              FoodHub acts as an intermediary platform. We do not prepare, cook,
              or deliver food ourselves. Food preparation and delivery are the
              responsibility of the individual food providers.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              3. User Accounts
            </h2>
            <h3 className='text-xl font-semibold text-white mb-2'>
              3.1 Account Creation
            </h3>
            <p className='mb-4'>
              To use certain features of the Platform, you must create an
              account. You agree to:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information as necessary</li>
              <li>Keep your login credentials confidential</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h3 className='text-xl font-semibold text-white mb-2'>
              3.2 Account Types
            </h3>
            <p className='mb-4'>
              FoodHub offers different account types:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>
                <strong>Customer:</strong> For individuals who want to browse
                and order meals
              </li>
              <li>
                <strong>Provider:</strong> For food businesses and home cooks
                who want to sell meals
              </li>
              <li>
                <strong>Admin:</strong> For FoodHub administrators managing the
                platform
              </li>
            </ul>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              4. User Responsibilities
            </h2>
            <h3 className='text-xl font-semibold text-white mb-2'>
              4.1 Customer Responsibilities
            </h3>
            <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
              <li>Provide accurate delivery address and contact information</li>
              <li>Be available to receive orders at the specified time and
                location</li>
              <li>Pay for orders as agreed at the time of placement</li>
              <li>Treat food providers with respect in all communications and
                reviews</li>
              <li>Cancel orders promptly if plans change, before preparation
                begins</li>
            </ul>

            <h3 className='text-xl font-semibold text-white mb-2'>
              4.2 Provider Responsibilities
            </h3>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>Maintain accurate meal listings with truthful descriptions
                and images</li>
              <li>Prepare meals in hygienic conditions and comply with local
                food safety regulations</li>
              <li>Update order status in a timely manner</li>
              <li>Communicate professionally with customers</li>
              <li>Honor all orders placed through the platform</li>
              <li>Set realistic preparation and delivery timeframes</li>
            </ul>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              5. Orders and Payments
            </h2>
            <h3 className='text-xl font-semibold text-white mb-2'>
              5.1 Placing Orders
            </h3>
            <p className='mb-4'>
              When you place an order through the Platform, you are making an
              offer to purchase from the food provider. The provider may accept
              or decline your order. An order is confirmed when the provider
              accepts it and begins preparation.
            </p>

            <h3 className='text-xl font-semibold text-white mb-2'>
              5.2 Payment Terms
            </h3>
            <p className='mb-4'>
              Payment is collected upon delivery as specified by the provider.
              Prices displayed on the Platform are set by individual providers
              and are final. FoodHub does not currently process payments
              directly but may introduce this feature in the future.
            </p>

            <h3 className='text-xl font-semibold text-white mb-2'>
              5.3 Cancellation and Refunds
            </h3>
            <p>
              Customers may cancel orders before the provider begins preparation
              (while status is "Pending"). Once preparation has begun,
              cancellation is at the provider discretion. Refund requests should
              be directed to the provider first, then to FoodHub support if
              unresolved.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              6. Prohibited Conduct
            </h2>
            <p className='mb-4'>
              You agree not to:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4'>
              <li>Use the Platform for any unlawful purpose</li>
              <li>Create fake or misleading reviews or ratings</li>
              <li>Impersonate another person or entity</li>
              <li>Interfere with or disrupt the Platform or servers</li>
              <li>Attempt to gain unauthorized access to any part of the
                Platform</li>
              <li>Scrape, copy, or reproduce any content without permission</li>
              <li>Use automated systems to place orders or interact with the
                Platform</li>
              <li>List meals that violate food safety regulations or contain
                mislabeled ingredients</li>
            </ul>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              7. Intellectual Property
            </h2>
            <p>
              The Platform and its original content, features, and functionality
              are owned by FoodHub and are protected by intellectual property
              laws. Food providers retain ownership of their meal images and
              descriptions but grant FoodHub a license to display and promote
              them on the Platform. Users may not reproduce, distribute, or
              create derivative works from Platform content without express
              permission.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              8. Disclaimers and Limitation of Liability
            </h2>
            <h3 className='text-xl font-semibold text-white mb-2'>
              8.1 Disclaimers
            </h3>
            <p className='mb-4'>
              FoodHub provides the Platform "as is" and "as available" without
              warranties of any kind, either express or implied. We do not
              warrant that:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
              <li>The Platform will be uninterrupted, secure, or error-free</li>
              <li>Food quality, safety, or accuracy of provider listings</li>
              <li>Timely delivery or accuracy of order fulfillment</li>
            </ul>

            <h3 className='text-xl font-semibold text-white mb-2'>
              8.2 Limitation of Liability
            </h3>
            <p>
              To the maximum extent permitted by law, FoodHub shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of the Platform or any
              services obtained through it, including but not limited to food
              quality issues, delivery delays, or disputes between users.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              9. Termination
            </h2>
            <p>
              FoodHub reserves the right to suspend or terminate your account
              and access to the Platform at our sole discretion, without notice,
              for conduct that we believe violates these Terms, is harmful to
              other users, or for any other reason. Upon termination, your right
              to use the Platform will cease immediately.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              10. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which FoodHub operates, without
              regard to conflict of law principles. Any disputes arising from
              these Terms shall be subject to the exclusive jurisdiction of the
              courts in that jurisdiction.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              11. Contact Information
            </h2>
            <p>
              For questions about these Terms, please contact us at:
            </p>
            <div className='mt-4 bg-zinc-900/50 rounded-lg p-6 border border-zinc-800'>
              <p className='text-white font-medium'>FoodHub Legal Team</p>
              <p>Email: legal@foodhub.com</p>
              <p>Address: 123 Food Street, Kitchen City, FC 12345</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TermsPage;
