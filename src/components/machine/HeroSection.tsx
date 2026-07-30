import { useRef } from 'react'
import { useStageProgress, range } from '../../hooks/useStageProgress'
import { meta } from '../../data/portfolio'
import { useLang } from '../../i18n'

/* 冒頭 — 流れ続けるカラムの前に名前が置かれ、静かに送り出される */

export function HeroSection() {
  const { t } = useLang()
  const nameRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)

  const containerRef = useStageProgress(p => {
    if (nameRef.current) {
      const out = range(p, 0.66, 0.98)
      nameRef.current.style.opacity = (1 - out).toFixed(3)
      nameRef.current.style.transform = `translate3d(0, ${(-out * 56).toFixed(2)}px, 0)`
    }
    if (metaRef.current) {
      const out = range(p, 0.58, 0.92)
      metaRef.current.style.opacity = (1 - out).toFixed(3)
      metaRef.current.style.transform = `translate3d(0, ${(-out * 40).toFixed(2)}px, 0)`
    }
    if (cueRef.current) {
      cueRef.current.style.opacity = (1 - range(p, 0.03, 0.16)).toFixed(3)
    }
  })

  return (
    <section id="hero" ref={containerRef} className="relative" style={{ height: '145vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="animate-rise" style={{ animationDelay: '0.15s' }}>
            <div ref={nameRef} className="stage-layer">
              <p className="font-mono text-[10px] md:text-[11px] text-sig tracking-label uppercase mb-6">
                {t(meta.badge)}
              </p>
              <h1
                className="font-display font-bold text-ink-50 leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(54px, 10vw, 150px)' }}
              >
                沓脱 聖
              </h1>
              <div className="flex flex-wrap items-center gap-5 mt-5">
                <span className="font-mono text-xs md:text-sm text-ink-300 tracking-[0.3em]">
                  HIJIRI KUTSUNUGI
                </span>
                <div className="h-px w-24 bg-gradient-to-r from-sig/70 to-transparent" />
              </div>
            </div>
          </div>

          <div className="animate-rise mt-11 max-w-lg" style={{ animationDelay: '0.5s' }}>
            <div ref={metaRef} className="stage-layer">
              <p className="text-ink-200 font-light leading-relaxed text-[15px]">
                {t({
                  ja: 'ここから先は、私が作ってきたものが1本の機構として繋がっています。降りていくほど古い層になり、最深部には高校時代の手ハンダの基板があります。',
                  en: 'From here on, everything I have built is connected as a single machine. The deeper you descend, the older the layers — at the very bottom sits a circuit board I soldered by hand in high school.',
                })}
              </p>
              <p className="font-mono text-[11px] text-ink-400 tracking-wider mt-5 leading-relaxed">
                {t(meta.affiliation)}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={cueRef}
          className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex items-center gap-4 stage-layer"
        >
          <div className="relative w-px h-14 bg-line overflow-hidden">
            <div className="absolute inset-x-0 h-5 bg-gradient-to-b from-transparent via-sig to-transparent animate-scan" />
          </div>
          <span className="font-mono text-[10px] text-ink-400 tracking-label uppercase">
            {t({ ja: '降りる', en: 'Descend' })}
          </span>
        </div>
      </div>
    </section>
  )
}
