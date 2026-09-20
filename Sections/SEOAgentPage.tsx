import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Search, TrendingUp, BarChart3, Globe, ArrowRight } from 'lucide-react';
import { trackEvent } from '../analytics';

interface SEOAgentPageProps {
  isDarkMode: boolean;
  navigateTo: (page: any) => void;
}

const SEOAgentPage: React.FC<SEOAgentPageProps> = ({ isDarkMode, navigateTo }) => {
  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hi Innovators AI HUB! I'm interested in deploying the SEO AI Agent for autonomous rank tracking, programmatic SEO, and backlinks. Let's connect.");
    return `https://wa.me/919810875683?text=${text}`;
  };

  const handleHireClick = () => {
    trackEvent('hire_seo_agent_clicked');
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Search className="w-4 h-4" />
            Autonomous Search Engine Optimization & GEO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-syne"
          >
            SEO AI Agent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed"
          >
            Drive recurring organic Google traffic and dominate AI answer engines (ChatGPT, Perplexity). Our SEO AI Agent continuously tracks search ranking volatility, finds content gaps, audits on-page technical factors, and scales authoritative backlink pipelines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <button
              onClick={handleHireClick}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Hire SEO AI Agent
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium text-base hover:bg-zinc-800 transition-all"
            >
              Get Free SEO Audit
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Autonomous Keyword Tracking</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Monitors daily position changes for high-intent B2B search terms across Google, surfacing instant opportunities to jump onto Page 1.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <Globe className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">GEO & AI Answer Optimization</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Engineered specifically for Generative Engine Optimization (GEO) so your brand is referenced and cited by Perplexity, Gemini, and ChatGPT Search.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Backlink Opportunity Finder</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Discovers high-authority directory citations, AI aggregators, and unlinked brand mentions to continuously grow your site's Domain Authority.
            </p>
          </div>
        </div>

        {/* Highlights & Pricing */}
        <div className="bg-gradient-to-r from-cyan-950/40 via-zinc-900/50 to-zinc-900/40 border border-cyan-500/20 rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">TRANSPARENT PRICING</span>
              <h2 className="text-3xl font-bold text-white mt-1">Starts at ₹8,000 / month</h2>
              <p className="text-zinc-300 text-sm mt-2 max-w-xl">
                Includes automated on-page audits, structured Schema.org generation, monthly backlink outreach, and Google Search Console performance reporting.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Continuous programmatic meta & schema tuning
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> High-DA directory submission pipeline
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Competitor content gap alerts
                </li>
              </ul>
            </div>
            <button
              onClick={handleHireClick}
              className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold whitespace-nowrap shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Dominate Google Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOAgentPage;
