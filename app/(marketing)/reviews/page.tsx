import React from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Star, Users } from "lucide-react";

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-pitch-black pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto space-y-16">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-electric-cyan transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
                        Loved by <span className="text-gradient-cyan">500k+ Creators.</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                        See why photographers, designers, and hobbyists around the world trust PixelPure for their most important memories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: "Sarah Jenkins", role: "Professional Photographer", text: "The face restoration is unparalleled. I've tried every tool on the market, and PixelPure is the only one that doesn't make people look like plastic." },
                        { name: "Marcus Chen", role: "Creative Director", text: "We use PixelPure for all our archival projects. The 4K upscaling has saved us hundreds of hours of manual retouching work." },
                        { name: "Elena Rodriguez", role: "Digital Artist", text: "PixelPure is a game-changer. The way it handles low-light noise while preserving texture is pure magic." },
                        { name: "David Miller", role: "Historical Archivist", text: "I've restored photos from the 1920s using this AI. The color correction is spookily accurate to the original era." },
                        { name: "Jessica Wu", role: "Social Media Manager", text: "Fast, reliable, and the results are consistently stunning. My clients are always blown away by the 'before and after' comparisons." },
                        { name: "Thomas Wright", role: "Hobbyist", text: "I used PixelPure to restore my late grandfather's wedding photos. It brought tears to my mother's eyes. Thank you for this tool." }
                    ].map((review, i) => (
                        <div key={i} className="card-premium rounded-[2rem] p-8 border-white/10 space-y-6 flex flex-col justify-between hover:bg-white/[0.02] transition-all">
                            <div className="space-y-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-electric-cyan text-electric-cyan" />)}
                                </div>
                                <p className="text-white text-lg leading-relaxed italic">"{review.text}"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-cyan to-neon-purple flex items-center justify-center font-bold text-black text-xs">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{review.name}</p>
                                    <p className="text-xs text-text-muted">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
