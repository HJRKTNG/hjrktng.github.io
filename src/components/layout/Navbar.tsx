import { useState } from 'react'
import { meta } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'

const NAV_ITEMS = [
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume',   label: 'Resume' },
  { id: 'contact',  label: 'Contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const active = useActiveSection(['hero', 'about', 'skills', 'projects', 'resume', 'contact'])
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-white/7">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono text-sm font-bold text-accent hover:text-accent-hover transition-colors"
        >
          {meta.nameEn}
        </button>

        {/* デスクトップリンク */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`text-sm transition-colors font-mono ${
                  active === item.id
                    ? 'text-accent'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ハンバーガー（モバイル） */}
        <button
          className="md:hidden p-1 text-slate-400 hover:text-slate-200 transition-colors"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="メニュー"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-bg-surface border-b border-white/7 px-6 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { scrollTo(item.id); setMenuOpen(false) }}
                  className={`text-sm font-mono transition-colors ${
                    active === item.id ? 'text-accent' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
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
