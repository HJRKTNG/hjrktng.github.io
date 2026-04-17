import { meta } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Contact() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="contact" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,168,83,0.05) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub="お問い合わせ" num="05">Contact</SectionHeading>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="font-display text-3xl md:text-4xl font-light text-ink-100 leading-snug mb-6 tracking-tight">
              インターンや仕事の
              <br />
              ご相談、お気軽にどうぞ。
            </p>
            <p className="text-ink-300 font-light leading-relaxed">
              AIエンジニア・PM・フルスタック領域でのご相談、または単純なご連絡も歓迎です。
            </p>
          </div>

          {/* Right: links */}
          <div
            ref={ref}
            className={`flex flex-col gap-4 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href={`mailto:${meta.email}`}
              className="group flex items-center gap-4 p-5 bg-bg-card border border-ink-500/25 hover:border-accent/35 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-ink-500/40 group-hover:border-accent/50 group-hover:bg-accent/8 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-ink-400 font-mono tracking-widest uppercase mb-1">Email</p>
                <p className="text-sm font-mono text-ink-200 group-hover:text-accent transition-colors duration-300 truncate">
                  {meta.email}
                </p>
              </div>
              <svg className="w-4 h-4 text-ink-500 group-hover:text-accent ml-auto shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 bg-bg-card border border-ink-500/25 hover:border-accent/35 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-ink-500/40 group-hover:border-accent/50 group-hover:bg-accent/8 transition-all duration-300 shrink-0">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-ink-400 font-mono tracking-widest uppercase mb-1">GitHub</p>
                <p className="text-sm font-mono text-ink-200 group-hover:text-accent transition-colors duration-300">
                  @HJRKTNG
                </p>
              </div>
              <svg className="w-4 h-4 text-ink-500 group-hover:text-accent ml-auto shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
