import React from 'react';
import { ArrowUp } from 'lucide-react';

const FooterLinkGroup = ({ title, links }: { title: string, links: string[] }) => (
  <div className="flex flex-col gap-3">
    <h4 className="text-sm font-medium text-text-dim mb-2">{title}</h4>
    {links.map((link) => (
      <a key={link} href="#" className="text-sm text-white hover:text-[#D97757] transition-colors font-medium">
        {link}
      </a>
    ))}
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#262626] bg-background pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          {/* Brand & Search */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-2 text-white font-serif text-2xl font-bold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D97757]">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
              </svg>
              <span>Claude</span>
            </div>

            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="How can I help you today?"
                className="w-full bg-surface border border-[#333] rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#D97757] transition-colors placeholder:text-[#555]"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-[#D97757] rounded-md text-white hover:bg-[#C4684A] transition-colors">
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md bg-[#262626] border border-[#333] text-xs text-text-dim hover:text-white flex items-center gap-2">
                <span>✎</span> Write
              </button>
              <button className="px-3 py-1.5 rounded-md bg-[#262626] border border-[#333] text-xs text-text-dim hover:text-white flex items-center gap-2">
                <span>📄</span> Learn
              </button>
              <button className="px-3 py-1.5 rounded-md bg-[#262626] border border-[#333] text-xs text-text-dim hover:text-white flex items-center gap-2">
                <span>&lt;/&gt;</span> Code
              </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterLinkGroup
              title="Products"
              links={['Claude', 'Claude Code', 'Cowork', 'Max plan', 'Team plan', 'Enterprise plan', 'Download app', 'Pricing', 'Log in']}
            />
            <FooterLinkGroup
              title="Solutions"
              links={['AI agents', 'Code modernization', 'Coding', 'Customer support', 'Education', 'Financial services', 'Government', 'Healthcare', 'Life sciences', 'Nonprofits']}
            />
            <div className="space-y-8">
              <FooterLinkGroup
                title="Learn"
                links={['Blog', 'Claude partner network', 'Courses', 'Connectors', 'Customer stories', 'Engineering at Anthropic', 'Events', 'Plugins', 'Powered by Claude', 'Service partners', 'Startups program', 'Tutorials', 'Use cases']}
              />
            </div>
            <div className="space-y-8">
              <FooterLinkGroup
                title="Help and security"
                links={['Availability', 'Status', 'Support center']}
              />
              <FooterLinkGroup
                title="Terms and policies"
                links={['Privacy choices', 'Privacy policy', 'Responsible disclosure policy', 'Terms of service: Commercial', 'Terms of service: Consumer', 'Usage policy']}
              />
              <FooterLinkGroup
                title="Company"
                links={['Anthropic', 'Careers', 'Economic Futures', 'Research', 'News', 'Responsible Scaling Policy', 'Security and compliance', 'Transparency']}
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#262626] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#555] text-xs font-medium tracking-widest uppercase">
          <div className="flex flex-col">
            <span>By Anthrop\c</span>
            <span>© 2026 Anthropic PBC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;