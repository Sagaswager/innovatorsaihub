/**
 * Innovators AI HUB - accounts (signup + sign-in).
 *
 * The accounts live in the "AI AGENTIC CLIENTS" Google Sheet, reached through the
 * Apps Script web app below. It is the source of truth; the browser cache only
 * makes repeat visits instant.
 *
 *   POST                        -> create / refresh the account row
 *   GET ?action=verify&email=   -> does this email already have an account?
 *
 * The endpoint answers with CORS, so both calls are readable from the browser -
 * no more blind "no-cors" writes that look successful even when they fail.
 */

export const AUTH_URL =
  'https://script.google.com/macros/s/AKfycbzexEyK1UI85INtS5v39Z5hnZX-yYzw1GBJD4fcZ_kZKJ0M5eIRjMBRQfaKLxq8mqB7yg/exec';

/** WhatsApp support line used on the site. */
export const SUPPORT_WHATSAPP = '919810875683';

const LOCAL_USERS_KEY = 'platform_registered_users';
const LOCAL_SESSION_KEY = 'platform_user';

export type Account = { name: string; email: string };

export type VerifyResult =
  | { status: 'found'; name: string; source?: string }
  | { status: 'not_found' }
  | { status: 'error'; message: string };

export type RegisterResult = {
  ok: boolean;
  /** true when the row was created, false when an existing account was refreshed */
  created?: boolean;
  /** present when ok is false */
  message?: string;
};

/** Trims and lowercases, so "Sagar@Gmail.com " and "sagar@gmail.com" are one account. */
export const normalizeEmail = (value: string): string => (value || '').trim().toLowerCase();

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));

async function request(url: string, init?: RequestInit, timeoutMs = 20000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...(init || {}), signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Asks the sheet whether this email already has an account. */
export async function verifyAccount(email: string): Promise<VerifyResult> {
  const clean = normalizeEmail(email);
  if (!isValidEmail(clean)) return { status: 'error', message: 'Enter a valid email address.' };
  try {
    const res = await request(`${AUTH_URL}?action=verify&email=${encodeURIComponent(clean)}`);
    const data = await res.json();
    if (data.status === 'found') return { status: 'found', name: data.name || '', source: data.source };
    if (data.status === 'not_found') return { status: 'not_found' };
    return { status: 'error', message: data.message || 'Could not check this email right now.' };
  } catch (err) {
    return {
      status: 'error',
      message: 'Could not reach the account service. Check your connection and try again.',
    };
  }
}

export type RegisterPayload = {
  name: string;
  email: string;
  number?: string;
  profession?: string;
  companyName?: string;
  agent?: string;
  price?: string;
  source?: string;
  notes?: string;
};

/** Writes the account to the sheet and reports whether it worked. */
export async function registerAccount(payload: RegisterPayload): Promise<RegisterResult> {
  const clean = normalizeEmail(payload.email);
  if (!isValidEmail(clean)) return { ok: false, message: 'Enter a valid email address.' };
  try {
    const res = await request(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, email: clean, mail: clean }),
    });
    const data = await res.json();
    if (data.status === 'success') return { ok: true, created: Boolean(data.created) };
    return { ok: false, message: data.message || 'Could not save your details.' };
  } catch (err) {
    return {
      ok: false,
      message: 'Could not reach the account service. Check your connection and try again.',
    };
  }
}

/* ---- local cache: convenience only, never the source of truth ---- */

export function readLocalUsers(): Account[] {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (err) {
    return [];
  }
}

export function findLocalUser(email: string): Account | null {
  const target = normalizeEmail(email);
  const hit = readLocalUsers().find((u: any) => normalizeEmail(u && (u.email || u.mail)) === target);
  return hit ? { name: hit.name || '', email: target } : null;
}

export function rememberUser(user: Account): void {
  const email = normalizeEmail(user.email);
  const users = readLocalUsers().filter((u: any) => normalizeEmail(u && (u.email || u.mail)) !== email);
  users.push({ name: user.name || '', email });
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    /* storage full or blocked - the sheet still has the account */
  }
  try {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ name: user.name || '', email }));
  } catch (err) {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ *
 * Agent reviews (Task 8) and account deletion (Task 11)
 * Same endpoint, different actions.
 * ------------------------------------------------------------------ */

export type Review = {
  name: string;
  rating: number;
  review: string;
  at: string;
};

export type ReviewStats = {
  agent: string;
  average: number;
  count: number;
  distribution: Record<string, number>;
  reviews: Review[];
};

const EMPTY_STATS = (agent: string): ReviewStats => ({
  agent,
  average: 0,
  count: 0,
  distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
  reviews: [],
});

/** Real ratings for one agent: average, count, 1-5 breakdown, recent written reviews. */
export async function fetchReviews(agent: string): Promise<ReviewStats> {
  try {
    const res = await request(`${AUTH_URL}?action=reviews&agent=${encodeURIComponent(agent)}`, undefined, 15000);
    const data = await res.json();
    if (data && data.status === 'ok' && data.stats) {
      return { ...EMPTY_STATS(agent), ...data.stats };
    }
  } catch (err) {
    /* offline or the endpoint is not deployed yet — callers fall back gracefully */
  }
  return EMPTY_STATS(agent);
}

/** Ratings for every agent that has at least one review, keyed by agent name. */
export async function fetchAllReviewStats(): Promise<Record<string, { average: number; count: number }>> {
  try {
    const res = await request(`${AUTH_URL}?action=reviews`, undefined, 15000);
    const data = await res.json();
    if (data && data.status === 'ok' && data.agents) return data.agents;
  } catch (err) {
    /* ignore */
  }
  return {};
}

export type SubmitReviewResult =
  | { ok: true; updated: boolean; stats: ReviewStats }
  | { ok: false; message: string };

/** One review per email per agent — a repeat submission updates the existing row. */
export async function submitReview(input: {
  agent: string;
  rating: number;
  review?: string;
  email: string;
  name?: string;
}): Promise<SubmitReviewResult> {
  const clean = normalizeEmail(input.email);
  if (!isValidEmail(clean)) return { ok: false, message: 'Sign in with a valid email to review an agent.' };
  if (!(input.rating >= 1 && input.rating <= 5)) return { ok: false, message: 'Choose a rating from 1 to 5 stars.' };
  try {
    const res = await request(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'review',
        agent: input.agent,
        rating: input.rating,
        review: input.review || '',
        email: clean,
        mail: clean,
        name: input.name || '',
      }),
    });
    const data = await res.json();
    if (data && data.status === 'success') {
      return {
        ok: true,
        updated: Boolean(data.updated),
        stats: { ...EMPTY_STATS(input.agent), ...(data.stats || {}) },
      };
    }
    return { ok: false, message: (data && data.message) || 'Could not save your review.' };
  } catch (err) {
    return { ok: false, message: 'Could not reach the review service. Check your connection and try again.' };
  }
}

export type DeleteAccountResult = { ok: boolean; message?: string };

/**
 * Archives the account: it is removed from the sign-in index and its signup rows are
 * marked Deleted, so it can no longer access anything, while the record is retained.
 */
export async function deleteAccount(email: string, source = 'website'): Promise<DeleteAccountResult> {
  const clean = normalizeEmail(email);
  if (!isValidEmail(clean)) return { ok: false, message: 'A valid email is required.' };
  try {
    const res = await request(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'delete_account', email: clean, mail: clean, source }),
    });
    const data = await res.json();
    if (data && data.status === 'success') return { ok: true };
    return { ok: false, message: (data && data.message) || 'Could not delete the account.' };
  } catch (err) {
    return { ok: false, message: 'Could not reach the account service. Check your connection and try again.' };
  }
}

/** Clears the local session + cached account so a deleted account is gone from this browser too. */
export function forgetUser(email: string): void {
  const target = normalizeEmail(email);
  try {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    const users = readLocalUsers().filter((u: any) => normalizeEmail(u && (u.email || u.mail)) !== target);
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    /* ignore */
  }
}
