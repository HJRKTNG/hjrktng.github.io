import { useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════
   スクロールスナップ制御

   機構区間（ユニットを1つずつ見せる区間）にいる間だけ、
   読み位置の近くで止まったときにそっと吸い寄せる。
   強制はしないので、途中で止めたい場所には自由に止められる。
   仕様書や連絡先のような読み物の区間ではスナップを切り、
   自由にスクロールできる状態へ戻す。
   ═══════════════════════════════════════════════════════════ */

export function ScrollSnap({ regionId }: { regionId: string }) {
  useEffect(() => {
    const root = document.documentElement
    let armed: boolean | null = null

    const update = () => {
      const region = document.getElementById(regionId)
      if (!region) return
      const vh = window.innerHeight || 1
      const rect = region.getBoundingClientRect()
      // 機構区間が画面の大半を占めている間だけスナップを有効にする
      const inside = rect.top < vh * 0.25 && rect.bottom > vh * 0.75
      if (inside !== armed) {
        armed = inside
        root.style.scrollSnapType = inside ? 'y proximity' : ''
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      root.style.scrollSnapType = ''
    }
  }, [regionId])

  return null
}

/* セクション内の「読み位置」を示す点。近くで止まるとここへそっと寄る */
export function SnapPoint({ at = '50%' }: { at?: string }) {
  return (
    <div
      aria-hidden
      className="absolute left-0 w-px h-px pointer-events-none"
      style={{ top: at, scrollSnapAlign: 'center' }}
    />
  )
}
