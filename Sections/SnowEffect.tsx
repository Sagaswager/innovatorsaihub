
import React, { useMemo, useState, useEffect } from 'react';

interface SnowEffectProps {
  count?: number;
}

const SnowEffect: React.FC<SnowEffectProps> = ({ count }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const effectiveCount = count ?? (isMobile ? 16 : 38);

  // Generate random properties once per count to avoid unnecessary layout recalculations
  const snowflakes = useMemo(() => {
    return Array.from({ length: effectiveCount }).map((_, i) => {
      const size = Math.random() * 3 + 1.5;
      const left = `${Math.random() * 100}%`;
      const duration = `${(Math.random() * 8 + 8).toFixed(1)}s`;
      const delay = `${(Math.random() * 8).toFixed(1)}s`;
      const opacity = (Math.random() * 0.4 + 0.25).toFixed(2);
      const sway = `${(Math.random() * 40 - 20).toFixed(0)}px`;

      return {
        id: i,
        size,
        left,
        duration,
        delay,
        opacity,
        sway,
      };
    });
  }, [effectiveCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snow-flake"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            '--flake-opacity': flake.opacity,
            '--flake-sway': flake.sway,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
