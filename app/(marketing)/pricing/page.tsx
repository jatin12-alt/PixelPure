import type { Metadata } from "next";
import PricingSection from "@/components/marketing/PricingSection";

export const metadata: Metadata = {
    title: "Pricing | PixelPure",
    description:
        "Simple, transparent pricing for AI image restoration. Start free, scale as you grow.",
};

export default function PricingPage() {
    return (
        <div className="pt-24">
            <PricingSection fullPage />
        </div>
    );
}
