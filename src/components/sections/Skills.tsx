import { useState } from 'react'
import { skillCategories, ui } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLang } from '../../i18n'

export function Skills() {
  const { lang, t } = useLang()
  const { ref, visible } = useScrollReveal({ threshold: 0.1 })
  // カテゴリごとに、ホバー中のスキルの「使った文脈」を表示
  const [hovering, setHovering] = useState<{ cat: number; skill: number } | null>(null)

  return (
    <section id="skills" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub={t(ui.sections.skillsSub)} num="04">Skills</SectionHeading>

        <p className="text-xs text-ink-400 font-light mb-8 -mt-8">
          {lang === 'ja'
            ? 'タグにカーソルを合わせると、実際に使ったプロジェクトが表示されます。'
            : 'Hover a tag to see where I actually used it.'}
        </p>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, catIdx) => {
            const activeSkill =
              hovering && hovering.cat === catIdx ? cat.skills[hovering.skill] : null
            return (
              <div
                key={cat.label.en}
                className={`group bg-bg-card border border-ink-500/25 p-6 hover:border-accent/30 transition-all duration-500 flex flex-col ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visible ? `${catIdx * 80}ms` : '0ms' }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-0.5 h-5 bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
                  <h3 className="font-mono text-[10px] text-accent/70 group-hover:text-accent tracking-[0.25em] uppercase transition-colors duration-300">
                    {t(cat.label)}
                  </h3>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, skillIdx) => (
                    <span
                      key={skill.name}
                      onMouseEnter={() => setHovering({ cat: catIdx, skill: skillIdx })}
                      onMouseLeave={() => setHovering(null)}
                      className={`text-xs font-mono px-2.5 py-1 bg-bg-elevated text-ink-300 border border-ink-500/30
                        hover:border-accent/40 hover:text-accent hover:bg-accent/5
                        transition-all duration-200 cursor-default
                        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                      style={{ transitionDelay: visible ? `${catIdx * 80 + skillIdx * 35}ms` : '0ms' }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                {/* Used-in context line */}
                <div className="mt-auto pt-4 min-h-[38px]">
                  <p
                    className={`text-[11px] font-light leading-relaxed transition-all duration-200 ${
                      activeSkill ? 'opacity-100 text-ink-200' : 'opacity-40 text-ink-500'
                    }`}
                  >
                    {activeSkill ? (
                      <>
                        <span className="text-accent font-mono mr-1.5">→</span>
                        {t(activeSkill.usedIn)}
                      </>
                    ) : lang === 'ja' ? (
                      'ホバーで使用文脈を表示'
                    ) : (
                      'Hover to see context'
                    )}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
