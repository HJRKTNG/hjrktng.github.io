import { useRef } from 'react'
import { useStageProgress, range, easeOutCubic } from '../../hooks/useStageProgress'
import { LightField } from './LightField'
import { meta } from '../../data/portfolio'
import { useLang } from '../../i18n'

/* ═══════════════════════════════════════════════════════════
   冒頭 — マクロレンズが引いて、機構の全体が現れる

   極端な寄りのボケた状態から始まり、スクロールに従って
   カメラが後退。名前のプレートが浮かび上がる。
   ═══════════════════════════════════════════════════════════ */

export function MachineHero() {
  const { t } = useLang()

  const imgRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  const containerRef = useStageProgress(p => {
    progressRef.current = Math.min(1, p * 1.6)

    /* カメラ後退: 1.55 → 1.0 → 0.94（着地時点で既に絵として成立させる） */
    if (imgRef.current) {
      const pull = easeOutCubic(range(p, 0, 0.72))
      const out = easeOutCubic(range(p, 0.82, 1))
      const scale = 1.55 - pull * 0.53 - out * 0.06
      const blur = 3.4 * (1 - pull) + out * 10
      const bright = 0.62 + pull * 0.38 - out * 0.42
      const rot = (1 - pull) * 0.8 - out * 0.5

      imgRef.current.style.transform =
        `scale(${scale.toFixed(4)}) rotate(${rot.toFixed(3)}deg) translate3d(0, ${(out * -4).toFixed(2)}%, 0)`
      imgRef.current.style.filter =
        `blur(${blur.toFixed(2)}px) brightness(${Math.max(0, bright).toFixed(3)}) saturate(${(0.86 + pull * 0.3).toFixed(3)})`
    }

    if (veilRef.current) {
      veilRef.current.style.opacity = (0.62 - easeOutCubic(range(p, 0, 0.5)) * 0.24).toFixed(3)
    }

    /* 名前 — 入場は読み込み時のCSSアニメーションに任せ、
       スクロールでは視差と退場だけを担当する */
    if (nameRef.current) {
      const out = range(p, 0.72, 0.92)
      nameRef.current.style.opacity = (1 - out).toFixed(3)
      nameRef.current.style.transform = `translate3d(0, ${(-out * 40).toFixed(2)}px, 0)`
    }

    if (metaRef.current) {
      const out = range(p, 0.62, 0.84)
      metaRef.current.style.opacity = (1 - out).toFixed(3)
      metaRef.current.style.transform = `translate3d(0, ${(-out * 28).toFixed(2)}px, 0)`
    }

    if (cueRef.current) {
      cueRef.current.style.opacity = (1 - range(p, 0.02, 0.16)).toFixed(3)
    }
  })

  return (
    <section id="hero" ref={containerRef} className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg-deep">
        {/* 機構の全景 */}
        <div
          ref={imgRef}
          className="absolute inset-0 stage-layer"
          style={{
            backgroundImage: 'url(/images/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.55)',
            filter: 'blur(3.4px) brightness(0.62)',
          }}
        />

        <LightField progressRef={progressRef} density={40} />

        {/* 暗幕 */}
        <div
          ref={veilRef}
          className="absolute inset-0 pointer-events-none stage-layer"
          style={{
            background:
              'radial-gradient(ellipse at 62% 46%, rgba(5,6,7,0.22) 0%, rgba(5,6,7,0.85) 68%, #050607 100%)',
            opacity: 0.72,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #050607 0%, transparent 100%)' }}
        />

        {/* 内容 */}
        <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center">
          <div className="animate-rise" style={{ animationDelay: '0.15s' }}>
          <div ref={nameRef} className="stage-layer">
            <p className="font-mono text-[10px] md:text-[11px] text-sig tracking-label uppercase mb-6">
              {t(meta.badge)}
            </p>
            <h1
              className="font-display font-bold text-ink-50 leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(58px, 11vw, 168px)' }}
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

          <div className="animate-rise mt-12 max-w-xl" style={{ animationDelay: '0.5s' }}>
          <div ref={metaRef} className="stage-layer">
            <p className="text-ink-200 font-light leading-relaxed text-[15px] md:text-base">
              {t({
                ja: 'ここから先は、私が作ってきたものを1台の機構として辿ります。各ユニットは実在するプロジェクトで、数値はすべて実際の開発と運用に基づいています。',
                en: 'What follows is everything I have built, traced as a single machine. Every unit is a real project, and every number comes from real development and operation.',
              })}
            </p>
            <p className="font-mono text-[11px] text-ink-400 tracking-wider mt-5 leading-relaxed">
              {t(meta.affiliation)}
            </p>
          </div>
          </div>

          {/* スクロール指示 */}
          <div
            ref={cueRef}
            className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex items-center gap-4 stage-layer"
          >
            <div className="relative w-px h-14 bg-line overflow-hidden">
              <div className="absolute inset-x-0 h-5 bg-gradient-to-b from-transparent via-sig to-transparent animate-scan" />
            </div>
            <span className="font-mono text-[10px] text-ink-400 tracking-label uppercase">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
