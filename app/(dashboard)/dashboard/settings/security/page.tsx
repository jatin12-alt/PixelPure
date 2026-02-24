import React from "react";
import { Shield, Key, Smartphone } from "lucide-react";

export default function SecuritySettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Security</h2>
                <p className="text-sm text-text-secondary">Protect your account and data</p>
            </div>
            
            <div className="space-y-3">
                {[
                    { icon: Key, label: "Change Password", desc: "Last updated 3 months ago", action: "Update" },
                    { icon: Smartphone, label: "Two-Factor Authentication", desc: "Add an extra layer of security", action: "Enable" },
                    { icon: Shield, label: "Login History", desc: "View your recent activity", action: "View All" }
                ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">{item.label}</h3>
                                <p className="text-xs text-text-secondary">{item.desc}</p>
                            </div>
                        </div>
                        <button className="text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                            {item.action}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
