import { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

function MaterialsCategoryCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setIsReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener?.('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || isReducedMotion || items.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isPaused, isReducedMotion, items.length]);

  const goToSlide = (index) => setActiveIndex(index);
  const goToPrevious = () => setActiveIndex((current) => (current - 1 + items.length) % items.length);
  const goToNext = () => setActiveIndex((current) => (current + 1) % items.length);
  const activeItem = items[activeIndex];

  return (
    <figure
      className="materials-category-carousel"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div className="materials-category-carousel-frame">
        <div
          className="materials-category-carousel-track"
          style={{
            transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
            transition: isReducedMotion ? 'none' : undefined,
          }}
        >
          {items.map((item) => (
            <div key={item.label} className="materials-category-carousel-slide">
              <img
                src={item.image}
                alt={item.alt}
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <figcaption className="materials-category-carousel-caption">{activeItem?.label}</figcaption>

      {items.length > 1 && (
        <div className="materials-category-carousel-toolbar">
          <button
            type="button"
            className="materials-category-carousel-control"
            aria-label="Categoria anterior"
            onClick={goToPrevious}
          >
            ‹
          </button>
          <div
            className="materials-category-carousel-dots"
            role="tablist"
            aria-label="Categorias de materiais"
          >
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Ver ${item.label}`}
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="materials-category-carousel-control"
            aria-label="Próxima categoria"
            onClick={goToNext}
          >
            ›
          </button>
        </div>
      )}
    </figure>
  );
}

export default function Features() {
  const revealRef = useReveal();
  const { materials } = siteData;

  return (
    <section
      className="materials-section relative z-10 bg-[var(--color-pb-surface)] px-6 py-6"
      aria-labelledby="materials-heading"
    >
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{materials.label}</span>
            <h2
              id="materials-heading"
              className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl"
            >
              {materials.headline.before}{' '}
              <span className="text-[var(--color-pb-accent-blue)]">{materials.headline.accent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {materials.subheadline}
            </p>

            {materials.categoryShowcase?.length > 0 && (
              <MaterialsCategoryCarousel items={materials.categoryShowcase} />
            )}
          </div>

          <div className="materials-list">
            {materials.items.map((item, index) => (
              <article key={item.title} className="material-item">
                <div className="material-item-image">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-[var(--font-display)] text-xs font-bold tracking-[0.34em] text-[var(--color-pb-ink-2)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 font-[var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-xl">
                    {item.title}
                  </h3>
                  {item.descriptionLines?.length > 0 ? (
                    item.descriptionLines.map((line, lineIndex) => (
                      <p
                        key={line}
                        className={`text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.95rem] ${lineIndex === 0 ? 'mt-3' : 'mt-1.5'}`}
                      >
                        {line}
                      </p>
                    ))
                  ) : item.description ? (
                    <p className="mt-3 text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  ) : null}
                  {item.specs?.length > 0 && (
                    <ul className={`material-specs${item.description || item.descriptionLines?.length ? '' : ' material-specs--lead'}`}>
                      {item.specs.map((spec) => (
                        <li key={spec}>{spec}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
