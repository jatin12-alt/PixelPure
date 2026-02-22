import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your PixelPure account",
};

export default function SignInPage() {
    return (
        <div className="glass rounded-2xl p-8 space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
                <p className="text-text-secondary text-sm mt-1">
                    Sign in to continue enhancing your images
                </p>
            </div>

            {/* Placeholder for Clerk SignIn component */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="input-premium"
                        id="sign-in-email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="input-premium"
                        id="sign-in-password"
                    />
                </div>
                <button className="btn-primary w-full" id="sign-in-submit">
                    Sign In
                </button>
            </div>

            <p className="text-center text-sm text-text-secondary">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="text-electric-cyan hover:text-electric-cyan/80 transition-colors font-medium">
                    Sign up free
                </a>
            </p>
        </div>
    );
}
