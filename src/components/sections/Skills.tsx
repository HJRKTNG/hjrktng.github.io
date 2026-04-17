import { skillCategories } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Skills() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="skills" className="py-28 bg-bg-base relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub="技術スタック" num="02">Skills</SectionHeading>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.label}
              className={`group bg-bg-card border border-ink-500/25 p-6 hover:border-accent/30 transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${catIdx * 80}ms` : '0ms' }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-0.5 h-5 bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
                <h3 className="font-mono text-[10px] text-accent/70 group-hover:text-accent tracking-[0.25em] uppercase transition-colors duration-300">
                  {cat.label}
                </h3>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <span
                    key={skill}
                    className={`text-xs font-mono px-2.5 py-1 bg-bg-elevated text-ink-300 border border-ink-500/30
                      hover:border-accent/40 hover:text-accent hover:bg-accent/5
                      transition-all duration-200 cursor-default
                      ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    style={{ transitionDelay: visible ? `${catIdx * 80 + skillIdx * 35}ms` : '0ms' }}
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
