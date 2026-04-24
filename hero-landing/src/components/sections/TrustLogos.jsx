import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

export default function TrustLogos() {
  const revealRef = useReveal();
  const doubled = [...siteData.clients.logos, ...siteData.clients.logos];
  const clientCount = siteData.clients.logos.length;

  return (
    <section
      className="relative z-10 border-y border-black/[0.06] bg-[var(--color-pb-surface)] py-14"
      aria-label={siteData.clients.label}
    >
      <div ref={revealRef} className="reveal-section mx-auto mb-8 max-w-7xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-kicker-light">{siteData.clients.label}</span>
          </div>
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-pb-ink-2)]" style={{ opacity: 0.5 }}>
            {clientCount} marcas em destaque
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden py-3"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 96px, black calc(100% - 96px), transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 96px, black calc(100% - 96px), transparent 100%)',
        }}
      >
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', width: 'max-content' }}>
          {doubled.map((name, index) => {
            const logoCount = siteData.clients.logos.length;
            const isDuplicate = index >= logoCount;

            return (
              <div
                key={`${name}-${index}`}
                className="logo-glass-card-light"
                style={{ '--i': index % logoCount }}
                aria-hidden={isDuplicate || undefined}
              >
                <img
                  src={`/assets/clients/${name}.jpg`}
                  alt={name.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())}
                  style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
