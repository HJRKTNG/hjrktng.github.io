import { useState, useEffect } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLang } from '../../i18n'
import { ui } from '../../data/portfolio'

const NAV_IDS = ['about', 'projects', 'research', 'skills', 'resume', 'contact'] as const

const NAV_NUMS: Record<(typeof NAV_IDS)[number], string> = {
  about: '01',
  projects: '02',
  research: '03',
  skills: '04',
  resume: '05',
  contact: '06',
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <div
      className={`flex items-center border border-ink-500/40 font-mono text-[11px] ${compact ? '' : 'ml-2'}`}
      role="group"
      aria-label="Language"
    >
      {(['ja', 'en'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 tracking-widest uppercase transition-colors duration-300 ${
            lang === l
              ? 'bg-accent text-bg-base'
              : 'text-ink-400 hover:text-accent'
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export function Navbar() {
  const active = useActiveSection(['hero', ...NAV_IDS])
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg-base/90 backdrop-blur-md border-b border-ink-500/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-lg font-light text-ink-100 hover:text-accent transition-colors duration-300 tracking-wide shrink-0"
        >
          <span className="italic">Hijiri</span> <span>Kutsunugi</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {NAV_IDS.map(id => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`group flex items-center gap-1.5 text-sm transition-colors duration-300 font-sans tracking-wide ${
                    active === id ? 'text-accent' : 'text-ink-300 hover:text-ink-100'
                  }`}
                >
                  <span className="font-mono text-[10px] text-ink-500 group-hover:text-accent/50 transition-colors duration-300">
                    {NAV_NUMS[id]}
                  </span>
                  {t(ui.nav[id])}
                </button>
              </li>
            ))}
          </ul>
          <LangToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LangToggle compact />
          <button
            className="p-1 text-ink-300 hover:text-ink-100 transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-bg-surface/95 backdrop-blur-md border-b border-ink-500/20 px-8 pb-6">
          <ul className="flex flex-col gap-4 pt-5">
            {NAV_IDS.map(id => (
              <li key={id}>
                <button
                  onClick={() => { scrollTo(id); setMenuOpen(false) }}
                  className={`flex items-center gap-2.5 text-sm transition-colors duration-300 ${
                    active === id ? 'text-accent' : 'text-ink-300 hover:text-ink-100'
                  }`}
                >
                  <span className="font-mono text-[10px] text-ink-500">{NAV_NUMS[id]}</span>
                  {t(ui.nav[id])}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
