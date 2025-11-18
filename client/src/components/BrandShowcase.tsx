import { SiBosch, SiBmw, SiMercedes, SiAudi, SiToyota, SiHonda } from 'react-icons/si';

const brands = [
  { name: 'Bosch', icon: SiBosch },
  { name: 'BMW', icon: SiBmw },
  { name: 'Mercedes', icon: SiMercedes },
  { name: 'Audi', icon: SiAudi },
  { name: 'Toyota', icon: SiToyota },
  { name: 'Honda', icon: SiHonda },
];

export default function BrandShowcase() {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Available Brands</h2>
          <p className="text-muted-foreground">Trusted manufacturers worldwide</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-6 bg-background rounded-md hover-elevate active-elevate-2 cursor-pointer transition-transform hover:scale-105"
              data-testid={`brand-${brand.name.toLowerCase()}`}
            >
              <brand.icon className="w-16 h-16 text-foreground" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
