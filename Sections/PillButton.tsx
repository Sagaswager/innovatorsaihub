import React from 'react';
import { motion, HTMLMotionProps } from './motion';

interface PillButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

const PillButton: React.FC<PillButtonProps> = ({ 
  children, 
  as = 'button', 
  className = '', 
  ...props 
}) => {
  const baseClasses = `relative inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2.5 font-bold uppercase tracking-wider text-[10px] md:text-xs shadow-[0_4px_15px_rgba(0,0,0,0.5),_0_0_20px_rgba(139,92,246,0.15)] transition-all overflow-hidden group ${className}`;
  
  const innerContent = (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-zinc-950 z-0 rounded-full" />
      
      {/* Subtle purple/blue gradient glow on the right */}
      <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-blue-600/30 via-purple-500/20 to-transparent blur-md z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Border for definition */}
      <div className="absolute inset-0 rounded-full border border-white/10 z-10 group-hover:border-white/20 transition-colors pointer-events-none" />

      {/* Text Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 w-full text-center">
        {children}
      </span>
    </>
  );

  if (as === 'a' && props.href) {
    return (
      <motion.a
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
        {...(props as any)}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      {...(props as any)}
    >
      {innerContent}
    </motion.button>
  );
};

export default PillButton;
