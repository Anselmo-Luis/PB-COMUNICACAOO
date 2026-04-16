import { FileText, Diamond, Truck } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

const stepIcons = {
  document: <FileText size={32} strokeWidth={1.5} />,
  diamond:  <Diamond  size={32} strokeWidth={1.5} />,
  truck:    <Truck    size={32} strokeWidth={1.5} />,
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
          </div>

          <div className="relative space-y-5 lg:pl-10">
            <div className="absolute bottom-5 left-7 top-5 hidden w-px bg-gradient-to-b from-[rgba(26,122,23,0.4)] via-black/8 to-transparent lg:block" />
            {process.steps.map((step, index) => (
              <article key={index} className="editorial-surface-light rounded-[1.75rem] p-6 sm:p-8">
                <div className="grid gap-5 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-7">
                  <div className="relative flex items-start gap-4 lg:block">
                    <span className="font-[var(--font-display)] text-4xl font-bold leading-none text-[var(--color-pb-ink-2)] sm:text-5xl" style={{ opacity: 0.18 }}>
                      {step.num}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--color-pb-accent-on-light)] lg:mt-4"
                      style={{ background: 'linear-gradient(135deg, rgba(26,122,23,0.1), rgba(0,113,227,0.05))' }}
                    >
                      {stepIcons[step.icon]}
                    </div>
                  </div>

                  <div className="min-w-0 border-t border-black/8 pt-5 lg:border-l lg:border-t-0 lg:border-black/8 lg:pl-7 lg:pt-0">
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
