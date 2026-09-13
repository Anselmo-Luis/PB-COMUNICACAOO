import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { getPrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { siteData } from '../../data/siteData';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function MaterialsVideo({ video }) {
  const figureRef = useRef(null);
  const mediaRef = useRef(null);
  const [isInView, setIsInView] = useState(() => typeof IntersectionObserver === 'undefined');
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaybackEnabled, setIsPlaybackEnabled] = useState(() => !getPrefersReducedMotion());

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '180px 0px' },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(REDUCED_MOTION_QUERY);
    if (!mediaQuery) return undefined;

    const handlePreferenceChange = (event) => {
      if (event.matches) setIsPlaybackEnabled(false);
    };

    mediaQuery.addEventListener?.('change', handlePreferenceChange);
    return () => mediaQuery.removeEventListener?.('change', handlePreferenceChange);
  }, []);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return undefined;

    media.muted = true;

    if (isInView && isPlaybackEnabled && !hasError) {
      media.play()?.catch?.(() => {});
    } else {
      media.pause();
    }

    return undefined;
  }, [hasError, isInView, isPlaybackEnabled]);

  const shouldPlay = isInView && isPlaybackEnabled;

  return (
    <figure ref={figureRef} className="materials-video">
      <div
        className="materials-video-frame"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <img
          className={isReady ? 'is-hidden' : ''}
          src={video.poster}
          alt={video.alt}
          width={video.width}
          height={video.height}
          loading={isInView ? 'eager' : 'lazy'}
          decoding="async"
        />
        {!hasError && (
          <video
            ref={mediaRef}
            className={isReady ? 'is-ready' : ''}
            autoPlay={shouldPlay}
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload={shouldPlay ? 'auto' : 'metadata'}
            poster={video.poster}
            width={video.width}
            height={video.height}
            tabIndex={-1}
            onPlaying={() => setIsReady(true)}
            onError={() => {
              setHasError(true);
              setIsReady(false);
              setIsPlaybackEnabled(false);
            }}
          >
            <source src={video.src} type="video/mp4" />
            Seu navegador não consegue reproduzir este vídeo.
          </video>
        )}
      </div>

      <figcaption className="materials-video-caption">
        <span>{video.label}</span>
        <button
          type="button"
          className="materials-video-control"
          onClick={() => setIsPlaybackEnabled((current) => !current)}
          aria-label={`${isPlaybackEnabled ? 'Pausar' : 'Reproduzir'} vídeo: ${video.label}`}
        >
          {isPlaybackEnabled ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5v-13Zm6 0A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-13Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8.5 5.2v13.6a1.2 1.2 0 0 0 1.84 1.02l9.1-6.8a1.27 1.27 0 0 0 0-2.04l-9.1-6.8A1.2 1.2 0 0 0 8.5 5.2Z" />
            </svg>
          )}
        </button>
      </figcaption>
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

            {materials.video && <MaterialsVideo video={materials.video} />}
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
                    style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
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
