"use client";

import ScanReveal from "@/components/ui/ScanReveal";
import { useState } from "react";

const demos = [
    {
        id: "portrait",
        label: "Portrait",
        beforeSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=30&blur=10",
        afterSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=95",
        stat: "4× Resolution",
    },
    {
        id: "landscape",
        label: "Landscape",
        beforeSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=20&blur=10",
        afterSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=95",
        stat: "2× Upscale",
    },
    {
        id: "vintage",
        label: "Vintage",
        beforeSrc: "https://images.unsplash.com/photo-1533461502717-83546f485d24?w=800&q=15",
        afterSrc: "https://images.unsplash.com/photo-1533461502717-83546f485d24?w=800&q=95",
        stat: "Full Restore",
    },
];

export default function ImageReveal() {
    const [activeDemo, setActiveDemo] = useState(0);

    return (
        <section
            id="demo"
            className="py-24 px-4 sm:px-6 lg:px-8 relative"
            aria-label="Image restoration demonstration"
        >
            {/* Ambient glow behind the demo */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,242,255,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-5xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                        style={{
                            background: "rgba(0,242,255,0.1)",
                            border: "1px solid rgba(0,242,255,0.25)",
                            color: "#00F2FF",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
                        AI Powered • Real Results
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        <span
                            style={{
                                background: "linear-gradient(135deg, #fff, #94A3B8)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            See the Difference
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Watch our AI laser scan transform low-quality images into stunning,
                        high-definition masterpieces in real time.
                    </p>
                </div>

                {/* Demo Selector */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {demos.map((demo, i) => (
                        <button
                            key={demo.id}
                            onClick={() => setActiveDemo(i)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeDemo === i
                                    ? "text-electric-cyan border"
                                    : "text-text-secondary hover:text-text-primary"
                                }`}
                            style={
                                activeDemo === i
                                    ? {
                                        background: "rgba(0,242,255,0.1)",
                                        borderColor: "rgba(0,242,255,0.3)",
                                    }
                                    : {
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }
                            }
                        >
                            {demo.label}
                        </button>
                    ))}
                </div>

                {/* The Scan Reveal */}
                <div className="relative">
                    <ScanReveal
                        beforeSrc={demos[activeDemo].beforeSrc}
                        afterSrc={demos[activeDemo].afterSrc}
                        beforeAlt={`Original ${demos[activeDemo].label} photo`}
                        afterAlt={`AI-enhanced ${demos[activeDemo].label} photo`}
                        duration={3500}
                        loop={true}
                        autoPlay={true}
                        aspectRatio="16/9"
                    />

                    {/* Stat badge */}
                    <div
                        className="absolute -bottom-4 right-6 px-4 py-2 rounded-xl text-sm font-bold z-30"
                        style={{
                            background: "linear-gradient(135deg, rgba(0,242,255,0.2), rgba(124,58,237,0.2))",
                            border: "1px solid rgba(0,242,255,0.3)",
                            color: "#00F2FF",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        ✨ {demos[activeDemo].stat}
                    </div>
                </div>

                {/* Instructions */}
                <p className="text-center text-text-muted text-xs mt-10">
                    💡 Hover the demo to reveal controls · Drag the laser line manually
                </p>
            </div>
        </section>
    );
}
