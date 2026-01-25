
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Contact() {
    const [, setLocation] = useLocation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        vehicleInfo: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    part: formData.vehicleInfo, // Using vehicle info as 'part' or generic context
                    message: formData.message + " (Vehicle: " + formData.vehicleInfo + ")"
                })
            });
            setLocation('/thank-you');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-slate-800 overflow-x-hidden w-full max-w-full">
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="relative w-full px-4 z-10 text-center text-white space-y-4">
                    <MessageSquare className="w-12 h-12 mx-auto text-primary" />
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                        We're here to help you find the right part
                    </p>
                </div >
            </section >

            <main className="w-full px-4 py-12 lg:py-16 max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Have questions about a part, need help with an order, or want to speak with a parts specialist? We're here to assist you.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Call Us</h3>
                                    <a href="tel:8663171665" className="text-primary font-bold text-lg hover:underline">
                                        866-317-1665
                                    </a>
                                    <p className="text-slate-500 text-sm mt-2">Mon-Fri: 8AM - 6PM EST</p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg">
                                <CardContent className="p-6 text-center">
                                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
                                    <a href="mailto:sales@nexusautopartsus.com" className="text-blue-600 font-medium hover:underline">
                                        sales@nexusautopartsus.com
                                    </a>
                                    <p className="text-slate-500 text-sm mt-2">Response within 24 hours</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-none shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">Business Hours</h3>
                                        <div className="text-slate-600 space-y-1">
                                            <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                                            <p>Saturday: 9:00 AM - 3:00 PM EST</p>
                                            <p>Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                    </div>

                    {/* Contact Form */}
                    <div>
                        <Card className="border-none shadow-xl">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>Send Us a Message</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">First Name *</label>
                                        <Input
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Last Name *</label>
                                        <Input
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email Address *</label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                    <Input
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const input = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            const formatted = input.length === 0 ? '' :
                                                input.length <= 3 ? input :
                                                    input.length <= 6 ? `(${input.slice(0, 3)}) ${input.slice(3)}` :
                                                        `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
                                            setFormData({ ...formData, phone: formatted });
                                        }}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Vehicle Info (Year, Make, Model)</label>
                                    <Input
                                        placeholder="e.g., 2018 Ford F-150"
                                        value={formData.vehicleInfo}
                                        onChange={(e) => setFormData({ ...formData, vehicleInfo: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Message *</label>
                                    <Textarea
                                        placeholder="Tell us about the part you're looking for or any questions you have..."
                                        className="min-h-[120px]"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 py-3 text-base font-bold"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>

                                <p className="text-xs text-slate-500 text-center">
                                    By submitting, you agree to our Privacy Policy and consent to be contacted regarding your inquiry.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                {/* Quick Help Section */}
                <section className="mt-12 lg:mt-16">
                    <Card className="border-none shadow-lg bg-slate-900 text-white">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-xl lg:text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                                Our parts specialists are standing by to help you find the exact part you need. Call now for real-time inventory checks and expert guidance.
                            </p>
                            <a href="tel:8663171665">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call 866-317-1665
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div >
    );
}
