import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-slate-800">
            <Navigation />

            <main className="flex items-center justify-center min-h-[60vh] px-4">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-100 max-w-lg w-full text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 mb-4">PAYMENT RECEIVED</h1>

                    <p className="text-lg text-slate-600 mb-8">
                        Your order is being processed. A confirmation email will be sent to your registered email address.
                    </p>

                    <div className="space-y-4">
                        <Link href="/">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 px-8 rounded-lg shadow-md">
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
