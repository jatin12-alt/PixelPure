import Link from "next/link";
import { Button } from "@/components/ui/Button";
import * as Icons from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-4">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-cyan/5 rounded-full blur-3xl" />

            <div className="relative z-10 text-center space-y-8">
                {/* 404 Visual */}
                <div className="relative inline-block">
                    <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter opacity-10 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl glass-cyan flex items-center justify-center glow-cyan animate-bounce-subtle">
                            <Icons.AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-electric-cyan" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 max-w-md mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-white">
                        Lost in the <span className="text-gradient-cyan">Pixels?</span>
                    </h2>
                    <p className="text-text-secondary text-lg">
                        The page you're looking for has been denoised out of existence or moved to a higher resolution.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold">
                            <Icons.Home className="w-4 h-4 mr-2" />
                            Go Back Home
                        </Button>
                    </Link>
                    <Link href="/dashboard/studio">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold border-white/10">
                            <Icons.Sparkles className="w-4 h-4 mr-2" />
                            Start Restoring
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-text-muted text-xs font-medium tracking-widest uppercase">
                PixelPure — AI Restoration
            </div>
        </div>
    );
}
