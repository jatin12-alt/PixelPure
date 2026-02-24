import type { Metadata } from "next";
import * as Icons from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Gallery | PixelPure",
    description: "Your enhanced images gallery",
};

export default function GalleryPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gradient-cyan">Gallery</h1>
                    <p className="text-text-secondary mt-1">
                        All your enhanced images in one place
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-text-secondary hover:text-white transition-all">
                    <Icons.Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Empty State */}
            <div className="card-premium rounded-[2.5rem] p-12 md:p-24 text-center border-white/5 bg-surface-1/50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center glow-cyan">
                            <Icons.Image className="w-10 h-10 text-text-muted/40" strokeWidth={1.5} />
                        </div>
                        <div className="absolute -right-2 -bottom-2 w-10 h-10 rounded-2xl glass-purple flex items-center justify-center glow-purple animate-bounce-subtle">
                            <Icons.Sparkles className="w-5 h-5 text-neon-purple" />
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            Your gallery is empty
                        </h2>
                        <p className="text-text-secondary text-base md:text-lg max-w-sm mx-auto leading-relaxed">
                            Transform your low-quality photos into stunning HD masterpieces today.
                        </p>
                    </div>

                    <Link href="/dashboard/studio">
                        <Button variant="primary" size="lg" className="px-10 font-bold h-14 rounded-2xl">
                            <Icons.Zap className="w-5 h-5 mr-2" />
                            Start Restoring
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
