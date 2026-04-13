import { useState } from 'react'
import { projects } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const featured = projects.filter(p => p.featured)
  const others   = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading sub="作ったもの">Projects</SectionHeading>

        {/* 注力プロジェクト */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

        {/* その他のプロジェクト */}
        <div className="border-t border-white/7 pt-8">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors font-mono mb-6"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showAll ? 'rotate-90' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showAll ? 'その他のプロジェクトを閉じる' : `その他のプロジェクトを見る（${others.length}件）`}
          </button>

          {showAll && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
