import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Globe, Brain, Play, MessageSquare, Mic } from 'lucide-react';

const HeroNew = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const financeElements = ['₹', '$', '€', '↑', '↓', '%', '📈', '📊', '80C', 'NSE', 'SIP'];

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'finance-particle';
            particle.textContent = financeElements[Math.floor(Math.random() * financeElements.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${10 + Math.random() * 14}px;
                color: rgba(16, 185, 129, ${0.1 + Math.random() * 0.2});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${8 + Math.random() * 12}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                font-family: monospace;
            `;
            container.appendChild(particle);
            particles.push(particle);
        }

        return () => particles.forEach(p => p.remove());
    }, []);

    return (
        <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#050505] to-[#030303]" />

            {/* 3D Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [perspective:1000px]" />

            {/* Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-emerald-300">Powered by Agentic AI</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                            <span className="text-white">Your </span>
                            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">AI CFO</span>
                            <br />
                            <span className="text-white">for Indian Money</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                            <span className="text-emerald-400 font-semibold">Ask. Talk. Track.</span> An agentic finance AI that knows India, in your pocket.
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                <Shield className="w-4 h-4 text-amber-400" />
                                RBI-compliant data focus*
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                <Globe className="w-4 h-4 text-teal-400" />
                                Real-time web intelligence
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                <Brain className="w-4 h-4 text-emerald-400" />
                                Personal expense brain
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                to="/chat"
                                className="w-full sm:w-auto px-8 py-4 text-center font-semibold text-black bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] hover:scale-105 transition-all"
                            >
                                Try the finance AI
                            </Link>
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all">
                                <Play className="w-5 h-5" />
                                Watch 30s demo
                            </button>
                        </div>
                    </div>

                    {/* Right Content - AI Experience Preview */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">

                            {/* Chat Interface Preview */}
                            <div className="col-span-2 sm:col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs text-gray-400">AI Finance Agent</span>
                                </div>

                                {/* User Message */}
                                <div className="flex justify-end mb-3">
                                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[90%]">
                                        <p className="text-sm text-white">Can I still invest in ELSS for 80C this year?</p>
                                    </div>
                                </div>

                                {/* AI Message */}
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[95%]">
                                        <p className="text-sm text-gray-300">Yes, you can invest up to <span className="text-emerald-400">₹1.5L</span> before 31 March. Here's how it impacts your tax slab…</p>
                                    </div>
                                </div>
                            </div>

                            {/* Voice Avatar Preview */}
                            <div className="col-span-2 sm:col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-[0_0_40px_rgba(16,185,129,0.1)] flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <Mic className="w-4 h-4 text-teal-400" />
                                    <span className="text-xs text-gray-400">Voice Avatar</span>
                                </div>

                                {/* AI Avatar Face */}
                                <div className="relative w-24 h-24 mb-4">
                                    {/* Waveform Ring */}
                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping" style={{ animationDuration: '2s' }} />
                                    <div className="absolute inset-2 rounded-full border border-teal-500/30 animate-pulse" />
                                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-black text-lg font-bold">
                                            ₹
                                        </div>
                                    </div>
                                </div>

                                {/* Waveform */}
                                <div className="flex items-end gap-0.5 h-6">
                                    {[...Array(20)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full animate-pulse"
                                            style={{
                                                height: `${8 + Math.sin(i * 0.5) * 10 + Math.random() * 6}px`,
                                                animationDelay: `${i * 50}ms`
                                            }}
                                        />
                                    ))}
                                </div>

                                <span className="text-xs text-emerald-400 mt-2">Listening...</span>
                            </div>

                            {/* Quick Stats */}
                            <div className="col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">NSE</p>
                                    <p className="text-sm text-emerald-400">+1.24%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">₹/USD</p>
                                    <p className="text-sm text-gray-300">83.42</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Gold</p>
                                    <p className="text-sm text-amber-400">₹72,450</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Nifty 50</p>
                                    <p className="text-sm text-emerald-400">21,890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
                <div className="w-6 h-10 border border-gray-600 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-emerald-500 rounded-full" />
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
                    25% { transform: translateY(-15px) translateX(10px) rotate(5deg); opacity: 0.5; }
                    50% { transform: translateY(-25px) translateX(-5px) rotate(-3deg); opacity: 0.6; }
                    75% { transform: translateY(-10px) translateX(-10px) rotate(3deg); opacity: 0.4; }
                }
            `}</style>
        </section>
    );
};

export default HeroNew;
