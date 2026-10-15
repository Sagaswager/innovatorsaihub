import React, { useEffect, useRef } from 'react';
import { isGoogleSignInConfigured, renderGoogleButton, type GoogleProfile } from '../googleAuth';

interface GoogleSignInButtonProps {
  onProfile: (profile: GoogleProfile) => void;
  onError: (message: string) => void;
  disabled?: boolean;
}

/**
 * "Continue with Google" (Task 2). Google renders the button itself, so the flow is
 * the official one and no password is ever handled by the site.
 */
const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onProfile, onError, disabled }) => {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holder.current || !isGoogleSignInConfigured()) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    renderGoogleButton(holder.current, onProfile, onError)
      .then((fn) => {
        if (cancelled) fn();
        else cleanup = fn;
      })
      .catch((err) => onError(err instanceof Error ? err.message : 'Google sign-in is unavailable right now.'));
    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isGoogleSignInConfigured()) return null;

  return (
    <div className={`flex flex-col items-center ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div ref={holder} className="w-full flex justify-center" />
    </div>
  );
};

export default GoogleSignInButton;
