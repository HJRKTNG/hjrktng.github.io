import { SectionHeading } from '../ui/SectionHeading'

export function Resume() {
  return (
    <section id="resume" className="py-28 bg-bg-base">
      <div className="max-w-6xl mx-auto px-8">
        <SectionHeading sub="履歴書" num="04">Resume</SectionHeading>

        <div className="border border-ink-500/25 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-ink-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-bg-card">
            <div>
              <h3 className="text-ink-100 font-medium mb-1">履歴書 / Resume</h3>
              <p className="text-sm text-ink-400 font-light font-mono">沓脱 聖 — Hijiri Kutsunugi</p>
            </div>
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-bg-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              style={{ background: 'linear-gradient(135deg, #d4a853, #b88c38)' }}
            >
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PDFをダウンロード
            </a>
          </div>

          {/* PDF preview */}
          <div className="w-full bg-bg-elevated" style={{ height: '600px' }}>
            <iframe
              src="/resume.pdf"
              className="w-full h-full"
              title="Resume PDF"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
