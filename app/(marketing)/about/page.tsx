import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Shield, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-pitch-black pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric-cyan transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        We're on a mission to <span className="text-gradient-cyan">Denoise the World.</span>
                    </h1>
                    <p className="text-xl text-text-secondary leading-relaxed">
                        PixelPure was born from a simple idea: everyone should have access to professional-grade image restoration without the professional-grade price tag or complexity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card-premium rounded-3xl p-8 border-white/10 space-y-4">
                        <div className="w-12 h-12 rounded-2xl glass-cyan flex items-center justify-center">
                            <Zap className="w-6 h-6 text-electric-cyan" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Our Technology</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            We use custom-trained neural networks specifically optimized for facial reconstruction, grain removal, and color correction. Our AI doesn't just "filter" — it reconstructs.
                        </p>
                    </div>
                    <div className="card-premium rounded-3xl p-8 border-white/10 space-y-4">
                        <div className="w-12 h-12 rounded-2xl glass-purple flex items-center justify-center">
                            <Shield className="w-6 h-6 text-neon-purple" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Our Privacy</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Your memories are your own. We never train our models on user-uploaded data, and all images are automatically deleted from our servers after 24 hours.
                        </p>
                    </div>
                </div>

                <div className="card-premium rounded-3xl p-8 md:p-12 border-white/10 text-center space-y-6">
                    <h2 className="text-2xl font-bold text-white">Have questions?</h2>
                    <p className="text-text-secondary">We're always looking for feedback to make PixelPure better.</p>
                    <a href="mailto:support@pixelpure.ai" className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10">
                        <Mail className="w-4 h-4" />
                        support@pixelpure.ai
                    </a>
                </div>
            </div>
        </div>
    );
}
