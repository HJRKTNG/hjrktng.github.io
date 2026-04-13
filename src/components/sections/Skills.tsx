import { skillCategories } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Skills() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="skills" className="py-28 bg-bg-base relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading sub="技術スタック">Skills</SectionHeading>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.label}
              className={`bg-bg-card rounded-xl p-5 border border-white/7 hover:border-accent/30 transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${catIdx * 80}ms` : '0ms' }}
            >
              {/* カテゴリヘッダー */}
              <h3 className="text-xs font-mono text-accent tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-accent/60 group-hover:bg-accent transition-colors duration-300" />
                {cat.label.toUpperCase()}
              </h3>

              {/* スキルチップ */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <span
                    key={skill}
                    className={`text-xs font-mono px-2.5 py-1 rounded-lg bg-bg-elevated text-slate-400 border border-white/7
                      hover:border-accent/40 hover:text-accent hover:bg-accent/5
                      transition-all duration-200 cursor-default
                      ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    style={{ transitionDelay: visible ? `${catIdx * 80 + skillIdx * 40}ms` : '0ms' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
