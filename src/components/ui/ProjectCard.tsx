import type { Project } from '../../types'
import { Tag } from './Tag'

const statusConfig = {
  live: { label: 'Live', className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  dev:  { label: 'Dev',  className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  wip:  { label: 'WIP',  className: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status]

  return (
    <div className="flex flex-col bg-bg-card border border-white/7 rounded-xl p-6 hover:border-accent/40 transition-colors duration-300 group">
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{project.titleJa}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${status.className}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* 説明 */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4">{project.description}</p>

      {/* 解決した問題 */}
      <div className="mb-4 p-3 rounded-lg bg-bg-elevated border-l-2 border-accent/50">
        <p className="text-xs text-slate-500 mb-1 font-mono">解決したかったこと</p>
        <p className="text-sm text-slate-300">{project.problem}</p>
      </div>

      {/* 工夫・実績 */}
      <ul className="mb-5 space-y-1.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-accent mt-0.5 shrink-0">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* 技術スタック */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map(t => <Tag key={t}>{t}</Tag>)}
      </div>

      {/* リンク */}
      <div className="flex gap-3 mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-mono"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent transition-colors font-mono"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live
          </a>
        )}
      </div>
    </div>
  )
}
