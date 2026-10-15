import React, { useEffect, useState } from 'react';
import { getStoredConsent, applyConsent, CONSENT_EVENT, type ConsentValue } from '../consent';

interface PrivacyPolicyProps {
  navigateTo?: (page: any) => void;
}

/**
 * Privacy policy page (supports Task 4).
 * Gives the "Privacy policy" link in the consent popup a real destination and
 * lets a visitor change their analytics choice at any time.
 */
const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigateTo }) => {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    const onChange = (event: Event) => setConsent((event as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const choose = (value: ConsentValue) => {
    applyConsent(value);
    setConsent(value);
  };

  const statusLabel =
    consent === 'granted'
      ? 'Analytics storage is currently allowed.'
      : consent === 'denied'
        ? 'Analytics storage is currently turned off.'
        : 'You have not chosen yet. Analytics storage stays off until you allow it.';

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <button
          onClick={() => navigateTo?.('platform')}
          className="text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 mb-8 outline-none"
        >
          ← Back to home
        </button>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">Privacy policy</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: 15 October 2026</p>

        <div className="space-y-8 text-sm md:text-[15px] leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Who we are</h2>
            <p>
              Innovators AI Hub provides AI agent co-workers and business automation services. This
              page explains what we collect on innovatorsaihub.com, why, and the control you have
              over it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">What we collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Account details you give us</strong> — name, email, phone number, profession
                and company name when you sign up or rent an agent.
              </li>
              <li>
                <strong>Usage analytics</strong> — which pages you visit and how you reached us,
                only if you allow analytics storage.
              </li>
              <li>
                <strong>Sign-in records</strong> — the date and result of an account lookup, so we
                can support you when something goes wrong.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Analytics and cookies</h2>
            <p>
              We use Google Analytics 4 to understand how the site is used. Optional analytics
              storage is <strong>off until you allow it</strong>, and nothing is sent to Google
              before that. If you decline, the site works exactly the same.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Your analytics choice</h2>
            <p className="mb-4">{statusLabel}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => choose('denied')}
                className="px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-100 active:scale-95 transition-all outline-none"
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={() => choose('granted')}
                className="px-6 py-2.5 rounded-full bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-900 active:scale-95 transition-all outline-none"
              >
                Allow
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Changing this applies immediately. Turning analytics off stops new analytics storage.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">How long we keep it</h2>
            <p>
              Account records are kept while your account is active. If you delete your account, the
              record is archived and removed from active use, and we keep only what we need for
              accounting and legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Your rights</h2>
            <p>
              You can ask us for a copy of your data, correct it, or delete your account at any time
              from Account Settings, or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
            <p>
              Questions about this policy or your data:{' '}
              <a
                href="mailto:innovatorsaihub@gmail.com"
                className="text-emerald-700 hover:text-emerald-800 underline underline-offset-2 font-semibold"
              >
                innovatorsaihub@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
