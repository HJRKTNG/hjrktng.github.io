import { useEffect, useRef, useState } from 'react'
import { LightField } from './LightField'

/* ═══════════════════════════════════════════════════════════
   機構シーン — カメラワークを持つ多層合成

   構成（奥→手前）:
     1. 空気層  atmos-haze   … 光の筋と靄。ゆっくり流れる
     2. 主機構  col-0..5     … 上下が繋がる縦カラム（本体）
     3. 近景1  fg-cables     … 手前を横切る光ファイバー束
     4. 近景2  fg-struts     … カメラ直前の支柱（ボケる）
     5. 微粒子  dust-plate   … 漂う塵

   近景・空気層は純黒背景で生成してあるので mix-blend-mode:screen
   で合成する（黒が透明として抜ける）。層ごとに視差量を変え、
   さらにシーン全体へカメラ（寄り・パン・ロール・フォーカス）を掛ける。
   ═══════════════════════════════════════════════════════════ */

const SEGMENTS = [
  '/images/col-0-intake.jpg',
  '/images/col-1-gates.jpg',
  '/images/col-2-conduit.jpg',
  '/images/col-3-escapement.jpg',
  '/images/col-4-optics.jpg',
  '/images/col-5-origin.jpg',
]

const ASPECT = 1024 / 1536
const SEG_VH = 1.06
const OVERLAP = 0.17

/* ── カメラのキーフレーム ──
   at: 機構区間の進行度 / scale: 寄り / x: 横パン(%) / rot: ロール(deg) / blur: フォーカス(px) */
interface CamKey { at: number; scale: number; x: number; rot: number; blur: number }

const CAMERA: CamKey[] = [
  { at: 0.00, scale: 1.00, x:  0.0, rot:  0.0, blur: 0.0 },  // 冒頭: 機構の全景
  { at: 0.10, scale: 1.14, x: -2.5, rot: -0.5, blur: 0.0 },  // UNIT 01 へ寄る
  { at: 0.22, scale: 1.30, x: -5.5, rot: -0.9, blur: 0.0 },  // ゲート列に踏み込む
  { at: 0.29, scale: 1.18, x: -3.0, rot: -0.4, blur: 1.8 },  // 試験台へ抜ける前にピントを送る
  { at: 0.35, scale: 1.02, x:  1.5, rot:  0.3, blur: 0.0 },  // 試験台: 引いて余白を作る
  { at: 0.44, scale: 1.24, x: -4.0, rot:  0.7, blur: 0.0 },  // UNIT 02 導管へ
  { at: 0.52, scale: 1.34, x: -6.0, rot:  1.0, blur: 1.4 },
  { at: 0.60, scale: 1.46, x: -8.0, rot:  0.4, blur: 0.0 },  // UNIT 03 脱進機に最接近
  { at: 0.68, scale: 1.12, x:  2.0, rot: -0.5, blur: 1.2 },  // 引いて呼吸
  { at: 0.78, scale: 1.32, x: -5.0, rot: -1.0, blur: 0.0 },  // UNIT 04 光学分岐
  { at: 0.90, scale: 1.20, x:  1.0, rot:  0.4, blur: 1.0 },  // 最深部へ降りる
  { at: 1.00, scale: 1.04, x:  0.0, rot:  0.0, blur: 0.0 },  // 基板に着地
]

function sampleCamera(p: number): CamKey {
  if (p <= CAMERA[0].at) return CAMERA[0]
  if (p >= CAMERA[CAMERA.length - 1].at) return CAMERA[CAMERA.length - 1]
  for (let i = 0; i < CAMERA.length - 1; i++) {
    const a = CAMERA[i]
    const b = CAMERA[i + 1]
    if (p >= a.at && p <= b.at) {
      const raw = (p - a.at) / (b.at - a.at)
      const t = raw * raw * (3 - 2 * raw) // smoothstep
      return {
        at: p,
        scale: a.scale + (b.scale - a.scale) * t,
        x: a.x + (b.x - a.x) * t,
        rot: a.rot + (b.rot - a.rot) * t,
        blur: a.blur + (b.blur - a.blur) * t,
      }
    }
  }
  return CAMERA[CAMERA.length - 1]
}

/* 純黒背景の素材を加算合成で重ねる層 */
function ScreenLayer({
  src, opacity, blur, className = '',
  innerRef,
}: {
  src: string
  opacity: number
  blur?: number
  className?: string
  innerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={innerRef}
      className={`absolute inset-[-12%] stage-layer ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'screen',
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        pointerEvents: 'none',
      }}
    />
  )
}

export function MachineScene({ regionId }: { regionId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const camRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const atmosRef = useRef<HTMLDivElement>(null)
  const cablesRef = useRef<HTMLDivElement>(null)
  const strutsRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [dims, setDims] = useState({ segH: 0, colW: 0, stripH: 0, overlapPx: 0 })

  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight || 1
      const vw = window.innerWidth || 1
      const maxW = vw < 768 ? vw * 0.66 : vw * 0.44
      const colW = Math.min(vh * SEG_VH * ASPECT, maxW)
      const segH = colW / ASPECT
      const overlapPx = segH * OVERLAP
      const stripH = SEGMENTS.length * segH - (SEGMENTS.length - 1) * overlapPx
      setDims({ segH, colW, stripH, overlapPx })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let raf = 0
    let smooth = -1
    let lastTick = 0
    let t0 = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const apply = (immediate = false, now = performance.now()) => {
      if (!t0) t0 = now
      const time = (now - t0) / 1000
      const region = document.getElementById(regionId)
      const strip = stripRef.current
      const wrap = wrapRef.current
      const cam = camRef.current
      if (region && strip && wrap && cam) {
        const vh = window.innerHeight || 1
        const rect = region.getBoundingClientRect()
        const target = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - vh)))

        if (immediate || smooth < 0 || reduce) smooth = target
        else {
          const d = target - smooth
          smooth = Math.abs(d) < 0.0001 ? target : smooth + d * 0.07
        }
        progressRef.current = smooth

        /* ── カメラ ── */
        const c = sampleCamera(smooth)
        cam.style.transform =
          `scale(${c.scale.toFixed(4)}) translate3d(${c.x.toFixed(3)}%, 0, 0) rotate(${c.rot.toFixed(3)}deg)`
        cam.style.filter = c.blur > 0.02 ? `blur(${c.blur.toFixed(2)}px)` : 'none'

        /* ── 主機構: 縦に降りる ── */
        const travelStrip = Math.max(0, strip.offsetHeight - vh)
        strip.style.transform = `translate3d(0, ${(-smooth * travelStrip).toFixed(2)}px, 0)`

        /* ── 各層の視差（手前ほど大きく動く） ── */
        const par = (mult: number, drift = 0) =>
          `translate3d(0, ${(-smooth * vh * mult + drift).toFixed(2)}px, 0)`
        if (atmosRef.current) atmosRef.current.style.transform = par(0.22, Math.sin(time * 0.12) * 14)
        if (cablesRef.current) cablesRef.current.style.transform = par(0.85, Math.sin(time * 0.19) * 10)
        if (strutsRef.current) strutsRef.current.style.transform = par(1.45)
        if (dustRef.current)
          dustRef.current.style.transform =
            `translate3d(${(Math.sin(time * 0.07) * 22).toFixed(2)}px, ${(-smooth * vh * 0.6 + Math.cos(time * 0.09) * 18).toFixed(2)}px, 0)`

        /* 機構区間を抜けたら静かに消える */
        const exiting = rect.bottom < vh * 1.15
        const fade = exiting ? Math.max(0, Math.min(1, rect.bottom / (vh * 1.15))) : 1
        wrap.style.opacity = fade.toFixed(3)
        wrap.style.visibility = fade < 0.01 ? 'hidden' : 'visible'
      }
      lastTick = performance.now()
      if (!immediate) raf = requestAnimationFrame(n => apply(false, n))
    }

    apply(true)
    const onVisible = () => { if (document.visibilityState === 'visible') apply(true) }
    const onScroll = () => { if (performance.now() - lastTick > 220) apply(true) }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(n => apply(false, n))

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('scroll', onScroll)
    }
  }, [regionId, dims.stripH])

  /* 画像の矩形が見えないよう、四辺を溶かすマスク */
  const featherX =
    'linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%)'

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: '#050607' }}
      aria-hidden
    >
      {/* カラム背後のごく淡い発光（黒い矩形が浮かないよう地を作る） */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 60% at 72% 46%, rgba(28,52,58,0.55) 0%, rgba(10,14,16,0.35) 45%, transparent 78%)',
        }}
      />

      {/* ── カメラ ── */}
      <div ref={camRef} className="absolute inset-0 stage-layer" style={{ transformOrigin: '68% 50%' }}>
        {/* 1. 空気層 */}
        <ScreenLayer src="/images/atmos-haze.jpg" opacity={0.5} innerRef={atmosRef} />

        {/* 2. 主機構 */}
        <div
          className="absolute inset-0"
          style={{ maskImage: featherX, WebkitMaskImage: featherX }}
        >
          {/* 加算合成にすることで、画像の純黒が背景色と数学的に一致し、
              画像の矩形の境目が完全に消える（screen: 0 を足しても背景のまま） */}
          <div
            ref={stripRef}
            className="absolute left-1/2 -translate-x-1/2 md:left-auto md:right-[7%] md:translate-x-0 stage-layer"
            style={{
              width: dims.colW,
              height: dims.stripH,
              top: 0,
              mixBlendMode: 'screen',
              isolation: 'isolate',
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
                  maskImage:
                    i === 0 ? undefined : `linear-gradient(to bottom, transparent 0px, #000 ${dims.overlapPx}px)`,
                  WebkitMaskImage:
                    i === 0 ? undefined : `linear-gradient(to bottom, transparent 0px, #000 ${dims.overlapPx}px)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* 3. 近景: 光ファイバー束 */}
        <ScreenLayer src="/images/fg-cables.jpg" opacity={0.42} blur={1.2} innerRef={cablesRef} />

        {/* 4. 近景: カメラ直前の支柱（大きくボケる） */}
        <ScreenLayer src="/images/fg-struts.jpg" opacity={0.34} blur={7} innerRef={strutsRef} />

        {/* 5. 微粒子 */}
        <ScreenLayer src="/images/dust-plate.jpg" opacity={0.3} blur={0.6} innerRef={dustRef} />
      </div>

      {/* 走る光 */}
      <LightField progressRef={progressRef} density={26} />

      {/* 読みやすさのための暗幕 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(5,6,7,0.96) 0%, rgba(5,6,7,0.9) 26%, rgba(5,6,7,0.42) 52%, rgba(5,6,7,0.2) 74%, rgba(5,6,7,0.55) 100%)',
        }}
      />
      <div className="absolute inset-0 md:hidden" style={{ background: 'rgba(5,6,7,0.55)' }} />

      {/* 上下の締め */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{ background: 'linear-gradient(180deg, #050607 0%, rgba(5,6,7,0.6) 45%, transparent 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(0deg, #050607 0%, rgba(5,6,7,0.6) 45%, transparent 100%)' }}
      />
    </div>
  )
}
