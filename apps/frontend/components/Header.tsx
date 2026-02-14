import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  onTryClaude?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTryClaude }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-[#262626]">
      {/* Top Nav */}
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => window.location.reload()}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D97757]">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
          </svg>
          <span className="text-white font-serif text-xl font-semibold">Claude</span>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-[#9B8E82] font-medium">
          <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">Meet Claude <ChevronDown className="w-3 h-3" /></div>
          <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">Platform <ChevronDown className="w-3 h-3" /></div>
          <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">Solutions <ChevronDown className="w-3 h-3" /></div>
          <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">Pricing <ChevronDown className="w-3 h-3" /></div>
          <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">Learn <ChevronDown className="w-3 h-3" /></div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a href="#" className="text-[13px] font-medium text-[#9B8E82] hover:text-white hidden sm:block transition-colors">Login</a>
          <button className="hidden sm:inline-flex items-center px-4 py-1.5 text-[13px] font-medium text-white border border-[#333] rounded-md hover:bg-[#1A1A1A] transition-colors">
            Contact sales
          </button>
          <button
            onClick={onTryClaude}
            className="inline-flex items-center px-4 py-1.5 text-[13px] font-medium text-white border border-[#333] rounded-md hover:bg-[#1A1A1A] transition-colors"
          >
            Try Claude
          </button>
        </div>
      </div>

      {/* Sub Nav — breadcrumb bar */}
      <div className="border-t border-[#262626] bg-background">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-2 text-[#9B8E82]">
            <span className="hover:text-white cursor-pointer transition-colors">Product</span>
            <span className="text-[#3D3530]">/</span>
            <span className="text-white font-medium">Claude Code</span>
          </div>
          <div className="flex items-center gap-1 text-[#9B8E82] hover:text-white cursor-pointer transition-colors">
            Explore here <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;