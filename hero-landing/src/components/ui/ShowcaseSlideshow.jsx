import { useEffect, useState } from 'react';

export default function ShowcaseSlideshow({ images }) {
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
