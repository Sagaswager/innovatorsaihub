import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  MessageCircle,
  QrCode,
  Upload,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import {
  LINKEDIN_PLAN_CONFIG,
  PLAN_CONFIG,
  formatAmount,
  formatINR,
  linkedinPlanById,
  planById,
  quotePlan,
  type Currency,
  type LinkedInPlan,
  type LinkedInPlanId,
  type PlanId,
} from './planConfig';
import {
  normalizeEmail,
  isValidEmail,
  registerAccount,
  submitOfferProof,
  fetchBalance,
} from '../authApi';

/* ------------------------------------------------------------------ *
 * "My Plan" — a standalone page (saga, 2026-10-16).
 *
 * White, self-contained layout: no site header, no site footer, no floating
 * buttons, no navigation into the rest of the site. It owns its own UI.
 *
 *   plans  — pick a plan; "+₹2,000 OFF" sits inside each card
 *   offer  — read the script, record the video, post it, tag
 *            @innovatorsaihub, upload a screenshot
 *   pay    — scan the UPI QR for the payable amount
 *
 * Two plan groups (saga, 2026-10-23), switched with the pills at the top:
 *   AI Team Plan          — the plans above, with the balance + offer
 *   LinkedIn AI Agent Plan — the LinkedIn AI Agent app's "Subscribe now" page,
 *                            ported (not embedded) and restyled to this page:
 *                            Growth / Scale / Pro Annual, USD-INR toggle,
 *                            coupon AIAGENT, UPI QR, confirm-with-team.
 *                            Payment is recorded and the team activates the
 *                            subscription; linking LinkedIn stays in the app.
 *
 * The welcome balance is one-time per account: ₹2,000 until the first upgrade,
 * ₹0 afterwards until the customer tops up.
 * ------------------------------------------------------------------ */

type Step = 'plans' | 'offer' | 'pay' | 'done';

interface MyPlanPageProps {
  navigateTo?: (page: string) => void;
}

const MAX_SCREENSHOT_BYTES = 6 * 1024 * 1024;

const readSession = (): { name: string; email: string } => {
  try {
    const raw = localStorage.getItem('platform_user');
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      name: String((parsed && parsed.name) || ''),
      email: normalizeEmail((parsed && parsed.email) || ''),
    };
  } catch {
    return { name: '', email: '' };
  }
};

const MyPlanPage: React.FC<MyPlanPageProps> = ({ navigateTo }) => {
  const session = useMemo(readSession, []);
  const [step, setStep] = useState<Step>('plans');
  const [offerApplied, setOfferApplied] = useState(false);
  const [selectedId, setSelectedId] = useState<PlanId>('monthly');
  const [email, setEmail] = useState(session.email);
  const [name, setName] = useState(session.name);
  const [balance, setBalance] = useState(PLAN_CONFIG.welcomeBalance);
  const [balanceUsed, setBalanceUsed] = useState(false);
  const [screenshot, setScreenshot] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [proofUrl, setProofUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  /* ---- LinkedIn AI Agent Plan (the app's subscribe page, ported) ---- */
  const [track, setTrack] = useState<'team' | 'linkedin'>('team');
  const [liPlanId, setLiPlanId] = useState<LinkedInPlanId>('growth');
  const [liCurrency, setLiCurrency] = useState<Currency>('INR');
  const [liCoupon, setLiCoupon] = useState('');
  const [liCouponApplied, setLiCouponApplied] = useState(false);
  const [liActivated, setLiActivated] = useState(false);
  const [liDone, setLiDone] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const balanceAvailable = balance > 0 && !balanceUsed;
  const selected = planById(selectedId);
  const quote = quotePlan(selected, { offerApplied, balanceAvailable });
  const plainQuote = quotePlan(selected, { offerApplied: false, balanceAvailable });
  const withOfferQuote = quotePlan(selected, { offerApplied: true, balanceAvailable });

  const liPlan = linkedinPlanById(liPlanId);
  const liRate = liCouponApplied
    ? liPlan.rate - Math.round(LINKEDIN_PLAN_CONFIG.couponOffInr / liPlan.months)
    : liPlan.rate;
  const liTotal = liCouponApplied ? liPlan.total - LINKEDIN_PLAN_CONFIG.couponOffInr : liPlan.total;
  const liStruckTotal = liCouponApplied ? liPlan.total : liPlan.originalTotal;

  /* The agent dashboard is a separate app with its own sign-in (name, WhatsApp
   * number, LinkedIn email). Deep-link the right tab and hand it the email and
   * name so the customer does not retype them. */
  const agentSignupUrl = `${LINKEDIN_PLAN_CONFIG.dashboardUrl}?tab=signup${
    email ? `&email=${encodeURIComponent(email)}` : ''
  }${name ? `&name=${encodeURIComponent(name)}` : ''}`;
  const agentLoginUrl = `${LINKEDIN_PLAN_CONFIG.dashboardUrl}?tab=login${
    email ? `&email=${encodeURIComponent(email)}` : ''
  }`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, track, liDone]);

  const refreshBalance = async (address: string) => {
    const clean = normalizeEmail(address);
    if (!isValidEmail(clean)) return;
    const result = await fetchBalance(clean);
    if (!result.ok) return;
    setBalance(result.balance);
    setBalanceUsed(result.used);
    if (result.used) setOfferApplied(false);
  };

  useEffect(() => {
    if (session.email) void refreshBalance(session.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickFile = (file: File | null) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image (screenshot) of your post.');
      return;
    }
    if (file.size > MAX_SCREENSHOT_BYTES) {
      setError('That image is larger than 6 MB. Please upload a smaller screenshot.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshot(String(reader.result || ''));
      setScreenshotName(file.name);
    };
    reader.onerror = () => setError('Could not read that image. Please try another one.');
    reader.readAsDataURL(file);
  };

  const copyScript = async () => {
    const text = PLAN_CONFIG.videoScript;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('no clipboard api');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      return;
    } catch {
      // fall back to a hidden textarea + execCommand
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        setError('Could not copy automatically — select the script and copy it manually.');
      }
    }
  };

  const submitProof = async () => {
    setError('');
    if (!screenshot) {
      setError('Upload a screenshot of your post to claim the offer.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address so we can match your post to your account.');
      return;
    }
    setBusy(true);
    const result = await submitOfferProof({
      email,
      name,
      plan: selected.name,
      payable: quote.payable,
      screenshot,
      filename: screenshotName || 'offer-proof.png',
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.message || 'Could not upload the screenshot.');
      return;
    }
    setProofUrl(result.url || '');
    setOfferApplied(true);
    setStep('pay');
  };

  const confirmPayment = async () => {
    setError('');
    setBusy(true);
    await registerAccount({
      name,
      email,
      source: 'plan-upgrade',
      agent: selected.name,
      price: String(quote.payable),
      notes: `Plan upgrade started · offer: ${offerApplied ? '₹2,000 OFF claimed' : 'no offer'} · proof: ${proofUrl || 'none'}`,
    });
    setBusy(false);
    setBalance(0);
    setBalanceUsed(true);
    setStep('done');
  };

  const applyCoupon = () => {
    setError('');
    if (liCoupon.trim().toUpperCase() !== LINKEDIN_PLAN_CONFIG.couponCode) {
      setLiCouponApplied(false);
      setError('That coupon code is not valid.');
      return;
    }
    setLiCouponApplied(true);
  };

  const confirmLinkedInPayment = async () => {
    setError('');
    if (!isValidEmail(email)) {
      setError('Enter the email address on your LinkedIn AI Agent account so we can match the payment.');
      return;
    }
    setBusy(true);
    await registerAccount({
      name,
      email,
      source: 'linkedin-plan-upgrade',
      agent: 'LinkedIn AI Agent',
      price: String(liTotal),
      notes: `LinkedIn AI Agent plan · ${liPlan.name} (${liPlan.duration}) · ${formatAmount(
        liTotal,
        liCurrency
      )}${liCouponApplied ? ` · coupon ${LINKEDIN_PLAN_CONFIG.couponCode}` : ''}`,
    });
    setBusy(false);
    setLiDone(true);
  };

  const linkedInCard = (plan: LinkedInPlan) => {
    const active = plan.id === liPlanId;
    return (
      <div
        key={plan.id}
        className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg ${
          active ? 'border-slate-900 ring-1 ring-slate-900' : plan.featured ? 'border-amber-300' : 'border-slate-200'
        }`}
      >
        {plan.badge && (
          <span className="absolute -top-3 right-6 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {plan.badge}
          </span>
        )}

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
            <p className="mt-1 text-xs font-medium text-slate-500">{plan.duration}</p>
          </div>
          {active && (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
              <Check size={13} />
            </span>
          )}
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight text-slate-900">
            {formatAmount(plan.rate, liCurrency)}
          </span>
          <span className="text-xs font-semibold text-slate-500">/30 days</span>
          <span className="text-xs font-semibold text-slate-300 line-through">
            {formatAmount(plan.originalRate, liCurrency)}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          Total {formatAmount(plan.total, liCurrency)}
        </p>
        <span className="mt-3 inline-flex w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          Save {formatAmount(plan.save, liCurrency)} ({plan.savePerc}% off)
        </span>

        <ul className="mt-5 flex-1 space-y-2 border-t border-slate-100 pt-5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs font-medium text-slate-600">
              <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
              {feature}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            setLiPlanId(plan.id);
            setError('');
            setLiDone(false);
            if (checkoutRef.current) checkoutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-bold transition-all active:scale-[0.98] ${
            active
              ? 'bg-slate-900 text-white'
              : 'border border-slate-300 bg-white text-slate-800 hover:border-slate-400'
          }`}
        >
          {active ? 'Selected' : 'Choose plan'}
        </button>
      </div>
    );
  };

  const cardFor = (planId: PlanId) => {
    const plan = planById(planId);
    const q = quotePlan(plan, { offerApplied, balanceAvailable });
    const without = quotePlan(plan, { offerApplied: false, balanceAvailable });
    return (
      <div
        key={planId}
        className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg ${
          plan.featured ? 'border-amber-300' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
          {plan.featured && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Best value
            </span>
          )}
        </div>
        <p className="mt-1 text-xs font-medium text-slate-500">{plan.tagline}</p>

        <div className="mt-5 flex items-baseline gap-1.5">
          <span className="text-3xl font-black tracking-tight text-slate-900">
            {formatINR(plan.monthly)}
          </span>
          <span className="text-xs font-semibold text-slate-500">/month</span>
        </div>
        {plan.months > 1 && (
          <p className="mt-1 text-[11px] font-semibold text-slate-500">
            {formatINR(plan.monthly * plan.months)} billed for {plan.months} months
          </p>
        )}

        <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-4">
          {balanceAvailable && (
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Welcome balance</span>
              <span className="font-bold text-emerald-600">−{formatINR(q.balance)}</span>
            </div>
          )}
          {offerApplied && (
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Post &amp; tag offer</span>
              <span className="font-bold text-emerald-600">−{formatINR(q.offer)}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-slate-200 pt-2">
            <span className="text-xs font-bold text-slate-800">You pay</span>
            <span className="text-xl font-black text-slate-900">{formatINR(q.payable)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {offerApplied ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 py-3 text-xs font-bold text-emerald-700">
              <Check size={15} />
              {formatINR(PLAN_CONFIG.launchOffer)} OFF applied
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSelectedId(planId);
                setError('');
                setStep('offer');
              }}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3.5 text-sm font-black text-slate-900 shadow-md shadow-amber-500/30 transition-all hover:from-amber-300 hover:to-amber-400 active:scale-[0.98]"
            >
              Apply {formatINR(PLAN_CONFIG.launchOffer)} OFF
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setSelectedId(planId);
              setError('');
              setStep('pay');
            }}
            className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            {offerApplied
              ? `Continue to payment · ${formatINR(q.payable)}`
              : `Upgrade · ${formatINR(without.payable)}`}
          </button>

          {!offerApplied && (
            <p className="text-center text-[11px] font-medium text-slate-400">
              Skip the offer and pay {formatINR(without.payable)} — no video needed
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12">
        {/* top row: exit on the left, focused balance on the right */}
        <div className="flex items-start justify-between gap-6">
          <button
            type="button"
            aria-label="Back"
            onClick={() => {
              if (track === 'linkedin' && liDone) {
                setError('');
                setLiDone(false);
                return;
              }
              if (step === 'plans') {
                navigateTo && navigateTo('platform');
              } else {
                setError('');
                setStep(step === 'pay' ? (offerApplied ? 'offer' : 'plans') : 'plans');
              }
            }}
            className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
          >
            <ArrowLeft size={16} />
          </button>

          {track === 'team' && (
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Available balance
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span
                className={`text-3xl font-black tracking-tight md:text-4xl ${
                  balanceAvailable ? 'text-slate-900' : 'text-slate-300'
                }`}
              >
                {formatINR(balance)}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              {balanceAvailable ? PLAN_CONFIG.balanceNote : PLAN_CONFIG.balanceUsedNote}
            </span>
          </div>
          )}
        </div>

        {/* ---------------- the two plan groups ---------------- */}
        <div className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {([
            ['team', 'AI Team Plan'],
            ['linkedin', 'LinkedIn AI Agent Plan'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTrack(key);
                setError('');
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors md:text-sm ${
                track === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ---------------- step: plans ---------------- */}
        {track === 'team' && step === 'plans' && (
          <>
            <div className="mt-8 max-w-2xl md:mt-10">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Choose your plan
              </h1>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Pick a plan that best suits you. Upgrade or downgrade at any time.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {cardFor('monthly')}
              {cardFor('quarterly')}
              {cardFor('pro')}
            </div>

            <p className="mt-6 text-[11px] leading-relaxed text-slate-400">
              Prices are in INR. Your {formatINR(PLAN_CONFIG.welcomeBalance)} welcome balance is a one-time
              bonus and is spent on your first upgrade. The {formatINR(PLAN_CONFIG.launchOffer)} post-and-tag
              offer is credited once our team verifies your video.
            </p>
          </>
        )}

        {/* ---------------- step: offer ---------------- */}
        {track === 'team' && step === 'offer' && (
          <div className="mt-8 max-w-3xl md:mt-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Claim {formatINR(PLAN_CONFIG.launchOffer)} OFF
            </h1>
            <p className="mt-3 text-sm font-medium text-slate-500">
              {selected.name} plan · you pay{' '}
              <span className="font-bold text-slate-900">{formatINR(withOfferQuote.payable)}</span> instead of{' '}
              {formatINR(withOfferQuote.listTotal)} once your video is verified.
            </p>

            <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Read this on camera
                </span>
                <button
                  type="button"
                  onClick={copyScript}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 transition-colors hover:border-slate-400"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy script'}
                </button>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-800">
                {PLAN_CONFIG.videoScript}
              </p>
            </div>

            <ol className="mt-7 space-y-3">
              {[
                'Record a short video reading the script above.',
                `Post it on ${PLAN_CONFIG.socialPlatforms} and tag ${PLAN_CONFIG.socialHandle}.`,
                'Upload a screenshot of the live post below.',
              ].map((line, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{line}</span>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex items-center gap-3 text-slate-400">
              <Instagram size={16} />
              <Linkedin size={16} />
              <Twitter size={16} />
              <span className="text-[11px] font-semibold">{PLAN_CONFIG.socialHandle}</span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Your name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Email
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={(event) => void refreshBalance(event.target.value)}
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
                />
              </label>
            </div>

            <div className="mt-5 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6 text-center">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  pickFile(event.target.files && event.target.files[0] ? event.target.files[0] : null)
                }
              />
              {screenshot ? (
                <div className="flex flex-col items-center gap-3">
                  <img src={screenshot} alt="Your post screenshot" className="max-h-52 rounded-2xl shadow-sm" />
                  <span className="text-[11px] font-medium text-slate-500">{screenshotName}</span>
                  <button
                    type="button"
                    onClick={() => fileRef.current && fileRef.current.click()}
                    className="text-[11px] font-bold text-slate-600 underline underline-offset-4"
                  >
                    Choose a different image
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <Upload size={15} />
                  Upload screenshot
                </button>
              )}
            </div>

            {error && <p className="mt-4 text-xs font-semibold text-red-600">{error}</p>}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={submitProof}
                disabled={busy}
                className="rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-60 active:scale-[0.98]"
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={15} className="animate-spin" /> Uploading…
                  </span>
                ) : (
                  'Upload & continue'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setOfferApplied(false);
                  setStep('pay');
                }}
                className="text-xs font-semibold text-slate-400 underline underline-offset-4 transition-colors hover:text-slate-600"
              >
                Skip the offer — pay {formatINR(plainQuote.payable)}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Our team verifies the video within 24 hours. If the post is not live, the offer is reversed and the
              full price applies.
            </p>
          </div>
        )}

        {/* ---------------- step: pay ---------------- */}
        {track === 'team' && step === 'pay' && (
          <div className="mt-8 grid grid-cols-1 items-start gap-10 md:mt-10 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Pay {formatINR(quote.payable)}
              </h1>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Scan the QR with any UPI app — GPay, PhonePe, Paytm — and pay{' '}
                <span className="font-bold text-slate-900">{formatINR(quote.payable)}</span>.
              </p>

              <div className="mt-6 space-y-2 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{selected.name} plan</span>
                  <span className="font-semibold text-slate-800">{formatINR(quote.listTotal)}</span>
                </div>
                {quote.balance > 0 && (
                  <div className="flex justify-between">
                    <span>Welcome balance</span>
                    <span className="font-semibold text-emerald-600">−{formatINR(quote.balance)}</span>
                  </div>
                )}
                {quote.offer > 0 && (
                  <div className="flex justify-between">
                    <span>Post &amp; tag offer</span>
                    <span className="font-semibold text-emerald-600">−{formatINR(quote.offer)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="font-bold text-slate-900">You pay</span>
                  <span className="font-black text-slate-900">{formatINR(quote.payable)}</span>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 text-[11px] text-slate-400">
                <QrCode size={14} className="mt-0.5 shrink-0" />
                <span>
                  Add your email in the UPI note if your app allows it — it makes matching your payment instant.
                  {proofUrl ? ' Your video screenshot is already with our team.' : ''}
                </span>
              </div>

              {error && <p className="mt-4 text-xs font-semibold text-red-600">{error}</p>}

              <button
                type="button"
                onClick={confirmPayment}
                disabled={busy}
                className="mt-6 rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-60 active:scale-[0.98]"
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={15} className="animate-spin" /> Saving…
                  </span>
                ) : (
                  "I've paid — activate my plan"
                )}
              </button>
            </div>

            <div className="flex flex-col items-center rounded-3xl border border-slate-200 p-6">
              <img
                src={PLAN_CONFIG.paymentQr}
                alt="UPI QR code to pay for your Innovators AI Hub plan"
                className="w-full max-w-[280px] rounded-2xl"
              />
              <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Scan &amp; pay {formatINR(quote.payable)}
              </span>
            </div>
          </div>
        )}

        {/* ---------------- step: done ---------------- */}
        {track === 'team' && step === 'done' && (
          <div className="mt-8 max-w-xl md:mt-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <Check size={22} className="text-emerald-600" />
            </span>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
              Thanks — we are on it
            </h1>
            <p className="mt-4 text-sm font-medium text-slate-500">
              We have your {selected.name} plan request and your payment confirmation. Our team verifies the payment
              and your video, then activates the plan — usually within 24 hours. We will email{' '}
              <span className="font-bold text-slate-800">{email}</span>.
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Your welcome balance has been used on this upgrade. You can add balance any time from your account.
            </p>
          </div>
        )}

        {/* ---------------- LinkedIn AI Agent Plan (ported from the app) ---------------- */}
        {track === 'linkedin' && !liDone && (
          <>
            <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0A66C2]">
                  <Linkedin size={12} /> LinkedIn AI Agent
                </span>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Select your subscription plan
                </h1>
                <p className="mt-3 text-sm font-medium text-slate-500">
                  Upgrade to premium to unlock advanced automated outreach and AI capabilities.
                </p>
              </div>

              <div className="inline-flex self-start rounded-full border border-slate-200 bg-slate-50 p-1 md:self-auto">
                {(['INR', 'USD'] as Currency[]).map((currency) => (
                  <button
                    key={currency}
                    type="button"
                    onClick={() => setLiCurrency(currency)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                      liCurrency === currency ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {currency === 'INR' ? 'INR (₹)' : 'USD ($)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {LINKEDIN_PLAN_CONFIG.plans.map((plan) => linkedInCard(plan))}
            </div>

            <p className="mt-6 text-[11px] leading-relaxed text-slate-400">
              {liCurrency === 'INR'
                ? 'Prices are in INR, billed per 30 days.'
                : `Prices are in USD at ${formatINR(LINKEDIN_PLAN_CONFIG.inrPerUsd)} to the dollar.`}{' '}
              One LinkedIn account per plan; the bonus days are included in the term. The subscription runs on your
              own LinkedIn account — nothing is posted or messaged without it.
            </p>

            <div ref={checkoutRef} className="mt-10 grid grid-cols-1 items-start gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">Confirm payment</h2>
                <p className="mt-3 text-sm font-medium text-slate-500">
                  Selected plan:{' '}
                  <span className="font-bold text-slate-800">
                    {liPlan.name} ({liPlan.duration})
                  </span>
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-slate-400 line-through">
                      {formatAmount(liStruckTotal, liCurrency)}
                    </span>
                    <span className="text-2xl font-black text-slate-900">{formatAmount(liTotal, liCurrency)}</span>
                    <span className="text-[11px] font-semibold text-slate-500">total</span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">
                    Rate {formatAmount(liRate, liCurrency)} / 30 days
                    {liCouponApplied ? ` · coupon ${LINKEDIN_PLAN_CONFIG.couponCode} applied` : ''}
                  </p>
                </div>

                <div className="mt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Coupon code
                  </span>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={liCoupon}
                      onChange={(event) => setLiCoupon(event.target.value.toUpperCase())}
                      placeholder="e.g. AIAGENT"
                      className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm uppercase text-slate-800 outline-none transition-colors focus:border-slate-400"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-2xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-800 transition-colors hover:border-slate-400"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Your name
                    </span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Full name"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Email on the agent account
                    </span>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-slate-400"
                    />
                  </label>
                </div>

                {error && <p className="mt-4 text-xs font-semibold text-red-600">{error}</p>}

                {liActivated ? (
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={confirmLinkedInPayment}
                      disabled={busy}
                      className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-60 active:scale-[0.98]"
                    >
                      {busy ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 size={15} className="animate-spin" /> Saving…
                        </span>
                      ) : (
                        'Payment done — activate my plan'
                      )}
                    </button>
                    <a
                      href={LINKEDIN_PLAN_CONFIG.whatsappConfirm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 py-3.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                      <MessageCircle size={15} /> Confirm with the team
                    </a>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setLiActivated(true);
                    }}
                    className="mt-6 w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
                  >
                    Activate now
                  </button>
                )}

                <p className="mt-3 text-[11px] text-slate-400">
                  Pay with any UPI app — GPay, PhonePe, Paytm. Add your email in the payment note if your app allows
                  it; it makes matching your payment instant.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-3xl border border-slate-200 p-6">
                {liActivated ? (
                  <>
                    <img
                      src={LINKEDIN_PLAN_CONFIG.paymentQr}
                      alt="UPI QR code to pay for your LinkedIn AI Agent plan"
                      className="w-full max-w-[280px] rounded-2xl"
                    />
                    <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Scan &amp; pay {formatAmount(liTotal, liCurrency)}
                    </span>
                  </>
                ) : (
                  <>
                    <QrCode size={40} className="text-slate-300" />
                    <span className="mt-4 max-w-[220px] text-center text-[11px] font-semibold text-slate-400">
                      Press Activate now to reveal the UPI QR for {formatAmount(liTotal, liCurrency)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* ---------------- LinkedIn AI Agent Plan: done ---------------- */}
        {track === 'linkedin' && liDone && (
          <div className="mt-8 max-w-xl md:mt-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <Check size={22} className="text-emerald-600" />
            </span>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900">Thanks — we are on it</h1>
            <p className="mt-4 text-sm font-medium text-slate-500">
              We have your <span className="font-bold text-slate-800">{liPlan.name}</span> LinkedIn AI Agent request (
              {formatAmount(liTotal, liCurrency)}) and your payment confirmation for{' '}
              <span className="font-bold text-slate-800">{email}</span>.
            </p>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              What happens next
            </p>
            <ol className="mt-3 space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                  1
                </span>
                <span className="pt-0.5">Our team verifies your payment — usually within 24 hours.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                  2
                </span>
                <span className="pt-0.5">
                  Create your agent account with the <span className="font-bold">same email</span>
                  {email ? ` (${email})` : ''} — the dashboard is a separate sign-in from this site. Already have one?
                  Sign in instead.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                  3
                </span>
                <span className="pt-0.5">
                  Link your LinkedIn account inside the dashboard. The plan is switched on and the agent starts
                  working through your outreach, follow-ups and posting.
                </span>
              </li>
            </ol>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={agentSignupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                Create my agent account <ExternalLink size={14} />
              </a>
              <a
                href={LINKEDIN_PLAN_CONFIG.whatsappConfirm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-3.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                <MessageCircle size={15} /> Confirm with the team
              </a>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Already have an agent account?{' '}
              <a
                href={agentLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-600 underline underline-offset-4"
              >
                Sign in here
              </a>{' '}
              — we will find the plan on your email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlanPage;
