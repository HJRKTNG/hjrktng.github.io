import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════════════
   スクロール駆動アニメーションの基盤

   ・単一の rAF ループで、要素がスティッキー区間をどれだけ
     進んだか（0→1）を毎フレーム算出する
   ・生のスクロール値ではなく lerp で補間した値を渡すため、
     ホイールの離散的な入力でもカメラが滑らかに動く
   ・React の再レンダリングを一切起こさず、コールバック内で
     DOM のスタイルを直接書き換える前提（60fps を維持する）
   ═══════════════════════════════════════════════════════════ */

type FrameFn = (progress: number) => void

interface Options {
  /** 補間の強さ。小さいほど滑らかで遅延が大きい */
  ease?: number
}

export function useStageProgress<T extends HTMLElement = HTMLDivElement>(
  onFrame: FrameFn,
  { ease = 0.085 }: Options = {},
) {
  const containerRef = useRef<T>(null)
  const cbRef = useRef(onFrame)
  cbRef.current = onFrame

  useEffect(() => {
    let raf = 0
    let smooth = -1
    let lastTick = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tick = (immediate = false) => {
      const el = containerRef.current
      if (el) {
        if (immediate) smooth = -1
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight || 1
        // スティッキー区間の移動量（コンテナ高 - ビューポート高）
        const travel = Math.max(1, rect.height - vh)
        const target = Math.min(1, Math.max(0, -rect.top / travel))

        if (smooth < 0 || reduce) {
          smooth = target
        } else {
          const d = target - smooth
          // 差が微小なときはスナップして無限に微動するのを防ぐ
          smooth = Math.abs(d) < 0.0002 ? target : smooth + d * ease
        }
        cbRef.current(smooth)
      }
      lastTick = performance.now()
      if (!immediate) raf = requestAnimationFrame(() => tick())
    }

    /* rAF はタブが非表示だと停止する。読み込み直後や復帰直後に
       スタイルが未適用のまま残らないよう、まず一度同期で反映する */
    tick(true)
    const onVisible = () => {
      if (document.visibilityState === 'visible') tick(true)
    }
    /* rAF が止まっている（非表示タブ・強い省電力）間にスクロールされても
       状態が取り残されないよう、間隔が空いたときだけ同期で追いつく。
       通常時（16ms間隔）はこの分岐に入らないため滑らかさは損なわれない */
    const onScroll = () => {
      if (performance.now() - lastTick > 220) tick(true)
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('scroll', onScroll, { passive: true })

    raf = requestAnimationFrame(() => tick())
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ease])

  return containerRef
}

/* ── 補助: 全体進行度 p のうち [a,b] 区間を 0→1 に正規化 ── */
export function range(p: number, a: number, b: number): number {
  if (b === a) return p >= b ? 1 : 0
  return Math.min(1, Math.max(0, (p - a) / (b - a)))
}

/* ── 補助: 0→1→0 の山（入場してから退場するまで） ── */
export function bell(p: number, inA: number, inB: number, outA: number, outB: number): number {
  return range(p, inA, inB) * (1 - range(p, outA, outB))
}

/* ── 補助: イージング ── */
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
