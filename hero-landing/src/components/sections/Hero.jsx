import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../../data/siteData';

function buildFrameList({ pattern, count, pad = 0 }) {
  const frames = new Array(count);
  for (let i = 0; i < count; i++) {
    const n = pad > 0 ? String(i + 1).padStart(pad, '0') : String(i + 1);
    frames[i] = pattern.replace('{n}', n);
  }
  return frames;
}

export default function Hero() {
  const imgARef = useRef(null);
  const imgBRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const playingRef = useRef(false);

  const [ready, setReady] = useState(false);

  const { video, headline, highlight, subheadline, socialProof, ctas, badge } = siteData.hero;
  const frames = useMemo(() => buildFrameList(video.frames), [video.frames]);
  const frameInterval = 1000 / video.frames.fps;

  // Preload all frames up front so src swaps don't flicker or hit the network mid-loop.
  useEffect(() => {
    let cancelled = false;
    const loaders = frames.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = src;
        })
    );

    Promise.all(loaders).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  useEffect(() => {
    const imgA = imgARef.current;
    const imgB = imgBRef.current;
    const section = sectionRef.current;
    if (!ready || !imgA || !imgB || !section) return;

    // A starts visible with frame 0; B is hidden and will be swapped to frame 1 on first tick.
    imgA.src = frames[0];
    imgA.style.opacity = '1';
    imgB.style.opacity = '0';

    let index = 0;
    let showingA = true;
    let last = 0;

    const tick = (now) => {
      if (!playingRef.current) return;
      if (now - last >= frameInterval) {
        index = (index + 1) % frames.length;
        const incoming = showingA ? imgB : imgA;
        const outgoing = showingA ? imgA : imgB;
        incoming.src = frames[index];
        incoming.style.opacity = '1';
        outgoing.style.opacity = '0';
        showingA = !showingA;
        last = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (playingRef.current) return;
      playingRef.current = true;
      last = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    const stop = () => {
      playingRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.1 }
    );
    io.observe(section);

    const onVisibility = () => (document.hidden ? stop() : null);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [ready, frames, frameInterval]);

  const primaryCta = ctas.find((c) => c.variant === 'primary');
  const secondaryCta = ctas.find((c) => c.variant === 'secondary');

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-white sm:pt-40"
    >
      <div className="hero-media" aria-hidden="true">
        <img
          ref={imgARef}
          src={video.poster}
          alt=""
          className={`hero-video hero-video-layer ${ready ? 'is-ready' : ''}`}
          loading="eager"
          decoding="async"
          draggable="false"
        />
        <img
          ref={imgBRef}
          src={video.poster}
          alt=""
          className={`hero-video hero-video-layer ${ready ? 'is-ready' : ''}`}
          loading="eager"
          decoding="async"
          draggable="false"
          style={{ opacity: 0 }}
        />
        <div className="hero-media-overlay" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-5xl text-center">
        <span className="hero-badge fade-in-up">{badge}</span>

        <h1 className="fade-in-up-delay-1 mt-8 font-[var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {headline}
          <br />
          <span className="accent-gradient">{highlight}</span>
        </h1>

        <p className="fade-in-up-delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
          {subheadline}
        </p>

        <div className="fade-in-up-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {primaryCta && (
            <a
              href="#contato"
              className="hero-cta-primary group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-white sm:text-base"
            >
              {primaryCta.text}
              <ArrowRight
                size={18}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="hero-cta-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/80 sm:text-base"
            >
              {secondaryCta.text}
            </a>
          )}
        </div>

        <p className="fade-in-up-delay-3 mt-10 text-sm text-white/45">
          {socialProof.before}{' '}
          <strong className="text-white/75">{socialProof.highlight}</strong> {socialProof.after}
        </p>
      </div>
    </section>
  );
}
