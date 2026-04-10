'use client';
import React, { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/types';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission (replace with actual API call when backend is ready)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Message sent successfully! We will get back to you soon.');
    setSubmitted(true);
    setSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className='bg-black min-h-screen'>
      <Navbar />

      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-[#ff4d00]/10 text-[#ff4d00] px-4 py-2 rounded-full mb-6'>
            <Mail className='w-4 h-4' />
            <span className='text-sm font-medium'>Get in Touch</span>
          </div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
            Contact Us
          </h1>
          <p className='text-xl text-zinc-300 max-w-2xl mx-auto'>
            Have a question, feedback, or need support? We are here to help.
            Reach out to us and we will respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <Card className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='pt-6'>
                  {submitted ? (
                    <div className='text-center py-12'>
                      <CheckCircle className='w-16 h-16 text-[#008148] mx-auto mb-4' />
                      <h3 className='text-2xl font-bold text-white mb-2'>
                        Message Sent!
                      </h3>
                      <p className='text-zinc-400'>
                        Thank you for contacting us. We will get back to you
                        within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                          <Label htmlFor='name' className='text-zinc-300'>
                            Full Name
                          </Label>
                          <Input
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='John Doe'
                            required
                            className='bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='email' className='text-zinc-300'>
                            Email Address
                          </Label>
                          <Input
                            id='email'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='john@example.com'
                            required
                            className='bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                          />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='subject' className='text-zinc-300'>
                          Subject
                        </Label>
                        <Input
                          id='subject'
                          name='subject'
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder='How can we help you?'
                          required
                          className='bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message' className='text-zinc-300'>
                          Message
                        </Label>
                        <textarea
                          id='message'
                          name='message'
                          value={formData.message}
                          onChange={handleChange}
                          placeholder='Tell us more about your inquiry...'
                          required
                          rows={6}
                          className='w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent resize-none'
                        />
                      </div>

                      <Button
                        type='submit'
                        disabled={submitting}
                        size='lg'
                        className='w-full bg-[#ff4d00] hover:bg-[#ff7433] text-white'
                      >
                        <Send className='w-4 h-4 mr-2' />
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className='space-y-6'>
              <Card className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='pt-6 space-y-6'>
                  <h3 className='text-xl font-bold text-white'>
                    Contact Information
                  </h3>

                  <div className='space-y-4'>
                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-[#ff4d00]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <Mail className='w-5 h-5 text-[#ff4d00]' />
                      </div>
                      <div>
                        <p className='text-sm text-zinc-400 mb-1'>Email</p>
                        <a
                          href='mailto:support@foodhub.com'
                          className='text-white hover:text-[#ff4d00] transition-colors'
                        >
                          support@foodhub.com
                        </a>
                      </div>
                    </div>

                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-[#008148]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <Phone className='w-5 h-5 text-[#008148]' />
                      </div>
                      <div>
                        <p className='text-sm text-zinc-400 mb-1'>Phone</p>
                        <a
                          href='tel:+1234567890'
                          className='text-white hover:text-[#ff4d00] transition-colors'
                        >
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>

                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-[#ff4d00]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <MapPin className='w-5 h-5 text-[#ff4d00]' />
                      </div>
                      <div>
                        <p className='text-sm text-zinc-400 mb-1'>Address</p>
                        <p className='text-white'>
                          123 Food Street
                          <br />
                          Kitchen City, FC 12345
                          <br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-3'>
                      <div className='w-10 h-10 bg-[#008148]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <Clock className='w-5 h-5 text-[#008148]' />
                      </div>
                      <div>
                        <p className='text-sm text-zinc-400 mb-1'>
                          Business Hours
                        </p>
                        <p className='text-white'>
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className='bg-zinc-900/50 border-zinc-800'>
                <CardContent className='pt-6'>
                  <h3 className='text-lg font-bold text-white mb-4'>
                    Follow Us
                  </h3>
                  <div className='flex gap-3'>
                    <a
                      href='https://facebook.com/foodhub'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 bg-zinc-800 hover:bg-[#ff4d00] rounded-lg flex items-center justify-center transition-colors'
                    >
                      <Facebook className='w-5 h-5 text-white' />
                    </a>
                    <a
                      href='https://twitter.com/foodhub'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 bg-zinc-800 hover:bg-[#ff4d00] rounded-lg flex items-center justify-center transition-colors'
                    >
                      <Twitter className='w-5 h-5 text-white' />
                    </a>
                    <a
                      href='https://instagram.com/foodhub'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 bg-zinc-800 hover:bg-[#ff4d00] rounded-lg flex items-center justify-center transition-colors'
                    >
                      <Instagram className='w-5 h-5 text-white' />
                    </a>
                    <a
                      href='https://linkedin.com/company/foodhub'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 bg-zinc-800 hover:bg-[#ff4d00] rounded-lg flex items-center justify-center transition-colors'
                    >
                      <Linkedin className='w-5 h-5 text-white' />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <Card className='bg-zinc-900/50 border-zinc-800 overflow-hidden'>
            <CardContent className='p-0'>
              <div className='aspect-video bg-zinc-800 flex items-center justify-center'>
                <div className='text-center'>
                  <MapPin className='w-16 h-16 text-zinc-600 mx-auto mb-4' />
                  <p className='text-zinc-400 text-lg mb-2'>
                    Visit Us in Person
                  </p>
                  <p className='text-zinc-500'>
                    123 Food Street, Kitchen City, FC 12345
                  </p>
                  <a
                    href='https://maps.google.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block mt-4 text-[#ff4d00] hover:underline'
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
