interface TagProps {
  children: React.ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block font-mono text-xs px-2 py-0.5 rounded bg-accent-dim text-accent border border-accent/20">
      {children}
    </span>
  )
}
