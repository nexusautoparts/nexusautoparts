import { Card, CardContent } from '@/components/ui/card';
import enginePartsImage from '@assets/generated_images/Engine_parts_piston_0005484d.png';
import brakePartsImage from '@assets/generated_images/Brake_system_parts_6721ec37.png';
import electricalImage from '@assets/generated_images/Electrical_alternator_04ccef8b.png';
import bodyPartsImage from '@assets/generated_images/Body_parts_bumper_0fd6a1ec.png';
import filtersImage from '@assets/generated_images/Filters_set_58ce7f7d.png';
import batteryImage from '@assets/generated_images/Car_battery_d28dca25.png';
import lightingImage from '@assets/generated_images/Headlight_assembly_50ced414.png';
import coolingImage from '@assets/generated_images/Radiator_cooling_b8357db4.png';
import transmissionImage from '@assets/generated_images/Transmission_gears_c292f851.png';
import exhaustImage from '@assets/generated_images/Exhaust_system_f7c86928.png';
import ignitionImage from '@assets/generated_images/Ignition_coil_ab651ade.png';
import toolsImage from '@assets/generated_images/Tools_accessories_836984e3.png';

const categories = [
  { name: 'Engine Parts', image: enginePartsImage, description: 'Pistons, gaskets, belts' },
  { name: 'Brakes & Suspension', image: brakePartsImage, description: 'Pads, rotors, shocks' },
  { name: 'Electrical', image: electricalImage, description: 'Alternators, starters, sensors' },
  { name: 'Body Parts', image: bodyPartsImage, description: 'Bumpers, fenders, mirrors' },
  { name: 'Filters', image: filtersImage, description: 'Air, oil, cabin filters' },
  { name: 'Batteries', image: batteryImage, description: 'Car batteries, accessories' },
  { name: 'Lighting', image: lightingImage, description: 'Headlights, tail lights, bulbs' },
  { name: 'Cooling System', image: coolingImage, description: 'Radiators, coolant, hoses' },
  { name: 'Transmission', image: transmissionImage, description: 'Gears, clutches, fluids' },
  { name: 'Exhaust', image: exhaustImage, description: 'Mufflers, catalytic converters' },
  { name: 'Ignition', image: ignitionImage, description: 'Spark plugs, coils, wires' },
  { name: 'Tools & Accessories', image: toolsImage, description: 'Maintenance tools, fluids' },
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
              <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
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
          ))}
        </div>
      </div>
    </section>
  );
}
