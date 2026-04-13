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
      {/* 背景装飾 */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading sub="作ったもの">Projects</SectionHeading>

        {/* 注力プロジェクト */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>

        {/* その他のプロジェクト */}
        <div className="border-t border-white/7 pt-8">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors font-mono mb-6 group"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 group-hover:text-accent ${showAll ? 'rotate-90' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showAll ? 'その他のプロジェクトを閉じる' : `その他のプロジェクトを見る（${others.length}件）`}
          </button>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden transition-all duration-500 ${
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
