import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Crown,
  Zap,
  Upload,
  Instagram,
  Linkedin,
  Twitter,
  Loader2,
  QrCode,
  PartyPopper,
  ShieldCheck,
} from 'lucide-react';
import {
  PLAN_CONFIG,
  formatINR,
  planById,
  planPriceLabel,
  quotePlan,
  type PlanId,
} from './planConfig';
import { normalizeEmail, isValidEmail, registerAccount, submitOfferProof } from '../authApi';

/* ------------------------------------------------------------------ *
 * "My Plan" — a full page (saga, 2026-10-16; it used to be a modal).
 *
 * Three steps:
 *   plans  — pick a plan, see the welcome balance on every card
 *   offer  — claim "+₹2,000 OFF": post about us, tag @innovatorsaihub,
 *            upload a screenshot of the post
 *   pay    — scan the UPI QR for the payable amount
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
    return { name: String((parsed && parsed.name) || ''), email: normalizeEmail((parsed && parsed.email) || '') };
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
  const [screenshot, setScreenshot] = useState<string>('');
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const selected = planById(selectedId);
  const quote = quotePlan(selected, offerApplied);
  const goBack = () => {
    if (step === 'plans') {
      if (navigateTo) navigateTo('platform');
      return;
    }
    setError('');
    setStep(step === 'pay' ? 'offer' : 'plans');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

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
      notes: `Plan upgrade started · offer proof: ${proofUrl || 'not uploaded'}`,
    });
    setBusy(false);
    setStep('done');
  };

  const shell =
    'min-h-screen w-full px-4 pt-24 pb-16 md:px-8 md:pt-28 md:pb-24';
  const panel =
    'w-full max-w-6xl mx-auto rounded-[32px] p-5 md:p-10 shadow-2xl';

  const cardFor = (planId: PlanId, icon: React.ReactNode, featured?: boolean) => {
    const plan = planById(planId);
    const q = quotePlan(plan, offerApplied);
    const isSelected = selectedId === planId;
    return (
      <div
        key={planId}
        className={`relative flex flex-col rounded-[28px] p-5 md:p-6 border shadow-sm transition-all ${
          featured ? 'border-amber-200' : 'border-white/80 bg-white/85'
        } ${isSelected ? 'ring-2 ring-slate-900/70' : ''}`}
        style={
          featured
            ? { background: 'linear-gradient(150deg, #fff7ed 0%, #ffe4c7 45%, #ffd0a8 100%)' }
            : { background: 'rgba(255,255,255,0.86)' }
        }
      >
        {featured && (
          <span className="absolute -top-2 right-5 px-3 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
            Best value
          </span>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm">{icon}</span>
          <h3 className="text-lg md:text-xl font-black text-slate-900">{plan.name}</h3>
        </div>

        <p className="text-[11px] md:text-xs text-slate-600 font-medium mb-4">{plan.tagline}</p>

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl md:text-3xl font-black text-slate-900">{formatINR(plan.monthly)}</span>
          <span className="text-[11px] md:text-xs text-slate-600 font-semibold">/month</span>
        </div>
        {plan.months > 1 && (
          <p className="text-[11px] text-slate-600 font-semibold mt-1">
            {formatINR(plan.monthly * plan.months)} billed for {plan.months} months
          </p>
        )}

        {/* Balance + offer breakdown */}
        <div className="mt-4 rounded-2xl bg-white/70 border border-white/90 p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[11px] md:text-xs">
            <span className="text-slate-600 font-medium">Available balance</span>
            <span className="font-bold text-emerald-700">−{formatINR(q.balance)}</span>
          </div>
          {offerApplied && (
            <div className="flex items-center justify-between text-[11px] md:text-xs">
              <span className="text-slate-600 font-medium">Post &amp; tag offer</span>
              <span className="font-bold text-emerald-700">−{formatINR(q.offer)}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
            <span className="text-[11px] md:text-xs font-bold text-slate-800">You pay</span>
            <span className="text-lg md:text-xl font-black text-slate-900">{formatINR(q.payable)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-slate-700 mt-4 mb-5">
          <Check size={13} className="text-emerald-600" />
          <span>{plan.credits}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedId(planId);
            setError('');
            setStep('offer');
          }}
          className="mt-auto w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs md:text-sm font-bold transition-all active:scale-[0.98] outline-none"
        >
          {planId === 'pro' ? 'Upgrade to Pro' : 'Upgrade'}
        </button>
      </div>
    );
  };

  return (
    <div
      className={shell}
      style={{
        background:
          'radial-gradient(120% 80% at 15% 0%, #eef6ff 0%, #dbeafe 35%, #c7d2fe 70%, #b8c6fb 100%)',
      }}
    >
      <div className={panel} style={{ background: 'rgba(255,255,255,0.45)' }}>
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-700 hover:text-slate-900 transition-all outline-none"
          >
            <ArrowLeft size={16} />
            {step === 'plans' ? 'Back to platform' : 'Back'}
          </button>
          {step !== 'plans' && (
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">
              {step === 'offer' ? 'Step 1 of 2' : step === 'pay' ? 'Step 2 of 2' : 'Done'}
            </span>
          )}
        </div>

        {/* ---------------- step: plans ---------------- */}
        {step === 'plans' && (
          <>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">Choose your plan</h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">
              Pick a plan that best suits you. Upgrade or downgrade at any time.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-8">
              <button
                type="button"
                onClick={() => setOfferApplied((on) => !on)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all outline-none ${
                  offerApplied
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white/80 border-white text-slate-800 hover:bg-white'
                }`}
              >
                {offerApplied ? <Check size={15} /> : <Zap size={15} />}
                {offerApplied ? `${formatINR(PLAN_CONFIG.launchOffer)} OFF applied` : `+${formatINR(PLAN_CONFIG.launchOffer)} OFF`}
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 border border-white text-[11px] md:text-xs font-semibold text-slate-700">
                <ShieldCheck size={14} className="text-emerald-600" />
                Available balance {formatINR(PLAN_CONFIG.welcomeBalance)} — welcome bonus on every new account
              </div>
            </div>

            {offerApplied && (
              <p className="text-[11px] md:text-xs text-slate-600 font-medium mt-3">
                {formatINR(PLAN_CONFIG.launchOffer)} OFF is applied to your price. Claim it on the next step by posting
                about Innovators AI Hub on {PLAN_CONFIG.socialPlatforms} and tagging{' '}
                <span className="font-bold text-slate-800">{PLAN_CONFIG.socialHandle}</span>.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-6">
              {cardFor('monthly', <Zap size={16} className="text-zinc-900" />)}
              {cardFor('quarterly', <Zap size={16} className="text-zinc-900" />)}
              {cardFor('pro', <Crown size={16} className="text-amber-700" />, true)}
            </div>

            <p className="text-[10px] md:text-[11px] text-slate-600 mt-5 leading-relaxed">
              Prices are in INR. Your {formatINR(PLAN_CONFIG.welcomeBalance)} welcome balance is applied automatically
              and is shown on every plan. The {formatINR(PLAN_CONFIG.launchOffer)} post-and-tag offer is credited once
              our team verifies your screenshot. Need help choosing? Book a demo and we will map it to your workflow.
            </p>
          </>
        )}

        {/* ---------------- step: offer ---------------- */}
        {step === 'offer' && (
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Claim {formatINR(PLAN_CONFIG.launchOffer)} OFF
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">
              {selected.name} plan · {planPriceLabel(selected)} — you pay{' '}
              <span className="font-bold text-slate-900">{formatINR(quote.payable)}</span> with the offer.
            </p>

            <ol className="mt-6 space-y-3">
              {[
                <>Post about <span className="font-bold text-slate-800">Innovators AI Hub</span> on {PLAN_CONFIG.socialPlatforms}.</>,
                <>Tag <span className="font-bold text-slate-800">{PLAN_CONFIG.socialHandle}</span> in the post.</>,
                <>Upload a screenshot of the live post below.</>,
              ].map((line, index) => (
                <li key={index} className="flex items-start gap-3 text-xs md:text-sm text-slate-700">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{line}</span>
                </li>
              ))}
            </ol>

            <div className="flex items-center gap-3 mt-4 text-slate-500">
              <Instagram size={16} />
              <Linkedin size={16} />
              <Twitter size={16} />
              <span className="text-[11px] md:text-xs font-semibold">{PLAN_CONFIG.socialHandle}</span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Your name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                  className="mt-1 w-full rounded-2xl border border-white bg-white/85 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-400"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-2xl border border-white bg-white/85 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-400"
                />
              </label>
            </div>

            <div className="mt-4 rounded-3xl border-2 border-dashed border-slate-300 bg-white/70 p-5 text-center">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => pickFile(event.target.files && event.target.files[0] ? event.target.files[0] : null)}
              />
              {screenshot ? (
                <div className="flex flex-col items-center gap-3">
                  <img src={screenshot} alt="Your post screenshot" className="max-h-52 rounded-2xl shadow-sm" />
                  <span className="text-[11px] text-slate-600 font-medium">{screenshotName}</span>
                  <button
                    type="button"
                    onClick={() => fileRef.current && fileRef.current.click()}
                    className="text-[11px] font-bold text-slate-700 underline underline-offset-4"
                  >
                    Choose a different image
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-xs md:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all"
                >
                  <Upload size={15} />
                  Upload screenshot
                </button>
              )}
            </div>

            {error && <p className="text-xs font-semibold text-red-600 mt-4">{error}</p>}

            <button
              type="button"
              onClick={submitProof}
              disabled={busy}
              className="mt-5 w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 disabled:opacity-60 text-white text-xs md:text-sm font-bold transition-all active:scale-[0.98] outline-none"
            >
              {busy ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" /> Uploading…
                </span>
              ) : (
                'Upload screenshot & continue'
              )}
            </button>
            <p className="text-[10px] md:text-[11px] text-slate-500 mt-3">
              Our team verifies the screenshot within 24 hours. If the post is not live, the offer is reversed and the
              full price applies.
            </p>
          </div>
        )}

        {/* ---------------- step: pay ---------------- */}
        {step === 'pay' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Pay {formatINR(quote.payable)}
              </h1>
              <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">
                Scan the QR with any UPI app — GPay, PhonePe, Paytm — and pay{' '}
                <span className="font-bold text-slate-900">{formatINR(quote.payable)}</span>.
              </p>

              <div className="mt-5 rounded-2xl bg-white/80 border border-white p-4 text-[11px] md:text-xs text-slate-700 space-y-1.5">
                <div className="flex justify-between">
                  <span>{selected.name} plan</span>
                  <span className="font-semibold">{formatINR(quote.listTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Welcome balance</span>
                  <span className="font-semibold text-emerald-700">−{formatINR(quote.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Post &amp; tag offer</span>
                  <span className="font-semibold text-emerald-700">−{formatINR(quote.offer)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">You pay</span>
                  <span className="font-black text-slate-900">{formatINR(quote.payable)}</span>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 text-[10px] md:text-[11px] text-slate-600">
                <QrCode size={14} className="mt-0.5 shrink-0 text-slate-500" />
                <span>
                  Add your email in the UPI note if your app allows it — it makes matching your payment instant.
                  {proofUrl ? ' Your offer screenshot is already with our team.' : ''}
                </span>
              </div>

              {error && <p className="text-xs font-semibold text-red-600 mt-4">{error}</p>}

              <button
                type="button"
                onClick={confirmPayment}
                disabled={busy}
                className="mt-5 w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 disabled:opacity-60 text-white text-xs md:text-sm font-bold transition-all active:scale-[0.98] outline-none"
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

            <div className="rounded-[28px] bg-white p-5 md:p-6 shadow-lg border border-white flex flex-col items-center">
              <img
                src={PLAN_CONFIG.paymentQr}
                alt="UPI QR code to pay for your Innovators AI Hub plan"
                className="w-full max-w-[280px] rounded-2xl"
              />
              <span className="mt-4 text-[11px] md:text-xs font-bold uppercase tracking-wider text-slate-500">
                Scan &amp; pay {formatINR(quote.payable)}
              </span>
            </div>
          </div>
        )}

        {/* ---------------- step: done ---------------- */}
        {step === 'done' && (
          <div className="max-w-xl">
            <span className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <PartyPopper size={22} className="text-emerald-700" />
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mt-5">
              Thanks — we are on it
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-3 font-medium">
              We have your {selected.name} plan request and your payment confirmation. Our team verifies the payment and
              your offer screenshot, then activates the plan — usually within 24 hours. We will email{' '}
              <span className="font-bold text-slate-800">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => navigateTo && navigateTo('platform')}
              className="mt-6 px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs md:text-sm font-bold transition-all outline-none"
            >
              Back to platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlanPage;
