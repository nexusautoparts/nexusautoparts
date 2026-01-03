import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSearchTool from './HeroSearchTool';
import heroBanner1 from '@assets/generated_images/Hero_banner_brake_parts_31ee722a.png';
import heroBanner2 from '@assets/generated_images/Hero_banner_filters_sale_31972f9d.png';
import heroBanner3 from '@assets/generated_images/Hero_banner_suspension_parts_993ab951.png';

const slides = [
  {
    image: heroBanner1,
    title: 'Find the Best Auto Parts',
    subtitle: 'Your Source for Multi-Brand OEM Auto Parts and Accessories',
    discount: 'Save up to 70%',
    cta: 'Call for 10% Off',
  },
  {
    image: heroBanner2,
    title: 'Summer Sale',
    subtitle: 'Over 20 Million Auto Parts',
    discount: 'Up to 70% OFF',
    cta: 'Explore Parts',
  },
  {
    image: heroBanner3,
    title: 'OEM Quality Parts',
    subtitle: 'Rigorously Tested & Reliable',
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

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full min-h-[700px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden bg-card">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      ))}

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-start md:items-center pt-4 md:pt-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 px-2 md:px-12">
            {/* Text Content - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block lg:w-1/2 text-left space-y-5">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                  {currentSlideData.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-white/90 font-light drop-shadow-sm">
                  {currentSlideData.subtitle}
                </p>
              </div>
              <div className="inline-block bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 border-l-4 border-primary">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {currentSlideData.discount}
                </p>
              </div>
              <div>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white border-0 text-base px-6 py-5 rounded-full shadow-lg"
                  data-testid={`button-cta-${currentSlide}`}
                >
                  {currentSlideData.cta}
                </Button>
              </div>
            </div>

            {/* Search Tool - Full width on mobile */}
            <div className="w-full md:w-auto lg:w-1/2 flex justify-center lg:justify-end">
              <HeroSearchTool />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="!absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-20 hidden md:flex"
        onClick={prevSlide}
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="!absolute right-4 left-auto top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white z-20 hidden md:flex"
        onClick={nextSlide}
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-ring w-6' : 'bg-white/50'}`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
