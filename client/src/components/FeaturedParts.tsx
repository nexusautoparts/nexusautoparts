import { useRef } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import brakePadsImage from '@assets/generated_images/Product_brake_pads_1a5841b4.png';
import airFilterImage from '@assets/generated_images/Product_air_filter_d5919cb7.png';
import sparkPlugsImage from '@assets/generated_images/Product_spark_plugs_2fbf73c7.png';
import headlightImage from '@assets/generated_images/Product_headlight_assembly_cc2316af.png';
import batteryImage from '@assets/generated_images/Product_car_battery_41bc1071.png';
import oilFilterImage from '@assets/generated_images/Product_oil_filter_4b453d0f.png';

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Brake Pads Set',
    price: 89.99,
    image: brakePadsImage,
    inStock: true,
    discount: 15,
  },
  {
    id: '2',
    name: 'High Performance Air Filter',
    price: 45.99,
    image: airFilterImage,
    inStock: true,
  },
  {
    id: '3',
    name: 'Iridium Spark Plugs (4-Pack)',
    price: 34.99,
    image: sparkPlugsImage,
    inStock: true,
    discount: 20,
  },
  {
    id: '4',
    name: 'LED Headlight Assembly',
    price: 189.99,
    image: headlightImage,
    inStock: false,
  },
  {
    id: '5',
    name: 'Premium Car Battery 12V',
    price: 129.99,
    image: batteryImage,
    inStock: true,
  },
  {
    id: '6',
    name: 'Synthetic Oil Filter',
    price: 24.99,
    image: oilFilterImage,
    inStock: true,
    discount: 10,
  },
];

export default function FeaturedParts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Auto Parts</h2>
            <p className="text-muted-foreground">Top quality parts at unbeatable prices</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              data-testid="button-scroll-left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              data-testid="button-scroll-right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex-none w-[280px] snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
