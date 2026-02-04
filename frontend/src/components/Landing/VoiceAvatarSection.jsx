import React, { useEffect, useRef } from 'react';
import { Mic, Volume2, Languages, MessageSquare } from 'lucide-react';
import video from '../../assets/video.mp4';

const VoiceAvatarSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowWoman(prev => !prev);
        }, 5000); // Flip every 5 seconds

        return () => clearInterval(interval);
    }, []);

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
        <section id="voice-avatar" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#040404] to-[#030303]" />

            {/* Wave Glow */}
            <div className="absolute top-1/2 left-0 right-0 h-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent blur-3xl" />
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[200px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 opacity-0 translate-y-6 transition-all duration-600">
                            Talk to your money,{' '}
                            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                literally.
                            </span>
                        </h2>

                        <p className="animate-item text-lg text-gray-400 mb-8 opacity-0 translate-y-6 transition-all duration-600">
                            Human-like AI avatar for voice-to-voice finance coaching.
                        </p>

                        <ul className="space-y-4">
                            <li className="animate-item flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-600">
                                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                                </div>
                                <span className="text-gray-300">Ask follow-up questions like you're talking to a human advisor.</span>
                            </li>
                            <li className="animate-item flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-600">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <span className="text-gray-300">Speaks back with context, remembers your previous chats.</span>
                            </li>
                            <li className="animate-item flex items-start gap-3 opacity-0 translate-y-6 transition-all duration-600">
                                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                                </div>
                                <span className="text-gray-300">Perfect for quick checks: "Can I afford this?" "How much can I invest this month?"</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right - Voice Avatar Card */}
                    <div className="animate-item opacity-0 translate-y-6 transition-all duration-600">
                        <div className="backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(20,184,166,0.1)] overflow-hidden p-8">

                            {/* Avatar with Waveform */}
                            <div className="col-span-2 sm:col-span-1 backdrop-blur-xl  rounded-3xl p-5  flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <Mic className="w-4 h-4 text-teal-400" />
                                    <span className="text-xs text-gray-400">Voice Avatar</span>
                                </div>

                                {/* AI Avatar Face */}
                                <div className="relative w-[150px] h-[150px] mb-4" style={{ perspective: '1000px' }}>
                                    {/* Waveform Ring */}
                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-subtle-ping" style={{ animationDuration: '2s' }} />
                                    <div className="absolute inset-2 rounded-full border border-teal-500/30 animate-pulse" />

                                    <div
                                        className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <video src={video} autoPlay loop muted className='w-full h-full object-cover'></video>
                                    </div>

                                </div>

                                {/* Waveform */}
                                <div className="flex items-end gap-0.5 h-6 mt-3">
                                    {[...Array(20)].map((_, i) => {
                                        // Create different wave patterns for each bar
                                        const waveType = i % 4; // 4 different wave patterns
                                        const animationClass = `animate-wave-${waveType + 1}`;
                                        const randomDelay = (Math.random() * 3).toFixed(2);
                                        const randomDuration = (1 + Math.random() * 3).toFixed(2);

                                        return (
                                            <div
                                                key={i}
                                                className={`w-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full ${animationClass}`}
                                                style={{
                                                    animationDelay: `${randomDelay}s`,
                                                    animationDuration: `${randomDuration}s`
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                <span className="text-xs text-emerald-400 mt-2">Listening...</span>

                                <div className="flex items-center justify-center gap-4 mb-2 mt-6">
                                    <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-semibold rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(20,184,166,0.6)] transition-all">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                    <button className="px-4 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-full hover:bg-white/10 transition-all">
                                        <Volume2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Transcript */}
                            <div className="bg-black/30 rounded-2xl border border-white/5 p-4 space-y-3 mt-2.5">
                                <div className="flex items-start gap-2">
                                    <span className="text-xs text-emerald-400 shrink-0">You:</span>
                                    <span className="text-sm text-gray-300">"Can I afford this new phone right now?"</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-xs text-teal-400 shrink-0">AI:</span>
                                    <span className="text-sm text-gray-400">"Based on your current savings, yes! You have ₹45,000 in discretionary funds this month..."</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VoiceAvatarSection;
