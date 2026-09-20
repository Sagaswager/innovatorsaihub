import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Users, Target, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { trackEvent } from '../analytics';

interface LinkedInAgentPageProps {
  isDarkMode: boolean;
  navigateTo: (page: any) => void;
}

const LinkedInAgentPage: React.FC<LinkedInAgentPageProps> = ({ isDarkMode, navigateTo }) => {
  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hi Innovators AI HUB! I'm interested in deploying the LinkedIn AI Agent for B2B lead generation. Let's discuss onboarding and pricing.");
    return `https://wa.me/919810875683?text=${text}`;
  };

  const handleHireClick = () => {
    trackEvent('hire_linkedin_agent_clicked');
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Users className="w-4 h-4" />
            Autonomous B2B Lead Generation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-syne"
          >
            LinkedIn AI Agent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed"
          >
            Scale B2B appointments on autopilot without risking account restrictions. Our LinkedIn AI Agent personalizes connection outreach, engages prospects in natural conversation, qualifies buyer intent, and books meetings directly into your calendar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleHireClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Hire LinkedIn AI Agent
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://innovatorslinai.duckdns.org/dashboard.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-base hover:bg-zinc-800 transition-all"
            >
              View Live Dashboard Demo
            </a>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Target className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Hyper-Personalized Openers</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Scrapes recent prospect posts, career transitions, and mutual interests to generate high-conversion conversation starters rather than spammy copy-paste templates.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">3.5x More Demos Booked</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Nurtures conversations gracefully over days, handling pricing questions and availability checks until prospects confirm a Calendly/Google Meet demo slot.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ban-Safe Warmup Algorithm</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Respects human pacing with randomized delay intervals, daily quota caps, and native browser session cookies to guarantee zero account bans.
            </p>
          </div>
        </div>

        {/* Highlights & Pricing */}
        <div className="bg-gradient-to-r from-blue-950/40 via-zinc-900/50 to-zinc-900/40 border border-blue-500/20 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">TRANSPARENT PRICING</span>
              <h2 className="text-3xl font-bold text-white mt-1">Starts at ₹3,000 / month</h2>
              <p className="text-zinc-300 text-sm mt-2 max-w-xl">
                Includes full persona prompt configuration, target audience filtering, connection sequence creation, and monthly performance reports.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Up to 500 targeted outbound prospects/month
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Dynamic calendar link integration
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Dedicated live web dashboard access
                </li>
              </ul>
            </div>
            <button
              onClick={handleHireClick}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold whitespace-nowrap shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Launch LinkedIn Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAgentPage;
