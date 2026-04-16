import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, strength = 0.4, radius = 120, className = '' }) {
  const ref = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;

    xTo.current = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        xTo.current(dx * strength);
        yTo.current(dy * strength);
      } else {
        xTo.current(0);
        yTo.current(0);
      }
    };

    const onLeave = () => {
      xTo.current(0);
      yTo.current(0);
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className={className} style={{ display: className.includes('w-full') ? 'block' : 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}
