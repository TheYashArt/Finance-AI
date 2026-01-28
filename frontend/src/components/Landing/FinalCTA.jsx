import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CreditCard, Building2, Smartphone, FileSpreadsheet } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-16 text-center shadow-[0_0_100px_rgba(16,185,129,0.15)]">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-300">Start in under 5 minutes</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Give yourself an{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            AI CFO
                        </span>
                        , today.
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        Start free. Connect your accounts, ask a question, and see your money clearly.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link
                            to="/chat"
                            className="w-full sm:w-auto px-10 py-4 text-center font-semibold text-black bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] hover:scale-105 transition-all"
                        >
                            Get started free
                        </Link>
                        <Link
                            to="/chat"
                            className="w-full sm:w-auto px-10 py-4 text-center font-semibold text-white border border-white/20 rounded-full hover:bg-white/5 transition-all"
                        >
                            Try a demo chat
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
