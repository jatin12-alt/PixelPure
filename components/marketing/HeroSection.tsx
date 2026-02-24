"use client";

import React from "react";

import Link from "next/link";
import { Sparkles, Zap, ArrowRight, Star, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const floatingStats = [
    { label: "Photos Enhanced", value: "2.4M+" },
    { label: "Happy Users", value: "500K+" },
    { label: "Avg Quality Gain", value: "400%" },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
            {/* Decorative grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,242,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,242,255,0.04) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            {/* Purple ambient */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: "800px",
                    height: "500px",
                    background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Pill badge */}
                <div className="flex justify-center mb-8">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                            background: "rgba(0,242,255,0.08)",
                            border: "1px solid rgba(0,242,255,0.2)",
                        }}
                    >
                        <Zap
                            className="w-3.5 h-3.5 text-electric-cyan"
                            strokeWidth={2.5}
                        />
                        <span className="text-electric-cyan">Powered by Replicate AI</span>
                        <span className="text-text-muted">· v2.0 just launched</span>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6">
                    <span className="block text-white">Restore Photos</span>
                    <span
                        className="block"
                        style={{
                            background: "linear-gradient(135deg, #00F2FF 0%, #7C3AED 60%, #A855F7 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        with Pure AI
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    Transform blurry, damaged, or low-resolution photos into stunning
                    4K quality images. Face restoration, denoising, and upscaling — all
                    in one click.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/dashboard/studio"
                        id="hero-primary-cta"
                        className="relative inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold text-black rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                        style={{
                            background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                            boxShadow:
                                "0 0 30px rgba(0,242,255,0.4), 0 0 80px rgba(0,242,255,0.15)",
                        }}
                    >
                        <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                        Start Free — 10 Credits
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="#demo"
                        id="hero-secondary-cta"
                        className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-text-secondary rounded-2xl transition-all duration-300 hover:text-text-primary hover:bg-white/5"
                        style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        Watch Demo
                    </Link>
                </div>

                {/* Social Proof Avatars */}
                <div className="flex items-center justify-center gap-3 mb-16">
                    <div className="flex -space-x-2">
                        {["#00F2FF", "#7C3AED", "#F59E0B", "#10B981", "#EF4444"].map(
                            (color, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-pitch-black flex items-center justify-center text-xs font-bold text-black"
                                    style={{ background: color, zIndex: 5 - i }}
                                >
                                    {String.fromCharCode(65 + i)}
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                                />
                            ))}
                        </div>
                        <span className="text-text-secondary font-medium">
                            <span className="text-text-primary font-bold">4.9/5</span> from
                            500K+ users
                        </span>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {floatingStats.map(({ label, value }) => (
                        <div
                            key={label}
                            className="rounded-2xl p-4 text-center"
                            style={{
                                background: "rgba(13,13,21,0.8)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            <div
                                className="text-2xl sm:text-3xl font-black mb-1"
                                style={{
                                    background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {value}
                            </div>
                            <div className="text-text-muted text-xs font-medium">{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom fade gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: "linear-gradient(to top, #000000, transparent)",
                }}
            />
        </section>
    );
}
