import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { useReveal } from '../../hooks/useReveal';

const CATEGORIES = ['Todos', 'Veículos', 'Frota', 'Totens', 'Fachadas', 'Painéis', 'Banners', 'Produção'];

function imageSet(folder, prefix, count, category, altBase) {
  return Array.from({ length: count }, (_, i) => ({
    type: 'image',
    src: `/assets/gallery/${folder}/${prefix}-${String(i + 1).padStart(2, '0')}.webp`,
    category,
    alt: `${altBase} ${i + 1}`,
  }));
}

const GALLERY_ITEMS = [
  ...imageSet('veiculos', 'veiculo', 16, 'Veículos', 'Adesivação de veículos'),
  ...imageSet('paineis', 'painel', 16, 'Painéis', 'Fachadas e painéis'),
  ...imageSet('banners', 'banner', 10, 'Banners', 'Banners e backdrops'),
  ...imageSet('frota', 'frota', 20, 'Frota', 'Frota de veículos em campo'),
  {
    type: 'video',
    src: '/assets/gallery/frota/frota-video-01.mp4',
    poster: '/assets/gallery/frota/frota-video-01-poster.webp',
    category: 'Frota',
    alt: 'Entrega e instalação em veículo de frota',
  },
  ...imageSet('totens', 'totens', 7, 'Totens', 'Totem de sinalização'),
  ...imageSet('fachadas', 'fachadas', 6, 'Fachadas', 'Fachada de loja'),
  ...imageSet('paineis', 'paineis', 19, 'Painéis', 'Ambiente e mural corporativo'),
  {
    type: 'video',
    src: '/assets/gallery/paineis/paineis-video-01.mp4',
    poster: '/assets/gallery/paineis/paineis-video-01-poster.webp',
    category: 'Painéis',
    alt: 'Instalação de adesivo em elevador',
  },
  ...imageSet('banners', 'banners', 6, 'Banners', 'Banner e display promocional'),
  {
    type: 'video',
    src: '/assets/gallery/producao/producao-01.mp4',
    poster: '/assets/gallery/producao/producao-01-poster.webp',
    category: 'Produção',
    alt: 'Máquina de impressão em produção',
  },
].map((item, i) => ({ ...item, type: item.type || 'image', key: `${item.category}-${i}` }));

// ── Lightbox with thumbnail filmstrip ─────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext, onJump }) {
  const closeRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const previousFocusRef = useRef(null);
  const stripRef = useRef(null);

  const focusable = useCallback(
    () => [closeRef.current, prevRef.current, nextRef.current].filter(Boolean),
    [],
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => previousFocusRef.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); return; }
      if (e.key !== 'Tab') return;
      const btns = focusable();
      if (!btns.length) return;
      const cur = btns.indexOf(document.activeElement);
      const next = e.shiftKey
        ? (cur - 1 + btns.length) % btns.length
        : (cur + 1) % btns.length;
      e.preventDefault();
      btns[next]?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focusable, onClose, onPrev, onNext]);

  // Keep active thumbnail visible
  useEffect(() => {
    const el = stripRef.current?.children[index];
    el?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  }, [index]);

  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de imagens"
      className="fixed inset-0 z-[9999] flex flex-col items-center"
      style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        ref={closeRef}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
        aria-label="Fechar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} className="w-4 h-4">
          <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 text-[0.65rem] font-mono text-white/30 tracking-widest"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Imagem ${index + 1} de ${items.length}`}
      >
        {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </div>

      {/* Prev */}
      {index > 0 && (
        <button
          ref={prevRef}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {index < items.length - 1 && (
        <button
          ref={nextRef}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Próximo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main image / video */}
      <div
        className="flex-1 flex items-center justify-center w-full px-16 pt-14 pb-28"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-[72vh] object-contain rounded-xl"
            style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 2px 40px rgba(0,0,0,0.5)' }}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className="max-w-full max-h-[72vh] object-contain rounded-xl"
            style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 2px 40px rgba(0,0,0,0.5)' }}
          />
        )}
      </div>

      {/* Category badge */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none">
        <span
          className="text-[0.6rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: 'rgba(46,167,41,0.15)', border: '1px solid rgba(46,167,41,0.3)', color: 'var(--color-pb-accent)' }}
        >
          {item.category}
        </span>
      </div>

      {/* Thumbnail filmstrip */}
      <div
        className="absolute bottom-3 left-0 right-0 px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={stripRef}
          className="flex gap-1.5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((thumb, i) => (
            <button
              key={i}
              onClick={() => onJump(i)}
              className="flex-shrink-0 w-12 h-8 rounded overflow-hidden transition-all duration-200"
              style={{
                opacity: i === index ? 1 : 0.3,
                outline: i === index ? '1.5px solid rgba(46,167,41,0.8)' : 'none',
                outlineOffset: '1px',
                transform: i === index ? 'scale(1.12)' : 'scale(1)',
              }}
              aria-label={`Ir para imagem ${i + 1}`}
            >
              <img src={thumb.type === 'video' ? thumb.poster : thumb.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Gallery media (image, or lazy-autoplay video preview) ──
function GalleryMedia({ item, className }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (item.type !== 'video') return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.type]);

  if (item.type !== 'video') {
    return <img src={item.src} alt={item.alt} loading="lazy" className={className} />;
  }

  return (
    <div ref={containerRef} className="relative">
      {inView ? (
        <video
          src={item.src}
          poster={item.poster}
          className={className}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      ) : (
        <img src={item.poster} alt={item.alt} loading="lazy" className={className} />
      )}
      <div
        className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5 ml-0.5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

// ── Column count (mirrors the sm/lg/xl breakpoints below) ──
function useColumnCount() {
  const getCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return count;
}

// ── Icons ─────────────────────────────────────────────────
function IconGrid({ active }) {
  const o = active ? 1 : 0.38;
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
      <rect x="1" y="1" width="6" height="6" rx="1" opacity={o} />
      <rect x="9" y="1" width="6" height="6" rx="1" opacity={o} />
      <rect x="1" y="9" width="6" height="6" rx="1" opacity={o} />
      <rect x="9" y="9" width="6" height="6" rx="1" opacity={o} />
    </svg>
  );
}

function IconList({ active }) {
  const o = active ? 1 : 0.38;
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
      <rect x="1" y="2.5" width="14" height="2" rx="1" opacity={o} />
      <rect x="1" y="7" width="14" height="2" rx="1" opacity={o} />
      <rect x="1" y="11.5" width="14" height="2" rx="1" opacity={o} />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────
export default function Portfolio() {
  const revealRef = useReveal();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [viewMode, setViewMode] = useState('grid');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const gridRef = useRef(null);
  const cursorPreviewRef = useRef(null);

  // Let Services cards deep-link straight into the matching filter tab
  useEffect(() => {
    const onFilterRequest = (e) => {
      if (CATEGORIES.includes(e.detail)) setActiveFilter(e.detail);
    };
    window.addEventListener('pb:filter-portfolio', onFilterRequest);
    return () => window.removeEventListener('pb:filter-portfolio', onFilterRequest);
  }, []);

  const filtered = activeFilter === 'Todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  // Manually bucketed columns (round-robin) instead of CSS multi-column —
  // Chrome doesn't balance auto-height columns, so a handful of filtered
  // items (or one tall outlier) can pile into column 1 and leave the rest empty.
  const columnCount = useColumnCount();
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    filtered.forEach((item, i) => cols[i % columnCount].push({ item, i }));
    return cols;
  }, [filtered, columnCount]);

  // GSAP stagger when filter or view changes
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.gallery-card');
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 18, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.028, ease: 'power2.out', clearProps: 'transform,scale' }
    );
  }, [activeFilter, viewMode]);

  // Cursor-following preview (list mode only)
  useEffect(() => {
    if (viewMode !== 'list') return;
    const onMove = (e) => {
      if (!cursorPreviewRef.current) return;
      gsap.to(cursorPreviewRef.current, {
        x: e.clientX + 28,
        y: e.clientY - 100,
        duration: 0.38,
        ease: 'power3.out',
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [viewMode]);

  const openLightbox = useCallback((i) => {
    setLightboxIndex(i);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const prevImage = useCallback(() => setLightboxIndex(i => i > 0 ? i - 1 : i), []);
  const nextImage = useCallback(() => setLightboxIndex(i => i < filtered.length - 1 ? i + 1 : i), [filtered.length]);
  const jumpImage = useCallback((i) => setLightboxIndex(i), []);

  return (
    <section id="portfolio" className="relative z-10 py-24 sm:py-32 bg-[var(--color-pb-white)] overflow-hidden">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[36rem] h-[36rem] -translate-y-1/3 translate-x-1/4"
        style={{ background: 'radial-gradient(ellipse, rgba(26,122,23,0.04) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={revealRef} className="reveal-section mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="section-kicker-light mb-4 block">Portfólio</span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-pb-ink)]">
                Nossos <span className="accent-gradient-light">Projetos</span>
              </h2>
              <p className="text-[var(--color-pb-ink-2)] mt-3 text-base max-w-md">
                {GALLERY_ITEMS.length} projetos realizados para as maiores marcas do Brasil
              </p>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl self-start sm:self-auto"
              style={{ border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: viewMode === 'grid' ? 'rgba(0,0,0,0.07)' : 'transparent',
                  color: viewMode === 'grid' ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.3)',
                }}
                aria-label="Visualização em grade"
                aria-pressed={viewMode === 'grid'}
              >
                <IconGrid active={viewMode === 'grid'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: viewMode === 'list' ? 'rgba(0,0,0,0.07)' : 'transparent',
                  color: viewMode === 'list' ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.3)',
                }}
                aria-label="Visualização em lista"
                aria-pressed={viewMode === 'list'}
              >
                <IconList active={viewMode === 'list'} />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => {
              const count = cat === 'Todos'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter(i => i.category === cat).length;
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`service-nav-tab-light${isActive ? ' active' : ''}`}
                >
                  {cat}
                  <span
                    className="ml-1.5 font-mono text-[0.6rem] transition-opacity duration-200"
                    style={{ opacity: isActive ? 0.65 : 0.35 }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid mode ── */}
        {viewMode === 'grid' && (
          <div ref={gridRef} className="flex gap-3 items-start">
            {columns.map((col, ci) => (
              <div key={ci} className="flex-1 flex flex-col gap-3 min-w-0">
                {col.map(({ item, i }) => (
                  <button
                    key={`g-${activeFilter}-${i}`}
                    type="button"
                    className="gallery-card group relative overflow-hidden rounded-xl w-full border-0 bg-transparent p-0 text-left cursor-pointer"
                    onClick={() => openLightbox(i)}
                    aria-label={`Abrir ${item.alt}`}
                  >
                    <GalleryMedia
                      item={item}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2"
                      style={{ background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(3px)' }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <span
                        className="text-[0.6rem] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                        style={{ background: 'rgba(46,167,41,0.2)', border: '1px solid rgba(46,167,41,0.4)', color: 'var(--color-pb-accent)' }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── List mode ── */}
        {viewMode === 'list' && (
          <div ref={gridRef}>
            {filtered.map((item, i) => (
              <button
                key={`l-${activeFilter}-${i}`}
                type="button"
                className="gallery-card group w-full flex items-center justify-between py-4 sm:py-5 border-b border-black/[0.07] hover:border-black/[0.16] transition-all duration-300 cursor-pointer text-left bg-transparent"
                onClick={() => openLightbox(i)}
                onMouseEnter={() => setPreviewSrc(item.type === 'video' ? item.poster : item.src)}
                onMouseLeave={() => setPreviewSrc(null)}
                aria-label={`${item.alt} — ${item.category}`}
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-[0.62rem] font-mono text-[var(--color-pb-ink-2)] flex-shrink-0 w-6 text-right" style={{ opacity: 0.45 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-10 rounded-md overflow-hidden"
                    style={{ background: 'rgba(0,0,0,0.04)' }}>
                    <img src={item.type === 'video' ? item.poster : item.src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[var(--color-pb-ink-2)] group-hover:text-[var(--color-pb-ink)] text-sm sm:text-base font-medium transition-colors duration-200 truncate">
                    {item.alt}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span
                    className="hidden sm:block text-[0.62rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full transition-all duration-200"
                    style={{ background: 'rgba(26,122,23,0.06)', border: '1px solid rgba(26,122,23,0.18)', color: 'var(--color-pb-accent-on-light)' }}
                  >
                    {item.category}
                  </span>
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
                    className="w-4 h-4 text-[var(--color-pb-ink-2)] group-hover:translate-x-0.5 transition-all duration-200"
                    style={{ opacity: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Footer count */}
        <p className="text-center mt-10 text-[0.65rem] font-mono tracking-widest uppercase" style={{ color: 'rgba(0,0,0,0.25)' }}>
          {filtered.length} {filtered.length === 1 ? 'projeto' : 'projetos'}
          {activeFilter !== 'Todos' && <span style={{ opacity: 0.5 }}> · {activeFilter}</span>}
        </p>
      </div>

      {/* Cursor preview — list mode only */}
      {viewMode === 'list' && (
        <div
          ref={cursorPreviewRef}
          aria-hidden
          className="fixed top-0 left-0 pointer-events-none z-50 w-52 h-36 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            opacity: viewMode === 'list' && previewSrc ? 1 : 0,
            transition: 'opacity 0.15s ease',
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
          }}
        >
          {previewSrc && (
            <img src={previewSrc} alt="" className="w-full h-full object-cover" />
          )}
        </div>
      )}

      {/* Lightbox — portaled to <body> so it isn't trapped under the
          navbar by this section's z-10 stacking context */}
      {lightboxIndex !== null && createPortal(
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onJump={jumpImage}
        />,
        document.body
      )}
    </section>
  );
}
