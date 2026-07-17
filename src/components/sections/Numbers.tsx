import { useEffect, useRef, useState } from 'react'
import { numbers } from '../../data/portfolio'
import { useLang } from '../../i18n'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* カウントアップ表示 — 可視化されたら 1.2s かけて目標値へ */
function CountUp({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const duration = 1200
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])

  return <>{value}</>
}

export function Numbers() {
  const { t } = useLang()
  const { ref, visible } = useScrollReveal({ threshold: 0.3 })

  return (
    <section className="relative bg-bg-base border-y border-ink-500/15 overflow-hidden">
      {/* subtle center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.04) 0%, transparent 70%)' }}
      />

      <div
        ref={ref}
        className="max-w-6xl mx-auto px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
      >
        {numbers.map((n, i) => (
          <div
            key={i}
            className={`relative transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
          >
            {/* voxel-ish corner accent */}
            <div className="absolute -left-3 top-1 w-1.5 h-1.5 bg-accent/60" />
            <div className="absolute -left-3 top-3 w-1.5 h-1.5 bg-accent/25" />

            <div className="flex items-baseline gap-1">
              {n.prefix && (
                <span className="font-mono text-xl text-ink-400">{n.prefix}</span>
              )}
              <span className="font-display text-5xl md:text-6xl font-light text-ink-50 tabular-nums leading-none">
                <CountUp target={n.value} active={visible} />
              </span>
              {n.suffix && (
                <span className="font-mono text-lg text-accent ml-0.5">{t(n.suffix)}</span>
              )}
            </div>
            <p className="mt-3 text-xs text-ink-400 font-light leading-relaxed max-w-[210px]">
              {t(n.label)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
