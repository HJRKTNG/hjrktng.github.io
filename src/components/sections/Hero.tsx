import { useTypewriter } from '../../hooks/useTypewriter'
import { meta } from '../../data/portfolio'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const typed = useTypewriter(
    ['AIとWebで、使えるものを作る。', '自走しながら、形にする。', 'AIエンジニア志望、九大4年。'],
    80,
    2200
  )

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* ── 背景レイヤー ── */}
      {/* グリッドパターン */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* 大きなぼかし光源 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      {/* 浮遊する装飾リング */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-accent/10 animate-spin-slow pointer-events-none" />
      <div className="absolute top-24 right-[10%] w-48 h-48 rounded-full border border-accent/5 animate-spin-slow pointer-events-none"
        style={{ animationDirection: 'reverse', animationDuration: '15s' }}
      />
      <div className="absolute bottom-32 left-[8%] w-40 h-40 rounded-full border border-indigo-500/10 animate-spin-slow pointer-events-none"
        style={{ animationDuration: '25s' }}
      />

      {/* 浮遊ドット */}
      {[
        { top: '20%', left: '15%', delay: '0s',   size: 3 },
        { top: '60%', left: '8%',  delay: '1s',   size: 2 },
        { top: '35%', right: '12%', delay: '2s',  size: 4 },
        { top: '75%', right: '18%', delay: '0.5s',size: 2 },
        { top: '50%', left: '5%',  delay: '1.5s', size: 3 },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent/30 animate-float pointer-events-none"
          style={{
            top: d.top,
            left: (d as any).left,
            right: (d as any).right,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* ── メインコンテンツ ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* バッジ */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent/80 border border-accent/20 rounded-full px-4 py-1.5 mb-8 bg-accent/5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Available for internship · 2026
          </span>
        </div>

        {/* 名前 */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-3">
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #e2e8f0 100%)',
                backgroundSize: '200% auto',
              }}
            >
              {meta.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-mono text-accent/70 tracking-widest mb-8">
            {meta.nameEn}
          </p>
        </div>

        {/* タイピングテキスト */}
        <div className="animate-fade-up opacity-0 h-10 flex items-center justify-center mb-8"
          style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}>
          <p className="text-lg md:text-xl text-slate-300 font-light">
            {typed}
            <span className="animate-blink text-accent ml-0.5">|</span>
          </p>
        </div>

        {/* 役割チップ */}
        <div
          className="animate-fade-up opacity-0 flex flex-wrap justify-center gap-2 mb-12"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          {meta.targetRoles.map((role, i) => (
            <span
              key={role}
              className="text-sm font-mono px-4 py-1.5 rounded-full border border-accent/20 text-accent/70 bg-accent/5 hover:border-accent/50 hover:text-accent hover:bg-accent/10 transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {role}
            </span>
          ))}
        </div>

        {/* CTAボタン */}
        <div
          className="animate-fade-up opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: '0.75s', animationFillMode: 'forwards' }}
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative px-8 py-3.5 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
          >
            <span className="relative z-10 text-white">プロジェクトを見る</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #7dd3fc, #a5b4fc)' }} />
          </button>

          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-3.5 border border-white/10 text-slate-300 rounded-xl hover:border-accent/50 hover:text-accent transition-all duration-300 text-sm hover:scale-105 active:scale-95 hover:bg-accent/5"
          >
            <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* スクロールインジケーター */}
        <div
          className="animate-fade-up opacity-0 mt-20 flex flex-col items-center gap-2"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          <span className="text-xs font-mono text-slate-600 tracking-widest">SCROLL</span>
          <div className="w-px h-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/60 to-transparent animate-shimmer"
              style={{ backgroundSize: '100% 200%' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
