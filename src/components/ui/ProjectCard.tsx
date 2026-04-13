import { useState } from 'react'
import type { Project } from '../../types'
import { Tag } from './Tag'

const statusConfig = {
  live: { label: 'Live', className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' },
  dev:  { label: 'Dev',  className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',         dot: 'bg-blue-400' },
  wip:  { label: 'WIP',  className: 'bg-amber-500/15 text-amber-400 border-amber-500/30',      dot: 'bg-amber-400' },
}

interface ProjectCardProps {
  project: Project
  index?: number
  visible?: boolean
}

export function ProjectCard({ project, index = 0, visible = true }: ProjectCardProps) {
  const status = statusConfig[project.status]
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative flex flex-col bg-bg-card border border-white/7 rounded-2xl p-6
        transition-all duration-500 cursor-default overflow-hidden
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${hovered ? 'border-accent/40 shadow-[0_0_40px_rgba(56,189,248,0.08)] -translate-y-1' : ''}
      `}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ホバー時のグロー */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
        <div>
          <h3 className={`text-lg font-bold transition-colors duration-300 ${hovered ? 'text-accent' : 'text-slate-100'}`}>
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{project.titleJa}</p>
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border shrink-0 ${status.className}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse-slow`} />
          {status.label}
        </span>
      </div>

      {/* 説明 */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4 relative z-10">{project.description}</p>

      {/* 解決した問題 */}
      <div className={`mb-4 p-3 rounded-xl border-l-2 transition-colors duration-300 relative z-10 ${
        hovered ? 'bg-accent/5 border-accent/60' : 'bg-bg-elevated border-accent/30'
      }`}>
        <p className="text-xs text-slate-500 mb-1 font-mono">解決したかったこと</p>
        <p className="text-sm text-slate-300">{project.problem}</p>
      </div>

      {/* 工夫・実績 */}
      <ul className="mb-5 space-y-1.5 relative z-10">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
            <span className={`mt-0.5 shrink-0 transition-colors duration-300 ${hovered ? 'text-accent' : 'text-accent/60'}`}>▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* 技術スタック */}
      <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
        {project.tech.map(t => <Tag key={t}>{t}</Tag>)}
      </div>

      {/* リンク */}
      <div className="flex gap-4 mt-auto relative z-10">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-accent transition-colors font-mono group/link"
          >
            <svg className="w-4 h-4 transition-transform group-hover/link:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-accent transition-colors font-mono group/link"
          >
            <svg className="w-4 h-4 transition-transform group-hover/link:scale-110 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live
          </a>
        )}
      </div>
    </div>
  )
}
