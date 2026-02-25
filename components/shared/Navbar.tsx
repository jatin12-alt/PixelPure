"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/reviews", label: "Reviews" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "glass border-b border-white/5 shadow-nav-glass"
                    : "bg-transparent"
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                    boxShadow: "0 0 20px rgba(0, 242, 255, 0.4)",
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

                        {/* Desktop Nav Links */}
                        <ul className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ href, label }) => {
                                const active = pathname === href;
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                                                ? "text-electric-cyan bg-electric-cyan/10"
                                                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                                }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <SignedOut>
                                <Link
                                    href="/sign-in"
                                    className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/dashboard/studio"
                                    id="navbar-try-free-btn"
                                    className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black rounded-xl overflow-hidden transition-all duration-300 group"
                                    style={{
                                        background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                        boxShadow: "0 0 20px rgba(0, 242, 255, 0.35)",
                                    }}
                                >
                                    {/* Glow animation */}
                                    <span
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                            boxShadow: "0 0 40px rgba(0, 242, 255, 0.6)",
                                        }}
                                    />
                                    <Loader2 className="w-4 h-4 relative z-10" strokeWidth={2.5} />
                                    <span className="relative z-10">Try for Free</span>
                                </Link>
                            </SignedOut>
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                                >
                                    <Loader2 className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <div className="pl-2 border-l border-white/10 ml-2">
                                    <UserButton 
                                        appearance={{
                                            elements: {
                                                userButtonPopoverCard: "bg-[#0D0D15] border border-white/10 shadow-2xl",
                                                userButtonPopoverActionButton: "hover:bg-white/5 transition-all",
                                                userButtonPopoverActionButtonText: "text-white",
                                                userButtonPopoverFooter: "hidden"
                                            }
                                        }}
                                    />
                                </div>
                            </SignedIn>
                        </div>

                        {/* Mobile menu toggle */}
                        <button

                            type="button"
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/5 animate-fade-in duration-300">
                        <div className="p-4 space-y-2">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-4 rounded-2xl text-base font-medium transition-all ${pathname === href
                                        ? "text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/20"
                                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                                <SignedOut>
                                    <Link
                                        href="/sign-in"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center px-4 py-4 rounded-2xl text-base font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all border border-white/10"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/dashboard/studio"
                                        onClick={() => setMobileMenuOpen(false)}
                                        id="mobile-try-free-btn"
                                        className="flex items-center justify-center px-4 py-4 rounded-2xl text-base font-bold text-black transition-all"
                                        style={{
                                            background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                            boxShadow: "0 0 20px rgba(0, 242, 255, 0.35)",
                                        }}
                                    >
                                        Try for Free
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-base font-medium text-white bg-white/5 border border-white/10"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                    <div className="flex items-center justify-between px-4 py-4 rounded-2xl bg-white/5 border border-white/10">
                                        <span className="text-sm font-medium text-text-secondary">Manage Account</span>
                                        <UserButton />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
