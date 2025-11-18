import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, useLocation } from 'wouter';

const categories = [
  'Engine Parts',
  'Brakes',
  'Suspension',
  'Electrical',
  'Body Parts',
  'Accessories',
];

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <nav
      className={`sticky top-0 z-50 bg-background border-b transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">CarPartsHub</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {categories.map((category) => (
              <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  data-testid={`link-category-${category.toLowerCase().replace(' ', '-')}`}
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-1 lg:flex-initial lg:w-96">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search parts..."
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-account">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-ring text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-6">
                <div className="flex flex-col gap-4 mt-8">
                  {categories.map((category) => (
                    <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        data-testid={`link-mobile-category-${category.toLowerCase().replace(' ', '-')}`}
                      >
                        {category}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
