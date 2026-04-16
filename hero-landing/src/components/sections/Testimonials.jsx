import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

export default function Testimonials() {
  const revealRef = useReveal();
  const { testimonials } = siteData;
  const [featured, ...rest] = testimonials.items;

  return (
    <section id="depoimentos" className="relative z-10 bg-[var(--color-pb-white)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <span className="section-kicker-light">{testimonials.label}</span>
          <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
            {testimonials.headline.before} <span className="accent-gradient-light">{testimonials.headline.accent}</span> {testimonials.headline.after}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
          <article className="editorial-surface-light quote-panel-feature rounded-[1.85rem] p-8 sm:p-10 md:p-12">
            <div className="text-6xl leading-none text-[var(--color-pb-accent-on-light)]">"</div>
            <p className="mt-6 max-w-3xl font-[var(--font-display)] text-2xl leading-[1.35] tracking-tight text-[var(--color-pb-ink)] sm:text-3xl">
              {featured.quote}
            </p>
            <div className="mt-10 border-t border-black/8 pt-5">
              <p className="font-[var(--font-display)] text-base font-semibold text-[var(--color-pb-ink)]">{featured.name}</p>
              <p className="mt-1 text-sm text-[var(--color-pb-ink-2)]">{featured.role}</p>
            </div>
          </article>

          <div className="space-y-6">
            {rest.map((item, index) => (
              <article
                key={index}
                className="editorial-surface-soft-light rounded-[1.6rem] p-7 sm:p-8 transition-colors duration-300 hover:border-[rgba(26,122,23,0.22)]"
              >
                <div className="text-4xl leading-none text-[var(--color-pb-accent-on-light)]">"</div>
                <p className="mt-4 text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.96rem]">
                  {item.quote}
                </p>
                <div className="mt-6 border-t border-black/8 pt-4">
                  <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-pb-ink)]">{item.name}</p>
                  <p className="mt-1 text-xs text-[var(--color-pb-ink-2)]">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
