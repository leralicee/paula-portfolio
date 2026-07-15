'use client';

import { useEffect, useState } from 'react';
import { NAV, SITE } from '@/lib/content';
import { scrollToSection } from '@/components/SmoothScroll';

function MadridClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: SITE.timezone,
      hour: '2-digit',
      minute: '2-digit',
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 20000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="hidden text-xs tracking-[0.14em] text-taupe md:inline">
      {SITE.location} · {time ?? '--:--'} CET
    </span>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-header transition-colors duration-slow ease-soft ${
        scrolled ? 'bg-porcelain/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#top');
          }}
          className="font-display text-lg tracking-tight text-ink"
        >
          Paula<span className="text-rose">.</span>
        </a>

        <div className="flex items-center gap-6 sm:gap-8">
          <MadridClock />
          <nav className="flex items-center gap-5 sm:gap-7">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="link-line text-sm font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
