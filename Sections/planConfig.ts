/* ------------------------------------------------------------------ *
 * Plan catalogue — the single source of truth for the /my-plan page.
 *
 * COMMERCIAL VALUES LIVE HERE AND NOWHERE ELSE.
 * saga set these on 2026-10-16:
 *   • Monthly plan list price      ₹5,000 / month
 *   • 3-month plan                 ₹5,000 / month, billed for 3 months
 *   • Pro plan                     ₹14,999 / month (unchanged)
 *   • Welcome balance              ₹2,000 credited to every new account
 *   • "+₹2,000 OFF" launch offer   post about Innovators AI Hub, tag
 *                                  @innovatorsaihub, upload a screenshot
 *
 * The monthly launch price is pinned at ₹999: ₹5,000 list, less the ₹2,000
 * welcome balance, less the ₹2,000 offer. The two discounts come to ₹4,000, so
 * the raw remainder is ₹1,000 — the pinned figure is what saga quotes to
 * customers, and it is the number that must never drift.
 * ------------------------------------------------------------------ */

export type PlanId = 'monthly' | 'quarterly' | 'pro';

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** price per month, in INR */
  monthly: number;
  /** how many months the plan is billed for */
  months: number;
  credits: string;
  /** visually highlighted card */
  featured?: boolean;
};

export const PLAN_CONFIG = {
  currency: '₹',
  /** Credited to every new account; shown on every plan card. */
  welcomeBalance: 2000,
  /** The "+₹2,000 OFF" post-and-tag launch offer. */
  launchOffer: 2000,
  /** Pinned launch price for the monthly plan once the offer is claimed. */
  monthlyLaunchPayable: 999,
  socialHandle: '@innovatorsaihub',
  socialPlatforms: 'Instagram, LinkedIn or X',
  /** UPI QR shown on the payment step. */
  paymentQr: '/payment-qr.jpg',
  /** The welcome balance is spent once, on the first upgrade. */
  balanceNote: 'One-time welcome bonus — used on your first upgrade',
  balanceUsedNote: 'Already used on your first upgrade. Add balance to top up.',
  /** Script the customer reads on camera before posting the offer video. */
  videoScript: `Hey, everyone
i found India ka apna AI Agentic platform, Innovators ai Hub, ye ek Ai innovators ki community h inka chhota sa sapna h, inhe india ki technology industry me kaam krke india ko grow krna, maine Innovators AI HUB pr apne business growth ke liye Multiple AI Agents ki team rent pr li h 3000/- month, AI Agents are doing good job, i m feeling happy it reduced so much stress from my work time. keep building & growing team, we are with you.`,
  plans: [
    {
      id: 'monthly',
      name: 'Monthly',
      tagline: 'Pay as you go. Cancel any time.',
      monthly: 5000,
      months: 1,
      credits: 'No credits required / month',
    },
    {
      id: 'quarterly',
      name: '3 Months',
      tagline: 'Three months at the same monthly rate.',
      monthly: 5000,
      months: 3,
      credits: 'No credits required / month',
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Built for serious creators and brands.',
      monthly: 14999,
      months: 1,
      credits: 'No credits required / month',
      featured: true,
    },
  ] as Plan[],
} as const;

export const planById = (id: PlanId): Plan =>
  PLAN_CONFIG.plans.find((plan) => plan.id === id) || PLAN_CONFIG.plans[0];

export const formatINR = (amount: number): string =>
  `${PLAN_CONFIG.currency}${Math.round(amount).toLocaleString('en-IN')}`;

export type Quote = {
  /** ₹5,000 × months, before any discount */
  listTotal: number;
  /** welcome balance actually applied */
  balance: number;
  /** launch offer actually applied (0 when it has not been claimed) */
  offer: number;
  /** what the user pays */
  payable: number;
};

export type QuoteOptions = {
  /** the "+₹2,000 OFF" launch offer has been claimed */
  offerApplied: boolean;
  /** the account still has its one-time welcome balance */
  balanceAvailable: boolean;
};

/**
 * Prices a plan. The welcome balance applies once per account; the launch offer
 * only once the user has claimed it by posting the video and uploading a shot.
 */
export const quotePlan = (plan: Plan, opts: QuoteOptions): Quote => {
  const listTotal = plan.monthly * plan.months;
  const balance = opts.balanceAvailable ? Math.min(PLAN_CONFIG.welcomeBalance, listTotal) : 0;
  const offer = opts.offerApplied ? Math.min(PLAN_CONFIG.launchOffer, listTotal - balance) : 0;
  const raw = listTotal - balance - offer;
  const payable =
    plan.id === 'monthly' && opts.offerApplied && opts.balanceAvailable
      ? PLAN_CONFIG.monthlyLaunchPayable
      : raw;
  return { listTotal, balance, offer, payable };
};

/** "₹5,000/month" or "₹15,000 for 3 months" */
export const planPriceLabel = (plan: Plan): string =>
  plan.months === 1
    ? `${formatINR(plan.monthly)}/month`
    : `${formatINR(plan.monthly)}/month · ${formatINR(plan.monthly * plan.months)} for ${plan.months} months`;


/* ------------------------------------------------------------------ *
 * LinkedIn AI Agent subscription — moved here 2026-10-23.
 *
 * saga's instruction: on /my-plan there are now two plan groups, "AI Team
 * Plan" (the plans above) and "LinkedIn AI Agent Plan", whose plans are the
 * ones from the LinkedIn AI Agent app's "Subscribe now" page (payment.html on
 * the app at innovatorslinai.duckdns.org). The page was ported, not embedded,
 * so these numbers are the app's numbers and stay the source of truth here.
 *
 * The app keeps its own copy for the in-app page; if a price changes, change
 * it in both places (the app's copy lives in payment.html, `basePlans`).
 *
 * INR is the source of truth. USD is derived at a fixed rate, exactly as the
 * app did, so the two always agree.
 * ------------------------------------------------------------------ */

export type LinkedInPlanId = 'growth' | 'scale' | 'pro-annual';

export type LinkedInPlan = {
  id: LinkedInPlanId;
  name: string;
  /** e.g. "90 Days + 10 Days" — the bonus days are part of the offer */
  duration: string;
  /** billed months, used for the coupon's per-month split */
  months: number;
  /** INR per 30 days */
  rate: number;
  /** INR for the whole term */
  total: number;
  /** INR per 30 days before the discount */
  originalRate: number;
  /** INR for the whole term before the discount */
  originalTotal: number;
  /** INR saved over the term */
  save: number;
  /** percent off, as advertised */
  savePerc: number;
  badge?: string;
  featured?: boolean;
  features: string[];
};

export const LINKEDIN_PLAN_CONFIG = {
  /** USD is derived from INR at this fixed rate — the app used the same one. */
  inrPerUsd: 83,
  /** The one coupon the app honoured, kept at the same real value. */
  couponCode: 'AIAGENT',
  couponOffInr: 830,
  paymentQr: '/payment-qr.jpg',
  whatsappConfirm:
    'https://wa.me/919873641909?text=I%20have%20made%20the%20payment.%20Here%20is%20the%20screenshot.',
  /** Where the customer links their LinkedIn account once the plan is active. */
  dashboardUrl: 'https://innovatorslinai.duckdns.org/dashboard.html',
  plans: [
    {
      id: 'growth',
      name: 'Growth',
      duration: '90 Days + 10 Days',
      months: 3,
      rate: 9000,
      total: 27000,
      originalRate: 12600,
      originalTotal: 37800,
      save: 10800,
      savePerc: 40,
      features: [
        '1 LinkedIn Account',
        '1,000 AI Messages / month',
        'Smart Lead Search',
        'Post Auto-Reactions',
        'Priority Email Support',
      ],
    },
    {
      id: 'scale',
      name: 'Scale',
      duration: '180 Days + 20 Days',
      months: 6,
      rate: 8100,
      total: 48600,
      originalRate: 12600,
      originalTotal: 75600,
      save: 27000,
      savePerc: 50,
      badge: 'Most Popular',
      featured: true,
      features: [
        '1 LinkedIn Account',
        '2,500 AI Messages / month',
        'Smart Lead Search & Filter',
        'Post Auto-Reactions',
        'Multi-Account Running',
        '24/7 Priority Support',
      ],
    },
    {
      id: 'pro-annual',
      name: 'Pro Annual',
      duration: '360 Days + 30 Days',
      months: 12,
      rate: 7200,
      total: 86400,
      originalRate: 12600,
      originalTotal: 151200,
      save: 64800,
      savePerc: 60,
      badge: 'Best Value',
      features: [
        '1 LinkedIn Account',
        'Unlimited AI Messages',
        'Advanced Smart Lead Gen',
        'Post Auto-Reactions',
        'WhatsApp numbers & email IDs',
        'Unlimited broadcast marketing messages',
        'Personalised messaging — reads each lead’s profile and writes what suits them',
        'AI-generated high-quality post images',
        '7-day delivery',
        'Every reply exported to your CSV',
        'Your full connections list as CSV',
        'Dedicated Manager',
        'WhatsApp Priority Team',
      ],
    },
  ] as LinkedInPlan[],
} as const;

export type Currency = 'INR' | 'USD';

export const linkedinPlanById = (id: LinkedInPlanId): LinkedInPlan =>
  LINKEDIN_PLAN_CONFIG.plans.find((plan) => plan.id === id) || LINKEDIN_PLAN_CONFIG.plans[0];

/** ₹27,000 or $325 — the same amount, rendered in the chosen currency. */
export const formatAmount = (inr: number, currency: Currency): string =>
  currency === 'USD'
    ? `$${Math.round(inr / LINKEDIN_PLAN_CONFIG.inrPerUsd).toLocaleString('en-US')}`
    : `${PLAN_CONFIG.currency}${Math.round(inr).toLocaleString('en-IN')}`;
