import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';

interface LinkedInAgentPageProps {
  isDarkMode?: boolean;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact' | 'whatsapp-ai-agent' | 'linkedin-ai-agent' | 'gmail-agent' | 'voice-agent' | 'seo-agent') => void;
}

const LinkedInAgentPage: React.FC<LinkedInAgentPageProps> = ({ isDarkMode = false, navigateTo }) => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4dF7wuetgSnMA2Dw0nkwunHeZaroNaYJeP5XAAf4pmxtqZQPsNWo1tNH9nc3rprTm/exec";

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('Wed, 2:00 PM');
  const [confirmationBanner, setConfirmationBanner] = useState<string>('');

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
      agent: 'LinkedIn AI Agent',
      price: '₹2,222/mo',
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
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError('Failed to submit rental request. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-emerald-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="h-20 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer" onClick={() => navigateTo ? navigateTo("platform") : (window.location.href = "/")}>
            <img alt="Innovators AI HUB" className="h-8 md:h-10 w-auto object-contain" src="/logo-dark.png"/>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[10px] sm:text-[11px] font-bold text-[#0A66C2] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-pulse"></span>
              LinkedIn Co-Worker
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-inner">
            <a aria-current="page" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-900 bg-white shadow-sm transition-all cursor-pointer" href="/" onClick={(e) => { e.preventDefault(); if (navigateTo) navigateTo("platform"); else window.location.href = "/"; }}>Home</a>
            <a className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all" href="#pricing-package">Pricing</a>
            <a className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all" href="#faq-section">FAQ</a>
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <a className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold shadow hover:bg-slate-800 active:scale-95 transition-all" href="https://calendar.app.google/D4VcVM3GVSh4PAia6" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              Book Demo
            </a>
            <button onClick={scrollToRentAgent} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow-[0_4px_14px_rgba(16,185,129,0.35)] active:scale-95 transition-all cursor-pointer">
              <svg className="w-4 h-4 text-white shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
              </svg>
              Rent LinkedIn AI Agent
            </button>
          </div>
        </div>
      </header>
<main className="w-full pt-20 bg-white min-h-screen">
<div className="flex flex-col w-full">
{/*  TOP CONTEXT BADGE BAR  */}
<section className="w-full bg-slate-50/70 border-b border-slate-100 py-2.5">
<div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
<div className="flex items-center gap-2 text-slate-500 font-medium">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Agent Online &amp; Active
            </span>
<span className="text-slate-300">•</span>
<span className="">Innovators AI HUB Marketplace</span>
<span className="text-slate-300">/</span>
<span className="text-slate-800 font-semibold">LinkedIn Sales Automation</span>
</div>
<div className="flex items-center gap-3">
<div className="inline-flex items-center gap-1 text-slate-700 font-semibold bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
<span className="text-amber-500 font-bold">★ 4.9</span>
<span className="text-slate-500 text-[11px] font-normal">(40.1k verified reviews)</span>
</div>
<span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
              ⚡ Instant Setup (30s)
            </span>
</div>
</div>
</section>
{/*  HERO SECTION  */}
<section className="relative w-full bg-gradient-to-b from-white via-slate-50/50 to-white py-12 lg:py-20 border-b border-slate-100">
{/*  Subtle background blur touches  */}
<div className="absolute top-10 left-1/3 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none -z-10"></div>
<div className="max-w-[1280px] mx-auto px-4 md:px-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
{/*  LEFT COLUMN: Value proposition & CTAs  */}
<div className="lg:col-span-6 flex flex-col gap-6">
<div className="flex flex-col gap-4">
<div className="flex items-center gap-2.5">
<div className="w-11 h-11 rounded-2xl bg-[#0A66C2] flex items-center justify-center shadow-md shadow-blue-500/20 text-white shrink-0">
<svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"></path></svg>
</div>
<span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                    Autonomous Sales Co-Worker
                  </span>
</div>
<h1 className="font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-slate-950 tracking-tight leading-[1.12]">
                  LinkedIn AI <br/><span className="text-emerald-600">Outreach Agent</span>
</h1>
<p className="font-normal text-lg sm:text-xl text-slate-600 leading-relaxed font-body">
                  Turn connections into conversations. AI-powered LinkedIn outreach for B2B businesses to personalize connections, automate follow-ups, and generate meaningful sales conversations.
                </p>
</div>
{/*  Feature Bullets (Checkmarks)  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
<div className="flex items-center gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="text-sm font-semibold text-slate-700">Hyper-personalized outreach</span>
</div>
<div className="flex items-center gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="text-sm font-semibold text-slate-700">AI prospect qualification</span>
</div>
<div className="flex items-center gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="text-sm font-semibold text-slate-700">Automated follow-ups</span>
</div>
<div className="flex items-center gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="text-sm font-semibold text-slate-700">Direct calendar booking</span>
</div>
</div>
{/*  Metric highlight cards  */}
<div className="grid grid-cols-2 gap-4 pt-1">
<div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col">
<div className="flex items-baseline gap-1.5">
<span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">85%</span>
<span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">High Intent</span>
</div>
<span className="text-xs font-semibold text-slate-500 mt-1">Connection Acceptance Rate</span>
</div>
<div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col">
<div className="flex items-baseline gap-1.5">
<span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">3.5x</span>
<span className="text-xs text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">More Meetings</span>
</div>
<span className="text-xs font-semibold text-slate-500 mt-1">Booked directly on Calendar</span>
</div>
</div>
{/*  Pricing and Action CTA Bar  */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
  <button 
    onClick={scrollToRentAgent}
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base shadow-[0_8px_20px_rgba(16,185,129,0.35)] active:scale-95 transition-all cursor-pointer"
  >
    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
    Rent LinkedIn AI Agent
  </button>
</div>
<div className="flex items-center gap-2 text-slate-500 text-xs">
<span className="line-through text-slate-400">Regular: ₹6,999/mo</span>
<span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">68% Launch Discount</span>
<span className="text-slate-400">• Cancel Anytime</span>
</div>
</div>
{/*  RIGHT COLUMN: LinkedIn Simulation Card (Light themed mockup)  */}
<div className="lg:col-span-6 flex flex-col">
<div className="relative rounded-3xl bg-white border border-slate-200/90 p-5 md:p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)] overflow-hidden">
{/*  Ambient Subtle Gradient  */}
<div className="absolute -top-16 -right-16 w-52 h-52 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>
{/*  Simulation Header  */}
<div className="flex items-center justify-between pb-4 border-b border-slate-100">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-sm shadow-blue-500/20 text-white shrink-0">
<svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"></path></svg>
</div>
<div className="flex flex-col">
<span className="font-bold text-[16px] text-slate-900 leading-none">LinkedIn AI Agent</span>
<span className="text-xs text-slate-400 mt-1 font-medium">Enterprise Autonomous Co-Worker</span>
</div>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Agent Active
                  </div>
</div>
{/*  Live Conversation Thread  */}
<div className="flex flex-col gap-3.5 pt-4">
{/*  Prospect Card & Note  */}
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                          RM
                        </div>
<div className="flex flex-col">
<span className="font-bold text-sm text-slate-900 leading-tight">Rohit Mehta</span>
<span className="text-xs text-slate-500 font-medium">Founder &amp; CEO • GrowthTech India</span>
</div>
</div>
<span className="text-[11px] font-semibold text-slate-400">1st Degree</span>
</div>
<div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 text-xs leading-relaxed font-body">
                      "Hi Rohit, loved your recent insights on scaling B2B sales cycles without hiring bloated SDR teams. Would love to stay connected!"
                    </div>
<div className="flex items-center gap-3 pt-0.5 text-[11px]">
<span className="flex items-center gap-1 text-slate-400 font-medium">
<span className="material-symbols-outlined text-[14px] text-blue-500">done_all</span>
                        Note Sent
                      </span>
<span className="text-slate-300">→</span>
<span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]">verified</span>
                        Connected!
                      </span>
</div>
</div>
{/*  Prospect Incoming Reply  */}
<div className="flex items-start gap-2.5 max-w-[92%]">
<div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      RM
                    </div>
<div className="flex flex-col gap-1">
<span className="text-[11px] font-semibold text-slate-400">Rohit Mehta • 10:12 AM</span>
<div className="p-3 rounded-2xl rounded-tl-sm bg-slate-100 text-slate-800 text-xs font-body leading-relaxed">
                        Thanks for connecting! We're actually actively looking to scale outbound without adding 5 SDRs. How does your AI handle personalization?
                      </div>
</div>
</div>
{/*  AI Agent Autonomous Reply  */}
<div className="flex flex-col items-end gap-1 ml-auto max-w-[92%]">
<div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
<span className="">Innovators AI Agent</span>
<span className="material-symbols-outlined text-[14px]">smart_toy</span>
</div>
<div className="p-3.5 rounded-2xl rounded-tr-sm bg-emerald-500 text-white text-xs font-body leading-relaxed shadow-sm shadow-emerald-500/20">
                      It reads prospect profiles, recent activity, and company updates to tailor notes in 1:1 human nuance. Would you like a quick 15-minute demo to see it live?
                    </div>
</div>
{/*  Calendar Booking Widget within chat  */}
<div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 mt-1">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">calendar_month</span>
</div>
<div className="flex flex-col">
<span className="text-xs font-bold text-slate-900">Book a 15-Min Live Demo</span>
<span className="text-[11px] text-slate-500 font-medium">Synced with your Google Calendar</span>
</div>
</div>
<button type="button" id="choose-time-btn" onClick={() => setConfirmationBanner(`Calendar synced! Demo slot reserved for ${selectedSlot}.`)} className="text-xs font-bold text-slate-900 hover:text-emerald-600 transition-colors">Select Time</button>
</div>
<div className="grid grid-cols-3 gap-2" id="time-slot-container">
<button type="button" onClick={() => { setSelectedSlot("Tue, 10:30 AM"); setConfirmationBanner("Demo slot selected: Tue, 10:30 AM - Confirmation sent!"); }} className={`time-slot-btn py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${selectedSlot === "Tue, 10:30 AM" ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Tue, 10:30 AM</button>
<button type="button" onClick={() => { setSelectedSlot("Wed, 2:00 PM"); setConfirmationBanner("Demo slot selected: Wed, 2:00 PM - Confirmation sent!"); }} className={`time-slot-btn py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${selectedSlot === "Wed, 2:00 PM" ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Wed, 2:00 PM</button>
<button type="button" onClick={() => { setSelectedSlot("Thu, 11:00 AM"); setConfirmationBanner("Demo slot selected: Thu, 11:00 AM - Confirmation sent!"); }} className={`time-slot-btn py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${selectedSlot === "Thu, 11:00 AM" ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Thu, 11:00 AM</button>
</div>
<div className="hidden p-2 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold text-center" id="booking-confirmation-banner">
                      Slot confirmed! Calendar invite automatically dispatched.
                    </div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  CARD ASSET & EXACT MATRIX FROM IMAGE_4  */}
{/*  "One Agent. Countless Automation." reference section  */}
<section className="w-full bg-slate-50/70 py-16 lg:py-20 border-b border-slate-200/70">
<div className="max-w-[894px] mx-auto px-4">
{/*  Exact Card Container as seen in DATA:IMAGE:IMAGE_4  */}
<div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl shadow-slate-200/50 flex flex-col gap-8">
{/*  Card Header: Icon, Title, Rating, Price, Rent Agent Button  */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-2xl bg-[#0A66C2] flex items-center justify-center shadow-md shadow-blue-500/20 text-white shrink-0">
<svg className="w-9 h-9 fill-white" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"></path></svg>
</div>
<div className="flex flex-col">
<h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">Linkedin AI Agent</h2>
<div className="flex items-center gap-1.5 mt-1 text-sm">
<span className="text-amber-500 font-bold">★ 4.9</span>
<span className="text-slate-500 font-medium">(40.1k ratings)</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 self-end sm:self-center">
<div className="flex flex-col items-end">
<div className="flex items-baseline gap-1">
<span className="font-extrabold text-3xl text-slate-900 leading-none">₹2,222</span>
<span className="text-xs font-semibold text-slate-500">/mo</span>
</div>
<span className="text-xs font-medium text-slate-400 line-through mt-0.5">₹6,999</span>
</div>
<button
  onClick={() => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  }}
  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
>
  Rent Agent
</button>
</div>
</div>
{/*  Subheading and summary  */}
<div className="flex flex-col gap-2">
<h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                One Agent. Countless Automation.
              </h3>
<p className="font-normal text-base text-slate-600 leading-relaxed font-body">
                Let our LinkedIn AI Agent automate your outreach, lead generation, and posting on LinkedIn while you focus on closing deals.
              </p>
</div>
{/*  Two-column Comparison Matrix (Exact matching Image_4)  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
{/*  Left: Linkedin AI Agent Automates  */}
<div className="flex flex-col gap-4">
<h4 className="font-bold text-base text-slate-900">Linkedin AI Agent Automates</h4>
<ul className="flex flex-col gap-3 font-body text-sm text-slate-700">
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="">Find Target Leads</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="">Send Invitations</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="">Follow-Up Messages</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="">Commenting on Leads Posts</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="">Posting on your Behalf</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">check</span>
</div>
<span className="">Optimise Your LinkedIn Profile</span>
</li>
</ul>
</div>
{/*  Right: Does not include  */}
<div className="flex flex-col gap-4">
<h4 className="font-bold text-base text-slate-900">Does not include</h4>
<ul className="flex flex-col gap-3 font-body text-sm text-slate-700">
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">close</span>
</div>
<span className="">Bypass LinkedIn daily invite limits (safeguards account)</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">close</span>
</div>
<span className="">Send spam mass messages without personalization</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">close</span>
</div>
<span className="">Fake connection profiles creation</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">close</span>
</div>
<span className="">Direct browser cookie stealing</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">close</span>
</div>
<span className="">Access to premium services without subscription</span>
</li>
<li className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[15px] font-bold">close</span>
</div>
<span className="">Post-scheduling with external multi-account tools</span>
</li>
</ul>
</div>
</div>
{/*  Bottom Pill (Exactly from Image_4)  */}
<div className="pt-2 flex justify-center">
<div className="px-6 py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs tracking-wider uppercase border border-emerald-200 shadow-xs">
                YOU JUST FOCUS ON CLOSING DEALS.
              </div>
</div>
</div>
</div>
</section>
{/*  3 DEEP PILLARS SECTION  */}
<section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
<div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-16 lg:gap-24">
<div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
<span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Precision Engineering</span>
<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">How The AI Agent Drives Results</h2>
<p className="text-base text-slate-600 font-body">Deep architectural breakdown of the 3 automated outreach stages.</p>
</div>
{/*  PILLAR 1  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div className="lg:col-span-6 flex flex-col gap-4">
<div className="flex items-center gap-2">
<span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">PILLAR 01</span>
<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inbound Relevance</span>
</div>
<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Hyper-Personalized Connection Notes
              </h3>
<p className="text-slate-600 font-body text-base leading-relaxed">
                Generic, templated connection requests are ignored or marked as spam. The LinkedIn AI Agent inspects prospect profiles, recent activity, company updates, and mutual affiliations to draft tailored notes that feel distinctly human and respectful.
              </p>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2 mt-2">
<span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Business Value</span>
<ul className="flex flex-col gap-2 text-sm text-slate-700 font-body">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Drastically reduces SDR manual research and copy-pasting hours
                  </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Context-specific outreach boosts acceptance rates from 20% to over 85%
                  </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Scales a handcrafted touch across hundreds of target accounts concurrently
                  </li>
</ul>
</div>
</div>
{/*  Visual Flow 1  */}
<div className="lg:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col gap-4">
<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Execution Pipeline Flow</span>
<div className="flex flex-col gap-2.5">
<div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-blue-600">person_search</span>
<span className="text-sm font-bold text-slate-800">1. Prospect Bio &amp; Posts Scanned</span>
</div>
<span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Deep Scan</span>
</div>
<div className="flex justify-center text-slate-300">
<span className="material-symbols-outlined text-[18px]">arrow_downward</span>
</div>
<div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-emerald-600">psychology</span>
<span className="text-sm font-bold text-slate-800">2. AI-Assisted Personalization</span>
</div>
<span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">LLM Context</span>
</div>
<div className="flex justify-center text-slate-300">
<span className="material-symbols-outlined text-[18px]">arrow_downward</span>
</div>
<div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-purple-600">edit_note</span>
<span className="text-sm font-bold text-slate-800">3. Customized Connection Note</span>
</div>
<span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Max 300 chars</span>
</div>
<div className="flex justify-center text-slate-300">
<span className="material-symbols-outlined text-[18px]">arrow_downward</span>
</div>
<div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-2xs">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-emerald-600">send</span>
<span className="text-sm font-bold text-emerald-900">4. Compliant Connection Dispatched</span>
</div>
<span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs">Paced Safe</span>
</div>
</div>
</div>
</div>
{/*  PILLAR 2  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
{/*  Visual Flow 2  */}
<div className="lg:col-span-6 order-2 lg:order-1 p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col gap-3">
<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dynamic Follow-Up Sequence</span>
<div className="space-y-2 font-body text-xs">
<div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
<span className="font-bold text-slate-800 text-sm">Connection Request Dispatched</span>
<span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Day 0</span>
</div>
<div className="pl-6 border-l-2 border-emerald-400 ml-5 py-0.5 text-slate-400 text-[11px]">Waiting for Acceptance...</div>
<div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
<span className="font-bold text-emerald-900 text-sm">Connection Accepted!</span>
<span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs">Day 1</span>
</div>
<div className="pl-6 border-l-2 border-emerald-400 ml-5 py-0.5 text-slate-400 text-[11px]">Cooldown 2-4 Hours (Natural Pacing)</div>
<div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
<span className="font-bold text-slate-800 text-sm">Initial Value Message</span>
<span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Day 1</span>
</div>
<div className="pl-6 border-l-2 border-emerald-400 ml-5 py-0.5 text-slate-400 text-[11px]">If no reply within 48h</div>
<div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
<span className="font-bold text-slate-800 text-sm">Contextual Follow-up 1</span>
<span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Day 3</span>
</div>
<div className="pl-6 border-l-2 border-emerald-400 ml-5 py-0.5 text-slate-400 text-[11px]">Prospect responds with interest</div>
<div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
<span className="font-bold text-blue-900 text-sm">Conversation Moves Toward Meeting</span>
<span className="font-bold text-blue-700 bg-white px-2 py-0.5 rounded shadow-xs">Goal Reached</span>
</div>
</div>
</div>
<div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-4">
<div className="flex items-center gap-2">
<span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-bold text-xs">PILLAR 02</span>
<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversation Momentum</span>
</div>
<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Smart Follow-Up Sequences
              </h3>
<p className="text-slate-600 font-body text-base leading-relaxed">
                Most conversions happen on the 2nd or 3rd touchpoint, yet 70% of reps never follow up after an accepted invite. The agent monitors the connection state and pauses automatically the second the prospect replies, preventing awkward duplicate messages.
              </p>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2 mt-2">
<span className="text-xs font-bold text-blue-700 uppercase tracking-wide">System Advantage</span>
<ul className="flex flex-col gap-2 text-sm text-slate-700 font-body">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Teams never miss a follow-up window or let warm leads turn cold
                  </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Adaptive tone checks prospect replies to handle objections gracefully
                  </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Real-time human handoff trigger whenever sensitive custom requests arrive
                  </li>
</ul>
</div>
</div>
</div>
{/*  PILLAR 3  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div className="lg:col-span-6 flex flex-col gap-4">
<div className="flex items-center gap-2">
<span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">PILLAR 03</span>
<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Velocity</span>
</div>
<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Calendar Booking Integration
              </h3>
<p className="text-slate-600 font-body text-base leading-relaxed">
                Eliminate endless back-and-forth scheduling queries. As soon as a prospect shows intent, the agent delivers native calendar links or generates suggested slots right in the chat stream, locking meetings into Google Calendar, Outlook, or Calendly.
              </p>
<div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2 mt-2">
<span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Conversion Impact</span>
<ul className="flex flex-col gap-2 text-sm text-slate-700 font-body">
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Zeros friction between positive sentiment and booked calls
                  </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Timezone automatic synchronization avoids missed slots
                  </li>
<li className="flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    Cuts sales cycle time by 4.2 business days on average
                  </li>
</ul>
</div>
</div>
{/*  Visual Flow 3  */}
<div className="lg:col-span-6 p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col gap-3">
<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Zero-Friction Conversion Arc</span>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
<div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
<span className="material-symbols-outlined text-blue-600 text-[26px]">chat</span>
<span className="font-bold text-sm text-slate-900">1. Intent Detected</span>
<span className="text-xs text-slate-500 font-body">NLP flags "interested", "tell me more", or "pricing"</span>
</div>
<div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
<span className="material-symbols-outlined text-purple-600 text-[26px]">calendar_today</span>
<span className="font-bold text-sm text-slate-900">2. Direct Slot Offer</span>
<span className="text-xs text-slate-500 font-body">Presents specific interactive timeslots directly in thread</span>
</div>
<div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
<span className="material-symbols-outlined text-emerald-600 text-[26px]">event_available</span>
<span className="font-bold text-sm text-slate-900">3. Slot Selected</span>
<span className="text-xs text-slate-500 font-body">Prospect clicks and reserves without leaving LinkedIn</span>
</div>
<div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col gap-1.5 shadow-2xs">
<span className="material-symbols-outlined text-emerald-700 text-[26px]">groups</span>
<span className="font-bold text-sm text-emerald-950">4. Confirmed Call</span>
<span className="text-xs text-emerald-800 font-body">Auto-logged to CRM + Calendar invites dispatched</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  ACCOUNT SAFETY & COMPLIANCE (4 PILLARS)  */}
<section className="w-full bg-slate-50/60 py-16 lg:py-20 border-b border-slate-100">
<div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10">
<div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
<span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Enterprise Compliance</span>
<h3 className="text-3xl font-extrabold text-slate-900">Responsible LinkedIn Outreach</h3>
<p className="text-slate-600 font-body text-base">
              Automation should never mean uncontrolled spam. Innovators AI HUB enforces strict account safety and platform integrity protocols.
            </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
<div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">speed</span>
</div>
<h4 className="font-bold text-base text-slate-900">Controlled Outreach</h4>
<p className="text-xs text-slate-600 font-body leading-relaxed">
                Organized pacing with randomized human-like delay intervals that respect LinkedIn daily and weekly network thresholds.
              </p>
</div>
<div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
<div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">center_focus_strong</span>
</div>
<h4 className="font-bold text-base text-slate-900">Relevant Communication</h4>
<p className="text-xs text-slate-600 font-body leading-relaxed">
                Hyper-tailored context prevents broadcast noise, ensuring recipients see clear personal value before connecting.
              </p>
</div>
<div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
<div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">verified_user</span>
</div>
<h4 className="font-bold text-base text-slate-900">Responsible Automation</h4>
<p className="text-xs text-slate-600 font-body leading-relaxed">
                Strict policy adherence eliminates deceptive profiles, cookie-jacking, or black-hat scraping mechanics.
              </p>
</div>
<div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
<div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">policy</span>
</div>
<h4 className="font-bold text-base text-slate-900">Policy Awareness</h4>
<p className="text-xs text-slate-600 font-body leading-relaxed">
                Dynamic algorithm monitors platform updates weekly, adjusting behavior sets immediately to protect your reputation.
              </p>
</div>
</div>
</div>
</section>
{/*  HOW THE PROCESS WORKS (6-STEP GRID)  */}
<section className="w-full bg-white py-16 lg:py-20 border-b border-slate-100">
<div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10">
<div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
<span className="text-xs font-bold uppercase tracking-widest text-emerald-600">End-to-End Execution</span>
<h3 className="text-3xl font-extrabold text-slate-900">How the LinkedIn AI Outreach Process Works</h3>
<p className="text-slate-600 font-body text-base">From first touch to booked revenue calls in 6 automated, high-precision steps.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/*  Step 1  */}
<div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col gap-3 hover:bg-white hover:shadow-md transition">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-emerald-600">01</span>
<span className="material-symbols-outlined text-slate-400">target</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Define Your Target</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                Specify job titles, industries, company size, geography, and keywords. The agent filters active accounts within your target account list.
              </p>
</div>
{/*  Step 2  */}
<div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col gap-3 hover:bg-white hover:shadow-md transition">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-emerald-600">02</span>
<span className="material-symbols-outlined text-slate-400">psychology</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Personalize the Connection</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                AI evaluates each prospect's latest posts and career milestone to craft bespoke, non-generic invitation notes that spark attention.
              </p>
</div>
{/*  Step 3  */}
<div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col gap-3 hover:bg-white hover:shadow-md transition">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-emerald-600">03</span>
<span className="material-symbols-outlined text-slate-400">forum</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Start the Conversation</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                Upon acceptance, an initial value-focused message is sent automatically, sharing relevant insights, case study metrics, or offers.
              </p>
</div>
{/*  Step 4  */}
<div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col gap-3 hover:bg-white hover:shadow-md transition">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-emerald-600">04</span>
<span className="material-symbols-outlined text-slate-400">update</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Follow Up Gracefully</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                If no initial reply arrives, systematic follow-ups are timed over days, keeping your offering top-of-mind without spamming.
              </p>
</div>
{/*  Step 5  */}
<div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col gap-3 hover:bg-white hover:shadow-md transition">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-emerald-600">05</span>
<span className="material-symbols-outlined text-slate-400">model_training</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Identify Interest</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                Context engines parse prospect responses in real time, detecting interest, scheduling intent, or product qualification details.
              </p>
</div>
{/*  Step 6  */}
<div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs flex flex-col gap-3 hover:bg-white hover:shadow-md transition">
<div className="flex items-center justify-between">
<span className="text-2xl font-black text-emerald-700">06</span>
<span className="material-symbols-outlined text-emerald-600">event_available</span>
</div>
<h4 className="font-bold text-lg text-emerald-950">Book the Meeting</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                The agent coordinates calendar booking directly within the chat stream, syncing immediately with your sales team's calendar.
              </p>
</div>
</div>
</div>
</section>
{/*  TESTED ACROSS CORE SECTORS (USE CASES)  */}
<section className="w-full bg-slate-50/60 py-16 lg:py-20 border-b border-slate-100">
<div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-10">
<div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
<span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Industry Application</span>
<h3 className="text-3xl font-extrabold text-slate-900">Tested Across Core Growth Sectors</h3>
<p className="text-slate-600 font-body text-base">How revenue teams leverage the LinkedIn AI Agent every day.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/*  Case 1  */}
<div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between gap-6">
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">B2B SaaS</span>
<span className="font-extrabold text-xl text-emerald-600">+184%</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Accelerated Product Demos</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                  Product founders and SDR teams connect directly with VP-level decision-makers, sharing brief interactive demo snippets that turn cold traffic into scheduled trials.
                </p>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
<span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                Average 22 Qualified Demos / Month
              </div>
</div>
{/*  Case 2  */}
<div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between gap-6">
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">Agencies &amp; Consultancies</span>
<span className="font-extrabold text-xl text-purple-600">4.2x</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Client Acquisition Pipeline</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                  Design, marketing, and engineering agencies automate outreach to CMOs and CTOs, providing relevant case studies and scheduling discovery consultations effortlessly.
                </p>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
<span className="material-symbols-outlined text-[16px] text-purple-600">verified</span>
                Closed 8 Enterprise Retainers in 60 Days
              </div>
</div>
{/*  Case 3  */}
<div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between gap-6">
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">Enterprise BizDev</span>
<span className="font-extrabold text-xl text-emerald-600">89%</span>
</div>
<h4 className="font-bold text-lg text-slate-900">Strategic Partnerships</h4>
<p className="text-sm text-slate-600 font-body leading-relaxed">
                  Business development executives nurture ecosystem partners, co-marketing collaborators, and channel distributors through structured, authentic cadence flows.
                </p>
</div>
<div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
<span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                Zero Account Warnings Recorded
              </div>
</div>
</div>
</div>
</section>
{/*  DEDICATED PRICING PACKAGE & RENTAL CARD  */}
<section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100" id="pricing-package">
<div className="max-w-[894px] mx-auto px-4">
<div className="relative p-8 sm:p-12 rounded-3xl bg-white border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden">
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-2xl bg-[#0A66C2] flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
<svg className="w-9 h-9 fill-white" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"></path></svg>
</div>
<div className="flex flex-col">
<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Linkedin AI Agent Rental</h3>
<div className="flex items-center gap-2 mt-1">
<span className="text-amber-500 font-bold">★ 4.9</span>
<span className="text-xs font-semibold text-slate-500">(40.1k verified ratings)</span>
</div>
</div>
</div>
<div className="flex flex-col items-start sm:items-end">
<div className="flex items-baseline gap-2">
<span className="text-4xl sm:text-5xl font-extrabold text-slate-900">₹2,222</span>
<span className="text-sm font-semibold text-slate-500">/month</span>
</div>
<span className="text-xs text-slate-400 line-through mt-0.5">₹6,999 /mo regular</span>
</div>
</div>
{/*  Features Checklist  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 font-body text-sm text-slate-700">
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
<span className="">Full Autonomous Lead Finder Engine</span>
</div>
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
<span className="">Direct In-Chat Calendar Booking Sync</span>
</div>
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
<span className="">Smart Multi-Step Personalization Sequences</span>
</div>
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
<span className="">Automated Thought-Leadership Post Engine</span>
</div>
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
<span className="">Zero-Risk LinkedIn Safety &amp; Pace Governor</span>
</div>
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
<span className="">Priority 24/7 Agent Monitoring &amp; Support</span>
</div>
</div>
{/*  Action Bar  */}
<div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Instant Cloud Activation • No software install required
              </div>
<button
  id="rent-agent-pricing-btn"
  onClick={() => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  }}
  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 active:scale-95 transition-all text-center inline-block cursor-pointer"
>
  Rent Agent Now
</button>
</div>
</div>
</div>
</section>
{/*  FAQS ACCORDION  */}
<section className="w-full bg-slate-50/70 py-16 lg:py-20 border-b border-slate-100" id="faq-section">
<div className="max-w-[800px] mx-auto px-4 md:px-8 flex flex-col gap-10">
<div className="text-center flex flex-col gap-2">
<span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Everything Explained</span>
<h3 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
</div>
<div className="flex flex-col gap-3" id="faq-accordion-group">
{/*  Q1  */}
<div className="faq-item rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
<button  className="faq-toggle w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition"  onClick={() => toggleFaq(0)}>
<span className="font-bold text-[16px] text-slate-900">How does the LinkedIn AI Agent know what to write?</span>
<span className="material-symbols-outlined text-slate-400 faq-icon transition-transform duration-200">expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 0 ? "block" : "hidden"}`}>
                The agent ingests your target ICP criteria and parses each prospect's public profile data, including their current title, previous roles, shared connections, and recent LinkedIn posts. It uses this context alongside your value proposition to formulate dynamic, customized messages rather than static copy-paste templates.
              </div>
</div>
{/*  Q2  */}
<div className="faq-item rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
<button  className="faq-toggle w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition"  onClick={() => toggleFaq(1)}>
<span className="font-bold text-[16px] text-slate-900">Will this put my LinkedIn account at risk?</span>
<span className="material-symbols-outlined text-slate-400 faq-icon transition-transform duration-200">expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 1 ? "block" : "hidden"}`}>
                No. The LinkedIn AI Agent uses human-mimicking pacing, staggered dispatch intervals, and strict daily volume thresholds that strictly align with platform safety recommendations. It explicitly avoids cookie scraping, mass blasts, or artificial limits circumvention.
              </div>
</div>
{/*  Q3  */}
<div className="faq-item rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
<button  className="faq-toggle w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition"  onClick={() => toggleFaq(2)}>
<span className="font-bold text-[16px] text-slate-900">What happens when a prospect replies to an outreach note?</span>
<span className="material-symbols-outlined text-slate-400 faq-icon transition-transform duration-200">expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 2 ? "block" : "hidden"}`}>
                The autonomous follow-up cadence immediately stops to prevent irrelevant automated messaging. The agent either continues intelligent qualifying conversation or instantly notifies you via Slack/Email so your sales team can step in and take over.
              </div>
</div>
{/*  Q4  */}
<div className="faq-item rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
<button  className="faq-toggle w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition"  onClick={() => toggleFaq(3)}>
<span className="font-bold text-[16px] text-slate-900">Can I connect my Google Calendar, Calendly, or Zoom?</span>
<span className="material-symbols-outlined text-slate-400 faq-icon transition-transform duration-200">expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 3 ? "block" : "hidden"}`}>
                Yes. The platform natively integrates with Google Calendar, Outlook 365, Calendly, and HubSpot Meetings. When prospects show booking intent, your agent coordinates open time slots right in the conversation thread.
              </div>
</div>
{/*  Q5  */}
<div className="faq-item rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
<button  className="faq-toggle w-full p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition"  onClick={() => toggleFaq(4)}>
<span className="font-bold text-[16px] text-slate-900">Can I cancel my rental subscription at any time?</span>
<span className="material-symbols-outlined text-slate-400 faq-icon transition-transform duration-200">expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 4 ? "block" : "hidden"}`}>
                Yes, subscriptions operate month-to-month with no lock-in contracts. You can pause or cancel your agent rental at any time directly through your Innovators AI HUB dashboard with one click.
              </div>
</div>
</div>
</div>
</section>
{/*  FINAL HIGH CONVERTING CTA BANNER  */}
<section className="w-full bg-white py-16 lg:py-24">
<div className="max-w-[1280px] mx-auto px-4 md:px-8">
<div className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex flex-col items-center text-center gap-5 shadow-2xl shadow-emerald-600/20 overflow-hidden">
<span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Autonomous Lead Generation
            </span>
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-2xl leading-tight">
              Turn LinkedIn Outreach Into Meaningful Business Conversations
            </h2>
<p className="text-emerald-100 text-base sm:text-lg max-w-xl font-body">
              Stop spending your team's time manually writing connection requests, tracking follow-ups, and coordinating every meeting.
            </p>
<button
  onClick={scrollToRentAgent}
  className="px-8 py-4 rounded-full bg-white text-emerald-800 hover:bg-slate-50 font-extrabold text-base shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
>
  <span className="material-symbols-outlined text-emerald-600">rocket_launch</span>
  Rent Agent Now
</button>
<div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100 font-semibold pt-2">
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                Instant Setup
              </span>
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                Cancel Anytime
              </span>
<span className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                ₹2,222 / month Flat Rate
              </span>
</div>
</div>
</div>
</section>
</div>
</main>
<footer className="w-full bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-600 font-body">
<div className="max-w-[1280px] mx-auto px-4 md:px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
{/*  Col 1: Brand details  */}
<div className="lg:col-span-4 flex flex-col gap-4">
<div className="flex items-center gap-2.5">
<img alt="Innovators AI HUB Logo" className="h-9 w-auto object-contain shrink-0" src="/logo-dark.png"/>
<span className="font-extrabold text-lg text-slate-900 tracking-tight font-sans">
              Innovators <span className="text-emerald-600">AI HUB</span>
</span>
</div>
<p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            One Agent. Countless Automation. Supercharging business workflows with hyper-autonomous, compliant, and precision-engineered intelligent agents.
          </p>
<div className="flex items-center gap-2 pt-1">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Operational Status: Online
            </span>
</div>
</div>
{/*  Col 2: AI Agents  */}
<div className="lg:col-span-2 flex flex-col gap-3">
<span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">AI Agents</span>
<nav className="flex flex-col gap-2.5 text-sm">
<a className="text-emerald-700 font-bold hover:text-emerald-800 transition" href="#">LinkedIn Agent</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">WhatsApp Agent</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">LeadGen Agent</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Inbound Voice AI</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Custom Agent Builder</a>
</nav>
</div>
{/*  Col 3: Platform  */}
<div className="lg:col-span-2 flex flex-col gap-3">
<span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">Platform</span>
<nav className="flex flex-col gap-2.5 text-sm">
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Agent Marketplace</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Telemetry &amp; Logic</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Integrations &amp; APIs</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#pricing-package">Pricing Plans</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Changelog &amp; Updates</a>
</nav>
</div>
{/*  Col 4: Company  */}
<div className="lg:col-span-2 flex flex-col gap-3">
<span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">Company</span>
<nav className="flex flex-col gap-2.5 text-sm">
<a className="text-slate-600 hover:text-slate-900 transition" href="#">About Us</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Case Studies</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Careers</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Press Kit</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Contact Sales</a>
</nav>
</div>
{/*  Col 5: Compliance  */}
<div className="lg:col-span-2 flex flex-col gap-3">
<span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">Compliance</span>
<nav className="flex flex-col gap-2.5 text-sm">
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Security Overview</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">SOC2 Type II</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Privacy Policy</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Terms of Service</a>
<a className="text-slate-600 hover:text-slate-900 transition" href="#">Data Processing (DPA)</a>
</nav>
</div>
</div>
{/*  Footer Bottom  */}
<div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
<span className="">© 2025 Innovators AI HUB Inc. All rights reserved. Precision autonomous systems.</span>
<div className="flex items-center gap-4">
<span className="flex items-center gap-1 text-slate-600 font-medium">
<span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
            End-to-End Encrypted
          </span>
<span className="flex items-center gap-1 text-slate-600 font-medium">
<span className="material-symbols-outlined text-[16px] text-blue-600">bolt</span>
            Sub-50ms Latency
          </span>
</div>
</div>
</div>
</footer>

      {/* Glassy Rental Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            {/* Modal backdrop clicks close modal */}
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
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(16,185,129,0.35)]">
                    <Check size={32} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Rental Request Received!</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{name || 'there'}</span>! We have recorded your request to rent the <strong className="text-emerald-600">LinkedIn AI Agent</strong>. Our deployment team will reach out to your WhatsApp number (<span className="font-semibold text-slate-900">{number}</span>) shortly with your onboarding and setup details.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_4px_14px_rgba(16,185,129,0.35)] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#0A66C2] flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Rent LinkedIn AI Agent
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Enter your details below to rent your LinkedIn AI Agent for <strong className="text-slate-800">₹2,222/mo</strong>.
                    </p>
                  </div>

                  {/* Error feedback */}
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

                    {/* Primary Action Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 outline-none shadow-[0_4px_14px_rgba(16,185,129,0.35)] active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <span>Submit &amp; Rent Agent (₹2,222/mo)</span>
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

export default LinkedInAgentPage;
