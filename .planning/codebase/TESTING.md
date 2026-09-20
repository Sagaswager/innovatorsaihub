# Testing Patterns

**Analysis Date:** 2026-09-20

## Current Test Status

**Framework:**
- No automated unit test runner (Jest / Vitest) is currently installed in `package.json`.
- No end-to-end framework (Playwright / Cypress) is currently configured.

**Build Validation Commands:**
```bash
npm run build      # Executes Vite production build and checks TypeScript bundling
npm run preview    # Serves the production build locally to inspect routing & asset loading
```

## Quality Assurance & Verification Patterns

**1. Static Type & Syntax Verification:**
- Primary check is performed by `vite build` and the TypeScript compiler (`tsc` via Vite plugin).
- Ensures prop contracts, route string identifiers, and imported assets conform to TypeScript types.

**2. Manual Functional Verification Workflows:**
- **Navigation & Deep Linking:** Test direct browser refreshes on sub-routes (`/services`, `/portfolio`, `/contact`, `/register`, `/join`, `/admin`) to verify `vercel.json` rewrites and `App.tsx` `handlePopState` synchronization.
- **Form Submissions:**
  - Submit test entry in `JoinTeam.tsx` to verify Google Apps Script webhook integration and base64 CV attachment transfer.
  - Submit test registration in `EventRegistration.tsx` to confirm seat counters and Google Sheet logging.
- **WhatsApp Dynamic Link Generation:**
  - Select agents in `AgentTeams.tsx` or `Services.tsx`.
  - Click WhatsApp button and confirm generated URI encodes agent names, pricing tiers, and custom requirements correctly.

**3. SEO & Indexing Verification:**
- **Google Search Console URL Inspection:** Test live URL indexing, canonical resolution (`https://www.innovatorsaihub.com/`), and mobile usability.
- **Schema Markup Validator:** Run `https://validator.schema.org/` on homepage to validate `LocalBusiness`, `Organization`, and `FAQPage` JSON-LD structures.
- **Google PageSpeed Insights:** Run audits on `https://pagespeed.web.dev/` to monitor Core Web Vitals (LCP, INP, CLS) and mobile performance.

## Recommendations for Test Suite Implementation

**Planned Testing Stack:**
1. **Unit & Component Testing:**
   - Install `vitest`, `@testing-library/react`, and `@testing-library/user-event`.
   - Create test files matching `Sections/__tests__/*.test.tsx`.
   - Test route transitions, modal openings, and agent selection logic.
2. **End-to-End Testing:**
   - Install `@playwright/test` to test complete user journeys across all 5 upcoming agent landing pages.

---

*Testing audit: 2026-09-20*
*Update when automated test runners or CI testing gates are introduced*
