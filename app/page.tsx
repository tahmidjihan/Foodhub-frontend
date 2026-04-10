import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import KitchenSignup from './components/KitchenSignup';
import Footer from './components/Footer';
import CategoriesSection from './components/landing/CategoriesSection';
import HowItWorksSection from './components/landing/HowItWorksSection';
import StatisticsSection from './components/landing/StatisticsSection';
import TestimonialsSection from './components/landing/TestimonialsSection';
import FAQSection from './components/landing/FAQSection';
import TopProvidersSection from './components/landing/TopProvidersSection';
import OffersSection from './components/landing/OffersSection';

export default function Home() {
  return (
    <main className='dark min-h-screen bg-background text-foreground'>
      <Navbar />
      <Hero />
      <CategoriesSection />
      <FeatureGrid />
      <HowItWorksSection />
      <StatisticsSection />
      <TestimonialsSection />
      <TopProvidersSection />
      <OffersSection />
      <FAQSection />
      <KitchenSignup />
      <Footer />
    </main>
  );
}
