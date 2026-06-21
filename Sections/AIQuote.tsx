import React from 'react';
import { motion } from 'framer-motion';

interface AIQuoteProps {
  isDarkMode: boolean;
}

const AIQuote: React.FC<AIQuoteProps> = ({ isDarkMode }) => {
  const arialFont = { fontFamily: 'Arial, sans-serif' };

  const partners = [
    {
      name: "ClaudeAI",
      subtitle: "launched in July 2023",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-zinc-100 fill-current">
          <path d="M12 2.5a1.2 1.2 0 011.2 1.2v3.8l2.7-2.7a1.2 1.2 0 111.7 1.7l-2.7 2.7h3.8a1.2 1.2 0 110 2.4h-3.8l2.7 2.7a1.2 1.2 0 11-1.7 1.7l-2.7-2.7v3.8a1.2 1.2 0 11-2.4 0v-3.8l-2.7 2.7a1.2 1.2 0 11-1.7-1.7l2.7-2.7H3.7a1.2 1.2 0 110-2.4h3.8l-2.7-2.7A1.2 1.2 0 116.5 4.8l2.7 2.7V3.7A1.2 1.2 0 0112 2.5z" className="text-blue-500" />
        </svg>
      )
    },
    {
      name: "PikaLabs",
      subtitle: "launched in Dec 2023",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-zinc-100 fill-current">
          <path d="M6 3h6.5C16.1 3 19 5.9 19 9.5S16.1 16 12.5 16H8v5a1 1 0 11-2 0V3zm2 11h4.5c2 0 3.5-1.5 3.5-3.5S14.5 7 12.5 7H8v7z" className="text-blue-500" />
        </svg>
      )
    },
    {
      name: "xAI Grok",
      subtitle: "launched in Nov 2023",
      icon: (
        <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-7 md:h-7 fill-current text-zinc-100">
          <rect x="72" y="19" width="5.5" height="62" rx="0.5" className="text-zinc-100" />
          <path d="M23 81 l54.5 -62 h-7.5 l-54.5 62 z" className="fill-current text-zinc-100" />
          <path d="M23 41.5 l39.5 40 h-7.5 l-39.5 -40 z" className="fill-current text-blue-500" />
        </svg>
      )
    },
    {
      name: "SunoAI",
      subtitle: "launched in Dec 2023",
      icon: (
        <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-7 md:h-7 fill-current">
          <path d="M79.5 56.4c-2.3-6.8-7.8-12.8-14.8-16.7-.8-.5-1.9-.3-2.3.6L54.7 54c-1.3-.9-2.8-1.6-4.4-2.1l7.8-21.8c.3-.8-.1-1.8-1-2.1-.8-.3-1.8.1-2.1 1l-9 25.1C33.9 59 28 69.5 28 81c0 8.3 6.7 15 15 15 13.5 0 24.9-10.4 29.5-24 1.5.5 3 .8 4.5.8 7.2 0 13-5.8 13-13 0-1.2-.2-2.3-.5-3.4z" className="text-blue-500" />
          <path d="M43 78c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" className="text-zinc-100 opacity-20" />
        </svg>
      )
    },
    {
      name: "Gemini",
      subtitle: "launched in Feb 2024",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-zinc-100 fill-current">
          <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" className="text-blue-500" />
        </svg>
      )
    },
    {
      name: "Deepseek",
      subtitle: "launched in Jan 2024",
      icon: (
        <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-7 md:h-7 fill-current">
          <path d="M96.2 26.5c-1.8-6.1-8.1-10.4-15.6-10.8-6.2-.3-12.7 2.1-18.4 6-9.1 6.2-16.7 16-24.5 25.1-4.7 5.5-9.8 11.2-15.8 15.1-5.1 3.3-10.8 4.7-16.5 3.3-4.7-1.2-8.7-4.4-11-8.9-2-3.9-2.3-8.8-1-13.6 2.2-8 8.1-14.8 15.6-18 6-.9 12.1.8 17.5 4.5.6.4 1.3-.2 1-1-4-8.8-12.4-14.9-22-15.8C10.7 11.7 1 20 1 31.7c0 8.3 4.8 15.8 12 19.8 7.2 4 15.8 4.4 23.3 1.1 8.8-3.9 16-11.2 22.8-18.7 6.8-7.5 13.6-15.3 21.2-21.2 4-3.1 8.3-4.9 12.7-4.7 4.7.2 8.8 2.9 10.3 7.2 1.4 3.9.7 8.3-1.8 11.9-2.9 4.2-7.5 7.1-12.5 8.3-.7.2-.9 1.1-.3 1.4 7.6 4.3 17 4.7 24.3.7 7.3-4 11.5-12 11.5-20.5 0-4-.7-7.9-2.2-11.5z" className="text-zinc-100" />
          <path d="M57.6 52.3c-1.1-1.3-2.9-2.2-4.9-2.2-3.8 0-6.9 3.1-6.9 6.9 0 2 1 3.8 2.2 4.9.4.4 1 0 .9-.6-.2-.9-.3-1.9-.3-2.9 0-3.5 2.8-6.3 6.3-6.3 1 0 2 .1 2.9.3.6.1 1-.5.7-.9z" className="text-blue-500" />
          <circle cx="52.7" cy="57" r="1.8" className="text-blue-500" />
        </svg>
      )
    }
  ];

  return (
    <section className="pt-0 pb-8 md:pb-16 px-0 relative overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-zinc-950">
      <div className="max-w-[1400px] mx-auto text-center relative z-20 w-full flex flex-col items-center px-6">
        {/* Quote Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-0 mb-12 md:mb-20"
        >
          <h2 
            style={arialFont}
            className="text-xl md:text-3xl lg:text-4xl font-normal tracking-tight leading-tight mb-4 text-white/80"
          >
            "AI is changing so fast in 2026"
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.h3 
              style={arialFont}
              animate={{ 
                opacity: [0.95, 1, 0.95],
                scale: [1, 1.01, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-6xl md:text-8xl lg:text-[11rem] font-bold tracking-tighter text-white leading-none"
            >
              But are you?
            </motion.h3>
          </motion.div>
        </motion.div>
      </div>

      {/* Full-Screen Horizontal Infinite Loop Logo Marquee */}
      <div className="w-screen relative overflow-hidden py-10 bg-zinc-950/80 border-y border-white/5">
        <motion.div 
          className="flex flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ width: 'max-content' }}
        >
          {/* Repeated to create a perfect seamless scrolling marquee */}
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <div key={idx} className="flex-shrink-0 flex flex-col items-center px-16 md:px-24">
              {/* Partner Logo and Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-center justify-center transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900 shadow-inner">
                  {partner.icon}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-semibold text-white tracking-widest font-sora">
                    {partner.name}
                  </span>
                  <span className="text-[8px] md:text-[9px] text-zinc-400 font-mono tracking-widest uppercase mt-0.5">
                    {partner.subtitle}
                  </span>
                </div>
              </div>

              {/* Continuous Ruler Element */}
              <div className="w-full flex flex-col items-stretch">
                <div className="h-[1px] bg-white/10 w-full" />
                <div className="flex justify-between gap-2 px-1 pt-2 h-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-[1px] bg-white/20 transition-all ${
                        i === 0 ? 'h-4 bg-white/40' : i === 5 ? 'h-3 bg-white/30' : 'h-1.5'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Edge Faders for premium full-screen blending */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-zinc-950 via-zinc-950/60 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Decorative center line for alignment feel */}
      <motion.div 
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        className="mt-6 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"
      />
    </section>
  );
};

export default AIQuote;
