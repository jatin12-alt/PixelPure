import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create your free PixelPure account",
};

export default function SignUpPage() {
    return (
        <div className="glass rounded-2xl p-8 space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-text-primary">Create account</h1>
                <p className="text-text-secondary text-sm mt-1">
                    Start with 3 free image enhancements
                </p>
            </div>

            {/* Placeholder for Clerk SignUp component */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            First name
                        </label>
                        <input
                            type="text"
                            placeholder="John"
                            className="input-premium"
                            id="sign-up-first-name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Last name
                        </label>
                        <input
                            type="text"
                            placeholder="Doe"
                            className="input-premium"
                            id="sign-up-last-name"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="input-premium"
                        id="sign-up-email"
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
                        id="sign-up-password"
                    />
                </div>
                <button className="btn-primary w-full" id="sign-up-submit">
                    Create Account — It&apos;s Free
                </button>
            </div>

            <p className="text-center text-sm text-text-secondary">
                Already have an account?{" "}
                <a href="/sign-in" className="text-electric-cyan hover:text-electric-cyan/80 transition-colors font-medium">
                    Sign in
                </a>
            </p>

            <p className="text-center text-xs text-text-muted">
                By signing up, you agree to our{" "}
                <a href="/terms" className="underline hover:text-text-secondary transition-colors">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline hover:text-text-secondary transition-colors">
                    Privacy Policy
                </a>
                .
            </p>
        </div>
    );
}
