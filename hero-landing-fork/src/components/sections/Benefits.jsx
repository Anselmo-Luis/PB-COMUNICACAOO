import { useReveal } from '../../hooks/useReveal';
import StepIcon from '../icons/StepIcon';
import { siteData } from '../../data/siteData';

function BenefitCard({ benefit, index }) {
  return (
    <article className="editorial-surface-light benefit-row rounded-[1.75rem] p-6 sm:p-8">
      <div className="benefit-row-layout">
        <div className="benefit-row-meta">
          <span className="benefit-row-index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="benefit-row-icon">
            <StepIcon name={benefit.icon} />
          </div>
        </div>

        <div className="benefit-row-copy">
          <h3 className="benefit-row-title">{benefit.title}</h3>
          <p className="benefit-row-description">{benefit.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function Benefits() {
  const revealRef = useReveal();
  const { whyUs } = siteData;

  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="relative z-10 bg-[var(--color-pb-white)] px-6 py-6">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{whyUs.label}</span>
            <h2 id="sobre-heading" className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-accent-blue)] sm:text-4xl md:text-5xl">
              {whyUs.headline.before} {whyUs.headline.accent}
              {whyUs.headline.after && ` ${whyUs.headline.after}`}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {whyUs.subheadline}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyUs.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="metric-tile-light rounded-2xl p-5">
                  <div className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-pb-ink)] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug uppercase tracking-[0.14em] text-[var(--color-pb-ink-2)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="benefits-list lg:h-full">
            {whyUs.benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
