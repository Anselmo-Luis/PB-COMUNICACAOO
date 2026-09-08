import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function getPrefersReducedMotion() {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.(QUERY).matches);
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(QUERY);
    if (!mediaQuery) return undefined;

    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  return prefersReducedMotion;
}
