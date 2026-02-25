"use client";

import React, { useState } from "react";

export default function NotificationSettings() {
    const [preferences, setPreferences] = useState({
        "Email Notifications": true,
        "Push Notifications": true,
        "Update Notifications": true,
        "Marketing Emails": false,
        "Usage Alerts": true
    });

    const togglePreference = (label: string) => {
        setPreferences(prev => ({
            ...prev,
            [label]: !prev[label as keyof typeof prev]
        }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <p className="text-sm text-text-secondary">Manage how you receive alerts</p>
            </div>
            
            <div className="space-y-4">
                {[
                    { label: "Email Notifications", desc: "Receive core service updates via email" },
                    { label: "Update Notifications", desc: "Get notified about new AI features and tools" },
                    { label: "Push Notifications", desc: "Receive alerts on your browser" },
                    { label: "Marketing Emails", desc: "Tips, tricks and special offers" },
                    { label: "Usage Alerts", desc: "When you are low on credits" }
                ].map((item) => {
                    const isActive = preferences[item.label as keyof typeof preferences];
                    return (
                        <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div>
                                <h3 className="text-sm font-bold text-white">{item.label}</h3>
                                <p className="text-xs text-text-secondary">{item.desc}</p>
                            </div>
                            <div 
                                onClick={() => togglePreference(item.label)}
                                className={`w-12 h-6 rounded-full border transition-all relative cursor-pointer ${
                                    isActive 
                                    ? "bg-electric-cyan/20 border-electric-cyan/30" 
                                    : "bg-white/5 border-white/10"
                                }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-lg ${
                                    isActive 
                                    ? "right-1 bg-electric-cyan" 
                                    : "left-1 bg-white/20"
                                }`} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
