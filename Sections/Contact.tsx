import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, Mail, Phone, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, X } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
  isFullPage?: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode, isFullPage = false }) => {

  return (
    <section className={`${isFullPage ? 'min-h-screen pt-48 pb-24' : 'py-12'} px-6 relative overflow-hidden bg-zinc-950`}>
      <div className="max-w-[900px] mx-auto flex flex-col justify-start items-start">
        
        <div className="flex flex-col w-full z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-16 text-white leading-[0.9]"
          >
            Let's create the <br /> <span className="font-serif-brand italic font-normal">Next Wave.</span>
          </motion.h2>
          
          <div className="space-y-12 w-full">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/50 group-hover:border-white/20 transition-all">
                <Mail size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 text-white/40">Email Studio</p>
                <p className="text-2xl md:text-3xl font-medium text-white tracking-tight">Sagarmasand9@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/50 group-hover:border-white/20 transition-all">
                <Phone size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 text-white/40">Phone / Whatsapp</p>
                <p className="text-2xl md:text-3xl font-medium text-white tracking-tight">+919810875683</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-zinc-800 bg-zinc-900/50 group-hover:border-white/20 transition-all mt-1">
                <Globe size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 text-white/40">Our Base</p>
                <p className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
                  Office B23, 2nd Floor,<br />
                  Sec. 19, Noida
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
};

export default Contact;
