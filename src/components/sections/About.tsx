import { meta, about } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function About() {
  const { ref: leftRef, visible: leftVisible }   = useScrollReveal()
  const { ref: rightRef, visible: rightVisible } = useScrollReveal({ rootMargin: '0px 0px -40px 0px' })

  return (
    <section id="about" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading sub="自己紹介">About</SectionHeading>

        <div className="grid md:grid-cols-3 gap-10">
          {/* テキスト */}
          <div
            ref={leftRef}
            className={`md:col-span-2 space-y-5 transition-all duration-700 ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-slate-300 leading-loose whitespace-pre-line text-[15px]">{about.intro}</p>
            <p className="text-slate-400 leading-loose text-[15px]">{about.goals}</p>
            <div className="p-4 rounded-xl bg-bg-elevated border border-accent/20 relative overflow-hidden group hover:border-accent/40 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="text-xs text-accent font-mono mb-1 relative z-10">海外経験</p>
              <p className="text-sm text-slate-300 relative z-10">{about.abroad}</p>
            </div>
          </div>

          {/* プロフィールカード */}
          <div
            ref={rightRef}
            className={`transition-all duration-700 delay-150 ${
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-bg-card rounded-xl p-5 border border-white/7 hover:border-accent/20 transition-colors duration-300 group">
              <h3 className="text-xs font-mono text-accent mb-5 tracking-widest">PROFILE</h3>
              <dl className="space-y-4">
                {[
                  { label: '大学',   value: '九州大学', sub: '工学部 電気情報工学科 4年' },
                  { label: '出身校', value: '開成高等学校' },
                  { label: '居住地', value: '福岡' },
                  { label: 'TOEIC',  value: '670点' },
                ].map(item => (
                  <div key={item.label} className="group/item">
                    <dt className="text-xs text-slate-500 mb-0.5">{item.label}</dt>
                    <dd className="text-sm text-slate-300 group-hover/item:text-slate-200 transition-colors">{item.value}</dd>
                    {item.sub && <dd className="text-xs text-slate-500">{item.sub}</dd>}
                  </div>
                ))}
                <div>
                  <dt className="text-xs text-slate-500 mb-0.5">GitHub</dt>
                  <dd>
                    <a
                      href={meta.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-hover font-mono transition-colors inline-flex items-center gap-1 group/link"
                    >
                      @HJRKTNG
                      <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
