import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import image from '../../assets/logo_final.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'Home', href: '#hero' },
        { name: 'AI Chat', href: '#ai-chat' },
        { name: 'Voice Avatar', href: '#voice-avatar' },
        { name: 'Expense Tracker', href: '#expense-tracker' },
        { name: 'How it Works', href: '#how-it-works' },
        { name: 'Security', href: '#security' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div>
                            <span className="text-black font-bold text-sm">
                                <img src={image} alt="FinnWise" width={200}/>
                            </span>
                        </div>
                        {/* <span className="text-white font-semibold text-lg hidden sm:block">FinnWise</span> */}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/login"
                            className="px-5 py-2.5 text-sm text-white border border-white/20 rounded-full hover:bg-white/5 hover:border-white/30 transition-all"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/login"
                            className="px-5 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-105 transition-all"
                        >
                            Get started free
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-400 hover:text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/5">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
                                <Link to="/login" className="px-4 py-3 text-center text-white border border-white/20 rounded-full">
                                    Log in
                                </Link>
                                <Link to="/login" className="px-4 py-3 text-center font-semibold text-black bg-gradient-to-r from-emerald-400 to-green-400 rounded-full">
                                    Get started free
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
