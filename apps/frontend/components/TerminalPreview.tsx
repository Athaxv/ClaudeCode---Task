"use client";
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

const TerminalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Terminal');

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20 relative">
      {/* Controls */}
      <div className="flex flex-col items-center mb-12 relative z-10">
        <h3 className="text-sm font-medium mb-4 text-white">Use Claude Code where you work</h3>
        <div className="flex items-center p-1 bg-surface border border-[#333] rounded-lg">
          {['Terminal', 'IDE', 'Web and iOS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${activeTab === tab
                ? 'bg-[#333] text-white shadow-sm'
                : 'text-text-dim hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-2 py-1.5 text-text-dim hover:text-white border-l border-[#333] ml-1">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Content */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#D97757] from-[#D97757]/20 via-[#2A1A12] to-[#141414] p-8 md:p-16 min-h-[500px] flex items-center justify-center">
        {/* Abstract Background Patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 C 30 10, 50 30, 40 50 C 30 70, 10 80, 0 100 V 100 H 100 V 0 H 0" fill="none" stroke="black" vectorEffect="non-scaling-stroke" strokeWidth="0.5" />
            <path d="M100 0 C 70 20, 50 40, 60 60 C 70 80, 90 90, 100 100" fill="none" stroke="black" vectorEffect="non-scaling-stroke" strokeWidth="0.5" />
            <path d="M0 50 Q 50 50 100 50" fill="none" stroke="black" vectorEffect="non-scaling-stroke" strokeWidth="0.5" strokeOpacity="0.3" />
          </svg>
        </div>

        {/* Terminal Window */}
        <div className="relative w-full max-w-4xl bg-[#141414] rounded-xl shadow-2xl border border-[#333] overflow-hidden font-mono text-sm leading-relaxed z-10">
          {/* Terminal Header */}
          <div className="bg-[#1A1A1A] px-4 py-3 border-b border-[#333] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#333]"></div>
            <div className="w-3 h-3 rounded-full bg-[#333]"></div>
            <div className="w-3 h-3 rounded-full bg-[#333]"></div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 min-h-[400px] text-gray-300">
            <div className="inline-block px-4 py-2 border border-[#D97757] text-white rounded mb-6">
              <span className="mr-2 text-[#D97757]">*</span> Welcome to Claude Code
            </div>

            <div className="mb-4">
              <span className="text-text-dim">&gt;</span> <span className="font-bold text-white">Think harder...</span>
            </div>

            <div className="pl-4 border-l-2 border-[#D97757]/30 mb-6">
              <div className="text-[#888]">
                <span className="text-purple-400">while</span>(curious) {'{'}
              </div>
              <div className="pl-4 text-[#888]">
                question_everything();
              </div>
              <div className="pl-4 text-[#888]">
                dig_deeper();
              </div>
              <div className="pl-4 text-[#888]">
                connect_dots(unexpected);
              </div>
              <br />
              <div className="pl-4 text-[#888]">
                <span className="text-purple-400">if</span> (stuck) {'{'}
              </div>
              <div className="pl-8 text-[#888]">
                keep_thinking();
              </div>
              <div className="pl-4 text-[#888]">
                {'}'}
              </div>
              <div className="text-[#888]">
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Label */}
      <div className="flex flex-col md:flex-row justify-between mt-12 px-4">
        <h2 className="text-3xl font-serif text-white mb-4 md:mb-0">Terminal</h2>
        <p className="text-text-dim max-w-lg leading-relaxed">
          Work with Claude directly in your terminal. Claude explores your codebase context, answers questions, and make changes. It can even use all your CLI tools.
        </p>
      </div>
    </section>
  );
};

export default TerminalPreview;