import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, MessageSquare, TrendingUp, ArrowUpRight, Wallet, ArrowRight } from 'lucide-react';
import { getTransactions } from '../services/api';
import image from "../assets/logo.png"
import BackgroundAnimation from '../components/BackgroundAnimation';
import video from "../assets/video.mp4"
import TypingText from '../components/Landing/TypingEffect';
import ChatShowcase from '../components/Landing/ChatShowcase';
import FinanceGraph from '../components/Landing/FinanceGraph';

// --- Premium 3D Orb Component ---
const Orb = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Core Glow */}
            <div className="absolute w-32 h-32 bg-emerald-500 rounded-full blur-[80px] opacity-40 animate-pulse" />

            {/* Rotating Rings */}
            <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-emerald-400/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 rounded-full border border-emerald-300/10 animate-[spin_20s_linear_infinite]" />

                {/* Center Sphere */}
                <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 opacity-90 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.5)] animate-float" />
            </div>
        </div>
    );
};

const MenuPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [userName, setUserName] = useState('User');
    const [greeting, setGreeting] = useState('Good Morning');

    useEffect(() => {
        // Fetch User Name
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }

        // Set Greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Fetch Transactions
        const fetchTx = async () => {
            try {
                const data = await getTransactions(0, 100);
                setTransactions(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
            }
        };
        fetchTx();
    }, []);

    const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="h-screen w-full text-white p-6 md:p-12 flex flex-col items-center font-sans selection:bg-emerald-500/30 relative overflow-hidden">
            <BackgroundAnimation />

            {/* Header / Greeting */}
            <div className="relative z-10 w-full max-w-6xl flex justify-between items-end mb-8 md:mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex">
                        <img src={image} alt="" width={50} height={50} className="mr-2" /> {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{userName}</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Here's your financial overview for today.</p>
                </div>

                {/* Logout Button */}
                <button
                    onClick={() => {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userName');
                        localStorage.setItem('isAdmin', false);
                        window.location.href = '/login';
                    }}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-all backdrop-blur-md"
                >
                    Sign Out
                </button>
            </div>

            {/* Main Grid */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[600px] md:h-[500px]">

                {/* --- CARD 1: AI AVATAR (Left, Tall) --- */}
                <Link to="/avatar" className="md:col-span-4 group relative h-[calc(100%-80px)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-[2rem] -z-10" />
                    <div className="h-full bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                    <Mic size={24} />
                                </div>
                                <ArrowUpRight className="text-gray-600 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <h2 className="text-3xl font-medium text-white mb-2">AI Avatar</h2>
                            <p className="text-gray-400 leading-relaxed">Have a natural conversation with your personal finance assistant.</p>
                        </div>

                        <div className="relative w-[150px] h-[150px] mb-4 items-center justify-center flex mx-auto" style={{ perspective: '1000px' }}>
                            {/* Waveform Ring */}
                            <div className="w-full h-full flex justify-center items-center">

                                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-subtle-ping" style={{ animationDuration: '2s' }} />
                                <div className="absolute inset-2 rounded-full border border-teal-500/30 animate-pulse" />

                                <div
                                    className="absolute inset-0 w-full rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    <video src={video} autoPlay loop muted className='w-full h-full object-cover'></video>
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live
                        </div>
                    </div>
                </Link>

                {/* --- Right Column (Split) --- */}
                <div className="md:col-span-8 grid grid-rows-2 gap-6 h-full">

                    {/* --- CARD 2: FINANCE TRACKER (Top Right) --- */}
                    <Link to="/tracker" className="group relative">
                        <div className="h-full relative bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden">
                            {/* Graph Animation in Background */}
                            <FinanceGraph />

                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                            <Wallet size={20} />
                                        </div>
                                        <span className="text-emerald-400 font-medium tracking-wide text-sm uppercase">Finance Tracker</span>
                                    </div>
                                    <h3 className="text-4xl font-semibold text-white mb-1">₹{balance.toLocaleString('en-IN')}</h3>
                                    <p className="text-gray-500">Total Balance</p>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                                    <ArrowRight className="text-gray-400 group-hover:text-white" />
                                </div>
                            </div>

                            {/* Mini Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                                    <div className="flex items-center gap-2 mb-2 text-emerald-400">
                                        <TrendingUp size={16} />
                                        <span className="text-xs font-medium uppercase">Income</span>
                                    </div>
                                    <p className="text-xl font-medium text-white">+₹{totalIncome.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                                    <div className="flex items-center gap-2 mb-2 text-red-400">
                                        <TrendingUp size={16} className="rotate-180" />
                                        <span className="text-xs font-medium uppercase">Expense</span>
                                    </div>
                                    <p className="text-xl font-medium text-white">-₹{totalExpense.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* --- CARD 3: RAG CHATBOT (Bottom Right) --- */}
                    <Link to="/chat" className="group relative">
                        <div className="h-[230px] relative bg-[#0A0A0A]/60 backdrop-blur-4xl border border-white/10 rounded-[2rem] p-8 flex items-center justify-between hover:border-emerald-500/30 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden">
                            {/* Chat Showcase in Background */}
                            <ChatShowcase />

                            <div className="max-w-md relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                        <MessageSquare size={20} />
                                    </div>
                                    <span className="text-emerald-400 font-medium tracking-wide text-sm uppercase">AI Assistant</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3">RAG Based Chatbot</h3>
                                <p className="text-gray-400">
                                    Ask complex questions about your financial data, transaction history, or investment advice.
                                </p>
                            </div>

                            {/* Visual Element */}
                            <div className="hidden md:flex h-32 w-32 items-center justify-center relative z-10">
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 p-3 bg-emerald-500 rounded-2xl text-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <ArrowRight size={24} />
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
            <style>
                {
                    `.animate-subtle-ping {
                    animation: subtle-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                    @keyframes subtle-ping {
                    0% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    75%, 100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }`
                }
            </style>
        </div>
    );
};

export default MenuPage;
