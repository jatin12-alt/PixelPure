import type { Metadata } from "next";
import { Share2, User, Gift, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Referral Program",
    description: "Invite your friends and earn free restoration credits",
};

export default function ReferralsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-cyan to-deep-purple flex items-center justify-center mx-auto glow-cyan mb-6">
                    <Gift className="w-8 h-8 text-black" strokeWidth={2.5} />
                </div>
                <h1 className="text-4xl font-black text-white">Give 10, Get 5</h1>
                <p className="text-text-secondary text-lg max-w-lg mx-auto">
                    Share PixelPure with your fellow creators. They get 10 extra credits on their first month, and you get 5 credits for every referral.
                </p>
            </div>

            {/* Referral Link Card */}
            <div className="card-premium rounded-3xl p-8 bg-surface-1 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                    <h2 className="text-xl font-bold text-white">Your Unique Referral Link</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex-1 w-full p-4 rounded-xl bg-black border border-white/10 text-text-secondary font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                            https://pixelpure.ai/ref/USER_12345
                        </div>
                        <Button variant="primary" className="w-full sm:w-auto">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Link
                        </Button>
                    </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-electric-cyan/5 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Referrals", value: "0", icon: User },
                    { label: "Pending Credits", value: "0", icon: Share2 },
                    { label: "Earned Credits", value: "0", icon: CheckCircle2 },
                ].map((stat) => (
                    <div key={stat.label} className="card-premium rounded-2xl p-6 bg-surface-2 text-center">
                        <stat.icon className="w-6 h-6 text-electric-cyan mx-auto mb-3" />
                        <p className="text-text-muted text-sm">{stat.label}</p>
                        <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* How it works */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { step: "1", title: "Share Link", desc: "Invite your friends using your unique referral link." },
                        { step: "2", title: "Friend Joins", desc: "They sign up and get 10 extra credits automatically." },
                        { step: "3", title: "Earn Rewards", desc: "You receive 5 credits immediately after their first scan." },
                    ].map((item) => (
                        <div key={item.step} className="text-center space-y-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto text-electric-cyan font-bold border border-white/10">
                                {item.step}
                            </div>
                            <h3 className="font-bold text-white">{item.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
