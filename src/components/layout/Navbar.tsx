import { useState, useEffect } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'

const NAV_ITEMS = [
  { id: 'about',    label: 'About',    num: '01' },
  { id: 'skills',   label: 'Skills',   num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'resume',   label: 'Resume',   num: '04' },
  { id: 'contact',  label: 'Contact',  num: '05' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const active = useActiveSection(['hero', 'about', 'skills', 'projects', 'resume', 'contact'])
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      <nav className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo('hero')}
          className="font-display text-lg font-light text-ink-100 hover:text-accent transition-colors duration-300 tracking-wide"
        >
          <span className="italic">Hijiri</span>{' '}
          <span>Kutsunugi</span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`group flex items-center gap-1.5 text-sm transition-colors duration-300 font-sans tracking-wide ${
                  active === item.id
                    ? 'text-accent'
                    : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                <span className="font-mono text-[10px] text-ink-500 group-hover:text-accent/50 transition-colors duration-300">
                  {item.num}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-1 text-ink-300 hover:text-ink-100 transition-colors"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="メニュー"
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
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-bg-surface/95 backdrop-blur-md border-b border-ink-500/20 px-8 pb-6">
          <ul className="flex flex-col gap-4 pt-5">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { scrollTo(item.id); setMenuOpen(false) }}
                  className={`flex items-center gap-2.5 text-sm transition-colors duration-300 ${
                    active === item.id
                      ? 'text-accent'
                      : 'text-ink-300 hover:text-ink-100'
                  }`}
                >
                  <span className="font-mono text-[10px] text-ink-500">{item.num}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
