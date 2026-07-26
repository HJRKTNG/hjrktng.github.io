import { useEffect, useRef } from 'react'
import { stages } from '../../data/machine'

/* ═══════════════════════════════════════════════════════════
   深度計 — いま機構のどこまで降りたかを示す細い固定計器
   目盛りと指針だけの最小構成にし、本文とは干渉させない
   ═══════════════════════════════════════════════════════════ */

const TICKS = 26

export function DepthGauge({ regionId }: { regionId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const readRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let smooth = -1
    let lastTick = 0
    let lastLabel = ''

    const apply = (immediate = false) => {
      const region = document.getElementById(regionId)
      const wrap = wrapRef.current
      if (region && wrap) {
        const vh = window.innerHeight || 1
        const rect = region.getBoundingClientRect()
        const target = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - vh)))

        if (immediate || smooth < 0) smooth = target
        else {
          const d = target - smooth
          smooth = Math.abs(d) < 0.0001 ? target : smooth + d * 0.08
        }

        if (needleRef.current) needleRef.current.style.transform = `translateY(${(smooth * 100).toFixed(2)}%)`
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${smooth.toFixed(4)})`
        if (readRef.current) readRef.current.textContent = String(Math.round(smooth * 100)).padStart(2, '0')

        /* 現在のユニット名（縦書き）を差し替える */
        const idx = Math.min(stages.length - 1, Math.max(0, Math.floor(((smooth - 0.08) / 0.92) * stages.length)))
        const name = `${stages[idx].index} ${stages[idx].eyebrow}`
        if (labelRef.current && name !== lastLabel) {
          lastLabel = name
          labelRef.current.textContent = name
        }

        /* 冒頭（名前を見せる区間）と機構区間の外では隠す */
        const inRegion = rect.top < vh * 0.5 && rect.bottom > vh * 0.5
        wrap.style.opacity = inRegion && smooth > 0.075 ? '1' : '0'
      }
      lastTick = performance.now()
      if (!immediate) raf = requestAnimationFrame(() => apply())
    }

    apply(true)
    const onVisible = () => { if (document.visibilityState === 'visible') apply(true) }
    const onScroll = () => { if (performance.now() - lastTick > 220) apply(true) }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(() => apply())

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('scroll', onScroll)
    }
  }, [regionId])

  return (
    <div
      ref={wrapRef}
      className="hidden lg:flex fixed left-6 xl:left-8 top-0 h-screen z-20 items-center pointer-events-none transition-opacity duration-700"
      style={{ opacity: 0 }}
      aria-hidden
    >
      <div className="relative flex items-center gap-2.5" style={{ height: '46vh' }}>
        {/* 現在ユニット名（縦書き） */}
        <div
          ref={labelRef}
          className="font-mono text-[9px] text-sig/80 tracking-[0.3em] uppercase whitespace-nowrap self-center"
          style={{ writingMode: 'vertical-rl' }}
        >
          01 GATE ARRAY
        </div>

        {/* 目盛り */}
        <div className="relative h-full w-2.5 flex flex-col justify-between items-end">
          {Array.from({ length: TICKS }).map((_, i) => (
            <span
              key={i}
              className="block bg-line-bright"
              style={{ width: i % 5 === 0 ? 10 : 5, height: 1 }}
            />
          ))}
        </div>

        {/* 主軸 + 到達分 + 指針 */}
        <div className="relative h-full w-px bg-line">
          <div
            ref={fillRef}
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-sig/60 to-sig"
            style={{ transform: 'scaleY(0)' }}
          />
          <div ref={needleRef} className="absolute -left-[3px] top-0" style={{ transform: 'translateY(0%)' }}>
            <span className="block w-[7px] h-[7px] bg-sig rotate-45 -translate-y-1/2 shadow-[0_0_12px_rgba(79,216,224,0.9)]" />
          </div>
        </div>

        {/* 深度の読み */}
        <div className="absolute -bottom-8 left-0 font-mono text-[9px] text-ink-500 tracking-[0.2em] tabular-nums">
          <span ref={readRef} className="text-sig">00</span>%
        </div>
      </div>
    </div>
  )
}
