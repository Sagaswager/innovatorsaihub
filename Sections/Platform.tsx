import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ChevronDown, LogIn, UserPlus, Sparkles, MessageSquare, Linkedin, PhoneCall, Bot, X, Check, Loader2, ChevronLeft } from 'lucide-react';

/*
GOOGLE APPS SCRIPT FOR GOOGLE SHEET:
Copy and paste this script into Extensions -> Apps Script inside your Google Sheet (https://docs.google.com/spreadsheets/d/1iYGkYrr97s9GjYAAbGrcdlzxPe-fycA-S-QQ-y_TPuw/edit?usp=sharing):

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Appends row with columns: Name, Mail, Number, Profession, Company Name
  sheet.appendRow([
    data.name,
    data.email,
    data.number,
    data.profession,
    data.companyName
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}

Make sure to click Deploy -> New Deployment -> Web App. Set Access to "Anyone" and paste the deployed URL into SCRIPT_URL below!
*/

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4dF7wuetgSnMA2Dw0nkwunHeZaroNaYJeP5XAAf4pmxtqZQPsNWo1tNH9nc3rprTm/exec";

const aiCoWorkers = [
  {
    title: "Whatsapp AI Agent",
    rating: "4.5",
    reviews: "2.7k ratings",
    price: "2,999",
    originalPrice: "4,999",
    brandGradient: "from-emerald-400 to-green-500",
    description: "Let our WhatsApp AI Agent handle your customer queries, follow-ups, and broadcast messages on autopilot while you focus on building relationships.",
    benefits: [
      "Auto-reply to customer inquiries instantly",
      "Broadcast newsletters and promotional offers",
      "Send automated order & payment confirmations",
      "Set up interactive chat menus",
      "Share catalog links and product details",
      "Label and organize chat groups automatically"
    ],
    exclusions: [
      "Spamming unverified numbers (complies with policy)",
      "Bypass WhatsApp official policy bans",
      "Access to personal chat logs outside setup",
      "Multi-agent human routing (without integration)",
      "Voice call recording and automatic transcription",
      "Manual typing interface for offline chats"
    ],
    logo: (
      <svg viewBox="0 0 100 100" className="w-20 h-20">
        <circle cx="50" cy="50" r="45" fill="#25D366" />
        <path 
          fill="#ffffff" 
          d="M50 25c-13.8 0-25 11.2-25 25 0 4.4 1.1 8.7 3.3 12.5L25 75l12.8-3.3c3.7 2 7.8 3.1 12.2 3.1 13.8 0 25-11.2 25-25S63.8 25 50 25zm13.8 34.3c-.8 2.1-4.4 3.9-6 4.1-1.6.2-3.1.2-8.9-2.1-7.4-3.1-12.1-10.6-12.5-11.1-.4-.5-3-4-3-7.6 0-3.6 1.9-5.4 2.6-6.2.8-.8 1.7-1 2.3-1h1.6c.5 0 1.2.1 1.8 1.5.6 1.5 2.1 5.2 2.3 5.6.2.4.3.8.1 1.3-.2.5-.4.8-.8 1.2-.4.4-.8 1-1.1 1.3-.4.4-.8.8-.3 1.5.4.7 1.9 3.2 4.1 5.1 2.2 2 4.1 2.6 4.8 3 .7.4 1.2.3 1.6-.1.4-.5 1.9-2.2 2.4-2.9.5-.7 1-.6 1.7-.4.7.2 4.3 2 5.1 2.4.8.4 1.2.6 1 .9-.2.3-.2 1.8-1 3.9z" 
        />
      </svg>
    )
  },
  {
    title: "Linkedin AI Agent",
    rating: "4.9",
    reviews: "40.1k ratings",
    price: "2,222",
    originalPrice: "6,999",
    brandGradient: "from-blue-500 to-indigo-600",
    description: "Let our LinkedIn AI Agent automate your outreach, lead generation, and posting on LinkedIn while you focus on closing deals.",
    benefits: [
      "Find Target Leads",
      "Send Invitations",
      "Follow-Up Messages",
      "Commenting on Leads Posts",
      "Posting on your Behalf",
      "Optimise Your LinkedIn Profile"
    ],
    exclusions: [
      "Bypass LinkedIn daily invite limits (safeguards account)",
      "Send spam mass messages without personalization",
      "Fake connection profiles creation",
      "Direct browser cookie stealing",
      "Access to premium services without subscription",
      "Post-scheduling with external multi-account tools"
    ],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="4" fill="#0077B5" />
        <path d="M8.2 19H5.5V9.6H8.2V19z M6.9 8.3c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z M19 19h-2.7v-4.2c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V19H10.6V9.6h2.6v1.3h0c.4-.7 1.2-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4V19z" fill="#fff" />
      </svg>
    )
  },
  {
    title: "Gmail AI Agent",
    rating: "4.9",
    reviews: "33.1k ratings",
    price: "999",
    originalPrice: "4,999",
    brandGradient: "from-rose-400 to-red-500",
    description: "Let our Gmail AI Agent categorize your inbox, write replies, and schedule follow-up sequences automatically while you focus on deep work.",
    benefits: [
      "Automatically draft customized email replies",
      "Auto-categorize incoming emails by priority",
      "Trigger multi-day follow-up sequences",
      "Schedule meetings directly from email text",
      "Track email opens and link clicks",
      "Extract lead contact info into databases"
    ],
    exclusions: [
      "Mass bulk cold email spamming (complies with Gmail policies)",
      "Delete emails permanently without user review",
      "Bypass Gmail security warnings",
      "Send emails from unverified aliases",
      "Modify your Google Workspace configuration",
      "Read encrypted secure messages (PGP)"
    ],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20">
        <path fill="#4285F4" d="M0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64v16.362H1.636A1.636 1.636 0 0 1 0 19.366z" />
        <path fill="#34A853" d="M24 19.366V5.457c0-2.023-2.309-3.178-3.927-1.964L18.545 4.64v16.362H22.364A1.636 1.636 0 0 0 24 19.366z" />
        <path fill="#EA4335" d="M12 16.64l-6.545-4.91V4.64l6.545 4.908L18.545 4.64v7.09L12 16.64z" />
        <path fill="#C5221F" d="M0 5.457c0-2.023 2.309-3.178 3.927-1.964l1.528 1.147V11.73L0 7.5V5.457z" />
        <path fill="#FBBC05" d="M24 5.457c0-2.023-2.309-3.178-3.927-1.964l-1.528 1.147V11.73l5.455-4.23V5.457z" />
      </svg>
    )
  },
  {
    title: "Voice Calling AI Agent",
    rating: "4.9",
    reviews: "5.2k ratings",
    price: "5,000",
    originalPrice: "24,999",
    brandGradient: "from-sky-400 to-blue-500",
    description: "Let our Voice Calling AI Agent make cold calls, qualify leads, and schedule bookings using human-like voices while you focus on strategy.",
    benefits: [
      "Conduct outbound sales and qualifying calls",
      "Answer incoming customer support calls",
      "Book appointments and update calendars",
      "Recognize user intent and handle objections",
      "Multi-lingual call translations",
      "Send follow-up WhatsApp/emails post call"
    ],
    exclusions: [
      "Robocalls without target consent (anti-spam compliant)",
      "Bypassing DND (Do Not Disturb) registrations",
      "Direct spoofing of government numbers",
      "Continuous calls outside standard calling hours",
      "Replace human closing agents completely",
      "Live call monitoring without consent warnings"
    ],
    logo: (
      <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none">
        <rect x="25" y="25" width="4" height="10" rx="2" fill="#38bdf8" />
        <rect x="33" y="20" width="4" height="20" rx="2" fill="#38bdf8" />
        <rect x="41" y="15" width="4" height="30" rx="2" fill="#0ea5e9" />
        <rect x="49" y="10" width="4" height="40" rx="2" fill="#0284c7" />
        <rect x="57" y="15" width="4" height="30" rx="2" fill="#0ea5e9" />
        <rect x="65" y="20" width="4" height="20" rx="2" fill="#38bdf8" />
        <rect x="73" y="25" width="4" height="10" rx="2" fill="#38bdf8" />

        <circle cx="50" cy="70" r="20" fill="url(#mic-gradient-card)" />
        <g transform="translate(42, 62)">
          <rect x="6" y="2" width="4" height="9" rx="2" fill="#ffffff" />
          <path d="M2 7a6 6 0 0 0 12 0" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="13" x2="8" y2="15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        <defs>
          <linearGradient id="mic-gradient-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: "Instagram AI Agent",
    rating: "4.8",
    reviews: "18.2k ratings",
    price: "1,999",
    originalPrice: "4,999",
    brandGradient: "from-amber-400 to-rose-500",
    description: "Let our Instagram AI Agent schedule posts, answer direct messages, and engage with your followers automatically to grow your brand footprint.",
    benefits: [
      "Auto-reply to Instagram Direct Messages (DMs)",
      "Schedule and post stories and feed posts",
      "Monitor and reply to comments on posts",
      "Analyze audience engagement metrics",
      "Direct leads to your website link in bio",
      "Share catalog items in direct chats"
    ],
    exclusions: [
      "Auto-follow/unfollow spam tactics",
      "Bypass Instagram official API rate limits",
      "Fake comments and likes generation",
      "Direct profile scraping without authorization",
      "Direct ads account funding management",
      "Modify security password configurations"
    ],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="url(#ig-grad-card)" />
        <rect x="5" y="5" width="14" height="14" rx="4" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="16.5" cy="7.5" r="0.75" fill="#ffffff" />
        <defs>
          <linearGradient id="ig-grad-card" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#f9ce71" />
            <stop offset="50%" stopColor="#ee2a7b" />
            <stop offset="100%" stopColor="#6228d7" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    title: "Facebook AI Agent",
    rating: "4.7",
    reviews: "22.5k ratings",
    price: "1,499",
    originalPrice: "3,999",
    brandGradient: "from-blue-600 to-indigo-700",
    description: "Let our Facebook AI Agent moderate your pages, reply to comments, and manage customer inquiries on Messenger in real-time.",
    benefits: [
      "Reply to Facebook Page messages (Messenger)",
      "Auto-moderate toxic and spam comments",
      "Post content updates to page feed automatically",
      "Share custom booking links with prospects",
      "Broadcast messages to page subscribers",
      "Categorize support queries into folders"
    ],
    exclusions: [
      "Spamming Facebook Groups (complies with policy)",
      "Run ads campaigns without manual approval",
      "Access personal user timelines",
      "Automated group joins/joins bypass",
      "Edit page administrator roles",
      "Bypassing 2FA verification setups"
    ],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#1877F2" />
        <path d="M14 12h-2v7H9v-7H7.5V9.5H9V8c0-2 1-3.5 3.5-3.5H15v2.5h-1.5c-1 0-1 .5-1 1v1.5H15L14 12z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Twitter AI Agent",
    rating: "4.6",
    reviews: "11.4k ratings",
    price: "999",
    originalPrice: "2,999",
    brandGradient: "from-sky-400 to-blue-500",
    description: "Let our Twitter AI Agent draft threads, reply to mentions, and engage with industry keywords to build your organic reach.",
    benefits: [
      "Automatically draft and schedule Twitter threads",
      "Reply to mentions and direct messages (DMs)",
      "Retweet and like relevant industry posts",
      "Monitor brand keywords and hashtags",
      "Extract high-value leads from discussions",
      "Organize followers into customized lists"
    ],
    exclusions: [
      "Mass follow/unfollow and automation bans",
      "Fake engagement/botnet campaigns",
      "Bypass Twitter premium API limits",
      "Direct browser session token hijacking",
      "Edit security or email settings",
      "Run automated hashtag hijacking campaigns"
    ],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#1DA1F2" />
        <path d="M18.2 8a5.2 5.2 0 0 1-1.5.4 2.6 2.6 0 0 0 1.2-1.5 5.2 5.2 0 0 1-1.7.6 2.6 2.6 0 0 0-4.5 2.4A7.4 7.4 0 0 1 6.2 7a2.6 2.6 0 0 0 .8 3.5 2.6 2.6 0 0 1-1.2-.3v.1a2.6 2.6 0 0 0 2 2.5 2.6 2.6 0 0 1-1.1 0 2.6 2.6 0 0 0 2.4 1.8 5.2 5.2 0 0 1-3.8 1 7.4 7.4 0 0 0 4 1.2c4.8 0 7.4-4 7.4-7.4v-.3A5.3 5.3 0 0 0 18.2 8z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "X AI Agent",
    rating: "4.9",
    reviews: "31.8k ratings",
    price: "2,222",
    originalPrice: "5,999",
    brandGradient: "from-zinc-800 to-zinc-950",
    description: "Let our X AI Agent run smart campaigns, manage interactions, and leverage advanced AI algorithms to boost your profile presence on the X platform.",
    benefits: [
      "Analyze trending topics on X in real-time",
      "Auto-engage with key influencers' posts",
      "Draft context-aware replies using LLMs",
      "Schedule high-performance content posts",
      "Drive inbound traffic to external sites",
      "Create automatic daily summary threads"
    ],
    exclusions: [
      "Bypass X platform API subscription tiers",
      "Direct manipulation of trending topics",
      "Run spam campaigns violating terms",
      "Scrape data without authentication",
      "Access billing accounts or payment details",
      "Bypass standard rate limiting rules"
    ],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Claude AI Agent",
    rating: "4.9",
    reviews: "25.4k ratings",
    price: "1,499",
    originalPrice: "3,999",
    brandGradient: "from-orange-400 to-amber-600",
    description: "Integrate Claude's advanced reasoning capabilities for complex analysis, coding tasks, and long-form content generation.",
    benefits: ["Advanced reasoning and logic", "Large context window processing", "Complex coding assistance", "Detailed report generation", "Nuanced tone matching", "Data analysis and synthesis"],
    exclusions: ["Real-time physical world actions", "Bypassing safety filters", "Direct financial trading", "Generating malicious code", "Accessing unauthorized databases", "Automated deepfake creation"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#d97757" />
        <path d="M12 4L4 8v8l8 4 8-4V8l-8-4zm0 2.5l5.5 2.75-5.5 2.75-5.5-2.75L12 6.5zm-6.5 4.5l5.5 2.75v5.5L5.5 16.5v-5.5zm13 5.5l-5.5 2.75v-5.5l5.5-2.75v5.5z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "ChatGPT AI Agent",
    rating: "4.9",
    reviews: "150.2k ratings",
    price: "1,999",
    originalPrice: "4,999",
    brandGradient: "from-teal-400 to-emerald-600",
    description: "Deploy OpenAI's powerful ChatGPT models to automate customer service, draft emails, and brainstorm creative solutions 24/7.",
    benefits: ["Conversational customer support", "Creative brainstorming", "Language translation", "Quick email drafting", "Interactive learning assistance", "API integration ready"],
    exclusions: ["Bypassing OpenAI safety guidelines", "Providing certified legal/medical advice", "Real-time unauthorized scraping", "Simulating specific human identities maliciously", "Automated phishing campaigns", "Direct hardware control"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#10a37f" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#ffffff" opacity="0.2" />
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Reddit AI Agent",
    rating: "4.7",
    reviews: "8.1k ratings",
    price: "1,299",
    originalPrice: "3,499",
    brandGradient: "from-orange-500 to-red-500",
    description: "Monitor subreddits, engage with niche communities authentically, and identify trending topics for your brand without sounding like a bot.",
    benefits: ["Monitor brand mentions across subreddits", "Engage in relevant discussions organically", "Identify viral trends early", "Automate community moderation", "Schedule niche content posts", "Extract sentiment from threads"],
    exclusions: ["Mass upvote/downvote manipulation", "Bypassing subreddit specific rules", "Creating fake accounts for astroturfing", "Spamming promotional links", "Scraping private user data", "Automated ban evasion"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#FF4500" />
        <path d="M12 18.5c-3.5 0-6.5-1.5-6.5-3.5 0-2 3-3.5 6.5-3.5s6.5 1.5 6.5 3.5-3 3.5-6.5 3.5zm4.5-4.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-9 0c.8 0 1.5.7 1.5 1.5S8.3 17 7.5 17 6 16.3 6 15.5 6.7 14 7.5 14zm4.5 3c-1.5 0-2.8-.5-3.5-1.2l-.7.7c1 1 2.5 1.5 4.2 1.5s3.2-.5 4.2-1.5l-.7-.7c-.7.7-2 1.2-3.5 1.2z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Marketing AI Agent",
    rating: "4.8",
    reviews: "12.3k ratings",
    price: "2,499",
    originalPrice: "5,999",
    brandGradient: "from-pink-500 to-rose-600",
    description: "Automate your marketing campaigns, optimize ad spend, and generate compelling ad copy across multiple platforms simultaneously.",
    benefits: ["Cross-platform campaign management", "A/B testing automation", "Ad spend optimization", "Audience segmentation", "Performance analytics reporting", "Dynamic ad copy generation"],
    exclusions: ["Click fraud generation", "Bypassing ad platform policies", "Stealing competitor proprietary data", "Running unregulated political ads", "Accessing unauthorized payment methods", "Creating deceptive landing pages"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#ec4899" />
        <path d="M12 3l8 4v10l-8 4-8-4V7l8-4zm0 2.5L6.5 8.5v7l5.5 2.5 5.5-2.5v-7L12 5.5zM12 11l4 2-4 2-4-2 4-2z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Lead Gen AI Agent",
    rating: "4.9",
    reviews: "20.1k ratings",
    price: "2,999",
    originalPrice: "7,499",
    brandGradient: "from-violet-500 to-purple-600",
    description: "Supercharge your sales pipeline by automatically identifying, scoring, and nurturing high-quality leads from across the web.",
    benefits: ["Automated lead discovery", "Predictive lead scoring", "Multi-channel outreach sequences", "CRM data entry automation", "Meeting scheduling", "Intent signal monitoring"],
    exclusions: ["Buying/selling illegal data lists", "Bypassing GDPR/CCPA regulations", "Scraping non-public personal information", "Sending spam to unverified addresses", "Impersonating specific executives maliciously", "Automated phishing"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#8b5cf6" />
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm1-5h-2v2h-2v2h2v2h2v-2h2v-2h-2z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Content Writer AI Agent",
    rating: "4.8",
    reviews: "14.5k ratings",
    price: "1,499",
    originalPrice: "3,999",
    brandGradient: "from-yellow-400 to-orange-500",
    description: "Generate SEO-optimized blog posts, engaging articles, and persuasive copy while maintaining your unique brand voice.",
    benefits: ["SEO-optimized blog generation", "Brand voice matching", "Plagiarism-free original content", "Social media caption drafting", "Newsletter creation", "Content repurposing"],
    exclusions: ["Generating defamatory content", "Plagiarizing copyrighted works", "Writing academic essays for students", "Creating fake news/disinformation", "Bypassing publisher terms of service", "Automated review manipulation"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#f59e0b" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Browser Automation Agent",
    rating: "4.7",
    reviews: "9.2k ratings",
    price: "1,799",
    originalPrice: "4,499",
    brandGradient: "from-cyan-400 to-blue-600",
    description: "Automate repetitive web tasks, form submissions, and data extraction across complex web interfaces seamlessly.",
    benefits: ["Visual web scraping", "Automated form filling", "Cross-browser testing", "Routine data entry", "UI interaction scripting", "Screenshot and video capture"],
    exclusions: ["Bypassing CAPTCHAs illegally", "Executing DDoS attacks", "Scraping secured financial portals", "Automated ticket scalping", "Interfering with critical infrastructure", "Click fraud"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#06b6d4" />
        <path d="M4 6h16v12H4z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="7" cy="9" r="1" fill="#ffffff" />
        <circle cx="10" cy="9" r="1" fill="#ffffff" />
        <circle cx="13" cy="9" r="1" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Website Builder Agent",
    rating: "4.8",
    reviews: "11.1k ratings",
    price: "3,499",
    originalPrice: "8,999",
    brandGradient: "from-indigo-400 to-purple-600",
    description: "Design, code, and deploy stunning, responsive websites tailored to your specifications in a fraction of the time.",
    benefits: ["Rapid prototype generation", "Responsive layout design", "Component-based architecture", "SEO-friendly structure", "Performance optimization", "Custom styling generation"],
    exclusions: ["Hosting illegal content", "Building phishing sites", "Creating malware distribution hubs", "Bypassing domain registrar policies", "Stealing proprietary source code", "Deploying without user review"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#6366f1" />
        <path d="M12 4L4 8l8 4 8-4-8-4zm0 6l-8 4 8 4 8-4-8-4zm0 6l-8 4 8 4 8-4-8-4z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "SEO AI Agent",
    rating: "4.9",
    reviews: "18.4k ratings",
    price: "1,999",
    originalPrice: "5,499",
    brandGradient: "from-green-500 to-emerald-700",
    description: "Optimize your web presence continuously with automated keyword research, backlink analysis, and on-page SEO recommendations.",
    benefits: ["Automated keyword discovery", "Competitor backlink analysis", "On-page optimization suggestions", "Content gap identification", "SERP ranking tracking", "Meta tag generation"],
    exclusions: ["Black hat SEO tactics", "Automated link spamming", "Cloaking or deceptive redirects", "Keyword stuffing generation", "Negative SEO attacks on competitors", "Bypassing search engine guidelines"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#10b981" />
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Website Audit AI Agent",
    rating: "4.7",
    reviews: "7.6k ratings",
    price: "1,299",
    originalPrice: "2,999",
    brandGradient: "from-slate-500 to-gray-700",
    description: "Scan your website for technical issues, accessibility problems, and performance bottlenecks automatically.",
    benefits: ["Technical SEO auditing", "Core Web Vitals monitoring", "Accessibility compliance checks", "Broken link detection", "Security vulnerability scanning", "Detailed actionable reports"],
    exclusions: ["Penetration testing without permission", "Exploiting discovered vulnerabilities", "DDoS load testing", "Accessing restricted admin panels", "Modifying live site code directly", "Scraping competitor secure areas"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#64748b" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Google My Business AI Agent",
    rating: "4.8",
    reviews: "13.2k ratings",
    price: "999",
    originalPrice: "2,499",
    brandGradient: "from-blue-500 to-red-500",
    description: "Keep your local listings fresh, reply to reviews instantly, and post regular updates to dominate local search results.",
    benefits: ["Auto-reply to customer reviews", "Schedule local update posts", "Monitor Q&A sections", "Update business hours dynamically", "Analyze local search insights", "Manage multiple locations"],
    exclusions: ["Posting fake reviews", "Reporting legitimate competitor reviews falsely", "Creating duplicate spam listings", "Bypassing Google verification", "Publishing deceptive offers", "Keyword stuffing business names"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#4285F4" />
        <path d="M12 2c-3.86 0-7 3.14-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "RAG AI Agent",
    rating: "4.9",
    reviews: "22.5k ratings",
    price: "3,999",
    originalPrice: "9,999",
    brandGradient: "from-purple-500 to-pink-600",
    description: "Implement Retrieval-Augmented Generation to allow AI to query your proprietary documents and databases securely for accurate answers.",
    benefits: ["Secure internal document querying", "Hallucination reduction", "Context-aware enterprise search", "Automated knowledge base extraction", "Source citation integration", "Dynamic data updates"],
    exclusions: ["Exposing sensitive PII externally", "Bypassing internal access controls", "Training public models on private data", "Providing untraceable answers", "Manipulating source documents", "Accessing unencrypted secure keys"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#a855f7" />
        <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z" fill="#ffffff" opacity="0.3" />
        <path d="M12 2l4 4-4 4-4-4 4-4z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Customer Support AI Agent",
    rating: "4.9",
    reviews: "45.6k ratings",
    price: "1,999",
    originalPrice: "4,999",
    brandGradient: "from-cyan-500 to-teal-500",
    description: "Provide instant, 24/7 omnichannel support to your customers, resolving common queries and routing complex issues to human agents.",
    benefits: ["24/7 instant ticket resolution", "Multi-language support", "Sentiment analysis routing", "FAQ and knowledge base integration", "Automated refund processing", "Customer satisfaction tracking"],
    exclusions: ["Pretending to be a human maliciously", "Mishandling credit card data directly", "Denying service without human review option", "Accessing unauthorized medical records", "Bypassing compliance protocols", "Sending aggressive responses"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <circle cx="12" cy="12" r="11" fill="#06b6d4" />
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-1.31C18.16 19.67 21 16.17 21 12c0-4.97-4.03-9-9-9zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Personal AI Assistant Agent",
    rating: "4.8",
    reviews: "19.9k ratings",
    price: "999",
    originalPrice: "2,999",
    brandGradient: "from-rose-400 to-fuchsia-500",
    description: "Manage your calendar, organize your inbox, and handle daily administrative tasks so you can focus on high-impact work.",
    benefits: ["Smart calendar scheduling", "Inbox triage and summarization", "To-do list management", "Travel itinerary planning", "Expense tracking", "Daily briefing generation"],
    exclusions: ["Making unauthorized financial transactions", "Deleting important emails permanently", "Sharing personal schedules publicly", "Bypassing corporate security policies", "Impersonating you on legal documents", "Recording private meetings without consent"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#fb7185" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.67 0-5-1.34-5-3.33C7 15.01 10.33 14 12 14s5 1.01 5 2.67C17 18.66 14.67 20 12 20z" fill="#ffffff" />
      </svg>
    )
  },
  {
    title: "Computer Vision Agent",
    rating: "4.7",
    reviews: "5.4k ratings",
    price: "4,999",
    originalPrice: "12,999",
    brandGradient: "from-blue-600 to-indigo-800",
    description: "Analyze images and video streams in real-time for quality control, facial recognition, or automated visual inspection.",
    benefits: ["Real-time video analysis", "Object detection and classification", "Automated quality control", "Visual search integration", "Document OCR", "Anomaly detection"],
    exclusions: ["Unauthorized mass surveillance", "Deepfake generation", "Bypassing biometric security systems", "Processing non-consensual images", "Racial profiling algorithms", "Military targeting applications"],
    logo: (
      <svg viewBox="0 0 24 24" className="w-20 h-20" fill="none">
        <rect width="24" height="24" rx="6" fill="#2563eb" />
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#ffffff" />
      </svg>
    )
  }
];

interface PlatformProps {
  isDarkMode: boolean;
  navigateTo?: (page: 'home' | 'portfolio' | 'services' | 'contact' | 'register' | 'platform' | 'join' | 'admin' | 'whatsapp-ai-agent' | any) => void;
}

const Platform: React.FC<PlatformProps> = ({ navigateTo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'register' | 'login'>('register');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  // Selected agent for custom details page
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  // Locations for sliding header animation
  const locations = ["Noida", "New Delhi", "Gurugram"];
  const [locationIndex, setLocationIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocationIndex((prev) => (prev + 1) % locations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Form Field states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Check login status on mount
  useEffect(() => {
    const saved = localStorage.getItem('platform_user');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  // Handle Register/Login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    if (modalMode === 'register') {
      const userData = {
        name,
        email,
        mail: email,
        number,
        profession,
        companyName
      };

      try {
        // Post data to Google Apps Script Web App
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // standard Apps Script redirect handling
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(userData)
        });

        // Store user database locally to simulate backend persistence
        const existingUsersRaw = localStorage.getItem('platform_registered_users');
        const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

        // Save user if not already in list
        if (!existingUsers.some((u: any) => u.email === email)) {
          existingUsers.push(userData);
          localStorage.setItem('platform_registered_users', JSON.stringify(existingUsers));
        }

        // Login user session
        localStorage.setItem('platform_user', JSON.stringify({ name, email }));
        setCurrentUser({ name, email });

        // Reset form & close modal
        setName('');
        setEmail('');
        setNumber('');
        setProfession('');
        setCompanyName('');
        setIsModalOpen(false);
        
        if (pendingAction === 'join') {
          navigateTo?.('join');
          setPendingAction(null);
        } else {
          alert(`Account created successfully! Welcome, ${name}!`);
        }

      } catch (err) {
        console.error("Submission failed:", err);
        setSubmitError('Failed to register. Please check your internet connection.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Login flow: Lookup email in local registered list
      const existingUsersRaw = localStorage.getItem('platform_registered_users');
      const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const foundUser = existingUsers.find((u: any) => u.email === email);

      if (foundUser) {
        localStorage.setItem('platform_user', JSON.stringify({ name: foundUser.name, email: foundUser.email }));
        setCurrentUser({ name: foundUser.name, email: foundUser.email });
        setEmail('');
        setIsModalOpen(false);
        
        if (pendingAction === 'join') {
          navigateTo?.('join');
          setPendingAction(null);
        } else {
          alert(`Welcome back, ${foundUser.name}!`);
        }
      } else {
        setSubmitError('Email not found. Click "Get Started" to register this email first!');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white min-h-screen w-full relative select-none font-sans overflow-hidden">



      {/* Top Left Brand / Back navigation (Aligned with the right-sided demo call button) */}
      <div className="absolute top-4 md:top-6 left-4 md:left-8 z-50 flex items-center h-[34px]">
        <button
          onClick={() => navigateTo?.('home')}
          className="flex items-center group focus:outline-none"
        >
          <img
            src="/new-logo.webp"
            alt="Innovators AI HUB Logo"
            width={130}
            height={48}
            style={{ filter: 'brightness(0)' }}
            className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
          />
        </button>
      </div>

      {/* Top Right Action Group */}
      <div className="absolute top-4 md:top-6 right-4 md:right-8 z-50 flex flex-wrap md:flex-nowrap justify-end items-center gap-2 md:gap-4 w-[65vw] md:w-auto">

        {/* ₹2,000 Credits Button */}
        <div className="relative">
          <button
            onClick={() => setIsCreditsOpen(!isCreditsOpen)}
            className="bg-white text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-full px-4 py-2 text-xs font-bold tracking-wide hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-1.5 outline-none shadow-sm cursor-pointer"
          >
            <Sparkles size={13} className="text-zinc-950 fill-zinc-950" />
            <span>₹2,000</span>
            <ChevronDown size={12} className={`text-zinc-600 transition-transform duration-200 ${isCreditsOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Credits Popover Menu matching the screenshot exactly */}
          <AnimatePresence>
            {isCreditsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                className="absolute right-0 mt-3 w-80 bg-white rounded-3xl border border-zinc-100 p-6 shadow-2xl z-50 text-left"
              >
                {/* Row 1: Available Balance */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-zinc-700">Available Balance</span>
                    <span className="w-4 h-4 rounded-full border border-zinc-300 flex items-center justify-center text-[10px] text-zinc-500 font-bold cursor-help" title="Usage balance in Indian Rupees">?</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    New User
                  </span>
                </div>

                {/* Row 2: Balance Counter (Gemini Badge and large text) */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center text-[10px] text-white font-extrabold shadow-sm">
                    ✦
                  </div>
                  <span className="text-2xl font-black text-zinc-950 tracking-tight">₹2,000</span>
                </div>

                {/* Row 3: Gray Box detail wrapper */}
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-zinc-600 font-medium">
                      <span>Welcome Bonus</span>
                      <span className="w-3.5 h-3.5 rounded-full border border-zinc-300 flex items-center justify-center text-[8px] text-zinc-500 font-bold cursor-help" title="Free welcome bonus credited to account">i</span>
                    </div>
                    <span className="font-bold text-zinc-900">₹2,000 <span className="text-zinc-500 font-normal">/ ₹2,000</span></span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-600 font-medium">Added Funds</span>
                    <span className="font-bold text-zinc-900">₹0</span>
                  </div>
                </div>

                {/* Row 4: Action Button */}
                <button
                  onClick={() => {
                    alert("Redirecting to balance top-up portal...");
                  }}
                  className="w-full bg-[#fde047] hover:bg-[#facc15] text-zinc-950 font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-sm active:scale-95 transition-all duration-200 mb-5 outline-none"
                >
                  Add Balance
                </button>

                {/* Row 5: Footer explanatory copy */}
                <p className="text-[11px] leading-relaxed text-zinc-600 font-medium">
                  Every new user receives a welcome bonus of <span className="text-zinc-900 font-bold">₹2,000</span>. When you rent any AI Agent, this balance will automatically be used to pay your bills.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Join Team Button */}
        <button
          onClick={() => {
            if (currentUser) {
              navigateTo?.('join');
            } else {
              setPendingAction('join');
              setModalMode('login');
              setIsModalOpen(true);
            }
          }}
          className="bg-white text-zinc-950 hover:bg-zinc-50 border border-zinc-200 rounded-full px-5 py-2 text-xs font-bold tracking-wide hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 outline-none shadow-sm cursor-pointer"
        >
          <UserPlus size={13} className="text-zinc-600" />
          <span>Join Team</span>
        </button>

        {/* Book Demo Button (Black with zoom-in scale effect) */}
        <a
          href="https://calendar.app.google/D4VcVM3GVSh4PAia6"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white hover:bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-xs font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 outline-none shadow-sm"
        >
          <Calendar size={13} className="text-white/80" />
          <span>Book Demo</span>
        </a>

        {/* Account Menu (Dropdown) */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 focus:outline-none transition-transform active:scale-95"
            aria-label="Account Settings"
          >
            {/* Styled Profile / Avatar bubble in Black */}
            <div className="w-9 h-9 rounded-full border border-black p-[1.5px] shadow-sm hover:shadow transition-shadow">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-black transition-colors font-bold text-xs uppercase">
                {currentUser ? currentUser.name.charAt(0) : <User size={15} className="text-black" />}
              </div>
            </div>
            <ChevronDown size={14} className="text-zinc-400 hover:text-zinc-600 transition-colors" />
          </button>

          {/* Account Action Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setIsDropdownOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-2xl shadow-xl p-2 z-50 text-left"
                >
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-zinc-100 mb-1.5">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Account</p>
                        <p className="text-xs font-bold text-zinc-950 truncate mt-0.5">{currentUser.name}</p>
                        <p className="text-[10px] text-zinc-600 truncate">{currentUser.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          localStorage.removeItem('platform_user');
                          setCurrentUser(null);
                          alert("Signed out successfully!");
                        }}
                        className="w-full px-4 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all outline-none"
                      >
                        <LogIn size={13} className="text-red-400 rotate-180" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setModalMode('login');
                          setIsModalOpen(true);
                        }}
                        className="w-full px-4 py-2.5 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all outline-none"
                      >
                        <LogIn size={13} className="text-zinc-400" />
                        <span>Sign In</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setModalMode('register');
                          setIsModalOpen(true);
                        }}
                        className="w-full px-4 py-2.5 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-all outline-none"
                      >
                        <UserPlus size={13} className="text-zinc-400" />
                        <span>Get Started</span>
                      </button>
                    </>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Main Hero Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-4 pb-0 flex flex-col md:flex-row items-center gap-12 relative z-10">

        {/* Left Side: Creative Typography & Details */}
        <div className="flex-1 text-left space-y-8 max-w-2xl">
          <div className="space-y-4">

            {/* Elegant Header with focus word 'Rent' styled 2X bigger and in green */}
            <div
              style={{ fontFamily: '"Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              className="flex flex-col items-start select-text"
            >
              {/* Line 1: Rent your 1st (Sizes improved by 2K standard/large ratio) */}
              <h1 className="flex items-baseline flex-nowrap whitespace-nowrap leading-none">
                <span
                  style={{
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)'
                  }}
                  className="mr-3 md:mr-4"
                >
                  Rent
                </span>
                <span
                  style={{
                    color: '#000000',
                    fontWeight: 500,
                    fontSize: 'clamp(1.4rem, 3vw, 2.5rem)'
                  }}
                  className="mr-3 md:mr-5"
                >
                  your
                </span>
                <span
                  style={{
                    color: '#15803d',
                    fontWeight: 900,
                    fontSize: 'clamp(5.5rem, 13vw, 10.5rem)',
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    lineHeight: 1
                  }}
                  className="leading-none"
                >
                  <span>1</span>
                  <span
                    style={{
                      fontSize: '0.15em',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      marginLeft: '0.05em',
                      paddingTop: '0.22em'
                    }}
                  >
                    st
                  </span>
                </span>
              </h1>

              {/* Line 2: AI Agent Co-Worker (Sized to fit on a single line) */}
              <h2
                style={{
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 3.8vw, 3.2rem)'
                }}
                className="mt-4 leading-tight tracking-tight whitespace-nowrap"
              >
                AI Agent Co-Worker
              </h2>
            </div>

            {/* Left Side Aligned Starts At Button (Triggers Get Started glassy Form) */}
            <div className="text-left mt-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(149, 214, 86, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(149, 214, 86, 0.25)", "0 0 0px rgba(0,0,0,0)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  if (currentUser) {
                    alert(`You are logged in as ${currentUser.name}! Directing to dashboard...`);
                  } else {
                    setModalMode('register');
                    setIsModalOpen(true);
                  }
                }}
                style={{
                  fontFamily: '"Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 600,
                  backgroundColor: '#000000',
                  color: '#ffffff'
                }}
                className="px-5 py-2.5 rounded-xl text-xs md:text-sm tracking-wide shadow-md hover:bg-zinc-900 active:scale-95 transition-all cursor-pointer outline-none border border-zinc-800"
              >
                Starts at ₹999/mo
              </motion.button>
            </div>

          </div>


          {/* Starts at button - Description removed */}

        </div>

        {/* Right Side: Hero Image Showcase */}
        <div className="flex-1 w-full flex justify-center md:justify-end items-center select-none pointer-events-none md:-mr-12 lg:-mr-16">
          <div className="relative w-full flex justify-center md:justify-end items-center">
            {/* Soft creative background gradient highlights behind the image */}
            <div className="absolute top-1/2 left-1/2 md:left-auto md:right-12 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-green-100/35 to-indigo-100/35 blur-3xl -z-10" />

            {/* Image Wrapper with Bottom White Fade Overlay & Founder Tag */}
            <div className="relative flex justify-center items-end max-w-[450px] md:max-w-[540px] lg:max-w-[620px] w-full overflow-hidden -translate-y-8 md:-translate-y-14">
              <img
                src="/platform_hero.webp"
                srcSet="/platform_hero_mobile.webp 640w, /platform_hero.webp 1024w"
                sizes="(max-width: 768px) 100vw, 620px"
                alt="AI Co-Worker Platform Hero"
                width={620}
                height={480}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain translate-y-[5%] scale-[1.05] mix-blend-multiply"
              />

              {/* Floating Text: Trust the Innovator, First */}
              <a 
                href="https://www.linkedin.com/in/sagarmasand1/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-[52%] md:top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-zinc-200 shadow-xl transform rotate-[-2deg] hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer"
              >
                <span className="text-xs md:text-sm font-bold text-zinc-800 tracking-tight whitespace-nowrap" style={{ fontFamily: '"Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Trust the Innovator, First
                </span>
              </a>

              {/* Founder Label just below the tip of the arrow (Clickable LinkedIn Link) */}
              <a
                href="https://www.linkedin.com/in/sagarmasand1/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-[75%] md:top-[69%] left-[0%] md:left-[6%] -translate-y-1/2 z-20 flex items-center gap-3 bg-white/95 hover:bg-white backdrop-blur-md p-1 pr-4 rounded-2xl border border-zinc-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:scale-[1.03] transition-all duration-200 pointer-events-auto cursor-pointer"
                style={{ fontFamily: '"Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                {/* Real LinkedIn logo image */}
                <img
                  src="/linkedin_logo.webp"
                  alt="LinkedIn Logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 object-contain rounded-xl"
                />

                <div className="flex flex-col items-start leading-none pr-1">
                  <span className="text-[13px] font-bold text-zinc-900 leading-none">Sagar</span>
                  <span className="text-[9px] text-zinc-600 font-semibold tracking-wider uppercase mt-1">Founder</span>
                </div>
              </a>

              {/* Subtle whitish gradient overlay at the very bottom edge to blend the crop line smoothly */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>

      </div>

      {/* Let's Build AI Team Section */}
      <div
        style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}
        className="bg-white pt-2 pb-16 px-6 relative z-10"
      >
        <div className="max-w-6xl mx-auto text-center">

          {/* Sliding Locations Header Block */}
          <div 
            style={{ fontFamily: '"Syne", "Arial Black", sans-serif' }}
            className="flex items-center justify-center gap-2 select-none mb-6 flex-wrap"
          >
            {/* Trending text with flame on top of the letter 'I' */}
            <div className="relative inline-flex items-center">
              <h3 
                style={{
                  color: '#00ff87', // bright neon green
                  fontWeight: 900,
                  fontSize: 'clamp(1.1rem, 2.8vw, 2rem)',
                  letterSpacing: '-0.02em',
                  WebkitTextStroke: '4px #003e1c', // thick dark green outline
                  paintOrder: 'stroke fill',
                }}
                className="uppercase relative select-none leading-none tracking-tighter inline-flex items-center"
              >
                TREND
                <span className="relative inline-block">
                  I
                  <span className="absolute bottom-[65%] left-1/2 -translate-x-1/2 select-none pointer-events-none">
                    <svg className="w-5 h-5 md:w-7 md:h-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C12 2 17 6.5 17 10.5C17 13.5 14.5 16 11.5 16C8.5 16 6 13.5 6 10.5C6 8.5 7.5 6.5 7.5 6.5L12 2Z" fill="#ffffff" stroke="#003e1c" strokeWidth="2.5" strokeLinejoin="round" />
                      <path d="M12 6C12 6 14 8.5 14 10.5C14 12 13 13 11.5 13C10 13 9 12 9 10.5C9 9.5 10 8.5 10 8.5L12 6Z" fill="#00ff87" opacity="0.8" />
                    </svg>
                  </span>
                </span>
                NG
              </h3>
            </div>

            <span 
              style={{
                fontSize: 'clamp(0.8rem, 2vw, 1.3rem)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
              className="text-zinc-600 font-sans"
            >
              in
            </span>

            {/* Sliding Location with Simple Gradient Color */}
            <div className="h-[2rem] md:h-[2.5rem] relative overflow-hidden min-w-[110px] md:min-w-[160px] inline-flex items-center text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={locations[locationIndex]}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }} // exit downwards: vanish towards downside
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 bg-clip-text text-transparent font-sans tracking-tight uppercase"
                  style={{
                    fontSize: 'clamp(0.9rem, 2.2vw, 1.5rem)',
                    fontWeight: 900,
                  }}
                >
                  {locations[locationIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative inline-block mb-10 z-10">
            <h2 
              className="text-[12px] md:text-[15px] font-bold text-zinc-950 tracking-wider uppercase"
            >
              Let's Build AI Team
            </h2>
          </div>


          <div className="relative mt-8">
            <AnimatePresence mode="wait">
              {!selectedAgent ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
                >
                  {aiCoWorkers.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        if (item.title.toLowerCase().includes('whatsapp')) {
                          if (navigateTo) navigateTo('whatsapp-ai-agent');
                          else window.location.href = '/whatsapp-ai-agent';
                        } else if (item.title.toLowerCase().includes('linkedin')) {
                          if (navigateTo) navigateTo('linkedin-ai-agent');
                          else window.location.href = '/linkedin-ai-agent';
                        } else {
                          setSelectedAgent(item);
                        }
                      }}
                      className="bg-blue-500/[0.12] rounded-[28px] border border-blue-500/15 hover:border-blue-500/30 overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group"
                    >
                      {/* Image Container with Logo */}
                      <div className="w-full h-44 bg-blue-500/[0.05] group-hover:bg-blue-500/[0.10] flex items-center justify-center relative select-none border-b border-blue-200/20 transition-colors duration-300">
                        {/* Rating badge */}
                        <div className="absolute top-3 right-3 bg-white text-[10px] md:text-xs font-semibold text-zinc-700 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-zinc-100/60">
                          <span className="text-yellow-500">★</span> {item.rating.split(" ")[0]} <span className="text-zinc-600">({item.reviews.split(" ")[0]})</span>
                        </div>
                        {/* Logo Wrapper */}
                        <div className="flex items-center justify-center p-6 text-zinc-800 transition-transform duration-300 group-hover:scale-110">
                          {item.logo}
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex-1 flex flex-col justify-between text-left">
                        <div>
                          <h3 
                            className="text-base md:text-lg font-medium text-zinc-900 leading-tight mb-2 select-text"
                          >
                            {item.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-baseline gap-1 select-text font-medium">
                            <span className="text-xl text-zinc-950">₹{item.price}</span>
                            <span className="text-xs text-zinc-600">/mo</span>
                            {item.originalPrice && (
                              <span className="text-xs line-through text-zinc-600 ml-2">₹{item.originalPrice}</span>
                            )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.title.toLowerCase().includes('whatsapp')) {
                                if (navigateTo) navigateTo('whatsapp-ai-agent');
                                else window.location.href = '/whatsapp-ai-agent';
                              } else if (item.title.toLowerCase().includes('linkedin')) {
                                if (navigateTo) navigateTo('linkedin-ai-agent');
                                else window.location.href = '/linkedin-ai-agent';
                              } else {
                                setSelectedAgent(item);
                              }
                            }}
                            className="px-6 py-2.5 rounded-xl text-xs md:text-sm font-medium text-white shadow-sm hover:scale-105 hover:shadow-md hover:shadow-green-500/10 active:scale-95 transition-all duration-300 bg-gradient-to-r from-emerald-400 to-green-500"
                          >
                            Rent
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="relative z-10"
                >
                  {/* Go back button */}
                  <button 
                    onClick={() => setSelectedAgent(null)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-950 font-semibold text-sm mb-6 transition-colors mx-auto md:mx-0 outline-none"
                  >
                    <ChevronLeft size={16} />
                    <span>Back to Agent Hub</span>
                  </button>

                  <div className="bg-white rounded-[32px] border border-zinc-100 p-6 md:p-10 shadow-lg max-w-4xl mx-auto text-left relative overflow-hidden">
                    {/* Glowing effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Top Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-50 rounded-2xl flex-shrink-0">
                          {selectedAgent.logo}
                        </div>
                        <div>
                          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight mb-1">
                            {selectedAgent.title}
                          </h1>
                          <div className="flex items-center gap-1.5 text-zinc-600 text-xs md:text-sm font-medium">
                            <span className="text-yellow-500">★</span>
                            <span>{selectedAgent.rating} ({selectedAgent.reviews})</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="flex items-center justify-between md:justify-end gap-6 flex-wrap mt-4 md:mt-0">
                        <div className="text-left md:text-right">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl md:text-3xl font-black text-zinc-950">₹{selectedAgent.price}</span>
                            <span className="text-xs md:text-sm text-zinc-600">/mo</span>
                          </div>
                          {selectedAgent.originalPrice && (
                            <span className="text-xs md:text-sm line-through text-zinc-600">₹{selectedAgent.originalPrice}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => {
                            if (selectedAgent.title.toLowerCase().includes('whatsapp')) {
                              if (navigateTo) navigateTo('whatsapp-ai-agent');
                              else window.location.href = '/whatsapp-ai-agent';
                            } else if (selectedAgent.title.toLowerCase().includes('linkedin')) {
                              if (navigateTo) navigateTo('linkedin-ai-agent');
                              else window.location.href = '/linkedin-ai-agent';
                            } else {
                              setModalMode('register');
                              setIsModalOpen(true);
                            }
                          }}
                          className="px-6 py-3 rounded-xl text-xs md:text-sm font-medium text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 bg-gradient-to-r from-emerald-400 to-green-500 hover:shadow-green-500/10"
                        >
                          Rent Agent
                        </button>
                      </div>
                    </div>

                    {/* Content Description */}
                    <div className="py-6 space-y-6">
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-zinc-900 mb-2">
                          One Agent. Countless Automation.
                        </h3>
                        <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-normal">
                          {selectedAgent.description}
                        </p>
                      </div>

                      {/* Benefits & Exclusions side-by-side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        {/* What it Automates */}
                        <div className="space-y-4">
                          <h4 className="text-sm md:text-base font-bold text-zinc-900 tracking-wide">
                            {selectedAgent.title} Automates
                          </h4>
                          <ul className="space-y-3">
                            {selectedAgent.benefits.map((b: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mt-0.5">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                                <span className="text-xs md:text-sm text-zinc-700 font-normal">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Does not include */}
                        <div className="space-y-4">
                          <h4 className="text-sm md:text-base font-bold text-zinc-900 tracking-wide">
                            Does not include
                          </h4>
                          <ul className="space-y-3">
                            {selectedAgent.exclusions.map((e: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 mt-0.5">
                                  <X size={11} strokeWidth={3} />
                                </span>
                                <span className="text-xs md:text-sm text-zinc-700 font-normal">{e}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* tag line footer */}
                    <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
                      <p className="text-xs md:text-sm font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-500/5 py-2.5 px-6 rounded-xl inline-block">
                        you just focus on closing Deals.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Glassy Get Started / Sign In Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm">
            {/* Modal backdrop clicks close modal */}
            <div className="fixed inset-0 cursor-default" onClick={() => setIsModalOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white/90 border border-white/40 backdrop-blur-xl rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 md:p-8 max-w-md w-full relative z-50 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 p-1.5 rounded-full transition-colors outline-none"
              >
                <X size={16} />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-zinc-950">
                  {modalMode === 'register' ? 'Get Started' : 'Sign In'}
                </h3>
                <p className="text-[11px] text-zinc-600 mt-1">
                  {modalMode === 'register'
                    ? 'Enter your details below to rent your AI Co-worker team.'
                    : 'Enter your email id to access your AI login account.'}
                </p>
              </div>

              {/* Error feedback */}
              {submitError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {modalMode === 'register' ? (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Sagar"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Email (Mail)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="sagar@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Number</label>
                      <input
                        type="tel"
                        required
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Profession / Role</label>
                      <input
                        type="text"
                        required
                        value={profession}
                        onChange={e => setProfession(e.target.value)}
                        placeholder="e.g. Founder"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Company Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="Innovators AI HUB"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 text-sm outline-none transition-all"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="sagar@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:border-zinc-500 text-sm outline-none transition-all"
                    />
                  </div>
                )}

                {/* Primary Action Button (Submit/Create Account) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 outline-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving to Sheet...</span>
                    </>
                  ) : (
                    <span>{modalMode === 'register' ? 'Submit & Create Account' : 'Verify Email & Sign In'}</span>
                  )}
                </button>

                {/* Secondary Button just below primary action button */}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitError('');
                    setModalMode(modalMode === 'register' ? 'login' : 'register');
                  }}
                  className="w-full py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 outline-none mt-2"
                >
                  {modalMode === 'register' ? 'Sign In instead' : 'Create Account / Get Started'}
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Platform;
