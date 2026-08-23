import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';
import ShowcaseSlideshow from '../ui/ShowcaseSlideshow';

export default function Process() {
  const revealRef = useReveal();
  const { process } = siteData;

  return (
    <section className="relative z-10 bg-[var(--color-pb-surface)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{process.label}</span>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
              {process.headline.before} <span className="accent-gradient-light">{process.headline.accent}</span> {process.headline.after}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {process.subheadline}
            </p>

            {process.showcaseImages?.length > 0 && (
              <ShowcaseSlideshow images={process.showcaseImages} />
            )}
          </div>

          <div className="editorial-surface-light rounded-[1.75rem] px-6 sm:px-8">
            {process.steps.map((step, index) => (
              <article key={index} className="spec-row-light">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={step.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-[var(--font-display)] text-xs font-bold tracking-[0.34em] text-[var(--color-pb-ink-2)]">
                    {step.num}
                  </div>
                  <h3 className="mt-1 font-[var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-xl">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.95rem]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
