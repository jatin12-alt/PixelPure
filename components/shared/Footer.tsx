import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Reviews", href: "/reviews" },
        { label: "Changelog", href: "/changelog" },
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/pixelpure", label: "Twitter" },
    { icon: Github, href: "https://github.com/pixelpure", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/pixelpure", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-surface-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2.5 group w-fit">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                    boxShadow: "0 0 20px rgba(0, 242, 255, 0.35)",
                                }}
                            >
                                <Sparkles className="w-4 h-4 text-black" strokeWidth={2.5} />
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
                        <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                            Restore, enhance, and upscale your photos with state-of-the-art AI.
                            Trusted by over 500k creators worldwide.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-text-muted hover:text-electric-cyan transition-all duration-200 hover:bg-electric-cyan/10 border border-white/8 hover:border-electric-cyan/30"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                                {title}
                            </h3>
                            <ul className="space-y-3">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-text-secondary hover:text-electric-cyan transition-colors duration-200"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-xs font-medium">
                        © {new Date().getFullYear()} PixelPure AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-text-muted hover:text-text-secondary text-xs transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-text-muted hover:text-text-secondary text-xs transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/contact" className="text-text-muted hover:text-text-secondary text-xs transition-colors">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
