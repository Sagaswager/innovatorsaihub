import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Sections/Header';
import Hero from './Sections/Hero';
import Services from './Sections/Services';
import Reels from './Sections/Reels';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';
import Port from './Sections/Port';
import SnowEffect from './Sections/SnowEffect';
import AIQuote from './Sections/AIQuote';
import AgentPopup from './Sections/AgentPopup';

const App: React.FC = () => {
  const [isDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | 'services' | 'contact'>('home');
  const [showAgentPopup, setShowAgentPopup] = useState(true);

  const navigateTo = (page: 'home' | 'portfolio' | 'services' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      <AnimatePresence>
        {isDarkMode && (
          <motion.div
            key="snow-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <SnowEffect />
          </motion.div>
        )}
        {showAgentPopup && (
          <AgentPopup key="agent-popup" onClose={() => setShowAgentPopup(false)} />
        )}
      </AnimatePresence>

      <Header 
        isDarkMode={isDarkMode} 
        currentPage={currentPage}
        navigateTo={navigateTo}
      />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero isDarkMode={isDarkMode} navigateTo={navigateTo} />
              <AIQuote isDarkMode={isDarkMode} />
              <Reels isDarkMode={isDarkMode} />
              <Services isDarkMode={isDarkMode} />
              <Contact isDarkMode={isDarkMode} isFullPage={false} />
            </motion.div>
          )}

          {currentPage === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Port isDarkMode={isDarkMode} />
            </motion.div>
          )}

          {currentPage === 'services' && (
            <motion.div
              key="services-page"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <Services isDarkMode={isDarkMode} isFullPage={true} />
              <div className="border-t border-white/5 mt-12 pt-12">
                <Reels isDarkMode={isDarkMode} />
              </div>
              <div className="border-t border-white/5 pt-12 mt-12">
                <Contact isDarkMode={isDarkMode} isFullPage={false} />
              </div>
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <Contact isDarkMode={isDarkMode} isFullPage={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer isDarkMode={isDarkMode} currentPage={currentPage} navigateTo={navigateTo} />
    </div>
  );
};

export default App;
