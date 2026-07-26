import { useState } from 'react'
import { about, skillCategories, projects, meta, journey } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLang } from '../../i18n'

/* ═══════════════════════════════════════════════════════════
   SPEC — 機器の仕様書としての自己紹介・技術スタック・その他の実績
   写真は使わず、計器パネルの罫線と等幅の数値だけで構成する
   ═══════════════════════════════════════════════════════════ */

function SectionRule({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center gap-5 mb-10">
      <span className="font-mono text-[10px] text-sig tracking-label uppercase">{label}</span>
      <div className="flex-1 h-px rule-tick opacity-60" />
      <span className="font-mono text-[10px] text-ink-500 tabular-nums">{num}</span>
    </div>
  )
}

export function SpecSheet() {
  const { lang, t } = useLang()
  const { ref, visible } = useScrollReveal({ threshold: 0.05 })
  const [hover, setHover] = useState<{ c: number; s: number } | null>(null)

  const others = projects.filter(p => !['goun-fes', 'minilink', 'hakogame'].includes(p.id))

  return (
    <section id="spec" className="relative bg-bg-base py-28 md:py-36 overflow-hidden">
      {/* 背景の極薄グリッド */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#4FD8E0 1px, transparent 1px), linear-gradient(90deg, #4FD8E0 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div ref={ref} className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* ── 見出し ── */}
        <div
          className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <SectionRule label="Specification" num="UNIT 06" />
          <h2
            className="font-display font-bold text-ink-50 leading-[1.06] tracking-tight max-w-4xl"
            style={{ fontSize: 'clamp(28px, 3.6vw, 52px)' }}
          >
            {t({
              ja: '設計者について',
              en: 'About the builder',
            })}
          </h2>
        </div>

        {/* ── 概要 + プロフィール ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mt-14">
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-ink-200 leading-loose text-[15px] font-light whitespace-pre-line">
              {t(about.intro)}
            </p>
            <p className="text-ink-300 leading-loose text-[15px] font-light">
              {t(about.goals)}
            </p>

            <div className="relative border-l border-sig/50 pl-5 py-1">
              <p className="font-mono text-[10px] text-sig tracking-label uppercase mb-2">
                International
              </p>
              <p className="text-sm text-ink-200 font-light leading-relaxed">
                {t(about.abroad)}
              </p>
            </div>
          </div>

          {/* プロフィール諸元 */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <dl className="space-y-0">
              {about.profile.map(item => (
                <div
                  key={item.label.en}
                  className="grid grid-cols-[104px_1fr] gap-4 py-3.5 border-b border-line items-baseline"
                >
                  <dt className="font-mono text-[10px] text-ink-500 tracking-wider uppercase">
                    {t(item.label)}
                  </dt>
                  <dd>
                    <span className="text-[13.5px] text-ink-100 font-light">{t(item.value)}</span>
                    {item.sub && (
                      <span className="block text-[11.5px] text-ink-400 font-light mt-0.5">
                        {t(item.sub)}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-[104px_1fr] gap-4 py-3.5 border-b border-line items-baseline">
                <dt className="font-mono text-[10px] text-ink-500 tracking-wider uppercase">GitHub</dt>
                <dd>
                  <a
                    href={meta.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-sig hover:text-sig-bright transition-colors"
                  >
                    @HJRKTNG
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ── 改訂履歴（歩み） ── */}
        <div className="mt-24">
          <SectionRule label="Revision History" num={`${journey.length} REV`} />

          <div className="border-t border-line">
            {journey.map(item => (
              <div
                key={item.year}
                className="group grid md:grid-cols-[88px_minmax(0,240px)_1fr] gap-2 md:gap-8 py-5 border-b border-line items-baseline hover:bg-bg-panel/50 transition-colors duration-300 px-1"
              >
                <span className="font-mono text-[12px] text-sig tabular-nums tracking-wider">
                  {item.year}
                </span>
                <h4 className="text-[14px] text-ink-100 font-medium">{t(item.title)}</h4>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  {t(item.body)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 技術スタック ── */}
        <div className="mt-24">
          <SectionRule label="Capability" num={`${skillCategories.reduce((n, c) => n + c.skills.length, 0)} ITEMS`} />
          <p className="text-[11.5px] text-ink-400 font-light mb-8 -mt-4">
            {lang === 'ja'
              ? 'カーソルを合わせると、実際に使ったプロジェクトが表示されます。'
              : 'Hover an item to see where it was actually used.'}
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-10">
            {skillCategories.map((cat, ci) => (
              <div key={cat.label.en}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-1 bg-sig" />
                  <h3 className="font-mono text-[10px] text-ink-300 tracking-label uppercase">
                    {t(cat.label)}
                  </h3>
                </div>
                <ul>
                  {cat.skills.map((sk, si) => {
                    const on = hover?.c === ci && hover?.s === si
                    return (
                      <li
                        key={sk.name}
                        onMouseEnter={() => setHover({ c: ci, s: si })}
                        onMouseLeave={() => setHover(null)}
                        className={`group border-b border-line py-2 cursor-default transition-colors duration-200 ${
                          on ? 'border-sig/50' : ''
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className={`text-[13px] font-light transition-colors duration-200 ${
                              on ? 'text-sig' : 'text-ink-200'
                            }`}
                          >
                            {sk.name}
                          </span>
                          <span
                            className={`font-mono text-[10px] text-right transition-all duration-200 ${
                              on ? 'text-ink-300 opacity-100' : 'text-ink-500 opacity-0'
                            }`}
                          >
                            {t(sk.usedIn)}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── その他のユニット（サブプロジェクト） ── */}
        <div className="mt-24">
          <SectionRule label="Other Units" num={`${others.length} ENTRIES`} />

          <div className="border-t border-line">
            {others.map(p => (
              <div
                key={p.id}
                className="group grid md:grid-cols-[minmax(0,200px)_1fr_auto] gap-3 md:gap-8 py-5 border-b border-line items-baseline hover:bg-bg-panel/60 transition-colors duration-300 px-1"
              >
                <div>
                  <h4 className="text-[15px] text-ink-100 font-medium group-hover:text-sig transition-colors duration-300">
                    {p.title}
                  </h4>
                  {p.period && (
                    <span className="font-mono text-[10px] text-ink-500 tracking-wider">{p.period}</span>
                  )}
                </div>
                <div>
                  <p className="text-[13px] text-ink-300 font-light leading-relaxed mb-2">
                    {t(p.description)}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {p.tech.slice(0, 6).map(tech => (
                      <span key={tech} className="font-mono text-[10px] text-ink-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 md:justify-end">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-ink-400 hover:text-sig transition-colors tracking-wider"
                    >
                      LIVE ↗
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-ink-400 hover:text-sig transition-colors tracking-wider"
                    >
                      CODE ↗
                    </a>
                  )}
                  {!p.liveUrl && !p.githubUrl && p.note && (
                    <span className="font-mono text-[10px] text-ink-500">{t(p.note)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
