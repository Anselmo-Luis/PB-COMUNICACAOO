import { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { siteData } from '../../data/siteData';

function ShowcaseSlideshow({ images }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % images.length), 4200);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] lg:mt-10">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i === slide ? undefined : 'true'}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 2 : 1 }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 3, background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)' }}
      />
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5" style={{ zIndex: 4 }}>
        {images.map((src, i) => (
          <span
            key={src}
            aria-hidden="true"
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === slide ? '1.25rem' : '0.375rem',
              background: i === slide ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const revealRef = useReveal();
  const { materials } = siteData;

  return (
    <section className="relative z-10 bg-[var(--color-pb-surface)] px-6 py-24 sm:py-32">
      <div ref={revealRef} className="reveal-section mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-kicker-light">{materials.label}</span>
            <h2 className="mt-6 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-pb-ink)] sm:text-4xl md:text-5xl">
              {materials.headline.before} <span className="accent-gradient-light">{materials.headline.accent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-pb-ink-2)] sm:text-lg">
              {materials.subheadline}
            </p>

            {materials.showcaseImages?.length > 0 && (
              <ShowcaseSlideshow images={materials.showcaseImages} />
            )}
          </div>

          <div className="editorial-surface-light rounded-[1.75rem] px-6 sm:px-8">
            {materials.items.map((item, index) => (
              <article key={index} className="spec-row-light">
                {item.image && (
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                    <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-[var(--font-display)] text-xs font-bold tracking-[0.34em] text-[var(--color-pb-ink-2)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1 font-[var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-pb-ink)] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-[var(--color-pb-ink-2)] sm:text-[0.95rem]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
