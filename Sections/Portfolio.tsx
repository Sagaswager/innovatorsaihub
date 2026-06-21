import React from 'react';
import Reels from './Reels';

interface PortfolioProps {
  isDarkMode: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ isDarkMode }) => {
  return (
    <section className="pt-32 md:pt-40 pb-24 max-w-full overflow-hidden relative bg-zinc-950">
      <div className="max-w-[1400px] mx-auto">
        <Reels isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default Portfolio;