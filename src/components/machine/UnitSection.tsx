import { useEffect, useRef, useState } from 'react'
import { useStageProgress, range, easeOutCubic } from '../../hooks/useStageProgress'
import { useLang } from '../../i18n'
import type { Stage } from '../../data/machine'

/* ═══════════════════════════════════════════════════════════
   ユニットの解説 — 背後を流れ続けるカラムの上に情報を重ねる

   ・数値を大きく掲げ、そこから引き出し線を機構へ伸ばす
     （製図の引出線と同じ作法で、文字と絵を1枚の図面にする）
   ・絵は MachineColumn 側で途切れず動くので、ここは
     テキストの出入りと線の伸長だけを担当する
   ═══════════════════════════════════════════════════════════ */

export function UnitSection({ stage }: { stage: Stage }) {
  const { lang, t } = useLang()

  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const metricRef = useRef<HTMLDivElement>(null)
  const leadLineRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const specRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  /* ── 画面高に収める自動調整 ──
     内容が画面より高いと sticky の中で上下が見切れるため、
     はみ出す場合だけ全体を縮めて必ず画面内に収める */
  const fitRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState(1)
  /* stick = 画面に固定して見せる / flow = 収まらないので普通に流して読ませる */
  const [mode, setMode] = useState<'stick' | 'flow'>('stick')
  const modeRef = useRef<'stick' | 'flow'>('stick')

  useEffect(() => {
    const measure = () => {
      const el = fitRef.current
      if (!el) return
      const prev = el.style.transform
      el.style.transform = 'none'
      const h = el.scrollHeight
      el.style.transform = prev
      const avail = (window.innerHeight || 1) * 0.86
      if (h <= avail) {
        setFit(1); setMode('stick'); modeRef.current = 'stick'
      } else if (avail / h >= 0.84) {
        // わずかに溢れる程度なら、少しだけ縮めて固定表示を保つ
        setFit(avail / h); setMode('stick'); modeRef.current = 'stick'
      } else {
        // 大きく溢れる（画面が低い・モバイル）ときは固定をやめて普通に読ませる
        setFit(1); setMode('flow'); modeRef.current = 'flow'
      }
    }
    measure()
    const t1 = setTimeout(measure, 300)
    const t2 = setTimeout(measure, 1200)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      window.removeEventListener('resize', measure)
    }
  }, [lang])

  const containerRef = useStageProgress(p => {
    const set = (
      el: HTMLElement | null,
      inA: number, inB: number, outA: number, outB: number,
      dy = 34, dx = 0,
    ) => {
      if (!el) return
      const a = range(p, inA, inB) * (1 - range(p, outA, outB))
      const e = easeOutCubic(range(p, inA, inB + (inB - inA)))
      el.style.opacity = a.toFixed(3)
      el.style.transform =
        `translate3d(${(dx * (1 - e)).toFixed(2)}px, ${((1 - e) * dy - range(p, outA, outB) * 26).toFixed(2)}px, 0)`
    }

    if (modeRef.current === 'flow') {
      // 流し読みモードでは出入りさせず、常に読める状態にしておく
      for (const el of [eyebrowRef.current, headRef.current, metricRef.current, bodyRef.current, specRef.current]) {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none' }
      }
      if (leadLineRef.current) leadLineRef.current.style.transform = 'scaleX(1)'
      if (nodeRef.current) { nodeRef.current.style.opacity = '1'; nodeRef.current.style.transform = 'scale(1)' }
      if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(4)})`
      return
    }

    /* 端に無表示の区間ができないよう、入りは 0 から・退きは 1 まで使い切る。
       順番のずれ（スタッガー）は保ちつつ、中盤は全要素が出そろった状態を長く保つ */
    set(eyebrowRef.current, 0.00, 0.07, 0.94, 1.00, 18)
    set(headRef.current,    0.02, 0.11, 0.91, 0.99, 34)
    set(metricRef.current,  0.06, 0.17, 0.88, 0.97, 26)
    set(bodyRef.current,    0.10, 0.23, 0.86, 0.96, 28)
    set(specRef.current,    0.15, 0.29, 0.84, 0.95, 18, 24)

    /* 引き出し線が機構へ向かって伸びる */
    if (leadLineRef.current) {
      const grow = easeOutCubic(range(p, 0.08, 0.30)) * (1 - range(p, 0.88, 0.97))
      leadLineRef.current.style.transform = `scaleX(${grow.toFixed(4)})`
    }
    if (nodeRef.current) {
      const a = range(p, 0.26, 0.36) * (1 - range(p, 0.88, 0.97))
      nodeRef.current.style.opacity = a.toFixed(3)
      nodeRef.current.style.transform = `scale(${(0.4 + a * 0.6).toFixed(3)})`
    }

    if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(4)})`
  })

  return (
    <section
      id={stage.id}
      ref={containerRef}
      className="relative"
      style={mode === 'stick' ? { height: stage.tall ? '215vh' : '185vh' } : undefined}
    >
      <div
        className={
          mode === 'stick'
            ? 'sticky top-0 h-screen flex items-center'
            : 'relative flex items-center py-20 md:py-24'
        }
      >
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 xl:px-28">
          <div
            ref={fitRef}
            style={{ transform: fit < 1 ? `scale(${fit.toFixed(3)})` : undefined, transformOrigin: 'left center' }}
          >
          {/* ── ラベル ── */}
          <div ref={eyebrowRef} className="stage-layer mb-5 flex items-center gap-4" style={{ opacity: 0 }}>
            <span className="font-mono text-[11px] text-sig tracking-label uppercase">
              {stage.eyebrow}
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-sig/60 to-transparent" />
            <span className="font-mono text-[11px] text-ink-400 tabular-nums">
              UNIT {stage.index}
            </span>
          </div>

          {/* ── 見出し ── */}
          <div ref={headRef} className="stage-layer mb-8 max-w-xl lg:max-w-[600px]" style={{ opacity: 0 }}>
            <h2
              className="font-display font-bold text-ink-50 leading-[1.05] tracking-tight whitespace-pre-line"
              style={{ fontSize: 'clamp(26px, min(3.7vw, 5.4vh), 54px)' }}
            >
              {t(stage.title)}
            </h2>
            <p className="mt-4 text-sig/90 font-light leading-relaxed text-[15px] md:text-base">
              {t(stage.lead)}
            </p>
          </div>

          {/* ── 主要数値 + 機構への引き出し線 ── */}
          {stage.metric && (
            <div ref={metricRef} className="stage-layer mb-7" style={{ opacity: 0 }}>
              <div className="flex items-center gap-5">
                <div className="flex items-baseline gap-2 shrink-0">
                  <span
                    className="font-display font-bold text-ink-50 leading-none tabular-nums"
                    style={{ fontSize: 'clamp(40px, min(5.8vw, 9vh), 82px)' }}
                  >
                    {stage.metric.value}
                  </span>
                  {stage.metric.unit && (
                    <span className="font-display text-xl md:text-2xl text-sig font-normal">
                      {stage.metric.unit}
                    </span>
                  )}
                </div>

                {/* 引き出し線（機構の方向へ伸びる） */}
                <div className="hidden md:flex items-center flex-1 min-w-0 max-w-[46%]">
                  <div
                    ref={leadLineRef}
                    className="h-px w-full origin-left bg-gradient-to-r from-sig via-sig/60 to-sig/25 stage-layer"
                    style={{ transform: 'scaleX(0)' }}
                  />
                  <div
                    ref={nodeRef}
                    className="relative shrink-0 stage-layer"
                    style={{ opacity: 0 }}
                  >
                    <span className="block w-2 h-2 border border-sig rotate-45 bg-bg-deep" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-sig" />
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[12.5px] text-ink-300 font-light tracking-wide max-w-md">
                {t(stage.metric.caption)}
              </p>
            </div>
          )}

          {/* ── 本文 ── */}
          <div ref={bodyRef} className="stage-layer space-y-3 max-w-xl lg:max-w-[560px]" style={{ opacity: 0 }}>
            {stage.body.map((b, i) => (
              <div key={i} className="flex gap-4 border-l border-line pl-4 hover:border-sig/40 transition-colors duration-500">
                <span className="font-mono text-[10px] text-ink-500 pt-[3px] shrink-0 w-9 tracking-wider uppercase">
                  {b.label}
                </span>
                <p className="text-[13px] md:text-[13.5px] text-ink-200 font-light leading-relaxed">
                  {t(b.text)}
                </p>
              </div>
            ))}

            {stage.links && stage.links.length > 0 && (
              <div className="flex flex-wrap items-center gap-5 pt-2 pl-4">
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

          {/* ── 仕様パネル ── */}
          <div
            ref={specRef}
            className="stage-layer relative crop-mark mt-7 p-5 max-w-xl lg:max-w-[560px] backdrop-blur-[2px]"
            style={{ opacity: 0, background: 'rgba(8,9,10,0.55)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[9px] text-ink-500 tracking-label uppercase">Specification</span>
              <div className="flex-1 h-px rule-tick opacity-50" />
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
              {stage.specs.map(s => (
                <div key={s.label}>
                  <dt className="font-mono text-[9px] text-ink-500 tracking-wider uppercase mb-1">
                    {s.label}
                  </dt>
                  <dd className="font-mono text-[11.5px] text-ink-100 leading-snug">
                    {t(s.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          </div>

          {/* 左レールの進行ゲージ */}
          <div className="absolute left-2 md:left-5 lg:left-10 top-0 bottom-0 w-px bg-line hidden md:block">
            <div
              ref={barRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-sig via-sig/50 to-transparent stage-layer"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
