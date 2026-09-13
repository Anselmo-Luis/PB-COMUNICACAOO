import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { getPrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { siteData } from '../../data/siteData';
import PortfolioVideoCarousel from './PortfolioVideoCarousel';
import ProjectMosaic from './PortfolioMosaic';

function Lightbox({ items, index, onClose, onPrev, onNext, onJump }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const stripRef = useRef(null);
  const previousFocusRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...dialog.querySelectorAll('button:not([disabled])')];
      if (!focusable.length) return;
      const currentIndex = focusable.indexOf(document.activeElement);
      const nextIndex = event.shiftKey
        ? (currentIndex - 1 + focusable.length) % focusable.length
        : (currentIndex + 1) % focusable.length;
      event.preventDefault();
      focusable[nextIndex]?.focus();
    };

    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: getPrefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [index]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-lightbox-title"
      className="portfolio-lightbox fixed inset-0 z-[9999] flex flex-col items-center"
      onClick={onClose}
    >
      <h2 id="portfolio-lightbox-title" className="sr-only">Visualização do projeto</h2>

      <button
        ref={closeRef}
        type="button"
        className="portfolio-lightbox-close"
        onClick={(event) => { event.stopPropagation(); onClose(); }}
        aria-label="Fechar visualização"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} aria-hidden="true">
          <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="portfolio-lightbox-counter" aria-live="polite" aria-atomic="true">
        {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </div>

      <button
        type="button"
        className="portfolio-lightbox-arrow portfolio-lightbox-arrow-prev"
        onClick={(event) => { event.stopPropagation(); onPrev(); }}
        aria-label="Imagem anterior"
        disabled={index <= 0}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        className="portfolio-lightbox-arrow portfolio-lightbox-arrow-next"
        onClick={(event) => { event.stopPropagation(); onNext(); }}
        aria-label="Próxima imagem"
        disabled={index >= items.length - 1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="portfolio-lightbox-stage" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        <div className="portfolio-lightbox-caption">
          <span>{item.categoryLabel}</span>
        </div>
      </div>

      <div className="portfolio-lightbox-thumbnails" onClick={(event) => event.stopPropagation()}>
        <div ref={stripRef}>
          {items.map((thumbnail, thumbnailIndex) => (
            <button
              key={`${thumbnail.src}-${thumbnailIndex}`}
              type="button"
              className={thumbnailIndex === index ? 'is-active' : ''}
              onClick={() => onJump(thumbnailIndex)}
              aria-label={`Visualizar ${thumbnail.alt}`}
              aria-current={thumbnailIndex === index ? 'true' : undefined}
            >
              <img src={thumbnail.src} alt="" width={96} height={64} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function countPortfolioImages(projects) {
  return projects.reduce((total, project) => total + project.images.length, 0);
}

export default function Portfolio() {
  const revealRef = useReveal();
  const { portfolio } = siteData;
  const [activeCategory, setActiveCategory] = useState(portfolio.categories[0].id);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPending, startTransition] = useTransition();

  const activeCategoryMeta = portfolio.categories.find(
    (category) => category.id === activeCategory,
  );
  const activeCategoryLabel = activeCategoryMeta?.label;
  const videoCount = portfolio.videos.length;

  const categoryStats = useMemo(() => {
    const stats = new Map();
    for (const project of portfolio.projects) {
      const entry = stats.get(project.category) ?? { projectCount: 0, imageCount: 0 };
      entry.projectCount += 1;
      entry.imageCount += project.images.length;
      stats.set(project.category, entry);
    }
    return stats;
  }, [portfolio.projects]);

  const filteredProjects = useMemo(() => (
    portfolio.projects.filter((project) => project.category === activeCategory)
  ), [portfolio.projects, activeCategory]);
  const categoryImages = countPortfolioImages(filteredProjects);

  const photoTiles = useMemo(() => (
    filteredProjects.flatMap((project) => (
      project.images.map((image, imageIndex) => ({
        ...image,
        key: `${project.id}-${imageIndex}`,
        categoryLabel: activeCategoryLabel,
      }))
    ))
  ), [filteredProjects, activeCategoryLabel]);

  const projectStartIndices = useMemo(() => {
    const indices = [];
    let runningTotal = 0;
    for (const project of filteredProjects) {
      indices.push(runningTotal);
      runningTotal += project.images.length;
    }
    return indices;
  }, [filteredProjects]);

  useEffect(() => {
    const onFilterRequest = (event) => {
      const category = portfolio.categories.find((item) => item.label === event.detail);
      if (category) {
        setLightboxIndex(null);
        startTransition(() => setActiveCategory(category.id));
      }
    };

    window.addEventListener('pb:filter-portfolio', onFilterRequest);
    return () => window.removeEventListener('pb:filter-portfolio', onFilterRequest);
  }, [portfolio.categories, startTransition]);

  const selectCategory = (categoryId) => {
    setLightboxIndex(null);
    startTransition(() => setActiveCategory(categoryId));
  };

  const lightboxItemCount = photoTiles.length;
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => {
    setLightboxIndex((current) => (current === null || current <= 0 ? current : current - 1));
  };
  const nextImage = () => {
    setLightboxIndex((current) => (
      current === null || current >= lightboxItemCount - 1 ? current : current + 1
    ));
  };
  const jumpImage = (index) => setLightboxIndex(index);

  return (
    <section
      id="portfolio"
      className="portfolio-section relative z-10 overflow-hidden bg-[var(--color-pb-surface)] py-6"
      aria-labelledby="portfolio-heading"
    >
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl px-6">
        <div className="portfolio-header">
          <div>
            <span className="section-kicker-light">Trabalhos realizados</span>
            <h2 id="portfolio-heading">{portfolio.title}</h2>
            <p>{portfolio.subheadline}</p>
          </div>
          <div className="portfolio-project-count" aria-live="polite">
            {activeCategoryMeta?.videoOnly ? (
              <>
                <strong>{videoCount}</strong>
                <span>{videoCount === 1 ? 'vídeo' : 'vídeos'}</span>
              </>
            ) : (
              <>
                <strong>{filteredProjects.length}</strong>
                <span>{filteredProjects.length === 1 ? 'projeto' : 'projetos'}</span>
                <span className="portfolio-project-count-divider" aria-hidden="true">·</span>
                <strong>{categoryImages}</strong>
                <span>{categoryImages === 1 ? 'foto' : 'fotos'}</span>
              </>
            )}
            <span className="portfolio-project-count-note">
              em {activeCategoryLabel}
            </span>
          </div>
        </div>

        <div className="portfolio-tabs" role="tablist" aria-label="Categorias do portfólio">
          {portfolio.categories.map((category) => {
            const isActive = category.id === activeCategory;
            const { projectCount = 0, imageCount = 0 } = categoryStats.get(category.id) ?? {};

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`portfolio-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`portfolio-panel-${category.id}`}
                className={isActive ? 'is-active' : ''}
                onClick={() => selectCategory(category.id)}
              >
                <span className="portfolio-tab-label">{category.label}</span>
                <span className="portfolio-tab-meta">
                  {category.videoOnly
                    ? `${videoCount} vídeos`
                    : `${projectCount} · ${imageCount} fotos`}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`portfolio-panel-${activeCategory}`}
          className={filteredProjects.length ? 'portfolio-mosaic-columns' : 'portfolio-mosaic-columns is-empty'}
          role="tabpanel"
          aria-labelledby={`portfolio-tab-${activeCategory}`}
          aria-busy={isPending}
        >
          {filteredProjects.map((project, projectIndex) => (
            <ProjectMosaic
              key={project.id}
              project={project}
              categoryLabel={activeCategoryLabel}
              startIndex={projectStartIndices[projectIndex]}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        {portfolio.videos.length > 0 && (
          <div className="portfolio-production">
            <div className="portfolio-production-header">
              <div>
                <span className="section-kicker-light">Bastidores</span>
                <h2>Produção</h2>
              </div>
              <p>Vídeos de instalação, frota e produção interna.</p>
            </div>
            <PortfolioVideoCarousel videos={portfolio.videos} />
          </div>
        )}
      </div>

      {lightboxIndex !== null && lightboxIndex < lightboxItemCount && createPortal(
        <Lightbox
          items={photoTiles}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onJump={jumpImage}
        />,
        document.body,
      )}
    </section>
  );
}
