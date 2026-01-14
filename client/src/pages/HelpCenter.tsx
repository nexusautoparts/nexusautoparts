
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, FileText, Package, RefreshCw, HelpCircle, ShieldCheck, Truck, Settings } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const helpTopics = [
    {
        icon: Package,
        title: "Ordering Parts",
        description: "How to search, request quotes, and place orders",
        links: [
            { text: "How do I request a part quote?", href: "/faq" },
            { text: "What information do I need to order?", href: "/faq" },
            { text: "View all products", href: "/" }
        ]
    },
    {
        icon: Truck,
        title: "Shipping & Delivery",
        description: "Shipping options, delivery times, and tracking",
        links: [
            { text: "Track my order", href: "/track" },
            { text: "Shipping times", href: "/faq" },
            { text: "Freight delivery info", href: "/warranty" }
        ]
    },
    {
        icon: RefreshCw,
        title: "Returns & Refunds",
        description: "Return policy, RMA process, and refunds",
        links: [
            { text: "Return Policy", href: "/warranty" },
            { text: "How to request an RMA", href: "/warranty" },
            { text: "Refund timeline", href: "/warranty" }
        ]
    },
    {
        icon: ShieldCheck,
        title: "Warranty Information",
        description: "Coverage details, requirements, and claims",
        links: [
            { text: "What's covered?", href: "/warranty" },
            { text: "Warranty requirements", href: "/warranty" },
            { text: "Filing a claim", href: "/warranty" }
        ]
    },
    {
        icon: Settings,
        title: "Part Fitment",
        description: "Ensuring the right part for your vehicle",
        links: [
            { text: "VIN verification explained", href: "/faq" },
            { text: "How we ensure fitment", href: "/about" },
            { text: "Request a part specialist", href: "/contact" }
        ]
    },
    {
        icon: FileText,
        title: "Policies & Terms",
        description: "Privacy, terms, and SMS communications",
        links: [
            { text: "Privacy Policy", href: "/privacy-policy" },
            { text: "Terms & Conditions", href: "/terms" },
            { text: "SMS opt-in/opt-out", href: "/terms" }
        ]
    }
];

export default function HelpCenter() {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-slate-800 overflow-x-hidden w-full max-w-full">
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="relative w-full px-4 z-10 text-center text-white space-y-4">
                    <HelpCircle className="w-12 h-12 mx-auto text-primary" />
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        Help Center
                    </h1>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                        Find answers and get the support you need
                    </p>
                </div>
            </section>

            <main className="w-full px-4 py-12 lg:py-16 max-w-6xl mx-auto">

                {/* Quick Contact */}
                <div className="grid sm:grid-cols-3 gap-4 mb-12">
                    <a href="tel:8662122276" className="block">
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                            <CardContent className="p-6 text-center">
                                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                                <p className="text-primary font-bold">(866) 212-2276</p>
                                <p className="text-slate-500 text-sm mt-1">Mon-Fri 8AM-6PM EST</p>
                            </CardContent>
                        </Card>
                    </a>

                    <a href="mailto:sales@nexusautopartsus.com" className="block">
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                            <CardContent className="p-6 text-center">
                                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Email Support</h3>
                                <p className="text-blue-600 font-medium">sales@nexusautopartsus.com</p>
                                <p className="text-slate-500 text-sm mt-1">Response within 24hrs</p>
                            </CardContent>
                        </Card>
                    </a>

                    <a href="/contact" className="block">
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                            <CardContent className="p-6 text-center">
                                <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-7 h-7 text-green-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Contact Form</h3>
                                <p className="text-green-600 font-medium">Send a Message</p>
                                <p className="text-slate-500 text-sm mt-1">We'll get back to you</p>
                            </CardContent>
                        </Card>
                    </a>
                </div>

                {/* Help Topics */}
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Browse Help Topics</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {helpTopics.map((topic, i) => (
                        <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center">
                                        <topic.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">{topic.title}</h3>
                                </div>
                                <p className="text-slate-600 text-sm mb-4">{topic.description}</p>
                                <ul className="space-y-2">
                                    {topic.links.map((link, j) => (
                                        <li key={j}>
                                            <a href={link.href} className="text-primary hover:underline text-sm">
                                                {link.text} →
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* FAQs Link */}
                <Card className="border-none shadow-lg bg-slate-50 mb-8">
                    <CardContent className="p-8 text-center">
                        <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Check Our FAQs</h3>
                        <p className="text-slate-600 mb-4 max-w-lg mx-auto">
                            Find quick answers to the most commonly asked questions about our parts, shipping, warranty, and more.
                        </p>
                        <a href="/faq">
                            <Button className="bg-primary hover:bg-primary/90">
                                View Frequently Asked Questions
                            </Button>
                        </a>
                    </CardContent>
                </Card>

                {/* Still Need Help */}
                <Card className="border-none shadow-lg bg-slate-900 text-white">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-xl lg:text-2xl font-bold mb-4">Still Need Help?</h3>
                        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                            Our experienced parts specialists are ready to assist you with any questions or concerns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:8662122276">
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call (866) 212-2276
                                </Button>
                            </a>
                            <a href="/contact">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                    Contact Us
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
