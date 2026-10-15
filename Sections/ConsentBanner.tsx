import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoredConsent, applyConsent } from '../consent';

interface ConsentBannerProps {
  /** Opens the Privacy policy page, where the choice can be changed later. */
  onOpenPrivacy?: () => void;
}

/**
 * Analytics consent popup (Task 4).
 * Shown once, until the visitor makes a choice. Matches the reference: rounded
 * card, message, Privacy policy link, "No thanks" / "Allow" buttons.
 */
const ConsentBanner: React.FC<ConsentBannerProps> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  const decide = (value: 'granted' | 'denied') => {
    applyConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Analytics consent"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_12px_40px_rgba(15,23,42,0.18)] px-5 py-5 md:px-7 md:py-6">
            <p className="text-sm md:text-[15px] leading-relaxed text-zinc-800 font-medium">
              Allow analytics storage to help us understand how Innovators AI Hub is used?{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-emerald-700 hover:text-emerald-800 underline underline-offset-2 font-semibold outline-none"
              >
                Privacy policy
              </button>
            </p>

            <div className="flex items-center justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={() => decide('denied')}
                className="px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 text-xs md:text-sm font-semibold hover:bg-zinc-50 active:scale-95 transition-all outline-none"
              >
                No thanks
              </button>
              <button
                type="button"
                onClick={() => decide('granted')}
                className="px-6 py-2.5 rounded-full bg-zinc-950 text-white text-xs md:text-sm font-semibold hover:bg-zinc-900 active:scale-95 transition-all outline-none shadow-sm"
              >
                Allow
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
