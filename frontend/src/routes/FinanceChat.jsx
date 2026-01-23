import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';

const FinanceChat = () => {
    return (
        <div className="h-[calc(100vh-180px)] flex flex-col">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white">Finance AI Assistant</h2>
                <p className="text-gray-400 text-sm">Ask questions about your finances, get tax advice, investment tips, and more.</p>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <ChatInterface />
            </div>
        </div>
    );
};

export default FinanceChat;
