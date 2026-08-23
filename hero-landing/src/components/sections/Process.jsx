import { FileText, Diamond, Truck } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';
import ShowcaseSlideshow from '../ui/ShowcaseSlideshow';

const stepIcons = {
  document: <FileText size={14} strokeWidth={2} />,
  diamond:  <Diamond  size={14} strokeWidth={2} />,
  truck:    <Truck    size={14} strokeWidth={2} />,
};

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

          <div className="relative space-y-5 lg:pl-10">
            <div className="absolute bottom-5 left-7 top-5 hidden w-px bg-gradient-to-b from-[rgba(26,122,23,0.4)] via-black/8 to-transparent lg:block" />
            {process.steps.map((step, index) => (
              <article key={index} className="editorial-surface-light relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute right-4 bottom-0 font-[var(--font-display)] font-black leading-none select-none pointer-events-none z-0"
                  style={{ fontSize: 'clamp(3.5rem,10vw,6rem)', color: 'rgba(0,0,0,0.05)' }}
                >
                  {step.num}
                </span>

                <div className="relative grid gap-5 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-7">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                    <img src={step.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <div
                      className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-pb-accent-on-light)]"
                      style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                    >
                      {stepIcons[step.icon]}
                    </div>
                  </div>

                  <div className="min-w-0 border-t border-black/8 pt-5 lg:border-l lg:border-t-0 lg:border-black/8 lg:pl-7 lg:pt-0">
                    <span
                      className="inline-block font-[var(--font-display)] text-xs font-bold tracking-widest mb-2"
                      style={{
                        background: 'rgba(26,122,23,0.08)',
                        border: '1px solid rgba(26,122,23,0.25)',
                        borderRadius: '0.5rem',
                        padding: '0.15rem 0.6rem',
                        color: 'var(--color-pb-accent-on-light)',
                      }}
                    >
                      {step.num}
                    </span>
                    <h3 className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.96rem]">
                      {step.description}
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
