'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16 });
  const sy = useSpring(y, { stiffness: 160, damping: 16 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
