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

/**
 * Prices a plan. The welcome balance always applies; the launch offer only once
 * the user has claimed it by posting and uploading a screenshot.
 */
export const quotePlan = (plan: Plan, offerApplied: boolean): Quote => {
  const listTotal = plan.monthly * plan.months;
  const balance = Math.min(PLAN_CONFIG.welcomeBalance, listTotal);
  const offer = offerApplied ? Math.min(PLAN_CONFIG.launchOffer, listTotal - balance) : 0;
  const raw = listTotal - balance - offer;
  const payable =
    plan.id === 'monthly' && offerApplied ? PLAN_CONFIG.monthlyLaunchPayable : raw;
  return { listTotal, balance, offer, payable };
};

/** "₹5,000/month" or "₹15,000 for 3 months" */
export const planPriceLabel = (plan: Plan): string =>
  plan.months === 1
    ? `${formatINR(plan.monthly)}/month`
    : `${formatINR(plan.monthly)}/month · ${formatINR(plan.monthly * plan.months)} for ${plan.months} months`;
