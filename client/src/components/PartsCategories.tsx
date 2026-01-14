import { Link } from 'wouter';
import { ArrowRight, Star, Truck, Shield, DollarSign } from 'lucide-react';
import usedEngine from '@/assets/images/parts/used-engine.webp';
import usedTransmission from '@/assets/images/parts/used-transmission.webp';
import usedSteering from '@/assets/images/parts/used-steering-column.webp';
import usedCluster from '@/assets/images/parts/used-instrument-cluster.webp';
import usedAbs from '@/assets/images/parts/used-abs-module.webp';
import usedTransfer from '@/assets/images/parts/used-transfer-case.webp';
import usedTurbo from '@/assets/images/parts/used-turbo-charger.webp';
import usedDiff from '@/assets/images/parts/used-differential.webp';
import usedAxle from '@/assets/images/parts/used-axel-shaft.webp';
import usedAlternator from '@/assets/images/parts/used-alternator.webp';

const categories = [
  { name: 'Engine', image: usedEngine, price: 'From $699', href: '/engine', badge: 'Best Seller' },
  { name: 'Transmission', image: usedTransmission, price: 'From $449', href: '/transmission', badge: 'Popular' },
  { name: 'Steering Column', image: usedSteering, price: 'From $149', href: '/steering-column' },
  { name: 'Instrument Cluster', image: usedCluster, price: 'From $99', href: '/instrument-cluster' },
  { name: 'ABS Module', image: usedAbs, price: 'From $129', href: '/abs-module' },
  { name: 'Transfer Case', image: usedTransfer, price: 'From $299', href: '/transfer-case' },
  { name: 'Turbo Charger', image: usedTurbo, price: 'From $349', href: '/turbo-charger' },
  { name: 'Differential', image: usedDiff, price: 'From $299', href: '/differential' },
  { name: 'Axle Shaft', image: usedAxle, price: 'From $99', href: '/axle-shaft' },
  { name: 'Alternator', image: usedAlternator, price: 'From $89', href: '/alternator' },
];

export default function PartsCategories() {
  return (
    <section id="parts-categories" className="py-8 md:py-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Quality Guaranteed
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Our Used Parts
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Comprehensive selection of OEM-quality parts for all your vehicle needs.
            Every part tested, verified, and ready to ship.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Shield, text: 'Warranty Included', color: 'text-green-400' },
            { icon: Truck, text: 'Free Shipping', color: 'text-blue-400' },
            { icon: Star, text: 'Quality Tested', color: 'text-yellow-400' },
            { icon: DollarSign, text: 'Save 50-70%', color: 'text-primary' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 bg-white/5 rounded-lg py-3 px-4">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-white text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="block h-full group"
            >
              <div
                className="relative bg-white rounded-2xl overflow-hidden h-full shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1"
                data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Badge */}
                {category.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                      {category.badge}
                    </span>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-4 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-primary font-bold text-sm">
                        {category.price}
                      </p>
                    </div>
                    <div className="bg-slate-100 group-hover:bg-primary rounded-full p-2 transition-colors">
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Can't find what you're looking for?</p>
          <a
            href="tel:8662122276"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            Call (866) 212-2276
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
