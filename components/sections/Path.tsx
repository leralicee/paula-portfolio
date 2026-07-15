'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskReveal, FadeReveal } from '@/components/Reveal';
import { PATH } from '@/lib/content';
import { SOFT_EASE, REVEAL_VIEWPORT } from '@/lib/motion';

function PathPhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-blush">
      {!failed ? (
        <img
          src={PATH.photo.src}
          alt={PATH.photo.alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={PATH.photo.alt}
          className="flex h-full w-full flex-col items-start justify-end gap-1 bg-gradient-to-br from-blush via-blush to-rose/30 p-6"
        >
          <span className="font-display text-3xl text-rosewood/50">Your photo here</span>
          <span className="text-xs tracking-[0.08em] text-taupe">{PATH.photo.spec}</span>
        </div>
      )}
    </div>
  );
}

export default function Path() {
  const reduced = useReducedMotion();

  return (
    <section id="path" className="bg-blush/40">
      <div className="mx-auto max-w-7xl px-5 py-section sm:px-8">
        <span className="label mb-10 block">(02) — Path</span>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <h2 className="font-display text-display-l text-ink">
              <MaskReveal>Where I&apos;m</MaskReveal>
              <MaskReveal delay={0.08}>headed.</MaskReveal>
            </h2>

            <FadeReveal delay={0.1}>
              <p className="mt-7 max-w-sm text-lead text-ink/70">{PATH.supporting}</p>
            </FadeReveal>

            <FadeReveal delay={0.18}>
              <div className="mt-8">
                <span className="label block">Currently</span>
                <ul className="mt-3 space-y-2">
                  {PATH.currently.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-ink/75">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rose" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeReveal>

            <FadeReveal delay={0.26} className="mt-10 max-w-md">
              <PathPhoto />
            </FadeReveal>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <motion.span
              aria-hidden
              className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-rose"
              initial={reduced ? { opacity: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: 1.2, ease: SOFT_EASE }}
            />

            <div className="space-y-12 pl-10">
              {[...PATH.certifications, ...PATH.education].map((entry) => (
                <FadeReveal key={entry.title}>
                  <div className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-10 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose"
                    />
                    <span className="label !text-rosewood">{entry.period}</span>
                    <h3 className="mt-2 font-display text-display-m text-ink">{entry.title}</h3>
                    <p className="mt-2 text-ink/70">{entry.place}</p>
                    <span className="mt-3 inline-block rounded-full border border-rose/60 px-4 py-1.5 text-xs font-medium tracking-[0.08em] text-rosewood">
                      {entry.note}
                    </span>
                  </div>
                </FadeReveal>
              ))}

              <FadeReveal delay={0.1}>
                <div className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-10 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-rose bg-porcelain"
                  />
                  <span className="label">Next</span>
                  <h3 className="mt-2 font-display text-display-m text-ink/60">
                    {PATH.next.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-ink/55">{PATH.next.note}</p>
                </div>
              </FadeReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
