import React from "react";

export default function ProfileSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-white">Profile Settings</h2>
                <p className="text-sm text-text-secondary">Update your personal information</p>
            </div>
            
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Bio</label>
                    <textarea 
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-cyan/50 transition-all resize-none"
                    />
                </div>
                
                <button className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl transition-all border border-white/5 mt-4">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
