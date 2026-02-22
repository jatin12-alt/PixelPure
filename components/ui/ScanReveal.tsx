"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface ScanRevealProps {
    beforeSrc: string;
    afterSrc: string;
    beforeAlt?: string;
    afterAlt?: string;
    /** Duration of one full scan pass in milliseconds @default 3000 */
    duration?: number;
    /** Whether to loop the animation @default true */
    loop?: boolean;
    /** Whether to autoplay @default true */
    autoPlay?: boolean;
    className?: string;
    aspectRatio?: string;
}

/**
 * ScanReveal — Option 3 Laser Scan Animation
 *
 * A laser line sweeps vertically (left-to-right) across the image,
 * revealing the AI-enhanced version as it passes over the original.
 */
export default function ScanReveal({
    beforeSrc,
    afterSrc,
    beforeAlt = "Original image",
    afterAlt = "AI-enhanced image",
    duration = 3000,
    loop = true,
    autoPlay = true,
    className = "",
    aspectRatio = "16/9",
}: ScanRevealProps) {
    const [progress, setProgress] = useState(0); // 0–1
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isComplete, setIsComplete] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const pausedProgressRef = useRef<number>(0);

    const animate = useCallback(
        (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp - pausedProgressRef.current * duration;
            }
            const elapsed = timestamp - startTimeRef.current;
            const newProgress = Math.min(elapsed / duration, 1);
            setProgress(newProgress);

            if (newProgress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                setIsComplete(true);
                if (loop) {
                    // Reset and loop
                    setTimeout(() => {
                        pausedProgressRef.current = 0;
                        startTimeRef.current = 0;
                        setProgress(0);
                        setIsComplete(false);
                        setIsPlaying(true);
                        rafRef.current = requestAnimationFrame(animate);
                    }, 800);
                } else {
                    setIsPlaying(false);
                }
            }
        },
        [duration, loop]
    );

    useEffect(() => {
        if (isPlaying && !isDragging) {
            startTimeRef.current = 0;
            rafRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(rafRef.current);
        }
        return () => cancelAnimationFrame(rafRef.current);
    }, [isPlaying, isDragging, animate]);

    const handlePlayPause = () => {
        if (isComplete && !loop) {
            // Restart
            pausedProgressRef.current = 0;
            startTimeRef.current = 0;
            setProgress(0);
            setIsComplete(false);
            setIsPlaying(true);
        } else {
            if (isPlaying) {
                pausedProgressRef.current = progress;
                startTimeRef.current = 0;
            } else {
                startTimeRef.current = 0;
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleReset = () => {
        cancelAnimationFrame(rafRef.current);
        pausedProgressRef.current = 0;
        startTimeRef.current = 0;
        setProgress(0);
        setIsComplete(false);
        setIsPlaying(true);
    };

    // Manual scrubbing via click/drag
    const handlePointerDown = (e: React.PointerEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setIsPlaying(false);
        updateProgressFromPointer(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !containerRef.current) return;
        updateProgressFromPointer(e.clientX);
    };

    const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        pausedProgressRef.current = progress;
        startTimeRef.current = 0;
        setIsPlaying(true);
    };

    const updateProgressFromPointer = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const newProgress = Math.max(0, Math.min(1, x / rect.width));
        setProgress(newProgress);
        pausedProgressRef.current = newProgress;
    };

    const laserPosition = `${progress * 100}%`;

    return (
        <div className={`group relative select-none ${className}`}>
            {/* Main Container */}
            <div
                ref={containerRef}
                className="relative overflow-hidden rounded-2xl cursor-ew-resize"
                style={{ aspectRatio }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* ── Before Image (Original/Degraded) ── */}
                <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={beforeSrc}
                        alt={beforeAlt}
                        className="w-full h-full object-cover"
                        style={{ filter: "blur(2px) grayscale(0.4) brightness(0.75)" }}
                        draggable={false}
                    />
                    {/* Before label */}
                    <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm opacity-100 transition-opacity duration-300"
                        style={{
                            background: "rgba(0,0,0,0.6)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#94A3B8",
                        }}
                    >
                        BEFORE
                    </div>
                </div>

                {/* ── After Image (AI-Enhanced) — revealed by clip-path ── */}
                <div
                    className="absolute inset-0 transition-none"
                    style={{ clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={afterSrc}
                        alt={afterAlt}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                    {/* After label */}
                    <div
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold"
                        style={{
                            background: "rgba(0, 242, 255, 0.15)",
                            border: "1px solid rgba(0, 242, 255, 0.4)",
                            color: "#00F2FF",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        AI ENHANCED
                    </div>
                </div>

                {/* ── Laser Line ── */}
                <div
                    className="absolute top-0 bottom-0 pointer-events-none z-20"
                    style={{
                        left: laserPosition,
                        width: "4px",
                        transform: "translateX(-50%)",
                    }}
                >
                    {/* Main laser beam */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(180deg, transparent 0%, rgba(0,242,255,0.7) 15%, #00F2FF 40%, rgba(0,242,255,1) 50%, rgba(0,242,255,0.8) 60%, rgba(0,242,255,0.7) 85%, transparent 100%)",
                            boxShadow:
                                "0 0 6px 2px rgba(0, 242, 255, 0.9), 0 0 20px 6px rgba(0, 242, 255, 0.5), 0 0 50px 15px rgba(0, 242, 255, 0.2)",
                        }}
                    />

                    {/* Horizontal flare at center */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            left: "-30px",
                            right: "-30px",
                            height: "2px",
                            background: "radial-gradient(ellipse, rgba(0,242,255,0.8) 0%, transparent 70%)",
                            filter: "blur(1px)",
                        }}
                    />

                    {/* Scan orb — glowing dot at laser tip */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: "#00F2FF",
                            boxShadow:
                                "0 0 10px 3px rgba(0,242,255,0.8), 0 0 30px 10px rgba(0,242,255,0.4)",
                        }}
                    />
                </div>

                {/* ── Progress scrubber ── */}
                {isDragging && (
                    <div
                        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                        style={{ backdropFilter: "brightness(1)" }}
                    />
                )}
            </div>

            {/* ── Controls ── */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                style={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <button
                    onClick={handlePlayPause}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-white hover:text-electric-cyan transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                    ) : (
                        <Play className="w-3.5 h-3.5" />
                    )}
                </button>
                <button
                    onClick={handleReset}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-white hover:text-electric-cyan transition-colors"
                    aria-label="Reset"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>
                {/* Progress bar */}
                <div className="w-20 h-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-none"
                        style={{
                            width: `${progress * 100}%`,
                            background: "linear-gradient(90deg, #00F2FF, #7C3AED)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
