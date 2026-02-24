import type { Metadata } from "next";
import TestimonialsSection from "@/components/marketing/TestimonialsSection";

export const metadata: Metadata = {
    title: "Reviews | PixelPure",
    description:
        "See what thousands of users say about PixelPure's AI image restoration.",
};

export default function ReviewsPage() {
    return (
        <div className="pt-24">
            <TestimonialsSection fullPage />
        </div>
    );
}
