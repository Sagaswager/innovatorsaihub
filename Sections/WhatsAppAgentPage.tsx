import React, { useState } from 'react';

interface WhatsAppAgentPageProps {
  isDarkMode?: boolean;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact' | 'whatsapp-agent' | 'linkedin-agent' | 'gmail-agent' | 'voice-agent' | 'seo-agent') => void;
}

const WhatsAppAgentPage: React.FC<WhatsAppAgentPageProps> = ({ isDarkMode = false, navigateTo }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="w-full bg-[#f9f9f9] text-[#0F172A] selection:bg-[#25D366] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"><div className="absolute -top-40 left-1/4 w-[650px] h-[650px] bg-emerald-100/60 rounded-full blur-[130px]"></div><div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-sky-100/50 rounded-full blur-[150px]"></div><div className="absolute -bottom-20 left-1/3 w-[700px] h-[500px] bg-emerald-50/70 rounded-full blur-[160px]"></div><div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div></div>
<header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"><div className="h-20 w-full max-w-[1400px] mx-auto px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0 cursor-pointer" onClick={() => navigateTo ? navigateTo("home") : (window.location.href = "/")}><img alt="Innovators AI Hub WhatsApp Agent Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xd1I_S9Ff0MJiv1Uxtd87heR7v3CgiLf_3BqhjGQO51ZkqUDFsww9zY90rRfWiOYO3TZkYUTPubRvegcuQhhPWYnx39Ujxzk1MsL58GKDMHqsH11oUcW1jijaBrnYdwEXC8O0bDYe4StSxzsKOmqtvjcBTkJeOQwS1wiLtdZ2taErc42fdvVBjon46eyzYNT9DpUKtFu4ENQp75ZQiSN_oQ4eY6MbSh8ePfKNCwA"/><div className="flex flex-col"><div className="flex items-center gap-1.5"><span className="font-headline-sm text-[19px] font-bold text-slate-900 tracking-tight leading-none">Innovators</span><span className="font-headline-sm text-[19px] font-bold text-primary-container tracking-tight leading-none">AI HUB</span></div><span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">WhatsApp Co-Worker</span></div></div><nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-inner"><a aria-current="page" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-900 bg-white shadow-sm transition-all" data-path="features" href="/" onClick={(e) => { e.preventDefault(); if (navigateTo) navigateTo("home"); else window.location.href = "/"; }}>Home</a><a className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all" data-path="pricing" href="#pricing">Pricing</a><a className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all" data-path="faq" href="#faq">FAQ</a></nav><div className="flex items-center gap-3 shrink-0"><a className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold shadow hover:bg-slate-800 active:scale-95 transition-all" href="#pricing"><span className="material-symbols-outlined text-[16px]">calendar_month</span>Book Demo</a><a className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-white text-xs font-semibold shadow-[0_4px_14px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all" data-path="rent-whatsapp-ai-agent" href="#pricing"><svg className="w-4 h-4 text-white shrink-0 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.991.541 1.777.82 2.796.82 3.18 0 5.767-2.586 5.768-5.766.001-3.182-2.585-5.77-5.768-5.772zm3.376 8.212c-.14.394-.799.734-1.12.781-.309.046-.713.076-2.288-.574-1.785-.738-2.91-2.56-3.003-.681-.088-.124-.72-1.026-.72-1.956 0-.931.488-1.389.662-1.579.174-.189.379-.237.505-.237.126 0 .252.001.363.007.117.006.275-.044.43.328.157.379.537 1.309.584 1.404.047.095.079.206.016.332-.063.126-.095.205-.189.316-.095.11-.199.247-.284.332-.095.095-.195.198-.083.39.111.189.493.813 1.058 1.317.728.648 1.341.85 1.531.944.189.095.3.079.41-.047.111-.127.474-.553.6-.742.127-.189.252-.158.426-.095.174.063 1.106.521 1.296.616.189.095.316.142.363.221.047.079.047.458-.093.852zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.307C8.441 21.53 10.165 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path></svg>Rent WhatsApp AI Agent</a></div></div></header>
<main className="w-full pt-20 bg-transparent min-h-screen"><div className="flex flex-col w-full">
{/*  =========================================================================  */}
{/*  SECTION 1: HERO VIEWPORT (CLEAN LIGHT THEME)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-2xl md:py-space-3xl overflow-hidden">
{/*  Light polygon and subtle geometric ambient styling inspired by Innovators AI Hub  */}
<div className="absolute -top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/70 via-emerald-50/40 to-transparent rounded-full blur-[100px] pointer-events-none -z-10"></div>
<div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-blue-50/70 rounded-full blur-[100px] pointer-events-none -z-10"></div>
<div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-space-2xl">
{/*  Pill badges inspired by reference: TRENDING in GURUGRAM + Starts at ₹999/mo style  */}
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
<span className="">Starts at ₹2,999/mo</span>
</div>
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-primary-container text-[11px] font-bold tracking-wider uppercase">
<span className="material-symbols-outlined text-[14px]">verified</span>
<span className="">Trust the Innovator, First</span>
</div>
</div>
{/*  Main Headline with original Innovators AI Hub typographic punch  */}
<h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-space-md leading-[1.15]"><span className="inline-flex items-center gap-2 align-baseline"><svg className="w-9 h-9 sm:w-12 sm:h-12 inline-block shrink-0 -mt-1 shadow-sm rounded-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" fill="#25D366" r="24"></circle><path clipRule="evenodd" d="M24 8.5C15.44 8.5 8.5 15.44 8.5 24c0 3.01.86 5.82 2.36 8.21L8 39.5l7.55-2.81A15.43 15.43 0 0024 39.5c8.56 0 15.5-6.94 15.5-15.5S32.56 8.5 24 8.5zm8.93 21.66c-.37 1.05-1.85 1.94-2.58 2.05-.71.1-1.61.16-5.18-1.32-4.04-1.68-6.61-5.78-6.81-6.05-.2-.27-1.63-2.17-1.63-4.14 0-1.97 1.03-2.94 1.4-3.34.37-.4.8-.5 1.07-.5.27 0 .54 0 .78.01.25.01.58-.09.91.7.34.8 1.16 2.82 1.26 3.02.1.2.17.44.03.71-.14.27-.2.44-.41.67-.2.23-.43.52-.61.7-.2.2-.42.42-.18.83.24.4 1.05 1.73 2.26 2.81 1.55 1.38 2.86 1.81 3.27 2.01.41.2.65.17.89-.1.24-.27 1.02-1.19 1.29-1.6.27-.41.54-.34.91-.2.37.14 2.37 1.12 2.78 1.32.41.2.68.3.78.47.1.17.1.98-.27 2.03z" fill="#ffffff" fillRule="evenodd"></path></svg><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">WhatsApp</span></span> AI Agent for Business — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">24/7</span> AI-Powered Automation</h1>
{/*  Subheadline verbatim from Document  */}
<p className="font-body-base text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-space-xl">Turn every WhatsApp conversation into a customer.</p>
{/*  Dual Call to Actions  */}
<div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto justify-center mb-space-xl">
<a className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary-container text-white font-semibold text-base shadow-[0_8px_20px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all" href="https://wa.me/919810875683?text=Hi%20Innovators%20AI%20HUB,%20I%20want%20to%20rent%20the%20WhatsApp%20AI%20Agent" target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined text-[20px]">smart_toy</span>Rent WhatsApp AI Agent</a>
<a className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white text-slate-800 font-semibold text-base border border-slate-200/90 shadow-sm hover:bg-slate-50 active:scale-95 transition-all" href="#interactive-simulator">
<span className="material-symbols-outlined text-primary-container text-[20px]">play_circle</span>
    Watch Interactive Simulation
  </a>
</div>
{/*  Trust Bar / Integrations Strip (Clean light badges)  */}
<div className="w-full pt-space-md flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-slate-600 text-xs font-semibold uppercase tracking-wider">
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
<svg className="w-[18px] h-[18px] text-[#25D366] shrink-0 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.991.541 1.777.82 2.796.82 3.18 0 5.767-2.586 5.768-5.766.001-3.182-2.585-5.77-5.768-5.772zm3.376 8.212c-.14.394-.799.734-1.12.781-.309.046-.713.076-2.288-.574-1.785-.738-2.91-2.56-3.003-.681-.088-.124-.72-1.026-.72-1.956 0-.931.488-1.389.662-1.579.174-.189.379-.237.505-.237.126 0 .252.001.363.007.117.006.275-.044.43.328.157.379.537 1.309.584 1.404.047.095.079.206.016.332-.063.126-.095.205-.189.316-.095.11-.199.247-.284.332-.095.095-.195.198-.083.39.111.189.493.813 1.058 1.317.728.648 1.341.85 1.531.944.189.095.3.079.41-.047.111-.127.474-.553.6-.742.127-.189.252-.158.426-.095.174.063 1.106.521 1.296.616.189.095.316.142.363.221.047.079.047.458-.093.852zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.174L2 22l4.981-1.307C8.441 21.53 10.165 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path></svg>
<span className="">Official WhatsApp Cloud API</span>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
<span className="material-symbols-outlined text-crm-sync-gold text-[18px]">hub</span>
<span className="">HubSpot &amp; Zoho Native Sync</span>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
<span className="material-symbols-outlined text-read-cyan text-[18px]">speed</span>
<span className="">99.9% Guaranteed Uptime</span>
</div>
<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
<span className="material-symbols-outlined text-primary-container text-[18px]">code_off</span>
<span className="">Zero Coding Required</span>
</div>
</div>
</div>
{/*  Realistic Crisp Light WhatsApp Interactive Simulator Device  */}
<div className="w-full max-w-xl mx-auto rounded-[2rem] bg-white p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-200/90 relative" id="interactive-simulator">
<div className="flex flex-col rounded-2xl bg-[#efeae2] overflow-hidden border border-slate-200 shadow-inner">
{/*  WhatsApp Mobile Header  */}
<div className="flex items-center justify-between px-4 py-3 bg-whatsapp-teal text-white shadow-md">
<div className="flex items-center gap-3">
<div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-white text-[22px]">smart_toy</span>
<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-whatsapp-green ring-2 ring-whatsapp-teal"></span>
</div>
<div className="flex flex-col text-left">
<div className="flex items-center gap-1.5">
<span className="font-semibold text-sm leading-tight text-white">Innovators AI Assistant</span>
<span className="material-symbols-outlined text-whatsapp-green bg-white rounded-full text-[13px]">verified</span>
</div>
<span className="text-[11px] text-emerald-100 tracking-wide font-medium">Online · Instant 24/7 Co-Worker</span>
</div>
</div>
<div className="flex items-center gap-3 text-white/90">
<span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">videocam</span>
<span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">call</span>
<span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">more_vert</span>
</div>
</div>
{/*  Chat Stream (Light Theme Bubbles)  */}
<div className="flex flex-col gap-3 p-4 sm:p-5 overflow-y-auto max-h-[380px]">
<div className="flex justify-center">
<span className="px-3 py-1 rounded-full bg-white/90 text-slate-600 text-[10px] font-semibold uppercase tracking-wider shadow-sm">Today</span>
</div>
{/*  Inbound Customer Message  */}
<div className="flex flex-col max-w-[85%] self-start bg-white text-slate-800 rounded-2xl rounded-tl-none p-3 shadow-sm border border-slate-100">
<p className="text-xs sm:text-sm leading-relaxed">Hi! I need help checking your automated booking features and pricing details for our clinic.</p>
<div className="flex items-center justify-end gap-1 mt-1">
<span className="font-code-mono text-[10px] text-slate-400">10:42 AM</span>
</div>
</div>
{/*  Outbound AI Agent Message  */}
<div className="flex flex-col max-w-[88%] self-end bg-whatsapp-bubble text-slate-900 rounded-2xl rounded-tr-none p-3 shadow-sm border border-emerald-200/60">
<p className="text-xs sm:text-sm leading-relaxed">Hello! 👋 Thanks for reaching out to <strong>Innovators AI Hub</strong>.</p>
<p className="text-xs sm:text-sm leading-relaxed mt-1.5">Our WhatsApp AI Agent automates appointment scheduling, syncs with your calendar in real time, and sends instant reminders to clients.</p>
<p className="text-xs sm:text-sm leading-relaxed mt-1.5 text-emerald-900 font-semibold">Would you like a live preview of the booking flow or the rental plans?</p>
<div className="flex items-center justify-end gap-1 mt-1">
<span className="font-code-mono text-[10px] text-slate-500">10:42 AM</span>
<span className="material-symbols-outlined text-[#34B7F1] text-[15px]">done_all</span>
</div>
</div>
{/*  Inbound Slot Request  */}
<div className="flex flex-col max-w-[85%] self-start bg-white text-slate-800 rounded-2xl rounded-tl-none p-3 shadow-sm border border-slate-100">
<p className="text-xs sm:text-sm leading-relaxed">Could you share the booking preview and available slots for tomorrow?</p>
<div className="flex items-center justify-end gap-1 mt-1">
<span className="font-code-mono text-[10px] text-slate-400">10:43 AM</span>
</div>
</div>
{/*  Outbound Interactive Menu Slot Cards  */}
<div className="flex flex-col max-w-[88%] self-end bg-whatsapp-bubble text-slate-900 rounded-2xl rounded-tr-none p-3 shadow-sm border border-emerald-200/60">
<p className="text-xs sm:text-sm leading-relaxed">Here are the next available consultation slots for tomorrow:</p>
<div className="mt-2.5 flex flex-col gap-1.5">
<button className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-left text-xs font-semibold flex items-center justify-between transition-colors shadow-sm border border-emerald-200">
<span className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[16px]">event_available</span>
              Tomorrow at 2:30 PM
            </span>
<span className="text-whatsapp-green font-bold">Select</span>
</button>
<button className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-left text-xs font-semibold flex items-center justify-between transition-colors shadow-sm border border-emerald-200">
<span className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-[16px]">event_available</span>
              Tomorrow at 4:45 PM
            </span>
<span className="text-whatsapp-green font-bold">Select</span>
</button>
</div>
<div className="flex items-center justify-end gap-1 mt-1.5">
<span className="font-code-mono text-[10px] text-slate-500">10:43 AM</span>
<span className="material-symbols-outlined text-[#34B7F1] text-[15px]">done_all</span>
</div>
</div>
</div>
{/*  WhatsApp Input Bar  */}
<div className="p-2.5 bg-[#f0f2f5] flex items-center gap-2 border-t border-slate-200">
<div className="flex-1 py-2 px-3.5 rounded-full bg-white text-slate-400 text-xs flex items-center justify-between shadow-sm border border-slate-200">
<span className="">Type a message...</span>
<span className="material-symbols-outlined text-slate-400 text-[18px]">sentiment_satisfied</span>
</div>
<div className="w-9 h-9 rounded-full bg-whatsapp-green flex items-center justify-center text-white shrink-0 cursor-pointer shadow-md hover:bg-emerald-600 transition-colors">
<span className="material-symbols-outlined text-[18px]">send</span>
</div>
</div>
</div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 2: WHY BUSINESSES NEED A WHATSAPP AI AGENT & METRIC STRIP  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-2xl md:py-space-3xl" id="features">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center mb-space-2xl">
<div className="lg:col-span-7 flex flex-col">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 w-fit mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-[16px]">help</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">The Operational Bottleneck</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-md tracking-tight">
    Why Use a WhatsApp AI Agent?
  </h2>
<p className="text-base text-slate-700 leading-relaxed mb-space-md">
    Businesses often receive customer enquiries throughout the day, including outside normal working hours. Manually responding to every message can consume significant time and can make it difficult for teams to consistently follow up with potential customers.
  </p>
<p className="text-sm text-slate-500 leading-relaxed mb-space-lg">
    The WhatsApp AI Agent helps automate these repetitive interactions so that customers can receive timely responses while the business team can focus on conversations and tasks that require human attention.
  </p>
{/*  Bullet List from Document with Innovators AI Hub pastel badges  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<span className="text-sm font-medium text-slate-800">Faster responses to routine customer enquiries</span>
</div>
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<span className="text-sm font-medium text-slate-800">Reduced repetitive manual communication</span>
</div>
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<span className="text-sm font-medium text-slate-800">Automated follow-ups &amp; interactions</span>
</div>
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<span className="text-sm font-medium text-slate-800">More organized lead handling</span>
</div>
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<span className="text-sm font-medium text-slate-800">Easier appointment management</span>
</div>
<div className="flex items-start gap-2.5">
<div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-primary-container shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<span className="text-sm font-medium text-slate-800">Support for multilingual communication</span>
</div>
</div>
</div>
{/*  Right Column Visual with crisp white frame and light glass tag  */}
<div className="lg:col-span-5 relative">
<div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
<img className="w-full h-[380px] object-cover" data-alt="A modern enterprise operations and customer experience team in a dimly lit, high-tech command center overlooking data screens. Neon emerald and soft cyan ambient illumination highlights their focused expressions as autonomous AI agents handle thousands of live WhatsApp streams. Cinematic, architectural aesthetic matching obsidian dark SaaS branding." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLBZbyTyei4gtY14x8tKgPpZctU_As4k3WO3aD4NWbtQnQ1y1BTkHP7vnYCK-HqURlVbHErcbMOJTtZ58Vm0UDIWU3XSTKO8zIwkc4hbZVlsFER24PK40LEG7naew1a8rNnxj-5ofafrq06hQmTwItD51khkmJ-dKDp5fcV8aldjn4UPyZ1U9em1N8rlFCTvPqCMTELvAotDf6ap9is-uFuu0RMjqapjAiOSlA"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
<div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 shadow-md">
<div className="flex items-center justify-between">
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Autonomous Efficiency</span>
<span className="font-code-mono text-xs font-bold text-slate-900">+340% Bandwidth</span>
</div>
<p className="text-xs text-slate-600 mt-1">
        Teams reclaim 18+ hours per week per agent by offloading high-frequency WhatsApp questions.
      </p>
</div>
</div>
</div>
</div>
{/*  4 High-Impact KPI Stat Blocks in Clean Light Cards  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-lg">
<div className="p-space-lg rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
<span className="font-code-mono text-xs text-whatsapp-green font-bold block mb-1">REAL-TIME DISPATCH</span>
<div className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">&lt; 2 sec</div>
<p className="text-xs text-slate-500 mt-2 leading-relaxed">
      Average First Response Time (compared to 4+ hours for manual human queuing).
    </p>
</div>
<div className="p-space-lg rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
<span className="font-code-mono text-xs text-primary-container font-bold block mb-1">TASK AUTOMATION</span>
<div className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">85%</div>
<p className="text-xs text-slate-500 mt-2 leading-relaxed">
      Repetitive customer enquiries resolved end-to-end without requiring human agent touch.
    </p>
</div>
<div className="p-space-lg rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
<span className="font-code-mono text-xs text-lime-growth font-bold block mb-1">CONVERSION VELOCITY</span>
<div className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">3.4x</div>
<p className="text-xs text-slate-500 mt-2 leading-relaxed">
      Higher lead conversion rate accomplished through immediate algorithmic scoring &amp; qualification.
    </p>
</div>
<div className="p-space-lg rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
<span className="font-code-mono text-xs text-read-cyan font-bold block mb-1">GLOBAL CONTINUITY</span>
<div className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">24/7/365</div>
<p className="text-xs text-slate-500 mt-2 leading-relaxed">
      Zero downtime across global holiday schedules, weekend surges, and non-working hours.
    </p>
</div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 3: CORE FEATURES DEEP DIVE (INNOVATORS AI HUB LIGHT BENTO GRID)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-3xl">
<div className="text-center max-w-3xl mx-auto mb-space-2xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-[16px]">featured_play_list</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Autonomous Capabilities</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-sm tracking-tight">
    Enterprise Features Engineered for Real Growth
  </h2>
<p className="text-base text-slate-600">
    Every module is purpose-built to convert incoming chats into structured business assets without human intervention.
  </p>
</div>
{/*  4 Bento Cards (Light pastel tints matching Innovators AI Hub cards)  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
{/*  Feature 1: Multilingual Customer Support  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between group transition-all"><div>
<div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-primary-container mb-space-lg">
<span className="material-symbols-outlined text-[26px]">translate</span>
</div>
<span className="font-code-mono text-xs font-bold text-primary-container uppercase tracking-wider">Feature 01</span>
<h3 className="font-display text-xl font-bold text-slate-900 mt-1 mb-space-sm">
        1. Multilingual Customer Support
      </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-space-md">
        Customers may communicate with businesses in different languages, especially when a business serves customers across different regions. The WhatsApp AI Agent can support multilingual conversations, allowing businesses to communicate with customers in their preferred languages through WhatsApp.
      </p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-lg">
        This helps businesses automate routine customer interactions without requiring employees to manually respond to every repetitive question or handle every conversation in different languages.
      </p>
</div>
<div className="p-4 rounded-xl bg-surface-pastel border border-emerald-200/80">
<span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">What this means for the business:</span>
<p className="text-xs font-semibold text-emerald-950">
        Customers can communicate with the business more naturally, while the business can provide automated WhatsApp customer support to a wider range of customers.
      </p>
</div></div>
{/*  Feature 2: Seamless CRM Integration  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between group transition-all"><div>
<div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-crm-sync-gold mb-space-lg">
<span className="material-symbols-outlined text-[26px]">sync_saved_locally</span>
</div>
<span className="font-code-mono text-xs font-bold text-crm-sync-gold uppercase tracking-wider">Feature 02</span>
<h3 className="font-display text-xl font-bold text-slate-900 mt-1 mb-space-sm">
        2. Seamless CRM Integration
      </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-space-md">
        The WhatsApp AI Agent can connect WhatsApp-based customer interactions with supported CRM platforms such as HubSpot and Zoho. Instead of keeping customer conversations, lead information, and sales activities separate, WhatsApp CRM automation helps bring relevant customer information into the broader CRM workflow.
      </p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-lg">
        This allows businesses to manage WhatsApp conversations alongside their existing lead and customermanagement processes, reducing the need for employees to manually transfer information between WhatsApp and their CRM.
      </p>
</div>
<div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80">
<span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-1">What this means for the business:</span>
<p className="text-xs font-semibold text-amber-950">
        Customer conversations and lead information can become part of the existing sales workflow, helping businesses maintain a more organized process for managing and following up with leads.
      </p>
</div></div>
{/*  Feature 3: Automated Appointment Booking  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between group transition-all"><div>
<div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-read-cyan mb-space-lg">
<span className="material-symbols-outlined text-[26px]">calendar_add_on</span>
</div>
<span className="font-code-mono text-xs font-bold text-read-cyan uppercase tracking-wider">Feature 03</span>
<h3 className="font-display text-xl font-bold text-slate-900 mt-1 mb-space-sm">
        3. Automated Appointment Booking
      </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-space-md">
        Many businesses receive appointment requests through WhatsApp and spend time manually responding to customers, checking availability, and coordinating suitable time slots. The WhatsApp AI Agent can assist customers with the appointment-booking process directly through WhatsApp.
      </p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-lg">
        Customers can initiate a booking conversation, provide the required information, and proceed through the scheduling process without needing to switch to another communication channel. This makes WhatsApp more than just a messaging channel—it can become part of the business's automated customer interaction workflow.
      </p>
</div>
<div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200/80">
<span className="text-[10px] font-bold text-sky-900 uppercase tracking-wider block mb-1">What this means for the business:</span>
<p className="text-xs font-semibold text-sky-950">
        Routine appointment-related conversations can be automated, reducing repetitive coordination work for employees while giving customers a more convenient way to begin the booking process.
      </p>
</div></div>
{/*  Feature 4: Instant Lead Scoring  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col justify-between group transition-all"><div>
<div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-lime-growth mb-space-lg">
<span className="material-symbols-outlined text-[26px]">leaderboard</span>
</div>
<span className="font-code-mono text-xs font-bold text-lime-growth uppercase tracking-wider">Feature 04</span>
<h3 className="font-display text-xl font-bold text-slate-900 mt-1 mb-space-sm">
        4. Instant Lead Scoring
      </h3>
<p className="text-sm text-slate-600 leading-relaxed mb-space-md">
        Not every WhatsApp enquiry represents the same level of business opportunity. A business may receive enquiries from customers who are simply looking for information as well as customers who are ready to make a purchase or book a service. The WhatsApp AI Agent can help businesses qualify incoming leads by collecting relevant information during conversations and using that information to assign lead scores.
      </p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-lg">
        This WhatsApp AI Bot for Lead Generation can help businesses identify different levels of customer intent and organize incoming enquiries according to their potential importance.
      </p>
</div>
<div className="p-4 rounded-xl bg-lime-50/80 border border-lime-200/80">
<span className="text-[10px] font-bold text-lime-900 uppercase tracking-wider block mb-1">What this means for the business:</span>
<p className="text-xs font-semibold text-lime-950">
        Sales teams can identify promising leads more quickly instead of manually reviewing every WhatsApp enquiry, allowing them to focus their attention on conversations that may require faster follow-up.
      </p>
</div></div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 4: HOW IT WORKS (6-STEP VISUAL PIPELINE - LIGHT CLEAN)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-3xl overflow-hidden">
<div className="text-center max-w-3xl mx-auto mb-space-2xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-[16px]">account_tree</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Autonomous Execution Architecture</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-sm tracking-tight">
    How the WhatsApp AI Agent Works
  </h2>
<p className="text-base text-slate-600">
    From initial inbound ping to CRM updates and calendar holds, execution is completely autonomous.
  </p>
</div>
{/*  6-Step Pipeline Grid (Light Cards with Crisp Indigo & Emerald Nodes)  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg relative">
{/*  Step 1  */}
<div className="p-space-lg rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
<div className="flex items-center justify-between mb-space-md">
<span className="font-code-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold">01</span>
<span className="material-symbols-outlined text-whatsapp-green text-[24px]">chat</span>
</div>
<h3 className="font-display text-base font-bold text-slate-900 mb-1.5">Customer sends a WhatsApp message</h3>
<p className="text-xs text-slate-500 leading-relaxed">
      Inquiries arrive from product ads, QR codes, website widgets, or organic chat initiations across any language.
    </p>
</div>
{/*  Step 2  */}
<div className="p-space-lg rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
<div className="flex items-center justify-between mb-space-md">
<span className="font-code-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold">02</span>
<span className="material-symbols-outlined text-read-cyan text-[24px]">psychology</span>
</div>
<h3 className="font-display text-base font-bold text-slate-900 mb-1.5">AI Agent understands the enquiry</h3>
<p className="text-xs text-slate-500 leading-relaxed">
      Natural NLP analysis extracts intent, sentiment, language context, and buyer readiness in milliseconds.
    </p>
</div>
{/*  Step 3  */}
<div className="p-space-lg rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
<div className="flex items-center justify-between mb-space-md">
<span className="font-code-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold">03</span>
<span className="material-symbols-outlined text-lime-growth text-[24px]">forum</span>
</div>
<h3 className="font-display text-base font-bold text-slate-900 mb-1.5">AI responds &amp; provides relevant info</h3>
<p className="text-xs text-slate-500 leading-relaxed">
      Delivers accurate catalogs, pricing parameters, service FAQs, or technical specs aligned with your brand voice.
    </p>
</div>
{/*  Step 4  */}
<div className="p-space-lg rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
<div className="flex items-center justify-between mb-space-md">
<span className="font-code-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold">04</span>
<span className="material-symbols-outlined text-indigo-600 text-[24px]">dataset</span>
</div>
<h3 className="font-display text-base font-bold text-slate-900 mb-1.5">AI collects &amp; organizes customer data</h3>
<p className="text-xs text-slate-500 leading-relaxed">
      Gathers verified names, email addresses, geographic locations, and budget considerations naturally during conversation.
    </p>
</div>
{/*  Step 5  */}
<div className="p-space-lg rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
<div className="flex items-center justify-between mb-space-md">
<span className="font-code-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold">05</span>
<span className="material-symbols-outlined text-crm-sync-gold text-[24px]">auto_graph</span>
</div>
<h3 className="font-display text-base font-bold text-slate-900 mb-1.5">Lead is qualified &amp; scored in real-time</h3>
<p className="text-xs text-slate-500 leading-relaxed">
      Evaluates data against your ideal customer profile (ICP), categorizing opportunities as Hot, Warm, or Low Intent.
    </p>
</div>
{/*  Step 6  */}
<div className="p-space-lg rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
<div className="flex items-center justify-between mb-space-md">
<span className="font-code-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold">06</span>
<span className="material-symbols-outlined text-primary-container text-[24px]">hub</span>
</div>
<h3 className="font-display text-base font-bold text-slate-900 mb-1.5">CRM sync &amp; appointment handled</h3>
<p className="text-xs text-slate-500 leading-relaxed">
      Pushes leads into HubSpot or Zoho, reserves calendar slots directly, and routes high-value deals to human reps.
    </p>
</div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 5: REAL-WORLD USE CASES (LIGHT CRISP CARDS)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-3xl" id="use-cases">
<div className="text-center max-w-3xl mx-auto mb-space-2xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-[16px]">domain</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Industry Deployments</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-sm tracking-tight">
    Real-World Use Cases
  </h2>
<p className="text-base text-slate-600">
    See how organizations across sectors transform WhatsApp from a passive chat channel into a high-converting automated powerhouse.
  </p>
</div>
<div className="space-y-space-xl">
{/*  Use Case 1: E-Commerce & Retail  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-7 flex flex-col"><span className="text-[11px] font-bold text-whatsapp-green uppercase tracking-wider mb-2">Vertical 01 · Direct-to-Consumer</span>
<h3 className="font-display text-2xl font-bold text-slate-900 mb-1">1. E-Commerce &amp; Retail</h3>
<h4 className="text-base font-semibold text-primary-container mb-space-md">
  Turn WhatsApp Into an Automated Sales &amp; Support Channel
</h4>
<p className="text-sm text-slate-700 leading-relaxed mb-space-md">
  E-commerce and retail businesses can use a WhatsApp AI Agent to handle product enquiries, answer common customer questions, share relevant product information, qualify potential buyers, and guide customers through their initial purchase journey. With WhatsApp automation for business, customers can ask about products, availability, pricing, or other routine information directly through WhatsApp and receive automated responses without requiring an employee to manually handle every enquiry.
</p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-md">
  When a conversation indicates genuine purchase intent, the AI WhatsApp chatbot can help qualify the lead and pass relevant customer information into the supported CRM workflow.
</p>
<div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 mb-space-md">
<span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">What this means for the business:</span>
<p className="text-xs font-semibold text-emerald-950">
    Businesses can automate repetitive customer conversations while creating a more organized path from customer enquiry to qualified sales opportunity.
  </p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Catalog Links</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Stock Availability Check</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Instant Payment Links</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">CRM Buyer Sync</span>
</div></div>
<div className="lg:col-span-5">
<div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200">
<img className="w-full h-[280px] object-cover" data-alt="Modern stylish retail store and e-commerce fulfillment studio with products arranged neatly. An employee monitors a tablet displaying automated WhatsApp AI order conversions with clean emerald status ticks in a sleek, cinematic atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtAVF0YjHbCS0BvxGkiqUbOrjKNj_tjFcmkqnF8ATizmLNz2ptVsX74vcucmO0WsLiQ206JjUfZIQx-5BiPYHBvJTT6ahp3jZERWPxIQoz66JUJkzKOcPfOahvgJI1PhYkIyHGrWj-Cn8S4SiKkdvO262oiyc7u35mFcWTETN-09n_OQcgG2bcfD-be01WdpQZ0n56YvFBqJq6daO5e0lnJeWBmOT7iY-PC7nU"/>
</div>
</div>
</div>
</div>
{/*  Use Case 2: Healthcare & Appointment-Based Services  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-5 order-2 lg:order-1">
<div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200">
<img className="w-full h-[280px] object-cover" data-alt="A pristine, state-of-the-art medical wellness clinic with soft architectural lighting and patient consultation suites. Subtle digital calendar interfaces showing automated patient booking slots through WhatsApp AI, conveying supreme trust and calm reliability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrMHeJ6KWKmM6TBCsy-IvUjOb1aAcAOkNWG6MqffwrSXhyIOZnXANSgr6U24oLaGS46IuoiUsXEKFHkW68uBfHm2bGmIeHNdLlKdmJjEPL-xtccLhm9zRg3k6gGHltONx5t1rTFh_5qPYYHvuAbVulsFBWJlWUsYaiA_HiKlafvT8TvSbpNNj8ivWFL1xI36gqERl-uAYdSq60qcPqT75y2klzBtjWLOnh2N9L"/>
</div>
</div>
<div className="lg:col-span-7 flex flex-col order-1 lg:order-2"><span className="text-[11px] font-bold text-read-cyan uppercase tracking-wider mb-2">Vertical 02 · Health &amp; Consultancies</span>
<h3 className="font-display text-2xl font-bold text-slate-900 mb-1">2. Healthcare &amp; Appointment-Based Services</h3>
<h4 className="text-base font-semibold text-read-cyan mb-space-md">
  Simplify Customer Support and Appointment Management
</h4>
<p className="text-sm text-slate-700 leading-relaxed mb-space-md">
  Clinics, consultants, salons, and other appointment-based businesses can use WhatsApp customer support automation to handle routine enquiries and assist customers with appointment-related conversations.
</p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-md">
  Customers can use WhatsApp to ask common questions, provide the information required for an appointment, and begin the booking process without needing to call the business or wait for an employee to respond manually. The AI WhatsApp chatbot for customer support can handle repetitive conversations while appointmentrelated information can be connected with the business's scheduling workflow.
</p>
<div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80 mb-space-md">
<span className="text-[10px] font-bold text-sky-900 uppercase tracking-wider block mb-0.5">What this means for the business:</span>
<p className="text-xs font-semibold text-sky-950">
    Businesses can reduce repetitive communication and make appointment-related interactions more convenient for customers, while employees can spend less time handling routine WhatsApp enquiries.
  </p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Doctor &amp; Slot Availability</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Cal.com &amp; Google Cal Integration</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Automated WhatsApp Reminders</span>
</div></div>
</div>
</div>
{/*  Use Case 3: Sales & Lead-Driven Businesses  */}
<div className="p-space-xl rounded-3xl bg-white border border-slate-200/90 shadow-sm">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
<div className="lg:col-span-7 flex flex-col"><span className="text-[11px] font-bold text-crm-sync-gold uppercase tracking-wider mb-2">Vertical 03 · B2B &amp; High-Ticket Real Estate</span>
<h3 className="font-display text-2xl font-bold text-slate-900 mb-1">3. Sales &amp; Lead-Driven Businesses</h3>
<h4 className="text-base font-semibold text-crm-sync-gold mb-space-md">
  Capture, Qualify, and Prioritize More Leads Automatically
</h4>
<p className="text-sm text-slate-700 leading-relaxed mb-space-md">
  Real-estate companies, education providers, agencies, and other lead-driven businesses can use a WhatsApp AI Bot for Lead Generation as an automated first point of contact for incoming enquiries. The agent can engage with potential customers, ask relevant questions, collect lead information, and help determine the level of customer interest.
</p>
<p className="text-xs text-slate-500 leading-relaxed mb-space-md">
  Based on the information gathered during the conversation, the system can support instant lead scoring and help identify enquiries that may require faster sales followup. With WhatsApp chatbot with CRM integration, relevant customer information can also become part of the supported CRM workflow, helping sales teams manage and follow up on incoming opportunities more systematically.
</p>
<div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 mb-space-md">
<span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-0.5">What this means for the business:</span>
<p className="text-xs font-semibold text-amber-950">
    Sales teams can spend less time manually reviewing and organizing incoming WhatsApp enquiries and more time focusing on qualified leads and potential sales opportunities.
  </p>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Algorithmic ICP Scoring</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">HubSpot Pipeline Routing</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Instant Sales Rep Alert</span>
<span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">Multi-Agent Handover</span>
</div></div>
<div className="lg:col-span-5">
<div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200">
<img className="w-full h-[280px] object-cover" data-alt="Luxury architectural real-estate development firm with scale models and blueprints. A high-performing sales executive receives a hot qualified lead notification on their phone via WhatsApp AI CRM webhook, dark sophisticated atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnw4iFPaNnRH0_2txLeUizRrNM6yhGz3mL3jVv6RW0tLpKUoxl_Xvl-XuffnT4GcfXBq8YuP95LiE44IkIMqf6BezOaFZakR8njw7V9-p6c0iUxpz74SHocTNuIMRxuUnqcSxWevLJNf52IAkwbhESjuhWC0s4fzmkpiB89isShaRLefsWz78_IqDfGpEWkqmcHDfRt-e2lJ4ElJMTxf7rIZ-gJVIN6CX0VKgl"/>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 6: ENTERPRISE DATA ARCHITECTURE & SECURITY (LIGHT GLASS)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-3xl">
<div className="p-space-2xl rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
<div className="max-w-3xl mb-space-2xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-[16px]">security</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Enterprise Architecture &amp; Privacy</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-sm tracking-tight">
      Built for Scale, Built on Official Meta Cloud Infrastructure
    </h2>
<p className="text-base text-slate-600">
      We operate on official WhatsApp Business API standards. Customer data remains protected with end-to-end transport encryption, strict compliance boundaries, and zero retention for model training.
    </p>
</div>
{/*  Architectural Data Flow Diagram (Light Pure SVG Flow)  */}
<div className="w-full rounded-2xl bg-[#f8fafc] border border-slate-200/80 p-space-md md:p-space-lg mb-space-xl overflow-x-auto shadow-inner">
<div className="min-w-[700px] flex items-center justify-between text-center gap-4">
{/*  Node 1  */}
<div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
<span className="material-symbols-outlined text-whatsapp-green text-[28px] mb-1">smartphone</span>
<span className="text-xs font-bold text-slate-900">End Customer</span>
<span className="font-code-mono text-[10px] text-slate-400">WhatsApp App</span>
</div>
{/*  Connector  */}
<div className="flex flex-col items-center text-slate-400">
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
<span className="font-code-mono text-[9px] font-medium text-emerald-600">E2E Encrypted</span>
</div>
{/*  Node 2  */}
<div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
<span className="material-symbols-outlined text-read-cyan text-[28px] mb-1">cloud_sync</span>
<span className="text-xs font-bold text-slate-900">Meta Cloud API</span>
<span className="font-code-mono text-[10px] text-slate-400">Official Gateway</span>
</div>
{/*  Connector  */}
<div className="flex flex-col items-center text-slate-400">
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
<span className="font-code-mono text-[9px] font-medium text-slate-500">Secure Webhook</span>
</div>
{/*  Node 3  */}
<div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-emerald-50 border border-emerald-300 shadow-sm">
<span className="material-symbols-outlined text-primary-container text-[28px] mb-1">memory</span>
<span className="text-xs font-bold text-emerald-950">Innovators AI Agent</span>
<span className="font-code-mono text-[10px] text-primary-container font-semibold">NLP Intent Core</span>
</div>
{/*  Connector  */}
<div className="flex flex-col items-center text-slate-400">
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
<span className="font-code-mono text-[9px] font-medium text-slate-500">Bi-Directional</span>
</div>
{/*  Node 4  */}
<div className="flex-1 flex flex-col items-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
<span className="material-symbols-outlined text-crm-sync-gold text-[28px] mb-1">hub</span>
<span className="text-xs font-bold text-slate-900">HubSpot / Zoho</span>
<span className="font-code-mono text-[10px] text-slate-400">CRM Sync Pipeline</span>
</div>
</div>
</div>
{/*  Compliance Badges Strip  */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
<div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
<span className="material-symbols-outlined text-whatsapp-green text-[22px]">lock</span>
<div>
<span className="text-xs font-bold text-slate-900 block">Zero Model Training</span>
<span className="text-[10px] text-slate-500 uppercase tracking-wide">Your private business data stays isolated</span>
</div>
</div>
<div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
<span className="material-symbols-outlined text-read-cyan text-[22px]">policy</span>
<div>
<span className="text-xs font-bold text-slate-900 block">GDPR &amp; SOC2 Compliant</span>
<span className="text-[10px] text-slate-500 uppercase tracking-wide">Enterprise security standards enforced</span>
</div>
</div>
<div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
<span className="material-symbols-outlined text-primary-container text-[22px]">verified_user</span>
<div>
<span className="text-xs font-bold text-slate-900 block">Meta Cloud API Standards</span>
<span className="text-[10px] text-slate-500 uppercase tracking-wide">No unauthorized unofficial hacks or risks</span>
</div>
</div>
</div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 7: PRICING CARD (NATIVELY DESIGNED FROM IMAGE_2 LIGHT CARD)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1000px] mx-auto px-gutter py-space-3xl" id="pricing">
<div className="text-center max-w-3xl mx-auto mb-space-2xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-space-sm">
<span className="material-symbols-outlined text-whatsapp-green text-[16px]">payments</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Transparent &amp; Predictable Pricing</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-sm tracking-tight">
      Rent Your Dedicated WhatsApp AI Agent
    </h2>
<p className="text-base text-slate-600">
      Empower your business with official Meta Cloud infrastructure, automated routing, and zero human latency at an accessible subscription.
    </p>
</div>
{/*  Main Product Card: Exactly replicating IMAGE_2 in pure light aesthetic  */}
<div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl p-6 sm:p-10 md:p-12 overflow-hidden">
{/*  Header Row: Identity, Rating, Price, and Action  */}
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(37,211,102,0.35)]"><svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.94.553 3.753 1.517 5.286L2 22l4.87-1.488A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.76 13.972c-.24.673-1.193 1.24-1.666 1.314-.457.07-1.037.102-3.34-.848-2.607-1.076-4.262-3.729-4.392-3.901-.13-.173-1.052-1.398-1.052-2.668 0-1.27.664-1.895.903-2.155.239-.26.52-.325.693-.325.174 0 .348 0 .502.009.16.008.373-.06.586.452.219.516.748 1.82.813 1.95.065.13.109.283.022.457-.087.174-.13.283-.261.435-.13.152-.271.348-.39.456-.13.13-.272.271-.119.533.153.26.68 1.116 1.458 1.811 1.002.894 1.846 1.17 2.11 1.3.264.13.418.11.575-.065.157-.174.659-.768.833-1.03.174-.265.348-.22.587-.13.239.09 1.53.721 1.792.852.262.13.436.195.5.304.065.11.065.632-.175 1.305z" fill="#ffffff" fillRule="evenodd"></path></svg></div>
<div className="flex flex-col">
<h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">WhatsApp AI Agent</h3>
<div className="flex items-center gap-1 mt-1">
<span className="text-amber-500 font-bold text-sm">★ 4.5</span>
<span className="text-xs text-slate-400 font-medium">(2.7k ratings)</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
<div className="flex items-baseline gap-1">
<span className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">₹2,999</span>
<span className="text-xs text-slate-500 font-medium">/mo</span>
<span className="text-xs text-slate-400 line-through ml-2">₹4,999</span>
</div>
<a className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-container text-white text-sm font-semibold shadow-[0_4px_14px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all" href="#">
          Rent Agent
        </a>
</div>
</div>
{/*  Subtitle Banner (from IMAGE_2)  */}
<div className="py-6 border-b border-slate-100"><h4 className="font-display text-lg font-bold text-slate-900 mb-1.5">WhatsApp AI Agent — ₹2,999/month</h4>
<p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
  Automate customer conversations, qualify leads, manage appointments, and streamline your WhatsApp customer interactions with an AI-powered WhatsApp Agent.
</p></div>
{/*  Side-by-Side Detailed Breakdown Grid (Clean light columns)  */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6"><div>
<h5 className="font-display text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
<span className="text-primary-container font-extrabold material-symbols-outlined text-[18px]">verified</span>
<span className="">What's Included:</span>
</h5>
<ul className="space-y-3">
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">AI-powered WhatsApp conversations</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">Automated customer support</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">Lead qualification and instant lead scoring</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">Appointment booking</span>
</li>
</ul>
</div>
<div>
<h5 className="font-display text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
<span className="text-primary-container font-extrabold material-symbols-outlined text-[18px]">check_circle</span>
<span className="">Enterprise Capabilities:</span>
</h5>
<ul className="space-y-3">
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">CRM integration (HubSpot, Zoho &amp; Webhooks)</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">Multilingual conversations</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">Automated responses to routine enquiries</span>
</li>
<li className="flex items-start gap-2.5">
<span className="w-4 h-4 rounded-full bg-emerald-100 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</span>
<span className="text-xs sm:text-sm font-medium text-slate-800">Official Meta Cloud API verified infrastructure</span>
</li>
</ul>
</div></div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 8: INTERACTIVE FAQ ACCORDION (CLEAN LIGHT ACCORDION)  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1000px] mx-auto px-gutter py-space-3xl" id="faq">
<div className="text-center max-w-2xl mx-auto mb-space-2xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-space-sm">
<span className="material-symbols-outlined text-primary-container text-[16px]">quiz</span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Got Questions?</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-space-sm tracking-tight">
    Frequently Asked Questions
  </h2>
<p className="text-base text-slate-600">
    Everything you need to know about renting and deploying our WhatsApp AI Agent for your business workflow.
  </p>
</div>
{/*  FAQ Accordion Items (Verbatim from Reference Document)  */}
<div className="space-y-3.5" id="faq-accordion">
{/*  FAQ 1  */}
<div className="rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200">
<button  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"  onClick={() => toggleFaq(0)}>
<span className="font-display text-sm sm:text-base text-slate-900 font-bold">
        1. What is a WhatsApp AI Agent and how can it help my business?
      </span>
<span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 0 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 0 ? "block" : "hidden"}`}>
      A WhatsApp AI Agent is an AI-powered system that handles customer conversations and routine WhatsApp tasks automatically. It can respond to enquiries, manage follow-ups, share product information, qualify leads, assist with appointments, and connect customer interactions with supported business workflows.
    </div>
</div>
{/*  FAQ 2  */}
<div className="rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200">
<button  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"  onClick={() => toggleFaq(1)}>
<span className="font-display text-sm sm:text-base text-slate-900 font-bold">
        2. Is the WhatsApp AI Agent suitable for small businesses?
      </span>
<span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 1 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 1 ? "block" : "hidden"}`}>
      Yes. The agent can be useful for businesses that regularly communicate with customers through WhatsApp and want to reduce repetitive manual communication. It can be particularly relevant for businesses handling customer enquiries, appointments, product questions, or incoming leads through WhatsApp.
    </div>
</div>
{/*  FAQ 3  */}
<div className="rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200">
<button  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"  onClick={() => toggleFaq(2)}>
<span className="font-display text-sm sm:text-base text-slate-900 font-bold">
        3. Do I need technical knowledge to use the WhatsApp AI Agent?
      </span>
<span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 2 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 2 ? "block" : "hidden"}`}>
      The agent is designed to automate customer communication and routine WhatsApp interactions so that businesses do not have to manually manage every conversation. Specific setup and integration requirements can depend on the business's workflow and the services being connected.
    </div>
</div>
{/*  FAQ 4  */}
<div className="rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200">
<button  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"  onClick={() => toggleFaq(3)}>
<span className="font-display text-sm sm:text-base text-slate-900 font-bold">
        4. Can the WhatsApp AI Agent handle customer enquiries outside business hours?
      </span>
<span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 3 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 3 ? "block" : "hidden"}`}>
      Yes. The agent is designed for 24/7 automated customer communication, allowing customers to receive automated assistance even when the business team is unavailable.
    </div>
</div>
{/*  FAQ 5  */}
<div className="rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-200">
<button  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"  onClick={() => toggleFaq(4)}>
<span className="font-display text-sm sm:text-base text-slate-900 font-bold">
        5. What types of businesses can use the WhatsApp AI Agent?
      </span>
<span className={`material-symbols-outlined transition-transform duration-200 shrink-0 ${openFaq === 4 ? "rotate-180 text-primary-container" : "text-slate-400"}`}>expand_more</span>
</button>
<div className={`px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed ${openFaq === 4 ? "block" : "hidden"}`}>
      The agent can be useful for businesses that use WhatsApp for customer communication, including e-commerce and retail businesses, healthcare and appointment-based services, and sales- and lead-driven businesses.
    </div>
</div>
</div>
</section>
{/*  =========================================================================  */}
{/*  SECTION 9: FINAL HIGH-CONVERSION LIGHT CTA BANNER  */}
{/*  =========================================================================  */}
<section className="relative w-full max-w-[1400px] mx-auto px-gutter py-space-2xl md:py-space-3xl mb-space-2xl" id="rental-pricing">
<div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-space-xl sm:p-space-2xl md:p-space-3xl border border-emerald-200/80 shadow-xl overflow-hidden text-center flex flex-col items-center">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 mb-space-md shadow-sm">
<span className="w-2 h-2 rounded-full bg-whatsapp-green animate-pulse"></span>
<span className="text-[11px] font-bold text-primary-container uppercase tracking-wider">Immediate Deployment Available</span>
</div>
<h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-space-md max-w-3xl tracking-tight">
    Automate Your WhatsApp Customer Communication
  </h2>
<p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-space-xl">
    Stop spending your team's time on repetitive WhatsApp conversations. Use a WhatsApp AI Agent to automate customer interactions, qualify incoming leads, assist with appointments, organize customer information, and connect WhatsApp communication with your business workflow.
  </p>
<div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto justify-center mb-space-xl">
<a className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary-container text-white font-semibold text-base shadow-[0_8px_24px_rgba(34,197,94,0.35)] hover:bg-emerald-600 active:scale-95 transition-all" href="#pricing">
<span className="material-symbols-outlined text-[22px]">smart_toy</span>
      Rent WhatsApp AI Agent
    </a>
<a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-800 font-semibold text-base border border-slate-200 shadow-sm hover:bg-slate-50 transition-all" href="#">
<span className="material-symbols-outlined text-read-cyan text-[20px]">support_agent</span>
      Talk to AI Specialist
    </a>
</div>
<div className="flex flex-wrap items-center justify-center gap-space-lg text-slate-500 text-xs font-semibold uppercase tracking-wider">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-whatsapp-green text-[18px]">verified</span>
<span className="">14-Day Deployment Guarantee</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary-container text-[18px]">support</span>
<span className="">Dedicated Solution Architect</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-read-cyan text-[18px]">cancel</span>
<span className="">Cancel or Upgrade Anytime</span>
</div>
</div>
</div>
</section>
{/*  Accordion Inline Script  */}

</div></main>
<footer className="w-full bg-white border-t border-slate-200 pt-space-3xl pb-space-2xl mt-space-3xl shadow-sm"><div className="w-full max-w-[1400px] mx-auto px-gutter"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-2xl mb-space-3xl"><div className="lg:col-span-2 flex flex-col items-start"><div className="flex items-center gap-space-sm mb-space-md cursor-pointer" onClick={() => navigateTo ? navigateTo("home") : (window.location.href = "/")}><img alt="Innovators AI Hub WhatsApp Agent Logo" className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Xd1I_S9Ff0MJiv1Uxtd87heR7v3CgiLf_3BqhjGQO51ZkqUDFsww9zY90rRfWiOYO3TZkYUTPubRvegcuQhhPWYnx39Ujxzk1MsL58GKDMHqsH11oUcW1jijaBrnYdwEXC8O0bDYe4StSxzsKOmqtvjcBTkJeOQwS1wiLtdZ2taErc42fdvVBjon46eyzYNT9DpUKtFu4ENQp75ZQiSN_oQ4eY6MbSh8ePfKNCwA"/><div className="flex items-center gap-1.5"><span className="font-display font-bold text-lg text-slate-900">Innovators</span><span className="font-display font-bold text-lg text-primary-container">AI HUB</span></div></div><p className="text-sm text-slate-500 max-w-sm mb-space-lg leading-relaxed">Architecting autonomous, hyper-intelligent enterprise WhatsApp agents that drive 24/7 conversion, synchronize leads instantaneously to tier-1 CRMs, and replace fragile legacy chatbots.</p><div className="flex flex-wrap items-center gap-space-sm"><div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200"><span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span><span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Official Meta API Ready</span></div><div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200"><span className="material-symbols-outlined text-read-cyan text-[14px]">verified_user</span><span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">SOC2 &amp; GDPR Compliant</span></div></div></div><div className="flex flex-col"><span className="text-xs font-bold text-slate-900 uppercase mb-space-lg tracking-widest">Product Architecture</span><ul className="flex flex-col gap-space-sm text-sm text-slate-500"><li className=""><a className="hover:text-primary-container transition-colors" data-path="features" href="#">Autonomous Core</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="architecture-crm" href="#">CRM Sync Connectors</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="how-it-works" href="#">Webhook Dispatcher</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="use-cases" href="#">E-Commerce &amp; Bookings</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="pricing" href="#pricing">Rental Plans</a></li></ul></div><div className="flex flex-col"><span className="text-xs font-bold text-slate-900 uppercase mb-space-lg tracking-widest">Verified Integrations</span><ul className="flex flex-col gap-space-sm text-sm text-slate-500"><li className=""><span className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-crm-sync-gold">sync_alt</span>HubSpot CRM</span></li><li className=""><span className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-crm-sync-gold">sync_alt</span>Zoho Suite</span></li><li className=""><span className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-indigo-500">sync_alt</span>Salesforce Enterprise</span></li><li className=""><span className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary-container">bolt</span>Custom Webhooks &amp; APIs</span></li><li className=""><span className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-read-cyan">calendar_today</span>Google &amp; Cal.com</span></li></ul></div><div className="flex flex-col"><span className="text-xs font-bold text-slate-900 uppercase mb-space-lg tracking-widest">Security &amp; Trust</span><ul className="flex flex-col gap-space-sm text-sm text-slate-500"><li className=""><a className="hover:text-primary-container transition-colors" data-path="privacy-policy" href="#">Data Privacy Charter</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="security" href="#">End-to-End Encryption</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="terms" href="#">Terms of Rental Agreement</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="sla" href="#">99.99% Uptime SLA</a></li><li className=""><a className="hover:text-primary-container transition-colors" data-path="faq" href="#faq">Knowledge Base</a></li></ul></div></div><div className="pt-space-xl border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-space-md text-slate-400 text-xs"><div className="font-code-mono">© 2025 Innovators AI Hub Inc. All rights reserved. Operating on WhatsApp Cloud API infrastructure.</div><div className="flex items-center gap-space-lg font-semibold"><a className="hover:text-slate-900 transition-colors" data-path="privacy-policy" href="#">PRIVACY POLICY</a><a className="hover:text-slate-900 transition-colors" data-path="terms" href="#">TERMS OF SERVICE</a><a className="hover:text-slate-900 transition-colors" data-path="security" href="#">SECURITY</a></div></div></div></footer>
    </div>
  );
};

export default WhatsAppAgentPage;
