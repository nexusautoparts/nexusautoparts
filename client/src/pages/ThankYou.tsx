import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ThankYou() {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-slate-800 flex flex-col">
            <Navigation />

            <main className="flex-grow flex items-center justify-center py-16 px-4">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Thank you for submitting your parts request!
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        A dedicated parts specialist will be reaching out to you by phone within the next 5–10 minutes. Please make sure you're available to take the call.
                    </p>

                    <div className="pt-4">
                        <p className="text-slate-500 mb-6 text-lg">
                            If you need immediate assistance, don’t hesitate to give us a call.
                        </p>

                        <a href="tel:8663171665" className="inline-block">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-xl px-8 py-6 h-auto rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                <Phone className="mr-3 h-6 w-6" />
                                (866) 317-1665
                            </Button>
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
