/**
 * Static per-route HTML shells.
 *
 * The site is a client-rendered Vite/React SPA: every route was served the same
 * dist/index.html, so /services, /portfolio, /contact, /register and /join were
 * byte-identical to the homepage for any crawler that does not run JS (Google
 * filed them "Discovered / Crawled - currently not indexed").
 *
 * This runs after `vite build` and writes a copy of dist/index.html to
 * dist/<route>/index.html with that route's own title, description, canonical,
 * Open Graph and Twitter tags. Vercel resolves the filesystem before the
 * catch-all rewrite in vercel.json, so these files win for their own URLs while
 * unknown paths still fall through to the SPA.
 *
 * The values mirror the client-side metadata in App.tsx on purpose: crawlers and
 * visitors must see the same thing.
 *
 * Add a route here when a new public page is added to the sitemap.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.innovatorsaihub.com';
const DIST = 'dist';
const DEFAULT_IMAGE = '/platform_hero.webp';

const ROUTES = {
  'whatsapp-ai-agent': {
    title: 'WhatsApp AI Agent for Business | Innovators AI HUB',
    description:
      'Automate customer support, lead qualification and CRM workflows with a WhatsApp AI Agent for business. Explore smarter WhatsApp automation today.',
    image: '/whatsapp-agent-interface.webp',
  },
  'linkedin-ai-agent': {
    title: 'LinkedIn AI Agent for B2B Prospecting | Innovators AI HUB',
    description:
      'Scale B2B prospecting with a LinkedIn AI Agent for sales. Automate personalized outreach, lead generation and follow-ups. Explore the solution today.',
    image: '/linkedin_agent_preview.png',
  },
  services: {
    title: 'Rent AI Co-worker Agents & Teams | Services | Innovators AI HUB',
    description:
      'Browse and hire from our pre-trained AI agent catalog: WhatsApp AI bots, outbound voice calling agents, LinkedIn outreach agents, and custom teams.',
  },
  portfolio: {
    title: 'Our Portfolio | Innovators AI HUB',
    description:
      'Explore our portfolio of AI brand films, autonomous agent setups, and advanced automation workflows built by Innovators AI HUB.',
  },
  contact: {
    title: 'Contact Us | Innovators AI HUB',
    description:
      'Get in touch with Innovators AI HUB to hire custom AI agents or build multi-agent workflows tailored to your business operations.',
  },
  register: {
    title: 'AI for Business Event Registration | Innovators AI HUB',
    description:
      'Register for the AI for Business event at Ofis Square, Noida. Meet Founders using AI for 10X Growth, AI Agents workshops, and premium networking.',
  },
  join: {
    title: 'Join Our Team | Innovators AI HUB',
    description: 'Apply for internship and join the Innovators AI HUB team.',
  },
  privacy: {
    title: 'Privacy Policy | Innovators AI HUB',
    description:
      'How Innovators AI HUB handles account details and analytics, and how to change your analytics consent.',
  },
};

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement, label, route) {
  if (!pattern.test(html)) {
    throw new Error(`route-shells: ${label} not found in dist/index.html (route "${route}")`);
  }
  return html.replace(pattern, replacement);
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
const written = [];

for (const [route, meta] of Object.entries(ROUTES)) {
  const url = `${SITE}/${route}`;
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const image = SITE + (meta.image ?? DEFAULT_IMAGE);

  let html = template;
  const set = (pattern, replacement, label) =>
    (html = replaceOnce(html, pattern, replacement, label, route));

  set(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, '<title>');
  set(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description}">`,
    'description',
  );
  set(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`, 'canonical');
  set(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`, 'og:url');
  set(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`, 'og:title');
  set(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${description}">`,
    'og:description',
  );
  set(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${image}">`, 'og:image');
  set(/<meta name="twitter:url" content="[^"]*">/, `<meta name="twitter:url" content="${url}">`, 'twitter:url');
  set(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`, 'twitter:title');
  set(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${description}">`,
    'twitter:description',
  );
  set(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${image}">`, 'twitter:image');

  mkdirSync(join(DIST, route), { recursive: true });
  writeFileSync(join(DIST, route, 'index.html'), html);
  written.push(`/${route}`);
}

console.log(`route-shells: wrote ${written.length} shells -> ${written.join(', ')}`);
