import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import KitchenSignup from './components/KitchenSignup';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className='dark min-h-screen bg-background text-foreground'>
      <Navbar />
      <Hero />
      <FeatureGrid />
      <KitchenSignup />
      <Footer />
    </main>
  );
}
