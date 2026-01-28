import React, { useEffect, useRef } from 'react';
import { MessageSquare, Globe, BookOpen, Users, Bot } from 'lucide-react';

const AIChatSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.animate-item').forEach((el, i) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="ai-chat" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 opacity-0 translate-y-6 transition-all duration-600">
                            Ask anything about{' '}
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                Indian money.
                            </span>
                        </h2>

                        <p className="animate-item text-lg text-gray-400 mb-8 opacity-0 translate-y-6 transition-all duration-600">
                            RAG-powered finance AI with real-time web intelligence.
                        </p>

                        <ul className="space-y-4">
                            <li className="animate-item flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-600">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <span className="text-gray-300">Understands Indian tax sections, schemes and regulations.</span>
                            </li>
                            <li className="animate-item flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-600">
                                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Globe className="w-3.5 h-3.5 text-teal-400" />
                                </div>
                                <span className="text-gray-300">Combines curated knowledge with live web search for updates.</span>
                            </li>
                            <li className="animate-item flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-600">
                                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Users className="w-3.5 h-3.5 text-amber-400" />
                                </div>
                                <span className="text-gray-300">Explains in simple language, with examples in ₹, not jargon.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right - Chat UI Card */}
                    <div className="animate-item opacity-0 translate-y-6 transition-all duration-600">
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.1)] overflow-hidden">

                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm text-gray-400">AI Finance Agent</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>

                            {/* Topic Chips */}
                            <div className="flex gap-2 px-6 py-3 border-b border-white/5 overflow-x-auto">
                                {['Taxes', 'Investing', 'Loans', 'Insurance'].map((topic) => (
                                    <button
                                        key={topic}
                                        className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-emerald-500/30 transition-colors whitespace-nowrap"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>

                            {/* Chat Messages */}
                            <div className="p-6 space-y-4 min-h-[280px]">
                                {/* User Message */}
                                <div className="flex justify-end">
                                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                                        <p className="text-sm text-white">Is a SIP in index funds better than an FD for 5 years?</p>
                                    </div>
                                </div>

                                {/* AI Message */}
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center shrink-0 border border-white/10">
                                        <Bot className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                        <p className="text-sm text-gray-300">
                                            For 5 years, equity index funds can beat FD returns but with higher risk.
                                            Here's a comparison for <span className="text-emerald-400 font-medium">₹10,000/month</span> SIP vs 7% FD:
                                        </p>
                                        <div className="mt-3 p-3 bg-black/30 rounded-xl border border-white/5">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="text-gray-500">Index SIP (12% avg)</span>
                                                <span className="text-emerald-400">₹8,24,000</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-500">FD (7% annual)</span>
                                                <span className="text-amber-400">₹7,15,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Input */}
                            <div className="px-6 py-4 border-t border-white/5">
                                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                                    <input
                                        type="text"
                                        placeholder="Ask about taxes, investing, loans..."
                                        className="flex-1 bg-transparent text-white text-sm placeholder:text-gray-500 outline-none"
                                        disabled
                                    />
                                    <button className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                                        <MessageSquare className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIChatSection;
