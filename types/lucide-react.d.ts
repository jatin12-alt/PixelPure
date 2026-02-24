import { Loader2 } from 'lucide-react';

declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';
    export interface IconProps extends SVGProps<SVGSVGElement> {
        size?: string | number;
        color?: string;
        strokeWidth?: string | number;
        absoluteStrokeWidth?: boolean;
    }
    export type LucideIcon = FC<IconProps>;
    export const Sparkles: LucideIcon;
    export const Zap: LucideIcon;
    export const TrendingUp: LucideIcon;
    export const Clock: LucideIcon;
    export const ArrowUpRight: LucideIcon;
    export const Plus: LucideIcon;
    export const Menu: LucideIcon;
    export const X: LucideIcon;
    export const ScanLine: LucideIcon;
    export const Shield: LucideIcon;
    export const Download: LucideIcon;
    export const Layers: LucideIcon;
    export const Wand2: LucideIcon;
    export const Heart: LucideIcon;
    export const Share2: LucideIcon;
    export const Gift: LucideIcon;
    export const Copy: LucideIcon;
    export const CheckCircle2: LucideIcon;
    export const User: LucideIcon;
    export const LayoutDashboard: LucideIcon;
    export const Image: LucideIcon;
    export const Settings: LucideIcon;
    export const LogOut: LucideIcon;
    export const CreditCard: LucideIcon;
    export const AlertCircle: LucideIcon;
    export const Check: LucideIcon;
    export const Star: LucideIcon;
    export const Building: LucideIcon;
    export const ArrowRight: LucideIcon;
    export const Filter: LucideIcon;
    export const Bell: LucideIcon;
    export const BellRing: LucideIcon;
    export const Upload: LucideIcon;
    export const Quote: LucideIcon;
    export const Twitter: LucideIcon;
    export const Github: LucideIcon;
    export const Linkedin: LucideIcon;
    export const Home: LucideIcon;
    export const ImageIcon: LucideIcon;
    export const ChevronRight: LucideIcon;
    export const Play: LucideIcon;
    export const Pause: LucideIcon;
    export const RotateCcw: LucideIcon;
    export const Key: LucideIcon;
    export const Smartphone: LucideIcon;
    export const Loader2: LucideIcon;
}
