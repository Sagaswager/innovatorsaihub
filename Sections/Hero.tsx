
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode, navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -40]);

  const backgroundVideoUrl = "https://res.cloudinary.com/df4ax8siq/video/upload/v1769062622/SV93YW50X3lvdV8yMDI2MDEyMjExNDZfbXAzczFfZ3hqYmpw.mp4";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden px-6 transition-colors duration-700 bg-zinc-950"
    >
      {/* Full Screen Cinematic Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <img 
          src="/IMG_6279.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-contain md:object-cover opacity-95 scale-100 transition-opacity duration-1000"
        />
        {/* Soft overlay gradient to ensure high readability of text while keeping background fully visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/30 to-zinc-950/80" />
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-[1400px] flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.04em] leading-[0.8] font-Ariel text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Grow
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.04em] leading-[0.8] font-serif-brand text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Brand
              </h1>
            </motion.div>

            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="text-sm md:text-lg lg:text-xl font-medium italic font-serif-brand lowercase tracking-[0.4em] ml-2 md:ml-4 -mt-1 md:-mt-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              with
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center select-none"
          >
            <span className="text-[12rem] md:text-[22rem] lg:text-[28rem] font-medium tracking-[-0.05em] leading-none font-Ariel relative text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
              AI
              
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  className="absolute -top-4 -right-6 md:-top-10 md:-right-20 w-6 h-6 md:w-16 md:h-16 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: "backOut" }}
                >
                  <motion.div 
                    className="absolute w-full h-full z-10 bg-white"
                    style={{ clipPath: 'polygon(50% 0%, 54% 46%, 100% 50%, 54% 54%, 50% 100%, 46% 54%, 0% 50%, 46% 46%)' }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full blur-[1px] shadow-[0_0_15px_rgba(255,255,255,1)] z-20" />
                  <motion.div 
                    className="absolute inset-0 rounded-full opacity-40 blur-[20px] md:blur-[30px] bg-blue-500"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center text-center mt-6 md:mt-4 w-full">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-xl md:text-3xl max-w-5xl font-light leading-none tracking-tight px-4 whitespace-normal md:whitespace-nowrap text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            Hire <span className="font-medium text-white">AI agents</span> that Grows you.
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mt-10 md:mt-14 flex flex-col items-center gap-5 w-full max-w-[1400px]"
      >
        <motion.a 
          href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group px-14 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-5 transition-all shadow-2xl bg-white text-zinc-950 shadow-white/5 inline-flex"
        >
          Book Demo Call <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>

        {/* Social Icons just below the button */}
        <div className="flex items-center gap-6 mt-3">
          <a 
            href="https://www.instagram.com/innovatorsaihub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/sagarmasand1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
