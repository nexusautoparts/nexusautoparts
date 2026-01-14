import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { getMakes, getModels, getYears, getParts } from "@/data/vehicleData";

interface HeroSearchToolProps {
    defaultPart?: string;
}

export default function HeroSearchTool({ defaultPart = '' }: HeroSearchToolProps) {
    const [vin, setVin] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPart, setSelectedPart] = useState(defaultPart);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCollectingInfo, setIsCollectingInfo] = useState(false);
    const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });

    const years = useMemo(() => getYears(), []);
    const makes = useMemo(() => getMakes(), []);
    const models = useMemo(() => selectedMake ? getModels(selectedMake) : [], [selectedMake]);
    const parts = useMemo(() => getParts(), []);

    const handleMakeChange = (make: string) => {
        setSelectedMake(make);
        setSelectedModel(''); // Reset model when make changes
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSearchClick = () => {
        setIsCollectingInfo(true);
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: contactInfo.name,
                    email: contactInfo.email,
                    phone: contactInfo.phone,
                    vehicle: `${selectedYear} ${selectedMake} ${selectedModel}`.trim(),
                    part: selectedPart,
                    message: "Lead from Hero Search Tool"
                })
            });
        } catch (error) {
            console.error("Failed to submit lead", error);
        } finally {
            setIsSubmitting(false);
            setIsCollectingInfo(false);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-primary/95 text-primary-foreground p-6 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-primary-foreground/10 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                    <p className="text-sm opacity-90">
                        We have received your request. Our team will check availability and get back to you shortly.
                    </p>
                </div>

                <div className="w-full space-y-3">
                    <p className="font-bold text-lg">(866) 212-2276</p>

                    <a href="tel:8662122276">
                        <Button className="w-full bg-white text-black hover:bg-white/90 font-bold h-12 text-base mb-3 rounded-full">
                            Call Us Now
                        </Button>
                    </a>

                    <a href="mailto:sales@nexusautopartsus.com">
                        <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 font-bold h-12 text-base rounded-full">
                            Email Us
                        </Button>
                    </a>
                </div>

                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs opacity-70 hover:opacity-100 underline mt-4"
                >
                    Start New Search
                </button>
            </div>
        );
    }

    if (isCollectingInfo) {
        return (
            <div className="bg-primary/95 text-primary-foreground p-6 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-primary-foreground/10 animate-in fade-in zoom-in duration-300">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">Contact Information</h3>
                    <p className="text-xs opacity-80">Please provide your details to receive the quote.</p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1">Name</label>
                        <input
                            type="text"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                            value={contactInfo.name}
                            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1">Email ID</label>
                        <input
                            type="email"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white hover:bg-black/80 font-bold h-12 text-base rounded-full"
                        >
                            {isSubmitting ? "Sending..." : "GET QUOTE"}
                        </Button>
                        <button
                            type="button"
                            onClick={() => setIsCollectingInfo(false)}
                            className="w-full text-xs opacity-70 hover:opacity-100 underline mt-3 text-center"
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-primary/95 text-primary-foreground p-6 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-primary-foreground/10">
            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Year</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Click here to Pick Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Make</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                        value={selectedMake}
                        onChange={(e) => handleMakeChange(e.target.value)}
                    >
                        <option value="">Click here to Pick Make</option>
                        {makes.map(make => (
                            <option key={make} value={make}>{make}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Model</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedMake}
                    >
                        <option value="">{selectedMake ? 'Click here to Pick Model' : 'Select Make first'}</option>
                        {models.map(model => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Part</label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm"
                        value={selectedPart}
                        onChange={(e) => setSelectedPart(e.target.value)}
                    >
                        <option value="">Click here to Pick Part</option>
                        {parts.map(part => (
                            <option key={part} value={part}>{part}</option>
                        ))}
                    </select>
                </div>

                {/* Optional VIN Input */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1 text-primary-foreground/90">
                        VIN Number <span className="text-xs font-normal opacity-70">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        placeholder="Enter 17-character VIN"
                        maxLength={17}
                        className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm font-mono tracking-wider"
                    />
                </div>

                <Button
                    className="w-full bg-black text-white hover:bg-black/80 font-bold h-12 text-base mt-2 rounded-full"
                    onClick={handleSearchClick}
                >
                    SEARCH
                </Button>
            </div>
        </div>
    );
}
