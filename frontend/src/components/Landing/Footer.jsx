import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative py-16 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050505] to-[#0a0a0a]" />

            {/* Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-xl font-bold text-white">Finance AI</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Your personal AI-powered financial companion. Master your wealth with intelligent insights tailored for India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-emerald-400 transition-colors">Dashboard</Link></li>
                            <li><Link to="/chat" className="text-gray-400 hover:text-emerald-400 transition-colors">AI Chat</Link></li>
                            <li><Link to="/transactions" className="text-gray-400 hover:text-emerald-400 transition-colors">Transactions</Link></li>
                            <li><Link to="/goals" className="text-gray-400 hover:text-emerald-400 transition-colors">Goals</Link></li>
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
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© 2024 Finance AI. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <span className="text-red-500">♥</span> in India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
