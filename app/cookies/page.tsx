import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, Shield, Info } from 'lucide-react';

function CookiesPage() {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Cookie Policy
        </h1>
        <p className='text-zinc-400 mb-8'>
          Last updated: April 10, 2026
        </p>

        <div className='space-y-8 text-zinc-300 leading-relaxed'>
          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are stored on your device when
              you visit our website. They help us provide you with a better
              experience by remembering your preferences, keeping you logged in,
              and understanding how you use our platform. Cookies are widely
              used by website operators to make their sites work efficiently and
              to provide reporting information.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              2. How We Use Cookies
            </h2>
            <p className='mb-4'>
              FoodHub uses cookies for the following purposes:
            </p>

            <div className='space-y-4 mt-4'>
              <Card className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='pt-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 bg-[#ff4d00]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <Shield className='w-5 h-5 text-[#ff4d00]' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        Essential Cookies
                      </h3>
                      <p>
                        These cookies are necessary for the platform to function
                        and cannot be disabled. They include session cookies
                        that keep you logged in, security cookies that protect
                        your account, and cookies that remember your privacy
                        preferences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='pt-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 bg-[#008148]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <Settings className='w-5 h-5 text-[#008148]' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        Functional Cookies
                      </h3>
                      <p>
                        These cookies enable enhanced functionality and
                        personalization, such as remembering your language
                        preference, location settings, and customized interface
                        choices. They may be set by us or by third-party
                        providers whose services we have added to our pages.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='pt-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <Info className='w-5 h-5 text-blue-400' />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        Analytics Cookies
                      </h3>
                      <p>
                        These cookies help us understand how visitors interact
                        with our platform by collecting anonymous information
                        about page visits, time spent on pages, and navigation
                        patterns. This data helps us improve the user experience
                        and optimize our platform performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              3. Specific Cookies We Use
            </h2>

            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b border-zinc-800'>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Cookie Name
                    </th>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Type
                    </th>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Purpose
                    </th>
                    <th className='text-left py-3 px-4 text-white font-semibold'>
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className='text-zinc-300'>
                  <tr className='border-b border-zinc-800'>
                    <td className='py-3 px-4 font-mono text-sm'>
                      better-auth.session_token
                    </td>
                    <td className='py-3 px-4'>Essential</td>
                    <td className='py-3 px-4'>
                      Maintains your authenticated session
                    </td>
                    <td className='py-3 px-4'>5 minutes - 30 days</td>
                  </tr>
                  <tr className='border-b border-zinc-800'>
                    <td className='py-3 px-4 font-mono text-sm'>
                      theme-preference
                    </td>
                    <td className='py-3 px-4'>Functional</td>
                    <td className='py-3 px-4'>
                      Remembers your dark/light mode choice
                    </td>
                    <td className='py-3 px-4'>1 year</td>
                  </tr>
                  <tr className='border-b border-zinc-800'>
                    <td className='py-3 px-4 font-mono text-sm'>
                      cart-items
                    </td>
                    <td className='py-3 px-4'>Functional</td>
                    <td className='py-3 px-4'>
                      Stores your shopping cart temporarily
                    </td>
                    <td className='py-3 px-4'>Session</td>
                  </tr>
                  <tr className='border-b border-zinc-800'>
                    <td className='py-3 px-4 font-mono text-sm'>
                      analytics-id
                    </td>
                    <td className='py-3 px-4'>Analytics</td>
                    <td className='py-3 px-4'>
                      Anonymous usage statistics
                    </td>
                    <td className='py-3 px-4'>2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              4. Third-Party Cookies
            </h2>
            <p>
              Some cookies are placed by third-party services that appear on our
              Platform. These include analytics providers, social media plugins,
              and embedded content providers. We do not control these cookies and
              recommend reviewing the respective privacy policies of these third
              parties. Examples include Google Analytics and social media
              sharing buttons.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              5. Managing Cookies
            </h2>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Browser Settings
            </h3>
            <p className='mb-4'>
              Most web browsers allow you to control cookies through their
              settings. You can typically:
            </p>
            <ul className='list-disc list-inside space-y-2 ml-4 mb-4'>
              <li>See what cookies have been set and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close the browser</li>
            </ul>

            <p className='mb-4'>
              Please note that blocking or deleting cookies may affect the
              functionality of our Platform. Essential cookies cannot be disabled
              as they are required for core features like authentication and
              security.
            </p>

            <h3 className='text-xl font-semibold text-white mb-2'>
              Opt-Out Links
            </h3>
            <p>
              To learn more about managing cookies, visit:{' '}
              <a
                href='https://www.allaboutcookies.org'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#ff4d00] hover:underline'
              >
                www.allaboutcookies.org
              </a>
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              6. Updates to This Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. We will update the "Last updated" date at the top of this
              policy whenever we make material changes. We encourage you to
              review this policy periodically.
            </p>
          </section>

          <Separator className='bg-zinc-800' />

          <section>
            <h2 className='text-2xl font-bold text-white mb-4'>
              7. Contact Us
            </h2>
            <p>
              If you have questions about our use of cookies, please contact us
              at:
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

export default CookiesPage;
