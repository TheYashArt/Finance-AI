import React from 'react';
import SimpleChatInterface from '../components/Chat/SimpleChatInterface';

const FinanceChat = () => {
    return (
        <div className="h-[calc(100vh-180px)] flex flex-col">
            <div className="flex-1 overflow-hidden">
                <SimpleChatInterface />
            </div>
        </div>
    );
};

export default FinanceChat;
