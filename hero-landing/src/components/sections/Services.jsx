import { useState, useEffect } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

// ── SVG icons por serviço ──────────────────────────────────────────────────
const SERVICE_ICONS = [
  // Veículos — carro/van
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14l4 4v4a2 2 0 01-2 2h-2" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>,
  // Frota — caminhão
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 16V7a1 1 0 011-1h11v10" />
    <path d="M13 10h4l4 3v3h-8" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>,
  // Totens — placa autoportante
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="16" rx="1.5" />
    <path d="M9 22h6M12 18v4" />
  </svg>,
  // Fachadas — loja
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-5h16l1 5" />
    <path d="M4 9v11h16V9M9 20v-6h6v6" />
  </svg>,
  // Painéis — mural/quadro na parede
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="13" rx="1.5" />
    <path d="M3 17l5-5 4 4 3-3 6 4" />
  </svg>,
  // Banners — flag/banner
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 3v18M4 3h14l-3 5 3 5H4" />
  </svg>,
  // Produção — impressora
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9V3h12v6" />
    <rect x="3" y="9" width="18" height="8" rx="1.5" />
    <path d="M6 17v4h12v-4" />
  </svg>,
];

// ── Navigator tabs ────────────────────────────────────────────────────────
function ServiceNavTabs({ items, activeIndex, onTabClick }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => onTabClick(i)}
          className={`service-nav-tab-light${activeIndex === i ? ' active' : ''}`}
        >
          {item.category || item.title.split(' ')[0]}
        </button>
      ))}
    </div>
  );
}

// ── Individual service card ───────────────────────────────────────────────
// Declared at module scope so useReveal() call is unconditional (Rules of Hooks)
function ServiceCard({ service, index, ctaText }) {
  const revealRef = useReveal();
  const num = String(index + 1).padStart(2, '0');
  const gallery = service.gallery?.length ? service.gallery : [service.image];
  const icon = SERVICE_ICONS[index] ?? SERVICE_ICONS[0];

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (service.video || gallery.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % gallery.length), 3800);
    return () => clearInterval(id);
  }, [gallery.length, service.video]);

  const goToPortfolio = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('pb:filter-portfolio', { detail: service.category }));
    requestAnimationFrame(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div
      id={`service-card-${index}`}
      ref={revealRef}
      className="reveal-section"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <a
        href="#portfolio"
        onClick={goToPortfolio}
        className="group relative flex flex-col md:flex-row glass-strong-light rounded-2xl overflow-hidden transition-all duration-500 hover:bg-black/[0.015] hover:shadow-[0_4px_40px_rgba(0,0,0,0.08)] hover:scale-[1.01]"
        aria-label={`Ver portfólio: ${service.title}`}
      >
        {/* Left green accent bar */}
        <span className="service-card-accent-line" aria-hidden="true" />

        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-0 font-[var(--font-display)] font-black leading-none select-none pointer-events-none z-0"
          style={{ fontSize: 'clamp(5rem,14vw,10rem)', color: 'rgba(0,0,0,0.04)' }}
        >
          {num}
        </span>

        {/* ── LEFT: image/video panel (55%) ─────────────────────── */}
        <div className="relative md:w-[55%] aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0">
          {service.video ? (
            <video
              src={service.video}
              poster={service.image}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ zIndex: 1 }}
            />
          ) : (
            gallery.map((url, gi) => (
              <img
                key={url}
                src={url}
                alt={gi === slide ? service.title : ''}
                aria-hidden={gi === slide ? undefined : 'true'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 group-hover:scale-[1.04]"
                style={{
                  zIndex: gi === slide ? 2 : 1,
                  opacity: gi === slide ? 1 : 0,
                  transitionProperty: 'opacity, transform',
                }}
                loading={gi === 0 ? 'eager' : 'lazy'}
              />
            ))
          )}

          {/* Dark gradient for readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 3, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 35%, transparent 100%)' }}
          />

          {/* Slide indicators — shows the gallery is cycling on its own */}
          {!service.video && gallery.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5" style={{ zIndex: 4 }}>
              {gallery.map((url, gi) => (
                <span
                  key={url}
                  aria-hidden="true"
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: gi === slide ? '1.25rem' : '0.375rem',
                    background: gi === slide ? '#fff' : 'rgba(255,255,255,0.45)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: content panel (45%) ───────────────────────── */}
        <div className="relative md:w-[45%] p-8 md:p-10 flex flex-col justify-between gap-5" style={{ zIndex: 1 }}>
          {/* Top row: icon + category badge */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 text-[var(--color-pb-accent-on-light)]"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', padding: '0.5rem' }}
              aria-hidden="true"
            >
              {icon}
            </div>
            <span className="category-badge-light">{service.category}</span>
          </div>

          {/* Number + Title */}
          <div>
            <span
              className="inline-block font-[var(--font-display)] text-sm font-bold tracking-widest mb-3"
              style={{
                background: 'rgba(26,122,23,0.08)',
                border: '1px solid rgba(26,122,23,0.25)',
                borderRadius: '0.5rem',
                padding: '0.2rem 0.7rem',
                color: 'var(--color-pb-accent-on-light)',
              }}
            >
              {num}
            </span>
            <h3 className="font-[var(--font-display)] text-xl sm:text-2xl lg:text-[1.6rem] font-bold text-[var(--color-pb-ink)] leading-tight">
              <span className="service-title-underline">{service.title}</span>
            </h3>
          </div>

          {/* Description */}
          <p className="text-[var(--color-pb-muted)] text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>

          {/* Spec tags */}
          {service.specs && service.specs.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {service.specs.map((spec) => (
                <span key={spec} className="spec-tag-light">{spec}</span>
              ))}
            </div>
          )}

          {/* Metric */}
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[3px] flex-shrink-0 w-2 h-2 rounded-full"
              style={{ background: 'var(--color-pb-accent-on-light)', boxShadow: '0 0 6px rgba(26,122,23,0.4)' }}
            />
            <span className="text-xs font-medium uppercase tracking-wider leading-snug text-[var(--color-pb-ink-2)]" style={{ opacity: 0.7 }}>
              {service.metric}
            </span>
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: 'var(--color-pb-accent-on-light)' }}
          >
            {ctaText}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────
export default function Services() {
  const headerRevealRef = useReveal();
  const { services } = siteData;
  const [activeTab, setActiveTab] = useState(0);

  // All gallery images for the portfolio strip
  const allGalleryImages = services.items.flatMap((item) => item.gallery ?? [item.image]);
  const doubled = [...allGalleryImages, ...allGalleryImages];

  function handleTabClick(index) {
    setActiveTab(index);
    const el = document.getElementById(`service-card-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <section id="servicos" className="relative z-10 py-24 sm:py-32 bg-[var(--color-pb-white)]">
      <div id="servicos-portfolio" className="absolute -top-20" />

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ─────────────────────────────── */}
        <div ref={headerRevealRef} className="reveal-section text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase glass-strong-light text-[var(--color-pb-ink-2)] mb-6">
            {services.label}
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 text-[var(--color-pb-ink)]">
            {services.headline.before}{' '}
            <span className="accent-gradient-light">{services.headline.accent}</span>
          </h2>
          <span className="services-headline-underline" aria-hidden="true" />
          <p className="text-[var(--color-pb-ink-2)] text-lg max-w-2xl mx-auto mt-5">
            {services.subheadline}
          </p>
        </div>

        {/* ── Navigator tabs ──────────────────────────────── */}
        <ServiceNavTabs
          items={services.items}
          activeIndex={activeTab}
          onTabClick={handleTabClick}
        />

        {/* ── Service cards ────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {services.items.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              ctaText={services.ctaText}
            />
          ))}
        </div>

        {/* ── Portfolio gallery strip ──────────────────────── */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase glass-strong-light text-[var(--color-pb-ink-2)] mb-3">
              Portfólio de Projetos
            </span>
            <p className="text-sm text-[var(--color-pb-ink-2)]" style={{ opacity: 0.55 }}>
              Uma seleção de trabalhos realizados para grandes marcas
            </p>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)',
            }}
          >
            <div
              className="marquee-track"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: 'max-content', animationDuration: '50s' }}
            >
              {doubled.map((url, i) => {
                const isDup = i >= allGalleryImages.length;
                return (
                  <img
                    key={`strip-${i}`}
                    src={url}
                    alt={isDup ? '' : `Portfolio P&B ${i + 1}`}
                    aria-hidden={isDup ? 'true' : undefined}
                    className="portfolio-strip-img"
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
