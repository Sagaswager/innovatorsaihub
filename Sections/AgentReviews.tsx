import React, { useEffect, useState } from 'react';
import { Star, Loader2, Check } from 'lucide-react';
import { fetchReviews, submitReview, type ReviewStats } from '../authApi';

interface AgentReviewsProps {
  agentTitle: string;
  currentUser: { name: string; email: string } | null;
  /** Asks the parent to open the sign-in modal when a visitor wants to review. */
  onRequireSignIn?: () => void;
}

const emptyStats = (agent: string): ReviewStats => ({
  agent,
  average: 0,
  count: 0,
  distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
  reviews: [],
});

const Stars: React.FC<{ value: number; size?: number }> = ({ value, size = 14 }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={n <= Math.round(value) ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-300'}
      />
    ))}
  </span>
);

/**
 * Ratings & reviews (Task 8).
 * Everything shown here comes from real submitted reviews — averages, counts and
 * the 1-5 breakdown are computed from the "Agent Reviews" sheet tab.
 */
const AgentReviews: React.FC<AgentReviewsProps> = ({ agentTitle, currentUser, onRequireSignIn }) => {
  const [stats, setStats] = useState<ReviewStats>(() => emptyStats(agentTitle));
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [status, setStatus] = useState<{ kind: 'idle' | 'saving' | 'ok' | 'error'; message?: string }>({
    kind: 'idle',
  });

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setStatus({ kind: 'idle' });
    setRating(0);
    setText('');
    fetchReviews(agentTitle).then((result) => {
      if (!alive) return;
      setStats(result);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [agentTitle]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser) {
      onRequireSignIn?.();
      return;
    }
    if (!rating) {
      setStatus({ kind: 'error', message: 'Pick a star rating first.' });
      return;
    }
    setStatus({ kind: 'saving' });
    const result = await submitReview({
      agent: agentTitle,
      rating,
      review: text,
      email: currentUser.email,
      name: currentUser.name,
    });
    if (result.ok) {
      setStats(result.stats);
      setText('');
      setRating(0);
      setStatus({
        kind: 'ok',
        message: result.updated ? 'Your review was updated. Thank you!' : 'Thank you — your review is live.',
      });
    } else {
      setStatus({ kind: 'error', message: result.message });
    }
  };

  const total = stats.count;
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const n = Number(stats.distribution?.[String(star)] || 0);
    return { star, n, pct: total ? Math.round((n / total) * 100) : 0 };
  });

  return (
    <div className="mt-8 pt-8 border-t border-zinc-100 text-left">
      <h3 className="text-base md:text-lg font-bold text-zinc-900 mb-1">Ratings &amp; reviews</h3>
      <p className="text-xs md:text-sm text-zinc-500 mb-6">
        Every number here is calculated from reviews submitted on this page.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-500 text-sm">
          <Loader2 size={15} className="animate-spin" />
          <span>Loading reviews…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Summary + breakdown */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl md:text-4xl font-black text-zinc-950">
                {total ? stats.average.toFixed(1) : '—'}
              </span>
              <div className="flex flex-col">
                <Stars value={stats.average} />
                <span className="text-xs text-zinc-500 mt-0.5">
                  {total === 1 ? '1 review' : `${total} reviews`}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {breakdown.map((row) => (
                <div key={row.star} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-zinc-600 w-8">{row.star}★</span>
                  <span className="flex-1 h-2 rounded-full bg-zinc-100 overflow-hidden">
                    <span
                      className="block h-full rounded-full bg-yellow-400"
                      style={{ width: `${row.pct}%` }}
                    />
                  </span>
                  <span className="text-xs text-zinc-500 w-10 text-right">{row.n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Written reviews */}
          <div>
            {total === 0 ? (
              <p className="text-sm text-zinc-500">
                No reviews yet — be the first to rate {agentTitle}.
              </p>
            ) : (
              <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {stats.reviews.map((review, index) => (
                  <li key={`${review.name}-${index}`} className="bg-zinc-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-zinc-900">{review.name || 'Anonymous'}</span>
                      <Stars value={review.rating} size={12} />
                    </div>
                    {review.review ? (
                      <p className="text-xs md:text-sm text-zinc-700 leading-relaxed">{review.review}</p>
                    ) : (
                      <p className="text-xs text-zinc-400 italic">Rating only</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Submission */}
      <form onSubmit={handleSubmit} className="mt-8 bg-zinc-50 rounded-2xl p-5">
        <p className="text-sm font-bold text-zinc-900 mb-3">
          {currentUser ? `Rate ${agentTitle}` : 'Sign in to rate this agent'}
        </p>

        <div className="flex items-center gap-1.5 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className="p-0.5 outline-none transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={n <= (hover || rating) ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-300'}
              />
            </button>
          ))}
          {rating > 0 && <span className="text-xs font-semibold text-zinc-600 ml-2">{rating}/5</span>}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={1500}
          placeholder={currentUser ? 'Share what worked (optional)' : 'Sign in to write a review'}
          disabled={!currentUser}
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400 transition-colors"
        />

        {status.kind === 'error' && (
          <p className="mt-3 text-xs font-medium text-rose-600">{status.message}</p>
        )}
        {status.kind === 'ok' && (
          <p className="mt-3 text-xs font-medium text-emerald-600 inline-flex items-center gap-1.5">
            <Check size={13} /> {status.message}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 mt-4">
          <p className="text-[11px] text-zinc-500">
            One review per email per agent — submitting again updates your existing review.
          </p>
          <button
            type="submit"
            disabled={status.kind === 'saving'}
            className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 inline-flex items-center gap-2 outline-none"
          >
            {status.kind === 'saving' ? <Loader2 size={13} className="animate-spin" /> : null}
            <span>{currentUser ? 'Submit review' : 'Sign in'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentReviews;
