'use client';

import { useEffect, useState } from 'react';
import { MaskReveal, FadeReveal } from '@/components/Reveal';
import Magnetic from '@/components/Magnetic';
import { PROJECTS, type Project } from '@/lib/content';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function LivePreview({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const [canEmbed, setCanEmbed] = useState(false);
  const [armed, setArmed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCanEmbed(window.matchMedia('(pointer: fine)').matches && !reduced);
  }, [reduced]);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      data-cursor-label="Visit"
      aria-label={`Open the live site of ${project.name}`}
      onMouseEnter={() => canEmbed && setArmed(true)}
      onFocus={() => canEmbed && setArmed(true)}
      className="group/preview relative block aspect-[16/10] overflow-hidden rounded-card border border-porcelain/10 bg-ink"
    >
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-slower ease-soft"
        style={{
          background: `radial-gradient(120% 130% at 50% 115%, ${project.accent}33, transparent 55%), linear-gradient(160deg, #2b2427, #211C1E 65%)`,
          opacity: loaded ? 0 : 1,
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <span className="font-display text-4xl text-porcelain/90 sm:text-5xl">
            {project.name}
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.28em] text-porcelain/45">
            {canEmbed ? 'Hover to load the live site' : 'Tap to open the live site'}
          </span>
        </div>
      </div>

      {armed && (
        <div aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            tabIndex={-1}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="origin-top-left"
            style={{
              width: '400%',
              height: '400%',
              transform: 'scale(0.25)',
              border: '0',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          />
        </div>
      )}

      <span className="absolute bottom-4 right-4 z-base rounded-full bg-porcelain px-4 py-2 text-xs font-medium text-ink opacity-0 transition-opacity duration-slow ease-soft group-hover/preview:opacity-100">
        Open live ↗
      </span>
    </a>
  );
}

export default function Work() {
  return (
    <section id="work" className="rounded-t-band bg-ink text-porcelain">
      <div className="mx-auto max-w-7xl px-5 py-section sm:px-8">
        <span className="label mb-10 block !text-porcelain/50">(04) — Selected work</span>

        <h2 className="max-w-4xl font-display text-display-l">
          <MaskReveal>Real sites, live right now.</MaskReveal>
          <MaskReveal delay={0.08}>Go ahead — touch them.</MaskReveal>
        </h2>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {PROJECTS.map((project, i) => (
            <article
              key={project.index}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <FadeReveal
                className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2 lg:col-start-6' : ''}`}
              >
                <LivePreview project={project} />
              </FadeReveal>

              <FadeReveal
                delay={0.12}
                className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : ''}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm" style={{ color: project.accent }}>
                    {project.index}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.26em] text-porcelain/50">
                    {project.kind} · {project.year}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-display-m">{project.name}</h3>
                <p className="mt-5 max-w-md leading-relaxed text-porcelain/70">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-porcelain/20 px-3.5 py-1.5 text-xs text-porcelain/75"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <Magnetic className="mt-8">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="Visit"
                    className="inline-flex items-center gap-3 rounded-full bg-porcelain px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 ease-soft hover:scale-[1.04]"
                  >
                    Visit live site <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              </FadeReveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
