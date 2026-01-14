import { useState } from "react";
import { Search, Menu, X, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";

const categories = [
  "Engine",
  "Transmission",
  "Steering Column",
  "Instrument Cluster",
  "ABS Module",
  "Transfer Case",
  "Turbo Charger",
  "Differential",
  "Axle Shaft",
  "Alternator",
];

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <nav
      className={`sticky top-0 z-50 bg-background border-b transition-all duration-300 ${isScrolled ? "shadow-md" : ""
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 lg:h-auto lg:py-0 gap-4">
          <Link href="/" data-testid="link-home" className="flex items-center gap-2">
            <img src="/logo.png" alt="Nexus Auto Parts" className="h-[126px] lg:h-[158px] lg:-my-4 w-auto object-contain" />
          </Link>

          <div className="hidden lg:grid grid-cols-5 gap-x-2 gap-y-1 items-center">
            {categories.map((category) => (
              <a
                key={category}
                href={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Button
                  variant="ghost"
                  className="text-xs xl:text-sm font-medium h-8 w-full justify-center px-2"
                  data-testid={`link-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Button>
              </a>
            ))}
          </div>

          {/* Search bar hidden as per user request */}
          <div className="hidden items-center gap-2 flex-1 lg:flex-initial lg:w-96 ml-auto">
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
            <a href="/payment">
              <Button
                variant="default"
                size="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 text-base px-6 font-bold"
                data-testid="button-pay-now"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  data-testid="button-menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-6">
                <div className="flex flex-col gap-4 mt-8">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        data-testid={`link-mobile-category-${category.toLowerCase().replace(" ", "-")}`}
                      >
                        {category}
                      </Button>
                    </a>
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
