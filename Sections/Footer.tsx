import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  currentPage?: 'home' | 'portfolio' | 'services' | 'contact' | 'register';
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact' | 'register') => void;
}

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
      <div className="py-24 px-6 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <button 
          onClick={() => navigateTo?.('home')}
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
              navigateTo?.('whatsapp-ai-agent' as any);
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
    </footer>
  );
};

export default Footer;
