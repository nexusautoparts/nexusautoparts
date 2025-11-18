import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedParts from '@/components/FeaturedParts';
import BrandShowcase from '@/components/BrandShowcase';
import CarManufacturers from '@/components/CarManufacturers';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroCarousel />
        <FeaturedParts />
        <BrandShowcase />
        <CarManufacturers />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
