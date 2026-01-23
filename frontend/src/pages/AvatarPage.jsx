import React from 'react';
import { Mic, Volume2, Languages } from 'lucide-react';
import FloatingNav from '../components/FloatingNav';

const AvatarPage = () => {
    return (
        <div className="min-h-screen bg-[#030303]">
            {/* Top Navigation */}
            <FloatingNav />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Grid Pattern */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 pt-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">AI Voice Avatar</h1>
                    <p className="text-gray-400">Talk to your finances naturally</p>
                </div>

                {/* Avatar Card */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(16,185,129,0.1)]">

                    {/* Avatar with Waveform */}
                    <div className="flex flex-col items-center mb-8">
                        {/* Avatar Circle */}
                        <div className="relative w-48 h-48 mb-8">
                            {/* Outer waveform ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" style={{ animationDuration: '3s' }} />
                            <div className="absolute inset-2 rounded-full border border-green-500/20 animate-pulse" style={{ animationDuration: '2s' }} />
                            <div className="absolute inset-4 rounded-full border border-emerald-500/20 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />

                            {/* Avatar face */}
                            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-400 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                                    <span className="text-3xl font-bold text-black">₹</span>
                                </div>
                            </div>
                        </div>

                        {/* Live Waveform */}
                        <div className="flex items-end gap-1 h-12 mb-4">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 bg-gradient-to-t from-emerald-500 to-green-400 rounded-full animate-pulse"
                                    style={{
                                        height: `${12 + Math.sin(i * 0.4) * 20 + Math.random() * 12}px`,
                                        animationDelay: `${i * 40}ms`,
                                        animationDuration: '0.8s'
                                    }}
                                />
                            ))}
                        </div>

                        <span className="text-emerald-400 text-lg flex items-center gap-2">
                            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                            Tap to start speaking
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <button className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-semibold rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] hover:scale-110 transition-all flex items-center justify-center">
                            <Mic size={28} />
                        </button>
                        <button className="w-12 h-12 bg-white/5 border border-white/10 text-gray-400 rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                            <Volume2 size={20} />
                        </button>
                        <button className="px-4 h-12 bg-white/5 border border-white/10 text-gray-400 rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
                            <Languages size={18} />
                            <span className="text-sm">EN / Hinglish</span>
                        </button>
                    </div>

                    {/* Transcript */}
                    <div className="bg-black/30 rounded-2xl border border-white/5 p-6 space-y-4">
                        <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Conversation</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-xs text-emerald-400 shrink-0 mt-1">You:</span>
                                <span className="text-gray-300">"How much can I invest this month?"</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-xs text-green-400 shrink-0 mt-1">AI:</span>
                                <span className="text-gray-400">"Based on your expenses and savings goal, you can safely invest ₹15,000 this month without impacting your emergency fund..."</span>
                            </div>
                        </div>
                    </div>

                    {/* Coming Soon Badge */}
                    <div className="mt-6 text-center">
                        <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-300">
                            🚧 Voice feature coming soon
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarPage;
