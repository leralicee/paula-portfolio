'use client';

import { motion } from 'framer-motion';
import { fadeUp, maskUp, REVEAL_VIEWPORT } from '@/lib/motion';

export function MaskReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      <motion.span
        className="block origin-bottom-left will-change-transform"
        variants={maskUp}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function FadeReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
