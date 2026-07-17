import type { L } from '../i18n'

export type ProjectCategory = 'web' | 'ai' | 'game'

export interface Project {
  id: string
  title: string
  subtitle: L
  category: ProjectCategory
  description: L
  problem?: L
  /** 思考の跡 — 課題に対してどう考え、何を仮説にしたか */
  approach?: L
  highlights: L[]
  tech: string[]
  period?: string
  liveUrl?: string
  githubUrl?: string
  status: 'live' | 'dev' | 'wip'
  featured: boolean
  /** 補足（例: リポジトリ非公開の理由） */
  note?: L
}

export interface SkillItem {
  name: string
  /** どのプロジェクト・文脈で使ったか（ホバーで表示） */
  usedIn: L
}

export interface SkillCategory {
  label: L
  skills: SkillItem[]
}

export interface NumberStat {
  value: number
  prefix?: string
  suffix?: L
  label: L
}

export interface JourneyItem {
  year: string
  title: L
  body: L
}

export interface ResearchStep {
  num: string
  title: L
  body: L
}
