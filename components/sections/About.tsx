'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MaskReveal, FadeReveal } from '@/components/Reveal';
import { ABOUT, TOOLS } from '@/lib/content';

function Portrait() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-card bg-blush">
      <motion.div style={{ y: reduced ? 0 : y }} className="absolute inset-0 -top-[6%] h-[112%]">
        {!failed ? (
          <img
            src={ABOUT.photoSrc}
            alt={ABOUT.photoAlt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={ABOUT.photoAlt}
            className="flex h-full w-full items-end justify-start bg-gradient-to-br from-blush via-blush to-rose/40 p-6"
          >
            <span className="font-display text-6xl text-rosewood/60">P.</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-section sm:px-8">
      <span className="label mb-10 block">(01) — About</span>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="font-display text-display-l text-ink">
            <MaskReveal>{ABOUT.heading}</MaskReveal>
          </h2>
          <div className="mt-10 max-w-prose space-y-6">
            {ABOUT.paragraphs.map((paragraph, i) => (
              <FadeReveal key={i} delay={i * 0.12}>
                <p className="text-lead text-ink/75">{paragraph}</p>
              </FadeReveal>
            ))}
          </div>
        </div>

        <FadeReveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <Portrait />
        </FadeReveal>
      </div>

      <FadeReveal className="mt-20" delay={0.1}>
        <div className="overflow-hidden border-y border-blush py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-xl text-taupe">
                {tool}
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rose" />
              </span>
            ))}
          </div>
        </div>
      </FadeReveal>
    </section>
  );
}
