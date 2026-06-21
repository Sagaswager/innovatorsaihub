import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReelsProps {
  isDarkMode: boolean;
}

const ReelCard: React.FC<{
  isDarkMode: boolean;
  index: number;
  onClick: () => void;
}> = ({ isDarkMode, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Curated premium gradient pairs for each index
  const gradientClass = useMemo(() => {
    const gradients = [
      "from-blue-600/25 via-zinc-900 to-zinc-950",
      "from-indigo-600/25 via-zinc-900 to-zinc-950",
      "from-violet-600/25 via-zinc-900 to-zinc-950",
      "from-purple-600/25 via-zinc-900 to-zinc-950",
      "from-fuchsia-600/25 via-zinc-900 to-zinc-950"
    ];
    return gradients[index % gradients.length];
  }, [index]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        opacity: { duration: 0.8, delay: index * 0.1 },
        scale: { duration: 0.8, delay: index * 0.1 }
      }}
      whileHover={{ 
        y: -10, 
        zIndex: 45,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)" 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        scrollSnapAlign: 'center'
      }}
      className="relative h-[315px] md:h-[385px] aspect-[9/16] rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden border border-white/10 flex-shrink-0 transition-all bg-zinc-950 group cursor-pointer"
    >
      {/* Premium Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} z-0`} />

      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-10" />

      {/* Glow highlight */}
      <div className="absolute -inset-px bg-gradient-to-t from-blue-500/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Card Content (Only Play Button) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div 
          animate={isHovered ? { scale: 1.1, backgroundColor: "rgba(37, 99, 235, 1)", boxShadow: "0 0 25px rgba(37,99,235,0.6)" } : { scale: 1 }}
          className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
    </motion.div>
  );
};

const Reels: React.FC<ReelsProps> = ({ isDarkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeReel, setActiveReel] = useState<{ title: string; video: string } | null>(null);

  const reels = useMemo(() => [
    {
      title: "Storytelling",
      video: "https://drive.google.com/file/d/1G-oBfUf-vEzmN2-DPiajLGF5vVcRPrzI/preview"
    },
    {
      title: "Studio Vision",
      video: "https://drive.google.com/file/d/1aSqIVw42xcb5wVFaSx1wxd2fSRqoEOLp/preview"
    },
    {
      title: "AI Model",
      video: "https://drive.google.com/file/d/1qQLB4fpca0Z7nEjElHkl7dO8vigMvfIM/preview"
    },
    {
      title: "Cinematic Flow",
      video: "https://drive.google.com/file/d/1A2bxybhUp-XNb0YNkmkDN1CCdhCvFcox/preview"
    },
    {
      title: "Neural Core",
      video: "https://drive.google.com/file/d/1UpsXnLnt-ntxiVpn0d3yn_nPLSDGBJHj/preview"
    }
  ], []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < (scrollWidth - clientWidth - 10));
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 500;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden flex flex-col items-center bg-zinc-950">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none bg-blue-600/10 opacity-50" />

      <div className="mb-8 px-6 max-w-[1400px] w-full flex flex-col items-center z-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center leading-none font-sora text-white">
            AI Reels
          </h2>
        </motion.div>
      </div>

      {/* Modern Slider Container */}
      <div className="relative w-full max-w-[1600px] mx-auto z-20 group/slider flex items-center px-4 md:px-12">
        
        {/* Left Navigation Button */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full border flex items-center justify-center text-white z-40 transition-all shadow-xl bg-zinc-900/90 border-white/10 hover:bg-white hover:text-black flex-shrink-0 mr-4 ${
            !canScrollLeft ? 'opacity-30 cursor-not-allowed hover:bg-zinc-900/90 hover:text-white' : 'opacity-100 cursor-pointer'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar py-6 flex-grow"
          style={{ 
            scrollSnapType: 'x mandatory',
            perspective: '2000px'
          }}
        >
          {reels.map((reel, index) => (
            <div key={index} className="flex-shrink-0">
              <ReelCard 
                isDarkMode={isDarkMode}
                index={index}
                onClick={() => setActiveReel(reel)}
              />
            </div>
          ))}
          
          {/* Spacer to allow for better alignment at end */}
          <div className="w-6 md:w-8 flex-shrink-0" />
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full border flex items-center justify-center text-white z-40 transition-all shadow-xl bg-zinc-900/90 border-white/10 hover:bg-white hover:text-black flex-shrink-0 ml-4 ${
            !canScrollRight ? 'opacity-30 cursor-not-allowed hover:bg-zinc-900/90 hover:text-white' : 'opacity-100 cursor-pointer'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>

        {/* Cinematic Edge Faders (inside the scrolling box boundaries) */}
        <div className="absolute inset-y-0 left-16 md:left-28 w-16 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-16 md:right-28 w-16 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none z-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        <div className="flex gap-2">
          {reels.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-blue-500/30" />
          ))}
        </div>
      </motion.div>

      {/* Modal Popup for Playing Videos */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 pointer-events-auto"
            onClick={() => setActiveReel(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all z-[10000]"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${activeReel.video}?autoplay=1`}
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={activeReel.title}
                style={{ 
                  backgroundColor: '#000000'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reels;
