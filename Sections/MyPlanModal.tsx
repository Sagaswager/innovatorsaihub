import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Crown, Zap } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Task 10 — "My Plan" subscription modal
 *
 * COMMERCIAL VALUES LIVE HERE AND NOWHERE ELSE.
 * The brief flagged that the reference screenshot's prices and credits are
 * placeholders and must be confirmed before any billing change. Standard is the
 * live, verified price; Pro comes from the reference screenshot and is still
 * awaiting saga's confirmation. There is no billing backend on the site today —
 * the action buttons hand off to the existing rent/signup flow and never charge.
 * ------------------------------------------------------------------ */
export const PLAN_CONFIG = {
  currency: '₹',
  annualDiscountPct: 25,
  standard: {
    name: 'Standard',
    tagline: 'Perfect for first-time builders',
    monthly: 999,
    credits: 'No credits required / month',
  },
  pro: {
    name: 'Pro',
    tagline: 'Built for serious creators and brands',
    monthly: 14999,
    credits: 'No credits required / month',
  },
} as const;

export type PlanId = 'standard' | 'pro';
export type BillingCycle = 'monthly' | 'annual';

interface MyPlanModalProps {
  onClose: () => void;
  /** Hand-off into the existing subscription/rent flow — no payment is taken here. */
  onUpgrade: (plan: PlanId, billing: BillingCycle) => void;
  /** Known plan for the signed-in account, when there is one. */
  currentPlan?: PlanId | null;
}

const formatPrice = (monthly: number, billing: BillingCycle) => {
  if (billing === 'annual') {
    const discounted = Math.round(monthly * (1 - PLAN_CONFIG.annualDiscountPct / 100));
    return { amount: discounted, suffix: '/month, billed annually' };
  }
  return { amount: monthly, suffix: '/month' };
};

const MyPlanModal: React.FC<MyPlanModalProps> = ({ onClose, onUpgrade, currentPlan }) => {
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const cards: Array<{ id: PlanId; icon: React.ReactNode; featured?: boolean }> = [
    { id: 'standard', icon: <Zap size={16} className="text-zinc-900" /> },
    { id: 'pro', icon: <Crown size={16} className="text-amber-700" />, featured: true },
  ];

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 md:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-label="Choose your plan"
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[32px] shadow-2xl"
        style={{
          background:
            'radial-gradient(120% 80% at 15% 0%, #eef6ff 0%, #dbeafe 35%, #c7d2fe 70%, #b8c6fb 100%)',
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-700 flex items-center justify-center shadow-sm transition-all outline-none z-10"
        >
          <X size={17} />
        </button>

        <div className="px-5 py-8 md:px-10 md:py-10">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">
            Choose your plan
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">
            Pick a plan that best suits you. Upgrade or downgrade at any time.
          </p>

          {/* Billing toggle + promo */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 md:mt-8">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/70 border border-white shadow-sm">
              {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBilling(cycle)}
                  className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all outline-none ${
                    billing === cycle ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cycle === 'monthly' ? 'Monthly' : 'Annually'}
                </button>
              ))}
              <span className="ml-1 mr-2 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold whitespace-nowrap">
                Save {PLAN_CONFIG.annualDiscountPct}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => onUpgrade('standard', billing)}
              className="text-xs md:text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900 outline-none"
            >
              Have a promo code?
            </button>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-6">
            {cards.map(({ id, icon, featured }) => {
              const plan = PLAN_CONFIG[id];
              const price = formatPrice(plan.monthly, billing);
              const isCurrent = currentPlan === id;
              return (
                <div
                  key={id}
                  className={`relative rounded-[28px] p-5 md:p-6 border shadow-sm ${
                    featured
                      ? 'border-amber-200'
                      : 'border-white/80 bg-white/85'
                  }`}
                  style={
                    featured
                      ? { background: 'linear-gradient(150deg, #fff7ed 0%, #ffe4c7 45%, #ffd0a8 100%)' }
                      : undefined
                  }
                >
                  {isCurrent && (
                    <span className="absolute -top-2 left-5 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider">
                      Current plan
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                      {icon}
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-slate-900">{plan.name}</h3>
                  </div>

                  <p className="text-[11px] md:text-xs text-slate-600 font-medium mb-4">{plan.tagline}</p>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-2xl md:text-3xl font-black text-slate-900">
                      {PLAN_CONFIG.currency}
                      {price.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] md:text-xs text-slate-600 font-semibold">{price.suffix}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-slate-700 mb-5">
                    <Check size={13} className="text-emerald-600" />
                    <span>{plan.credits}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpgrade(id, billing)}
                    className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs md:text-sm font-bold transition-all active:scale-[0.98] outline-none"
                  >
                    {id === 'pro' ? 'Upgrade to Pro' : 'Upgrade'}
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] md:text-[11px] text-slate-600 mt-5 leading-relaxed">
            Plans are billed in INR. Annual billing saves {PLAN_CONFIG.annualDiscountPct}%. You can upgrade or
            downgrade at any time. Need help choosing? Book a demo and we will map it to your workflow.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MyPlanModal;
