import type { Variants } from 'framer-motion';

export const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const maskUp: Variants = {
  hidden: { y: '110%', rotate: 3 },
  show: { y: 0, rotate: 0 },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export const REVEAL_VIEWPORT = { once: true, margin: '-90px' } as const;
