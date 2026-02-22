import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Wedding Photographer",
        avatar: "SJ",
        avatarColor: "#00F2FF",
        rating: 5,
        text: "PixelPure saved an entire wedding album that was damaged. The face restoration is absolutely insane — I couldn't believe the results. My clients were in tears of joy.",
        plan: "PRO",
    },
    {
        name: "Marcus Chen",
        role: "Digital Artist",
        avatar: "MC",
        avatarColor: "#7C3AED",
        rating: 5,
        text: "I've tried every AI upscaling tool. PixelPure's 4x upscale is leagues ahead. The detail preservation is perfect for print-quality work. Worth every penny.",
        plan: "BUSINESS",
    },
    {
        name: "Priya Patel",
        role: "Content Creator",
        avatar: "PP",
        avatarColor: "#F59E0B",
        rating: 5,
        text: "Went from 500px thumbnail to crisp 2K in seconds. The laser reveal demo alone made me sign up. The actual results are even better than the demo!",
        plan: "PRO",
    },
    {
        name: "James O'Brien",
        role: "Genealogy Researcher",
        avatar: "JO",
        avatarColor: "#10B981",
        rating: 5,
        text: "Restoring 100-year-old family photos is now pure magic. PixelPure recovered details I never knew existed. It's like having a time machine for photos.",
        plan: "FREE",
    },
    {
        name: "Ava Rodriguez",
        role: "Instagram Influencer",
        avatar: "AR",
        avatarColor: "#EF4444",
        rating: 5,
        text: "I enhance every photo before posting. Engagement went up 35% because my photos look SO much sharper. The mobile experience is seamless.",
        plan: "PRO",
    },
    {
        name: "David Kim",
        role: "Product Manager at Adobe",
        avatar: "DK",
        avatarColor: "#8B5CF6",
        rating: 5,
        text: "From a PM perspective — the UX is exceptional. Onboarding is instant, results are immediate, and the API is clean. Best AI tool I've seen in 2024.",
        plan: "BUSINESS",
    },
];

interface TestimonialsSectionProps {
    fullPage?: boolean;
}

export default function TestimonialsSection({ fullPage }: TestimonialsSectionProps) {
    return (
        <section
            id="reviews"
            className={`py-24 px-4 sm:px-6 lg:px-8 relative ${fullPage ? "" : ""}`}
            aria-label="Customer reviews"
        >
            {/* Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                        style={{
                            background: "rgba(245,158,11,0.1)",
                            border: "1px solid rgba(245,158,11,0.3)",
                            color: "#F59E0B",
                        }}
                    >
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        500,000+ Happy Users
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                        Loved by Creators
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        Don&apos;t take our word for it. Here&apos;s what the community says.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {testimonials.map(({ name, role, avatar, avatarColor, rating, text, plan }) => (
                        <div key={name} className="break-inside-avoid">
                            <div className="card-premium rounded-2xl p-6 space-y-4">
                                {/* Quote icon */}
                                <Quote
                                    className="w-8 h-8 opacity-20"
                                    style={{ color: avatarColor }}
                                />

                                {/* Stars */}
                                <div className="flex gap-0.5">
                                    {[...Array(rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    &ldquo;{text}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
                                            style={{ background: avatarColor }}
                                        >
                                            {avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-text-primary">
                                                {name}
                                            </p>
                                            <p className="text-xs text-text-muted">{role}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${plan === "BUSINESS"
                                                ? "bg-electric-cyan/15 text-electric-cyan"
                                                : plan === "PRO"
                                                    ? "bg-deep-purple/30 text-neon-purple"
                                                    : "bg-white/10 text-text-muted"
                                            }`}
                                    >
                                        {plan}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
