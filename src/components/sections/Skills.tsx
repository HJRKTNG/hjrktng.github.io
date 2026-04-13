import { skillCategories } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-bg-base">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading sub="技術スタック">Skills</SectionHeading>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map(cat => (
            <div
              key={cat.label}
              className="bg-bg-card rounded-xl p-5 border border-white/7 hover:border-accent/30 transition-colors"
            >
              <h3 className="text-xs font-mono text-accent tracking-widest mb-4">{cat.label.toUpperCase()}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2 py-1 rounded bg-bg-elevated text-slate-300 border border-white/7 hover:border-accent/30 hover:text-accent transition-colors cursor-default"
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
