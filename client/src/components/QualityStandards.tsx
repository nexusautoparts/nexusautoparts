import { Card, CardContent } from '@/components/ui/card';
import {
  Headphones,
  Clock,
  Award,
} from 'lucide-react';

const standards = [
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Our dedicated team is available around the clock to assist you.',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'Mon-Fri: 9AM-6PM EST | Sat: 10AM-4PM EST | Sun: Closed',
  },
  {
    icon: Award,
    title: 'Unbeatable Price',
    description: 'High-quality parts at competitive prices.',
  },
];

const pricing = [
  { part: 'Engine', price: '$699' },
  { part: 'Transmission', price: '$449' },
  { part: 'Differential', price: '$299' },
  { part: 'Axle Assembly', price: '$99' },
  { part: 'Other Parts', price: '$49' },
];

export default function QualityStandards() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-1">Why Shop with Nexus Auto Parts?</h2>
          <p className="text-muted-foreground">Commitment to excellence in every part we deliver</p>
        </div>

        {/* Warranty - Centered, minimal spacing */}
        <div className="flex flex-col items-center justify-center mb-2">
          <img
            src="/warranty.png"
            alt="Warranty"
            className="w-[125px] h-[125px] mb-1"
          />
          <h3 className="text-xl font-bold text-primary">30-90 Days Warranty</h3>
        </div>

        {/* Other Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {standards.map((standard) => (
            <Card
              key={standard.title}
              className="hover-elevate"
              data-testid={`standard-${standard.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-md bg-ring/10 flex items-center justify-center">
                      <standard.icon className="w-6 h-6 text-ring" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{standard.title}</h3>
                    <p className="text-sm text-muted-foreground">{standard.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-10 text-white">
          <h3 className="text-3xl font-bold text-center mb-8">Starting Prices</h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {pricing.map((item) => (
              <div key={item.part} className="text-center px-6 py-4 bg-white/10 rounded-xl backdrop-blur-sm min-w-[120px]">
                <p className="text-2xl md:text-3xl font-bold text-primary">{item.price}</p>
                <p className="text-base text-zinc-300 mt-1">{item.part}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
