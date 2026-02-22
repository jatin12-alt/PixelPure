import React from "react";
import type { Metadata } from "next";
import {
    Zap,
    TrendingUp,
    Clock,
    Sparkles,
    ArrowUpRight,
    Plus
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Dashboard Overview",
    description: "Monitor your AI image restoration usage and history",
};

const stats = [
    { label: "Total Enhanced", value: "24", icon: Sparkles, color: "cyan" },
    { label: "Remaining Credits", value: "3", icon: Zap, color: "cyan" },
    { label: "Hours Saved", value: "12.5", icon: Clock, color: "purple" },
    { label: "Quality Increase", value: "+400%", icon: TrendingUp, color: "purple" },
];

export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white leading-tight">
                        Welcome back, <span className="text-gradient-cyan">User</span>
                    </h1>
                    <p className="text-text-secondary mt-1">
                        You have 3 free credits remaining for this month.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/studio">
                        <Button variant="primary">
                            <Plus className="w-4 h-4 mr-2" />
                            New Restoration
                        </Button>
                    </Link>
                    <Link href="/pricing">
                        <Button variant="outline">Upgrade Plan</Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="card-premium rounded-2xl p-6 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={stat.color === "cyan" ? "text-electric-cyan" : "text-neon-purple"}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-text-muted">{stat.label}</p>
                            <h3 className="text-3xl font-black text-text-primary mt-1">{stat.value}</h3>
                        </div>
                        {/* Ambient background glow */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${stat.color === "cyan" ? "bg-electric-cyan" : "bg-deep-purple"
                            }`} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                        <Link href="/dashboard/gallery" className="text-sm text-electric-cyan hover:underline">
                            View All
                        </Link>
                    </div>

                    <div className="card-premium rounded-2xl p-8 text-center bg-surface-1">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-text-muted">
                                <Sparkles className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-text-secondary">No recent activity found. Start by enhancing your first image!</p>
                            <Link href="/dashboard/studio">
                                <Button variant="outline" size="sm">Go to Studio</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Pro Upgrades Sidebar */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Tips & Upgrades</h2>
                    <div className="card-premium rounded-2xl p-6 bg-gradient-to-br from-indigo-900/40 to-transparent border-indigo-500/20">
                        <h3 className="font-bold text-white mb-2">Want better results?</h3>
                        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                            GFPGAN v2 is now available for Pro users. Get more realistic skin textures and eye details.
                        </p>
                        <Link href="/pricing">
                            <Button variant="glow" size="sm" fullWidth>Learn More</Button>
                        </Link>
                    </div>

                    <div className="card-premium rounded-2xl p-6 bg-surface-1">
                        <h3 className="font-bold text-white mb-3 text-sm">Credits Usage</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">AI Enhancement</span>
                                <span className="text-text-primary font-bold">1 Credit</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">4x Upscaling</span>
                                <span className="text-text-primary font-bold">1 Credit</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Video AI (Beta)</span>
                                <span className="text-electric-cyan font-bold">5 Credits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
