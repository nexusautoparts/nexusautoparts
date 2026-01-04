import frame1 from '@/assets/images/Frame-1.png'; // Volvo
import frame2 from '@/assets/images/Frame-2.png'; // Chevrolet
import frame3 from '@/assets/images/Frame-3.png'; // Honda
import frame4 from '@/assets/images/Frame-4.png'; // Ford
import frame5 from '@/assets/images/Frame-5.png'; // Jeep
import frame6 from '@/assets/images/Frame-6.png'; // GMC
import frame7 from '@/assets/images/Frame-7.png'; // RAM
import frame8 from '@/assets/images/Frame-8.png'; // Toyota
import frame9 from '@/assets/images/Frame-9.png'; // Nissan
import frame10 from '@/assets/images/Frame-10.png'; // Tesla

const brands = [
    { name: 'Volvo', image: frame1 },
    { name: 'Chevrolet', image: frame2 },
    { name: 'Honda', image: frame3 },
    { name: 'Ford', image: frame4 },
    { name: 'Jeep', image: frame5 },
    { name: 'GMC', image: frame6 },
    { name: 'RAM', image: frame7 },
    { name: 'Toyota', image: frame8 },
    { name: 'Tesla', image: frame10 },
    { name: 'Nissan', image: frame9 },
];

export default function Brands() {
    // Duplicate the array for seamless infinite scroll
    const duplicatedBrands = [...brands, ...brands];

    return (
        <section className="py-12 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Brands</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        At Nexus Auto, we offer high quality used parts sourced from some of the most trusted and best-selling automotive brands in the industry.
                    </p>
                </div>
            </div>

            {/* Auto-sliding carousel */}
            <div className="relative">
                <style>{`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .brand-slider {
            animation: slide 30s linear infinite;
          }
          .brand-slider:hover {
            animation-play-state: paused;
          }
        `}</style>

                <div className="brand-slider flex gap-6 w-max">
                    {duplicatedBrands.map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 w-48 h-32 bg-white rounded-lg shadow-sm flex items-center justify-center p-2 hover:shadow-md transition-shadow"
                        >
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="max-h-28 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
