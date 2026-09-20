# Codebase Concerns

**Analysis Date:** 2026-09-20

## Technical Debt

**1. Canonical URL Inconsistency in Client-Side Router:**
- **Issue:** In `App.tsx` (line 115), `pageUrl` is constructed as `https://innovatorsaihub.com${...}` (non-www). However, the site canonical standard in `index.html` and `vercel.json` 301 redirects is `https://www.innovatorsaihub.com/`.
- **Why:** Leftover from initial setup before 301 redirects to `www` were implemented.
- **Impact:** Whenever a user navigates between pages on the client, the `<link rel="canonical">` and Open Graph tags get rewritten to the non-www domain, conflicting with the server canonical and causing indexing warnings in Google Search Console.
- **Fix approach:** Update `pageUrl` in `App.tsx` to strictly use `https://www.innovatorsaihub.com`.

**2. Client-Side Rendering (SPA) Dependency for SEO Content:**
- **Issue:** The entire site renders inside `<div id="root"></div>` via React 19 and Vite.
- **Why:** Rapid prototype setup using client-side SPA architecture.
- **Impact:** While Googlebot can render JavaScript, SPA rendering introduces indexing latency, potential crawl budget exhaustion, and poor snippet generation by social platforms and less advanced search crawlers (Bing, DuckDuckGo, LLM scrapers).
- **Fix approach:** For the 5 upcoming AI agent landing pages, ensure critical headings, meta tags, and structured data are pre-rendered, or consider static HTML generation for high-value landing routes.

**3. Tailwind CSS CDN in Production (`index.html`):**
- **Issue:** Uses `<script src="https://cdn.tailwindcss.com"></script>` in `<head>`.
- **Why:** Enabled fast development styling without local Tailwind build pipeline configuration.
- **Impact:** Adds client-side parsing overhead, increases time-to-interactive, causes occasional style flashing/CLS (Cumulative Layout Shift), and increases Largest Contentful Paint (LCP) time.
- **Fix approach:** Migrate from Tailwind CDN script to a build-time Tailwind CSS Vite plugin or standard PostCSS compilation.

## Known Bugs & Placeholders

**1. Meta (Facebook) Pixel Placeholder in Production:**
- **Symptoms:** 404/400 console tracking errors or missing conversion tracking.
- **Trigger:** Loading the page triggers Facebook Pixel initialization with `YOUR_PIXEL_ID` placeholder in `index.html` (lines 38 and 213).
- **Workaround:** Provide real Pixel ID or comment out script until ID is available.
- **Root cause:** Script template added without live credentials.

## Security Considerations

**1. Unauthenticated Admin Route (`/admin`):**
- **Risk:** Anyone navigating to `/admin` can view the applicant table and download submitted CVs stored in the browser's `localStorage`.
- **Current mitigation:** `localStorage` is scoped to the browser instance, so external visitors do not see applications submitted by other users unless on a shared terminal.
- **Recommendations:** Implement proper server-side authentication (e.g. Supabase Auth or password protected serverless edge middleware) before handling sensitive applicant data.

**2. Direct Base64 File Uploads to Google Apps Script:**
- **Risk:** Large files submitted via `JoinTeam.tsx` are converted to base64 Data URLs and sent via unauthenticated POST to a public Google Apps Script endpoint.
- **Current mitigation:** File input accepts any file type; basic front-end check for presence.
- **Recommendations:** Implement file size limits (< 5MB) and MIME-type validation to prevent payload overload or script timeout.

## Fragile Areas

**1. Centralized Routing State in `App.tsx`:**
- The router relies on string union typing (`'home' | 'portfolio' | 'services' | ...`) with manual `history.pushState` and `window.addEventListener('popstate')`.
- Adding new routes (e.g. the 5 dedicated AI agent pages) requires synchronized updates across:
  1. Union type definition in `App.tsx`
  2. `switch` statement in SEO `useEffect`
  3. `switch` / conditional branches in JSX rendering
  4. Header and Footer navigation links
  5. `public/sitemap.xml`
- Missing any one of these steps results in broken back-navigation or unindexed URLs.

---

*Concerns audit: 2026-09-20*
*Update as issues are resolved or new technical debt is introduced*
