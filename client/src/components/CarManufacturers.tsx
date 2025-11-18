import { Card, CardContent } from '@/components/ui/card';
import { SiToyota, SiHyundai, SiBmw, SiKia, SiHonda, SiFord } from 'react-icons/si';
import { Link } from 'wouter';

const manufacturers = [
  { name: 'Toyota', icon: SiToyota, color: 'text-red-600' },
  { name: 'Hyundai', icon: SiHyundai, color: 'text-blue-600' },
  { name: 'BMW', icon: SiBmw, color: 'text-blue-700' },
  { name: 'Kia', icon: SiKia, color: 'text-red-700' },
  { name: 'Honda', icon: SiHonda, color: 'text-red-600' },
  { name: 'Ford', icon: SiFord, color: 'text-blue-600' },
];

export default function CarManufacturers() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Shop by Manufacturer</h2>
          <p className="text-muted-foreground">Find parts for your specific vehicle brand</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {manufacturers.map((manufacturer) => (
            <Link key={manufacturer.name} href={`/products?manufacturer=${manufacturer.name.toLowerCase()}`}>
              <Card className="hover-elevate cursor-pointer transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                  <manufacturer.icon className={`w-16 h-16 ${manufacturer.color}`} />
                  <span className="font-semibold text-center" data-testid={`text-manufacturer-${manufacturer.name.toLowerCase()}`}>
                    {manufacturer.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
