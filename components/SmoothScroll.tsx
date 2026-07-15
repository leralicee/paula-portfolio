'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

let lenis: Lenis | null = null;

export function scrollToSection(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -8, duration: 1.4 });
  } else {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}

export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis = instance;

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    instance.scrollTo(window.scrollY, { immediate: true, force: true });
    const syncExternal = () => {
      if (!instance.isScrolling) instance.scrollTo(window.scrollY, { immediate: true, force: true });
    };
    window.addEventListener('scroll', syncExternal, { passive: true });

    return () => {
      window.removeEventListener('scroll', syncExternal);
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis = null;
    };
  }, [reduced]);

  return null;
}
