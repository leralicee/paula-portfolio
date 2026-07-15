'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SilkField from '@/components/SilkField';
import Magnetic from '@/components/Magnetic';
import { SITE } from '@/lib/content';
import { SOFT_EASE } from '@/lib/motion';
import { scrollToSection } from '@/components/SmoothScroll';

const NAME = ['P', 'a', 'u', 'l', 'a'];

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <SilkField className="absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-porcelain"
      />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-base flex flex-1 flex-col items-center justify-center px-5 pt-24 text-center"
      >
        <motion.p
          className="label mb-5 !text-rosewood"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {SITE.role} — Portfolio
        </motion.p>

        <h1 className="flex overflow-hidden font-display text-display-xl text-ink" aria-label={SITE.name}>
          {NAME.map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block will-change-transform"
              initial={reduced ? { opacity: 0 } : { y: '112%' }}
              animate={reduced ? { opacity: 1 } : { y: 0 }}
              transition={{ duration: 1, ease: SOFT_EASE, delay: 1.45 + i * 0.07 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-md font-display text-display-m text-ink/85"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: SOFT_EASE, delay: 2.05 }}
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.35 }}
          className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#work"
              data-cursor-label="View"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#work');
              }}
              className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-porcelain transition-transform duration-300 ease-soft hover:scale-[1.03]"
            >
              See the work
              <span aria-hidden>↓</span>
            </a>
          </Magnetic>
          <span className="flex items-center gap-2.5 rounded-full border border-rose/50 bg-porcelain/60 px-5 py-2.5 text-xs font-medium tracking-[0.08em] text-rosewood backdrop-blur-sm">
            <span aria-hidden className="h-2 w-2 rounded-full bg-rose" />
            {SITE.status}
          </span>
        </motion.div>
      </motion.div>

      <motion.span
        aria-hidden
        className="relative z-base pb-8 text-center text-[0.65rem] uppercase tracking-[0.3em] text-taupe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.7 }}
      >
        Scroll
      </motion.span>
    </section>
  );
}
