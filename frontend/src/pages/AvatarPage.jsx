import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Bot, User, Sparkles, Mic, Volume2, RefreshCcw, MicOff, VolumeOff, MessageSquare, Speech } from 'lucide-react';
import FloatingNav from '../components/FloatingNav';
import { useChatStore } from '../store/useChatStore';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber'
// import ChatInterface from '../components/Chat/ChatInterface';
import Avatar from '../components/Avatar';
import { OrbitControls } from '@react-three/drei';

const AvatarPage = () => {
    const { messages = [], isLoading, sendMessage, currentSessionId } = useChatStore();
    const [input, setInput] = useState('');
    const [speechText, setSpeechText] = useState(''); // Separate state for speech/lip sync
    const [ischatting, setIschatting] = useState(false)
    const messagesEndRef = useRef(null);
    const [ismale, setIsmale] = useState(true)
    const [issoundon, setIssoundon] = useState(true)
    const [ismicon, setIsmicon] = useState(true)
    const [reloadKey, setReloadKey] = useState(0)
    const [text, setText] = useState("")
    const [callavatar, setCallavatar] = useState(false)
    const [speakTrigger, setSpeakTrigger] = useState(0)
    const nav = useNavigate()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Set ischatting based on whether messages exist
    useEffect(() => {
        if (messages && messages.length > 0) {
            setIschatting(true);
        } else {
            setIschatting(false);
        }
    }, [messages]);

    // Debug: Monitor isLoading state
    useEffect(() => {
    }, [isLoading]);

    const [audioFile, setAudioFile] = useState(null); // State for uploaded audio
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIschatting(true)
        if (!input.trim() || isLoading) return;
        sendMessage(input);
        setInput('');
    };

    const handleSpeaking = () => {
        if (!speechText.trim() && !audioFile) return;
        setCallavatar(true)
        setIschatting(true)
        setText(speechText)
        // Trigger viseme playback by incrementing counter
        setSpeakTrigger(prev => prev + 1)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioFile(file);
            setSpeechText(`🎤 Audio: ${file.name}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] flex gap-2 relative overflow-hidden">
            {/* Top Navigation */}
            <FloatingNav />

            <div className='absolute text-white top-5 left-5'>
                <span className='text-[#33A8A1] text-3xl'>Fin</span><span className='text-3xl'>Wise</span>
                <br />
                <span className='text-xl'>
                    Avatar
                </span>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                {/* Left green glow */}
                <div className="absolute top-[5%] left-[2%] w-[320px] h-[320px] 
    bg-emerald-400/25 rounded-full blur-[150px] " />
                <div className="absolute top-[65%] left-[15%] w-[450px] h-[300px] 
    bg-emerald-400/30 rounded-full blur-[150px]" />
                <div className="absolute top-[55%] right-[30%] w-[450px] h-[300px] 
    bg-blue-400/30 rounded-full blur-[150px]" />
                {/* Center lime glow */}
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] 
    bg-emerald-400/30 rounded-full blur-[90px]" />
            </div>

            {/* Avatar Space */}
            <div className='w-[800px] flex justify-center h-[calc(100vh-6.1rem)] mt-[calc(100vh-88vh)] bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden'>
                <button onClick={() => {
                    setIsmale(!ismale)
                    setReloadKey(k => k + 1)
                }} className='absolute top-4 right-4 bg-emerald-500 rounded-full p-2  z-10'>
                    <RefreshCcw size={20} />
                </button>
                <Canvas
                    camera={{ position: [0, 1, 3], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[2, 2, 5]} intensity={2} />
                    <Avatar
                        model={ismale ? '/models/SkinMale.glb' : '/models/WhiteFemale.glb'}
                        handpos={ismale ? 1.3 : 1.15}
                        ischatting={ischatting}
                        text={text ? text : ""}
                        audioFile={audioFile}
                        speakTrigger={speakTrigger}
                    />
                    {/* Use this to rotate the model using mouse pointer */}
                    {/* <OrbitControls /> */}
                </Canvas>

                {/* Speech Input Section - Independent from Chat */}
                <div className='absolute flex flex-col items-center w-full gap-3 z-10 bottom-20 px-4'>
                    <div className='w-full max-w-md bg-black/40 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-xl'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="text"
                                value={speechText}
                                onChange={(e) => {
                                    setSpeechText(e.target.value);
                                    if (audioFile) setAudioFile(null); // Clear audio file if user types
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && speechText.trim()) {
                                        handleSpeaking();
                                    }
                                }}
                                placeholder="Type text for avatar to speak..."
                                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 py-2 px-3 focus:outline-none text-sm"
                            />
                            <button
                                onClick={handleSpeaking}
                                disabled={!speechText.trim()}
                                className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${speechText.trim()
                                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105'
                                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/10'
                                    }`}
                            >
                                <Speech size={18} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="audio/*"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                                title="Upload Audio"
                            >
                                <Volume2 size={18} />
                            </button>
                        </div>
                        {/* <p className='text-xs text-gray-400 mt-2 text-center'>Speech input (independent from chat)</p> */}
                    </div>
                </div>

                <div className='absolute flex justify-center w-full gap-10 z-10 bottom-4 border-t pt-4 border-white/10'>
                    <div className='bg-emerald-500 rounded-full w-fit p-3'
                        onClick={() => setIsmicon(!ismicon)}>
                        {!ismicon ? <MicOff size={20} /> : <Mic size={20} />}
                    </div>
                    <div className='bg-emerald-500 rounded-full p-3'
                        onClick={() => setIssoundon(!issoundon)}>

                        {!issoundon ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                    </div>
                    {/* 
                    Chat Button
                    remove this button after integrating the voice feature this was added just to test the zoom effect 
                    */}
                    <div className='bg-emerald-500 rounded-full p-3'
                        onClick={() => setIschatting(!ischatting)}>
                        <MessageSquare size={20} />
                    </div>
                </div>

            </div>


            {/* Chat Component*/}
            <div className="flex-1 flex items-center justify-end pt-[calc(100vh-88vh)] relative">
                <div className="w-[800px] h-[calc(100vh-6.1rem)] bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>
                    {/* Conditional Layout based on chatting state */}
                    {!ischatting ? (
                        /* Initial State - Centered Input */
                        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
                            {/* Animated Green Orb */}
                            <div className="relative mb-2">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 animate-pulse shadow-[0_0_60px_rgba(16,185,129,0.4)]"></div>
                                <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-emerald-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute inset-3 w-18 h-18 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                    <Sparkles className="text-emerald-400" size={32} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-3 text-white">
                                Good Morning! How can I assist you?
                            </h2>
                            <p className="text-sm text-gray-400 font-light max-w-md mb-12">
                                Start your request, and let FinWise handle everything
                            </p>

                            {/* Centered Input Form */}
                            <div className="w-full max-w-2xl">
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-xl flex items-center gap-3">
                                        <div className="flex-1 px-4">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => {
                                                    setInput(e.target.value)
                                                    setText(e.target.value)
                                                }}
                                                placeholder="Start your request, and let FinWise handle everything"
                                                className="w-full bg-transparent border-none text-white placeholder-gray-500 py-3 focus:outline-none text-sm"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${input.trim() && !isLoading
                                                ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105'
                                                : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/10'
                                                }`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={16} />
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        /* Chatting State - Messages + Bottom Input */
                        <>
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative z-10">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                        {msg.role === 'assistant' && (
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1 shadow-lg backdrop-blur-sm">
                                                <Bot size={18} className="text-emerald-400" />
                                            </div>
                                        )}

                                        <div className={`max-w-[70%] rounded-2xl px-5 py-3.5 shadow-lg ${msg.role === 'user'
                                            ? 'bg-emerald-500/10 text-white border border-emerald-500/20 backdrop-blur-md'
                                            : 'bg-white/5 text-gray-200 border border-white/10 backdrop-blur-md'
                                            }`}>
                                            <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                                                {msg.content.replace(/```json[\s\S]*?```/g, '').trim()}
                                            </p>
                                        </div>

                                        {msg.role === 'user' && (
                                            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-lg backdrop-blur-sm">
                                                <User size={18} className="text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-4 justify-start">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1 backdrop-blur-sm">
                                            <Bot size={18} className="text-emerald-400" />
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md px-5 py-4 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>




                            {/* Input Area - Bottom Position */}
                            <div className="p-6 border-t border-white/5 relative z-10">
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-xl flex items-center gap-3">
                                        <div className="flex-1 px-4">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => {
                                                    setInput(e.target.value)
                                                    setText(e.target.value)
                                                }}
                                                placeholder="Start your request, and let FinWise handle everything"
                                                className="w-full bg-transparent border-none text-white placeholder-gray-500 py-3 focus:outline-none text-sm"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 pr-2">
                                            <button
                                                type="submit"
                                                disabled={!input.trim() || isLoading}
                                                className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${input.trim() && !isLoading
                                                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105'
                                                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/10'
                                                    }`}
                                            >
                                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AvatarPage;
