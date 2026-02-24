import type { Metadata } from "next";
import { CreditCard, Zap, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Billing & Subscription",
    description: "Manage your PixelPure plan and credits",
};

export default function BillingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
            <div>
                <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
                <p className="text-text-secondary mt-1">Manage your plan, credits, and payment methods.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Plan */}
                <div className="md:col-span-2 card-premium rounded-3xl p-8 bg-surface-1 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-sm font-medium text-text-muted uppercase tracking-wider">Current Plan</p>
                                <h2 className="text-3xl font-black text-white mt-1">Free Tier</h2>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                Active
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-text-secondary">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                <span>10 Free credits per month</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-secondary">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                <span>Basic AI upscaling (2x)</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-muted opacity-50">
                                <AlertCircle className="w-5 h-5" />
                                <span>Face restoration (Experimental)</span>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <Link href="/pricing">
                                <Button variant="primary">
                                    Upgrade to Pro
                                    <ArrowUpRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-deep-purple/5 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Credit Balance */}
                <div className="card-premium rounded-3xl p-8 bg-surface-2 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl glow-cyan flex items-center justify-center mb-6" style={{ background: 'rgba(0, 242, 255, 0.1)' }}>
                        <Zap className="w-7 h-7 text-electric-cyan" />
                    </div>
                    <p className="text-text-muted text-sm font-medium">Credits Remaining</p>
                    <h3 className="text-5xl font-black text-white mt-2">10</h3>
                    <p className="text-[10px] text-text-muted mt-4 uppercase tracking-widest">Resets in 12 days</p>
                    <Button variant="outline" size="sm" className="mt-8 w-full">Buy More</Button>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="card-premium rounded-3xl p-8 bg-surface-1">
                <h2 className="text-xl font-bold text-white mb-6">Payment Methods</h2>
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
                    <CreditCard className="w-12 h-12 text-text-muted mb-4 opacity-20" />
                    <p className="text-text-secondary mb-6 text-center">No payment methods saved. <br />Upgrade to a paid plan to add one.</p>
                    <Link href="/pricing">
                        <Button variant="outline">Add Payment Method</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
