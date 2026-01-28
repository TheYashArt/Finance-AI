import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Mail, IndianRupee } from 'lucide-react';
import image from '../../assets/logo_final_footer.png'

const FooterNew = () => {
    return (
        <footer className="relative py-16 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#030303] to-[#050505]" />

            {/* Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">

                            <img src={image} alt="" width={100} />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-4">
                            Your AI-powered financial companion. Master your wealth with intelligent insights tailored for India.
                        </p>
                        <p className="text-xs text-gray-500">
                            Made with ❤️ in India
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#ai-chat" className="text-gray-400 hover:text-emerald-400 transition-colors">AI Chat</a></li>
                            <li><a href="#voice-avatar" className="text-gray-400 hover:text-emerald-400 transition-colors">Voice Avatar</a></li>
                            <li><a href="#expense-tracker" className="text-gray-400 hover:text-emerald-400 transition-colors">Expense Tracker</a></li>
                            <li><a href="#how-it-works" className="text-gray-400 hover:text-emerald-400 transition-colors">How it Works</a></li>
                            <li><a href="#security" className="text-gray-400 hover:text-emerald-400 transition-colors">Security</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© 2026 FinWise. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterNew;
