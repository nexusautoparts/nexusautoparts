import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import usedEngine from '@/assets/images/parts/used-engine.webp';
import usedTransmission from '@/assets/images/parts/used-transmission.webp';
import usedSteering from '@/assets/images/parts/used-steering-column.webp';
import usedCluster from '@/assets/images/parts/used-instrument-cluster.webp';
import usedAbs from '@/assets/images/parts/used-abs-module.webp';
import usedTransfer from '@/assets/images/parts/used-transfer-case.webp';
import usedTurbo from '@/assets/images/parts/used-turbo-charger.webp';
import usedDiff from '@/assets/images/parts/used-differential.webp';
import usedAxle from '@/assets/images/parts/used-axel-shaft.webp';

const categories = [
  { name: 'Used Engine', image: usedEngine, description: 'High-quality tested engines', href: '/used-engine' },
  { name: 'Used Transmission', image: usedTransmission, description: 'Smooth shifting transmissions', href: '/products' },
  { name: 'Used Steering Column', image: usedSteering, description: 'Precise steering control', href: '/products' },
  { name: 'Used Instrument Cluster', image: usedCluster, description: 'Accurate gauges and displays', href: '/products' },
  { name: 'Used ABS Module', image: usedAbs, description: 'Reliable braking systems', href: '/products' },
  { name: 'Used Transfer Case', image: usedTransfer, description: 'Durable transfer cases', href: '/products' },
  { name: 'Used Turbo Charger', image: usedTurbo, description: 'Boost power and efficiency', href: '/products' },
  { name: 'Used Differential', image: usedDiff, description: 'Smooth power delivery', href: '/products' },
  { name: 'Used Axle Shaft', image: usedAxle, description: 'Strong and durable shafts', href: '/products' },
];

export default function PartsCategories() {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Used Parts</h2>
          <p className="text-muted-foreground">Comprehensive selection for all your vehicle needs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <a className="block h-full">
                <Card
                  className="hover-elevate cursor-pointer transition-all hover:shadow-lg h-full"
                  data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardContent className="p-4 flex flex-col items-center gap-3 text-center h-full">
                    <div className="w-full aspect-square bg-white rounded-md overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
