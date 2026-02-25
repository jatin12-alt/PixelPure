import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Scale } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-pitch-black pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric-cyan transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
                    <p className="text-text-secondary">Last updated: February 25, 2026</p>
                </div>

                <div className="space-y-10">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-electric-cyan">
                            <EyeOff className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Your Images are Private</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            At PixelPure, we take your privacy seriously. Any images you upload for restoration are used solely for the purpose of performing the requested enhancement. We do not use your personal images to train our AI models.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-electric-cyan">
                            <Lock className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Data Retention</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            Uploaded images and their enhanced versions are stored temporarily on our secure Cloudinary servers. These assets are automatically scheduled for deletion after 24 hours to ensure your data doesn't persist longer than necessary.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-electric-cyan">
                            <ShieldCheck className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Account Information</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            We collect basic account information (email, name, profile picture) via Clerk to manage your subscription and credit balance. We never sell your personal information to third parties.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-electric-cyan">
                            <Scale className="w-6 h-6" />
                            <h2 className="text-xl font-bold">Legal Compliance</h2>
                        </div>
                        <p className="text-text-secondary leading-relaxed">
                            We comply with GDPR and CCPA regulations. You have the right to request a copy of your data or ask for its permanent deletion at any time through your account settings.
                        </p>
                    </section>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                    <p className="text-sm text-text-muted">
                        Questions about our privacy practices? Contact us at <a href="mailto:privacy@pixelpure.ai" className="text-electric-cyan hover:underline">privacy@pixelpure.ai</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
