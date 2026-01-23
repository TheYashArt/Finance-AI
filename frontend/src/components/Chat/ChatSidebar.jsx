import React, { useEffect } from 'react';
import { MessageSquare, Plus, Search, Trash2, MessageCircle } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';

const ChatSidebar = () => {
    const { sessions, currentSessionId, fetchSessions, createNewSession, selectSession, deleteSession, updateSessionTitle } = useChatStore();

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleNewChat = async () => {
        await createNewSession();
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this chat?')) {
            await deleteSession(id);
        }
    };

    const handleTitleChange = (e, id) => {
        const newTitle = e.target.value;
        updateSessionTitle(id, newTitle);
    };

    // Group sessions by date
    const groupedSessions = {
        Today: [],
        Yesterday: [],
        Previous: []
    };

    sessions.forEach(session => {
        const date = new Date(session.updated_at || session.created_at);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            groupedSessions.Today.push(session);
        } else if (date.toDateString() === yesterday.toDateString()) {
            groupedSessions.Yesterday.push(session);
        } else {
            groupedSessions.Previous.push(session);
        }
    });

    return (
        <div className="w-72 border-r border-white/5 flex flex-col h-full bg-[#0B0E11] md:flex">
            {/* Header */}
            <div className=" p-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white tracking-tight">History Chat</h2>
                <button
                    onClick={handleNewChat}
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-1.5 px-3 flex items-center gap-1.5 transition-all text-xs font-medium"
                >
                    <Plus size={14} />
                    <span>New Chat</span>
                </button>
            </div>

            {/* Search */}
            {/* <div className="px-5 pb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary/30 text-gray-300 placeholder-gray-600 transition-colors"
                    />
                </div>
            </div> */}

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-6 scrollbar-hide">
                {Object.entries(groupedSessions).map(([group, items]) => (
                    items.length > 0 && (
                        <div key={group}>
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">{group}</h3>
                            <div className="space-y-1">
                                {items.map(session => (
                                    <div
                                        key={session.id}
                                        onClick={() => selectSession(session.id)}
                                        className={`w-full text-left px-4 py-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between group border ${currentSessionId === session.id
                                            ? 'bg-white/5 text-white border-white/10 shadow-sm'
                                            : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <MessageSquare size={16} className={`${currentSessionId === session.id ? 'text-primary' : 'text-gray-600 group-hover:text-gray-500'
                                                }`} />
                                            <input type="text" value={session.title} onChange={(e) => handleTitleChange(e, session.id)} className="w-full text-sm font-medium" />

                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(e, session.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-full transition-all"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}

                {sessions.length === 0 && (
                    <div className="text-center text-gray-700 py-10">
                        <MessageCircle size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-xs">No chats yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
