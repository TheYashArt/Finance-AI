import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import FloatingNav from '../components/FloatingNav';

const ChatPage = () => {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-[#030303]">
            {/* Top Navigation */}
            <FloatingNav />

            {/* Chat Interface with top padding for nav */}
            <div className="flex-1 overflow-hidden pt-16">
                <ChatInterface />
            </div>
        </div>
    );
};

export default ChatPage;
