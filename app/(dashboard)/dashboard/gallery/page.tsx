"use client";

import { useEffect, useState } from "react";
import { Loader2, Download, Zap, Calendar, ExternalLink, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface ImageHistory {
    id: string;
    originalUrl: string;
    enhancedUrl: string;
    enhancementType: string;
    createdAt: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<ImageHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("/api/images");
                if (res.ok) {
                    const data = await res.json();
                    setImages(data);
                }
            } catch (error) {
                console.error("Fetch images error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    const handleDownload = async (url: string, id: string) => {
        try {
            toast.loading("Preparing download...", { id: `download-${id}` });
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `pixelpure-restored-${id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
            toast.success("Download started!", { id: `download-${id}` });
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Download failed", { id: `download-${id}` });
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-electric-cyan animate-spin" />
                <p className="text-text-secondary font-medium animate-pulse">Loading your masterpieces...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gradient-cyan">Gallery</h1>
                    <p className="text-text-secondary mt-1">
                        All your enhanced images in one place
                    </p>
                </div>
                {images.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-text-secondary">
                        <ImageIcon className="w-4 h-4 text-electric-cyan" />
                        {images.length} {images.length === 1 ? 'Image' : 'Images'}
                    </div>
                )}
            </div>

            {images.length === 0 ? (
                /* Empty State */
                <div className="card-premium rounded-[2.5rem] p-12 md:p-24 text-center border-white/5 bg-surface-1/50 backdrop-blur-sm animate-fade-in">
                    <div className="flex flex-col items-center gap-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center glow-cyan">
                                <ImageIcon className="w-10 h-10 text-text-muted/40" strokeWidth={1.5} /> 
                            </div>
                            <div className="absolute -right-2 -bottom-2 w-10 h-10 rounded-2xl glass-purple flex items-center justify-center glow-purple animate-bounce-subtle">
                                <Zap className="w-5 h-5 text-neon-purple" />
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
                            <Button variant="primary" size="lg" className="px-10 font-bold h-14 rounded-2xl shadow-xl hover:shadow-cyan-500/20">
                                <Zap className="w-5 h-5 mr-2" />
                                Start Restoring
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                /* Image Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
                    {images.map((img) => (
                        <div key={img.id} className="group card-premium rounded-3xl overflow-hidden border border-white/10 hover:border-electric-cyan/30 transition-all duration-500 flex flex-col">
                            {/* Image Preview */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={img.enhancedUrl} 
                                    alt="Enhanced" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div className="flex gap-2 w-full">
                                        <button 
                                            onClick={() => handleDownload(img.enhancedUrl, img.id)}
                                            className="flex-1 bg-electric-cyan text-black py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Download HD
                                        </button>
                                        <a 
                                            href={img.enhancedUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-11 h-11 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30 backdrop-blur-md uppercase">
                                    {img.enhancementType}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                <div className="flex items-center justify-between text-xs text-text-secondary">
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(img.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center gap-1 font-bold text-white/40">
                                        ID: {img.id.slice(-6).toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
