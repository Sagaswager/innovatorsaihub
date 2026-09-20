import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Mail, Sparkles, Filter, Clock, ArrowRight } from 'lucide-react';
import { trackEvent } from '../analytics';

interface GmailAgentPageProps {
  isDarkMode: boolean;
  navigateTo: (page: any) => void;
}

const GmailAgentPage: React.FC<GmailAgentPageProps> = ({ isDarkMode, navigateTo }) => {
  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hi Innovators AI HUB! I'm interested in deploying the Gmail / Email AI Agent for my company inbox. Let's discuss requirements.");
    return `https://wa.me/919810875683?text=${text}`;
  };

  const handleHireClick = () => {
    trackEvent('hire_gmail_agent_clicked');
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Mail className="w-4 h-4" />
            Autonomous Email & Inbox Operations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-syne"
          >
            Gmail & Email AI Agent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed"
          >
            Reclaim 15+ hours every week from your email inbox. Our Gmail AI Agent triages incoming messages, classifies customer inquiries, drafts contextual human-quality replies, and flags urgent opportunities instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleHireClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-base shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Hire Gmail AI Agent
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-base hover:bg-zinc-800 transition-all"
            >
              Book Workflow Consultation
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Filter className="w-8 h-8 text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Automated Inbox Triage</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Separates newsletter noise from high-value buyer inquiries. Automatically labels, categorizes, and organizes priority emails in your inbox.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Sparkles className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Contextual Draft Generation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Reads attached proposals, previous thread history, and company documentation to craft flawless email draft responses ready for one-click approval.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Smart Follow-up Automation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Monitors non-responsive client threads and schedules polite, context-aware follow-up sequences to close pending negotiations faster.
            </p>
          </div>
        </div>

        {/* Highlights & Pricing */}
        <div className="bg-gradient-to-r from-red-950/40 via-zinc-900/50 to-zinc-900/40 border border-red-500/20 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">TRANSPARENT PRICING</span>
              <h2 className="text-3xl font-bold text-white mt-1">Starts at ₹4,000 / month</h2>
              <p className="text-zinc-300 text-sm mt-2 max-w-xl">
                Configured with Google Workspace OAuth API, strict encryption privacy standards, and customized tone-of-voice training.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400" /> Google Workspace & Microsoft 365 Outlook integration
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400" /> Human-in-the-loop review mode before sending
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400" /> Automated CRM contact lead enrichment
                </li>
              </ul>
            </div>
            <button
              onClick={handleHireClick}
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold whitespace-nowrap shadow-xl shadow-red-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Automate My Inbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GmailAgentPage;
