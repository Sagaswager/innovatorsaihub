/**
 * Analytics consent engine (Task 4)
 *
 * Optional analytics storage (GA4 + Meta Pixel) must stay off until the visitor
 * explicitly allows it. The preference is stored locally, survives reloads, and
 * can be changed at any time from the Privacy policy page or the banner.
 */

export type ConsentValue = 'granted' | 'denied';

export const CONSENT_STORAGE_KEY = 'iah_analytics_consent';
export const CONSENT_EVENT = 'iah:consent-change';

/** GA4 measurement id, shared with analytics.ts so there is one source of truth. */
export const GA_MEASUREMENT_ID = (
  (import.meta.env && import.meta.env.VITE_GA_MEASUREMENT_ID) || 'G-FRNF7K23EF'
).trim();

let analyticsLoaded = false;

export const getStoredConsent = (): ConsentValue | null => {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const analyticsAllowed = (): boolean => getStoredConsent() === 'granted';

/** Injects the GA4 tag. Does nothing unless consent has been granted. */
export const loadAnalytics = (): void => {
  if (typeof window === 'undefined' || analyticsLoaded) return;
  if (!analyticsAllowed()) return;
  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    } as any;
  }
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  if (!document.getElementById('iah-gtag')) {
    const script = document.createElement('script');
    script.id = 'iah-gtag';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }
};

/** Persists the visitor's choice, applies it immediately and notifies listeners. */
export const applyConsent = (value: ConsentValue): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* storage unavailable (private mode) — consent simply is not remembered */
  }

  if (value === 'granted') {
    loadAnalytics();
  } else if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }

  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
};

export const clearConsent = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};
