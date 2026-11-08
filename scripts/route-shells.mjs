/**
 * Static per-route HTML shells — with prerendered content.
 *
 * The site is a client-rendered Vite/React SPA. Originally every route was served
 * the same dist/index.html, so Google filed /services, /portfolio, /contact,
 * /register and /join as "Crawled - currently not indexed": no <h1>, ~30 words of
 * text, one canonical pointing at the homepage.
 *
 * This runs after `vite build` and, for every route, writes dist/<route>/index.html
 * with:
 *   1. that route's own title, description, canonical, Open Graph and Twitter tags
 *   2. a real <h1> plus ~300 words of body copy inside #root (React's createRoot
 *      clears #root on first render, so visitors see the normal app — the copy is
 *      only what a non-JS crawler reads)
 *   3. route-appropriate JSON-LD (the generic FAQPage block is dropped everywhere
 *      except the homepage, where the FAQ is actually rendered)
 *   4. noindex on private routes
 *
 * It also writes dist/404.html, which Vercel serves for unmatched paths with a
 * real 404 status (see the rewrites in vercel.json — there is no catch-all).
 *
 * The metadata mirrors the client-side metadata in App.tsx on purpose: crawlers and
 * visitors must see the same thing.
 *
 * Add a route here when a new public page is added to the sitemap.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.innovatorsaihub.com';
const DIST = 'dist';
const DEFAULT_IMAGE = '/platform_hero.webp';

/** Shown to crawlers and to anyone whose JS has not booted yet. */
const ROUTES = {
  '': {
    title: 'AI Agent Teams & Business Automation | Innovators AI HUB',
    description:
      'Build AI agent teams for business automation, sales and customer workflows. Discover custom AI automation solutions from Innovators AI HUB. Get started.',
    h1: 'AI Agent Teams That Run Your Business Workflows',
    body: [
      'Innovators AI HUB builds and rents AI agent teams — autonomous co-workers that handle customer conversations, outbound prospecting and back-office workflows for growing businesses. Instead of hiring one more person per channel, you hire a small team of specialised agents that works around the clock and never drops a lead.',
      'Each agent owns one job. The WhatsApp AI Agent answers enquiries within seconds, qualifies the buyer, books the meeting and writes the result back to your CRM. The LinkedIn AI Agent researches your ideal buyers, opens personalised conversations and follows up until a call is on the calendar. The Voice Calling AI Agent handles outbound calls and first-line support in natural speech.',
      'Agents can run alone or as a team: a LinkedIn agent warms the lead, a WhatsApp agent keeps the conversation alive, a voice agent closes the booking, and a coordinator agent decides which one speaks next. Everything is wired to the tools you already use — WhatsApp Business API, HubSpot, Salesforce, Zoho, Google Calendar, Sheets or a custom endpoint.',
      'Onboarding is an audit, not a rebuild. We look at how enquiries arrive today, configure the agents around that process, and go live in days rather than quarters. You keep visibility: every conversation, hand-off and booked meeting is logged and can be reviewed by your team.',
      'We also produce AI brand films — cinematic product and brand stories built with generative video — for companies that want their marketing to look as modern as the systems behind it.',
      'Innovators AI HUB is based in Noida, India and works with clients across India and overseas, remotely. To see the agents on a real workflow, book a demo and we will walk through a live conversation end to end.',
    ],
    faq: true,
  },
  'whatsapp-ai-agent': {
    title: 'WhatsApp AI Agent for Business | Innovators AI HUB',
    description:
      'Automate customer support, lead qualification and CRM workflows with a WhatsApp AI Agent for business. Explore smarter WhatsApp automation today.',
    image: '/whatsapp-agent-interface.webp',
    h1: 'WhatsApp AI Agent for Business',
    body: [
      'A WhatsApp AI Agent is an autonomous assistant that answers your customers inside WhatsApp, in the channel they already use, without a human sitting on the phone. It replies in seconds at any hour, asks the qualifying questions your sales team would ask, books the meeting and records everything in your CRM.',
      'Most businesses lose leads in the gap between an enquiry arriving and someone replying. The agent closes that gap. Incoming messages are understood in natural language, including Hindi and Hinglish, so a customer can type freely instead of tapping through a menu. The agent answers product and pricing questions, checks availability, shares a catalogue or brochure, and hands over to a person the moment the conversation needs one.',
      'What it does on a typical day: replies to new enquiries, follows up with people who went quiet, confirms or reschedules appointments, sends order and delivery updates, collects documents, and tags every conversation so your team knows which leads are hot.',
      'Typical setups run on the official WhatsApp Business API with a verified number, connected to HubSpot, Zoho, Salesforce, Google Sheets or your own backend. If you already have a support desk, the agent can feed it rather than replace it.',
      'You stay in control. Escalation rules decide when a human takes over, quiet hours are respected, and every message is logged and reviewable. Nothing about the customer relationship is hidden from you.',
      'Setup starts with a short audit of how enquiries reach you today, then a configured agent tested against real conversations before it goes live on your number. Book a demo to see the agent handle one of your own enquiries.',
    ],
  },
  'linkedin-ai-agent': {
    title: 'LinkedIn AI Agent for B2B Prospecting | Innovators AI HUB',
    description:
      'Scale B2B prospecting with a LinkedIn AI Agent for sales. Automate personalized outreach, lead generation and follow-ups. Explore the solution today.',
    image: '/linkedin_agent_preview.png',
    h1: 'LinkedIn AI Agent for B2B Prospecting',
    body: [
      'A LinkedIn AI Agent runs your outbound prospecting on LinkedIn: it finds people who match your buyer profile, starts a relevant conversation, follows up, and puts qualified calls on your calendar. Your sales team stops spending the morning on search filters and starts the day with replies and booked meetings.',
      'The work happens in four steps. First, targeting — the agent builds and refines the search from your ideal customer profile: role, seniority, industry, geography, company size. Second, personalisation — every opening message is written from something real on the profile, not a mail-merge field, which is why reply rates hold up. Third, follow-up — the agent tracks who opened, who replied, who went quiet, and follows up on a schedule instead of forgetting. Fourth, hand-off — when someone shows interest, the agent books the call and passes the full context to you.',
      'It also keeps your network warm: it accepts and sorts connection requests, replies to inbound DMs, and can engage with relevant posts so your profile stays visible to the people you are trying to reach.',
      'Safety is part of the design. Daily invitation and message limits are respected, sending is spread across working hours, and accounts are monitored for warnings so volume is reduced before LinkedIn reacts. A human can pause the agent at any time.',
      'Reporting tells you what matters: how many conversations started, how many replied, how many meetings were booked, and which message actually earned the reply.',
      'The agent works alongside your existing CRM, so leads and notes land where your team already looks. Book a demo and we will show the outreach flow against a target list you choose.',
    ],
  },
  services: {
    title: 'Rent AI Co-worker Agents & Teams | Services | Innovators AI HUB',
    description:
      'Browse and hire from our pre-trained AI agent catalog: WhatsApp AI bots, outbound voice calling agents, LinkedIn outreach agents, and custom teams.',
    h1: 'Rent AI Co-worker Agents and Teams',
    body: [
      'You do not have to build an AI system from scratch. Innovators AI HUB rents pre-trained AI co-workers that are already configured for the work Indian businesses do every day — customer support, lead qualification, outbound calling and B2B prospecting — and can be adapted to your process in days.',
      'The catalogue covers four kinds of agent. The WhatsApp AI Agent handles inbound conversations, qualification and appointment booking on the official WhatsApp Business API. The Voice Calling AI Agent makes outbound calls and answers first-line support in natural speech. The LinkedIn AI Agent runs targeted B2B outreach, follow-ups and appointment setting. The Custom Agent Team is built for workflows that do not fit a template: multi-agent setups where a coordinator routes work between specialists.',
      'Every engagement follows the same path. We audit how the work happens today, agree on what the agent is responsible for and what stays human, configure the agent against your tools, test it on real conversations, and then go live. After go-live you get a monthly review of what the agents handled and where they handed over.',
      'Because the agents are rented, there is no platform to buy and no server to maintain. You pay for the agents you use, and you can add a second channel or a second agent when the first one proves itself.',
      'Integrations are standard rather than bespoke: WhatsApp Business API, HubSpot, Zoho, Salesforce, Google Calendar, Sheets, email and custom REST endpoints. If a tool is not on the list, we tell you honestly whether it is worth connecting.',
      'Not sure which agent fits? Start with the audit — it usually shows that one channel is losing the most leads, and that is where the first agent should go.',
    ],
    schema: 'services',
  },
  pricing: {
    title: 'Pricing for AI Agent Teams | Innovators AI HUB',
    description:
      'See what an AI agent costs: the Standard plan from ₹999/month and the Pro plan at ₹14,999, plus custom multi-agent workflows and AI brand films.',
    h1: 'AI Agent Pricing',
    body: [
      'AI agents are rented, not bought. That keeps the entry point low: you start with one agent on one channel, watch what it handles, and add capacity when it earns it. There is no licence fee, no server to maintain and no long implementation project to fund up front.',
      'The Standard plan starts at ₹999 per month and covers a single AI co-worker on one channel — typically the WhatsApp AI Agent handling enquiries, qualification and appointment booking, or the LinkedIn AI Agent running outreach from one profile. It includes setup, connection to your existing tools and the monthly review of what the agent handled.',
      'The Pro plan is ₹14,999 and is built for teams that need more than one agent or more than one channel working together: several WhatsApp numbers, a voice agent alongside the chat agent, a LinkedIn agent feeding the WhatsApp agent, or a coordinator that routes work between specialists. Volume, integrations and reporting depth are agreed in the audit rather than fixed in advance.',
      'Custom multi-agent workflows and AI brand films are quoted per project, because the scope is genuinely different each time — a five-agent sales pipeline is not the same job as a thirty-second brand film.',
      'Every plan starts with an audit of how enquiries reach you today. That audit is what tells you which plan you actually need, and it is common for the answer to be cheaper than expected: one well-configured agent on the busiest channel usually beats three agents nobody monitors.',
      'Prices shown are monthly and exclude applicable taxes. To get an exact quote for your workflow, book a demo and bring one real process to the call.',
    ],
    schema: 'pricing',
  },
  portfolio: {
    title: 'Our Portfolio | Innovators AI HUB',
    description:
      'Explore our portfolio of AI brand films, autonomous agent setups, and advanced automation workflows built by Innovators AI HUB.',
    h1: 'Our Portfolio',
    body: [
      'Our work falls into two halves: systems that run a business process, and films that make the business look the way it now works.',
      'On the systems side we have built autonomous agent setups for real estate, clinics, retail and e-commerce. A real-estate enquiry arrives on WhatsApp, is qualified on budget and locality, and lands as a booked site visit. A clinic receives appointment requests after hours and returns confirmed slots instead of a missed call. A retail business answers product questions from a catalogue and pushes the order to its fulfilment sheet. Each of these is a small team of agents rather than a single chatbot, because qualification, booking and follow-up are different jobs.',
      'On the brand side we produce AI brand films — cinematic shorts built with generative video, blending live action with synthetic environments. These are used for launches, investor decks, landing pages and paid social, where a conventional shoot would cost more and take longer.',
      'We also build the plumbing that makes both halves work: CRM integrations, conversation logging, hand-off rules for when a human must step in, and dashboards that show what the agents did this week.',
      'What ties the portfolio together is scope discipline. Every project starts by naming the one process that will change, the number that will prove it changed, and the point where a person takes over. If a project cannot be described that way, we say so before taking it on.',
      'Want to see something close to your own case? Tell us the process and we will show the nearest build, including what it did not solve.',
    ],
    schema: 'portfolio',
  },
  contact: {
    title: 'Contact Us | Innovators AI HUB',
    description:
      'Get in touch with Innovators AI HUB to hire custom AI agents or build multi-agent workflows tailored to your business operations.',
    h1: 'Contact Innovators AI HUB',
    body: [
      'The fastest way to reach us is WhatsApp on +91 98108 75683 — which is also the channel most of our agents run on, so you can see the experience from the customer side while you ask your question. Email works too: Sagarmasand9@gmail.com.',
      'Come with a process rather than a wish. The most useful first message describes one thing that costs you time today: enquiries answered late, follow-ups forgotten, a sales team spending its morning on LinkedIn search filters, calls that never get made. From that we can usually say within one conversation whether an agent is the right answer.',
      'A typical first call runs thirty minutes. We ask how enquiries arrive, who answers them now, which tools hold the record, and what a good outcome looks like. You leave with a proposed agent, a rough monthly cost and the one number we would watch to judge it. If the honest answer is that you do not need an agent yet, we say that.',
      'We are based in Noida, India and work with clients across India and overseas. Onboarding is remote: setup, integration and testing all happen online, and the agent goes live on your own number or profile.',
      'For press, partnership or hiring questions, the same two contacts work — mention the context in the first line and it reaches the right person.',
      'Prefer to book directly? Use the demo link on this page and pick a slot; the calendar invite includes a short form so the call starts with context instead of introductions.',
    ],
    schema: 'contact',
  },
  register: {
    title: 'AI for Business Event Registration | Innovators AI HUB',
    description:
      'Register for the AI for Business event at Ofis Square, Noida. Meet Founders using AI for 10X Growth, AI Agents workshops, and premium networking.',
    h1: 'AI for Business — Event Registration',
    body: [
      'AI for Business is a working session for founders and operators who want to use AI in the business rather than read about it: founders describing what actually moved their numbers, hands-on agent workshops, and time to talk to the people building these systems.',
      'The day is built around demonstration. Instead of slide decks about the future of AI, you watch an agent take a live enquiry, qualify it, book a meeting and write it into a CRM — then you are shown the configuration behind it. The workshops are small enough that you can bring your own process and leave with a sketch of how an agent would handle it.',
      'Who comes: founders and co-founders of small and mid-sized businesses, sales and operations leads, and marketing teams who are being asked to do more with the same headcount. No technical background is required — if you can describe your customer journey, you can follow the sessions.',
      'What you leave with: a clear view of which of your processes is worth automating first, the realistic monthly cost of doing it, and a shortlist of the tools involved. Several attendees arrive sceptical and leave having cancelled a hiring plan.',
      'The event is held at Ofis Square, Noida. Seats are limited because the workshops are hands-on, and registration is confirmed by email — bring the confirmation with you.',
      'Use the form on this page to register. If you are coming with a colleague, register each person separately so we can size the workshop groups. For group registrations or to ask about accessibility and timings, message us on WhatsApp.',
    ],
    schema: 'register',
  },
  join: {
    title: 'Join Our Team | Innovators AI HUB',
    description: 'Apply for internship and join the Innovators AI HUB team.',
    h1: 'Join the Innovators AI HUB Team',
    body: [
      'We are a small team building and running AI agent systems for client businesses, which means the work is close to the customer and the feedback is immediate. If an agent misreads a real enquiry on Monday, you will know by Monday afternoon.',
      'Internships are the main way people join. Interns here do real work rather than shadowing: writing and testing agent prompts, mapping a client process, checking conversations for quality, building the content that explains what we do. You are given one clear responsibility and the support to get good at it.',
      'What we look for: clear writing, comfort with ambiguity, and the patience to read a hundred conversations to find the pattern. Familiarity with AI tools helps but is not the test — the test is whether you can explain a process so precisely that a machine could follow it. Curiosity about sales, support or operations matters more than a specific degree.',
      'What we offer: direct access to the founders, exposure to live client systems from the first month, and a genuine path to a full-time role for people who take ownership. Internships are based in Noida with some remote work, and are paid for candidates past the trial period.',
      'How to apply: use the form on this page with a short note about the one thing you would want to automate, and a link to anything you have written or built. A two-line honest note beats a template cover letter.',
      'We read every application and reply to those we want to talk to, usually within a week. If you do not hear back, it is a no for this role — not a judgement on your work.',
    ],
    schema: 'join',
  },
  privacy: {
    title: 'Privacy Policy | Innovators AI HUB',
    description:
      'How Innovators AI HUB handles account details and analytics, and how to change your analytics consent.',
    h1: 'Privacy Policy',
    body: [
      'This page explains what Innovators AI HUB collects when you use this website, why, and how you can change your mind.',
      'Analytics. We use Google Analytics 4 to understand which pages are useful. Analytics storage is denied by default: no analytics cookies are set and no data is sent until you press Allow on the consent banner. If you decline, the site works exactly the same. You can change your choice at any time from the same banner.',
      'Account details. If you sign in with Google or register for an event, we store the name and email address you provide, plus the fact that you signed in. That information is used to give you access to the platform and to contact you about the event or service you asked for. It is not sold and not shared with advertisers.',
      'Conversations with our agents. When you message us on WhatsApp or LinkedIn, the conversation may be handled by an AI agent and is stored so that a human can review and follow up. We keep it for as long as needed to serve you, and you can ask us to delete it.',
      'Who else sees data. Our website is hosted on Vercel, analytics is Google Analytics, and messaging runs through the official WhatsApp Business API and LinkedIn. These providers process data on our behalf under their own terms. We do not run advertising pixels or sell data to third parties.',
      'Your choices. Write to Sagarmasand9@gmail.com to ask what we hold about you, to correct it, or to have it deleted. We respond within a reasonable period and will tell you if we cannot comply and why.',
      'Changes. If this policy changes in a way that affects you, the updated version will appear here with a new date.',
    ],
    schema: 'privacy',
  },
  'my-plan': {
    title: 'My Plan | Innovators AI HUB',
    description: 'Your current plan and usage inside Innovators AI HUB.',
    noindex: true,
    h1: 'My Plan',
    body: [
      'This page shows the plan attached to your account, the agents included and current usage. It is visible only to signed-in customers, so it is excluded from search engines.',
    ],
    schema: 'none',
  },
};

/** Site-level entities, kept on every route. */
const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Innovators AI HUB',
  url: SITE,
  logo: `${SITE}/ai-logos.png`,
  email: 'Sagarmasand9@gmail.com',
  telephone: '+91-98108-75683',
  sameAs: [
    'https://www.instagram.com/innovatorsaihub',
    'https://www.linkedin.com/company/108385521/',
  ],
};

const BREADCRUMB = (route, name) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE}/${route}` },
  ],
});

function routeSchema(key, meta) {
  const url = `${SITE}/${key}`;
  const type = meta.schema ?? 'service';
  if (type === 'none') return [];

  if (type === 'pricing') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'AI Agent — Standard plan',
        description:
          'One AI co-worker on one channel: WhatsApp AI Agent or LinkedIn AI Agent, including setup, integration and monthly review.',
        brand: { '@type': 'Brand', name: 'Innovators AI HUB' },
        offers: {
          '@type': 'Offer',
          price: '999',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'AI Agent — Pro plan',
        description:
          'Multiple agents or channels working together, with agreed volume, integrations and reporting depth.',
        brand: { '@type': 'Brand', name: 'Innovators AI HUB' },
        offers: {
          '@type': 'Offer',
          price: '14999',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url,
        },
      },
      BREADCRUMB(key, meta.h1),
    ];
  }

  if (type === 'contact') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: meta.title,
        url,
        mainEntity: ORG,
      },
      BREADCRUMB(key, meta.h1),
    ];
  }

  if (type === 'register') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'AI for Business',
        description:
          'A working session for founders and operators: live AI agent demonstrations, hands-on workshops and networking.',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Ofis Square',
          address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressCountry: 'IN' },
        },
        organizer: ORG,
        url,
      },
      BREADCRUMB(key, meta.h1),
    ];
  }

  if (type === 'portfolio') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: meta.title,
        url,
        about: 'AI agent systems and AI brand films built by Innovators AI HUB',
      },
      BREADCRUMB(key, meta.h1),
    ];
  }

  if (type === 'privacy' || type === 'join') {
    return [{ '@context': 'https://schema.org', '@type': 'WebPage', name: meta.title, url }, BREADCRUMB(key, meta.h1)];
  }

  if (type === 'services') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'AI co-worker agents available to rent',
        itemListElement: [
          ['WhatsApp AI Agent', `${SITE}/whatsapp-ai-agent`],
          ['LinkedIn AI Agent', `${SITE}/linkedin-ai-agent`],
          ['Voice Calling AI Agent', `${SITE}/services`],
          ['Custom Agent Team', `${SITE}/services`],
        ].map(([name, item], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name,
          url: item,
        })),
      },
      BREADCRUMB(key, meta.h1),
    ];
  }

  // default: a Service entity for the two agent pages and anything else
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: meta.h1,
      serviceType: meta.h1,
      description: meta.description,
      url,
      provider: {
        '@type': 'Organization',
        name: 'Innovators AI HUB',
        url: SITE,
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Place', name: 'Worldwide (remote)' },
      ],
    },
    BREADCRUMB(key, meta.h1),
  ];
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement, label, route) {
  if (!pattern.test(html)) {
    throw new Error(`route-shells: ${label} not found in dist/index.html (route "${route}")`);
  }
  return html.replace(pattern, replacement);
}

const ldBlock = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n    </script>`;

/** Drop the shared FAQPage block; it is re-added only where an FAQ is rendered. */
function dropFaqSchema(html) {
  return html.replace(
    /[ \t]*<script type="application\/ld\+json">\s*\{\s*"@context"[\s\S]*?"@type":\s*"FAQPage"[\s\S]*?<\/script>/,
    '',
  );
}

const PRERENDER_STYLE = `<style id="seo-prerender-style">
      #root > .seo-static{max-width:820px;margin:0 auto;padding:96px 20px 48px;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;color:#18181b;line-height:1.65}
      #root > .seo-static h1{font-size:clamp(26px,4vw,40px);line-height:1.2;font-weight:800;margin:0 0 18px;letter-spacing:-.02em}
      #root > .seo-static p{margin:0 0 14px;font-size:16px}
    </style>`;

function injectContent(html, meta, key) {
  const paragraphs = meta.body.map((p) => `        <p>${p}</p>`).join('\n');
  const block = `<div id="root"><div class="seo-static">
        <h1>${meta.h1}</h1>
${paragraphs}
        <p><a href="${SITE}/services">Rent an AI co-worker agent</a> · <a href="${SITE}/pricing">See pricing</a> · <a href="${SITE}/contact">Contact us</a></p>
      </div></div>`;
  let out = replaceOnce(html, /<div id="root"><\/div>/, block, '#root placeholder', key || 'home');
  out = replaceOnce(out, /<\/head>/, `${PRERENDER_STYLE}\n  </head>`, '</head>', key || 'home');
  return out;
}

/** Pull the homepage FAQ out of the built template, then remove it from every shell. */
const rawTemplate = readFileSync(join(DIST, 'index.html'), 'utf8');
const FAQ = (() => {
  const blocks = [...rawTemplate.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, body] of blocks) {
    try {
      const parsed = JSON.parse(body);
      if (parsed && parsed['@type'] === 'FAQPage') return parsed;
    } catch {
      /* ignore unparsable block */
    }
  }
  throw new Error('route-shells: no FAQPage block found in dist/index.html');
})();
const template = dropFaqSchema(rawTemplate);
const written = [];

for (const [key, meta] of Object.entries(ROUTES)) {
  const route = key;
  const url = route ? `${SITE}/${route}` : `${SITE}/`;
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const image = SITE + (meta.image ?? DEFAULT_IMAGE);

  let html = template;
  const set = (pattern, replacement, label) =>
    (html = replaceOnce(html, pattern, replacement, label, route || 'home'));

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

  if (meta.noindex) {
    set(
      /<meta name="robots" content="[^"]*">/,
      '<meta name="robots" content="noindex, follow">',
      'robots',
    );
  }

  // Structured data: site entities + this route's own entity.
  const blocks = [ORG, ...(meta.faq ? [FAQ] : []), ...routeSchema(route, meta)];
  html = replaceOnce(
    html,
    /<\/head>/,
    `${blocks.map((b) => `    ${ldBlock(b)}`).join('\n')}\n  </head>`,
    'schema injection',
    route || 'home',
  );

  html = injectContent(html, meta, route);

  if (route === '') {
    writeFileSync(join(DIST, 'index.html'), html);
    written.push('/');
  } else {
    mkdirSync(join(DIST, route), { recursive: true });
    writeFileSync(join(DIST, route, 'index.html'), html);
    written.push(`/${route}`);
  }
}

// Real 404: Vercel serves dist/404.html with a 404 status because vercel.json has
// no catch-all rewrite. Unknown paths stop being served as thin homepage copies.
const notFound = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page not found | Innovators AI HUB</title>
  <meta name="description" content="That page does not exist. Browse AI agent services, pricing or contact Innovators AI HUB.">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${SITE}/">
  <link rel="icon" type="image/png" href="/ai-logos.png">
  <style>
    body{margin:0;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;color:#18181b;background:#fff}
    main{max-width:640px;margin:0 auto;padding:96px 20px}
    h1{font-size:clamp(26px,4vw,38px);line-height:1.2;margin:0 0 12px;letter-spacing:-.02em}
    p{color:#52525b;line-height:1.65;margin:0 0 14px}
    a{color:#25C667;font-weight:600}
    ul{padding-left:18px;line-height:1.9}
  </style>
</head>
<body>
  <main>
    <h1>This page does not exist</h1>
    <p>The link may be old, mistyped, or the page may have moved. These are the pages people usually want:</p>
    <ul>
      <li><a href="/">AI agent teams — home</a></li>
      <li><a href="/services">Rent an AI co-worker agent</a></li>
      <li><a href="/whatsapp-ai-agent">WhatsApp AI Agent</a></li>
      <li><a href="/linkedin-ai-agent">LinkedIn AI Agent</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/contact">Contact us</a></li>
    </ul>
    <p>Or message us on WhatsApp: <a href="https://wa.me/919810875683">+91 98108 75683</a>.</p>
  </main>
</body>
</html>
`;
writeFileSync(join(DIST, '404.html'), notFound);

console.log(`route-shells: wrote ${written.length} shells -> ${written.join(', ')}, plus /404.html`);
