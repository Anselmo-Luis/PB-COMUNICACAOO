import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaybackBlocked, setIsPlaybackBlocked] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;

    const saveData = navigator.connection?.saveData === true;
    return !saveData;
  });

  const { video, headline, highlight, subheadline, socialProof, ctas, badge } = siteData.hero;

  useEffect(() => {
    const section = sectionRef.current;
    const media = videoRef.current;

    if (!isVideoEnabled || !section || !media) return;

    let isVisible = true;
    let recoveryFrame = 0;
    const cancelRecoveryFrame = () => {
      if (!recoveryFrame) return;
      cancelAnimationFrame(recoveryFrame);
      recoveryFrame = 0;
    };

    const pauseVideo = () => {
      cancelRecoveryFrame();
      media.pause();
    };

    const playVideo = async () => {
      if (!isVisible || document.hidden) return false;

      media.muted = true;
      media.defaultMuted = true;
      media.playsInline = true;

      try {
        const playback = media.play();
        if (playback && typeof playback.then === 'function') {
          await playback;
        }
        setIsPlaybackBlocked(false);
        return true;
      } catch {
        setIsPlaybackBlocked(true);
        return false;
      }
    };

    const queueRecovery = () => {
      if (recoveryFrame || !isVisible || document.hidden || !media.paused) return;

      recoveryFrame = requestAnimationFrame(() => {
        recoveryFrame = 0;
        void playVideo();
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseVideo();
        return;
      }
      queueRecovery();
    };

    const handleAutoplayRecovery = (event) => {
      if (event.target?.closest?.('.hero-video-unblock')) return;
      if (!media.paused) return;
      void playVideo();
    };

    const handleCanPlay = () => {
      setIsReady(true);
      queueRecovery();
    };

    const handleVideoError = () => {
      setIsVideoEnabled(false);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          queueRecovery();
          return;
        }

        pauseVideo();
      },
      { threshold: 0.1 }
    );

    io.observe(section);

    media.addEventListener('loadeddata', handleCanPlay);
    media.addEventListener('canplay', handleCanPlay);
    media.addEventListener('playing', handleCanPlay);
    media.addEventListener('error', handleVideoError);

    if (media.readyState >= 2) {
      handleCanPlay();
    }

    void playVideo();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pointerdown', handleAutoplayRecovery);
    window.addEventListener('touchstart', handleAutoplayRecovery);
    window.addEventListener('keydown', handleAutoplayRecovery);

    return () => {
      io.disconnect();
      media.removeEventListener('loadeddata', handleCanPlay);
      media.removeEventListener('canplay', handleCanPlay);
      media.removeEventListener('playing', handleCanPlay);
      media.removeEventListener('error', handleVideoError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointerdown', handleAutoplayRecovery);
      window.removeEventListener('touchstart', handleAutoplayRecovery);
      window.removeEventListener('keydown', handleAutoplayRecovery);
      pauseVideo();
    };
  }, [isVideoEnabled]);

  const handleManualPlayback = async () => {
    const media = videoRef.current;
    if (!media) return;

    media.muted = true;
    media.defaultMuted = true;
    media.playsInline = true;

    try {
      await media.play();
      setIsReady(true);
      setIsPlaybackBlocked(false);
    } catch {
      setIsPlaybackBlocked(true);
    }
  };

  const primaryCta = ctas.find((c) => c.variant === 'primary');
  const secondaryCta = ctas.find((c) => c.variant === 'secondary');

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-white sm:pt-40"
    >
      <div className="hero-media" aria-hidden="true">
        <img
          src={video.poster}
          srcSet={video.posterSrcSet}
          sizes="100vw"
          alt=""
          className="hero-poster"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable="false"
        />

        {isVideoEnabled && (
          <video
            ref={videoRef}
            className={`hero-video ${isReady ? 'is-ready' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            poster={video.poster}
            width={1920}
            height={1080}
            tabIndex={-1}
            aria-hidden="true"
          >
            {video.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}

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
              href={siteData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
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

        {isVideoEnabled && isPlaybackBlocked && (
          <button
            type="button"
            className="hero-video-unblock fade-in-up-delay-3 mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white/80"
            onClick={handleManualPlayback}
          >
            <Play size={14} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
            Reproduzir video
          </button>
        )}
      </div>
    </section>
  );
}
