import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

export default function Features() {
  const revealRef = useReveal();
  const { materials } = siteData;

  return (
    <section className="relative z-10 bg-[var(--color-pb-surface)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{materials.label}</span>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
              {materials.headline.before} <span className="accent-gradient-light">{materials.headline.accent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {materials.subheadline}
            </p>
          </div>

          <div className="editorial-surface-light rounded-[1.75rem] px-6 sm:px-8">
            {materials.items.map((item, index) => (
              <article key={index} className="spec-row-light">
                <div className="font-[var(--font-display)] text-xs font-bold tracking-[0.34em] text-[var(--color-pb-ink-2)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.95rem]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
