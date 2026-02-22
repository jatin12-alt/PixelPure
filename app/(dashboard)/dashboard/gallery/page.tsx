import type { Metadata } from "next";
import { ImageIcon, Filter } from "lucide-react";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Your enhanced images gallery",
};

export default function GalleryPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient-cyan">Gallery</h1>
                    <p className="text-text-secondary mt-1">
                        All your enhanced images in one place
                    </p>
                </div>
                <button className="btn-ghost flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Empty State */}
            <div className="card-premium rounded-2xl p-16 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
                        <ImageIcon className="w-9 h-9 text-text-muted" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-text-primary">
                            No images yet
                        </h2>
                        <p className="text-text-secondary text-sm mt-1">
                            Go to Studio to enhance your first image
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
