import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, Target, RefreshCw, MessageSquare, Ungroup } from 'lucide-react';
import FloatingNav from '../components/FloatingNav';

const TrackerLayout = () => {
    const location = useLocation();

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/tracker' },
        { icon: CreditCard, label: 'Transactions', path: '/tracker/transactions' },
        { icon: Target, label: 'Goals', path: '/tracker/goals' },
        { icon: RefreshCw, label: 'Recurring', path: '/tracker/recurring' },
        { icon: MessageSquare, label: 'AI Chat', path: '/tracker/chat' },
        { icon: Ungroup, label: "Categories", path: '/tracker/categories' }
    ];

    const isActive = (path) => {
        if (path === '/tracker') {
            return location.pathname === '/tracker';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="flex relative h-screen w-full overflow-hidden bg-[#030303]">
            {/* Top Navigation for major sections */}
            <FloatingNav />

            <div className='absolute text-white top-5 left-5 z-100'>
                <span className='text-[#33A8A1] text-3xl'>Fin</span><span className='text-3xl'>Wise</span>
                <br />
                <span className='text-xl'>
                    Tracker
                </span>
            </div>


            <div className="absolute inset-0 pointer-events-none">
                {/* Left green glow */}
                <div className="absolute top-[5%] left-[2%] w-[320px] h-[320px] 
    bg-emerald-400/25 rounded-full blur-[150px] " />
                <div className="absolute top-[65%] left-[15%] w-[450px] h-[300px] 
    bg-emerald-400/30 rounded-full blur-[150px]" />
                <div className="absolute top-[55%] right-[30%] w-[450px] h-[300px] 
    bg-blue-400/30 rounded-full blur-[150px]" />
                {/* Center lime glow */}
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] 
    bg-emerald-400/30 rounded-full blur-[90px]" />
            </div>

            {/* Sidebar for Tracker sub-pages */}
            <aside className="hidden lg:flex flex-col w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 pt-20">
                {/* Logo */}
                {/* <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            <span className="text-white font-bold text-sm">₹</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold">Finance Tracker</h1>
                            <p className="text-xs text-gray-500">AI-Powered</p>
                        </div>
                    </div>
                </div> */}

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 mt-20">
                    {sidebarItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/tracker'}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                                    ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pt-20 lg:pt-20 scrollbar-hide">
                <div className="p-6 lg:p-8 h-full">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation for Tracker sub-pages */}
            <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
                <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    {sidebarItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/tracker'}
                                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${active
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={16} />
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TrackerLayout;
