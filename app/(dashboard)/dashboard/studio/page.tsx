"use client";

import { useState, useRef, ChangeEvent, MouseEvent, useEffect } from "react";
import { Bell, Loader2, Upload, Zap } from "lucide-react";
import ScanReveal from "@/components/ui/ScanReveal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

            // Apply Advanced AI Chaining: Restore -> Upscale -> Enhance -> Improve with cache busting
            const restored = secureUrl.replace("/upload/", `/upload/e_gen_restore/e_upscale/e_enhance/e_improve/v${Date.now()}/`);

            // Deduct 1 credit
            const creditRes = await fetch("/api/user/credits", { method: "POST" });
            if (!creditRes.ok) {
                if (creditRes.status === 403) {
                    throw new Error("You have run out of credits!");
                }
                throw new Error("Credit deduction failed");
            }
            const creditData = await creditRes.json();
            setCredits(creditData.credits);
            router.refresh();

            setOriginalUrl(secureUrl);
            setRestoredUrl(restored);
            toast.success("Image restored successfully!", {
                description: "Your HD version is ready for download.",
            });
        } catch (error: any) {
            console.error("Restoration error:", error);
            toast.error(error.message || "Restoration failed", {
                description: "Please check your connection and try again.",
            });
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
            console.error("Download error:", error);
            toast.error("Download failed", { id: "download-toast" });
        }
    };

    const handleChooseImage = () => {
        if (restoredUrl) return; // Don't trigger file picker if already restored
        fileInputRef.current?.click();
    };

    const removeImage = (e: MouseEvent) => {
        e.stopPropagation();
        setSelectedImage(null);
        setOriginalFile(null);
        setRestoredUrl(null);
        setOriginalUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gradient-cyan">AI Studio</h1>
                <p className="text-text-secondary mt-1">
                    Upload an image and let AI restore it to stunning quality
                </p>
            </div>

            {/* Main Stage */}
            <div className="space-y-6">
                {restoredUrl && originalUrl ? (
                    <div className="card-premium rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in">
                        <ScanReveal
                            beforeSrc={originalUrl}
                            afterSrc={restoredUrl}
                            beforeAlt="Original Image"
                            afterAlt="AI Restored Image"
                            aspectRatio="16/9"
                            duration={3000}
                        />
                        <div className="p-6 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl glass-cyan flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-electric-cyan" /> 
                                </div>
                                <div>
                                    <p className="text-white font-bold">Restoration Complete</p>
                                    <p className="text-xs text-text-secondary">Generated via Generative Restore</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={removeImage}
                                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-text-secondary hover:text-white transition-colors"
                                >
                                    Start New
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-black transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                        boxShadow: "0 0 20px rgba(0, 242, 255, 0.4)",
                                    }}
                                >
                                    Download HD
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={handleChooseImage}
                        className={`card-premium rounded-3xl p-8 text-center group cursor-pointer hover:border-electric-cyan/30 transition-all duration-500 relative overflow-hidden ${selectedImage ? "min-h-[400px] flex items-center justify-center" : "min-h-[300px] flex flex-col justify-center"
                            }`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            aria-label="Upload image"
                        />

                        {!selectedImage ? (
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl glass-cyan flex items-center justify-center glow-cyan transition-transform duration-500 group-hover:scale-110">
                                    <Upload className="w-10 h-10 text-electric-cyan" strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-text-primary">
                                        Drop your image here
                                    </h2>
                                    <p className="text-text-secondary text-base">
                                        Supports JPG, PNG, WebP up to 20MB
                                    </p>
                                </div>
                                <button
                                    onClick={handleChooseImage}
                                    className="relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{
                                        background: "linear-gradient(135deg, #00F2FF, #0EA5E9)",
                                        boxShadow: "0 0 20px rgba(0, 242, 255, 0.4)",
                                    }}
                                >
                                    <Zap className="w-4 h-4" />
                                    Choose Image
                                </button>
                            </div>
                        ) : (
                            <div className="relative w-full h-full min-h-[400px] flex items-center justify-center animate-fade-in duration-500">
                                <div className="relative max-w-full max-h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedImage as string}
                                        alt="Preview"
                                        className="max-w-full max-h-[500px] object-contain"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <p className="text-white font-bold px-4 py-2 bg-black/60 rounded-full backdrop-blur-md border border-white/20">
                                            Change Image
                                        </p>
                                    </div>
                                </div>
                                <button
                                    aria-label="Remove image"
                                    onClick={removeImage}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500/80 transition-all duration-300 z-10"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Enhancement Options */}
            {!restoredUrl && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Zap,
                            title: "Face Restore",
                            desc: "Enhance facial features and details",
                            color: "cyan",
                        },
                        {
                            icon: Zap,
                            title: "Enhance Now",
                            desc: "Apply all enhancements to your image",
                            color: "cyan",
                        },
                        {
                            icon: Loader2,
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
                        <div key={option.title} className="card-premium rounded-2xl p-6 cursor-pointer group hover:bg-white/[0.03] transition-all">
                            <div
                                className={`w-12 h-12 rounded-xl ${option.color === "cyan" ? "glass-cyan" : "glass-purple"
                                    } flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                            >
                                <option.icon
                                    className={`w-6 h-6 ${option.color === "cyan" ? "text-electric-cyan" : "text-neon-purple"
                                        }`}
                                />
                            </div>
                            <h3 className="font-bold text-text-primary text-lg">{option.title}</h3>
                            <p className="text-text-secondary text-sm mt-2 leading-relaxed">{option.desc}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Action Bar (Only visible when image is selected and not yet restored) */}
            {selectedImage && !restoredUrl && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50 animate-fade-up duration-500">
                    <div className="glass-premium rounded-2xl p-4 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={selectedImage as string} alt="Thumb" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1 sm:flex-initial">
                                <p className="text-xs font-medium text-text-secondary truncate">Ready to process</p>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <p className="text-sm font-bold text-white whitespace-nowrap">1 Credit required</p>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-text-muted">
                                        {credits ?? 0} left
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            disabled={isUploading || (credits !== null && credits <= 0)}
                            onClick={handleUploadAndRestore}
                            className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                            style={{
                                background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                boxShadow: "0 0 20px rgba(0, 242, 255, 0.4)",
                            }}
                        >
                            {credits !== null && credits <= 0 ? (
                                <>
                                    <Bell className="w-4 h-4" />
                                    No Credits
                                </>
                            ) : isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Restoring...
                                </>
                            ) : (
                                <>
                                        <Zap className="w-4 h-4" />
                                    Enhance Now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

