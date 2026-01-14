import { useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Payment() {
    const [, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate processing
        setTimeout(() => {
            setIsLoading(false);
            setLocation("/thank-you");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white font-serif text-black">
            <Navigation />

            <main className="max-w-3xl mx-auto px-4 py-12">
                <div className="border-2 border-black p-8 bg-gray-50">
                    <div className="text-center border-b-2 border-black pb-6 mb-8">
                        <h1 className="text-2xl font-bold uppercase tracking-widest text-black">Official Payment Form</h1>
                        <p className="text-sm mt-2 font-mono">SECURE TRANSACTION PORTAL</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section 1: Transaction Details */}
                        <div className="bg-white border border-gray-300 p-4">
                            <h2 className="bg-gray-200 text-sm font-bold uppercase px-2 py-1 mb-4 inline-block border border-gray-400">1. Transaction Date</h2>
                            <div className="grid grid-cols-1">
                                <label className="block text-xs uppercase font-bold mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>
                        </div>

                        {/* Section 2: Payment Method */}
                        <div className="bg-white border border-gray-300 p-4">
                            <h2 className="bg-gray-200 text-sm font-bold uppercase px-2 py-1 mb-4 inline-block border border-gray-400">2. Payment Method</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs uppercase font-bold mb-1">Cardholder Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black uppercase"
                                        placeholder="AS APPEARS ON CARD"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs uppercase font-bold mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        required
                                        pattern="[0-9]{13,19}"
                                        className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        placeholder="XXXX-XXXX-XXXX-XXXX"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase font-bold mb-1">Expiry *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="MM/YY"
                                            className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold mb-1">CVV *</label>
                                        <input
                                            type="text"
                                            required
                                            pattern="[0-9]{3,4}"
                                            className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Shipping Address */}
                        <div className="bg-white border border-gray-300 p-4">
                            <h2 className="bg-gray-200 text-sm font-bold uppercase px-2 py-1 mb-4 inline-block border border-gray-400">3. Shipping Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs uppercase font-bold mb-1">Street Address</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black uppercase"
                                    />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase font-bold mb-1">City</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black uppercase"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold mb-1">State</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black uppercase"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold mb-1">Zip Code *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Billing Address */}
                        <div className="bg-white border border-gray-300 p-4">
                            <h2 className="bg-gray-200 text-sm font-bold uppercase px-2 py-1 mb-4 inline-block border border-gray-400">4. Billing Address</h2>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" className="border-gray-400 rounded-none w-4 h-4 text-black focus:ring-black" />
                                    <span className="font-mono uppercase">Same as Shipping Address</span>
                                </label>
                                <div className="pt-2 border-t border-dashed border-gray-300">
                                    <label className="block text-xs uppercase font-bold mb-1">Billing Street Address</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-400 p-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black uppercase"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t-2 border-black">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black text-white hover:bg-gray-800 rounded-none uppercase font-bold tracking-widest py-3"
                            >
                                {isLoading ? "Processing Authorization..." : "Authorize Payment Now"}
                            </Button>
                            <p className="text-center text-xs mt-3 font-mono text-gray-500">
                                BY CLICKING AUTHORIZE, YOU AGREE TO THE TERMS OF SERVICE.
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
