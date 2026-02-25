"use client";

import { useState, useRef, ChangeEvent, MouseEvent, useEffect } from "react";
import { Bell, Loader2, Upload, Zap, Download, Share2, Sparkles, Image as ImageIcon, History, Maximize2, MoveHorizontal } from "lucide-react";
import ScanReveal from "@/components/ui/ScanReveal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudioPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Studio | PixelPure";
        fetchCredits();
    }, []);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [restoredUrl, setRestoredUrl] = useState<string | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [credits, setCredits] = useState<number | null>(null);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchCredits = async () => {
        try {
            const res = await fetch("/api/user/credits");
            if (res.ok) {
                const data = await res.json();
                setCredits(data.credits);
            }
        } catch (error) {
            console.error("Fetch credits error:", error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                };
                img.src = reader.result as string;
                setSelectedImage(reader.result as string);
                setRestoredUrl(null);
                setOriginalUrl(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadAndRestore = async () => {
        if (!originalFile) return;

        if (credits !== null && credits <= 0) {
            toast.error("Insufficient credits", {
                description: "Please buy more credits to continue restoring images.",
            });
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", originalFile);
            formData.append("upload_preset", "pixelpure_preset");

            const response = await fetch("https://api.cloudinary.com/v1_1/ddu3hkwmg/image/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            const secureUrl = data.secure_url;

            const getPublicIdWithExtension = (url: string) => {
                const parts = url.split('/');
                return parts[parts.length - 1];
            };
            const publicIdWithExt = getPublicIdWithExtension(secureUrl);
            const cloudName = "ddu3hkwmg";

            const restored = `https://res.cloudinary.com/${cloudName}/image/upload/e_improve,w_1000,q_auto,f_auto/v${Date.now()}/${publicIdWithExt}`;

            const creditRes = await fetch("/api/user/credits", { method: "POST" });
            if (!creditRes.ok) {
                if (creditRes.status === 403) throw new Error("You have run out of credits!");
                throw new Error("Credit deduction failed");
            }
            const creditData = await creditRes.json();
            
            await fetch("/api/images", {
                method: "POST",
                body: JSON.stringify({
                    originalUrl: secureUrl,
                    enhancedUrl: restored,
                    enhancementType: "pro-photography",
                }),
            });
            
            setCredits(creditData.credits);
            router.refresh();

            setOriginalUrl(secureUrl);
            setRestoredUrl(restored);
            toast.success("Image restored successfully!");
        } catch (error: any) {
            console.error("Restoration error:", error);
            toast.error(error.message || "Restoration failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = async () => {
        if (!restoredUrl) return;
        try {
            toast.loading("Preparing download...", { id: "download-toast" });
            const response = await fetch(restoredUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `pixelpure-restored-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download started!", { id: "download-toast" });
        } catch (error) {
            toast.error("Download failed", { id: "download-toast" });
        }
    };

    const handleChooseImage = () => {
        if (restoredUrl) return;
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setSelectedImage(null);
        setOriginalFile(null);
        setRestoredUrl(null);
        setOriginalUrl(null);
        setImageDimensions(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="h-full flex flex-col lg:flex-row gap-6 pb-12">
            {/* Left Sidebar: AI Filters & Enhance */}
            <aside className="w-full lg:w-80 flex flex-col gap-6 order-2 lg:order-1">
                <div className="card-premium rounded-3xl p-6 space-y-6 border-white/10 sticky top-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-electric-cyan" />
                            AI Filters
                        </h2>
                        <p className="text-xs text-text-secondary uppercase tracking-widest font-bold">Enhancement Options</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { id: 'face', label: 'Face Enhance', icon: Zap },
                            { id: 'bg', label: 'Background Enhance', icon: ImageIcon },
                            { id: 'denoise', label: 'Remove Noise', icon: Bell },
                            { id: 'upscale', label: '4K Upscale', icon: Maximize2 },
                        ].map((filter) => (
                            <div key={filter.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-electric-cyan/10 transition-colors">
                                        <filter.icon className="w-4 h-4 text-text-secondary group-hover:text-electric-cyan" />
                                    </div>
                                    <span className="text-sm font-bold text-text-secondary group-hover:text-white">{filter.label}</span>
                                </div>
                                <div className="w-10 h-5 bg-white/10 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between text-xs px-1">
                            <span className="text-text-secondary font-bold uppercase">Credit Cost</span>
                            <span className="text-electric-cyan font-black">1 CREDIT</span>
                        </div>
                        <button
                            disabled={!selectedImage || isUploading || (credits !== null && credits <= 0)}
                            onClick={handleUploadAndRestore}
                            className="w-full relative inline-flex items-center justify-center gap-3 px-8 py-5 text-base font-black text-black rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                            style={{
                                background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                boxShadow: "0 0 25px rgba(0, 242, 255, 0.4)",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5 fill-current" />
                                    Enhance Now
                                </>
                            )}
                        </button>
                        {credits !== null && credits <= 0 && (
                            <p className="text-center text-[10px] text-red-400 font-bold uppercase animate-pulse">Insufficient Credits</p>
                        )}
                    </div>
                </div>
            </aside>

            {/* Center Workspace: Comparison Slider */}
            <main className="flex-1 flex flex-col gap-6 order-1 lg:order-2 min-w-0">
                <div className="flex-1 card-premium rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col min-h-[500px] lg:min-h-[600px] relative bg-pitch-black/50">
                    {!selectedImage ? (
                        <div 
                            onClick={handleChooseImage}
                            className="flex-1 flex flex-col items-center justify-center p-12 text-center group cursor-pointer transition-all duration-500"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                title="Upload an image"
                                aria-label="Upload an image"
                                placeholder="Choose an image file"
                            />
                            <div className="w-24 h-24 rounded-[2rem] glass-cyan flex items-center justify-center glow-cyan transition-transform duration-500 group-hover:scale-110 mb-8">
                                <Upload className="w-10 h-10 text-electric-cyan" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-3">Drop image to start</h2>
                            <p className="text-text-secondary text-lg max-w-sm">Supports JPG, PNG, WebP up to 20MB</p>
                        </div>
                    ) : (
                        <>
                            {/* Labels Header */}
                            <div className="flex items-center justify-between px-8 py-4 bg-white/[0.02] border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black tracking-widest text-text-muted uppercase">Before</span>
                                    <div className="h-px w-8 bg-white/10" />
                                </div>
                                {restoredUrl && (
                                    <div className="flex items-center gap-2">
                                        <div className="h-px w-8 bg-electric-cyan/30" />
                                        <span className="text-[10px] font-black tracking-widest text-electric-cyan uppercase">After</span>
                                    </div>
                                )}
                            </div>

                            {/* Slider / Preview Area */}
                            <div className="flex-1 relative p-4 lg:p-8 flex items-center justify-center min-h-0">
                                {restoredUrl && originalUrl ? (
                                    <div className="w-full h-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-fade-in">
                                        <ScanReveal
                                            beforeSrc={originalUrl}
                                            afterSrc={restoredUrl}
                                            aspectRatio="16/9"
                                            duration={3000}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative max-w-4xl max-h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={selectedImage} alt="Preview" className="max-w-full max-h-[500px] object-contain" />
                                        <button onClick={removeImage} title="Remove image" aria-label="Remove image" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500/80 transition-all z-10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Workspace Footer */}
                            <div className="px-8 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                                {restoredUrl && (
                                    <div className="flex items-center gap-2 text-text-secondary animate-pulse">
                                        <MoveHorizontal className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Drag slider to compare</span>
                                    </div>
                                )}
                                {imageDimensions && (
                                    <div className="flex items-center gap-3 ml-auto">
                                        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-text-muted">
                                            {imageDimensions.width} × {imageDimensions.height} PX
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Right Sidebar: Actions & History */}
            <aside className="w-full lg:w-72 flex flex-col gap-6 order-3">
                {/* Actions */}
                <div className="card-premium rounded-3xl p-6 space-y-6 border-white/10">
                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Download className="w-4 h-4 text-neon-purple" />
                            Export
                        </h2>
                        <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Save your results</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            disabled={!restoredUrl}
                            onClick={handleDownload}
                            className="w-full py-4 rounded-2xl bg-white text-black font-black text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale"
                        >
                            Download HD
                        </button>
                        <p className="text-[10px] text-center text-text-muted font-bold">PRO Tip: No watermark on HD export</p>
                    </div>

                    <div className="flex gap-2">
                        <button disabled={!restoredUrl} onClick={() => toast("Share feature coming soon!")} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 disabled:opacity-30">
                            <Share2 className="w-3.5 h-3.5" />
                            Share
                        </button>
                        <button onClick={removeImage} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10">
                            Reset
                        </button>
                    </div>
                </div>

                {/* Mini History Placeholder */}
                <div className="flex-1 card-premium rounded-3xl p-6 border-white/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                            <History className="w-3.5 h-3.5" />
                            Recent
                        </h3>
                        <Link href="/dashboard/gallery" className="text-[10px] font-bold text-electric-cyan hover:underline">View All</Link>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-dashed border-white/10">
                        <ImageIcon className="w-8 h-8 text-white/5 mb-2" />
                        <p className="text-[10px] text-text-muted font-bold uppercase leading-tight">Your recent<br/>images appear here</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
