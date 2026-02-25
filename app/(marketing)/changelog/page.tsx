import React from "react";
import Link from "next/link";
import { ArrowLeft, Rocket, CheckCircle2, Calendar } from "lucide-react";

export default function ChangelogPage() {
    const updates = [
        {
            version: "v2.1.0",
            date: "February 20, 2026",
            title: "Pro-Photography Transformation Stack",
            changes: [
                "New 'Pro-Photography' AI stack for deeper colors and sharper edges",
                "Neural Shimmer Swipe comparison animation",
                "Mobile-first responsive Studio layout redesign",
                "Real-time image dimension tracking in workspace"
            ]
        },
        {
            version: "v2.0.4",
            date: "February 10, 2026",
            title: "Performance & Stability",
            changes: [
                "50% faster image processing via GPU edge nodes",
                "Improved face restoration for low-light portraits",
                "Fixed double-versioning bug in Cloudinary URLs",
                "Added link-copy sharing functionality"
            ]
        },
        {
            version: "v2.0.0",
            date: "January 15, 2026",
            title: "The All-New PixelPure Studio",
            changes: [
                "Complete UI overhaul with 3-column layout",
                "Interactive AI filter toggles (Face, BG, Denoise, 4K)",
                "Secure HD downloads via blob-fetching",
                "Subscription management with Razorpay integration"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-pitch-black pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto space-y-16">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric-cyan transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white">Changelog</h1>
                    <p className="text-xl text-text-secondary">See what's new in PixelPure. We're constantly improving our AI models and user experience.</p>
                </div>

                <div className="space-y-12">
                    {updates.map((update, i) => (
                        <div key={i} className="relative pl-8 md:pl-12 border-l border-white/10 space-y-6 group">
                            {/* Timeline Dot */}
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-surface-1 border-2 border-electric-cyan shadow-[0_0_10px_rgba(0,242,255,0.5)] group-hover:scale-125 transition-transform" />
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full bg-electric-cyan/10 text-electric-cyan text-xs font-black uppercase tracking-widest">{update.version}</span>
                                    <div className="flex items-center gap-1.5 text-text-muted text-sm font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {update.date}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white">{update.title}</h2>
                            </div>

                            <ul className="space-y-4">
                                {update.changes.map((change, j) => (
                                    <li key={j} className="flex items-start gap-3 text-text-secondary">
                                        <CheckCircle2 className="w-5 h-5 text-electric-cyan/40 shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{change}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
