import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════
   機構の中を流れる光 — Canvas 2D のオーバーレイ

   生成画像の上に、実際に走る光の筋を重ねる。
   進行度（progressRef）が上がるほど流量が増え、
   スクロールが止まっている間もゆっくり脈動し続ける。
   ═══════════════════════════════════════════════════════════ */

interface Streak {
  y: number       // 0..1
  x: number       // 0..1
  speed: number
  len: number
  width: number
  alpha: number
  hue: number     // 0 = cyan, 1 = gold
}

export function LightField({
  progressRef,
  density = 26,
}: {
  progressRef: React.MutableRefObject<number>
  density?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 決定的な擬似乱数（再読み込みでも同じ流れになる）
    let seed = 20260718
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }

    const streaks: Streak[] = Array.from({ length: density }, () => ({
      y: rnd(),
      x: rnd(),
      speed: 0.04 + rnd() * 0.16,
      len: 0.05 + rnd() * 0.22,
      width: 0.6 + rnd() * 1.6,
      alpha: 0.18 + rnd() * 0.5,
      hue: rnd() > 0.82 ? 1 : 0,
    }))

    let raf = 0
    let disposed = false
    let t = 0

    const draw = () => {
      if (disposed) return
      const parent = canvas.parentElement
      const cssW = parent ? parent.clientWidth : window.innerWidth
      const cssH = parent ? parent.clientHeight : window.innerHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)

      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr
        canvas.height = cssH * dpr
        canvas.style.width = `${cssW}px`
        canvas.style.height = `${cssH}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, cssW, cssH)

      const p = progressRef.current
      // 中央付近で最も明るく、出入りでフェード
      const intensity = Math.sin(Math.min(1, Math.max(0, p)) * Math.PI)
      if (intensity <= 0.01) {
        raf = requestAnimationFrame(draw)
        return
      }

      t += reduce ? 0 : 0.016
      ctx.globalCompositeOperation = 'lighter'

      for (const s of streaks) {
        const x = ((s.x + t * s.speed) % 1.25) - 0.125
        const px = x * cssW
        const py = s.y * cssH
        const plen = s.len * cssW
        // 呼吸するような明滅
        const breathe = 0.65 + 0.35 * Math.sin(t * 1.6 + s.y * 12)
        const a = s.alpha * intensity * breathe

        const grad = ctx.createLinearGradient(px - plen, py, px, py)
        const color = s.hue === 1 ? '201,162,39' : '79,216,224'
        grad.addColorStop(0, `rgba(${color},0)`)
        grad.addColorStop(0.72, `rgba(${color},${a * 0.5})`)
        grad.addColorStop(1, `rgba(${color},${a})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = s.width
        ctx.beginPath()
        ctx.moveTo(px - plen, py)
        ctx.lineTo(px, py)
        ctx.stroke()

        // 先端のドット
        ctx.fillStyle = `rgba(${color},${a})`
        ctx.fillRect(px - 1, py - 1, 2.4, 2.4)
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
    }
  }, [density, progressRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none stage-layer"
      aria-hidden
    />
  )
}
