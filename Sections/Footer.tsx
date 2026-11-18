import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  currentPage?: 'home' | 'portfolio' | 'services' | 'contact' | 'register' | 'platform' | 'join' | 'admin' | 'whatsapp-ai-agent' | 'linkedin-ai-agent' | 'whatsapp-ai-agent-guide' | 'ai-agent-cost-in-india' | 'ai-agent-vs-chatbot' | 'whatsapp-business-api-approval' | 'voice-ai-agent-use-cases' | 'hire-an-ai-agent-checklist' | 'linkedin-automation-limits' | 'ai-agent-for-real-estate' | 'ai-agent-for-clinics' | 'my-plan' | 'privacy';
  navigateTo?: (page: any) => void;
}

const GUIDE_LINKS = [
  { slug: 'whatsapp-ai-agent-guide', label: 'WhatsApp AI agent guide' },
  { slug: 'ai-agent-cost-in-india', label: 'What an AI agent costs in India' },
  { slug: 'ai-agent-vs-chatbot', label: 'AI agent vs chatbot' },
  { slug: 'whatsapp-business-api-approval', label: 'WhatsApp Business API approval' },
  { slug: 'voice-ai-agent-use-cases', label: 'Voice AI agent use cases' },
  { slug: 'hire-an-ai-agent-checklist', label: 'How to hire an AI agent' },
  { slug: 'linkedin-automation-limits', label: 'LinkedIn automation limits' },
  { slug: 'ai-agent-for-real-estate', label: 'AI agent for real estate' },
  { slug: 'ai-agent-for-clinics', label: 'AI agent for clinics' },
];

const Footer: React.FC<FooterProps> = ({ isDarkMode, currentPage, navigateTo }) => {
  const externalLinks = [
    { name: "Instagram", url: "https://www.instagram.com/innovatorsaihub" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/108385521/" },
    { name: "YouTube", url: "https://www.youtube.com/@Contenaissance" },
    { name: "X (Twitter)", url: "https://x.com/contenaissance" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61579738437856" }
  ];


  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="py-24 px-6 max-w-[1400px] mx-auto flex flex-col gap-12">
      <nav aria-label="Guides" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-bold tracking-[0.3em] uppercase">
        {GUIDE_LINKS.filter((g) => g.slug !== currentPage).map((g) => (
          <a
            key={g.slug}
            href={`/${g.slug}`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo?.(g.slug);
            }}
            className="text-white/40 hover:text-white transition-all cursor-pointer"
          >
            {g.label}
          </a>
        ))}
      </nav>
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <button 
          onClick={() => navigateTo?.('platform')}
          className="flex items-center gap-4 group outline-none"
        >
          <img 
            src="/logo.png" 
            alt="Innovators AI HUB" 
            className="h-16 md:h-24 w-auto object-contain transition-all duration-300 group-hover:opacity-80" 
          />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 text-[10px] font-bold tracking-[0.4em] uppercase">
          <button onClick={() => navigateTo?.('services')} className="text-white/40 hover:text-white transition-all">Rent AI Co-worker</button>
          <button onClick={() => navigateTo?.('register')} className="text-white/40 hover:text-white transition-all">Event</button>
          <button onClick={() => navigateTo?.('privacy')} className="text-white/40 hover:text-white transition-all">Privacy policy</button>
          <a 
            href="/linkedin-ai-agent" 
            onClick={(e) => {
              e.preventDefault();
              navigateTo?.('linkedin-ai-agent');
            }}
            className="text-white/40 hover:text-white transition-all cursor-pointer"
          >
            LinkedIn AI Agent
          </a>
          <a 
            href="/whatsapp-ai-agent" 
            onClick={(e) => {
              e.preventDefault();
              navigateTo?.('whatsapp-ai-agent');
            }}
            className="text-white/40 hover:text-white transition-all cursor-pointer"
          >
            WhatsApp AI Agent
          </a>
          {externalLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/40 hover:text-white transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
          © {new Date().getFullYear()} Innovators AI HUB.
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
