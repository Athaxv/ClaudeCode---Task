"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    Plus,
    Search,
    MessageSquare,
    LayoutGrid,
    Code,
    PanelLeft,
    MoreHorizontal,
    ChevronUp,
    X
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onNewChat }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const navItems = [
        { icon: MessageSquare, label: 'Chats' },
        { icon: LayoutGrid, label: 'Projects' },
        { icon: Code, label: 'Artifacts' },
        { icon: Code, label: 'Code' },
    ];

    const allRecents = [
        "Plan a development roadmap",
        "Setting up Prisma in turborepo p...",
        "Canvas UI with theme toggle",
        "Chess.com frontend developer a...",
        "Workflow diagram text adjustment",
        "Modern authentication page des...",
        "Responsive SaaS UI Design",
        "Responsive React Dashboard",
        "Responsive Web Design Code",
        "AI Startup Validator Dashboard"
    ];

    const filteredRecents = allRecents.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (isSearching && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearching]);

    if (!isOpen) return null;

    const handleNewChat = () => {
        setIsSearching(false);
        setSearchQuery("");
        onNewChat();
    };

    return (
        <div className="w-[280px] h-full bg-[#2B2B2B] flex flex-col flex-shrink-0 font-sans border-r border-[#333]">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between mt-1 mb-2">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <h1 className="font-serif text-xl font-medium text-[#E5E5E5] tracking-tight">Claude</h1>
                </div>
                <div className="flex items-center">
                    <button onClick={toggleSidebar} className="text-[#9CA3AF] hover:text-white p-2 rounded-md hover:bg-[#1A1A1A] transition-colors" title="Close sidebar">
                        <PanelLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Actions / Search Toggle */}
            <div className="px-3 space-y-1 mb-4 min-h-[88px]">
                {isSearching ? (
                    <div className="py-1">
                        <div className="relative group">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#9CA3AF] group-focus-within:text-white transition-colors" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search chats..."
                                className="w-full bg-[#2F2F2F] text-[#ECECEC] pl-9 pr-8 py-2 rounded-full text-sm border border-transparent focus:border-[#444] focus:bg-[#2A2A2A] focus:outline-none transition-all placeholder:text-[#737373]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                        setIsSearching(false);
                                        setSearchQuery("");
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    setIsSearching(false);
                                    setSearchQuery("");
                                }}
                                className="absolute right-2 top-2 p-0.5 text-[#9CA3AF] hover:text-white hover:bg-[#333] rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={handleNewChat}
                            className="w-full flex items-center gap-2 px-3 py-2 bg-[#2F2F2F] text-white hover:bg-[#1A1A1A] rounded-lg transition-colors text-sm font-medium border border-transparent shadow-sm group"
                        >
                            <div className="w-5 h-5 rounded-full bg-[#424242] flex items-center justify-center group-hover:bg-[#4E4E4E] transition-colors">
                                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </div>
                            <span>New chat</span>
                        </button>
                        <button
                            onClick={() => setIsSearching(true)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors text-sm font-medium"
                        >
                            <Search className="w-4 h-4" strokeWidth={2} />
                            <span>Search</span>
                        </button>
                    </>
                )}
            </div>

            {/* Nav Items - Hide when searching to focus on results */}
            {!isSearching && (
                <div className="px-3 space-y-0.5 mb-6">
                    {navItems.map((item, index) => (
                        <button key={index} className="w-full flex items-center gap-3 px-3 py-2 text-[#ECECEC] hover:bg-[#1A1A1A] rounded-lg transition-colors text-sm font-medium group">
                            <item.icon className="w-4 h-4 text-[#ECECEC]" strokeWidth={2} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Recents List */}
            <div className="px-5 mb-2 mt-2">
                <span className="text-xs font-medium text-[#737373]">
                    {isSearching ? 'Results' : 'Recents'}
                </span>
            </div>
            <div className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar pb-4">
                {filteredRecents.length > 0 ? (
                    filteredRecents.map((item, index) => (
                        <button key={index} className="w-full text-left px-3 py-2 text-[#9CA3AF] hover:text-[#ECECEC] hover:bg-[#1A1A1A] rounded-lg transition-colors text-sm truncate font-medium group relative">
                            <span className="truncate block pr-4">{item}</span>
                            {!isSearching && <MoreHorizontal className="w-4 h-4 text-[#9CA3AF] opacity-0 group-hover:opacity-100 absolute right-2 top-2.5" />}
                        </button>
                    ))
                ) : (
                    <div className="px-3 py-4 text-center text-sm text-[#737373]">
                        No chats found
                    </div>
                )}
            </div>

            {/* User Profile */}
            <div className="p-3 mt-auto border-t border-transparent">
                <button className="w-full flex items-center gap-3 px-2 py-2 text-[#ECECEC] hover:bg-[#1A1A1A] rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#D1D0C5] text-[#171717] flex items-center justify-center text-xs font-medium tracking-tight">
                        AG
                    </div>
                    <div className="flex-1 text-left overflow-hidden leading-tight">
                        <div className="text-sm font-medium truncate">Atharv Gaur</div>
                        <div className="text-xs text-[#9CA3AF] truncate">Free plan</div>
                    </div>
                    <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
                </button>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 0px; /* Hidden but scrollable */
                }
                .custom-scrollbar:hover::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default Sidebar;