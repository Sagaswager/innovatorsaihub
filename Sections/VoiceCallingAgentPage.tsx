import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, PhoneCall, Volume2, Mic, Headphones, ArrowRight } from 'lucide-react';
import { trackEvent } from '../analytics';

interface VoiceCallingAgentPageProps {
  isDarkMode: boolean;
  navigateTo: (page: any) => void;
}

const VoiceCallingAgentPage: React.FC<VoiceCallingAgentPageProps> = ({ isDarkMode, navigateTo }) => {
  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hi Innovators AI HUB! I'm interested in deploying the Voice Calling AI Agent for inbound/outbound tele-calling. Let's arrange a live audio demo.");
    return `https://wa.me/919810875683?text=${text}`;
  };

  const handleHireClick = () => {
    trackEvent('hire_voice_agent_clicked');
    window.open(getWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Back navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Innovators AI HUB
        </motion.button>

        {/* Hero Header */}
        <div className="text-center md:text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <PhoneCall className="w-4 h-4" />
            Human-Like Conversational Voice AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-syne"
          >
            Voice Calling AI Agent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed"
          >
            Handle 1,000+ simultaneous phone calls with zero hold times. Our conversational voice bot conducts natural, latency-free telephone conversations in multiple Indian accents for customer support, lead qualification, and appointment reminders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleHireClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Hire Voice Calling Agent
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-base hover:bg-zinc-800 transition-all"
            >
              Schedule Audio Demo
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Mic className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ultra-Low Latency</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Sub-500ms conversational turn-around creates a seamless, natural back-and-forth dialogue indistinguishable from a skilled human tele-caller.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Volume2 className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Natural Accents & Tone</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Trained on regional Indian English and Hindi conversational intonations with emotional nuance, dynamic interruptions, and filler-word realism.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Headphones className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Inbound & Outbound Power</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Executes high-volume outbound lead qualification campaigns or fields sudden spikes in customer support inquiries with live transfer to human managers.
            </p>
          </div>
        </div>

        {/* Highlights & Pricing */}
        <div className="bg-gradient-to-r from-purple-950/40 via-zinc-900/50 to-zinc-900/40 border border-purple-500/20 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">TRANSPARENT PRICING</span>
              <h2 className="text-3xl font-bold text-white mt-1">Starts at ₹5,000 / month</h2>
              <p className="text-zinc-300 text-sm mt-2 max-w-xl">
                Integrated with Twilio, Vapi, and Retell AI infrastructure with full call recording, sentiment analysis, and transcript logging.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> Dedicated Indian virtual telephone number
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> Automated CRM call transcript logging
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> Real-time warm transfer to human staff when requested
                </li>
              </ul>
            </div>
            <button
              onClick={handleHireClick}
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold whitespace-nowrap shadow-xl shadow-purple-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Start Calling Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallingAgentPage;
