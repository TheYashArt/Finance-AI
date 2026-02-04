import React, { useEffect, useRef } from 'react';
import { Shield, Eye, Scale, Lock } from 'lucide-react';

const SecuritySection = () => {
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

    const features = [
        {
            icon: Lock,
            title: 'Bank-level encryption',
            description: 'All connections use 256-bit encryption, same as your bank.'
        },
        {
            icon: Eye,
            title: 'You control your data',
            description: 'Choose what to share and delete it anytime.'
        },
        {
            icon: Scale,
            title: 'Unbiased guidance',
            description: 'AI explains pros & cons — you make the final decisions.'
        }
    ];

    return (
        <section id="security" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#040404] to-[#030303]" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 opacity-0 translate-y-6 transition-all duration-600">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300">Security First</span>
                    </div>
                    <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 opacity-0 translate-y-6 transition-all duration-600">
                        Suggestions, not financial product sales.
                    </h2>
                    <p className="animate-item text-lg text-gray-400 opacity-0 translate-y-6 transition-all duration-600">
                        Your trust is our priority. We help you understand, not sell.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="animate-item opacity-0 translate-y-6 transition-all duration-600 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecuritySection;
