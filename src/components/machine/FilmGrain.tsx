/* ═══════════════════════════════════════════════════════════
   粒状ノイズ + 周辺減光 — 写真とUIの質感を一枚に揃える
   （CSSのみ。SVGのfeTurbulenceをdata URIで敷く）
   ═══════════════════════════════════════════════════════════ */

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <filter id="n">
         <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
         <feColorMatrix type="saturate" values="0"/>
       </filter>
       <rect width="180" height="180" filter="url(#n)" opacity="0.5"/>
     </svg>`,
  )

export function FilmGrain() {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none" aria-hidden>
      {/* 周辺減光 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 42%, rgba(0,0,0,0.42) 100%)',
        }}
      />
      {/* 粒状ノイズ */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '180px 180px' }}
      />
      {/* 走査線（ごく薄い横縞で計器のモニタ感を出す） */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)',
        }}
      />
    </div>
  )
}
