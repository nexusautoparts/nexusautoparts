import { Search, FileText, Truck, ShieldCheck } from 'lucide-react';
import { useChatbot } from '@/context/ChatbotContext';

const steps = [
    {
        number: 1,
        icon: Search,
        title: 'Find Your Part',
        description: 'Search our extensive inventory by entering your vehicle details and part requirements.',
        clickable: true,
    },
    {
        number: 2,
        icon: FileText,
        title: 'Get a Quote',
        description: 'Receive a competitive quote with detailed information about the part condition and warranty.',
        clickable: false,
    },
    {
        number: 3,
        icon: Truck,
        title: 'Fast Shipping',
        description: 'We ship your part quickly with nationwide delivery and tracking information.',
        clickable: false,
    },
    {
        number: 4,
        icon: ShieldCheck,
        title: 'Warranty Support',
        description: 'Enjoy peace of mind with our standard warranty and responsive customer support.',
        clickable: false,
    },
];

export default function HowItWorks() {
    const { openChatbot } = useChatbot();

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
                    <p className="text-muted-foreground">Our simple process makes finding and ordering the right part easy</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            onClick={step.clickable ? openChatbot : undefined}
                            className={`relative bg-card border border-primary/20 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all ${step.clickable ? 'cursor-pointer' : ''}`}
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4">
                                <step.icon className="w-6 h-6 text-primary" />
                            </div>

                            {/* Content */}
                            <h3 className="text-foreground font-semibold text-lg mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
