import React from 'react';
import CopyBlock from './CopyBlock';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
   return (
      <section className="w-full max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

         {/* Left: Final CTA */}
         <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-2 text-white">Create what's exciting.</h2>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-white">Maintain what's essential.</h2>

            <p className="text-text-dim mb-4 text-sm">Use Claude Code where you work</p>
            <div className="w-full max-w-md mb-8">
               <CopyBlock text="https://claude.ai/install.ps1" />
            </div>

            <div className="text-sm text-text-dim">
               Or read the <a href="#" className="underline hover:text-white decoration-text-dim underline-offset-4">documentation</a>
            </div>
         </div>

         {/* Right: Newsletter Card */}
         <div className="bg-surface rounded-2xl p-8 md:p-12 border border-[#262626]">
            <Mail className="w-8 h-8 text-white mb-6 stroke-1" />
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Get the developer newsletter</h3>
            <p className="text-text-dim text-sm mb-8 leading-relaxed">
               Product updates, how-tos, community spotlights, and more. Delivered monthly to your inbox.
            </p>

            <div className="flex items-center bg-[#262626] border border-[#333] rounded-lg p-1 mb-4">
               <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none focus:outline-none text-white px-4 py-2 w-full placeholder:text-[#555]"
               />
               <button className="p-2 bg-[#D97757] rounded-md text-white hover:bg-[#C4684A] transition-colors">
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>

            <p className="text-xs text-[#555] leading-relaxed">
               Please provide your email address if you'd like to receive our monthly developer newsletter. You can unsubscribe at any time.
            </p>
         </div>

      </section>
   );
};

export default Newsletter;