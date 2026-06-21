import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AgentPopupProps {
  onClose: () => void;
}

const AgentPopup: React.FC<AgentPopupProps> = ({ onClose }) => {
  const [isMerging, setIsMerging] = useState(false);
  const [target, setTarget] = useState({ x: 0, y: 0 });

  const updateTarget = () => {
    const el = document.getElementById('header-linkedin-agent-link');
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      setTarget({
        x: targetX - window.innerWidth / 2,
        y: targetY - window.innerHeight / 2
      });
    } else {
      // Fallback: top right of window
      setTarget({
        x: (window.innerWidth - 100) - window.innerWidth / 2,
        y: 50 - window.innerHeight / 2
      });
    }
  };

  useEffect(() => {
    updateTarget();
    window.addEventListener('resize', updateTarget);
    return () => window.removeEventListener('resize', updateTarget);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMerging(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMerging) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMerging]);

  const handleAccess = () => {
    window.open("https://linkedinaiagent.vercel.app/dashboard.html", "_blank", "noopener,noreferrer");
    setIsMerging(true);
  };

  const handleAnimationComplete = () => {
    if (isMerging) {
      onClose();
      // Trigger header link glowing highlight
      const el = document.getElementById('header-linkedin-agent-link');
      if (el) {
        el.classList.add('pulse-glow');
        setTimeout(() => el.classList.remove('pulse-glow'), 1300);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMerging ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md pointer-events-auto"
        onClick={() => setIsMerging(true)}
      />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={isMerging ? {
          x: target.x,
          y: target.y,
          scale: 0.01,
          opacity: 0,
          rotate: 15
        } : {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1
        }}
        transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
        onAnimationComplete={handleAnimationComplete}
        className="relative w-[320px] md:w-[380px] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.25)] pointer-events-auto cursor-pointer group flex flex-col z-10"
        onClick={handleAccess}
      >
        {/* Hover overlay highlights */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* X Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMerging(true);
          }}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white/80 hover:text-white flex items-center justify-center border border-white/10 shadow-lg transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X size={16} />
        </button>

        {/* Preview Image */}
        <img
          src="/linkedin_agent_preview.png"
          alt="LinkedIn AI Agent Setup"
          className="w-full h-auto select-none pointer-events-none object-cover"
        />

        {/* Hint bar below the image */}
        <div className="w-full bg-zinc-950 py-3.5 px-4 text-center border-t border-white/5 select-none pointer-events-none">
          <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 group-hover:text-blue-300 transition-colors uppercase">
            Click here to access Dashboard
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default AgentPopup;
