import React from "react";
import { Shield, Lock, Fingerprint, History, ArrowRight, Smartphone } from "lucide-react";

export default function SecuritySettings() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Security Settings</h2>
                    <p className="text-sm text-text-secondary">Manage your password and security preferences</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Account Secure</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Change Password */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20">
                            <Lock className="w-5 h-5 text-electric-cyan" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Password</h3>
                            <p className="text-xs text-text-secondary">Last changed 3 months ago</p>
                        </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2">
                        Change Password
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20">
                            <Smartphone className="w-5 h-5 text-neon-purple" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Two-Factor Authentication</h3>
                            <p className="text-xs text-text-secondary">Add an extra layer of security to your account</p>
                        </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple text-sm font-bold rounded-xl transition-all border border-neon-purple/20">
                        Enable 2FA
                    </button>
                </div>

                {/* Login History */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <History className="w-4 h-4 text-text-muted" />
                        <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Recent Logins</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { device: "Windows 11 • Chrome", location: "Mumbai, India", time: "Just now", status: "Current Session" },
                            { device: "iPhone 15 Pro • App", location: "New Delhi, India", time: "2 hours ago", status: "Success" },
                        ].map((login, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-white">{login.device}</p>
                                    <p className="text-xs text-text-secondary">{login.location} • {login.time}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    login.status === "Current Session" ? "bg-electric-cyan/20 text-electric-cyan" : "bg-white/10 text-text-muted"
                                }`}>
                                    {login.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
