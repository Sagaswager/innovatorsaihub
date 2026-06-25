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
import { ArrowRight } from 'lucide-react';
import AgentTeams from './Sections/AgentTeams';
import CustomAgentModal from './Sections/CustomAgentModal';
import CustomAgentBanner from './Sections/CustomAgentBanner';

const App: React.FC = () => {
  const [isDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | 'services' | 'contact'>('home');
  const [showAgentPopup, setShowAgentPopup] = useState(true);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>({});
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const toggleAgent = (id: string) => {
    if (id === 'custom-agents') {
      if (selectedAgents.includes(id)) {
        // Remove Custom Agent
        setSelectedAgents(prev => prev.filter(item => item !== id));
        setCustomDescriptions(prev => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      } else {
        // Open Modal to capture description
        setIsCustomModalOpen(true);
      }
    } else {
      setSelectedAgents(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    }
  };

  const navigateTo = (page: 'home' | 'portfolio' | 'services' | 'contact') => {
    setCurrentPage(page);
    // Use setTimeout to ensure DOM is updated before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
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
        {isCustomModalOpen && (
          <CustomAgentModal 
            key="custom-agent-modal"
            onClose={() => setIsCustomModalOpen(false)}
            onConfirm={(description) => {
              setSelectedAgents(prev => [...prev, 'custom-agents']);
              setCustomDescriptions(prev => ({ ...prev, 'custom-agents': description }));
              setIsCustomModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <Header 
        isDarkMode={isDarkMode} 
        currentPage={currentPage}
        navigateTo={navigateTo}
        selectedAgents={selectedAgents}
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
              <AgentTeams 
                isDarkMode={isDarkMode} 
                selectedAgents={selectedAgents} 
                toggleAgent={toggleAgent} 
                navigateTo={navigateTo} 
              />
              <AIQuote isDarkMode={isDarkMode} />
              <Reels isDarkMode={isDarkMode} />
              <CustomAgentBanner />
              <Services 
                isDarkMode={isDarkMode} 
                selectedAgents={selectedAgents} 
                customDescriptions={customDescriptions}
                toggleAgent={toggleAgent} 
                navigateTo={navigateTo} 
              />
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
              <Services 
                isDarkMode={isDarkMode} 
                isFullPage={true} 
                selectedAgents={selectedAgents} 
                customDescriptions={customDescriptions}
                toggleAgent={toggleAgent} 
                navigateTo={navigateTo} 
              />
              <div className="border-t border-white/5 mt-12 pt-12">
                <Reels isDarkMode={isDarkMode} />
              </div>
              <CustomAgentBanner />
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

      {/* Floating Chat/Social Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-3 select-none pointer-events-none">
        {/* Instagram Floating Icon */}
        <div className="relative group pointer-events-auto">
          <a
            href="https://www.instagram.com/innovatorsaihub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 shadow-lg shadow-purple-900/30 hover:shadow-purple-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Instagram Profile"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          {/* Tooltip */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-zinc-900 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap hidden md:block">
            Instagram Profile
          </div>
        </div>

        {/* WhatsApp Floating Icon */}
        <div className="relative group pointer-events-auto">
          <a
            href="https://wa.me/919810875683"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white bg-gradient-to-tr from-green-400 to-emerald-600 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-3.571c1.616.958 3.202 1.488 4.809 1.488 5.505 0 9.983-4.482 9.986-9.99.002-2.67-1.036-5.176-2.92-7.062C16.639 2.979 14.137 1.94 11.47 1.94c-5.513 0-10 4.49-10.003 10 .001 1.83.476 3.618 1.38 5.187L1.835 21.84l4.812-1.411zm11.921-7.854c-.3-.15-1.774-.875-2.046-.975-.27-.1-.466-.15-.66.15-.195.3-.755.95-.926 1.15-.17.2-.34.225-.64.075-.3-.15-1.265-.467-2.41-1.487-.89-.794-1.49-1.776-1.665-2.076-.175-.3-.019-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.66-1.59-1.002-2.41-.336-.807-.724-.697-.985-.71-.252-.012-.54-.015-.828-.015-.288 0-.756.108-1.15.54-.395.431-1.507 1.472-1.507 3.59s1.543 4.159 1.759 4.448c.216.29 3.037 4.639 7.358 6.51 1.028.444 1.83.709 2.455.908 1.032.328 1.97.281 2.712.17.828-.124 2.546-1.04 2.905-2.043.359-1.003.359-1.862.252-2.043-.108-.18-.302-.281-.602-.431z" />
            </svg>
          </a>
          {/* Tooltip */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-zinc-900 border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap hidden md:block">
            Chat on WhatsApp
          </div>
        </div>
      </div>


    </div>
  );
};

export default App;
