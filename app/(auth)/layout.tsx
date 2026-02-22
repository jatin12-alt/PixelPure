export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-pitch-black flex items-center justify-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-mesh-gradient" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-deep-purple/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-md mx-auto px-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-cyan to-deep-purple flex items-center justify-center glow-cyan">
                            <span className="text-black font-black text-sm">PP</span>
                        </div>
                        <span className="text-2xl font-black text-gradient-cyan">PixelPure</span>
                    </a>
                </div>

                {children}
            </div>
        </div>
    );
}
