"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Check, Zap, Star, Building } from "lucide-react";

const plans = [
    {
        id: "free",
        name: "Free",
        icon: Star,
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: "Perfect for trying PixelPure",
        features: [
            "3 free image enhancements",
            "Face restoration",
            "Basic upscaling (2×)",
            "JPG/PNG export",
            "Community support",
        ],
        limitations: ["No batch processing", "No API access", "Watermarked output"],
        cta: "Get Started Free",
        ctaHref: "/sign-up",
        highlight: false,
        badge: null,
        color: "default",
    },
    {
        id: "pro",
        name: "Pro",
        icon: Zap,
        monthlyPrice: 1599,
        yearlyPrice: 1199,
        description: "For serious creators & photographers",
        features: [
            "150 credits / month",
            "All enhancement types",
            "4× AI upscaling",
            "Batch processing (20 imgs)",
            "All export formats",
            "Priority processing",
            "No watermarks",
            "Email support",
        ],
        limitations: [],
        cta: "Start Pro Trial",
        ctaHref: "/sign-up?plan=pro",
        highlight: true,
        badge: "Most Popular",
        color: "cyan",
    },
    {
        id: "business",
        name: "Business",
        icon: Building,
        monthlyPrice: 6599,
        yearlyPrice: 4999,
        description: "For teams and high-volume usage",
        features: [
            "Unlimited credits",
            "Everything in Pro",
            "Batch processing (unlimited)",
            "REST API access",
            "Custom integrations",
            "Dedicated processing lane",
            "White-label options",
            "Priority phone & email support",
            "SLA guarantee",
        ],
        limitations: [],
        cta: "Contact Sales",
        ctaHref: "/sign-up?plan=business",
        highlight: false,
        badge: null,
        color: "purple",
    },
];

interface PricingSectionProps {
    fullPage?: boolean;
}

export default function PricingSection({ fullPage }: PricingSectionProps) {
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();
    const { user, isSignedIn } = useUser();

    const handleCheckout = async (planId: string) => {
        if (!isSignedIn) {
            toast.error("Please sign in to continue");
            router.push("/sign-in");
            return;
        }

        if (planId === "free") {
            router.push("/dashboard");
            return;
        }

        setIsLoading(planId);

        try {
            // 1. Create order on server
            const response = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId, isYearly }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Failed to create order");
            }

            const order = await response.json();

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "PixelPure",
                description: `Upgrade to ${planId.toUpperCase()} Plan`,
                order_id: order.id,
                handler: async function (response: any) {
                    // Success! Razorpay provides payment_id, order_id, and signature
                    toast.success("Payment successful! Updating your account...");

                    // We can either wait for webhook or call a verification API
                    // For better UX, we'll redirect to a loading/success page
                    router.push("/dashboard?checkout=success");
                    router.refresh();
                },
                prefill: {
                    name: user?.fullName || "",
                    email: user?.emailAddresses[0].emailAddress || "",
                },
                theme: {
                    color: "#00F2FF",
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(null);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <section
            id="pricing"
            className="py-24 px-4 sm:px-6 lg:px-8 relative"
            aria-label="Pricing"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                        style={{
                            background: "rgba(0,242,255,0.1)",
                            border: "1px solid rgba(0,242,255,0.25)",
                            color: "#00F2FF",
                        }}
                    >
                        <Zap className="w-3.5 h-3.5" />
                        Simple Pricing
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        {fullPage ? "Choose Your Plan" : "Start Free, Scale Anytime"}
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg mb-8">
                        No hidden fees. Cancel anytime. All plans include a 7-day free trial.
                    </p>

                    {/* Toggle */}
                    <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isYearly
                                ? "text-black"
                                : "text-text-secondary hover:text-text-primary"
                                }`}
                            style={
                                !isYearly
                                    ? { background: "linear-gradient(135deg, #00F2FF, #0EA5E9)" }
                                    : {}
                            }
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isYearly
                                ? "text-black"
                                : "text-text-secondary hover:text-text-primary"
                                }`}
                            style={
                                isYearly
                                    ? { background: "linear-gradient(135deg, #00F2FF, #0EA5E9)" }
                                    : {}
                            }
                        >
                            Yearly
                            <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isYearly ? "bg-black/20 text-black" : "bg-emerald-500/20 text-emerald-400"
                                    }`}
                            >
                                -30%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map(
                        ({
                            id,
                            name,
                            icon: Icon,
                            monthlyPrice,
                            yearlyPrice,
                            description,
                            features,
                            limitations,
                            cta,
                            ctaHref,
                            highlight,
                            badge,
                            color,
                        }) => {
                            const price = isYearly ? yearlyPrice : monthlyPrice;
                            return (
                                <div
                                    key={id}
                                    id={`pricing-${id}`}
                                    className={`relative rounded-2xl p-6 flex flex-col gap-6 transition-all duration-300 ${highlight ? "scale-[1.02]" : ""
                                        }`}
                                    style={
                                        highlight
                                            ? {
                                                background:
                                                    "linear-gradient(135deg, rgba(0,242,255,0.08), rgba(124,58,237,0.08))",
                                                border: "1px solid rgba(0,242,255,0.3)",
                                                boxShadow:
                                                    "0 0 40px rgba(0,242,255,0.15), 0 0 80px rgba(0,242,255,0.05)",
                                            }
                                            : {
                                                background: "rgba(13,13,21,0.8)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                            }
                                    }
                                >
                                    {/* Badge */}
                                    {badge && (
                                        <div
                                            className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                                            style={{
                                                background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                                color: "#000",
                                            }}
                                        >
                                            {badge}
                                        </div>
                                    )}

                                    {/* Plan header */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${color === "cyan"
                                                    ? "glass-cyan"
                                                    : color === "purple"
                                                        ? "glass-purple"
                                                        : "glass"
                                                    }`}
                                            >
                                                <Icon
                                                    className={`w-5 h-5 ${color === "cyan"
                                                        ? "text-electric-cyan"
                                                        : color === "purple"
                                                            ? "text-neon-purple"
                                                            : "text-text-secondary"
                                                        }`}
                                                    strokeWidth={1.75}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-text-primary">{name}</h3>
                                                <p className="text-xs text-text-muted">{description}</p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-end gap-2">
                                            <span className="text-5xl font-black text-white">
                                                ₹{price}
                                            </span>
                                            {price > 0 && (
                                                <span className="text-text-muted text-sm mb-2">/month</span>
                                            )}
                                        </div>
                                        {isYearly && price > 0 && (
                                            <p className="text-xs text-emerald-400 mt-1">
                                                Billed ₹{price * 12}/year · Save ₹{(monthlyPrice - price) * 12}
                                            </p>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={() => handleCheckout(id)}
                                        disabled={isLoading !== null}
                                        id={`pricing-cta-${id}`}
                                        className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-300 ${highlight
                                            ? "text-black hover:scale-[1.02]"
                                            : "text-text-primary hover:bg-white/10"
                                            } ${isLoading === id ? "opacity-70 cursor-not-allowed" : ""}`}
                                        style={
                                            highlight
                                                ? {
                                                    background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                                    boxShadow: "0 0 20px rgba(0,242,255,0.35)",
                                                }
                                                : {
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                }
                                        }
                                    >
                                        {isLoading === id ? "Processing..." : cta}
                                    </button>

                                    {/* Features */}
                                    <ul className="space-y-3">
                                        {features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5 text-sm">
                                                <div
                                                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                    style={{
                                                        background:
                                                            color === "cyan"
                                                                ? "rgba(0,242,255,0.15)"
                                                                : "rgba(124,58,237,0.15)",
                                                    }}
                                                >
                                                    <Check
                                                        className={`w-2.5 h-2.5 ${color === "cyan" ? "text-electric-cyan" : "text-neon-purple"
                                                            }`}
                                                        strokeWidth={3}
                                                    />
                                                </div>
                                                <span className="text-text-secondary">{f}</span>
                                            </li>
                                        ))}
                                        {limitations.map((l) => (
                                            <li key={l} className="flex items-start gap-2.5 text-sm opacity-40">
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10">
                                                    <span className="text-[8px] text-text-muted">✕</span>
                                                </div>
                                                <span className="text-text-muted line-through">{l}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }
                    )}
                </div>

                {/* Enterprise note */}
                <p className="text-center text-text-muted text-sm mt-10">
                    Need a custom plan?{" "}
                    <a href="mailto:enterprise@pixelpure.ai" className="text-electric-cyan hover:underline">
                        Contact us
                    </a>{" "}
                    for enterprise pricing & white-label options.
                </p>
            </div>
        </section>
    );
}
