import { meta } from '../../data/portfolio'

export function Footer() {
  return (
    <footer className="border-t border-ink-500/20 py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-base font-light text-ink-300 italic tracking-wide">
          Hijiri Kutsunugi
        </span>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${meta.email}`}
            className="text-xs font-mono text-ink-400 hover:text-accent transition-colors duration-300"
          >
            {meta.email}
          </a>
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-ink-400 hover:text-accent transition-colors duration-300"
          >
            GitHub
          </a>
        </div>

        <p className="font-mono text-xs text-ink-500">© 2025 {meta.nameEn}</p>
      </div>
    </footer>
  )
}
