import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Zap, Shield, TrendingUp, Clock, History } from "lucide-react";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-pitch-black pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto space-y-16">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric-cyan transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
                        Next-Gen <span className="text-gradient-cyan">AI Restoration.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Experience the most advanced photo restoration technology ever built for the web. Pro-grade tools, one-click simple.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: Sparkles, title: "Face Reconstruction", desc: "Our neural networks reconstruct lost facial details, restoring eyes, skin, and hair to crystal clarity." },
                        { icon: Zap, title: "Grain Removal", desc: "Intelligently identifies and removes digital noise and film grain without losing essential sharpness." },
                        { icon: TrendingUp, title: "4K Upscaling", desc: "Upscale your low-res photos up to 400% with AI-generated details that stay sharp at any size." },
                        { icon: Shield, title: "Color Correction", desc: "Automatically balances exposure and restores natural colors to faded or old photographs." },
                        { icon: Clock, title: "Instant Processing", desc: "Cloud-powered GPU acceleration means your HD results are ready in less than 5 seconds." },
                        { icon: History, title: "Smart History", desc: "Access your previously restored masterpieces anytime from your secure personal gallery." }
                    ].map((feature, i) => (
                        <div key={i} className="card-premium rounded-[2rem] p-8 border-white/10 space-y-4 hover:border-electric-cyan/30 transition-all group">
                            <div className="w-12 h-12 rounded-2xl glass-cyan flex items-center justify-center group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6 text-electric-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
