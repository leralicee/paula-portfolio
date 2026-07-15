import { SITE } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-blush">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <span className="font-display text-lg text-ink">
          Paula<span className="text-rose">.</span>
        </span>
        <div className="flex items-center gap-6 text-sm text-taupe">
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="link-line text-ink/80">
            LinkedIn
          </a>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="link-line text-ink/80">
            GitHub
          </a>
        </div>
        <span className="text-xs text-taupe">© 2026 Paula — designed & built by me</span>
      </div>
    </footer>
  );
}
