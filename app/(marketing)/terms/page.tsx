import React from "react";
import Link from "next/link";
import { ArrowLeft, Gavel, AlertTriangle, CreditCard, ShieldAlert } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-pitch-black pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric-cyan transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-white">Terms of Service</h1>
                    <p className="text-text-secondary">Last updated: February 25, 2026</p>
                </div>

                <div className="space-y-10">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-neon-purple">
                            <Gavel className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Acceptance of Terms</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            By accessing and using PixelPure, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-neon-purple">
                            <CreditCard className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Credits and Subscriptions</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            PixelPure operates on a credit-based system. Credits purchased are non-refundable unless required by law. Subscriptions can be cancelled at any time through your billing settings.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-neon-purple">
                            <ShieldAlert className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Acceptable Use</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            You agree not to use PixelPure to process illegal, harmful, or copyright-infringing content. We reserve the right to terminate accounts that violate our usage policies.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-neon-purple">
                            <AlertTriangle className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Limitation of Liability</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            PixelPure is provided "as is". While we strive for the highest quality AI restoration, we cannot guarantee perfect results for every image and are not liable for any data loss or unsatisfactory outcomes.
                        </p>
                    </section>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                    <p className="text-sm text-text-muted">
                        Legal inquiries can be directed to <a href="mailto:legal@pixelpure.ai" className="text-neon-purple hover:underline">legal@pixelpure.ai</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
