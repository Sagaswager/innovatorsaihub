# Architecture

**Analysis Date:** 2026-09-20

## Pattern Overview

**Overall:** Single Page Application (SPA) with Client-Side Routing and Dynamic Document Head Mutation

**Key Characteristics:**
- **Zero-Dependency Lightweight Routing:** Uses native browser History API (`pushState` and `popstate`) in `App.tsx` instead of heavy router libraries (like React Router), keeping bundle size minimal.
- **Dynamic SEO Head Injection:** A dedicated `useEffect` in `App.tsx` dynamically modifies `document.title`, `document.querySelector('meta[name="description"]')`, canonical `<link>`, and Open Graph / Twitter metadata upon route changes.
- **Edge Rewrite Fallback:** Managed by `vercel.json` where all incoming route requests (`/(.*)`) rewrite to `/index.html` so client-side routing handles deep linking.
- **Micro-Section Modular Architecture:** Feature screens and landing sections are decomposed into dedicated components in `Sections/`.

## Layers

**1. Shell & Entry Layer (`index.html`, `index.tsx`):**
- Purpose: Provides HTML5 base shell, font loaders, CDN CSS injections (Tailwind, Google Fonts), initial SEO Schema.org JSON-LD scripts, and React DOM root mounting (`createRoot`).
- Depends on: None.
- Used by: Vite bundler and browser runtime.

**2. Application State & Orchestration Layer (`App.tsx`):**
- Purpose: Controls global application state (`currentPage`, `isDarkMode`, `selectedAgents`, `customDescriptions`, modal toggles), history navigation listeners, page title/metadata updates, and top-level transition animations.
- Depends on: Component sections in `Sections/`, Framer Motion, Lucide icons, and `analytics.ts`.
- Used by: Application root.

**3. Feature Sections & UI Component Layer (`Sections/*.tsx`):**
- Purpose: Encapsulates distinct UI views and features:
  - Platform Overview (`Sections/Platform.tsx`)
  - Hero & Banner Section (`Sections/Hero.tsx`, `Sections/CustomAgentBanner.tsx`)
  - Agent Catalog & Team Builder (`Sections/AgentTeams.tsx`, `Sections/Services.tsx`, `Sections/CustomAgentModal.tsx`)
  - Event Registration System (`Sections/EventRegistration.tsx`)
  - Hiring & Internship Portal (`Sections/JoinTeam.tsx`)
  - Interactive Media & Portfolios (`Sections/Reels.tsx`, `Sections/Port.tsx`, `Sections/AIQuote.tsx`)
  - Internal Admin (`Sections/AdminDashboard.tsx`)
  - Navigation & Global Chrome (`Sections/Header.tsx`, `Sections/Footer.tsx`, `Sections/SnowEffect.tsx`)
- Depends on: React, Framer Motion, Lucide React, and shared data objects.

**4. Utility & Telemetry Layer (`analytics.ts`):**
- Purpose: Dispatches telemetry events safely to `window.gtag` and `window.dataLayer` with fallback console logging.

## Data Flow

### 1. Page Load & Route Resolution Flow
```
Browser Request (e.g. /services)
  │
  ▼
Vercel Edge (vercel.json checks redirects: non-www -> www, /home -> /; rewrites remainder to /index.html)
  │
  ▼
Browser loads index.html (executes GA4 script, loads initial head metadata)
  │
  ▼
React mounts (index.tsx -> App.tsx)
  │
  ▼
handlePopState() executes -> parses window.location.pathname
  │
  ▼
Sets currentPage state ('services')
  │
  ▼
SEO useEffect triggers -> mutates document.title, meta description, and canonical link
  │
  ▼
Framer Motion AnimatePresence renders matching view from Sections/
```

### 2. Service Selection & WhatsApp Inquiry Flow
```
User clicks "Add to Team" on Agent Card (Sections/AgentTeams.tsx or Services.tsx)
  │
  ▼
toggleAgent(id) updates selectedAgents state array in App.tsx
  │
  ▼
trackEvent('add_agent_to_team', { agentId }) fires GA4 telemetry
  │
  ▼
User clicks "Hire via WhatsApp" or "Request Proposal"
  │
  ▼
getWhatsAppLink() compiles selected agents and custom notes into encoded URI
  │
  ▼
Opens WhatsApp with pre-filled message directed to +91 98108 75683
```

## Key Abstractions

- **Agent Model (`Agent` interface in `Sections/AgentTeams.tsx`):**
  Defines `id`, `name`, `description`, `price`, and `icon`. Centralized in `agentsData` array and shared across catalog and services views.
- **Route State Union (`currentPage`):**
  Defines valid views (`'home' | 'portfolio' | 'services' | 'contact' | 'register' | 'platform' | 'join' | 'admin'`). Expanding the site to host dedicated AI agent landing pages requires extending this union and corresponding switch cases.

---

*Architecture analysis: 2026-09-20*
*Update when introducing new routing systems, state providers, or backend layers*
