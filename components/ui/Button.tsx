import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-cyan focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-br from-electric-cyan to-blue-500 text-black shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]",
                secondary:
                    "bg-deep-purple/15 text-neon-purple border border-deep-purple/30 hover:bg-deep-purple/20 hover:border-deep-purple/50 shadow-[0_0_20px_rgba(124,58,237,0.2)]",
                outline:
                    "border border-white/10 bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary hover:border-white/20",
                ghost:
                    "text-text-secondary hover:bg-white/5 hover:text-text-primary",
                destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
                glow: "bg-black text-electric-cyan border border-electric-cyan/30 hover:border-electric-cyan shadow-[0_0_15px_rgba(0,242,255,0.15)] hover:shadow-[0_0_25px_rgba(0,242,255,0.3)]",
            },
            size: {
                default: "h-11 px-6 py-2.5",
                sm: "h-9 px-4 text-xs",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
