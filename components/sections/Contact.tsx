'use client';

import { FormEvent, useState } from 'react';
import { MaskReveal, FadeReveal } from '@/components/Reveal';
import Magnetic from '@/components/Magnetic';
import { CONTACT, SITE } from '@/lib/content';

const FORM_ENDPOINT = 'https://formspree.io/f/xkolkapr';

const FIELD =
  'w-full rounded-xl border border-blush bg-white/60 px-5 py-4 text-ink placeholder:text-taupe/70 transition-colors duration-300 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/40';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-blush/40">
      <div className="mx-auto max-w-7xl px-5 py-section sm:px-8">
        <span className="label mb-10 block">(06) — Contact</span>

        <h2 className="group font-display text-display-xl leading-none text-ink transition-[letter-spacing] duration-slower ease-soft hover:tracking-[0.06em]">
          <MaskReveal>{CONTACT.heading}</MaskReveal>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <FadeReveal className="lg:col-span-6">
            {status === 'done' ? (
              <div role="status" className="rounded-card border border-rose/50 bg-porcelain p-10">
                <p className="font-display text-display-m text-rosewood">{CONTACT.success}</p>
                <p className="mt-3 text-ink/60">
                  I&apos;ll reply to the address you left as soon as I can.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="label mb-2 block">
                    Name
                  </label>
                  <input id="c-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={FIELD} />
                </div>
                <div>
                  <label htmlFor="c-email" className="label mb-2 block">
                    Email
                  </label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={FIELD} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="label mb-2 block">
                    Project
                  </label>
                  <textarea id="c-message" name="message" required rows={5} placeholder="Tell me what you're dreaming of…" className={`${FIELD} resize-none`} />
                </div>
                <div className="sm:col-span-2">
                  <Magnetic>
                    <button
                      type="submit"
                      data-cursor-label="Send"
                      className="inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-sm font-medium text-porcelain transition-transform duration-300 ease-soft hover:scale-[1.04]"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                      <span aria-hidden>→</span>
                    </button>
                  </Magnetic>
                  {status === 'error' && (
                    <p role="alert" className="mt-4 text-sm text-rosewood">
                      Something went wrong — reach me on LinkedIn instead.
                    </p>
                  )}
                </div>
              </form>
            )}
          </FadeReveal>

          <FadeReveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-ink/70">{CONTACT.line}</p>
            <div className="mt-8 space-y-4">
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" data-cursor-label="Open" className="link-line block w-fit text-ink">
                LinkedIn ↗
              </a>
              <a href={SITE.github} target="_blank" rel="noreferrer" data-cursor-label="Open" className="link-line block w-fit text-ink">
                GitHub ↗
              </a>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
}
