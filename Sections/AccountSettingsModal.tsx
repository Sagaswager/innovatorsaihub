import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, Loader2, Check, AlertTriangle } from 'lucide-react';
import { deleteAccount, forgetUser, normalizeEmail } from '../authApi';

interface AccountSettingsModalProps {
  currentUser: { name: string; email: string };
  onClose: () => void;
  /** Called after the account has been archived, so the app can drop the session. */
  onDeleted: () => void;
  onOpenMyPlan?: () => void;
}

/**
 * Account settings (Task 11).
 * Deletion is a two-step, typed confirmation and is an archive on the server: the
 * account leaves the sign-in index and its signup rows are marked Deleted, so it can
 * no longer access anything while the record is retained.
 */
const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  currentUser,
  onClose,
  onDeleted,
  onOpenMyPlan,
}) => {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [state, setState] = useState<{ kind: 'idle' | 'working' | 'error' | 'done'; message?: string }>({
    kind: 'idle',
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const emailMatches = normalizeEmail(typed) === normalizeEmail(currentUser.email);

  const handleDelete = async () => {
    if (!emailMatches || !acknowledged) return;
    setState({ kind: 'working' });
    const result = await deleteAccount(currentUser.email, 'account-settings');
    if (result.ok) {
      forgetUser(currentUser.email);
      setState({ kind: 'done' });
      setTimeout(() => onDeleted(), 1400);
    } else {
      setState({ kind: 'error', message: result.message });
    }
  };

  return (
    <div className="fixed inset-0 z-[135] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        role="dialog"
        aria-modal="true"
        aria-label="Account settings"
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-zinc-100"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors outline-none"
        >
          <X size={16} />
        </button>

        <div className="p-6 md:p-8 text-left">
          <h2 className="text-xl md:text-2xl font-black text-zinc-950 tracking-tight">Account settings</h2>
          <p className="text-xs md:text-sm text-zinc-500 mt-1 mb-6">Manage your Innovators AI Hub account.</p>

          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Signed in as</p>
            <p className="text-sm font-bold text-zinc-950 truncate">{currentUser.name || '—'}</p>
            <p className="text-xs text-zinc-600 truncate">{currentUser.email}</p>
          </div>

          {onOpenMyPlan && (
            <button
              type="button"
              onClick={onOpenMyPlan}
              className="w-full mb-6 py-3 rounded-2xl border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors outline-none"
            >
              My Plan
            </button>
          )}

          {/* Danger zone */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <AlertTriangle size={15} />
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-rose-900">Delete account</h3>
                <p className="text-xs text-rose-800/80 mt-1 leading-relaxed">
                  Your account is removed from the sign-in index, so you can no longer sign in or rent agents
                  with this email. Your signup record is archived for our records and marked Deleted. This
                  cannot be undone from the website.
                </p>

                {state.kind === 'done' ? (
                  <p className="mt-4 text-xs font-semibold text-emerald-700 inline-flex items-center gap-1.5">
                    <Check size={14} /> Account deleted. Signing you out…
                  </p>
                ) : !confirming ? (
                  <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors outline-none"
                  >
                    <Trash2 size={13} />
                    <span>Delete account</span>
                  </button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <label className="block text-xs font-semibold text-rose-900">
                      Type your email ({currentUser.email}) to confirm
                    </label>
                    <input
                      type="email"
                      value={typed}
                      onChange={(e) => setTyped(e.target.value)}
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      placeholder={currentUser.email}
                      className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-rose-400 transition-colors"
                    />

                    <label className="flex items-start gap-2.5 text-xs text-rose-900">
                      <input
                        type="checkbox"
                        checked={acknowledged}
                        onChange={(e) => setAcknowledged(e.target.checked)}
                        className="mt-0.5"
                      />
                      <span>
                        I understand I will lose access to my account and any agents rented with this email.
                      </span>
                    </label>

                    {state.kind === 'error' && (
                      <p className="text-xs font-medium text-rose-700">{state.message}</p>
                    )}

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={!emailMatches || !acknowledged || state.kind === 'working'}
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed outline-none"
                      >
                        {state.kind === 'working' ? <Loader2 size={13} className="animate-spin" /> : null}
                        <span>Confirm deletion</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirming(false);
                          setTyped('');
                          setAcknowledged(false);
                          setState({ kind: 'idle' });
                        }}
                        className="text-xs font-semibold text-rose-800 hover:text-rose-900 underline underline-offset-2 outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSettingsModal;
