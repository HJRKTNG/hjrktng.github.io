import { meta, ui } from '../../data/portfolio'
import { useLang } from '../../i18n'

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-ink-300 tracking-[0.28em] uppercase">
            Hijiri Kutsunugi
          </span>
          <span className="font-mono text-[10px] text-ink-500 tracking-wider">
            {t(ui.footer.handmade)}
          </span>
        </div>

        <div className="flex items-center gap-7">
          <a
            href={`mailto:${meta.email}`}
            className="font-mono text-[10px] text-ink-400 hover:text-sig transition-colors duration-300 tracking-wider"
          >
            EMAIL
          </a>
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-ink-400 hover:text-sig transition-colors duration-300 tracking-wider"
          >
            GITHUB
          </a>
          <span className="font-mono text-[10px] text-ink-500 tabular-nums">© 2026</span>
        </div>
      </div>
    </footer>
  )
}
