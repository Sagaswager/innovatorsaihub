
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SnowEffectProps {
  count?: number;
}

const SnowEffect: React.FC<SnowEffectProps> = ({ count = 60 }) => {
  // Generate random properties for each snowflake to create depth and variety
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.2,
      blur: Math.random() * 2,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, flake.opacity, flake.opacity, 0],
            x: [0, Math.random() * 50 - 25], // Subtle horizontal sway
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            left: flake.left,
            width: flake.size,
            height: flake.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            filter: `blur(${flake.blur}px)`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
