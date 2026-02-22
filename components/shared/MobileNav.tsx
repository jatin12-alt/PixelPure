"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, ImageIcon, User } from "lucide-react";

const mobileNavItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/dashboard/studio", icon: Sparkles, label: "Studio" },
    { href: "/dashboard/gallery", icon: ImageIcon, label: "Gallery" },
    { href: "/dashboard/settings", icon: User, label: "Profile" },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            aria-label="Mobile navigation"
        >
            {/* Gradient blur backdrop */}
            <div
                className="backdrop-blur-xl border-t"
                style={{
                    background: "rgba(10, 10, 15, 0.85)",
                    borderColor: "rgba(255,255,255,0.06)",
                }}
            >
                <div className="flex items-center justify-around px-2 py-2 pb-safe">
                    {mobileNavItems.map(({ href, icon: Icon, label }) => {
                        const active = pathname === href || pathname.startsWith(href + "/");
                        const isStudio = label === "Studio";

                        return (
                            <Link
                                key={href}
                                href={href}
                                id={`mobile-nav-${label.toLowerCase()}`}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px] ${isStudio
                                        ? "relative"
                                        : active
                                            ? "text-electric-cyan"
                                            : "text-text-muted hover:text-text-secondary"
                                    }`}
                                aria-current={active ? "page" : undefined}
                            >
                                {isStudio ? (
                                    /* Special glowing Studio button */
                                    <div
                                        className={`w-12 h-12 -mt-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${active ? "scale-110" : "hover:scale-105"
                                            }`}
                                        style={{
                                            background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                            boxShadow: active
                                                ? "0 0 30px rgba(0, 242, 255, 0.6), 0 0 60px rgba(0, 242, 255, 0.3)"
                                                : "0 0 20px rgba(0, 242, 255, 0.3)",
                                        }}
                                    >
                                        <Icon className="w-5 h-5 text-black" strokeWidth={2.5} />
                                    </div>
                                ) : (
                                    <div className={`relative ${active ? "" : ""}`}>
                                        <Icon
                                            className={`w-5 h-5 transition-all duration-200 ${active ? "text-electric-cyan" : ""
                                                }`}
                                            strokeWidth={active ? 2.5 : 1.5}
                                        />
                                        {active && (
                                            <span
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                                style={{ background: "#00F2FF" }}
                                            />
                                        )}
                                    </div>
                                )}

                                <span
                                    className={`text-[10px] font-medium transition-all ${isStudio ? "mt-1" : ""
                                        } ${active && !isStudio ? "text-electric-cyan" : ""}`}
                                >
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
