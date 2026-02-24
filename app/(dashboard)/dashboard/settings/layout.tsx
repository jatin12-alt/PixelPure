"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, CreditCard, Shield, ChevronRight } from "lucide-react";

const settingsNav = [
    { href: "/dashboard/settings/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings/notification", label: "Notifications", icon: Bell },
    { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard },
    { href: "/dashboard/settings/security", label: "Security", icon: Shield },
];

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    React.useEffect(() => {
        const currentLink = settingsNav.find(link => link.href === pathname);
        if (currentLink) {
            document.title = `${currentLink.label} | PixelPure`;
        } else {
            document.title = "Settings | PixelPure";
        }
    }, [pathname]);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gradient-cyan">Settings</h1>
                <p className="text-text-secondary mt-1">
                    Manage your account and preferences
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Sidebar */}
                <aside className="w-full md:w-64 space-y-2">
                    {settingsNav.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                    active
                                        ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                {active && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </aside>

                {/* Settings Content */}
                <div className="flex-1">
                    <div className="card-premium rounded-3xl p-6 md:p-8 min-h-[500px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
