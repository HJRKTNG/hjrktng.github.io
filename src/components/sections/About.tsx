import { meta, about } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function About() {
  const { ref: leftRef,  visible: leftVisible  } = useScrollReveal()
  const { ref: rightRef, visible: rightVisible } = useScrollReveal({ rootMargin: '0px 0px -40px 0px' })

  return (
    <section id="about" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub="自己紹介" num="01">About</SectionHeading>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Text */}
          <div
            ref={leftRef}
            className={`md:col-span-2 space-y-6 transition-all duration-700 ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-ink-200 leading-loose text-[15px] font-light whitespace-pre-line">
              {about.intro}
            </p>
            <p className="text-ink-300 leading-loose text-[15px] font-light">
              {about.goals}
            </p>

            {/* Abroad highlight */}
            <div className="relative p-5 border-l-2 border-accent/60 bg-bg-elevated/50 group hover:border-accent transition-colors duration-300">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, rgba(212,168,83,0.04) 0%, transparent 100%)' }}
              />
              <p className="font-mono text-[10px] text-accent tracking-[0.25em] mb-2 uppercase relative z-10">
                International Experience
              </p>
              <p className="text-sm text-ink-200 relative z-10 font-light leading-relaxed">
                {about.abroad}
              </p>
            </div>
          </div>

          {/* Profile card */}
          <div
            ref={rightRef}
            className={`transition-all duration-700 delay-150 ${
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-bg-card border border-ink-500/30 p-6 hover:border-accent/25 transition-colors duration-500 group">
              <h3 className="font-mono text-[10px] text-accent tracking-[0.3em] mb-6 uppercase">
                Profile
              </h3>
              <dl className="space-y-5">
                {[
                  { label: '大学',   value: '九州大学', sub: '工学部 電気情報工学科 4年' },
                  { label: '出身校', value: '開成高等学校' },
                  { label: '居住地', value: '福岡' },
                  { label: 'TOEIC',  value: '670点' },
                ].map(item => (
                  <div key={item.label}>
                    <dt className="text-[11px] text-ink-400 font-mono mb-1 tracking-wider">
                      {item.label.toUpperCase()}
                    </dt>
                    <dd className="text-sm text-ink-200 font-light">{item.value}</dd>
                    {item.sub && (
                      <dd className="text-xs text-ink-400 font-light mt-0.5">{item.sub}</dd>
                    )}
                  </div>
                ))}

                <div className="pt-2 border-t border-ink-500/20">
                  <dt className="text-[11px] text-ink-400 font-mono mb-1 tracking-wider">GITHUB</dt>
                  <dd>
                    <a
                      href={meta.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-hover font-mono transition-colors duration-300 inline-flex items-center gap-1.5 group/link"
                    >
                      @HJRKTNG
                      <svg
                        className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
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
