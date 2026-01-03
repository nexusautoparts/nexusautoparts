import { Card, CardContent } from '@/components/ui/card';
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
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Brands</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        At Nexus Auto, we offer high quality used parts sourced from some of the most trusted and best-selling automotive brands in the industry.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {brands.map((brand) => (
                        <Card
                            key={brand.name}
                            className="hover:shadow-md transition-shadow border-none shadow-sm flex items-center justify-center p-6 bg-white"
                        >
                            <CardContent className="p-0 flex items-center justify-center w-full h-32">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="max-h-24 w-auto object-contain"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
