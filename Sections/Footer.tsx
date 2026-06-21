import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  currentPage?: 'home' | 'portfolio' | 'services' | 'contact';
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, currentPage, navigateTo }) => {
  const externalLinks = [
    { name: "Instagram", url: "https://www.instagram.com/contenaissance/" },
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
          <span className="text-base md:text-lg font-bold tracking-[0.2em] font-sora text-white transition-all group-hover:text-blue-400">
            Innovators AI HUB
          </span>
        </button>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 text-[10px] font-bold tracking-[0.4em] uppercase">
          <button onClick={() => navigateTo?.('services')} className="text-white/40 hover:text-white transition-all">Services</button>
          <a 
            href="https://linkedinaiagent.vercel.app/dashboard.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/40 hover:text-white transition-all"
          >
            Linkedin AI Agent
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
