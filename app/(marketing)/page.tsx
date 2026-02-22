import type { Metadata } from "next";
import HeroSection from "@/components/marketing/HeroSection";
import ImageReveal from "@/components/ui/ImageReveal";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import TestimonialsSection from "@/components/marketing/TestimonialsSection";
import PricingSection from "@/components/marketing/PricingSection";
import CTASection from "@/components/marketing/CTASection";

export const metadata: Metadata = {
    title: "PixelPure — AI Image Restoration",
    description:
        "Restore, enhance, and upscale your photos with cutting-edge AI. Transform blurry, old, or low-resolution images into stunning HD quality in seconds.",
};

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ImageReveal />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </>
    );
}
