import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MessageSquare, Zap, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import { trackEvent } from '../analytics';

interface WhatsAppAgentPageProps {
  isDarkMode: boolean;
  navigateTo: (page: any) => void;
}

const WhatsAppAgentPage: React.FC<WhatsAppAgentPageProps> = ({ isDarkMode, navigateTo }) => {
  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hi Innovators AI HUB! I'm interested in deploying the WhatsApp AI Agent for my business. Can we discuss setup and pricing?");
    return `https://wa.me/919810875683?text=${text}`;
  };

  const handleHireClick = () => {
    trackEvent('hire_whatsapp_agent_clicked');
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <MessageSquare className="w-4 h-4" />
            24/7 Autonomous WhatsApp Automation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-syne"
          >
            WhatsApp AI Agent for Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed"
          >
            Transform your WhatsApp into an autonomous revenue engine. Instant reply to 1,000+ simultaneous inbound leads, qualify prospects, book calendar appointments, and synchronize data into your CRM in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleHireClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Hire WhatsApp AI Agent
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-base hover:bg-zinc-800 transition-all"
            >
              Request Custom Quote
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Zap className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Instant 24/7 Response</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Never let a hot lead go cold. Delivers sub-second replies at 2 AM or during peak campaign traffic without hiring round-the-clock staff.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Database className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Native CRM Synchronization</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Automatically captures names, emails, phone numbers, budgets, and intent, pushing updated contact cards directly to HubSpot, Zoho, or Salesforce.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <ShieldCheck className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Official WhatsApp Cloud API</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Enterprise-grade compliance built directly on the Meta Cloud API. Zero risk of phone number bans or unauthorized session dropouts.
            </p>
          </div>
        </div>

        {/* Highlights & Pricing */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900/50 to-zinc-900/40 border border-emerald-500/20 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">TRANSPARENT PRICING</span>
              <h2 className="text-3xl font-bold text-white mt-1">Starts at ₹12,000 / month</h2>
              <p className="text-zinc-300 text-sm mt-2 max-w-xl">
                Includes full onboarding, conversational knowledge base training, custom webhook CRM wiring, and continuous response optimization.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Complete WhatsApp Business API setup
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailored company FAQ and catalog ingestion
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lead qualification scoring & auto-calendar links
                </li>
              </ul>
            </div>
            <button
              onClick={handleHireClick}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold whitespace-nowrap shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Deploy Agent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppAgentPage;
