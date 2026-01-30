 <div className='flex h-full'>
            <div>
                <ChatSidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-auto h-full relative bg-[#0B0E11]">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 overflow-auto scrollbar-hide scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                    {(!messages || messages.length === 0) ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-700">
                            <h2 className="text-3xl font-bold mb-3 text-white">
                                Good Morning!
                            </h2>
                            <p className="text-lg text-gray-400 font-light">
                                How can I assist you today?
                            </p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-black/40 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1 shadow-lg backdrop-blur-sm">
                                        <Bot size={16} />
                                    </div>
                                )}

                                <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm backdrop-blur-md ${msg.role === 'user'
                                    ? 'bg-primary/10 text-white border border-primary/20 rounded-tr-sm'
                                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-sm'
                                    }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                                        {msg.content.replace(/```json[\s\S]*?```/g, '').trim()}
                                    </p>
                                </div>

                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1 shadow-lg backdrop-blur-sm">
                                        <User size={16} />
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {isLoading && (
                        <div className="flex gap-4 justify-start animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-black/40 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Fixed Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#0B0E11] via-[#0B0E11] to-transparent z-20">
                    <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl shadow-black/50 flex items-center gap-2">
                        <form onSubmit={handleSubmit} className='flex items-center gap-2 w-full'>
                            <div className="pl-6 flex-1">

                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={currentSessionId ? "Start your request..." : "Start a new chat..."}
                                    className="w-full bg-transparent border-none text-white placeholder-gray-500 py-3 focus:outline-none text-base"
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${input.trim() && !isLoading
                                    ? 'bg-primary text-black hover:scale-105 shadow-lg shadow-primary/25'
                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                            </button>
                        </form>

                    </div>
                    <p className="text-center text-[10px] text-gray-600 mt-3 font-medium tracking-wide">
                        AI can make mistakes. Please verify important financial information.
                    </p>
                </div>
            </div >
        </div>