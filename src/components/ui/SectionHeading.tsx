import { useScrollReveal } from '../../hooks/useScrollReveal'

interface SectionHeadingProps {
  children: React.ReactNode
  sub?: string
  num?: string
}

export function SectionHeading({ children, sub, num }: SectionHeadingProps) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`mb-16 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="flex items-baseline gap-5 mb-3">
        {num && (
          <span className="font-mono text-3xl md:text-4xl font-light text-ink-500/35 tabular-nums leading-none">
            {num}
          </span>
        )}
        <h2 className="font-display text-4xl md:text-5xl font-light text-ink-50 tracking-tight leading-tight">
          {children}
        </h2>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div
          className={`h-px bg-gradient-to-r from-accent to-transparent transition-all duration-1000 delay-300 ${
            visible ? 'w-14' : 'w-0'
          }`}
        />
        {sub && (
          <span className="font-mono text-xs text-ink-400 tracking-[0.25em]">
            {sub.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  )
}
