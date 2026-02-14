import React from 'react';
import Button from './Button';
import { Sprout, Users, Zap, Network } from 'lucide-react';

interface PricingProps {
  onTryClaude?: () => void;
}

const PricingCard = ({ title, description, price, note, icon: Icon, onTryClaude }: any) => (
  <div className="bg-surface border border-[#262626] rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-[#D97757]/40 transition-colors">
    <div className="mb-6 text-white">
      <Icon className="w-10 h-10 stroke-1 mb-6 text-[#D97757]" />
      <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
      <p className="text-text-dim text-sm leading-relaxed mb-8 min-h-[80px]">
        {description}
      </p>
    </div>

    <div className="mt-auto">
      <div className="mb-2">
        <span className="text-2xl font-bold text-[#D97757]">${price}</span>
      </div>
      <p className="text-xs text-text-dim mb-8 leading-normal">{note}</p>
      <Button variant="primary" className="w-full justify-center" onClick={onTryClaude}>Try Claude</Button>
    </div>
  </div>
);

const Pricing: React.FC<PricingProps> = ({ onTryClaude }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col items-center mb-16">
        <Sprout className="w-12 h-12 stroke-1 text-[#D97757] mb-6" />
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-10 text-white">Get started with Claude Code</h2>

        {/* Toggle */}
        <div className="flex items-center p-1 bg-surface border border-[#333] rounded-full">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#333] text-white rounded-full text-sm font-medium shadow-sm">
            <Users className="w-4 h-4" /> Individual
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-text-dim hover:text-white rounded-full text-sm font-medium">
            <Network className="w-4 h-4" /> Team & Enterprise
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          icon={Sprout}
          title="Pro"
          description="Claude Code is included in your Pro plan. Perfect for short coding sprints in small codebases with access to both Sonnet 4.5 and Opus 4.6."
          price="17"
          note="Per month with annual subscription discount ($200 billed up front). $20 if billed monthly."
          onTryClaude={onTryClaude}
        />
        <PricingCard
          icon={Zap}
          title="Max 5x"
          description="Claude Code is included in your Max plan. Great value for everyday use in larger codebases."
          price="100"
          note="Per person billed monthly"
          onTryClaude={onTryClaude}
        />
        <PricingCard
          icon={Network}
          title="Max 20x"
          description="Even more Claude Code included in your Max plan. Great value for power users with the most access to Claude models."
          price="200"
          note="Per person billed monthly"
          onTryClaude={onTryClaude}
        />
      </div>
    </section>
  );
};

export default Pricing;