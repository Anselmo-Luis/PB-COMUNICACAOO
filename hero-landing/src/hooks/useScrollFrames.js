import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 40;

function padFrame(num) {
  return String(num).padStart(3, '0');
}

function getFrameUrl(index) {
  return `/frames/ezgif-frame-${padFrame(index + 1)}.jpg`;
}

/**
 * Preload all frames into Image objects.
 * Priority: frame 0 first, then sequential with 8 concurrent connections.
 * Tracks failures — broken images are retried once, then logged.
 */
function preloadImages(onProgress) {
  const images = new Array(TOTAL_FRAMES);
  const failed = new Set();
  let loaded = 0;

  return new Promise((resolve) => {
    const order = [0];
    for (let i = 1; i < TOTAL_FRAMES; i++) order.push(i);

    let nextIdx = 0;

    function loadNext() {
      if (nextIdx >= order.length) return;
      const idx = order[nextIdx++];
      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameUrl(idx);

      img.onload = () => {
        images[idx] = img;
        loaded++;
        onProgress(loaded, false);
        if (loaded === TOTAL_FRAMES) {
          resolve(images);
        } else {
          loadNext();
        }
      };

      img.onerror = () => {
        // Retry once
        if (!failed.has(idx)) {
          failed.add(idx);
          const retry = new Image();
          retry.decoding = 'async';
          retry.src = getFrameUrl(idx);
          retry.onload = () => {
            images[idx] = retry;
            loaded++;
            onProgress(loaded, false);
            if (loaded === TOTAL_FRAMES) resolve(images);
            else loadNext();
          };
          retry.onerror = () => {
            console.error(`[useScrollFrames] Failed to load frame ${idx + 1}`);
            loaded++;
            onProgress(loaded, true);
            if (loaded === TOTAL_FRAMES) resolve(images);
            else loadNext();
          };
        } else {
          loaded++;
          onProgress(loaded, true);
          if (loaded === TOTAL_FRAMES) resolve(images);
          else loadNext();
        }
      };
    }

    const concurrent = Math.min(8, TOTAL_FRAMES);
    for (let i = 0; i < concurrent; i++) loadNext();
  });
}

/**
 * Crossfade canvas hook — blends consecutive frames via globalAlpha.
 *
 * Uses a single canvas with globalAlpha blending for buttery smooth
 * transitions. rAF batching prevents redundant draws.
 *
 * Cleanup is handled at the outer effect scope to guarantee disposal
 * of ScrollTrigger, resize listener, and pending rAF on unmount.
 */
export function useScrollFrames() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollHeight, setScrollHeight] = useState('600vh');

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    function handleChange(e) {
      setScrollHeight(e.matches ? '600vh' : '300vh');
    }
    handleChange(mql);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Promoted to outer scope so cleanup can access them
    let trigger = null;
    let resizeHandler = null;
    let rafId = null;
    let resizeTimer = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    function drawFrame(img) {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      // Use CSS dimensions — the DPR transform scales drawing automatically
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      if (!cw || !ch) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;

      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    preloadImages((loaded, hasError) => {
      if (cancelled) return;
      if (hasError) {
        console.warn(`[useScrollFrames] ${loaded}/${TOTAL_FRAMES} loaded (some frames failed)`);
      }
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
    }).then((images) => {
      if (cancelled) return;

      resizeCanvas();

      // Draw frame 0
      drawFrame(images[0]);
      setImagesLoaded(true);

      // rAF-batched rendering state
      let pendingProgress = 0;
      let lastRenderedFrame = -1;

      function renderFrame() {
        rafId = null;
        if (cancelled) return;

        const exact = pendingProgress * (TOTAL_FRAMES - 1);
        const fi = Math.min(Math.floor(exact), TOTAL_FRAMES - 2);
        const blend = exact - fi;

        // Only redraw when the visual output actually changes
        const quantized = Math.round(exact * 100);
        if (quantized === lastRenderedFrame) return;
        lastRenderedFrame = quantized;

        // At the very last frame, just draw it directly (avoid double draw)
        if (fi >= TOTAL_FRAMES - 2 && blend > 0.999) {
          ctx.globalAlpha = 1;
          drawFrame(images[TOTAL_FRAMES - 1]);
          return;
        }

        // Draw base frame
        ctx.globalAlpha = 1;
        drawFrame(images[fi]);

        // Crossfade next frame
        if (blend > 0.001 && fi + 1 < TOTAL_FRAMES) {
          ctx.globalAlpha = blend;
          drawFrame(images[fi + 1]);
          ctx.globalAlpha = 1;
        }
      }

      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          pendingProgress = self.progress;
          if (!rafId) {
            rafId = requestAnimationFrame(renderFrame);
          }
        },
      });

      resizeHandler = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resizeCanvas();
          lastRenderedFrame = -1; // force redraw
          if (!rafId) {
            rafId = requestAnimationFrame(renderFrame);
          }
        }, 100);
      };

      window.addEventListener('resize', resizeHandler);
    });

    // Outer cleanup — guaranteed to run on unmount
    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      if (trigger) trigger.kill();
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    containerRef,
    canvasRef,
    imagesLoaded,
    loadProgress,
    scrollHeight,
  };
}
