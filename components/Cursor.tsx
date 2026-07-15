'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.body.dataset.cursor = 'on';

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let active = false;
    let raf = 0;
    let running = false;

    const paint = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      const settled =
        Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      running = !settled;
      if (running) raf = requestAnimationFrame(paint);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const s = active ? 2.4 : 1;
        ringRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${s})`;
        ringRef.current.style.backgroundColor = active
          ? 'rgba(225,137,155,0.18)'
          : 'transparent';
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y + 34}px, 0) translate(-50%, 0)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as Element | null)?.closest(
        'a, button, [data-cursor-label], input, textarea, select',
      );
      active = !!el;
      const label = el instanceof HTMLElement ? el.dataset.cursorLabel ?? '' : '';
      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = label ? '1' : '0';
      }
      if (!running) {
        running = true;
        paint();
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    paint();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      delete document.body.dataset.cursor;
    };
  }, [reduced]);

  if (reduced || !enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-cursor">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-rosewood will-change-transform"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-rose transition-colors duration-300 will-change-transform"
      />
      <span
        ref={labelRef}
        className="absolute left-0 top-0 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-rosewood opacity-0 transition-opacity duration-200 will-change-transform"
      />
    </div>
  );
}
