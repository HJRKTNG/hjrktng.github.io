import { useRef } from 'react'
import { useStageProgress, range, easeOutCubic } from '../../hooks/useStageProgress'
import { useLang } from '../../i18n'
import type { Stage } from '../../data/machine'

/* ═══════════════════════════════════════════════════════════
   ユニットの解説 — 背後を流れ続けるカラムの上に文字だけを重ねる

   絵は MachineColumn 側で途切れず動き続けるので、ここは
   テキストの出入りだけを担当し、視線を左→右へ誘導する。
   ═══════════════════════════════════════════════════════════ */

export function UnitSection({ stage }: { stage: Stage }) {
  const { t } = useLang()

  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const specRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

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

    set(eyebrowRef.current, 0.06, 0.18, 0.82, 0.94, 22)
    set(headRef.current,    0.12, 0.26, 0.78, 0.91, 40)
    set(bodyRef.current,    0.22, 0.38, 0.72, 0.86, 32)
    set(specRef.current,    0.32, 0.48, 0.68, 0.83, 22, 28)

    if (barRef.current) barRef.current.style.transform = `scaleY(${p.toFixed(4)})`
  })

  return (
    <section
      id={stage.id}
      ref={containerRef}
      className="relative"
      style={{ height: stage.tall ? '270vh' : '225vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-xl lg:max-w-[560px]">
            {/* 見出し上のラベル */}
            <div ref={eyebrowRef} className="stage-layer mb-6 flex items-center gap-4" style={{ opacity: 0 }}>
              <span className="font-mono text-[11px] text-sig tracking-label uppercase">
                {stage.eyebrow}
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-sig/60 to-transparent" />
              <span className="font-mono text-[11px] text-ink-400 tabular-nums">
                UNIT {stage.index}
              </span>
            </div>

            {/* 見出し */}
            <div ref={headRef} className="stage-layer mb-7" style={{ opacity: 0 }}>
              <h2
                className="font-display font-bold text-ink-50 leading-[1.06] tracking-tight whitespace-pre-line"
                style={{ fontSize: 'clamp(28px, 3.8vw, 56px)' }}
              >
                {t(stage.title)}
              </h2>
              <p className="mt-4 text-sig/90 font-light leading-relaxed text-[15px] md:text-base">
                {t(stage.lead)}
              </p>
            </div>

            {/* 本文 */}
            <div ref={bodyRef} className="stage-layer space-y-3.5" style={{ opacity: 0 }}>
              {stage.body.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-mono text-[10px] text-ink-500 pt-1.5 shrink-0 w-12 tracking-wider uppercase">
                    {b.label}
                  </span>
                  <p className="text-[13px] md:text-[14px] text-ink-200 font-light leading-relaxed">
                    {t(b.text)}
                  </p>
                </div>
              ))}

              {stage.links && stage.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 pt-2">
                  {stage.links.map(l => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[11px] text-ink-300 hover:text-sig transition-colors duration-300 tracking-wider pointer-events-auto"
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

            {/* 仕様 */}
            <div
              ref={specRef}
              className="stage-layer mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 max-w-lg"
              style={{ opacity: 0 }}
            >
              {stage.specs.map(s => (
                <div key={s.label} className="border-t border-line pt-2">
                  <dt className="font-mono text-[9px] text-ink-500 tracking-wider uppercase mb-1">
                    {s.label}
                  </dt>
                  <dd className="font-mono text-[11.5px] text-ink-100 leading-snug">
                    {t(s.value)}
                  </dd>
                </div>
              ))}
            </div>
          </div>

          {/* 左レールの進行ゲージ */}
          <div className="absolute left-2 md:left-5 top-0 bottom-0 w-px bg-line hidden md:block">
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
