/**
 * Google sign-in (Task 2).
 *
 * Uses Google Identity Services to obtain an ID token, then treats the *verified*
 * email as the identity: an existing account signs in, a new one is registered
 * with the same email the sheet already dedupes on. No password is stored anywhere.
 *
 * The client id comes from VITE_GOOGLE_CLIENT_ID. Until it is set, the button is
 * hidden rather than shown broken.
 */

export const GOOGLE_CLIENT_ID = (
  (import.meta.env && import.meta.env.VITE_GOOGLE_CLIENT_ID) || ''
).trim();

export const isGoogleSignInConfigured = (): boolean => GOOGLE_CLIENT_ID.length > 0;

export type GoogleProfile = {
  email: string;
  name: string;
  picture?: string;
  /** Google must assert the email is verified — we never trust an unverified one. */
  emailVerified: boolean;
};

declare global {
  interface Window {
    google?: any;
  }
}

const GIS_SRC = 'https://accounts.google.com/gsi/client';
let gisLoader: Promise<void> | null = null;

const loadGis = (): Promise<void> => {
  if (gisLoader) return gisLoader;
  gisLoader = new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Google sign-in is only available in the browser.'));
      return;
    }
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.getElementById('iah-gsi') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Could not load Google sign-in.')));
      return;
    }
    const script = document.createElement('script');
    script.id = 'iah-gsi';
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load Google sign-in. Check your connection.'));
    document.head.appendChild(script);
  });
  return gisLoader;
};

/** Decodes the ID token payload. The token is validated by Google, not by us. */
const decodeIdToken = (token: string): Record<string, any> => {
  const part = token.split('.')[1] || '';
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const json = decodeURIComponent(
    atob(padded)
      .split('')
      .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(json);
};

export const profileFromCredential = (credential: string): GoogleProfile => {
  const claims = decodeIdToken(credential);
  const email = String(claims.email || '').trim().toLowerCase();
  if (!email) throw new Error('Google did not return an email address.');
  if (claims.email_verified !== true && claims.email_verified !== 'true') {
    throw new Error('That Google account does not have a verified email address.');
  }
  return {
    email,
    name: String(claims.name || claims.given_name || email.split('@')[0]),
    picture: claims.picture,
    emailVerified: true,
  };
};

/**
 * Renders the official "Continue with Google" button into `container`.
 * Returns a cleanup function.
 */
export const renderGoogleButton = async (
  container: HTMLElement,
  onProfile: (profile: GoogleProfile) => void,
  onError: (message: string) => void
): Promise<() => void> => {
  if (!isGoogleSignInConfigured()) {
    console.warn('[Google sign-in] VITE_GOOGLE_CLIENT_ID is not set — button not rendered.');
    return () => {};
  }
  await loadGis();
  const id = window.google.accounts.id;
  id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    auto_select: false,
    cancel_on_tap_outside: true,
    callback: (response: { credential?: string }) => {
      try {
        if (!response?.credential) throw new Error('Google did not return a credential.');
        onProfile(profileFromCredential(response.credential));
      } catch (err) {
        onError(err instanceof Error ? err.message : 'Google sign-in failed. Try again.');
      }
    },
  });
  id.renderButton(container, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'continue_with',
    logo_alignment: 'left',
    width: 320,
  });
  return () => {
    container.innerHTML = '';
  };
};
