import { Card, CardContent } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  RefreshCw,
  CheckCircle2,
  Medal
} from 'lucide-react';

const standards = [
  {
    icon: ShieldCheck,
    title: 'OEM Quality Certified',
    description: 'All parts meet or exceed original equipment manufacturer standards',
  },
  {
    icon: Award,
    title: 'ISO Certified Suppliers',
    description: 'Sourced from internationally recognized and certified manufacturers',
  },
  {
    icon: CheckCircle2,
    title: 'Rigorous Testing',
    description: 'Every part undergoes comprehensive quality control testing',
  },
  {
    icon: Medal,
    title: 'Warranty Guaranteed',
    description: 'Extended warranty coverage on all premium automotive parts',
  },
  {
    icon: Truck,
    title: 'Fast & Safe Delivery',
    description: 'Secure packaging and timely delivery to protect your investment',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Hassle-free return policy within 30 days of purchase',
  },
];

export default function QualityStandards() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Quality Standards</h2>
          <p className="text-muted-foreground">Commitment to excellence in every part we deliver</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
