/* ── 軽量 i18n（日英切替）──
   全ての表示文字列は L 型（{ja, en}）で持ち、useLang() の t() で解決する */
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'ja' | 'en'
export interface L {
  ja: string
  en: string
}

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ja',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'ja' || saved === 'en') return saved
    } catch { /* SSR/プライベートモード対策 */ }
    return 'ja'
  })

  const setLang = (l: Lang) => setLangState(l)

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch { /* noop */ }
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const { lang, setLang } = useContext(LanguageContext)
  const t = (l: L): string => l[lang]
  return { lang, setLang, t }
}
