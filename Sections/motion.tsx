/**
 * motion.tsx — a ~7 KB, CSS-driven stand-in for the declarative slice of
 * framer-motion this site actually used.
 *
 * Nothing here is an animation library: every mount/enter/reveal animation is a
 * plain CSS `transition` on `opacity` / `transform` (or a native WAAPI
 * animation for the handful of infinite keyframe loops), and `whileInView` is an
 * IntersectionObserver. Durations, easings and delays come from the same
 * `transition` props the components already carry, so timings are unchanged.
 *
 * `AnimatePresence` keeps a removed child mounted for the length of its own
 * transition so exit animations still run.
 */
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

type Dict = Record<string, any>;
export type HTMLMotionProps<T extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T> & {
    initial?: Dict; animate?: Dict; exit?: Dict; transition?: Dict;
    whileHover?: Dict; whileTap?: Dict; whileInView?: Dict; viewport?: Dict;
    onAnimationComplete?: () => void; custom?: any; __exit?: boolean;
  };

/* ------------------------------------------------------------------ values */

export class MotionValue<T = number> {
  private v: T;
  private subs = new Set<(v: T) => void>();
  constructor(v: T) { this.v = v; }
  get() { return this.v; }
  set(v: T) { this.v = v; this.subs.forEach((f) => f(v)); }
  on(f: (v: T) => void) { this.subs.add(f); return () => { this.subs.delete(f); }; }
}

let sharedScrollY: MotionValue<number> | null = null;

export function useScroll() {
  if (!sharedScrollY) sharedScrollY = new MotionValue<number>(0);
  const mv = sharedScrollY;
  useEffect(() => {
    let raf = 0;
    const read = () => { raf = 0; mv.set(window.scrollY); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [mv]);
  return { scrollY: mv, scrollYProgress: mv };
}

const num = (v: any): number => (typeof v === 'number' ? v : parseFloat(v) || 0);
const unit = (v: any): string => (typeof v === 'string' && /[a-z%]+$/i.test(v) ? v.replace(/^[-\d.]+/, '') : '');

/** useTransform(source, [in...], [out...]) — linear interpolation, MotionValue in/out. */
export function useTransform(source: MotionValue<any>, input: number[] = [0, 1], output: any[] = [0, 1]): MotionValue<any> {
  const out = useRef(new MotionValue<any>(output[0])).current;
  useEffect(() => {
    const compute = (raw: any) => {
      const v = num(raw);
      if (v <= input[0]) return output[0];
      if (v >= input[input.length - 1]) return output[output.length - 1];
      let i = 0;
      while (i < input.length - 2 && v > input[i + 1]) i++;
      const span = input[i + 1] - input[i] || 1;
      const t = (v - input[i]) / span;
      const a = output[i], b = output[i + 1];
      if (typeof a === 'number' && typeof b === 'number') return a + (b - a) * t;
      const u = unit(b) || unit(a);
      return `${num(a) + (num(b) - num(a)) * t}${u}`;
    };
    out.set(compute(source.get()));
    return source.on((v) => out.set(compute(v)));
  }, [source]);
  return out;
}

/** useSpring(source) — critically damped-ish follow, computed on rAF. */
export function useSpring(source: MotionValue<number>, _opts?: Dict): MotionValue<number> {
  const out = useRef(new MotionValue<number>(num(source.get()))).current;
  useEffect(() => {
    let target = num(source.get());
    let value = target;
    let raf = 0;
    const tick = () => {
      value += (target - value) * 0.22;
      out.set(value);
      if (Math.abs(target - value) > 0.0005) raf = requestAnimationFrame(tick);
      else { out.set(target); raf = 0; }
    };
    const off = source.on((v) => {
      target = num(v);
      if (!raf) raf = requestAnimationFrame(tick);
    });
    return () => { off(); if (raf) cancelAnimationFrame(raf); };
  }, [source]);
  return out;
}

export const useMotionValue = (v: number) => useRef(new MotionValue<number>(v)).current;

/* -------------------------------------------------------------- style math */

const TRANSFORM_KEYS = new Set(['x', 'y', 'scale', 'rotate', 'rotateX', 'rotateY', 'scaleX', 'scaleY']);

function buildCss(vals: Dict | undefined): Dict {
  const css: Dict = {};
  const tf: string[] = [];
  if (!vals) return css;
  for (const k of Object.keys(vals)) {
    const v = vals[k];
    if (v === undefined) continue;
    if (k === 'x') tf.push(`translateX(${typeof v === 'number' ? `${v}px` : v})`);
    else if (k === 'y') tf.push(`translateY(${typeof v === 'number' ? `${v}px` : v})`);
    else if (k === 'scale') tf.push(`scale(${v})`);
    else if (k === 'scaleX') tf.push(`scaleX(${v})`);
    else if (k === 'scaleY') tf.push(`scaleY(${v})`);
    else if (k === 'rotate') tf.push(`rotate(${typeof v === 'number' ? `${v}deg` : v})`);
    else if (k === 'rotateX' || k === 'rotateY') tf.push(`${k}(${typeof v === 'number' ? `${v}deg` : v})`);
    else if (k === 'transition' || k === 'transitionEnd' || k === 'onTransitionEnd') continue;
    else css[k] = v;
  }
  if (tf.length) css.transform = tf.join(' ');
  return css;
}

const EASE: Dict = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  circOut: 'cubic-bezier(0, 0.55, 0.45, 1)',
  backOut: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
  anticipate: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
};

function easeCss(e: any, type?: string) {
  if (Array.isArray(e)) return `cubic-bezier(${e.join(', ')})`;
  if (typeof e === 'string' && EASE[e]) return EASE[e];
  if (type === 'spring') return 'cubic-bezier(0.34, 1.28, 0.64, 1)';
  return 'cubic-bezier(0.25, 0.1, 0.25, 1)';
}

function timing(tr: Dict | undefined) {
  const t = tr || {};
  const duration = typeof t.duration === 'number' ? t.duration : t.type === 'spring' ? 0.45 : 0.3;
  return { duration, delay: typeof t.delay === 'number' ? t.delay : 0, ease: easeCss(t.ease, t.type), repeat: t.repeat };
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Apply a set of motion values to an element as plain CSS (transitioned). */
function paint(el: HTMLElement, vals: Dict | undefined, tr: Dict | undefined, immediate = false) {
  const css = buildCss(vals);
  const props = Object.keys(css);
  const { duration, delay, ease } = timing(tr);
  if (immediate || reduced()) {
    el.style.transition = 'none';
    el.style.height = css.height === 'auto' ? 'auto' : css.height ?? el.style.height;
    Object.assign(el.style, css.height === 'auto' ? { ...css, height: 'auto' } : css);
    return;
  }
  el.style.transition = props.map((p) => `${p} ${duration}s ${ease} ${delay}s`).join(', ');
  if (css.height === 'auto') {
    css.height = `${el.scrollHeight}px`;
    window.setTimeout(() => { el.style.height = 'auto'; }, duration * 1000 + delay * 1000 + 20);
  }
  Object.assign(el.style, css);
}

function paintKeyframes(el: HTMLElement, vals: Dict, tr: Dict | undefined) {
  const { duration, delay, ease, repeat } = timing(tr);
  const len = Math.max(...Object.values(vals).map((v) => (Array.isArray(v) ? v.length : 1)));
  const frames: Dict[] = [];
  for (let i = 0; i < len; i++) {
    const frame: Dict = {};
    for (const k of Object.keys(vals)) {
      const v = vals[k];
      frame[k] = Array.isArray(v) ? v[Math.min(i, v.length - 1)] : v;
    }
    frames.push(buildCss(frame));
  }
  if (reduced()) { Object.assign(el.style, frames[frames.length - 1]); return; }
  el.getAnimations().forEach((a) => a.cancel());
  el.animate(frames as Keyframe[], {
    duration: duration * 1000,
    delay: delay * 1000,
    easing: ease.startsWith('cubic-bezier') || ease === 'linear' ? ease : 'ease',
    iterations: repeat === Infinity ? Infinity : 1,
    fill: 'both',
  });
}

const hasKeyframes = (vals?: Dict) => !!vals && Object.values(vals).some((v) => Array.isArray(v));

/* ------------------------------------------------------------- the element */

const cache = new Map<string, any>();

function element(tag: string) {
  if (cache.has(tag)) return cache.get(tag);

  const Comp = forwardRef<any, any>((props, ref) => {
    const {
      initial, animate, exit: exitProps, transition, whileHover, whileTap, whileInView,
      viewport, custom, onAnimationComplete, style, children, __exit, ...rest
    } = props;
    const own = useRef<any>(null);
    const started = useRef(false);
    const baseStyle = useRef<Dict>({});   // the values the element idles at
    const setRef = useCallback((n: any) => { own.current = n; if (typeof ref === 'function') ref(n); else if (ref) ref.current = n; }, [ref]);

    /* subscribe any MotionValues that arrive through `style` (parallax, tilt) */
    const motionStyle = useRef<Dict>({});
    useEffect(() => {
      const el = own.current as HTMLElement | null;
      if (!el) return;
      const subs: Array<() => void> = [];
      const apply = () => {
        const vals: Dict = {};
        for (const k of Object.keys(motionStyle.current)) {
          const v = motionStyle.current[k];
          if (v instanceof MotionValue) vals[k] = v.get();
        }
        Object.assign(el.style, buildCss(vals));
      };
      for (const k of Object.keys(motionStyle.current)) {
        const v = motionStyle.current[k];
        if (v instanceof MotionValue) subs.push(v.on(apply));
      }
      apply();
      return () => subs.forEach((f) => f());
    }, [style]);

    /* entrance / reveal */
    const animateKey = JSON.stringify(animate ?? null);
    useEffect(() => {
      const el = own.current as HTMLElement | null;
      if (!el || typeof el.animate !== 'function' && !el.style) return;
      const tr = transition || {};

      if (__exit) {                       // AnimatePresence keeps us for this
        const target = exitProps || { opacity: 0 };
        if (hasKeyframes(target)) paintKeyframes(el, target, tr);
        else paint(el, target, tr);
        return;
      }

      const target = animate || {};
      if (hasKeyframes(target)) { paintKeyframes(el, target, tr); baseStyle.current = {}; return; }

      baseStyle.current = buildCss(target);

      if (!started.current) {
        started.current = true;
        if (initial && !whileInView) paint(el, initial, undefined, true);
        if (whileInView) {
          const { once = true, amount = 0.2, margin = '0px' } = viewport || {};
          const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                paint(el, { ...(initial || {}), ...target }, tr);
                if (once) io.disconnect();
              }
            }
          }, { threshold: Math.min(Math.max(typeof amount === 'number' ? amount : 0.2, 0), 1),
               rootMargin: typeof margin === 'string' ? margin : '0px' });
          io.observe(el);
          const cleanup = () => io.disconnect();
          (el as any).__io = cleanup;
        } else if (initial) {
          requestAnimationFrame(() => requestAnimationFrame(() => paint(el, target, tr)));
        } else {
          paint(el, target, tr);
        }
      } else {
        // a later `animate` change (state driven): transition to the new values
        paint(el, target, tr);
      }
      if (onAnimationComplete) {
        const { duration, delay } = timing(tr);
        window.setTimeout(onAnimationComplete, (duration + delay) * 1000);
      }
    }, [animateKey, __exit]);

    const hoverIn = useCallback((e: React.PointerEvent) => {
      if (whileHover) paint(own.current, { ...baseStyle.current, ...buildCss(whileHover) }, { duration: 0.2, ease: 'easeOut' });
      rest.onPointerEnter?.(e as any);
    }, [whileHover]);
    const down = useCallback((e: React.PointerEvent) => {
      if (whileTap) paint(own.current, { ...baseStyle.current, ...buildCss(whileTap) }, { duration: 0.12, ease: 'easeOut' });
      rest.onPointerDown?.(e as any);
    }, [whileTap]);
    const leaveOrUp = useCallback((e: React.PointerEvent) => {
      if (whileHover || whileTap) paint(own.current, baseStyle.current, { duration: 0.2, ease: 'easeOut' });
      rest.onPointerLeave?.(e as any);
      rest.onPointerUp?.(e as any);
    }, [whileHover, whileTap]);

    const styleOut: Dict = {};
    if (style) {
      for (const k of Object.keys(style)) {
        if (style[k] instanceof MotionValue) {
          const v = style[k] as MotionValue<any>;
          motionStyle.current[k] = v;
          if (!TRANSFORM_KEYS.has(k)) styleOut[k] = v.get();
        } else styleOut[k] = style[k];
      }
    }

    return React.createElement(tag, {
      ref: setRef,
      ...rest,
      style: styleOut,
      onPointerEnter: whileHover ? hoverIn : rest.onPointerEnter,
      onPointerDown: whileTap ? down : rest.onPointerDown,
      onPointerLeave: (whileHover || whileTap) ? leaveOrUp : rest.onPointerLeave,
      onPointerUp: (whileHover || whileTap) ? leaveOrUp : rest.onPointerUp,
    }, children);
  });
  Comp.displayName = `motion.${tag}`;
  cache.set(tag, Comp);
  return Comp;
}

export const motion: any = new Proxy({}, {
  get(_t, tag: string) {
    if (tag === 'create') return (c: any) => c;
    return element(tag);
  },
});

/* ---------------------------------------------------------- presence cache */

export const AnimatePresence: React.FC<React.PropsWithChildren<{ initial?: boolean; mode?: string }>> = ({ children }) => {
  const kids = React.Children.toArray(children).filter(Boolean) as React.ReactElement[];
  const prev = useRef<React.ReactElement[]>([]);
  const [leaving, setLeaving] = useState<React.ReactElement[]>([]);
  const keyOf = (k: React.ReactElement) => String(k.key ?? '');

  useEffect(() => {
    const now = new Set(kids.map(keyOf));
    const gone = prev.current.filter((k) => !now.has(keyOf(k)));
    prev.current = kids;
    if (!gone.length) return;
    const clones = gone.map((k) => React.cloneElement(k as any, { __exit: true }));
    setLeaving((l) => [...l, ...clones]);
    const ms = Math.max(...gone.map((k) => {
      const t = (k.props as any)?.transition || {};
      return (typeof t.duration === 'number' ? t.duration : 0.3) * 1000;
    })) + 30;
    const ids = new Set(clones.map(keyOf));
    window.setTimeout(() => setLeaving((l) => l.filter((x) => !ids.has(keyOf(x)))), ms);
  }, [kids.map(keyOf).join('|')]);

  return React.createElement(React.Fragment, null, ...[...kids, ...leaving]);
};
