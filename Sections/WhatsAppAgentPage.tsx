import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import { trackAgentRental, trackContact, trackEvent } from '../analytics';

interface WhatsAppAgentPageProps {
  isDarkMode?: boolean;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact' | 'platform' | 'register' | any) => void;
}

// Official WhatsApp Brand Vector (Simple Icons standard)
const WhatsAppIcon: React.FC<{ className?: string; fill?: string }> = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.82 9.82 0 01-5.028-1.388l-.36-.214-3.741.982.998-3.648-.235-.374a9.865 9.865 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.955c-.003 5.444-4.437 9.88-9.875 9.88M20.41 3.588C18.157 1.334 15.155.074 11.97.074c-6.577 0-11.93 5.353-11.93 11.93 0 2.103.55 4.159 1.597 5.96L.1 24.348l6.34-1.666a11.935 11.935 0 005.717 1.458h.005c6.576 0 11.93-5.354 11.93-11.93 0-3.185-1.26-6.186-3.513-8.441"/>
  </svg>
);

// Official Meta Infinity Brand Vector
const MetaIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="#0668E1">
    <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
  </svg>
);

const WhatsAppAgentPage: React.FC<WhatsAppAgentPageProps> = ({ isDarkMode = false, navigateTo }) => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4dF7wuetgSnMA2Dw0nkwunHeZaroNaYJeP5XAAf4pmxtqZQPsNWo1tNH9nc3rprTm/exec";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    whyUse: false,
    features: false,
    howItWorks: false,
    useCases: false,
    security: false,
    faq: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const scrollToRentAgent = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const btn = document.getElementById('rent-agent-pricing-btn');
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      btn.classList.add('ring-4', 'ring-emerald-400', 'scale-105', 'transition-all');
      setTimeout(() => {
        btn.classList.remove('ring-4', 'ring-emerald-400', 'scale-105', 'transition-all');
      }, 1500);
    }
  };

  const handleRentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const userData = {
      name,
      email,
      mail: email,
      number,
      profession,
      companyName,
      agent: 'WhatsApp AI Agent',
      price: '₹2,999/mo',
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(userData)
      });

      const existingUsersRaw = localStorage.getItem('platform_registered_users');
      const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
      if (!existingUsers.some((u: any) => u.email === email)) {
        existingUsers.push(userData);
        localStorage.setItem('platform_registered_users', JSON.stringify(existingUsers));
      }
      localStorage.setItem('platform_user', JSON.stringify({ name, email }));

      setIsSubmitted(true);
      trackAgentRental('WhatsApp AI Agent', '₹2,999/mo', {
        name,
        email,
        phone: number,
        profession,
        companyName,
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError('Failed to submit rental request. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#f9f9f9] text-[#0F172A] selection:bg-[#25D366] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Decorative Blur Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-emerald-100/60 rounded-full blur-[130px]"></div>
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-sky-100/50 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-20 left-1/3 w-[700px] h-[500px] bg-emerald-50/70 rounded-full blur-[160px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      </div>

      {/* TOP NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="h-20 w-full max-w-[1400px] mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer"
            onClick={() => navigateTo ? navigateTo("platform") : (window.location.href = "/")}
          >
            <img alt="Innovators AI HUB" className="h-8 md:h-10 w-auto object-contain" src="/logo-dark.png" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold text-primary-container tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-whatsapp-green animate-pulse"></span>
              Whatsapp AI Agent
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-inner">
            <a
              aria-current="page"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-900 bg-white shadow-sm transition-all cursor-pointer"
              data-path="features"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (navigateTo) navigateTo("platform");
                else window.location.href = "/";
              }}
            >
              Home
            </a>
            <a
              className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
              data-path="pricing"
              href="#rental-pricing"
            >
              Pricing
            </a>
            <a
              className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all cursor-pointer"
              data-path="faq"
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                setOpenSections(prev => ({ ...prev, faq: true }));
                setTimeout(() => {
                  const el = document.getElementById('faq');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold shadow hover:bg-slate-800 active:scale-95 transition-all"
              href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              Book Demo
            </a>
            <button
              onClick={scrollToRentAgent}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-white text-xs font-semibold shadow-[0_4px_14px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white fill-white shrink-0" />
              Rent WhatsApp AI Agent
            </button>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-transparent min-h-screen">
        <div className="flex flex-col w-full">
          {/* ========================================================================= */}
          {/* SECTION 1: HERO VIEWPORT */}
          {/* ========================================================================= */}
          <section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-2xl md:py-space-3xl overflow-hidden">
            <div className="absolute -top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/70 via-emerald-50/40 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-blue-50/70 rounded-full blur-[100px] pointer-events-none -z-10"></div>

            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-space-2xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-space-lg">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-whatsapp-green"></span>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-slate-800 uppercase">
                    TRENDING <span className="text-primary-container font-extrabold">in GURUGRAM</span>
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  <span>Starts at ₹2,999/mo</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-primary-container text-[11px] font-bold tracking-wider uppercase">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Trust the Innovator, First</span>
                </div>
              </div>

              {/* Shortened Headline with Official WhatsApp Logo */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-space-md leading-[1.15]">
                <span className="inline-flex items-center gap-3 align-baseline">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(37,211,102,0.35)] -mt-1">
                    <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">WhatsApp</span> AI Agent
                </span>
              </h1>

              {/* Humanized Subheadline */}
              <p className="font-body-base text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-space-xl">
                Reply to customer inquiries in seconds, qualify leads automatically, and book appointments 24/7 — right inside WhatsApp.
              </p>

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto justify-center mb-space-xl">
                <button
                  onClick={scrollToRentAgent}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary-container text-white font-semibold text-base shadow-[0_8px_20px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
                  Rent WhatsApp AI Agent
                </button>
              </div>

              {/* Trust Bar / Integrations Strip */}
              <div className="w-full pt-space-md flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                  <WhatsAppIcon className="w-[18px] h-[18px] text-[#25D366] fill-[#25D366] shrink-0" />
                  <span>Official WhatsApp Cloud API</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                  <span className="material-symbols-outlined text-crm-sync-gold text-[18px]">hub</span>
                  <span>HubSpot &amp; Zoho Sync</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                  <span className="material-symbols-outlined text-read-cyan text-[18px]">speed</span>
                  <span>99.9% Reliable Uptime</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">code_off</span>
                  <span>Zero Coding Required</span>
                </div>
              </div>
            </div>

            {/* Interface Image Preview */}
            <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-200/80 bg-black/5 flex items-center justify-center relative">
              <img
                alt="Innovators AI Hub WhatsApp AI Agent interface with feature callouts for Instant Support, Appointment Booking, Automated Lead Qualification, and Real-time CRM Sync"
                className="w-full h-auto object-contain rounded-2xl"
                src="/whatsapp-agent-interface.webp"
                width={2560}
                height={1440}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: DEDICATED WHATSAPP AI AGENT PRICING & AUTOMATION MATRIX */}
          {/* Positioned directly below whatsapp-agent-interface.png */}
          {/* ========================================================================= */}
          <section className="relative w-full max-w-[1000px] mx-auto px-gutter py-space-xl" id="rental-pricing">
            <div id="pricing" className="relative rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-10 md:p-12 overflow-hidden">
              {/* Header Row: Identity, Rating, Price, and Action */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(37,211,102,0.35)]">
                    <WhatsAppIcon className="w-10 h-10 text-white fill-white" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Whatsapp AI Agent
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-amber-500 font-bold text-sm">★ 4.5</span>
                      <span className="text-xs text-slate-500 font-medium">(2.7k ratings)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">
                        ₹2,999
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/mo</span>
                    </div>
                    <span className="text-xs text-slate-400 line-through mt-0.5">₹4,999</span>
                  </div>
                  <button
                    id="rent-agent-pricing-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold tracking-wide shadow-md shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    Rent Agent
                  </button>
                </div>
              </div>

              {/* Subtitle & Description */}
              <div className="pt-6 pb-6">
                <h4 className="font-display text-lg font-bold text-slate-900 mb-1.5">
                  One Agent. Countless Automation.
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Let our WhatsApp AI Agent handle your customer queries, follow-ups, and broadcast messages on autopilot while you focus on building relationships.
                </p>
              </div>

              {/* Two-Column Comparison Matrix strictly from user-provided image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {/* Column 1: Whatsapp AI Agent Automates */}
                <div className="flex flex-col gap-3">
                  <h5 className="font-bold text-base text-slate-900 mb-2">
                    Whatsapp AI Agent Automates
                  </h5>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Auto-reply to customer inquiries instantly
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Broadcast newsletters and promotional offers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Send automated order &amp; payment confirmations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Set up interactive chat menus
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Share catalog links and product details
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Label and organize chat groups automatically
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Does not include */}
                <div className="flex flex-col gap-3">
                  <h5 className="font-bold text-base text-slate-900 mb-2">
                    Does not include
                  </h5>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Spamming unverified numbers (complies with policy)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Bypass WhatsApp official policy bans
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Access to personal chat logs outside setup
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Multi-agent human routing (without integration)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Voice call recording and automatic transcription
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-snug">
                        Manual typing interface for offline chats
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLLAPSIBLE SECTIONS CONTAINER */}
          {/* ========================================================================= */}
          <section className="relative w-full max-w-[1200px] mx-auto px-gutter py-space-xl">
            {/* Section 1 Accordion: Why Use a WhatsApp AI Agent? */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all overflow-hidden mb-6" id="features">
              <button
                onClick={() => toggleSection('whyUse')}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">help</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        The Daily Challenge
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Why Use a WhatsApp AI Agent?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      Stop losing leads to slow replies. Give every customer instant, helpful attention.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline text-xs font-semibold text-slate-400">
                    {openSections.whyUse ? 'Collapse' : 'Tap to expand'}
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSections.whyUse ? "rotate-180 text-primary-container" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openSections.whyUse && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-slate-100 text-slate-700">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center mb-space-2xl">
                        <div className="lg:col-span-7 flex flex-col">
                          <p className="text-base text-slate-700 leading-relaxed mb-space-md">
                            Every business owner knows the feeling: a customer messages late in the evening or over the weekend. By the time your team responds the next morning, they've already moved on to someone else. Typing the exact same pricing answers, checking calendars, and chasing cold leads eats hours every single day.
                          </p>
                          <p className="text-sm text-slate-500 leading-relaxed mb-space-lg">
                            Your WhatsApp AI Agent acts like your friendliest, most dependable team member. It responds in seconds, answers product questions accurately, qualifies genuine buyers, and hands off ready leads directly to your sales team.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">Instant answers to common customer questions, day or night</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">No more typing the exact same replies 50 times a day</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">Gentle automated follow-ups so warm leads don't go cold</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">Clean customer contact details saved right to your CRM</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">Quick, hassle-free appointment booking right in the chat</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">Fluent conversations in Hinglish, Hindi, and English</span>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                            <img className="w-full h-[320px] object-cover" alt="Enterprise operations and customer experience team command center" src="/whatsapp_ai_agent.webp" loading="lazy" decoding="async"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 shadow-md">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Productivity Boost</span>
                                <span className="font-code-mono text-xs font-bold text-slate-900">+18 Hours Saved</span>
                              </div>
                              <p className="text-xs text-slate-600 mt-1">
                                Teams win back over 18 hours each week by automating repetitive WhatsApp inquiries.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4 KPI Blocks with Natural Phrasing */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md pt-4 border-t border-slate-100">
                        <div className="p-space-lg rounded-2xl bg-slate-50/70 border border-slate-200/80">
                          <span className="font-code-mono text-xs text-whatsapp-green font-bold block mb-1">INSTANT REPLIES</span>
                          <div className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">&lt; 2 sec</div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Customers get immediate help while their buying interest is highest, instead of waiting hours on read.
                          </p>
                        </div>
                        <div className="p-space-lg rounded-2xl bg-slate-50/70 border border-slate-200/80">
                          <span className="font-code-mono text-xs text-primary-container font-bold block mb-1">TIME SAVED</span>
                          <div className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">85%</div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Most common product questions, pricing queries, and FAQs are resolved completely on autopilot.
                          </p>
                        </div>
                        <div className="p-space-lg rounded-2xl bg-slate-50/70 border border-slate-200/80">
                          <span className="font-code-mono text-xs text-lime-growth font-bold block mb-1">MORE CONVERSIONS</span>
                          <div className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">3.4x</div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Fast, helpful responses keep buyers engaged and turn far more inquiries into paying customers.
                          </p>
                        </div>
                        <div className="p-space-lg rounded-2xl bg-slate-50/70 border border-slate-200/80">
                          <span className="font-code-mono text-xs text-read-cyan font-bold block mb-1">ALWAYS ON</span>
                          <div className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">24/7/365</div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Your storefront never sleeps — capture and nurture leads during evenings, weekends, and holidays.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 2 Accordion: Core Features */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all overflow-hidden mb-6">
              <button
                onClick={() => toggleSection('features')}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">featured_play_list</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        What Your Agent Can Do
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Helpful Features Built for Busy Businesses
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      Multilingual Support, Automated Follow-Ups, Appointment Booking, and Instant Lead Scoring.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline text-xs font-semibold text-slate-400">
                    {openSections.features ? 'Collapse' : 'Tap to expand'}
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSections.features ? "rotate-180 text-primary-container" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openSections.features && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                        {/* Feature 1 */}
                        <div className="p-space-lg rounded-2xl bg-slate-50/60 border border-slate-200/90 flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center text-primary-container mb-3">
                              <span className="material-symbols-outlined text-[22px]">translate</span>
                            </div>
                            <span className="font-code-mono text-xs font-bold text-primary-container uppercase tracking-wider">Feature 01</span>
                            <h4 className="font-display text-lg font-bold text-slate-900 mt-1 mb-2">1. Speak Your Customer's Language</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              India is diverse, and so are your buyers. Whether a customer asks in Hinglish, Hindi, or English, your agent understands the context and responds naturally in the tone they are most comfortable with.
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80">
                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">Why it matters:</span>
                            <p className="text-xs font-semibold text-emerald-950">
                              Connect with more customers across different regions without needing dedicated multilingual staff.
                            </p>
                          </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-space-lg rounded-2xl bg-slate-50/60 border border-slate-200/90 flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-sky-100/70 flex items-center justify-center text-read-cyan mb-3">
                              <span className="material-symbols-outlined text-[22px]">mark_chat_unread</span>
                            </div>
                            <span className="font-code-mono text-xs font-bold text-read-cyan uppercase tracking-wider">Feature 02</span>
                            <h4 className="font-display text-lg font-bold text-slate-900 mt-1 mb-2">2. Friendly Automated Follow-Ups</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              People get busy and forget to reply. Instead of letting warm interest fade away, your agent sends polite, thoughtful follow-ups that gently bring buyers back into the conversation.
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200/80">
                            <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block mb-0.5">Why it matters:</span>
                            <p className="text-xs font-semibold text-sky-950">
                              Revive dropped conversations and recover sales opportunities without anyone on your team having to track down who needs a reminder.
                            </p>
                          </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-space-lg rounded-2xl bg-slate-50/60 border border-slate-200/90 flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-crm-sync-gold mb-3">
                              <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                            </div>
                            <span className="font-code-mono text-xs font-bold text-crm-sync-gold uppercase tracking-wider">Feature 03</span>
                            <h4 className="font-display text-lg font-bold text-slate-900 mt-1 mb-2">3. Frictionless Appointment Booking</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              Skip the exhausting 'Are you free Tuesday?' back-and-forth. Customers can browse open slots and confirm consultations, service appointments, or demos directly inside WhatsApp.
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80">
                            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">Why it matters:</span>
                            <p className="text-xs font-semibold text-amber-950">
                              Appointments sync straight to Google Calendar or Cal.com, eliminating phone tag and double-bookings.
                            </p>
                          </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-space-lg rounded-2xl bg-slate-50/60 border border-slate-200/90 flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 flex items-center justify-center text-lime-growth mb-3">
                              <span className="material-symbols-outlined text-[22px]">leaderboard</span>
                            </div>
                            <span className="font-code-mono text-xs font-bold text-lime-growth uppercase tracking-wider">Feature 04</span>
                            <h4 className="font-display text-lg font-bold text-slate-900 mt-1 mb-2">4. Spot Ready Buyers Instantly</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              Not every message is ready to make a purchase today. Your agent politely asks the right questions upfront — budget, timeline, and exact needs — so you immediately know who is ready to buy.
                            </p>
                          </div>
                          <div className="p-3 rounded-xl bg-lime-50 border border-lime-200/80">
                            <span className="text-[10px] font-bold text-lime-900 uppercase tracking-wider block mb-0.5">Why it matters:</span>
                            <p className="text-xs font-semibold text-lime-950">
                              Your sales team spends their precious time talking only to qualified leads who are eager to close.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 3 Accordion: How It Works */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all overflow-hidden mb-6">
              <button
                onClick={() => toggleSection('howItWorks')}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">account_tree</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Simple &amp; Seamless
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      How It Works in Practice
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      From the very first 'Hello' to a confirmed sale, everything flows naturally.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline text-xs font-semibold text-slate-400">
                    {openSections.howItWorks ? 'Collapse' : 'Tap to expand'}
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSections.howItWorks ? "rotate-180 text-primary-container" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openSections.howItWorks && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                        <div className="p-space-md rounded-2xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-code-mono text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">01</span>
                            <WhatsAppIcon className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                          </div>
                          <h4 className="font-display text-sm font-bold text-slate-900 mb-1">Customer Sends a Message</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Inquiries arrive from your website, an Instagram or Facebook ad, a QR code, or an organic chat.
                          </p>
                        </div>
                        <div className="p-space-md rounded-2xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-code-mono text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">02</span>
                            <span className="material-symbols-outlined text-read-cyan text-[20px]">psychology</span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-slate-900 mb-1">Agent Reads the Room</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            It grasps what the customer wants, how urgent it is, and what language they prefer in a split second.
                          </p>
                        </div>
                        <div className="p-space-md rounded-2xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-code-mono text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">03</span>
                            <span className="material-symbols-outlined text-lime-growth text-[20px]">forum</span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-slate-900 mb-1">Helpful Answers in Seconds</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Shares product links, pricing details, or answers common questions in your brand's friendly voice.
                          </p>
                        </div>
                        <div className="p-space-md rounded-2xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-code-mono text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">04</span>
                            <span className="material-symbols-outlined text-indigo-600 text-[20px]">dataset</span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-slate-900 mb-1">Gathers Details Naturally</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Collects their name, location, and requirements through natural conversation, not an interrogation.
                          </p>
                        </div>
                        <div className="p-space-md rounded-2xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-code-mono text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">05</span>
                            <span className="material-symbols-outlined text-crm-sync-gold text-[20px]">auto_graph</span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-slate-900 mb-1">Identifies Ready Buyers</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Recognizes customers who are ready to book or purchase and prioritizes them for fast follow-up.
                          </p>
                        </div>
                        <div className="p-space-md rounded-2xl bg-slate-50/70 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-code-mono text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-bold border border-slate-200">06</span>
                            <span className="material-symbols-outlined text-primary-container text-[20px]">hub</span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-slate-900 mb-1">Alerts Your Team &amp; Syncs CRM</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Logs contact data into HubSpot or Zoho, holds calendar slots, and alerts your reps when human touch is needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 4 Accordion: Real-World Use Cases */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all overflow-hidden mb-6" id="use-cases">
              <button
                onClick={() => toggleSection('useCases')}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">domain</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Real-World Examples
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      How Different Businesses Use It Every Day
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      See how teams across retail, healthcare, and services turn WhatsApp into their top sales channel.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline text-xs font-semibold text-slate-400">
                    {openSections.useCases ? 'Collapse' : 'Tap to expand'}
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSections.useCases ? "rotate-180 text-primary-container" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openSections.useCases && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-slate-100 space-y-6">
                      {/* Vertical 1: E-Commerce */}
                      <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          <div className="lg:col-span-7 flex flex-col">
                            <span className="text-[11px] font-bold text-whatsapp-green uppercase tracking-wider mb-1">Direct-to-Consumer &amp; Retail</span>
                            <h4 className="font-display text-xl font-bold text-slate-900 mb-1">1. E-Commerce &amp; Retail Stores</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              Shoppers want quick answers on pricing, sizes, delivery dates, and return policies. Your agent answers inquiries in real time, shares product photos, and provides payment links — helping customers buy in minutes.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Catalog Links</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Stock Availability</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Payment Links</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Order Updates</span>
                            </div>
                          </div>
                          <div className="lg:col-span-5">
                            <img className="w-full h-[180px] object-cover rounded-xl border border-slate-200" alt="E-commerce automation" src="/retail_ecommerce.webp" loading="lazy" decoding="async"/>
                          </div>
                        </div>
                      </div>

                      {/* Vertical 2: Healthcare */}
                      <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          <div className="lg:col-span-7 flex flex-col">
                            <span className="text-[11px] font-bold text-read-cyan uppercase tracking-wider mb-1">Health &amp; Consultancies</span>
                            <h4 className="font-display text-xl font-bold text-slate-900 mb-1">2. Clinics &amp; Appointment-Based Services</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              Patients shouldn't have to wait on hold to book a doctor's visit or ask about clinic hours. The agent handles patient inquiries politely, checks open doctor slots, confirms visits, and sends reminder messages so no-shows drop drastically.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Doctor Slot Booking</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Cal.com &amp; Google Cal</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Automated Reminders</span>
                            </div>
                          </div>
                          <div className="lg:col-span-5">
                            <img className="w-full h-[180px] object-cover rounded-xl border border-slate-200" alt="Healthcare clinic appointment booking" src="/clinic_appointment.webp" loading="lazy" decoding="async"/>
                          </div>
                        </div>
                      </div>

                      {/* Vertical 3: Sales & Real Estate */}
                      <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          <div className="lg:col-span-7 flex flex-col">
                            <span className="text-[11px] font-bold text-crm-sync-gold uppercase tracking-wider mb-1">High-Ticket Services &amp; Real Estate</span>
                            <h4 className="font-display text-xl font-bold text-slate-900 mb-1">3. Real Estate &amp; B2B Sales Teams</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                              When you invest in digital ads, every incoming lead is valuable. Your agent immediately greets prospects, learns about their property preferences or project requirements, and notifies your top sales rep with a complete summary.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Budget &amp; Intent Scoring</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">HubSpot Pipeline Routing</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">Instant Sales Alerts</span>
                            </div>
                          </div>
                          <div className="lg:col-span-5">
                            <img className="w-full h-[180px] object-cover rounded-xl border border-slate-200" alt="Sales and real estate lead handling" src="/realestate.webp" loading="lazy" decoding="async"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 5 Accordion: Enterprise Architecture & Security */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all overflow-hidden mb-6">
              <button
                onClick={() => toggleSection('security')}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">security</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Safe &amp; Compliant
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Built on Official Meta Cloud Infrastructure
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      Official Meta WhatsApp Business API standards, encrypted communication, and complete data privacy.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline text-xs font-semibold text-slate-400">
                    {openSections.security ? 'Collapse' : 'Tap to expand'}
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSections.security ? "rotate-180 text-primary-container" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openSections.security && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        We connect directly through the official WhatsApp Business Cloud API. Your customer data is encrypted in transit, completely isolated, and never used to train public AI models.
                      </p>

                      {/* Architecture Diagram with Official Brand Logos */}
                      <div className="w-full rounded-2xl bg-[#f8fafc] border border-slate-200/80 p-space-md mb-space-lg overflow-x-auto shadow-inner">
                        <div className="min-w-[650px] flex items-center justify-between text-center gap-3">
                          {/* Node 1: WhatsApp Customer */}
                          <div className="flex-1 flex flex-col items-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <WhatsAppIcon className="w-6 h-6 mb-1 text-[#25D366] fill-[#25D366]" />
                            <span className="text-xs font-bold text-slate-900">End Customer</span>
                            <span className="font-code-mono text-[10px] text-slate-400">WhatsApp App</span>
                          </div>
                          {/* Connector */}
                          <div className="flex flex-col items-center text-slate-400">
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            <span className="font-code-mono text-[9px] font-medium text-emerald-600">Encrypted</span>
                          </div>
                          {/* Node 2: Official Meta Cloud API */}
                          <div className="flex-1 flex flex-col items-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <MetaIcon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold text-slate-900">Meta Cloud API</span>
                            <span className="font-code-mono text-[10px] text-slate-400">Official Gateway</span>
                          </div>
                          {/* Connector */}
                          <div className="flex flex-col items-center text-slate-400">
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            <span className="font-code-mono text-[9px] font-medium text-slate-500">Secure Webhook</span>
                          </div>
                          {/* Node 3: Official Innovators AI Hub */}
                          <div className="flex-1 flex flex-col items-center p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 shadow-sm">
                            <img alt="Innovators AI HUB" className="h-6 w-auto object-contain mb-1" src="/logo-dark.png" />
                            <span className="text-xs font-bold text-emerald-950">Innovators AI</span>
                            <span className="font-code-mono text-[10px] text-primary-container font-semibold">NLP Intent Core</span>
                          </div>
                          {/* Connector */}
                          <div className="flex flex-col items-center text-slate-400">
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            <span className="font-code-mono text-[9px] font-medium text-slate-500">Bi-Directional</span>
                          </div>
                          {/* Node 4: CRM Pipeline */}
                          <div className="flex-1 flex flex-col items-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <span className="material-symbols-outlined text-crm-sync-gold text-[24px] mb-1">hub</span>
                            <span className="text-xs font-bold text-slate-900">HubSpot / Zoho</span>
                            <span className="font-code-mono text-[10px] text-slate-400">CRM Sync Pipeline</span>
                          </div>
                        </div>
                      </div>

                      {/* Compliance Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="material-symbols-outlined text-whatsapp-green text-[20px]">lock</span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">Zero Model Training</span>
                            <span className="text-[10px] text-slate-500">Your customer data stays strictly private</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="material-symbols-outlined text-read-cyan text-[20px]">policy</span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">GDPR &amp; SOC2 Compliant</span>
                            <span className="text-[10px] text-slate-500">Protected with transport encryption</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="material-symbols-outlined text-primary-container text-[20px]">verified_user</span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">Official Meta Cloud API</span>
                            <span className="text-[10px] text-slate-500">Zero unofficial hacks or ban risks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 6 Accordion: Frequently Asked Questions */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all overflow-hidden mb-6" id="faq">
              <button
                onClick={() => toggleSection('faq')}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">quiz</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Got Questions?
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                      Simple, honest answers about renting, setting up, and using your WhatsApp AI Agent.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden md:inline text-xs font-semibold text-slate-400">
                    {openSections.faq ? 'Collapse' : 'Tap to expand'}
                  </span>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${openSections.faq ? "rotate-180 text-primary-container" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openSections.faq && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-slate-100">
                      <div className="space-y-3.5" id="faq-accordion">
                        {/* FAQ 1 */}
                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 shadow-sm transition-all duration-200">
                          <button className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer" onClick={() => toggleFaq(0)}>
                            <span className="font-display text-sm sm:text-base text-slate-900 font-bold">
                              1. What exactly does the WhatsApp AI Agent do for my business?
                            </span>
                            <span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 0 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
                          </button>
                          <div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 0 ? "block" : "hidden"}`}>
                            Think of it as your most reliable team member who never sleeps, gets tired, or misses a message. It chats with customers just like a human would — answering product questions, qualifying leads, sharing prices, booking appointments, and syncing contact details to your CRM. You stay in complete control and can jump into any conversation whenever you want.
                          </div>
                        </div>

                        {/* FAQ 2 */}
                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 shadow-sm transition-all duration-200">
                          <button className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer" onClick={() => toggleFaq(1)}>
                            <span className="font-display text-sm sm:text-base text-slate-900 font-bold">
                              2. Is this suitable for small and medium-sized businesses?
                            </span>
                            <span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 1 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
                          </button>
                          <div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 1 ? "block" : "hidden"}`}>
                            Yes, absolutely. Small teams often see the biggest relief because it saves hours of repetitive typing every day. Whether you get 15 messages a day or 1,500, the agent gives every potential customer instant attention without needing extra staff.
                          </div>
                        </div>

                        {/* FAQ 3 */}
                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 shadow-sm transition-all duration-200">
                          <button className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer" onClick={() => toggleFaq(2)}>
                            <span className="font-display text-sm sm:text-base text-slate-900 font-bold">
                              3. Do I need technical skills or coding to set this up?
                            </span>
                            <span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 2 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
                          </button>
                          <div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 2 ? "block" : "hidden"}`}>
                            None at all. Our team takes care of the technical setup, official Meta Cloud API connection, and integration with your CRM or calendar. Once it's live, you can manage everything without writing a single line of code.
                          </div>
                        </div>

                        {/* FAQ 4 */}
                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 shadow-sm transition-all duration-200">
                          <button className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer" onClick={() => toggleFaq(3)}>
                            <span className="font-display text-sm sm:text-base text-slate-900 font-bold">
                              4. Can it answer customer messages late at night or on weekends?
                            </span>
                            <span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 3 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
                          </button>
                          <div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 3 ? "block" : "hidden"}`}>
                            Yes, 24 hours a day, 365 days a year. When potential customers browse your offerings at 11 PM or on Sunday morning, they receive helpful, immediate responses rather than waiting until Monday morning.
                          </div>
                        </div>

                        {/* FAQ 5 */}
                        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 shadow-sm transition-all duration-200">
                          <button className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer" onClick={() => toggleFaq(4)}>
                            <span className="font-display text-sm sm:text-base text-slate-900 font-bold">
                              5. What happens if a customer asks a complex or unique question?
                            </span>
                            <span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 4 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
                          </button>
                          <div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 4 ? "block" : "hidden"}`}>
                            When a chat requires personal attention — like a custom quote or a special request — the agent politely informs the customer that a team member is stepping in and immediately notifies your team with the full chat history.
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* FINAL HIGH-CONVERSION CTA BANNER */}
          {/* ========================================================================= */}
          <section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-2xl md:py-space-3xl mb-space-2xl">
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-space-xl sm:p-space-2xl md:p-space-3xl border border-emerald-200/80 shadow-xl overflow-hidden text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-space-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-whatsapp-green animate-pulse"></span>
                <span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Immediate Deployment Available</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-space-md max-w-3xl tracking-tight">
                Ready to Automate Your WhatsApp Customer Communication?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-space-xl">
                Your customers are already on WhatsApp. Give them the fast, friendly experience they expect while giving your team their time back to focus on what matters most.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto justify-center mb-space-xl">
                <button
                  onClick={scrollToRentAgent}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary-container text-white font-semibold text-base shadow-[0_8px_24px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
                  Rent WhatsApp AI Agent
                </button>
                <a
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-800 font-semibold text-base border border-slate-200 shadow-sm hover:bg-slate-50 transition-all"
                  href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-read-cyan text-[20px]">calendar_month</span>
                  Book Demo
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-space-lg text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-whatsapp-green text-[18px]">verified</span>
                  <span>14-Day Deployment Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">support</span>
                  <span>Dedicated Setup Specialist</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-read-cyan text-[18px]">cancel</span>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200 pt-space-3xl pb-space-2xl mt-space-3xl shadow-sm">
        <div className="w-full max-w-[1400px] mx-auto px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-2xl mb-space-3xl">
            <div className="lg:col-span-2 flex flex-col items-start">
              <div
                className="flex items-center gap-3 mb-space-md cursor-pointer"
                onClick={() => navigateTo ? navigateTo("home") : (window.location.href = "/")}
              >
                <img alt="Innovators AI HUB" className="h-7 md:h-8 w-auto object-contain" src="/logo-dark.png" />
                <span className="text-[11px] font-bold text-primary-container uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Whatsapp AI Agent
                </span>
              </div>
              <p className="text-sm text-slate-500 max-w-sm mb-space-lg leading-relaxed">
                Smart, reliable WhatsApp AI agents that answer questions instantly, qualify leads, and grow your business around the clock.
              </p>
              <div className="flex flex-wrap items-center gap-space-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Official Meta API Ready</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                  <span className="material-symbols-outlined text-read-cyan text-[14px]">verified_user</span>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">SOC2 &amp; GDPR Compliant</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 uppercase mb-space-lg tracking-widest">Product Architecture</span>
              <ul className="flex flex-col gap-space-sm text-sm text-slate-500">
                <li><a className="hover:text-primary-container transition-colors" data-path="features" href="#features">Autonomous Core</a></li>
                <li><a className="hover:text-primary-container transition-colors" data-path="architecture-crm" href="#features">CRM Sync Connectors</a></li>
                <li><a className="hover:text-primary-container transition-colors" data-path="use-cases" href="#use-cases">E-Commerce &amp; Bookings</a></li>
                <li><a className="hover:text-primary-container transition-colors" data-path="pricing" href="#rental-pricing">Rental Plans</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 uppercase mb-space-lg tracking-widest">Verified Integrations</span>
              <ul className="flex flex-col gap-space-sm text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-crm-sync-gold">sync_alt</span>HubSpot CRM</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-crm-sync-gold">sync_alt</span>Zoho Suite</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-indigo-500">sync_alt</span>Salesforce Enterprise</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary-container">bolt</span>Custom Webhooks &amp; APIs</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-read-cyan">calendar_today</span>Google &amp; Cal.com</li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 uppercase mb-space-lg tracking-widest">Security &amp; Trust</span>
              <ul className="flex flex-col gap-space-sm text-sm text-slate-500">
                <li><a className="hover:text-primary-container transition-colors" href="#">Data Privacy Charter</a></li>
                <li><a className="hover:text-primary-container transition-colors" href="#">End-to-End Encryption</a></li>
                <li><a className="hover:text-primary-container transition-colors" href="#">Terms of Rental Agreement</a></li>
                <li><a className="hover:text-primary-container transition-colors" href="#">99.99% Uptime SLA</a></li>
                <li><a className="hover:text-primary-container transition-colors" href="#faq">Knowledge Base</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-space-xl border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-space-md text-slate-400 text-xs">
            <div className="font-code-mono">© 2025 Innovators AI Hub Inc. All rights reserved. Operating on WhatsApp Cloud API infrastructure.</div>
            <div className="flex items-center gap-space-lg font-semibold">
              <a className="hover:text-slate-900 transition-colors" href="#">PRIVACY POLICY</a>
              <a className="hover:text-slate-900 transition-colors" href="#">TERMS OF SERVICE</a>
              <a className="hover:text-slate-900 transition-colors" href="#">SECURITY</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Glassy Rental Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="fixed inset-0 cursor-default" onClick={() => setIsModalOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white/95 border border-slate-200/80 backdrop-blur-xl rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] p-6 md:p-8 max-w-md w-full relative z-50 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 p-1.5 rounded-full transition-colors outline-none cursor-pointer"
              >
                <X size={18} />
              </button>

              {isSubmitted ? (
                <div className="py-6 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(34,197,94,0.35)]">
                    <Check size={32} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Rental Request Received!</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{name || 'there'}</span>! We have recorded your request to rent the <strong className="text-primary-container">WhatsApp AI Agent</strong>. Our deployment team will reach out to your WhatsApp number (<span className="font-semibold text-slate-900">{number}</span>) shortly with your onboarding and setup details.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                    }}
                    className="w-full py-3 rounded-xl bg-primary-container hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_4px_14px_rgba(34,197,94,0.35)] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                        <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Rent WhatsApp AI Agent
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Enter your details below to rent your WhatsApp AI Agent for <strong className="text-slate-800">₹2,999/mo</strong>.
                    </p>
                  </div>

                  {submitError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleRentSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Sagar"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Email (Mail)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="sagar@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Profession / Role</label>
                      <input
                        type="text"
                        required
                        value={profession}
                        onChange={e => setProfession(e.target.value)}
                        placeholder="e.g. Founder / Business Owner"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="e.g. Innovators AI HUB"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-5 py-3 rounded-xl bg-primary-container hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 outline-none shadow-[0_4px_14px_rgba(34,197,94,0.35)] active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <span>Submit &amp; Rent Agent (₹2,999/mo)</span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppAgentPage;
