import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HeroSearchTool() {
    const [activeTab, setActiveTab] = useState<'vehicle' | 'vin'>('vehicle');
    const [vin, setVin] = useState('');

    return (
        <div className="bg-primary/95 text-primary-foreground p-6 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm border border-primary-foreground/10">
            {/* Tab Toggle */}
            <div className="flex mb-5 bg-black/20 rounded-full p-1">
                <button
                    type="button"
                    onClick={() => setActiveTab('vehicle')}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-colors duration-150 ${activeTab === 'vehicle'
                            ? 'bg-white text-primary'
                            : 'text-primary-foreground/80 hover:text-primary-foreground'
                        }`}
                >
                    By Vehicle
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('vin')}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-colors duration-150 ${activeTab === 'vin'
                            ? 'bg-white text-primary'
                            : 'text-primary-foreground/80 hover:text-primary-foreground'
                        }`}
                >
                    By VIN
                </button>
            </div>

            {activeTab === 'vehicle' ? (
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Year</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm">
                            <option value="">Click here to Pick Year</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Make</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm">
                            <option value="">Click here to Pick Make</option>
                            <option value="Ford">Ford</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Toyota">Toyota</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Model</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm">
                            <option value="">Click here to Pick Model</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Part</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm">
                            <option value="">Click here to Pick Part</option>
                            <option value="Engine">Engine</option>
                            <option value="Transmission">Transmission</option>
                            <option value="Brands">Brands</option>
                        </select>
                    </div>

                    <Button className="w-full bg-black text-white hover:bg-black/80 font-bold h-12 text-base mt-2 rounded-full">
                        SEARCH
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1 text-primary-foreground/90">
                            VIN Number
                        </label>
                        <input
                            type="text"
                            value={vin}
                            onChange={(e) => setVin(e.target.value.toUpperCase())}
                            placeholder="Enter 17-character VIN"
                            maxLength={17}
                            className="flex h-12 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm font-mono tracking-wider"
                        />
                        <p className="text-xs text-primary-foreground/70 ml-1">
                            Find your VIN on the driver's side dashboard or door jamb
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium ml-1 text-primary-foreground/90">Pick Part</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-white text-slate-900 px-3 py-2 text-sm">
                            <option value="">Click here to Pick Part</option>
                            <option value="Engine">Engine</option>
                            <option value="Transmission">Transmission</option>
                            <option value="Differential">Differential</option>
                            <option value="Transfer Case">Transfer Case</option>
                        </select>
                    </div>

                    <Button
                        className="w-full bg-black text-white hover:bg-black/80 font-bold h-12 text-base mt-2 rounded-full"
                        disabled={vin.length !== 17}
                    >
                        SEARCH BY VIN
                    </Button>

                    {vin.length > 0 && vin.length !== 17 && (
                        <p className="text-xs text-yellow-300 text-center">
                            VIN must be 17 characters ({17 - vin.length} more needed)
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
