import React, { useState, useEffect } from 'react';

const ChatShowcase = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Chat conversation data
    const conversation = [
        { role: 'user', text: 'What were my expenses last month?' },
        { role: 'assistant', text: 'Your total expenses last month were ₹45,230. The major categories were groceries (₹12,500), utilities (₹8,900), and entertainment (₹6,800).' },
    ];

    useEffect(() => {
        if (currentMessageIndex >= conversation.length) {
            // Reset after all messages are shown
            const resetTimer = setTimeout(() => {
                setMessages([]);
                setCurrentMessageIndex(0);
                setCurrentText('');
            }, 3000);
            return () => clearTimeout(resetTimer);
        }

        const currentMsg = conversation[currentMessageIndex];
        let charIndex = 0;
        setIsTyping(true);

        // Typing effect
        const typingInterval = setInterval(() => {
            if (charIndex < currentMsg.text.length) {
                setCurrentText(currentMsg.text.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);

                // Add completed message to messages array
                setMessages(prev => [...prev, currentMsg]);
                setCurrentText('');

                // Move to next message after a pause
                setTimeout(() => {
                    setCurrentMessageIndex(prev => prev + 1);
                }, currentMsg.role === 'user' ? 800 : 1200);
            }
        }, currentMsg.role === 'user' ? 50 : 30); // User types faster, assistant slower

        return () => clearInterval(typingInterval);
    }, [currentMessageIndex]);

    return (
        <div className="absolute inset-0 flex items-center justify-end p-4 overflow-hidden">
            <div className="w-full max-w-md space-y-3 opacity-20">
                {/* Render completed messages */}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl text-xs ${msg.role === 'user'
                                    ? 'bg-emerald-500/20 text-emerald-100 rounded-br-sm'
                                    : 'bg-white/10 text-gray-200 rounded-bl-sm'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Render currently typing message */}
                {currentText && (
                    <div
                        className={`flex ${conversation[currentMessageIndex].role === 'user' ? 'justify-end' : 'justify-start'
                            } animate-fadeIn`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl text-xs ${conversation[currentMessageIndex].role === 'user'
                                    ? 'bg-emerald-500/20 text-emerald-100 rounded-br-sm'
                                    : 'bg-white/10 text-gray-200 rounded-bl-sm'
                                }`}
                        >
                            {currentText}
                            <span className="inline-block w-1 h-3 ml-1 bg-current animate-pulse" />
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ChatShowcase;
