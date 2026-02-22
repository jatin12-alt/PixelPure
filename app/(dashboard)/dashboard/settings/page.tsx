import type { Metadata } from "next";
import { User, Bell, CreditCard, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Settings",
    description: "Manage your PixelPure account settings",
};

const settingsSections = [
    { icon: User, label: "Profile", desc: "Update your name and preferences" },
    { icon: Bell, label: "Notifications", desc: "Control email and push alerts" },
    { icon: CreditCard, label: "Billing", desc: "Manage plan and payment methods" },
    { icon: Shield, label: "Security", desc: "Password and 2FA settings" },
];

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gradient-cyan">Settings</h1>
                <p className="text-text-secondary mt-1">
                    Manage your account and preferences
                </p>
            </div>

            <div className="space-y-3">
                {settingsSections.map(({ icon: Icon, label, desc }) => (
                    <div
                        key={label}
                        className="card-premium rounded-xl p-5 flex items-center gap-4 cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-lg glass-cyan flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-electric-cyan" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-text-primary">{label}</h3>
                            <p className="text-text-secondary text-sm">{desc}</p>
                        </div>
                        <div className="text-text-muted group-hover:text-electric-cyan transition-colors">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
