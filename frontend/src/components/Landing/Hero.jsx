import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mic, MessageSquare, ChevronRight } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Floating particles animation
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const symbols = ['₹', '$', '€', '£', '¥', '₿', '%', '📈', '📊'];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${12 + Math.random() * 16}px;
                color: rgba(0, 255, 136, ${0.1 + Math.random() * 0.2});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            container.appendChild(particle);
            particles.push(particle);
        }

        return () => particles.forEach(p => p.remove());
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]" />

            {/* Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-gray-300">Powered by Advanced AI</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                    <span className="text-white">Your Personal</span>
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-purple-400 bg-clip-text text-transparent">
                        AI Finance Architect
                    </span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Master your wealth with an agentic AI that knows Indian Finance.
                    <span className="text-emerald-400"> Voice-to-voice interaction</span>,
                    real-time market data, and automated expense tracking.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        to="/chat"
                        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold rounded-full hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] transition-all duration-300 hover:scale-105"
                    >
                        <Mic className="w-5 h-5" />
                        Talk to Avatar
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 hover:border-emerald-500/50 transition-all duration-300"
                    >
                        <MessageSquare className="w-5 h-5" />
                        View Demo
                    </Link>
                </div>

                {/* AI Core Visual */}
                <div className="relative w-64 h-64 mx-auto">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-8 rounded-full border border-emerald-500/20 animate-spin" style={{ animationDuration: '10s' }} />

                    {/* Core */}
                    <div className="absolute inset-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(0,255,136,0.3)]">
                        <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                            AI
                        </div>
                    </div>

                    {/* Floating Data Points */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 border border-emerald-500/30 rounded-full text-xs text-emerald-400 backdrop-blur-sm">
                        NSE: +2.4%
                    </div>
                    <div className="absolute top-1/2 -right-8 -translate-y-1/2 px-3 py-1 bg-black/60 border border-purple-500/30 rounded-full text-xs text-purple-400 backdrop-blur-sm">
                        ₹ Savings
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 border border-emerald-500/30 rounded-full text-xs text-emerald-400 backdrop-blur-sm">
                        Goals: 78%
                    </div>
                    <div className="absolute top-1/2 -left-8 -translate-y-1/2 px-3 py-1 bg-black/60 border border-purple-500/30 rounded-full text-xs text-purple-400 backdrop-blur-sm">
                        Budget OK
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <div className="w-6 h-10 border border-gray-600 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-emerald-500 rounded-full animate-bounce" />
                </div>
            </div>

            {/* CSS for Float Animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(10deg); opacity: 0.6; }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default Hero;
