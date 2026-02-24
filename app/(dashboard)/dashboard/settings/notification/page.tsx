import React from "react";

export default function NotificationSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <p className="text-sm text-text-secondary">Manage how you receive alerts</p>
            </div>
            
            <div className="space-y-4">
                {[
                    { label: "Email Notifications", desc: "Receive updates via email" },
                    { label: "Push Notifications", desc: "Receive alerts on your browser" },
                    { label: "Marketing Emails", desc: "Tips, tricks and special offers" },
                    { label: "Usage Alerts", desc: "When you are low on credits" }
                ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div>
                            <h3 className="text-sm font-bold text-white">{item.label}</h3>
                            <p className="text-xs text-text-secondary">{item.desc}</p>
                        </div>
                        <div className="w-12 h-6 rounded-full bg-electric-cyan/20 border border-electric-cyan/30 relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-electric-cyan shadow-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
