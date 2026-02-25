"use client";

import React, { useState } from "react";
import { Shield, Lock, Fingerprint, History, ArrowRight, Smartphone, Mail, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SecuritySettings() {
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [backupEmail, setBackupEmail] = useState("");

    const handleEnable2FA = (e: React.FormEvent) => {
        e.preventDefault();
        if (!backupEmail) {
            toast.error("Please enter a valid email address");
            return;
        }
        toast.success("2FA setup initiated!", {
            description: `Verification link sent to ${backupEmail}`
        });
        setShow2FAModal(false);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* 2FA Modal */}
            {show2FAModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-surface-2 border border-white/10 rounded-[2rem] p-8 shadow-2xl relative animate-scale-in">
                        <button 
                            onClick={() => setShow2FAModal(false)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
                        >
                            <X className="w-5 h-5 text-text-muted" />
                        </button>

                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20">
                                <Mail className="w-8 h-8 text-neon-purple" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">Enable 2FA</h3>
                                <p className="text-text-secondary text-sm">Enter a backup email address to receive your 2FA verification codes.</p>
                            </div>

                            <form onSubmit={handleEnable2FA} className="w-full space-y-4">
                                <input 
                                    type="email" 
                                    required
                                    placeholder="backup@example.com"
                                    value={backupEmail}
                                    onChange={(e) => setBackupEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple/50 transition-all"
                                />
                                <button 
                                    type="submit"
                                    className="w-full py-4 bg-neon-purple text-white font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-neon-purple/20"
                                >
                                    Send Verification
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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
                    <Link href="/dashboard/settings/profile">
                        <button className="w-full sm:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2">
                            Change Password
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
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
                    <button 
                        onClick={() => setShow2FAModal(true)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple text-sm font-bold rounded-xl transition-all border border-neon-purple/20"
                    >
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
