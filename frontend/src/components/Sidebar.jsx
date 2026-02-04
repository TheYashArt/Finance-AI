import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Target,
    Repeat,
    MessageSquare,
    ListOrdered,
    Ungroup
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: ListOrdered, label: 'Transactions', path: '/transactions' },
        { icon: Target, label: 'Goals', path: '/goals' },
        { icon: Repeat, label: 'Recurring', path: '/recurring' },
        { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
        { icon: Ungroup, label: "Categories", path: '/categories'}
    ];

    return (
        <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 bg-dark-bg border-r border-white/5 flex flex-col transition-all duration-300 z-50">
            {/* Logo */}
            <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-dark-bg font-bold text-xl">F</span>
                </div>
                <span className="hidden lg:block ml-3 font-bold text-xl tracking-wide">Finance AI</span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-8 flex flex-col gap-2 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center h-12 px-3 lg:px-4 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                                )}
                                <item.icon size={22} className={clsx("min-w-[22px]", isActive && "text-primary")} />
                                <span className="hidden lg:block ml-3 font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
