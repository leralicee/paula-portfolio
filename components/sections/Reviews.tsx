'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MaskReveal, FadeReveal } from '@/components/Reveal';
import { REVIEWS } from '@/lib/content';

export default function Reviews() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const track = trackRef.current;
      if (!rail || !track) return;
      setDragLimit(Math.max(0, track.scrollWidth - rail.clientWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section id="reviews" className="overflow-hidden py-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="label mb-10 block">(05) — Kind words</span>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-display-l text-ink">
            <MaskReveal>What clients say.</MaskReveal>
          </h2>
          <span className="hidden text-xs uppercase tracking-[0.26em] text-taupe md:block">
            Drag →
          </span>
        </div>
      </div>

      <FadeReveal delay={0.1}>
        <div ref={railRef} className="mt-14 pl-5 sm:pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -dragLimit, right: 0 }}
            dragElastic={0.06}
            data-cursor-label="Drag"
            className="flex w-max cursor-grab gap-6 pr-10 active:cursor-grabbing"
          >
            {REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="flex w-[min(80vw,26rem)] shrink-0 flex-col justify-between rounded-card border border-blush bg-porcelain p-8 shadow-[0_18px_50px_-30px_rgba(142,66,87,0.25)]"
              >
                <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blush font-display text-lg text-rosewood"
                  >
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{review.name}</span>
                    <span className="block text-xs text-taupe">{review.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </FadeReveal>
    </section>
  );
}
