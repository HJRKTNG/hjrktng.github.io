import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useStageProgress, range, easeOutCubic } from '../../hooks/useStageProgress'
import { LightField } from './LightField'
import { useLang } from '../../i18n'
import type { Stage } from '../../data/machine'

/* ═══════════════════════════════════════════════════════════
   機構の1ユニット

   スクロールがそのままマクロレンズのカメラワークになる。
   ・入場: 遠くからボケた状態で寄ってくる（scale↓ blur↓ opacity↑）
   ・滞留: ゆっくりドリフトしながらテキストが順に立ち上がる
   ・退場: 奥へ引きながらボケて次のユニットへ受け渡す
   React の再描画は起こさず、全て DOM に直接書き込む。
   ═══════════════════════════════════════════════════════════ */

export function MachineStage({
  stage,
  extra,
}: {
  stage: Stage
  extra?: ReactNode
}) {
  const { t } = useLang()

  const imgRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const specRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const extraRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  /* 画像は近づいてから読み込む（初回表示を軽くする） */
  const [armed, setArmed] = useState(false)

  const containerRef = useStageProgress(p => {
    progressRef.current = p

    /* ── カメラ: 奥から寄って、また奥へ ── */
    if (imgRef.current) {
      const inP = easeOutCubic(range(p, 0, 0.30))
      const outP = easeOutCubic(range(p, 0.74, 1))
      const scale = 1.32 - inP * 0.30 - outP * 0.10   // 1.32 → 1.02 → 0.92
      const ty = (1 - inP) * 5 - outP * 6              // %
      const blur = (1 - inP) * 16 + outP * 14
      const bright = 0.28 + inP * 0.72 - outP * 0.5
      const opacity = range(p, 0, 0.12) * (1 - range(p, 0.88, 1))

      imgRef.current.style.transform = `scale(${scale.toFixed(4)}) translate3d(0, ${ty.toFixed(3)}%, 0)`
      imgRef.current.style.filter = `blur(${blur.toFixed(2)}px) brightness(${Math.max(0, bright).toFixed(3)}) saturate(${(0.8 + inP * 0.35).toFixed(3)})`
      imgRef.current.style.opacity = opacity.toFixed(3)
    }

    /* ── 読みやすさのための暗幕（テキスト表示中だけ濃くなる） ── */
    if (vignetteRef.current) {
      const v = range(p, 0.10, 0.34) * (1 - range(p, 0.78, 0.94))
      vignetteRef.current.style.opacity = (0.25 + v * 0.72).toFixed(3)
    }

    /* ── ユニット番号 ── */
    if (indexRef.current) {
      const a = range(p, 0.04, 0.16) * (1 - range(p, 0.80, 0.94))
      const y = (1 - easeOutCubic(range(p, 0.04, 0.22))) * 28
      indexRef.current.style.opacity = a.toFixed(3)
      indexRef.current.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }

    /* ── 見出し ── */
    if (headRef.current) {
      const a = range(p, 0.13, 0.27) * (1 - range(p, 0.76, 0.90))
      const y = (1 - easeOutCubic(range(p, 0.13, 0.34))) * 40
      headRef.current.style.opacity = a.toFixed(3)
      headRef.current.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }

    /* ── 本文 ── */
    if (bodyRef.current) {
      const a = range(p, 0.24, 0.38) * (1 - range(p, 0.72, 0.86))
      const y = (1 - easeOutCubic(range(p, 0.24, 0.46))) * 34
      bodyRef.current.style.opacity = a.toFixed(3)
      bodyRef.current.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }

    /* ── 仕様パネル ── */
    if (specRef.current) {
      const a = range(p, 0.34, 0.48) * (1 - range(p, 0.70, 0.84))
      const x = (1 - easeOutCubic(range(p, 0.34, 0.56))) * 30
      specRef.current.style.opacity = a.toFixed(3)
      specRef.current.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`
    }

    /* ── 追加コンテンツ（デモなど） ── */
    if (extraRef.current) {
      const a = range(p, 0.40, 0.54) * (1 - range(p, 0.70, 0.84))
      const y = (1 - easeOutCubic(range(p, 0.40, 0.62))) * 28
      extraRef.current.style.opacity = a.toFixed(3)
      extraRef.current.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }

    /* ── 左レールの進行ゲージ ── */
    if (barRef.current) {
      barRef.current.style.transform = `scaleY(${p.toFixed(4)})`
    }
  })

  useEffect(() => {
    const el = containerRef.current
    if (!el || armed) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true)
          io.disconnect()
        }
      },
      { rootMargin: '120% 0px 120% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [armed, containerRef])

  return (
    <section
      id={stage.id}
      ref={containerRef}
      className="relative"
      style={{ height: stage.tall ? '360vh' : '300vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg-deep">
        {/* ── 機構の写真 ── */}
        <div
          ref={imgRef}
          className="absolute inset-0 stage-layer"
          style={{
            backgroundImage: armed ? `url(${stage.image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: stage.focus ?? 'center',
            opacity: 0,
          }}
        />

        {/* ── 光の流れ ── */}
        <LightField progressRef={progressRef} density={stage.density ?? 26} />

        {/* ── 暗幕: 左からの帯 + 全体の落とし込み ── */}
        <div
          ref={vignetteRef}
          className="absolute inset-0 pointer-events-none stage-layer"
          style={{
            background:
              'linear-gradient(100deg, rgba(5,6,7,0.97) 0%, rgba(5,6,7,0.88) 32%, rgba(5,6,7,0.35) 62%, rgba(5,6,7,0.55) 100%)',
            opacity: 0.25,
          }}
        />
        {/* 上下の締め */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #050607 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #050607 0%, transparent 100%)' }}
        />

        {/* ── 内容 ── */}
        <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="h-full flex items-center">
            <div className="w-full grid lg:grid-cols-12 gap-8 items-center">
              {/* 左: 番号 + 見出し + 本文 */}
              <div className="lg:col-span-7 xl:col-span-6">
                {/* ユニット番号 */}
                <div ref={indexRef} className="stage-layer mb-6 flex items-center gap-5" style={{ opacity: 0 }}>
                  <span className="font-mono text-[11px] text-sig tracking-label uppercase">
                    {stage.eyebrow}
                  </span>
                  <div className="h-px w-16 bg-gradient-to-r from-sig/60 to-transparent" />
                  <span className="font-mono text-[11px] text-ink-400 tabular-nums">
                    UNIT {stage.index}
                  </span>
                </div>

                {/* 見出し */}
                <div ref={headRef} className="stage-layer mb-7" style={{ opacity: 0 }}>
                  <h2
                    className="font-display font-bold text-ink-50 leading-[1.06] tracking-tight"
                    style={{ fontSize: 'clamp(30px, 4.2vw, 62px)' }}
                  >
                    {t(stage.title)}
                  </h2>
                  <p className="mt-4 text-sig/90 font-light leading-relaxed text-base md:text-lg max-w-2xl">
                    {t(stage.lead)}
                  </p>
                </div>

                {/* 本文 */}
                <div ref={bodyRef} className="stage-layer space-y-4 max-w-2xl" style={{ opacity: 0 }}>
                  {stage.body.map((b, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="font-mono text-[10px] text-ink-500 pt-1.5 shrink-0 w-16 tracking-wider uppercase">
                        {b.label}
                      </span>
                      <p className="text-[13.5px] md:text-[14.5px] text-ink-200 font-light leading-relaxed">
                        {t(b.text)}
                      </p>
                    </div>
                  ))}

                  {stage.links && stage.links.length > 0 && (
                    <div className="flex flex-wrap items-center gap-6 pt-3">
                      {stage.links.map(l => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 font-mono text-[11px] text-ink-300 hover:text-sig transition-colors duration-300 tracking-wider"
                        >
                          {l.label}
                          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* 追加コンテンツ */}
                {extra && (
                  <div ref={extraRef} className="stage-layer mt-8" style={{ opacity: 0 }}>
                    {extra}
                  </div>
                )}
              </div>

              {/* 右: 仕様パネル */}
              <div className="lg:col-span-5 xl:col-span-6 lg:flex lg:justify-end">
                <div
                  ref={specRef}
                  className="stage-layer relative crop-mark p-6 md:p-7 w-full lg:max-w-[330px] backdrop-blur-[2px]"
                  style={{ opacity: 0, background: 'rgba(8,9,10,0.62)' }}
                >
                  <p className="font-mono text-[10px] text-ink-500 tracking-label uppercase mb-5">
                    Specification
                  </p>
                  <dl className="space-y-4">
                    {stage.specs.map(s => (
                      <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5">
                        <dt className="font-mono text-[10px] text-ink-400 tracking-wider uppercase shrink-0">
                          {s.label}
                        </dt>
                        <dd className="font-mono text-[12px] text-ink-100 text-right tabular-nums">
                          {t(s.value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* 左レールの進行ゲージ */}
          <div className="absolute left-2 md:left-5 top-0 bottom-0 w-px bg-line hidden md:block">
            <div
              ref={barRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-sig via-sig/60 to-transparent stage-layer"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
