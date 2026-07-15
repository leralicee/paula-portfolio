'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SOFT_EASE } from '@/lib/motion';

const LETTERS = ['P', 'A', 'U', 'L', 'A'];

export default function Preloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const duration = prefersReduced ? 250 : 1500;
    const timer = window.setTimeout(() => setVisible(false), duration);
    const skip = () => setVisible(false);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = '')}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-loader flex items-center justify-center bg-porcelain"
          exit={
            prefersReduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: '-100%', transition: { duration: 0.8, ease: SOFT_EASE } }
          }
        >
          <span className="flex overflow-hidden font-display text-[clamp(3rem,10vw,7rem)] tracking-tight text-ink">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={prefersReduced ? { opacity: 0 } : { y: '110%' }}
                animate={prefersReduced ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 0.7, ease: SOFT_EASE, delay: 0.08 * i }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <motion.span
            aria-hidden
            className="absolute bottom-[38%] h-[2px] w-16 bg-rose"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: SOFT_EASE, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
