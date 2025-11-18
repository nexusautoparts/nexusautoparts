import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedParts from '@/components/FeaturedParts';
import PartsCategories from '@/components/PartsCategories';
import CarManufacturers from '@/components/CarManufacturers';
import QualityStandards from '@/components/QualityStandards';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroCarousel />
        <FeaturedParts />
        <PartsCategories />
        <CarManufacturers />
        <QualityStandards />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
