import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeatureGrid from "./components/FeatureGrid";
import KitchenSignup from "./components/KitchenSignup";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <FeatureGrid />
      <KitchenSignup />
      <Footer />
    </main>
  );
}
