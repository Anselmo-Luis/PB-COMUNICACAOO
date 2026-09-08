import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

const FILL_LOGOS = {
  Sonda: 'client-logo-card--sonda',
  Adias: 'client-logo-card--adias',
};

function ClientLogoSequence({ logos, duplicate = false }) {
  return (
    <ul className="client-logo-sequence" aria-hidden={duplicate ? 'true' : undefined}>
      {logos.map((logo) => {
        const fillClass = FILL_LOGOS[logo.name];
        return (
          <li
            key={`${logo.name}-${duplicate ? 'duplicate' : 'primary'}`}
            className={`client-logo-card${fillClass ? ` client-logo-card--fill ${fillClass}` : ''}`}
          >
            <img
              src={logo.src}
              alt={duplicate ? '' : `${logo.name}, cliente da P&B`}
              width={220}
              height={100}
              loading="lazy"
              decoding="async"
            />
          </li>
        );
      })}
    </ul>
  );
}

function ClientLogoRail({ logos }) {
  return (
    <div className="client-logo-rail">
      <div className="client-logo-track">
        <ClientLogoSequence logos={logos} />
        <ClientLogoSequence logos={logos} duplicate />
      </div>
    </div>
  );
}

export default function TrustLogos() {
  const revealRef = useReveal();
  const { clients } = siteData;

  return (
    <section
      className="clients-section relative z-10 bg-[var(--color-pb-surface)] py-4"
      aria-label={clients.label}
    >
      <div ref={revealRef} className="reveal-section">
        <div className="mx-auto max-w-7xl px-6">
          <span className="section-kicker-light">{clients.label}</span>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-3xl">
            Clientes que confiam no nosso trabalho
          </h2>
        </div>

        <div className="client-logo-marquee mt-8" aria-label="Logos dos clientes da P&B">
          <ClientLogoRail logos={clients.logos} />
        </div>
      </div>
    </section>
  );
}
