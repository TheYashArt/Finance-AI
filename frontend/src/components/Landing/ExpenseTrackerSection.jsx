import React, { useEffect, useRef } from 'react';
import { PieChart, Target, RefreshCw, Zap, TrendingUp, ArrowUp } from 'lucide-react';

const ExpenseTrackerSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.animate-item').forEach((el, i) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0) scale(1)';
                        }, i * 100);
                    });
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const categories = [
        { name: 'Rent', amount: 18000, color: 'bg-rose-500', percent: 35 },
        { name: 'Groceries', amount: 8500, color: 'bg-emerald-500', percent: 17 },
        { name: 'Eating Out', amount: 6200, color: 'bg-amber-500', percent: 12 },
        { name: 'Subscriptions', amount: 2500, color: 'bg-purple-500', percent: 5 },
        { name: 'EMIs', amount: 12000, color: 'bg-blue-500', percent: 23 },
        { name: 'Investments', amount: 4000, color: 'bg-teal-500', percent: 8 },
    ];

    return (
        <section id="expense-tracker" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            {/* Glow */}
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 opacity-0 translate-y-6 transition-all duration-600">
                        See where every{' '}
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">₹</span>
                        {' '}goes. Then make it work for you.
                    </h2>
                    <p className="animate-item text-lg text-gray-400 opacity-0 translate-y-6 transition-all duration-600">
                        AI tracks your spending, income, recurring bills and goals in one place.
                    </p>
                </div>

                {/* Phone Mockup with Floating Cards */}
                <div className="relative max-w-4xl mx-auto">

                    {/* Floating Callout Cards */}
                    <div className="absolute -left-4 lg:-left-20 top-3/4 animate-item opacity-0 scale-95 transition-all duration-600 z-20">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[200px] shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <Target className="w-5 h-5 text-emerald-400 mb-2" />
                            <p className="text-sm text-white font-medium">Set & track goals</p>
                            <p className="text-xs text-gray-500 mt-1">House, travel, debt-free date</p>
                        </div>
                    </div>

                    <div className="absolute -right-4 lg:-right-20 top-2/3 animate-item opacity-0 scale-95 transition-all duration-600 z-20">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[200px] shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                            <RefreshCw className="w-5 h-5 text-teal-400 mb-2" />
                            <p className="text-sm text-white font-medium">Recurring expenses</p>
                            <p className="text-xs text-gray-500 mt-1">EMIs, subscriptions, rent</p>
                        </div>
                    </div>

                    <div className="absolute -left-4 lg:-left-16 bottom-2/4 animate-item opacity-0 scale-95 transition-all duration-600 z-20">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[220px] shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                            <Zap className="w-5 h-5 text-amber-400 mb-2" />
                            <p className="text-sm text-white font-medium">AI optimizations</p>
                            <p className="text-xs text-gray-500 mt-1">Cut wasteful spend, auto-boost SIPs</p>
                        </div>
                    </div>

                    {/* AI Bubble */}
                    <div className="absolute -right-4 lg:-right-24 bottom-3/6 animate-item opacity-0 scale-95 transition-all duration-600 z-20">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[220px] shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-emerald-400" />
                                </div>
                            </div>
                            <p className="text-sm text-white font-medium">AI Suggestions</p>
                            <p className="text-xs text-gray-500 mt-1">"You can safely invest ₹5,000 more this month without touching your emergency buffer."</p>
                        </div>
                    </div>

                    {/* Phone Mockup */}
                    <div className="animate-item opacity-0 scale-95 transition-all duration-600 mx-auto max-w-[320px]">
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[3rem] p-3 shadow-[0_0_80px_rgba(16,185,129,0.15)]">
                            <div className="bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden">



                                {/* Content */}
                                <div className="px-5 py-6">
                                    {/* Monthly Summary */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                                        <p className="text-xs text-gray-500 mb-2">December 2024</p>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-gray-500">Income</p>
                                                <p className="text-lg font-bold text-emerald-400">₹78,000</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">Spent</p>
                                                <p className="text-lg font-bold text-rose-400">₹51,200</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">Saved</p>
                                                <p className="text-lg font-bold text-teal-400">₹26,800</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Breakdown */}
                                    <div className="space-y-2 mb-4">
                                        {categories.map((cat, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <span className="text-xs text-gray-400 w-20 truncate">{cat.name}</span>
                                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${cat.color} rounded-full`}
                                                        style={{ width: `${cat.percent}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-400 w-16 text-right">₹{cat.amount.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Goal Progress */}
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Target className="w-4 h-4 text-emerald-400" />
                                                <span className="text-sm text-white">Emergency Fund</span>
                                            </div>
                                            <span className="text-xs text-emerald-400">On track</span>
                                        </div>
                                        <div className="h-2 bg-black/30 rounded-full overflow-hidden mb-1">
                                            <div className="h-full w-[72%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>₹1,08,000</span>
                                            <span>₹1,50,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpenseTrackerSection;
