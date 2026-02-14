import React from 'react';
import { MessageSquare, ListTodo, GitPullRequest } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 border-t border-[#D97757]/20">

      {/* Tab Controls */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#262626] text-white rounded-full text-sm font-medium border border-[#D97757]/40">
          <MessageSquare className="w-4 h-4" /> Onboarding
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-text-dim hover:text-white hover:bg-[#262626] rounded-full text-sm font-medium border border-transparent hover:border-[#333] transition-all">
          <ListTodo className="w-4 h-4" /> Triage issues
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-text-dim hover:text-white hover:bg-[#262626] rounded-full text-sm font-medium border border-transparent hover:border-[#333] transition-all">
          <GitPullRequest className="w-4 h-4" /> Refactor code
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Terminal View */}
        <div className="w-full bg-surface rounded-lg border border-[#333] overflow-hidden font-mono text-sm shadow-xl min-h-[600px] flex flex-col">
          <div className="bg-[#262626] px-4 py-3 border-b border-[#333] flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#444]"></div>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto flex-1 text-gray-300 space-y-6">

            {/* User Prompt */}
            <div>
              <div className="text-text-dim mb-2">&gt; I'm new to this codebase. Can you explain it to me?</div>
            </div>

            {/* Claude Response */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D97757] mt-2 flex-shrink-0"></div>
                <p>I'll analyze the Excalidraw codebase structure and provide a high-level overview.</p>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D97757] mt-2 flex-shrink-0"></div>
                <div>
                  <p className="mb-4">Analyze(what: "Excalidraw codebase structure and provide a high-level overview of what it is, its main components, and how they're organized. Focus on understanding the project's purpose, architecture, and key features.")</p>

                  <p className="mb-4">Excalidraw is an open-source virtual whiteboard application with a hand-drawn style. It's designed for creating diagrams, wireframes, and collaborative drawings.</p>

                  <p className="text-white font-bold mb-2">## Purpose</p>
                  <ul className="list-disc pl-4 space-y-1 text-text-dim">
                    <li>Web-based drawing tool with infinite canvas</li>
                    <li>Hand-drawn aesthetic with support for shapes, arrows, text</li>
                    <li>End-to-end encrypted collaboration</li>
                    <li>Works offline as a PWA (Progressive Web App)</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Feature Descriptions */}
        <div className="flex flex-col justify-center space-y-12 py-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">Code onboarding</h3>
            <p className="text-text-dim leading-relaxed">
              Claude Code maps and explains entire codebases in a few seconds. It uses agentic search to understand project structure and dependencies without you having to manually select context files.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-3 opacity-90">Turn issues into PRs</h3>
            <p className="text-text-dim leading-relaxed opacity-80">
              Stop bouncing between tools. Claude Code integrates with GitHub, GitLab, and your command line tools to handle the entire workflow—reading issues, writing code, running tests, and submitting PRs—all from your terminal.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-3 opacity-90">Make powerful edits</h3>
            <p className="text-text-dim leading-relaxed opacity-80">
              Claude Code's understanding of your codebase and dependencies enables it to make powerful, multi-file edits that work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;