interface SectionHeadingProps {
  children: React.ReactNode
  sub?: string
}

export function SectionHeading({ children, sub }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
        {children}
      </h2>
      {sub && (
        <p className="mt-2 text-slate-400 text-sm">{sub}</p>
      )}
      <div className="mt-3 w-12 h-0.5 bg-accent rounded-full" />
    </div>
  )
}
