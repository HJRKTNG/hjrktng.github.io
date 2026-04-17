import { useTypewriter } from '../../hooks/useTypewriter'
import { meta } from '../../data/portfolio'
import { VoxelTree } from '../3d/VoxelTree'

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
    <section id="hero" className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Atmospheric gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[700px] translate-x-1/3 translate-y-1/3 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(180,120,50,0.04) 0%, transparent 60%)' }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#d4a853 1px, transparent 1px), linear-gradient(90deg, #d4a853 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Horizontal midline decoration */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-ink-500/8 pointer-events-none" />

      {/* ── 3D Voxel Tree — right half on desktop, background on mobile ── */}
      <div className="absolute inset-0 md:left-[45%] opacity-70 md:opacity-100 pointer-events-none">
        <VoxelTree />
      </div>

      {/* Soft gradient overlay on left (keeps text readable over tree) */}
      <div
        className="absolute inset-0 md:right-1/2 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(90deg, #080807 0%, rgba(8,8,7,0.8) 60%, transparent 100%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-8 w-full py-32 pt-40">

        <div className="max-w-2xl">
          {/* Status badge */}
          <div
            className="animate-fade-up opacity-0 mb-10"
            style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              <span className="font-mono text-xs text-ink-400 tracking-[0.3em] uppercase">
                Available for Internship · 2026
              </span>
            </div>
          </div>

          {/* Name */}
          <div
            className="animate-fade-up opacity-0 mb-5"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            <h1
              className="font-display font-light leading-[0.88] tracking-tight text-ink-50"
              style={{ fontSize: 'clamp(64px, 10vw, 140px)' }}
            >
              沓脱 聖
            </h1>
          </div>

          {/* English name + divider */}
          <div
            className="animate-fade-up opacity-0 flex flex-wrap items-center gap-4 mb-8"
            style={{ animationDelay: '0.48s', animationFillMode: 'forwards' }}
          >
            <span className="font-mono text-sm text-accent tracking-[0.35em]">HIJIRI KUTSUNUGI</span>
            <div className="h-px w-20 bg-gradient-to-r from-accent/50 to-transparent hidden sm:block" />
          </div>

          {/* Typewriter tagline */}
          <div
            className="animate-fade-up opacity-0 h-9 flex items-center mb-10"
            style={{ animationDelay: '0.62s', animationFillMode: 'forwards' }}
          >
            <p className="text-xl text-ink-200 font-light">
              {typed}
              <span className="animate-blink text-accent ml-0.5">|</span>
            </p>
          </div>

          {/* Role chips */}
          <div
            className="animate-fade-up opacity-0 flex flex-wrap gap-2 mb-12"
            style={{ animationDelay: '0.78s', animationFillMode: 'forwards' }}
          >
            {meta.targetRoles.map((role, i) => (
              <span
                key={role}
                className="text-xs font-mono px-4 py-1.5 border border-ink-500/50 text-ink-300 hover:border-accent/50 hover:text-accent transition-all duration-300 cursor-default backdrop-blur-sm bg-bg-base/30"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {role}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="animate-fade-up opacity-0 flex items-center gap-6"
            style={{ animationDelay: '0.94s', animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => scrollTo('projects')}
              className="group relative overflow-hidden px-8 py-3.5 text-sm font-medium text-bg-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #d4a853, #b88c38)' }}
            >
              <span className="relative z-10">プロジェクトを見る</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #e8c07a, #d4a853)' }}
              />
            </button>

            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-ink-300 hover:text-accent transition-colors duration-300 font-mono"
            >
              GitHub
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3 opacity-35 z-10">
        <div className="w-px h-16 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-accent to-transparent animate-shimmer"
            style={{ backgroundSize: '100% 300%' }}
          />
        </div>
        <span
          className="font-mono text-[10px] text-ink-400 tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
      </div>
    </section>
  )
}
