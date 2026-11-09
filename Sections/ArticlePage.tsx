import React from 'react';
import ARTICLES from '../content/articles.json';

export type ArticleSlug = keyof typeof ARTICLES;

interface ArticlePageProps {
  slug: ArticleSlug;
  navigateTo?: (page: any) => void;
}

type Section = {
  h2: string;
  paragraphs?: string[];
  list?: string[];
  /** Paragraphs rendered after the list/table, so a section can close with prose. */
  after?: string[];
  table?: { head: string[]; rows: string[][] };
};

const LINK_RE = /\[([^\]]+)\]\((\/[a-z0-9\-/]*)\)/g;

/** Renders `[label](/path)` inside copy as an in-app link; everything else is text. */
const withLinks = (text: string, navigateTo?: (page: any) => void): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const [, label, href] = match;
    out.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        onClick={(e) => {
          if (!navigateTo) return;
          e.preventDefault();
          navigateTo(href.replace(/^\//, ''));
        }}
        className="text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-2 hover:text-emerald-800"
      >
        {label}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const Prose: React.FC<{ text: string; navigateTo?: (page: any) => void }> = ({ text, navigateTo }) => (
  <p className="text-[17px] leading-[1.75] text-slate-700 mb-5">{withLinks(text, navigateTo)}</p>
);

const ArticlePage: React.FC<ArticlePageProps> = ({ slug, navigateTo }) => {
  const article = ARTICLES[slug];
  if (!article) return null;
  const sections = article.sections as Section[];
  const faq = article.faq as { q: string; a: string }[];
  const related = article.related as { href: string; label: string; text: string }[];

  return (
    <article className="bg-white text-slate-900">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 md:pt-40">
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo?.('platform'); }} className="hover:text-emerald-700">Home</a>
          <span className="mx-2">/</span>
          <span className="text-slate-500">Guides</span>
        </nav>

        <h1 className="text-[clamp(28px,4.4vw,44px)] font-extrabold leading-[1.15] tracking-[-0.02em] mb-6">
          {article.h1}
        </h1>

        <p className="text-[19px] leading-[1.7] text-slate-900 font-medium border-l-4 border-emerald-500 pl-5 mb-10">
          {withLinks(article.answer, navigateTo)}
        </p>

        {sections.map((section) => (
          <section key={section.h2} className="mb-10">
            <h2 className="text-[clamp(21px,2.6vw,27px)] font-bold leading-tight tracking-[-0.01em] mb-4 text-slate-900">
              {section.h2}
            </h2>
            {(section.paragraphs ?? []).map((p) => (
              <Prose key={p.slice(0, 40)} text={p} navigateTo={navigateTo} />
            ))}
            {section.list && (
              <ul className="mb-5 space-y-2.5">
                {section.list.map((item) => (
                  <li key={item.slice(0, 40)} className="text-[17px] leading-[1.7] text-slate-700 pl-6 relative">
                    <span className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {withLinks(item, navigateTo)}
                  </li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="mb-5 overflow-x-auto">
                <table className="w-full border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      {section.table.head.map((cell, i) => (
                        <th key={i} className="py-3 pr-4 font-bold text-slate-900 align-bottom">{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, r) => (
                      <tr key={r} className="border-b border-slate-100 align-top">
                        {row.map((cell, c) => (
                          <td key={c} className={`py-3 pr-4 leading-[1.6] ${c === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(section.after ?? []).map((p) => (
              <Prose key={p.slice(0, 40)} text={p} navigateTo={navigateTo} />
            ))}
          </section>
        ))}

        <section className="mb-10">
          <h2 className="text-[clamp(21px,2.6vw,27px)] font-bold leading-tight tracking-[-0.01em] mb-5 text-slate-900">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-[17px] font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-[16px] leading-[1.7] text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-7">
          <h2 className="text-[15px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">Where to go next</h2>
          <ul className="space-y-3">
            {related.map((link) => (
              <li key={link.href} className="text-[16px] leading-[1.6] text-slate-700">
                <a
                  href={link.href}
                  onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo(link.href.replace(/^\//, '')); } }}
                  className="font-semibold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-2"
                >
                  {link.label}
                </a>
                {' — '}{link.text}
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            onClick={(e) => { if (navigateTo) { e.preventDefault(); navigateTo('contact'); } }}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
          >
            Book a demo
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </article>
  );
};

export default ArticlePage;
