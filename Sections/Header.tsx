import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ExternalLink, Calendar, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  currentPage: 'home' | 'portfolio' | 'services' | 'contact';
  navigateTo: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
  selectedAgents?: string[];
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, currentPage, navigateTo, selectedAgents = [] }) => {
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Header transitions to dark glassmorphism on scroll
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(9, 9, 11, 0)', 'rgba(9, 9, 11, 0.85)']
  );
  const headerBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(16px)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['1px solid rgba(255, 255, 255, 0)', '1px solid rgba(255, 255, 255, 0.06)']
  );
  const headerPadding = useTransform(
    scrollY,
    [0, 50],
    ['24px 0px', '16px 0px']
  );

  const navItems: { label: string; page: 'home' | 'portfolio' | 'services' | 'contact'; type: 'internal' }[] = [
    { label: 'Studio', page: 'home', type: 'internal' },
    { label: 'Hire AI', page: 'services', type: 'internal' },
    { label: 'Portfolio', page: 'portfolio', type: 'internal' },
    { label: 'Contact', page: 'contact', type: 'internal' }
  ];

  const handleLinkClick = (page: 'home' | 'portfolio' | 'services' | 'contact') => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        style={{ 
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          borderBottom: headerBorder,
          padding: headerPadding
        }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-auto transition-all duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleLinkClick('home')}
              className="flex items-center group outline-none"
            >
              <span className="text-base md:text-lg font-bold tracking-[0.2em] font-sora text-white select-none transition-all group-hover:text-blue-400">
                Innovators AI HUB
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.3em] uppercase">
            {navItems.map((item) => (
              <button 
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`relative transition-all duration-300 outline-none group ${
                  currentPage === item.page ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white rounded-full" />
                )}
              </button>
            ))}
            <a 
              id="header-linkedin-agent-link"
              href="https://187.127.187.153.sslip.io/dashboard.html"
              target="_blank"
              rel="noopener noreferrer"
              className="relative transition-all duration-300 outline-none group text-white/60 hover:text-white rounded-lg py-1 flex items-center gap-1.5"
            >
              Linkedin AI Agent
            </a>
          </nav>

          {/* Header Actions (Right) */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Book Demo Call (Desktop) */}
            <motion.a 
              href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:inline-block px-4 py-2.5 md:px-5 md:py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-[0.2em] text-[8px] md:text-[9px] rounded-xl transition-all shadow-md shadow-blue-600/20 text-center"
            >
              BOOK DEMO CALL
            </motion.a>

            {/* Shopping Cart Button */}
            {selectedAgents.length > 0 && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => handleLinkClick('services')}
                className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all flex items-center justify-center cursor-pointer"
                title="View Selected Agents"
                aria-label="View Selected Agents"
              >
                <ShoppingCart size={16} />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-md shadow-blue-600/30">
                  {selectedAgents.length}
                </span>
              </motion.button>
            )}

            {/* Premium Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 outline-none text-white group"
              aria-label="Toggle Menu"
            >
              <span className="hidden xs:inline text-[9px] font-bold tracking-[0.2em] uppercase select-none text-white/80 group-hover:text-white pl-1">
                MENU
              </span>
              <Menu size={16} className="text-white group-hover:text-blue-400 transition-colors" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Slide-out Navigation Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] pointer-events-auto"
            />

            {/* Sliding Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-zinc-950 border-l border-white/10 z-[1000] p-8 md:p-12 flex flex-col justify-between shadow-2xl pointer-events-auto overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-[0.2em] uppercase font-sora text-white select-none">
                  Innovators AI HUB
                </span>
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white outline-none border border-white/10 transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-6 my-auto py-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-2">
                  Navigation
                </p>
                <nav className="flex flex-col gap-5">
                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.page}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleLinkClick(item.page)}
                      className="group flex items-center justify-between py-2 text-left outline-none border-b border-white/5 pb-3"
                    >
                      <span className={`text-2xl md:text-3xl font-light tracking-wide transition-colors ${
                        currentPage === item.page ? 'text-white font-normal' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}>
                        {item.label}
                      </span>
                      <ArrowRight 
                        size={18} 
                        className={`text-white/40 transition-all transform duration-300 ${
                          currentPage === item.page ? 'opacity-100 translate-x-0 text-white' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        }`} 
                      />
                    </motion.button>
                  ))}

                  {/* External Link: LinkedIn AI Agent */}
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    href="https://187.127.187.153.sslip.io/dashboard.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 text-left outline-none border-b border-white/5 pb-3"
                  >
                    <span className="text-2xl md:text-3xl font-light tracking-wide text-zinc-300 group-hover:text-white">
                      Linkedin AI Agent
                    </span>
                    <ExternalLink size={18} className="text-white/40 group-hover:text-white group-hover:scale-110 transition-all" />
                  </motion.a>
                </nav>
              </div>

              {/* Drawer Footer Actions & Socials */}
              <div className="flex flex-col gap-8">
                {/* Book Demo Call inside drawer (Crucial on Mobile) */}
                <motion.a 
                  href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white hover:bg-zinc-100 text-zinc-950 font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <Calendar size={14} /> BOOK DEMO CALL
                </motion.a>

                {/* Social Links */}
                <div className="flex flex-col gap-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
                    Connect With Us
                  </p>
                  <div className="flex items-center gap-5">
                    <a
                      href="https://www.instagram.com/innovatorsaihub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all transform hover:scale-110"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sagarmasand1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all transform hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
                  © {new Date().getFullYear()} Innovators AI HUB.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
