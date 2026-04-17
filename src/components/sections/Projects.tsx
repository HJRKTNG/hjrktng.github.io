import { useState } from 'react'
import { projects } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const featured = projects.filter(p => p.featured)
  const others   = projects.filter(p => !p.featured)
  const { ref, visible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="projects" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub="作ったもの" num="03">Projects</SectionHeading>

        {/* Featured projects */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>

        {/* Other projects */}
        <div className="border-t border-ink-500/20 pt-8">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="flex items-center gap-2.5 text-sm text-ink-400 hover:text-accent transition-colors font-mono mb-6 group"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:text-accent ${showAll ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showAll
              ? 'その他のプロジェクトを閉じる'
              : `その他のプロジェクトを見る（${others.length}件）`}
          </button>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden transition-all duration-500 ${
              showAll ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {others.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} visible={showAll} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
