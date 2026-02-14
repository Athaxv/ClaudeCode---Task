"use client";
import React, { useState } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';

interface CopyBlockProps {
  text: string;
  label?: string;
  className?: string;
}

const CopyBlock: React.FC<CopyBlockProps> = ({ text, label = "Get Claude Code", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center bg-surface rounded-lg border border-[#333] p-1 pr-2 max-w-full overflow-hidden ${className}`}>
      {label && (
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-white border-b sm:border-b-0 sm:border-r border-[#333] bg-[#262626] sm:bg-transparent rounded-t-lg sm:rounded-none sm:rounded-l-lg w-full sm:w-auto justify-between sm:justify-start cursor-pointer hover:bg-[#262626] transition-colors">
          <span>{label}</span>
          <ChevronDown className="w-4 h-4 text-text-dim" />
        </div>
      )}
      <div className="flex flex-1 items-center justify-between w-full sm:w-auto px-4 py-3 sm:py-2 gap-4 bg-surface">
        <code className="font-mono text-sm text-text-dim truncate">
          <span className="text-[#D97757]">irm</span> <span className="text-white">{text}</span> <span className="text-blue-400">|</span> <span className="text-blue-400">iex</span>
        </code>
        <button
          onClick={handleCopy}
          className="text-text-dim hover:text-white transition-colors p-1"
          aria-label="Copy command"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default CopyBlock;