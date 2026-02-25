"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2, User as UserIcon, Mail, Save } from "lucide-react";

interface ProfileFormProps {
    compact?: boolean;
}

export default function ProfileForm({ compact = false }: ProfileFormProps) {
    const { user, isLoaded } = useUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        if (isLoaded && user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
            });
        }
    }, [isLoaded, user]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsUpdating(true);
        try {
            await user.update({
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-electric-cyan" />
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${compact ? "p-0" : ""}`}>
            {!compact && (
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-electric-cyan" />
                        Profile Settings
                    </h2>
                    <p className="text-sm text-text-secondary mt-1">Update your personal information</p>
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1">First Name</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="John"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all pl-11"
                            />
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-electric-cyan transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1">Last Name</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all pl-11"
                            />
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-electric-cyan transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1">Email Address (Read-only)</label>
                    <div className="relative group">
                        <input
                            type="email"
                            disabled
                            value={user?.emailAddresses[0]?.emailAddress || ""}
                            placeholder="Email address"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-text-muted cursor-not-allowed pl-11"
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isUpdating}
                    className={`w-full md:w-auto px-8 py-4 bg-electric-cyan text-black font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-electric-cyan/20`}
                >
                    {isUpdating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Save Changes
                </button>
            </form>
        </div>
    );
}
