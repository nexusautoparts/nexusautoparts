import { Card, CardContent } from '@/components/ui/card';
import { 
  Settings, 
  CircuitBoard, 
  Wrench, 
  Gauge, 
  Battery, 
  Zap,
  Wind,
  Droplets,
  Shield,
  Lightbulb,
  Cog,
  Radio
} from 'lucide-react';

const categories = [
  { name: 'Engine Parts', icon: Settings, description: 'Pistons, gaskets, belts' },
  { name: 'Brakes & Suspension', icon: Gauge, description: 'Pads, rotors, shocks' },
  { name: 'Electrical', icon: Zap, description: 'Alternators, starters, sensors' },
  { name: 'Body Parts', icon: Shield, description: 'Bumpers, fenders, mirrors' },
  { name: 'Filters', icon: Wind, description: 'Air, oil, cabin filters' },
  { name: 'Batteries', icon: Battery, description: 'Car batteries, accessories' },
  { name: 'Lighting', icon: Lightbulb, description: 'Headlights, tail lights, bulbs' },
  { name: 'Cooling System', icon: Droplets, description: 'Radiators, coolant, hoses' },
  { name: 'Transmission', icon: Cog, description: 'Gears, clutches, fluids' },
  { name: 'Exhaust', icon: Radio, description: 'Mufflers, catalytic converters' },
  { name: 'Ignition', icon: CircuitBoard, description: 'Spark plugs, coils, wires' },
  { name: 'Tools & Accessories', icon: Wrench, description: 'Maintenance tools, fluids' },
];

export default function PartsCategories() {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Types of Parts Available</h2>
          <p className="text-muted-foreground">Comprehensive selection for all your vehicle needs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className="hover-elevate cursor-pointer transition-all hover:shadow-lg"
              data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
