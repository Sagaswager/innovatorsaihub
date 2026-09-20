# Codebase Structure

**Analysis Date:** 2026-09-20

## Directory Layout

```
p:/InnovationAiHub/
├── Sections/                  # Modular UI feature sections and views
│   ├── AIQuote.tsx            # AI quote display section
│   ├── AdminDashboard.tsx     # Internal applicant/admin viewer
│   ├── AgentPopup.tsx         # Agent detail modal popup
│   ├── AgentTeams.tsx         # Agent catalog grid & data definitions
│   ├── Contact.tsx            # Contact information & direct inquiry form
│   ├── CustomAgentBanner.tsx  # Banner prompting custom multi-agent builds
│   ├── CustomAgentModal.tsx   # Modal for capturing custom agent requirements
│   ├── DemoModal.tsx          # Demo presentation modal
│   ├── EventRegistration.tsx  # Multi-step AI for Business event registration
│   ├── Footer.tsx             # Global website footer with navigation & links
│   ├── Header.tsx             # Main header with branding, nav links, team counter
│   ├── Hero.tsx               # Homepage hero banner with animated typography
│   ├── JoinTeam.tsx           # Internship application portal with CV upload
│   ├── PillButton.tsx         # Reusable interactive pill CTA component
│   ├── Platform.tsx           # Comprehensive platform overview and feature deck
│   ├── Port.tsx               # Portfolio showcase items
│   ├── Portfolio.tsx          # Portfolio page wrapper
│   ├── Reels.tsx              # Video demo showcase / AI Brand Film reels
│   ├── Services.tsx           # Interactive services diagram and quote generator
│   ├── SnowEffect.tsx         # Ambient particle visual effect
│   └── Work.tsx               # Work process showcase
├── public/                    # Static assets served at domain root
│   ├── ai-logos.png           # Favicon and multi-model icon sheet
│   ├── background.jpg         # Hero and section backdrop visual
│   ├── linkedin_agent_preview.png # Open Graph and social share card image
│   ├── llms.txt               # LLM/AI crawler summary of company services
│   ├── pricing.md             # Machine-readable pricing breakdown
│   ├── reel1.mp4              # Sample AI brand film video asset
│   ├── robots.txt             # Search engine crawling rules & sitemap pointer
│   └── sitemap.xml            # Canonical XML sitemap for search engines
├── .planning/                 # Project planning, codebase maps, and task roadmaps
│   └── codebase/              # Structured architectural and technical documents
├── App.tsx                    # Root React orchestrator, routing, head SEO metadata
├── index.html                 # HTML5 entry shell, font links, Schema.org JSON-LD, GA4
├── index.tsx                  # React DOM mount point (createRoot)
├── analytics.ts               # GA4 and Google Tag Manager telemetry dispatcher
├── package.json               # Dependencies and build scripts
├── package-lock.json          # Deterministic dependency lockfile
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite bundler, path alias, and dev server config
├── vercel.json                # Vercel edge deployment, 301 redirects, and rewrites
└── README.md                  # Project overview and run instructions
```

## Directory Purposes

**`Sections/`:**
- Purpose: Contains all modular visual sections, modals, and sub-pages.
- Contains: React TypeScript components (`*.tsx`).
- Key files:
  - `AgentTeams.tsx`: Contains `agentsData` export defining standard catalog offerings.
  - `Services.tsx`: Contains dynamic coordinate calculations and interactive canvas connectors.
  - `EventRegistration.tsx`: Multi-step form with timer, QR payment, and Google Sheets submission.
  - `JoinTeam.tsx`: File upload handling with base64 encoding to Google Apps Script.

**`public/`:**
- Purpose: Houses all static assets directly accessible by web browsers and web crawlers.
- Contains: Images (`.png`, `.jpg`), videos (`.mp4`), crawler text files (`robots.txt`, `llms.txt`, `pricing.md`), and XML sitemaps (`sitemap.xml`).
- Key files:
  - `sitemap.xml`: Primary search engine URL manifest.
  - `robots.txt`: Search crawler indexing permissions.
  - `llms.txt`: Generative Engine Optimization (GEO) manifest for Perplexity, ChatGPT, Claude.

**`.planning/codebase/`:**
- Purpose: Persistent system and architectural intelligence for developers and AI agents.
- Contains: Seven canonical codebase mapping documents (`STACK.md`, `INTEGRATIONS.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `CONVENTIONS.md`, `TESTING.md`, `CONCERNS.md`).

## Key File Locations

**Entry Points:**
- `index.html`: Web page shell and initial head metadata
- `index.tsx`: Application mounting onto `#root`
- `App.tsx`: Central router and state controller

**Configuration:**
- `vite.config.ts`: Vite bundling, environment variables, and dev server
- `tsconfig.json`: TypeScript compiler options and `@` path alias
- `vercel.json`: Edge redirects and SPA rewrite rules

---

*Structure analysis: 2026-09-20*
*Update when adding top-level directories or reorganizing component trees*
