"use client";

import { useState, useRef, ChangeEvent, MouseEvent } from "react";
import { Sparkles, Upload, Zap, X } from "lucide-react";

export default function StudioPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const removeImage = (e: MouseEvent) => {
        e.stopPropagation();
        setSelectedImage(null);
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

            {/* Upload Zone */}
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
                            <Sparkles className="w-4 h-4" />
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
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Enhancement Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

            {/* Action Bar (Only visible when image is selected) */}
            {selectedImage && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50 animate-fade-up duration-500">
                    <div className="glass-premium rounded-2xl p-4 border border-white/10 shadow-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={selectedImage as string} alt="Thumb" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-text-secondary">Ready to process</p>
                                <p className="text-sm font-bold text-white">1 Credit required</p>
                            </div>
                        </div>
                        <button className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-black rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                                background: "linear-gradient(135deg, #00F2FF, #7C3AED)",
                                boxShadow: "0 0 20px rgba(0, 242, 255, 0.4)",
                            }}
                        >
                            <Zap className="w-4 h-4" />
                            Enhance Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
