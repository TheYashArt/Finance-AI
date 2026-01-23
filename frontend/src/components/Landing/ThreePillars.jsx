import React, { useEffect, useRef } from 'react';
import { MessageSquare, Mic, PieChart, IndianRupee, BookOpen, Globe, Headphones, Target, TrendingUp, Zap } from 'lucide-react';

const PillarCard = ({ icon: Icon, title, bullets, accentColor, delay = 0 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-500 opacity-0 translate-y-8"
            style={{ transitionDelay: `${delay}ms`, transitionDuration: '600ms' }}
        >
            {/* Glow */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow duration-500">
                <Icon className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

            {/* Bullets */}
            <ul className="space-y-3">
                {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span className="text-gray-400 leading-relaxed">{bullet}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ThreePillars = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-emerald-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        One platform. Three powerful{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            AI copilots
                        </span>{' '}
                        for your money.
                    </h2>
                </div>

                {/* Pillars Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <PillarCard
                        icon={MessageSquare}
                        title="Agentic Finance Chatbot"
                        bullets={[
                            "Trained on Indian tax, investing and banking concepts using RAG.",
                            "Understands mutual funds, F&O basics, EPF, NPS, loans and more.",
                            "Uses web fallback for the latest rates, circulars and news."
                        ]}
                        accentColor="from-emerald-500/10 to-transparent"
                        delay={0}
                    />

                    <PillarCard
                        icon={Mic}
                        title="Human-like Voice Avatar"
                        bullets={[
                            "Talk to an AI that sounds natural in English and Indian accents.",
                            "Voice-to-voice conversations about your portfolio and plans.",
                            "Ideal for hands-free guidance while commuting or working."
                        ]}
                        accentColor="from-teal-500/10 to-transparent"
                        delay={100}
                    />

                    <PillarCard
                        icon={PieChart}
                        title="AI Expense & Goals Tracker"
                        bullets={[
                            "Track income & spending by category, merchant and payment mode.",
                            "Set savings goals for emergency fund, travel, house, retirement.",
                            "Add recurring expenses and get proactive alerts & insights."
                        ]}
                        accentColor="from-amber-500/10 to-transparent"
                        delay={200}
                    />

                </div>
            </div>
        </section>
    );
};

export default ThreePillars;
