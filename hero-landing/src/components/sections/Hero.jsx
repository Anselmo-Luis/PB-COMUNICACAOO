import { ArrowDown } from 'lucide-react';
import { useScrollFrames } from '../../hooks/useScrollFrames';
import { siteData } from '../../data/siteData';

export default function Hero() {
  const { containerRef, canvasRef, imagesLoaded, loadProgress, scrollHeight } = useScrollFrames();

  return (
    <>
      {/* Canvas for scroll-driven frames */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
      </div>

      {/* Dark overlay for readability */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.35) 70%, rgba(10,10,10,0.7) 100%)',
        }}
      />

      {/* Loading screen — outside container so fixed positioning stays relative to viewport */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <div className="mb-8">
            <img
              src={siteData.company.logoSrc}
              alt={siteData.company.name}
              className="h-16 w-auto opacity-90"
              style={{ filter: 'brightness(0)' }}
            />
          </div>
          <div
            className="w-48 h-1 rounded-full bg-black/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={loadProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={siteData.hero.loadingText}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, var(--color-pb-accent), var(--color-pb-accent-blue))',
                transition: 'width 200ms ease-out',
              }}
            />
          </div>
          <p className="mt-3 text-sm text-[var(--color-pb-muted)]">
            {siteData.hero.loadingText} {loadProgress}%
          </p>
        </div>
      )}

      {/* Scroll driver container — transform: translateZ(0) forces a GPU compositor layer,
          containing all animated/sticky children so they never escape z-[11] to overlap the navbar */}
      <div ref={containerRef} className="relative z-[11] pointer-events-none" style={{ height: scrollHeight, overflow: 'clip', transform: 'translateZ(0)' }}>

        {/* Hero content — first viewport */}
        <section className="sticky top-0 h-screen flex flex-col items-center justify-start pointer-events-auto pt-24 overflow-y-hidden">
          <div className="text-center px-6 max-w-5xl mx-auto w-full">
            <h1 className={`${imagesLoaded ? 'fade-in-up-delay-1' : 'opacity-0'} font-[var(--font-display)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 text-white`}>
              {siteData.hero.headline}
              <br />
              <span className="accent-gradient">{siteData.hero.highlight}</span>
            </h1>

            <p className={`${imagesLoaded ? 'fade-in-up-delay-2' : 'opacity-0'} text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed`}>
              {siteData.hero.subheadline}
            </p>


            {/* Social proof line */}
            <p className={`${imagesLoaded ? 'fade-in-up-delay-3' : 'opacity-0'} mt-8 text-sm text-white/40`}>
              {siteData.hero.socialProof.before} <strong className="text-white/60">{siteData.hero.socialProof.highlight}</strong> {siteData.hero.socialProof.after}
            </p>

            {/* Scroll indicator */}
            <div className="scroll-indicator mt-12 flex flex-col items-center gap-2 text-white/30">
              <span className="text-xs uppercase tracking-widest">{siteData.hero.scrollLabel}</span>
              <ArrowDown size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
