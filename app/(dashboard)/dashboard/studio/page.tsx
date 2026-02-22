import type { Metadata } from "next";
import { Sparkles, Upload, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Studio",
    description: "AI Image Restoration Studio — upload and enhance your images",
};

export default function StudioPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gradient-cyan">AI Studio</h1>
                <p className="text-text-secondary mt-1">
                    Upload an image and let AI restore it to stunning quality
                </p>
            </div>

            {/* Upload Zone */}
            <div className="card-premium rounded-2xl p-8 text-center group cursor-pointer hover:border-electric-cyan/30 transition-all duration-300">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl glass-cyan flex items-center justify-center glow-cyan">
                        <Upload className="w-9 h-9 text-electric-cyan" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-text-primary">
                            Drop your image here
                        </h2>
                        <p className="text-text-secondary text-sm mt-1">
                            Supports JPG, PNG, WebP up to 20MB
                        </p>
                    </div>
                    <button className="btn-primary">
                        <Sparkles className="w-4 h-4" />
                        Choose Image
                    </button>
                </div>
            </div>

            {/* Enhancement Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    {
                        icon: Sparkles,
                        title: "Face Restore",
                        desc: "Enhance facial features and details",
                        color: "cyan",
                    },
                    {
                        icon: Zap,
                        title: "4x Upscale",
                        desc: "Increase resolution dramatically",
                        color: "purple",
                    },
                    {
                        icon: Upload,
                        title: "Denoise",
                        desc: "Remove grain and noise artifacts",
                        color: "cyan",
                    },
                ].map((option) => (
                    <div key={option.title} className="card-premium rounded-xl p-5 cursor-pointer group">
                        <div
                            className={`w-10 h-10 rounded-lg ${option.color === "cyan" ? "glass-cyan" : "glass-purple"
                                } flex items-center justify-center mb-3`}
                        >
                            <option.icon
                                className={`w-5 h-5 ${option.color === "cyan" ? "text-electric-cyan" : "text-neon-purple"
                                    }`}
                            />
                        </div>
                        <h3 className="font-semibold text-text-primary">{option.title}</h3>
                        <p className="text-text-secondary text-sm mt-1">{option.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
