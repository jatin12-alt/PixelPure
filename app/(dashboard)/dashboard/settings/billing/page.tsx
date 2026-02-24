import React from "react";
import { CreditCard, Zap } from "lucide-react";

export default function BillingSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Billing & Subscription</h2>
                <p className="text-sm text-text-secondary">Manage your plan and payment history</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-electric-cyan/10 to-neon-purple/10 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg glass-cyan flex items-center justify-center">
                            <Zap className="w-5 h-5 text-electric-cyan" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Free Plan</h3>
                            <p className="text-xs text-text-secondary">3 credits remaining this month</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-electric-cyan text-black font-bold text-sm rounded-lg hover:opacity-90 transition-all">
                        Upgrade Pro
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Payment Method</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-text-secondary" />
                        <div>
                            <p className="text-sm font-bold text-white">•••• •••• •••• 4242</p>
                            <p className="text-xs text-text-secondary">Expires 12/26</p>
                        </div>
                    </div>
                    <button className="text-sm text-electric-cyan font-medium hover:underline">Update</button>
                </div>
            </div>
        </div>
    );
}
