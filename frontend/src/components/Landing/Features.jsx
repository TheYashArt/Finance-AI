import React, { useEffect, useRef } from 'react';
import { Brain, Mic, PieChart, MessageSquare, TrendingUp, Target, Zap, Bot } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, tags, children, delay = 0 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                    entry.target.style.opacity = '1';
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500 opacity-0"
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-shadow duration-500">
                    <Icon className="w-7 h-7 text-emerald-400" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">{description}</p>

                {/* Tags */}
                {tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Custom Content */}
                {children}
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

            {/* Subtle Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Intelligent <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">Features</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Experience the future of personal finance with AI-powered insights and automation.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Feature 1: Knowledge Engine */}
                    <FeatureCard
                        icon={Brain}
                        title="The Knowledge Engine"
                        description="An intelligent chatbot with deep knowledge of Indian finance — Taxation, SEBI regulations, Mutual Funds, and live news updates."
                        tags={["RAG Technology", "Indian Market Data", "Agentic AI"]}
                        delay={0}
                    >
                        {/* Chat Mockup */}
                        <div className="bg-black/40 rounded-2xl border border-white/5 p-4">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div className="text-sm text-gray-300 bg-white/5 rounded-xl rounded-tl-none px-3 py-2">
                                    How does the new budget affect my portfolio?
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <Bot className="w-4 h-4 text-purple-400" />
                                </div>
                                <div className="text-sm text-gray-400 bg-white/5 rounded-xl rounded-tl-none px-3 py-2">
                                    Based on the FY24 budget, your equity holdings may benefit from...
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Feature 2: AI Avatar */}
                    <FeatureCard
                        icon={Mic}
                        title="Human-Like Interaction"
                        description="Voice-to-voice conversation with a realistic AI avatar. Talk to your finances like a friend, not a calculator."
                        tags={["Voice AI", "Natural Language", "24/7 Available"]}
                        delay={100}
                    >
                        {/* Waveform Visual */}
                        <div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex flex-col items-center">
                            <div className="flex items-end gap-1 h-12 mb-4">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-pulse"
                                        style={{
                                            height: `${20 + Math.sin(i * 0.5) * 15 + Math.random() * 10}px`,
                                            animationDelay: `${i * 50}ms`
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                Listening...
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Feature 3: Expense Command Center */}
                    <FeatureCard
                        icon={PieChart}
                        title="AI Expense Command Center"
                        description="Comprehensive tracker for Income, Expenses, and Goals with AI-powered insights and recommendations."
                        tags={["Auto-Categorize", "Goal Tracking", "Smart Insights"]}
                        delay={200}
                    >
                        {/* Mini Dashboard */}
                        <div className="bg-black/40 rounded-2xl border border-white/5 p-4 space-y-3">
                            {/* Donut Chart Placeholder */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                                        <circle cx="32" cy="32" r="28" fill="none" stroke="#00ff88" strokeWidth="4" strokeDasharray="120 176" />
                                        <circle cx="32" cy="32" r="28" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="40 176" strokeDashoffset="-120" />
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center gap-2 text-emerald-400"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Food: ₹8,500</div>
                                    <div className="flex items-center gap-2 text-purple-400"><span className="w-2 h-2 bg-purple-500 rounded-full" /> Travel: ₹3,200</div>
                                </div>
                            </div>

                            {/* AI Insight Bubble */}
                            <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2">
                                <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-emerald-300">You spent 20% more on dining this month. Suggesting a budget adjustment.</p>
                            </div>

                            {/* Goal Progress */}
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>New Car Goal</span>
                                    <span>78%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[78%] bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                </div>
            </div>

            {/* Fade Up Animation */}
            <style>{`
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fade-up 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default Features;
