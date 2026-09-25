/**
 * Innovators AI HUB - Modular Analytics & Social Meta Pixel Engine
 * Provides dual-dispatch event tracking for Google Analytics 4 (GA4) and Meta Pixel (Facebook Pixel),
 * SPA route change pageviews, and typed conversion helpers.
 */

// Global window extensions for analytics libraries
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: {
      (action: 'init', pixelId: string, customData?: Record<string, any>): void;
      (action: 'track' | 'trackCustom', eventName: string, params?: Record<string, any>): void;
      (...args: any[]): void;
      callMethod?: (...args: any[]) => void;
      queue?: any[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: any;
    __META_PIXEL_ID__?: string;
    __TRACKING_INITIALIZED__?: boolean;
  }
}

// Standard Meta Pixel Event Types
export type StandardMetaEvent =
  | 'PageView'
  | 'Lead'
  | 'Contact'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'CompleteRegistration'
  | 'Schedule'
  | 'Search'
  | 'CustomizeProduct';

// Tracking Configuration
export const TRACKING_CONFIG = {
  gaMeasurementId: (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-FRNF7K23EF').trim(),
  metaPixelId: (
    import.meta.env.VITE_META_PIXEL_ID ||
    (typeof window !== 'undefined' ? window.__META_PIXEL_ID__ : '') ||
    ''
  ).trim(),
  isDev: Boolean(import.meta.env.DEV),
};

/**
 * Checks if a valid, non-placeholder Meta Pixel ID is available.
 */
export const isMetaPixelActive = (): boolean => {
  const id = TRACKING_CONFIG.metaPixelId;
  return Boolean(id && id !== 'YOUR_PIXEL_ID' && id.length > 5);
};

/**
 * Safely initializes the Meta Pixel script dynamically in the DOM if not already present.
 */
export const initMetaPixel = (pixelId?: string) => {
  if (typeof window === 'undefined') return;

  const id = (pixelId || TRACKING_CONFIG.metaPixelId).trim();
  if (id) {
    window.__META_PIXEL_ID__ = id;
    TRACKING_CONFIG.metaPixelId = id;
  }

  // Only load and initialize Meta Pixel script if an active, configured ID exists
  if (!isMetaPixelActive()) {
    return;
  }

  // Load official Meta Pixel loader snippet if not already on window
  if (!window.fbq) {
    const f: any = window;
    const b = document;
    const e = 'script';
    const v = 'https://connect.facebook.net/en_US/fbevents.js';

    const n: any = function () {
      if (n.callMethod) {
        n.callMethod.apply(n, arguments);
      } else {
        n.queue.push(arguments);
      }
    };

    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];

    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }

    window.fbq = n;
  }

  // Initialize pixel ID
  if (window.fbq) {
    window.fbq('init', TRACKING_CONFIG.metaPixelId);
    console.log(`[Meta Pixel]: Initialized with ID ${TRACKING_CONFIG.metaPixelId}`);
  }
};

/**
 * Initialize all tracking providers.
 */
export const initTracking = () => {
  if (typeof window === 'undefined' || window.__TRACKING_INITIALIZED__) return;
  window.__TRACKING_INITIALIZED__ = true;
  initMetaPixel();
};

/**
 * Track an event with Meta Pixel (Standard or Custom).
 */
export const trackMetaEvent = (
  eventName: StandardMetaEvent | string,
  params?: Record<string, any>,
  isCustom = false
) => {
  const active = isMetaPixelActive();

  if (TRACKING_CONFIG.isDev || !active) {
    console.log(`[Meta Pixel Event${active ? '' : ' (Inactive)'}]: ${eventName}`, params);
  }

  if (active && typeof window !== 'undefined' && window.fbq) {
    try {
      if (isCustom) {
        window.fbq('trackCustom', eventName, params);
      } else {
        window.fbq('track', eventName, params);
      }
    } catch (err) {
      console.warn('[Meta Pixel]: Error tracking event', err);
    }
  }
};

/**
 * Dispatches a virtual pageview event for React SPA route transitions across GA4 and Meta Pixel.
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  const fullPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
  
  if (TRACKING_CONFIG.isDev) {
    console.log(`[Analytics PageView]: ${fullPath}`, { title: pageTitle });
  }

  // Send to GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: fullPath,
      page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    });
  }

  // Send to Meta Pixel
  trackMetaEvent('PageView', {
    page_path: fullPath,
    page_title: pageTitle,
  });
};

/**
 * Conversion Helper: Track a qualified lead (form submissions, rental requests, demo bookings).
 */
export const trackLead = (source: string, details?: Record<string, any>) => {
  const payload = {
    source,
    ...details,
    timestamp: new Date().toISOString(),
  };

  console.log(`[Analytics Lead]: ${source}`, payload);

  // Send GA4 lead event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      lead_source: source,
      ...payload,
    });
  }

  // Send Meta Pixel Lead event
  trackMetaEvent('Lead', {
    content_name: source,
    ...details,
  });
};

/**
 * Conversion Helper: Track direct communication interactions (WhatsApp, Email, LinkedIn, Phone).
 */
export const trackContact = (
  method: 'whatsapp' | 'email' | 'phone' | 'linkedin',
  details?: Record<string, any>
) => {
  const payload = {
    contact_method: method,
    ...details,
  };

  console.log(`[Analytics Contact]: ${method}`, payload);

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact', payload);
  }

  trackMetaEvent('Contact', payload);
};

/**
 * Specialized Conversion Helper: Track AI Agent Rental submissions.
 */
export const trackAgentRental = (
  agentName: string,
  price: string,
  customerData?: Record<string, any>
) => {
  // Extract digits for numeric currency tracking (e.g. "₹2,999/mo" -> 2999)
  const numericPrice = Number(price.replace(/[^0-9]/g, '')) || 0;

  trackLead(`rental_${agentName.toLowerCase().replace(/\s+/g, '_')}`, {
    agent_name: agentName,
    price_string: price,
    value: numericPrice,
    currency: 'INR',
    ...customerData,
  });
};

/**
 * Main General Event Dispatcher.
 * Backwards-compatible with all existing `trackEvent(eventName, params)` calls in the codebase,
 * while automatically mapping key business actions to Meta Pixel events.
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  console.log(`[Analytics Event]: ${eventName}`, params);

  // Send to Google Analytics (gtag)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  // Fallback to dataLayer
  else if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // Automatic Mapping to Meta Pixel Standard Events
  switch (eventName) {
    case 'event_registration_lead':
      trackMetaEvent('Lead', {
        content_name: 'Event Registration',
        ...params,
      });
      break;

    case 'payment_verification_attempt':
      trackMetaEvent('AddPaymentInfo', params);
      break;

    case 'payment_verification_success':
      trackMetaEvent('Purchase', {
        currency: 'INR',
        ...params,
      });
      break;

    case 'checkout_initiated':
      trackMetaEvent('InitiateCheckout', params);
      break;

    case 'agent_selected':
      trackMetaEvent('CustomizeProduct', params, true);
      break;

    case 'cta_clicked':
      if (params?.button_name?.includes('whatsapp') || params?.button_name?.includes('book_demo')) {
        trackMetaEvent('Contact', params);
      }
      break;

    default:
      // Dispatches custom event to Meta Pixel if desired
      break;
  }
};
