"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    PanelLeft,
    ChevronDown,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RotateCcw,
    Plus,
    X,
    Code2,
    ChevronRight
} from 'lucide-react';
import { Message } from './Dashboard';

interface ChatInterfaceProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    isArtifactOpen: boolean;
    messages: Message[];
    isLoading: boolean;
    onSendMessage: (text: string) => void;
    onOpenArtifact: (artifact: any) => void;
    onNewChat: () => void;
}

// Reusable Input Component to be used in both states
const ChatInput = ({
    value,
    onChange,
    onKeyDown,
    placeholder,
    isBottom = false,
    className = ""
}: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    isBottom?: boolean;
    className?: string;
}) => {
    return (
        <div className={`bg-[#2F2F2F] border border-[#383838] focus-within:border-[#555] transition-colors relative shadow-lg ${isBottom ? 'rounded-b-xl rounded-tr-xl' : 'rounded-2xl'} ${className}`}>
            <textarea
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`w-full bg-transparent text-[#ECECEC] p-4 pb-12 resize-none focus:outline-none placeholder:text-[#888] text-[0.95rem] leading-relaxed overflow-hidden custom-scrollbar ${isBottom ? 'max-h-[200px] min-h-[56px]' : 'h-[120px]'}`}
                placeholder={placeholder}
            />

            {/* Bottom Toolbar inside Input */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-[#ECECEC] bg-[#424242] rounded-full hover:bg-[#4E4E4E] transition-colors">
                        <Plus className="w-4 h-4" />
                    </button>
                    <div className="text-xs font-medium text-[#D1D5DB] hover:bg-[#424242] px-2 py-1.5 rounded-md cursor-pointer transition-colors flex items-center gap-1.5 select-none">
                        Sonnet 4.5 <ChevronDown className="w-3 h-3 text-[#9CA3AF]" />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 text-[#9CA3AF] hover:text-[#ECECEC] hover:bg-[#424242] rounded-md transition-colors">
                        <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
                            <div className="w-0.5 h-2 bg-current rounded-full"></div>
                            <div className="w-0.5 h-3 bg-current rounded-full"></div>
                            <div className="w-0.5 h-1.5 bg-current rounded-full"></div>
                            <div className="w-0.5 h-2.5 bg-current rounded-full"></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    sidebarOpen,
    toggleSidebar,
    isArtifactOpen,
    messages,
    isLoading,
    onSendMessage,
    onOpenArtifact,
    onNewChat
}) => {
    const [inputValue, setInputValue] = useState("");
    const [showNotifyBanner, setShowNotifyBanner] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isLoading]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputValue.trim()) {
                onSendMessage(inputValue);
                setInputValue("");
            }
        }
    };

    const isInitialState = messages.length === 0;

    return (
        <div className="flex-1 flex flex-col h-full bg-[#2B2B2B] text-[#ECECEC] relative font-sans transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 h-14 w-full z-20">
                <div className="flex items-center gap-2 overflow-hidden">
                    {!sidebarOpen && (
                        <div className="group relative">
                            <button onClick={toggleSidebar} className="text-[#9CA3AF] hover:text-white mr-2 p-1 rounded-md hover:bg-[#303030] transition-colors">
                                <PanelLeft className="w-5 h-5" strokeWidth={1.5} />
                            </button>
                            <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                                Open sidebar <span className="text-gray-500">Ctrl+.</span>
                            </div>
                        </div>
                    )}
                    {/* Only show title selector in chat mode or if needed, sticking to screenshot simplicity */}
                    {!isInitialState && (
                        <h2 className="text-sm font-medium truncate text-[#D1D5DB] cursor-pointer hover:bg-[#2F2F2F] px-2 py-1 rounded-md transition-colors flex items-center gap-1">
                            New Chat
                            <ChevronDown className="w-3 h-3 text-[#9CA3AF]" />
                        </h2>
                    )}
                </div>
                {/* Right side header actions */}
                {!isInitialState && (
                    <div className="flex items-center">
                        <button className="text-xs font-medium text-[#D1D5DB] hover:text-white px-3 py-1.5 border border-[#383838] rounded-md hover:bg-[#2F2F2F] transition-colors">
                            Share
                        </button>
                    </div>
                )}
                {/* In initial state, maybe user profile or blank as per screenshot. keeping blank for now as sidebar has profile */}
            </div>

            {/* Content Area */}
            {isInitialState ? (
                // ---------------- INITIAL STATE (CENTERED) ----------------
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-2xl flex flex-col items-center gap-8 -mt-20">
                        {/* Greeting */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#212121]">
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4.5L13.5 10L19 12L13.5 14L12 19.5L10.5 14L5 12L10.5 10L12 4.5Z" fill="#D97757" stroke="#D97757" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-serif text-[#ECECEC] tracking-tight">
                                Good afternoon, Athaxv
                            </h1>
                        </div>

                        {/* Centered Input */}
                        <div className="w-full">
                            <ChatInput
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="How can I help you today?"
                                isBottom={false}
                                className="shadow-2xl"
                            />
                        </div>

                        {/* Tools / Suggestions */}
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-[#ECECEC] font-medium">Connect your tools to Claude</span>
                                <ChevronRight className="w-4 h-4 text-[#737373]" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                {/* Mock Tool Icons */}
                                <div className="w-8 h-8 rounded bg-[#1E1E1E] border border-[#333] flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" className="w-5 h-5" alt="Notion" />
                                </div>
                                <div className="w-8 h-8 rounded bg-[#1E1E1E] border border-[#333] flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" className="w-5 h-5" alt="VS Code" />
                                </div>
                                <div className="w-8 h-8 rounded bg-[#1E1E1E] border border-[#333] flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                                    {/* Generic Placeholder for Linear/Other */}
                                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                </div>
                                <div className="w-8 h-8 rounded bg-[#1E1E1E] border border-[#333] flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                                </div>
                                <div className="w-8 h-8 rounded bg-[#1E1E1E] border border-[#333] flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="w-8 h-8 rounded bg-[#1E1E1E] border border-[#333] flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                                    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // ---------------- ACTIVE CHAT STATE (BOTTOM INPUT) ----------------
                <>
                    {/* Scrollable Chat Area */}
                    <div className="flex-1 overflow-y-auto px-4 md:px-0 custom-scrollbar pt-14">
                        <div className={`mx-auto pb-48 space-y-8 transition-all duration-500 ${isArtifactOpen ? 'max-w-3xl px-4' : 'max-w-[48rem]'}`}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'gap-5 px-1'}`}>
                                    {/* User Message */}
                                    {msg.role === 'user' && (
                                        <div className="bg-[#1A1A1A] text-[#ECECEC] px-5 py-3.5 rounded-[1.25rem] rounded-tr-sm max-w-[85%] text-[0.95rem] leading-[1.6] whitespace-pre-wrap">
                                            {msg.text}
                                        </div>
                                    )}

                                    {/* Model Message */}
                                    {msg.role === 'model' && (
                                        <>
                                            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-1">
                                                <div className="text-[#D97757] font-serif font-bold text-xl">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 4.5L13.5 10L19 12L13.5 14L12 19.5L10.5 14L5 12L10.5 10L12 4.5Z" fill="#D97757" stroke="#D97757" strokeWidth="1.5" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4 min-w-0">
                                                <div className="font-serif text-[1.05rem] leading-[1.7] text-[#ECECEC] tracking-wide antialiased whitespace-pre-wrap">
                                                    {msg.text}
                                                </div>

                                                {/* Render Artifact Card if exists */}
                                                {msg.artifact && (
                                                    <div
                                                        onClick={() => onOpenArtifact(msg.artifact)}
                                                        className={`
                                                            group border border-[#383838] bg-[#1E1E1E] rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors w-full max-w-md
                                                            ${isArtifactOpen ? 'ring-1 ring-[#555]' : ''}
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-3.5">
                                                            <div className="w-10 h-10 rounded-lg bg-[#262626] flex items-center justify-center border border-[#333]">
                                                                <div className="text-[#9CA3AF]">
                                                                    <Code2 className="w-5 h-5" />
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.9rem] font-medium text-white group-hover:text-blue-400 transition-colors">
                                                                    {msg.artifact.title}
                                                                </span>
                                                                <span className="text-xs text-[#9CA3AF] capitalize">
                                                                    Code · {msg.artifact.type}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button className="px-3 py-1.5 rounded-md border border-[#383838] bg-[#262626] text-xs font-medium text-[#ECECEC] hover:bg-[#333] transition-colors">
                                                            View
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Action Bar */}
                                                <div className="flex items-center gap-1 pt-1 -ml-2">
                                                    <button className="p-1.5 text-[#9CA3AF] hover:text-[#ECECEC] rounded hover:bg-[#2F2F2F] transition-colors" title="Copy"><Copy className="w-4 h-4" /></button>
                                                    <button className="p-1.5 text-[#9CA3AF] hover:text-[#ECECEC] rounded hover:bg-[#2F2F2F] transition-colors" title="Good response"><ThumbsUp className="w-4 h-4" /></button>
                                                    <button className="p-1.5 text-[#9CA3AF] hover:text-[#ECECEC] rounded hover:bg-[#2F2F2F] transition-colors" title="Bad response"><ThumbsDown className="w-4 h-4" /></button>
                                                    <button className="p-1.5 text-[#9CA3AF] hover:text-[#ECECEC] rounded hover:bg-[#2F2F2F] transition-colors" title="Retry"><RotateCcw className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="flex gap-5 px-1">
                                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="text-[#D97757] font-serif font-bold text-xl">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4.5L13.5 10L19 12L13.5 14L12 19.5L10.5 14L5 12L10.5 10L12 4.5Z" fill="#D97757" stroke="#D97757" strokeWidth="1.5" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="animate-spin text-[#D97757]">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M4.92893 4.92893L7.75736 7.75736" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M16.2426 16.2426L19.0711 19.0711" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M4.92893 19.0711L7.75736 16.2426" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M16.2426 7.75736L19.0711 4.92893" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area Container (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2B2B2B] via-[#2B2B2B] to-transparent pt-10 pb-6 pointer-events-none">
                        <div className={`mx-auto px-4 md:px-0 pointer-events-auto transition-all duration-500 ${isArtifactOpen ? 'max-w-3xl px-4' : 'max-w-[48rem]'}`}>
                            {/* Floating Banner */}
                            {showNotifyBanner && (
                                <div
                                    onClick={() => setShowNotifyBanner(false)}
                                    className="flex items-center justify-between bg-[#1A1A1A] text-xs text-[#ECECEC] px-4 py-2.5 rounded-t-xl border-x border-t border-[#2A2A2A] mb-[-1px] relative z-10 w-full shadow-sm cursor-pointer hover:bg-[#1E1E1E] transition-colors"
                                >
                                    <span className="font-medium">Want to be notified when Claude responds?</span>
                                    <div className="flex items-center gap-3">
                                        <button className="bg-[#EDEDED] text-black px-3 py-1 rounded-[4px] text-xs font-semibold hover:bg-white transition-colors">Notify</button>
                                        <button onClick={(e) => { e.stopPropagation(); setShowNotifyBanner(false); }} className="text-[#9CA3AF] hover:text-[#ECECEC]"><X className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            )}

                            {/* Main Input Box */}
                            <ChatInput
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Reply..."
                                isBottom={true}
                            />

                            <div className="text-center mt-3">
                                <p className="text-[11px] text-[#737373]">Claude is AI and can make mistakes. Please double-check responses.</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 3px;
                }
            `}</style>
        </div>
    );
};

export default ChatInterface;