import { Eye, ShieldCheck, Expand } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

const benefitIcons = {
  eye:    <Eye    size={28} strokeWidth={1.5} />,
  shield: <ShieldCheck size={28} strokeWidth={1.5} />,
  expand: <Expand      size={28} strokeWidth={1.5} />,
};

export default function Benefits() {
  const revealRef = useReveal();
  const { whyUs } = siteData;

  return (
    <section id="sobre" className="relative z-10 bg-[var(--color-pb-white)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{whyUs.label}</span>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
              {whyUs.headline.before} <span className="accent-gradient-light">{whyUs.headline.accent}</span> {whyUs.headline.after}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {whyUs.subheadline}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {whyUs.stats.map((stat, index) => (
                <div key={index} className="metric-tile-light rounded-2xl p-5">
                  <div className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-pb-ink)] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--color-pb-ink-2)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {whyUs.benefits.map((benefit, index) => (
              <article key={index} className="editorial-surface-light benefit-row rounded-[1.75rem] p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                    <span className="font-[var(--font-display)] text-xs font-bold tracking-[0.35em] text-[var(--color-pb-ink-2)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--color-pb-accent-on-light)]"
                      style={{ background: 'linear-gradient(135deg, rgba(26,122,23,0.1), rgba(0,113,227,0.05))' }}
                    >
                      {benefitIcons[benefit.icon]}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-2xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.96rem]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
