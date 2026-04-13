import { meta } from '../../data/portfolio'

export function Footer() {
  return (
    <footer className="border-t border-white/7 py-8 text-center text-slate-500 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono">{meta.nameEn}</p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${meta.email}`}
            className="hover:text-accent transition-colors"
          >
            {meta.email}
          </a>
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="font-mono text-xs">© 2025 {meta.nameEn}</p>
      </div>
    </footer>
  )
}
