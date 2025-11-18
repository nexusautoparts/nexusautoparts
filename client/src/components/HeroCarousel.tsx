import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBanner1 from '@assets/generated_images/Hero_banner_brake_parts_31ee722a.png';
import heroBanner2 from '@assets/generated_images/Hero_banner_filters_sale_31972f9d.png';
import heroBanner3 from '@assets/generated_images/Hero_banner_suspension_parts_993ab951.png';

const slides = [
  {
    image: heroBanner1,
    title: 'New Arrivals',
    subtitle: 'Premium Brake Systems',
    discount: '30% OFF',
    cta: 'Shop Now',
  },
  {
    image: heroBanner2,
    title: 'Summer Sale',
    subtitle: 'Filters & Maintenance',
    discount: 'Up to 40% OFF',
    cta: 'Explore Parts',
  },
  {
    image: heroBanner3,
    title: 'Trending Parts',
    subtitle: 'Performance Suspension',
    discount: 'Limited Time',
    cta: 'View Latest',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-card">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 mb-2">
                    {slide.subtitle}
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-ring mb-6">
                    {slide.discount}
                  </p>
                  <Button
                    size="lg"
                    className="bg-ring hover:bg-ring/90 text-white border-0"
                    data-testid={`button-cta-${index}`}
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
        onClick={prevSlide}
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
        onClick={nextSlide}
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-ring w-8' : 'bg-white/50'
            }`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
