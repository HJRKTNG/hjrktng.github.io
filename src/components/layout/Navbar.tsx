import { useState, useEffect } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLang } from '../../i18n'

/* 計器の目盛りのようなナビゲーション */

const NAV = [
  { id: 'gate-array',  num: '01', ja: 'GATE ARRAY', en: 'GATE ARRAY' },
  { id: 'conduit',     num: '02', ja: 'CONDUIT',    en: 'CONDUIT' },
  { id: 'escapement',  num: '03', ja: 'ESCAPEMENT', en: 'ESCAPEMENT' },
  { id: 'splitter',    num: '04', ja: 'SPLITTER',   en: 'SPLITTER' },
  { id: 'origin',      num: '05', ja: 'ORIGIN',     en: 'ORIGIN' },
  { id: 'spec',        num: '06', ja: 'SPEC',       en: 'SPEC' },
  { id: 'contact',     num: '07', ja: 'CONTACT',    en: 'CONTACT' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop + 8, behavior: 'smooth' })
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center font-mono text-[10px] border border-line" role="group" aria-label="Language">
      {(['ja', 'en'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 tracking-widest uppercase transition-colors duration-300 ${
            lang === l ? 'bg-sig text-bg-deep' : 'text-ink-400 hover:text-sig'
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
  const active = useActiveSection(['hero', ...NAV.map(n => n.id)])
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* 上部バー */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg-deep/85 backdrop-blur-md border-b border-line' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[11px] text-ink-200 hover:text-sig transition-colors tracking-[0.28em] uppercase"
          >
            H. Kutsunugi
          </button>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-mono text-[10px] text-ink-500 tabular-nums tracking-wider">
              {active === 'hero' || !active
                ? '— — —'
                : `UNIT ${NAV.find(n => n.id === active)?.num ?? '--'}`}
            </span>
            <LangToggle />
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden p-1 text-ink-300 hover:text-sig transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={1.5} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* 右端の目盛りナビ（デスクトップ） */}
      <div className="hidden lg:flex fixed right-6 xl:right-9 top-1/2 -translate-y-1/2 z-40 flex-col gap-3.5">
        {NAV.map(item => {
          const on = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="group flex items-center justify-end gap-3"
              aria-label={item.en}
            >
              <span
                className={`font-mono text-[9px] tracking-widest uppercase transition-all duration-300 ${
                  on ? 'text-sig opacity-100' : 'text-ink-500 opacity-0 group-hover:opacity-100'
                }`}
              >
                {item.en}
              </span>
              <span
                className={`block h-px transition-all duration-500 ${
                  on ? 'w-8 bg-sig' : 'w-4 bg-line-bright group-hover:w-6 group-hover:bg-ink-400'
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* モバイルメニュー */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-14 z-50 bg-bg-deep/95 backdrop-blur-md border-b border-line px-6 py-5">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {NAV.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { scrollTo(item.id); setOpen(false) }}
                  className={`flex items-center gap-2 font-mono text-[11px] tracking-wider ${
                    active === item.id ? 'text-sig' : 'text-ink-300'
                  }`}
                >
                  <span className="text-ink-500">{item.num}</span>
                  {item.en}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
