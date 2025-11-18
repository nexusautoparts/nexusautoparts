import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import brakePadsImage from '@assets/generated_images/Product_brake_pads_1a5841b4.png';
import airFilterImage from '@assets/generated_images/Product_air_filter_d5919cb7.png';
import sparkPlugsImage from '@assets/generated_images/Product_spark_plugs_2fbf73c7.png';
import headlightImage from '@assets/generated_images/Product_headlight_assembly_cc2316af.png';
import batteryImage from '@assets/generated_images/Product_car_battery_41bc1071.png';
import oilFilterImage from '@assets/generated_images/Product_oil_filter_4b453d0f.png';

const allProducts = [
  { id: '1', name: 'Premium Brake Pads Set', price: 89.99, image: brakePadsImage, inStock: true, discount: 15 },
  { id: '2', name: 'High Performance Air Filter', price: 45.99, image: airFilterImage, inStock: true },
  { id: '3', name: 'Iridium Spark Plugs (4-Pack)', price: 34.99, image: sparkPlugsImage, inStock: true, discount: 20 },
  { id: '4', name: 'LED Headlight Assembly', price: 189.99, image: headlightImage, inStock: false },
  { id: '5', name: 'Premium Car Battery 12V', price: 129.99, image: batteryImage, inStock: true },
  { id: '6', name: 'Synthetic Oil Filter', price: 24.99, image: oilFilterImage, inStock: true, discount: 10 },
  { id: '7', name: 'Performance Brake Rotors', price: 149.99, image: brakePadsImage, inStock: true },
  { id: '8', name: 'Cabin Air Filter', price: 19.99, image: airFilterImage, inStock: true, discount: 25 },
];

function Filters() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="mb-2"
          data-testid="slider-price"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span data-testid="text-min-price">${priceRange[0]}</span>
          <span data-testid="text-max-price">${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Brand</h3>
        <div className="space-y-3">
          {['Bosch', 'ACDelco', 'NGK', 'Denso'].map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox id={brand} data-testid={`checkbox-brand-${brand.toLowerCase()}`} />
              <Label htmlFor={brand} className="cursor-pointer">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Availability</h3>
        <div className="flex items-center gap-2">
          <Checkbox id="in-stock" data-testid="checkbox-in-stock" />
          <Label htmlFor="in-stock" className="cursor-pointer">In Stock Only</Label>
        </div>
      </div>
    </div>
  );
}

export default function ProductListing() {
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Auto Parts</h1>
            <p className="text-muted-foreground">{allProducts.length} products found</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="best-rated">Best Rated</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden" data-testid="button-filters">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Filters />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Filters />
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}
