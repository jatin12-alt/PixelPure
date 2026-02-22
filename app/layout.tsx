import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs"; // 1. Clerk import kiya
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: {
        default: "PixelPure — AI Image Restoration",
        template: "%s | PixelPure",
    },
    description:
        "Restore, enhance, and upscale your photos with cutting-edge AI. Transform blurry, old, or low-resolution images into stunning HD quality in seconds.",
    keywords: [
        "AI image restoration",
        "photo enhancer",
        "image upscaling",
        "face restoration",
        "AI photo editor",
        "image denoising",
    ],
    authors: [{ name: "PixelPure" }],
    creator: "PixelPure",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://pixelpure.ai",
        title: "PixelPure — AI Image Restoration",
        description:
            "Transform blurry, grainy photos into stunning HD quality with AI",
        siteName: "PixelPure",
    },
    twitter: {
        card: "summary_large_image",
        title: "PixelPure — AI Image Restoration",
        description: "Transform blurry, grainy photos into stunning HD quality with AI",
        creator: "@pixelpure",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // 2. ClerkProvider se wrap kiya
        <ClerkProvider
          appearance={{
            baseTheme: undefined, // Yahan dark theme add kar sakte ho later
          }}
        >
            <html lang="en" className={inter.variable} suppressHydrationWarning>
                <body className="min-h-screen bg-black text-white antialiased">
                    {/* Ambient Background Orbs */}
                    <div className="ambient-purple" aria-hidden="true" />
                    <div className="ambient-cyan" aria-hidden="true" />

                    {/* Main Content */}
                    <div className="relative z-10">{children}</div>

                    {/* Razorpay Script */}
                    <Script
                        src="https://checkout.razorpay.com/v1/checkout.js"
                        strategy="lazyOnload"
                    />
                </body>
            </html>
        </ClerkProvider>
    );
}