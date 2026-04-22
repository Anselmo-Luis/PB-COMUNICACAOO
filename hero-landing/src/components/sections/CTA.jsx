import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';
import MagneticButton from '../ui/MagneticButton';
import { siteData } from '../../data/siteData';

export default function CTA() {
  const revealRef = useReveal();
  const trustPoints = siteData.ctaBanner.trustLine.split(' • ');

  return (
    <section className="relative z-10 overflow-hidden bg-[var(--color-pb-surface)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-6xl">
        <div className="cta-panel-light rounded-[2rem] p-8 sm:p-10 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
            <div>
              <span className="section-kicker-light">Solicite seu orcamento</span>
              <h2 className="mt-6 font-[var(--font-display)] text-4xl font-bold leading-[1.04] tracking-tight text-[var(--color-pb-ink)] sm:text-5xl md:text-6xl">
                {siteData.ctaBanner.headline.before}
                {siteData.ctaBanner.headline.lineBreak && <br />}
                <span className="accent-gradient-light">{siteData.ctaBanner.headline.accent}</span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
                {siteData.ctaBanner.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {trustPoints.map((item, index) => (
                  <span key={item} className="cta-trust-chip-light cta-chip-motion" style={{ '--i': index }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {siteData.ctaBanner.ctas.map((cta) => {
                if (cta.variant === 'primary') {
                  return (
                    <MagneticButton key={cta.text} strength={0.35} className="w-full">
                      <a
                        href={siteData.contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-primary-button group relative flex w-full items-center justify-between rounded-[1.35rem] px-6 py-5 font-semibold text-white"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-pb-accent-on-light), var(--color-pb-accent-blue))',
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <MessageSquare size={20} strokeWidth={1.75} aria-hidden="true" />
                          {cta.text}
                        </span>
                        <ArrowRight
                          size={20}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </a>
                    </MagneticButton>
                  );
                }

                if (cta.variant === 'phone') {
                  return (
                    <MagneticButton key={cta.text} strength={0.25} className="w-full">
                      <a
                        href={siteData.contact.phoneLink}
                        className="cta-secondary-button-light editorial-surface-soft-light flex w-full items-center justify-between rounded-[1.35rem] px-6 py-5 text-[var(--color-pb-ink-2)]"
                      >
                        <span className="flex items-center gap-3">
                          <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                          {cta.text}
                        </span>
                        <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-pb-ink-2)]" style={{ opacity: 0.5 }}>Ligar</span>
                      </a>
                    </MagneticButton>
                  );
                }

                return null;
              })}

              <div className="cta-contact-card-light editorial-surface-soft-light rounded-[1.35rem] px-6 py-5 text-sm text-[var(--color-pb-ink-2)]">
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-pb-ink-2)]" style={{ opacity: 0.5 }}>Contato direto</div>
                <div className="mt-3 space-y-2">
                  <a href={`mailto:${siteData.contact.email}`} className="block text-[var(--color-pb-ink)] transition-colors hover:text-[var(--color-pb-accent-on-light)]">
                    {siteData.contact.email}
                  </a>
                  <p>{siteData.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
