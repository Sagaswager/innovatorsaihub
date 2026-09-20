# External Integrations

**Analysis Date:** 2026-09-20

## APIs & External Services

**Google Apps Script / Google Sheets (Internship & Lead Forms):**
- **Join Team Form (`Sections/JoinTeam.tsx`):**
  - Endpoint: `https://script.google.com/macros/s/AKfycbzMGZYdWM4HF-3jISJLOk9kvt4x9yXM_dNF23TMtkGhYwr8XbMwQiaZXTK640WGJMU/exec`
  - Protocol: POST request sending applicant payload (name, email, phone, university, year, team, base64 CV data)
  - Target: Appends responses to dedicated Google Sheet backend and saves uploaded resumes
- **Event Registration Form (`Sections/EventRegistration.tsx`):**
  - Endpoint: `https://script.google.com/macros/s/AKfycbx4dF7wuetgSnMA2Dw0nkwunHeZaroNaYJeP5XAAf4pmxtqZQPsNWo1tNH9nc3rprTm/exec`
  - Protocol: POST request sending participant registrations, seat bookings, and transaction IDs

**Direct Communication Channels:**
- **WhatsApp Direct Messaging:**
  - Phone: `+91 98108 75683`
  - Deep Link URLs: `https://wa.me/919810875683?text=...` triggered via floating button (`App.tsx`) and dynamic quote generator (`Sections/Services.tsx`)
- **Direct Mailto Inquiries:**
  - Email: `Sagarmasand9@gmail.com`
  - Deep Link URLs: Configured for automated service inquiries with prefilled subject and body

**Reverse Proxy / Subdomain Routing:**
- **WhatsApp Automation Subdomain (`vercel.json`):**
  - Rewrite rules: `/WhatsAppautomaton` -> `https://wa.innovatorsaihub.com/WhatsAppautomaton`

## Data Storage

**Client-Side Persistence:**
- `localStorage`:
  - Key `internship_applications`: Used in `Sections/AdminDashboard.tsx` to store and preview submitted applications locally on client devices
  - Key `admin_authenticated`: Used in Join Team / Admin flows for administrative access control

**Cloud Storage:**
- Google Drive / Google Sheets via Apps Script Webhooks: Stores resume uploads and registration rosters

## Authentication & Identity

**Current Setup:**
- Light client-side password / status checks for admin sections (`localStorage`)
- No server-side auth provider (Supabase/Firebase/Auth0) currently attached to the frontend bundle

## Monitoring, Tracking & Analytics

**Google Analytics (GA4):**
- Measurement ID: `G-FRNF7K23EF` (active in `index.html`)
- Helper: `analytics.ts` (`trackEvent`) wraps `window.gtag` and `window.dataLayer`
- Event hooks: Used across navigation, service inquiries, and event registration interactions

**Meta Pixel (Facebook Pixel):**
- Script stubbed in `index.html` (currently awaiting production Pixel ID replacement)

**Google Search Console & Search Engines:**
- Verified domain property: `innovatorsaihub.com` (DNS verification)
- XML Sitemap: `https://www.innovatorsaihub.com/sitemap.xml`
- Robots directives: `https://www.innovatorsaihub.com/robots.txt`

## CI/CD & Deployment

**Hosting Platform:**
- Vercel (Edge routing, redirects, rewrites, and static asset serving)
- Production URL: `https://www.innovatorsaihub.com`
- GitHub Repository: `https://github.com/Sagaswager/innovatorsaihub`
- Automated Git deployments upon push to `main` branch

---

*Integration audit: 2026-09-20*
*Update when adding/removing external services*
