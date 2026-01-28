import React from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import FloatingNav from '../components/FloatingNav';

const ChatPage = () => {
    return (
        // <div className="flex flex-col h-screen w-full overflow-hidden bg-[#030303]">

            <div className="flex-1 overflow-hidden">
                <ChatInterface />
            </div>
        // </div>
    );
};

export default ChatPage;
