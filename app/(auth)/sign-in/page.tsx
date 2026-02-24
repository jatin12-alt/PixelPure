import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* Tera purana glass effect wrapper */}
      <div className="glass rounded-2xl p-4">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-electric-cyan text-black hover:bg-electric-cyan/90",
              card: "bg-transparent shadow-none",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-500",
              formFieldLabel: "text-gray-400",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              footerActionLink: "text-electric-cyan hover:text-electric-cyan/80"
            }
          }}
        />
      </div>
    </div>
  );
}