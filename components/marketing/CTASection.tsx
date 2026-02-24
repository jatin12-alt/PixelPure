import Link from "next/link";
import { Loader2, ArrowRight, Zap, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function CTASection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(0,242,255,0.1) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <div
                    className="rounded-[2.5rem] p-8 md:p-16 text-center border overflow-hidden relative"
                    style={{
                        background: "rgba(10, 10, 15, 0.8)",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        boxShadow: "0 0 100px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    {/* Decorative mesh */}
                    <div className="absolute inset-0 bg-mesh-gradient opacity-20" />

                    <div className="relative z-10 space-y-8">
                        <div className="flex justify-center">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center glow-cyan"
                                style={{
                                    background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                }}
                            >
                                <Loader2 className="w-8 h-8 text-black" strokeWidth={2.5} />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Ready to see your <br />
                            <span className="text-gradient-cyan">photos in 4K?</span>
                        </h2>

                        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                            Join 500k+ creators and start enhancing your photos with the
                            most advanced AI restoration engine on the web.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <SignedOut>
                                <Link
                                    href="/dashboard/studio"
                                    className="relative inline-flex items-center gap-2.5 px-8 py-4 text-lg font-bold text-black rounded-2xl transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                        boxShadow: "0 0 30px rgba(0, 242, 255, 0.4)",
                                    }}
                                >
                                    <Loader2 className="w-5 h-5" />
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </SignedOut>
                            <SignedIn>
                                <Link
                                    href="/dashboard/studio"
                                    className="relative inline-flex items-center gap-2.5 px-8 py-4 text-lg font-bold text-black rounded-2xl transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                        boxShadow: "0 0 30px rgba(0, 242, 255, 0.4)",
                                    }}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Go to Studio
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </SignedIn>
                            <Link
                                href="/pricing"
                                className="px-8 py-4 text-lg font-semibold text-text-secondary hover:text-text-primary transition-colors"
                            >
                                View Plans & Pricing
                            </Link>
                        </div>

                        <p className="text-text-muted text-sm">
                            Free forever plan with 10 monthly credits · No credit card required
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
