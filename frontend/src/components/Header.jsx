import React from 'react';
import { Search, Bell, Moon, User } from 'lucide-react';

const Header = ({ title }) => {
    return (
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
            <h1 className="text-2xl font-bold hidden md:block">{title}</h1>

            <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-card-bg border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/30 transition-all relative">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card-bg"></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
