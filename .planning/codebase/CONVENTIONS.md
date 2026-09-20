# Coding Conventions

**Analysis Date:** 2026-09-20

## Naming Patterns

**Files & Directories:**
- Component Files: `PascalCase.tsx` under `Sections/` (e.g. `AgentTeams.tsx`, `CustomAgentModal.tsx`, `EventRegistration.tsx`)
- Utility & Helper Files: `camelCase.ts` at root or designated folders (e.g. `analytics.ts`)
- Configuration Files: standard dot/config notation (`vite.config.ts`, `tsconfig.json`, `vercel.json`)
- Static Assets: lowercase hyphenated or snake_case with appropriate extensions (`ai-logos.png`, `background.jpg`, `linkedin_agent_preview.png`)

**Functions & Methods:**
- Standard Functions: `camelCase` (e.g. `toggleAgent`, `trackEvent`, `updateCoordinates`, `getWhatsAppLink`)
- Event Handlers: `handle` prefix (e.g. `handlePopState`, `handleInputChange`, `handleFileChange`, `handleSubmit`, `handleClearData`)
- Route Navigators: `navigateTo(page)` pattern

**Variables & Constants:**
- Variables: `camelCase` (e.g. `isDarkMode`, `currentPage`, `selectedAgents`, `customDescriptions`)
- Static Constants / URLs: `UPPER_SNAKE_CASE` for file-level endpoints (e.g. `GOOGLE_SCRIPT_URL`, `GOOGLE_SHEET_URL`)
- Component State Setters: standard `set` + PascalCase name (`setCurrentPage`, `setSelectedAgents`, `setIsSubmitting`)

**Types & Interfaces:**
- React Props Interfaces: `PascalCase` with `Props` suffix (e.g. `ServicesProps`, `AgentTeamsProps`, `JoinTeamProps`, `AdminDashboardProps`)
- Data Entities: `PascalCase` (e.g. `Agent`, `Application`)
- No Hungarian `I` prefix (prefer `Agent` over `IAgent`)

## Code Style & Layout

**Formatting:**
- Indentation: 2 spaces
- Semicolons: Required at end of statements
- Quotes: Single quotes for TypeScript imports and string literals; double quotes for JSX attributes and JSON files
- Component Declaration: Functional components with explicit `React.FC<Props>` or standard function signature

**Imports Organization:**
1. React core and hook imports (`import React, { useState, useEffect, useRef } from 'react';`)
2. Third-party UI/Animation libraries (`framer-motion`, `lucide-react`)
3. Internal component imports (`import Header from './Sections/Header';`)
4. Utilities and telemetry (`import { trackEvent } from '../analytics';`)

**Styling & Design System:**
- Atomic Tailwind CSS utility classes used directly in JSX `className`
- Color Palette: Dark zinc base (`bg-zinc-950`, `bg-zinc-900/40`, `text-zinc-100`, `text-zinc-400`), translucent borders (`border-white/5`, `border-white/10`), vibrant accents (`blue-500`, `cyan-500`, `emerald-500`, `purple-500`)
- Typography: Inter for body text, Sora for headings (`h1`, `h2`, `h3`), Bodoni Moda for brand serif accents, Syne for modern display accents
- Animation Paradigm: Declarative animations using Framer Motion (`initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`)

## Error Handling & Defensive Patterns

**Browser Globals:**
- Check for `typeof window !== 'undefined'` before accessing browser globals (`window.gtag`, `window.dataLayer`, `window.history`) to maintain SSR/isomorphic safety.
- Guard against null DOM elements when manipulating head elements (`document.querySelector('meta[name="description"]')`).

**Async & External Requests:**
- Wrap `fetch` calls in `try/catch` blocks with explicit UI loading flags (`isSubmitting`) and user-facing error feedback (`setSubmitStatus('error')`).

---

*Conventions analysis: 2026-09-20*
*Update when introducing code linters, formatters (Prettier/ESLint), or style guides*
