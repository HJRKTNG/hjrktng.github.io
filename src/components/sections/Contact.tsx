import { meta } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Contact() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="contact" className="py-28 bg-bg-surface relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.05) 0%, transparent 60%)' }}
      />

      <div className="max-w-2xl mx-auto px-6 text-center">
        <SectionHeading sub="お問い合わせ">Contact</SectionHeading>

        <p className="text-slate-400 mb-12 leading-relaxed">
          インターンシップや仕事のご相談、お問い合わせはお気軽にどうぞ。
        </p>

        <div
          ref={ref}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* メール */}
          <a
            href={`mailto:${meta.email}`}
            className="group flex items-center gap-3 px-6 py-4 bg-bg-card border border-white/7 rounded-2xl hover:border-accent/40 text-slate-300 transition-all duration-300 w-full sm:w-auto justify-center hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(56,189,248,0.1)]"
          >
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-500 font-mono">Email</p>
              <p className="text-sm font-mono group-hover:text-accent transition-colors">{meta.email}</p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 bg-bg-card border border-white/7 rounded-2xl hover:border-accent/40 text-slate-300 transition-all duration-300 w-full sm:w-auto justify-center hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(56,189,248,0.1)]"
          >
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-500 font-mono">GitHub</p>
              <p className="text-sm font-mono group-hover:text-accent transition-colors">@HJRKTNG</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
