import React from 'react';
import { motion } from './motion';
import { ArrowRight } from 'lucide-react';
import PillButton from './PillButton';

const CustomAgentBanner: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-6 py-12 md:py-16 bg-transparent flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-[1200px] rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
        }}
      >
        {/* Dotted Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left mb-8 md:mb-0 max-w-2xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 tracking-tight">
            Need a Custom AI Agent?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-white/90 font-light tracking-wide">
            Our team at Innovators AI HUB builds bespoke AI solutions tailored to your business.
          </p>
        </div>

        {/* Button */}
        <div className="relative z-10 flex-shrink-0">
          <PillButton
            as="a"
            href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
            target="_blank"
            rel="noopener noreferrer"
            className="!px-6 !py-3.5 md:!px-8 md:!py-4"
          >
            Book Free Consultation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-2" />
          </PillButton>
        </div>
      </motion.div>
    </section>
  );
};

export default CustomAgentBanner;
