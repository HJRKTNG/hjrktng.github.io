import { useState } from 'react'
import { projects, projectCategories, ui } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { LoadBalancerDemo } from '../demo/LoadBalancerDemo'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLang } from '../../i18n'

export function Projects() {
  const { t } = useLang()
  const [filter, setFilter] = useState<'all' | 'web' | 'ai' | 'game'>('all')
  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)
  const filtered = filter === 'all' ? others : others.filter(p => p.category === filter)

  const { ref, visible } = useScrollReveal({ threshold: 0.05 })
  const { ref: demoRef, visible: demoVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: moreRef, visible: moreVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="projects" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub={t(ui.sections.projectsSub)} num="02">Projects</SectionHeading>

        {/* Featured */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase">
            {t(ui.sections.featuredLabel)}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        </div>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>

        {/* Interactive demo */}
        <div
          ref={demoRef}
          className={`mb-16 transition-all duration-700 ${
            demoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <LoadBalancerDemo />
        </div>

        {/* More projects + filter */}
        <div className="border-t border-ink-500/20 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-8">
            <span className="font-mono text-[10px] text-ink-400 tracking-[0.3em] uppercase">
              {t(ui.sections.moreLabel)}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {projectCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`text-xs font-mono px-3.5 py-1.5 border transition-all duration-300 ${
                    filter === cat.id
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-ink-500/40 text-ink-400 hover:text-ink-100 hover:border-ink-400'
                  }`}
                  aria-pressed={filter === cat.id}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>
          </div>

          <div ref={moreRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} visible={moreVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
