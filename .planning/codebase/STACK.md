# Technology Stack

**Analysis Date:** 2026-09-20

## Languages

**Primary:**
- TypeScript 5.8.2 - All client application code, component definitions, and types (`App.tsx`, `index.tsx`, `Sections/*.tsx`, `analytics.ts`)

**Secondary:**
- HTML5 - Application shell (`index.html`) with semantic head metadata, Open Graph tags, Twitter Card tags, and Schema.org JSON-LD
- JSON - Configuration and package definitions (`package.json`, `tsconfig.json`, `vercel.json`)

## Runtime

**Environment:**
- Browser (Modern evergreen browsers supporting ES2022+ modules)
- Node.js (v18+ / v20+ recommended for local tooling and development)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.2.3 (`react`, `react-dom`) - Client-side UI component tree and rendering
- Framer Motion 12.27.5 (`framer-motion`) - Smooth page transitions, card hovering animations, modal animations, and snow particles

**Icons & UI:**
- Lucide React 0.562.0 (`lucide-react`) - Modern iconography across UI components and navigation
- Tailwind CSS (Runtime loaded via CDN `https://cdn.tailwindcss.com`) - Atomic utility styling with dark-mode defaults

**Build/Dev:**
- Vite 6.2.0 (`vite`) - High-performance local dev server and ESM production bundler
- `@vitejs/plugin-react` 5.0.0 - Fast refresh and JSX compilation for React
- TypeScript 5.8.2 (`typescript`) - Type checking and IntelliSense

## Key Dependencies

**Critical:**
- `react` / `react-dom` (19.2.3) - Core frontend rendering library
- `framer-motion` (12.27.5) - Powers interactive transitions and complex animations across all sections
- `lucide-react` (0.562.0) - Icon set used across cards, badges, buttons, and navigation

**Infrastructure & Tooling:**
- `@types/node` (22.14.0) - Type declarations for Node environment
- `@vitejs/plugin-react` (5.0.0) - Vite integration for React

## Configuration

**Environment:**
- Vite environment variable loading configured via `loadEnv` in `vite.config.ts`
- Variables supported: `GEMINI_API_KEY` (mapped to `process.env.API_KEY` and `process.env.GEMINI_API_KEY`)

**Build & Hosting:**
- `vite.config.ts`: Configures dev server (`port: 3000`, `host: '0.0.0.0'`), React plugin, and path alias `@` -> project root
- `tsconfig.json`: Target ES2022, module ESNext, moduleResolution bundler, isolatedModules, path alias `@/*`
- `vercel.json`: Edge routing config with 301 redirects for non-www host -> `www.innovatorsaihub.com`, `/home` -> `/`, reverse-proxy rewrite for WhatsApp automation, and wildcard SPA rewrite to `/index.html`

## Platform Requirements

**Development:**
- Windows / macOS / Linux with Node.js 18+ and npm installed
- Development command: `npm run dev` (starts server on `http://localhost:3000`)
- Build command: `npm run build`

**Production:**
- Vercel hosting platform (`vercel.json` routing configuration)
- Deployed at: `https://www.innovatorsaihub.com`

---

*Stack analysis: 2026-09-20*
*Update after major dependency changes*
