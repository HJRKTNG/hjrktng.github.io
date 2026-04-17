interface TagProps {
  children: React.ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block font-mono text-xs px-2.5 py-0.5 bg-accent/8 text-accent/80 border border-accent/20">
      {children}
    </span>
  )
}
