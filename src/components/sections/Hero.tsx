import { meta } from '../../data/portfolio'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-base via-bg-surface to-bg-base" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 名前 */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <p className="font-mono text-accent text-sm mb-4 tracking-widest">Portfolio</p>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight mb-2">
            {meta.name}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-light tracking-wide mb-6">
            {meta.nameEn}
          </p>
        </div>

        {/* タグライン */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            {meta.tagline}
          </p>
        </div>

        {/* 役割チップ */}
        <div className="animate-fade-up opacity-0 flex flex-wrap justify-center gap-2 mb-10" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          {meta.targetRoles.map(role => (
            <span
              key={role}
              className="text-sm font-mono px-3 py-1 rounded-full border border-accent/30 text-accent/80 bg-accent/5"
            >
              {role}
            </span>
          ))}
        </div>

        {/* CTAボタン */}
        <div className="animate-fade-up opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <button
            onClick={() => scrollTo('projects')}
            className="px-6 py-3 bg-accent text-bg-base font-bold rounded-lg hover:bg-accent-hover transition-colors text-sm"
          >
            プロジェクトを見る
          </button>
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-white/10 text-slate-300 rounded-lg hover:border-accent/40 hover:text-accent transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* 下向き矢印 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
