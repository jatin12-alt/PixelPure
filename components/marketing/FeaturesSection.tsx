"use client";

import React from "react";
import {
    Sparkles,
    Zap,
    ScanLine,
    Shield,
    Clock,
    Download,
    Layers,
    Wand2,
} from "lucide-react";

const features = [
    {
        icon: Wand2,
        title: "Face Restoration",
        description:
            "Advanced facial detail recovery using GFPGAN — brings back eyes, skin texture, and expressions with stunning clarity.",
        color: "cyan",
        badge: "Most Popular",
    },
    {
        icon: Zap,
        title: "4× AI Upscaling",
        description:
            "Quadruple your image resolution with Real-ESRGAN. Transform 512px photos into 2048px without artifacts.",
        color: "purple",
        badge: null,
    },
    {
        icon: ScanLine,
        title: "Smart Denoising",
        description:
            "Remove grain, compression artifacts, and noise while preserving fine details that other tools destroy.",
        color: "cyan",
        badge: null,
    },
    {
        icon: Layers,
        title: "Batch Processing",
        description:
            "Enhance entire photo albums at once. Upload up to 50 images and process them simultaneously.",
        color: "purple",
        badge: "PRO",
    },
    {
        icon: Clock,
        title: "Lightning Fast",
        description:
            "Get results in under 5 seconds. Our distributed GPU infrastructure means no waiting in queues.",
        color: "cyan",
        badge: null,
    },
    {
        icon: Shield,
        title: "Privacy First",
        description:
            "Your images are encrypted in transit, processed in isolated environments, and auto-deleted after 24 hours.",
        color: "purple",
        badge: null,
    },
    {
        icon: Download,
        title: "Multiple Formats",
        description:
            "Export in PNG, JPEG, WebP, or TIFF. Lossless quality options available for professional use.",
        color: "cyan",
        badge: null,
    },
    {
        icon: Sparkles,
        title: "API Access",
        description:
            "Integrate PixelPure directly into your app with our REST API. Full documentation and SDKs included.",
        color: "purple",
        badge: "BUSINESS",
    },
];

export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="py-24 px-4 sm:px-6 lg:px-8"
            aria-label="Features"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                        style={{
                            background: "rgba(124,58,237,0.1)",
                            border: "1px solid rgba(124,58,237,0.3)",
                            color: "#A855F7",
                        }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Everything you need
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        Professional AI Tools
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        A complete suite of AI-powered image enhancement tools built for
                        photographers, designers, and creators.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map(({ icon: Icon, title, description, color, badge }) => (
                        <div
                            key={title}
                            className="card-premium rounded-2xl p-6 flex flex-col gap-4 group"
                        >
                            {/* Icon */}
                            <div className="flex items-start justify-between">
                                <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${color === "cyan" ? "glass-cyan" : "glass-purple"
                                        }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 ${color === "cyan" ? "text-electric-cyan" : "text-neon-purple"
                                            }`}
                                        strokeWidth={1.75}
                                    />
                                </div>
                                {badge && (
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge === "PRO"
                                            ? "bg-deep-purple/30 text-neon-purple"
                                            : badge === "BUSINESS"
                                                ? "bg-electric-cyan/15 text-electric-cyan"
                                                : "bg-white/10 text-white"
                                            }`}
                                    >
                                        {badge}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-bold text-text-primary mb-2 text-base">
                                    {title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
