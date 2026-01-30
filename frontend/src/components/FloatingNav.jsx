import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, MessageSquare, Mic, PieChart, ArrowLeft } from 'lucide-react';

const FloatingNav = () => {
    const location = useLocation();

    // Only major sections
    const navItems = [
        { icon: MessageSquare, label: 'RAG Chat', path: '/chat' },
        { icon: Mic, label: 'Avatar', path: '/avatar' },
        { icon: PieChart, label: 'Tracker', path: '/tracker' },
    ];

    const isActive = (path) => {
        if (path === '/tracker') {
            return location.pathname.startsWith('/tracker');
        }
        return location.pathname === path;
    };

    return (
        <nav className="fixed left-0 right-0 z-50 flex items-center justify-center px-4">
            <div className="flex items-center gap-4 mt-4 mb-2">
                {/* Back to Menu - Left */}
                <Link
                    to="/menu"
                    className="flex items-center gap-2 px-4 py-2.5 h-[58px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-white/5 transition-all shrink-0"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm hidden sm:inline">Menu</span>
                </Link>

                {/* Center Navigation - Major Sections Only */}
                <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${active
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={18} />
                                <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${active ? 'opacity-100' : 'opacity-0 absolute'
                                    }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default FloatingNav;
