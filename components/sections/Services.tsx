'use client';

import { MaskReveal, FadeReveal } from '@/components/Reveal';
import { SERVICES } from '@/lib/content';

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-section sm:px-8">
      <span className="label mb-10 block">(03) — What I do</span>

      <h2 className="max-w-3xl font-display text-display-l text-ink">
        <MaskReveal>Everything a website</MaskReveal>
        <MaskReveal delay={0.08}>needs to feel alive.</MaskReveal>
      </h2>

      <div className="mt-16 divide-y divide-blush border-y border-blush">
        {SERVICES.map((service, i) => (
          <FadeReveal key={service.index} delay={i * 0.06}>
            <div className="group grid grid-cols-1 items-baseline gap-3 py-8 transition-colors duration-slow ease-soft hover:bg-blush/30 sm:grid-cols-12 sm:gap-6 sm:px-4">
              <span className="font-display text-sm text-rosewood sm:col-span-1">
                {service.index}
              </span>
              <h3 className="font-display text-display-m text-ink transition-transform duration-slow ease-soft group-hover:translate-x-2 sm:col-span-5">
                {service.title}
              </h3>
              <p className="max-w-md text-ink/65 sm:col-span-6">{service.line}</p>
            </div>
          </FadeReveal>
        ))}
      </div>
    </section>
  );
}
