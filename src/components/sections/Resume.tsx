import { SectionHeading } from '../ui/SectionHeading'

export function Resume() {
  return (
    <section id="resume" className="py-24 bg-bg-base">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading sub="履歴書">Resume</SectionHeading>

        <div className="bg-bg-card rounded-xl border border-white/7 overflow-hidden">
          {/* ヘッダー */}
          <div className="p-6 border-b border-white/7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-slate-100 font-semibold mb-1">履歴書 / Resume</h3>
              <p className="text-sm text-slate-500">沓脱 聖 — Hijiri Kutsunugi</p>
            </div>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-accent text-bg-base font-bold rounded-lg text-sm hover:bg-accent-hover transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PDFをダウンロード
            </a>
          </div>

          {/* PDF プレビュー */}
          <div className="w-full" style={{ height: '600px' }}>
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
