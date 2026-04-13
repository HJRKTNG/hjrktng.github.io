import { useScrollReveal } from '../../hooks/useScrollReveal'

interface SectionHeadingProps {
  children: React.ReactNode
  sub?: string
}

export function SectionHeading({ children, sub }: SectionHeadingProps) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {sub && (
        <p className="font-mono text-xs text-accent/60 tracking-widest mb-2">{sub.toUpperCase()}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
        {children}
      </h2>
      <div className={`mt-3 h-0.5 bg-gradient-to-r from-accent to-indigo-500 rounded-full transition-all duration-1000 delay-300 ${visible ? 'w-12' : 'w-0'}`} />
    </div>
  )
}
