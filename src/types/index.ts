export interface Project {
  id: string
  title: string
  titleJa: string
  description: string
  problem: string
  highlights: string[]
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  status: 'live' | 'dev' | 'wip'
  featured: boolean
}

export interface SkillCategory {
  label: string
  skills: string[]
}
