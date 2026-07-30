import { useEffect, useRef, useState } from 'react'
import { LightField } from './LightField'

/* ═══════════════════════════════════════════════════════════
   機構カラム — 縦に連結した1本の機械を、スクロールで降りていく

   ・各画像は中央の導管が上端／下端で必ず繋がるよう生成してある
   ・隣り合う画像を重ね、上端をマスクでフェードさせて継ぎ目を消す
   ・ページのスクロールに対して縦一本のストリップを動かすので、
     セクションが切り替わっても絵は途切れず流れ続ける
   ═══════════════════════════════════════════════════════════ */

const SEGMENTS = [
  '/images/col-0-intake.jpg',
  '/images/col-1-gates.jpg',
  '/images/col-2-conduit.jpg',
  '/images/col-3-escapement.jpg',
  '/images/col-4-optics.jpg',
  '/images/col-5-origin.jpg',
]

/* 画像のアスペクト比（幅 / 高さ）= 1024 / 1536 */
/* 各セクションが表示すべきセグメント位置（画像とページ内容を一致させる） */
const SYNC: { id: string; seg: number }[] = [
  { id: 'hero',       seg: 0 },
  { id: 'gate-array', seg: 1 },
  { id: 'test-bench', seg: 1.4 },
  { id: 'conduit',    seg: 2 },
  { id: 'escapement', seg: 3 },
  { id: 'splitter',   seg: 4 },
  { id: 'origin',     seg: 5 },
]

const ASPECT = 1024 / 1536
/* 1セグメントの高さ（ビューポート比）と重なり量 */
const SEG_VH = 1.06
const OVERLAP = 0.17

export function MachineColumn({ regionId }: { regionId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [dims, setDims] = useState({ segH: 0, colW: 0, stripH: 0, overlapPx: 0 })
  const dimsRef = useRef({ segH: 0, colW: 0, stripH: 0, overlapPx: 0 })
  const stripYRef = useRef(0)

  /* 寸法計算（リサイズ追従） */
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight || 1
      const vw = window.innerWidth || 1
      // 画面が狭いときはカラムが幅を占有しすぎないよう上限をかける
      // （比率を保つため、幅の上限から高さを逆算する）
      const maxW = vw < 768 ? vw * 0.62 : vw * 0.42
      const colW = Math.min(vh * SEG_VH * ASPECT, maxW)
      const segH = colW / ASPECT
      const overlapPx = segH * OVERLAP
      const stripH = SEGMENTS.length * segH - (SEGMENTS.length - 1) * overlapPx
      const next = { segH, colW, stripH, overlapPx }
      dimsRef.current = next
      setDims(next)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* スクロール駆動 — 領域の進行度をストリップの移動量に写す */
  useEffect(() => {
    let raf = 0
    let smooth = -1
    let lastTick = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const apply = (immediate = false) => {
      const region = document.getElementById(regionId)
      const strip = stripRef.current
      const wrap = wrapRef.current
      if (region && strip && wrap) {
        const vh = window.innerHeight || 1
        const rect = region.getBoundingClientRect()
        const travelRegion = Math.max(1, rect.height - vh)
        const target = Math.min(1, Math.max(0, -rect.top / travelRegion))

        if (immediate || smooth < 0 || reduce) smooth = target
        else {
          const d = target - smooth
          smooth = Math.abs(d) < 0.0001 ? target : smooth + d * 0.075
        }
        progressRef.current = smooth

        /* ── セクションと画像を同期させる ──
           各セクションの中央に来たとき、そのセクションのセグメントが
           画面中央に来るよう、スクロール位置からセグメント位置を逆算する */
        const stripH = strip.offsetHeight
        const segH = stripH > 0 ? (stripH + (SEGMENTS.length - 1) * dimsRef.current.overlapPx) / SEGMENTS.length : 0
        const step = segH - dimsRef.current.overlapPx
        const scrollY = window.scrollY || window.pageYOffset

        const anchors: { y: number; seg: number }[] = []
        for (const a of SYNC) {
          const el = document.getElementById(a.id)
          if (el) anchors.push({ y: el.offsetTop + el.offsetHeight / 2 - vh / 2, seg: a.seg })
        }

        let seg = 0
        if (anchors.length > 0) {
          if (scrollY <= anchors[0].y) seg = anchors[0].seg
          else if (scrollY >= anchors[anchors.length - 1].y) seg = anchors[anchors.length - 1].seg
          else {
            for (let i = 0; i < anchors.length - 1; i++) {
              const a = anchors[i]
              const b = anchors[i + 1]
              if (scrollY >= a.y && scrollY <= b.y) {
                const r = (scrollY - a.y) / Math.max(1, b.y - a.y)
                seg = a.seg + (b.seg - a.seg) * r
                break
              }
            }
          }
        }

        // セグメント中心を画面中央に置く
        const rawY = seg * step + segH / 2 - vh / 2
        const maxY = Math.max(0, stripH - vh)
        const targetY = Math.min(maxY, Math.max(0, rawY))

        // 目標位置へなめらかに寄せる
        stripYRef.current += (targetY - stripYRef.current) * Math.min(0.4, 0.09 + Math.abs(targetY - stripYRef.current) / Math.max(1, vh) * 0.25)
        if (immediate) stripYRef.current = targetY
        strip.style.transform = `translate3d(0, ${(-stripYRef.current).toFixed(2)}px, 0)`

        /* 機構区間を抜けたら静かに消える */
        const exiting = rect.bottom < vh * 1.15
        const fade = exiting ? Math.max(0, Math.min(1, rect.bottom / (vh * 1.15))) : 1
        wrap.style.opacity = fade.toFixed(3)
        wrap.style.visibility = fade < 0.01 ? 'hidden' : 'visible'
      }
      lastTick = performance.now()
      if (!immediate) raf = requestAnimationFrame(() => apply())
    }

    apply(true)
    const onVisible = () => {
      if (document.visibilityState === 'visible') apply(true)
    }
    const onScroll = () => {
      if (performance.now() - lastTick > 220) apply(true)
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(() => apply())

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('scroll', onScroll)
    }
  }, [regionId, dims.stripH])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-bg-deep"
      aria-hidden
    >
      {/* カラム背後のごく淡い発光（地を作って画像が浮かないようにする） */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(56% 58% at 74% 46%, rgba(26,48,54,0.5) 0%, rgba(10,14,16,0.3) 46%, transparent 78%)',
        }}
      />

      {/* ── 連結したカラム本体 ── */}
      <div
        ref={stripRef}
        className="absolute left-1/2 -translate-x-1/2 md:left-auto md:right-[6%] md:translate-x-0 stage-layer"
        style={{
          width: dims.colW,
          height: dims.stripH,
          top: 0,
          /* 加算合成にすると画像の純黒が背景色と一致するため、
             画像の矩形の境目が原理的に消える（screen: 0 を足しても背景のまま） */
          mixBlendMode: 'screen',
          isolation: 'isolate',
          /* 左右も溶かして輪郭を残さない */
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 11%, #000 89%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 11%, #000 89%, transparent 100%)',
        }}
      >
        {SEGMENTS.map((src, i) => (
          <div
            key={src}
            className="absolute left-0 right-0"
            style={{
              top: i * (dims.segH - dims.overlapPx),
              height: dims.segH,
              zIndex: i,
              backgroundImage: `url(${src})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              // 上端を重なり分だけフェードさせ、前のセグメントへ溶かし込む
              maskImage:
                i === 0
                  ? undefined
                  : `linear-gradient(to bottom, transparent 0px, #000 ${dims.overlapPx}px)`,
              WebkitMaskImage:
                i === 0
                  ? undefined
                  : `linear-gradient(to bottom, transparent 0px, #000 ${dims.overlapPx}px)`,
            }}
          />
        ))}
      </div>

      {/* ── 機構を流れる光 ── */}
      <LightField progressRef={progressRef} density={30} />

      {/* ── 読みやすさのための暗幕（左からの帯） ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(5,6,7,0.97) 0%, rgba(5,6,7,0.92) 26%, rgba(5,6,7,0.45) 52%, rgba(5,6,7,0.25) 74%, rgba(5,6,7,0.6) 100%)',
        }}
      />
      {/* モバイル: カラムが文字の背後に来るため追加で落とす */}
      <div className="absolute inset-0 md:hidden" style={{ background: 'rgba(5,6,7,0.55)' }} />

      {/* 上下の締め */}
      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{ background: 'linear-gradient(180deg, #050607 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36"
        style={{ background: 'linear-gradient(0deg, #050607 0%, transparent 100%)' }}
      />
    </div>
  )
}
