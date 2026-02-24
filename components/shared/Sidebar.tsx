"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Sparkles,
    ImageIcon,
    Settings,
    LayoutDashboard,
    CreditCard,
    Share2,
    ChevronRight,
    Loader2,
    Gift,
    ArrowLeft,
} from "lucide-react";

const navItems = [
    {
        section: "Workspace",
        items: [
            { href: "/dashboard/studio", icon: Sparkles, label: "Studio", badge: null },
            { href: "/dashboard/gallery", icon: ImageIcon, label: "Gallery", badge: null },
            { href: "/dashboard", icon: LayoutDashboard, label: "Overview", badge: null },
        ],
    },
    {
        section: "Account",
        items: [
            { href: "/dashboard/settings", icon: Settings, label: "Settings", badge: null },
            { href: "/pricing", icon: CreditCard, label: "Upgrade", badge: "PRO" },
            {
                href: "/dashboard/referrals",
                icon: Share2,
                label: "Referrals",
                badge: "NEW",
            },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [credits, setCredits] = useState<number | null>(null);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const res = await fetch("/api/user/credits");
                if (res.ok) {
                    const data = await res.json();
                    setCredits(data.credits);
                }
            } catch (error) {
                console.error("Sidebar credits error:", error);
            }
        };
        fetchCredits();
    }, [pathname]); // Refresh when navigating

    return (
        <aside className="hidden md:flex w-64 flex-col h-full border-r border-white/5 bg-surface-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                        style={{
                            background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                            boxShadow: "0 0 20px rgba(0, 242, 255, 0.35)",
                        }}
                    >
                        <Loader2 className="w-4 h-4 text-black" strokeWidth={2.5} />    
                    </div>
                    <span
                        className="text-xl font-black tracking-tight"
                        style={{
                            background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        PixelPure
                    </span>
                </Link>
            </div>

            {/* Back to Home/Studio Link */}
            <div className="px-4 pt-4">
                <Link 
                    href="/"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-electric-cyan hover:bg-white/5 transition-all group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>

            {/* Credits Card */}
            <div className="px-4 pt-2">
                <div
                    className="rounded-xl p-4 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(0,242,255,0.08), rgba(124,58,237,0.08))",
                        border: "1px solid rgba(0,242,255,0.15)",
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-electric-cyan" />
                            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                Credits
                            </span>
                        </div>
                        <span className="text-xs font-bold text-electric-cyan">FREE</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-text-primary">{credits ?? "..."}</span>
                        <span className="text-text-muted text-sm mb-1">/ 10 remaining</span>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${((credits ?? 0) / 10) * 100}%`,
                                background: "linear-gradient(90deg, #00F2FF, #7C3AED)",
                            }}
                        />
                    </div>
                    <Link
                        href="/pricing"
                        className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                        style={{
                            background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                            color: "#000",
                        }}
                    >
                        <Loader2 className="w-3.5 h-3.5" />
                        Get More Credits
                    </Link>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto scrollbar-hidden">
                {navItems.map(({ section, items }) => (
                    <div key={section}>
                        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            {section}
                        </p>
                        <ul className="space-y-1">
                            {items.map(({ href, icon: Icon, label, badge }) => {
                                const active =
                                    pathname === href ||
                                    (href !== "/dashboard" && pathname.startsWith(href));
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            id={`sidebar-nav-${label.toLowerCase()}`}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active
                                                    ? "text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/20"
                                                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                                }`}
                                            aria-current={active ? "page" : undefined}
                                        >
                                            <Icon
                                                className={`w-4 h-4 flex-shrink-0 transition-colors ${active ? "text-electric-cyan" : "group-hover:text-text-primary"
                                                    }`}
                                                strokeWidth={active ? 2.5 : 1.75}
                                            />
                                            <span className="flex-1">{label}</span>
                                            {badge && (
                                                <span
                                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badge === "PRO"
                                                            ? "bg-deep-purple/30 text-neon-purple"
                                                            : badge === "NEW"
                                                                ? "bg-electric-cyan/20 text-electric-cyan"
                                                                : "bg-white/10 text-text-secondary"
                                                        }`}
                                                >
                                                    {badge}
                                                </span>
                                            )}
                                            {active && (
                                                <ChevronRight className="w-3.5 h-3.5 text-electric-cyan opacity-60" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Referral System Placeholder */}
            <div className="px-4 py-4 border-t border-white/5">
                <div
                    className="rounded-xl p-4 cursor-pointer group transition-all duration-300 hover:border-deep-purple/40"
                    style={{
                        background: "rgba(124,58,237,0.06)",
                        border: "1px solid rgba(124,58,237,0.2)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg glass-purple flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Gift className="w-4 h-4 text-neon-purple" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">
                                Refer & Earn
                            </p>
                            <p className="text-xs text-text-muted truncate">
                                Get 5 credits per referral
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-neon-purple transition-colors flex-shrink-0" />
                    </div>
                </div>

                {/* User Profile Mini */}
                <div className="mt-3 flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-black"
                        style={{ background: "linear-gradient(135deg, #00F2FF, #7C3AED)" }}
                    >
                        U
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">User</p>
                        <p className="text-xs text-text-muted truncate">Free Plan</p>
                    </div>
                    <Settings className="w-3.5 h-3.5 text-text-muted group-hover:text-text-secondary transition-colors" />
                </div>
            </div>
        </aside>
    );
}
