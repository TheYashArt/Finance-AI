import React, { useEffect, useRef } from 'react';
import { TrendingUp, Bot, Shield, Cpu, Target, Sparkles } from 'lucide-react';

const BentoCard = ({ icon: Icon, title, description, className = '', gradient, delay = 0 }) => {
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

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`group relative rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm p-6 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 opacity-0 ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />

            <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-shadow duration-500">
                    <Icon className="w-6 h-6 text-emerald-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const BentoGrid = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Why <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">Choose Us</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Cutting-edge technology meets intuitive design for the ultimate financial experience.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">

                    {/* Large Card - Real-time Data */}
                    <BentoCard
                        icon={TrendingUp}
                        title="Real-time NSE/BSE & Forex Data"
                        description="Live market updates from Indian stock exchanges and global forex markets. Stay ahead with instant notifications on portfolio movements."
                        className="lg:col-span-2 lg:row-span-2"
                        gradient="bg-gradient-to-br from-emerald-500/10 to-transparent"
                        delay={0}
                    />

                    {/* AI Avatar */}
                    <BentoCard
                        icon={Bot}
                        title="AI Avatar"
                        description="Conversational AI that understands your financial context and speaks naturally."
                        gradient="bg-gradient-to-br from-purple-500/10 to-transparent"
                        delay={100}
                    />

                    {/* Personalized & Secure */}
                    <BentoCard
                        icon={Shield}
                        title="Personalized & Secure"
                        description="Bank-grade encryption with personalized insights tailored to your goals."
                        gradient="bg-gradient-to-br from-blue-500/10 to-transparent"
                        delay={200}
                    />

                    {/* Edge Intelligence */}
                    <BentoCard
                        icon={Cpu}
                        title="Edge Intelligence"
                        description="AI processing runs locally for faster responses and enhanced privacy."
                        gradient="bg-gradient-to-br from-orange-500/10 to-transparent"
                        delay={300}
                    />

                    {/* Smart Financial Planning */}
                    <BentoCard
                        icon={Target}
                        title="Smart Financial Planning"
                        description="Automated budgets, goal tracking, and investment recommendations powered by AI."
                        gradient="bg-gradient-to-br from-pink-500/10 to-transparent"
                        delay={400}
                    />

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

export default BentoGrid;
