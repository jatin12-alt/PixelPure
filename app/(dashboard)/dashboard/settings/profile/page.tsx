"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProfileSettings() {
    const { user, isLoaded } = useUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
    });

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

    if (!isLoaded) return <Loader2 className="w-6 h-6 animate-spin text-electric-cyan" />;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Profile Settings</h2>
                <p className="text-sm text-text-secondary">Update your personal information</p>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">First Name</label>
                        <input 
                            type="text" 
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="John"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Last Name</label>
                        <input 
                            type="text" 
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address (Read-only)</label>
                    <input 
                        type="email" 
                        disabled
                        value={user?.emailAddresses[0]?.emailAddress || ""}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-muted cursor-not-allowed"
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-3 bg-electric-cyan text-black font-black rounded-xl transition-all hover:opacity-90 disabled:opacity-50 mt-4 flex items-center gap-2"
                >
                    {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                </button>
            </form>
        </div>
    );
}
