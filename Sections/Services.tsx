import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Code, 
  Cpu, 
  Target, 
  Sparkles 
} from 'lucide-react';

interface ServicesProps {
  isDarkMode: boolean;
  isFullPage?: boolean;
}

const Services: React.FC<ServicesProps> = ({ isDarkMode, isFullPage = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<any>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [coords, setCoords] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const allServices = [
    {
      title: "AI Brand Films",
      description: "Cinematic storytelling powered by advanced generative AI, blending live action with synthetic environments.",
      icon: <Video />,
    },
    {
      title: "AI Agents Team",
      description: "Engineering autonomous agentic teams and multi-agent workflows that collaborate to solve complex business operations.",
      icon: <Code />,
    }
  ];


  const updateCoordinates = () => {
    if (!containerRef.current || !hubRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const hubRect = hubRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    let x1 = 0;
    let y1 = 0;

    if (isMobile) {
      // Mobile: Start from bottom-center of the hub
      x1 = hubRect.left + hubRect.width / 2 - parentRect.left;
      y1 = hubRect.bottom - parentRect.top + 8;
    } else {
      // Desktop: Start from center-right edge of the hub
      x1 = hubRect.right - parentRect.left + 15;
      y1 = hubRect.top + hubRect.height / 2 - parentRect.top;
    }

    const newCoords = allServices.map((_, index) => {
      const item = itemRefs.current[index];
      if (!item) return { x1, y1, x2: x1, y2: y1 };
      const itemRect = item.getBoundingClientRect();
      
      let x2 = 0;
      let y2 = 0;

      if (isMobile) {
        // Mobile: Connect to top-center of each pill
        x2 = itemRect.left + itemRect.width / 2 - parentRect.left;
        y2 = itemRect.top - parentRect.top;
      } else {
        // Desktop: Connect to center-left edge of the pill
        x2 = itemRect.left - parentRect.left;
        y2 = itemRect.top + itemRect.height / 2 - parentRect.top;
      }

      return { x1, y1, x2, y2 };
    });

    setCoords(newCoords);
  };

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    const timer = setTimeout(updateCoordinates, 500);
    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearTimeout(timer);
    };
  }, []);

  const drawPath = (c: { x1: number; y1: number; x2: number; y2: number }) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const dy = Math.abs(c.y2 - c.y1);
      const cx1 = c.x1;
      const cy1 = c.y1 + dy * 0.4;
      const cx2 = c.x2;
      const cy2 = c.y2 - dy * 0.4;
      return `M ${c.x1} ${c.y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.x2} ${c.y2}`;
    } else {
      const dx = Math.abs(c.x2 - c.x1);
      const cx1 = c.x1 + dx * 0.4;
      const cy1 = c.y1;
      const cx2 = c.x2 - dx * 0.4;
      const cy2 = c.y2;
      return `M ${c.x1} ${c.y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.x2} ${c.y2}`;
    }
  };

  return (
    <section id="services" className={`${isFullPage ? 'pt-40 md:pt-48' : 'py-8 md:py-12'} px-6 max-w-[1400px] mx-auto relative overflow-visible`}>
      <style>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>

      {/* Main Fan-out Container */}
      <div 
        ref={containerRef} 
        className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 py-10 overflow-visible w-full min-h-[500px]"
      >
        {/* Absolute SVG Canvas */}
        {coords.length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {coords.map((c, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <g key={idx}>
                  {isHovered && (
                    <motion.path
                      d={drawPath(c)}
                      fill="none"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="6"
                      opacity="0.1"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <path
                    d={drawPath(c)}
                    fill="none"
                    stroke={isHovered ? "url(#glowGradient)" : "rgb(63, 63, 70)"}
                    strokeWidth={isHovered ? "2.5" : "1.2"}
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    style={{
                      strokeDashoffset: isHovered ? -100 : 0,
                      animation: isHovered ? "dash-flow 1s linear infinite" : "none",
                      transition: "stroke 0.4s ease, stroke-width 0.4s ease, opacity 0.4s ease",
                      opacity: hoveredIdx === null ? 0.4 : isHovered ? 1.0 : 0.15
                    }}
                  />
                </g>
              );
            })}
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Left Side: Heading text acting as the hub */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start z-20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-blue-500/50" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">
                We Build
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white inline-block w-fit select-none"
            >
              <span ref={hubRef} className="inline">AI Agentic System</span>
            </motion.h2>
          </div>
        </div>

        {/* Right Side: 5 Service Pills */}
        <div className="w-full md:w-[50%] flex flex-col gap-6 z-20">
          {allServices.map((service, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-5 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/20 hover:bg-zinc-900/70 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/5 group/pill cursor-pointer w-full"
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 group-hover/pill:bg-blue-600 group-hover/pill:text-white group-hover/pill:scale-105 transition-all duration-500 shadow-inner flex-shrink-0">
                  {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 md:w-7 md:h-7" })}
                </div>
                {/* Text Content */}
                <div className="flex flex-col text-left">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-white tracking-tight group-hover/pill:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[11px] md:text-xs lg:text-sm font-light text-white/50 leading-relaxed mt-1 group-hover/pill:text-white/70 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

