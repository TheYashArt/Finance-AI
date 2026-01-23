import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    // Determine title based on path
    const getTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Dashboard';
        if (path === '/chat') return 'AI Chat';
        return path.substring(1).charAt(0).toUpperCase() + path.substring(2);
    };

    return (
        <div className="min-h-screen bg-dark-bg text-white flex">
            <Sidebar />
            <main className="flex-1 ml-20 lg:ml-64 flex flex-col min-h-screen">
                <Header title={getTitle()} />
                <div className={`flex-1 flex flex-col ${location.pathname === '/chat' ? 'overflow-hidden p-0' : 'p-6 lg:p-8 overflow-y-auto'}`}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
