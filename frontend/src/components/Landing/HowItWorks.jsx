import React, { useEffect, useRef } from 'react';
import { Plug, MessageSquare, Mic, PieChart, Rocket, Zap } from 'lucide-react';

const HowItWorks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.animate-item').forEach((el, i) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, i * 150);
                    });
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const steps = [
        {
            icon: Plug,
            number: '01',
            title: 'Connect & Onboard',
            description: 'Create your account, link bank / cards securely, or add data manually. Choose your language and risk profile.',
            color: 'from-emerald-500/20 to-teal-500/20',
            accent: 'text-emerald-400'
        },
        {
            icon: MessageSquare,
            number: '02',
            title: 'Chat, Talk, Track',
            description: 'Ask questions, talk to the avatar, and let the app auto-categorize your spending and income.',
            color: 'from-teal-500/20 to-cyan-500/20',
            accent: 'text-teal-400'
        },
        {
            icon: Rocket,
            number: '03',
            title: 'AI-Driven Actions',
            description: 'Get insights, nudges and action plans: increase SIPs, pay off high-interest debt, stay on top of bills.',
            color: 'from-amber-500/20 to-orange-500/20',
            accent: 'text-amber-400'
        }
    ];

    return (
        <section id="how-it-works" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 opacity-0 translate-y-6 transition-all duration-600">
                        How{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            FinWise
                        </span>{' '}
                        works
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="animate-item opacity-0 translate-y-6 transition-all duration-600 relative">
                            {/* Connector Line */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-0" />
                            )}

                            <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-500 h-full">
                                {/* Number */}
                                <span className={`text-6xl font-bold ${step.accent} opacity-20 absolute top-4 right-6`}>
                                    {step.number}
                                </span>

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} border border-white/10 flex items-center justify-center mb-6`}>
                                    <step.icon className={`w-7 h-7 ${step.accent}`} />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
