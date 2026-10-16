import React, { useEffect, useState } from 'react';
import { Maximize2, Minimize2, Play } from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Small click-to-expand demo player.
 *
 * Shows a compact 16:9 tile next to the copy it belongs to. Clicking it
 * expands the video into a full-screen overlay; the minimise button (or
 * Escape) puts it back. The frame is only mounted while expanded, so nothing
 * streams — and no Drive chrome shows — until the visitor asks for it.
 *
 * `driveId` is a Google Drive file id. The file must be shared as
 * "Anyone with the link — Viewer", otherwise Drive answers 401 and the frame
 * shows a sign-in page instead of the video.
 * ------------------------------------------------------------------ */

interface DemoVideoProps {
  driveId?: string;
  /** used instead of driveId when the video is hosted directly */
  src?: string;
  title?: string;
  label?: string;
  /** thumbnail shown on the collapsed tile */
  poster?: string;
}

const DemoVideo: React.FC<DemoVideoProps> = ({
  driveId,
  src,
  title = 'Product demo',
  label = 'Watch demo',
  poster,
}) => {
  const [expanded, setExpanded] = useState(false);
  const embedUrl = src || (driveId ? `https://drive.google.com/file/d/${driveId}/preview` : '');
  const thumbnail = poster || (driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000` : '');

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [expanded]);

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label={`${label} — ${title}, expands to full screen`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lg shadow-slate-200/60 transition-all hover:border-slate-300 hover:shadow-xl outline-none"
      >
        <span className="block aspect-video w-full">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              onError={(event) => {
                (event.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="block h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
          )}
        </span>

        {/* play affordance */}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
            <Play size={20} className="ml-0.5 fill-slate-900 text-slate-900" />
          </span>
          <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            {label}
          </span>
        </span>

        <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white">
          <Maximize2 size={13} />
        </span>
      </button>

      {expanded && (
        <div
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-slate-950/90 p-3 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — full screen`}
        >
          <div className="mb-3 flex w-full max-w-5xl items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">{title}</span>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20"
            >
              <Minimize2 size={14} />
              Minimise
            </button>
          </div>

          <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <div className="aspect-video w-full">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-white/60">
                  No video source configured.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoVideo;
