import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Core brand colors
                "pitch-black": "#000000",
                "electric-cyan": "#00F2FF",
                "deep-purple": "#7C3AED",
                "neon-purple": "#A855F7",
                "dark-surface": "#0A0A0F",
                "surface-1": "#0D0D15",
                "surface-2": "#12121E",
                "surface-3": "#1A1A2E",
                "border-subtle": "#1E1E30",
                "border-glow": "#00F2FF33",
                "text-primary": "#F8FAFC",
                "text-secondary": "#94A3B8",
                "text-muted": "#475569",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            backgroundImage: {
                "cyan-gradient": "linear-gradient(135deg, #00F2FF, #7C3AED)",
                "purple-gradient": "linear-gradient(135deg, #7C3AED, #A855F7)",
                "hero-gradient": "radial-gradient(ellipse at center, #7C3AED22 0%, #000000 70%)",
                "card-gradient": "linear-gradient(135deg, #0D0D15, #12121E)",
                "glow-cyan": "radial-gradient(circle, #00F2FF44 0%, transparent 70%)",
                "glow-purple": "radial-gradient(circle, #7C3AED44 0%, transparent 70%)",
                "mesh-gradient":
                    "radial-gradient(at 40% 20%, #7C3AED22 0px, transparent 50%), radial-gradient(at 80% 0%, #00F2FF11 0px, transparent 50%), radial-gradient(at 0% 50%, #7C3AED11 0px, transparent 50%)",
            },
            animation: {
                "scan-line": "scanLine 2.5s ease-in-out infinite",
                "scan-reveal": "scanReveal 3s ease-in-out forwards",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2.5s linear infinite",
                "gradient-shift": "gradientShift 4s ease-in-out infinite",
                "fade-up": "fadeUp 0.6s ease-out forwards",
                "fade-in": "fadeIn 0.4s ease-out forwards",
                "slide-in-left": "slideInLeft 0.5s ease-out forwards",
                "slide-in-right": "slideInRight 0.5s ease-out forwards",
                "border-glow": "borderGlow 2s ease-in-out infinite",
                "spin-slow": "spin 8s linear infinite",
                "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
            },
            keyframes: {
                scanLine: {
                    "0%": { top: "0%", opacity: "0" },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "100%": { top: "100%", opacity: "0" },
                },
                scanReveal: {
                    "0%": { clipPath: "inset(0 100% 0 0)" },
                    "100%": { clipPath: "inset(0 0% 0 0)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px #00F2FF44, 0 0 40px #00F2FF22" },
                    "50%": { boxShadow: "0 0 40px #00F2FF88, 0 0 80px #00F2FF44" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                gradientShift: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideInLeft: {
                    "0%": { opacity: "0", transform: "translateX(-30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                borderGlow: {
                    "0%, 100%": { borderColor: "#00F2FF44" },
                    "50%": { borderColor: "#00F2FFAA" },
                },
                bounceSubtle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            backdropBlur: {
                xs: "2px",
            },
            boxShadow: {
                "glow-cyan": "0 0 20px #00F2FF44, 0 0 40px #00F2FF22",
                "glow-cyan-lg": "0 0 40px #00F2FF66, 0 0 80px #00F2FF33",
                "glow-purple": "0 0 20px #7C3AED44, 0 0 40px #7C3AED22",
                "glow-purple-lg": "0 0 40px #7C3AED66, 0 0 80px #7C3AED33",
                "card-premium":
                    "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                "nav-glass": "0 4px 30px rgba(0, 0, 0, 0.3)",
                "inner-glow": "inset 0 0 30px rgba(0, 242, 255, 0.05)",
            },
        },
    },
    plugins: [],
};

export default config;
