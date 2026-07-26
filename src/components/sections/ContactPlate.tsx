import { meta, ui } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLang } from '../../i18n'

/* 機器に刻印された銘板としての連絡先 */

export function ContactPlate() {
  const { t } = useLang()
  const { ref, visible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="contact" className="relative bg-bg-deep py-28 md:py-40 overflow-hidden">
      {/* 底面の淡いシアン */}
      <div
        className="absolute inset-x-0 bottom-0 h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(79,216,224,0.10) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-5 mb-14">
          <span className="font-mono text-[10px] text-sig tracking-label uppercase">Contact</span>
          <div className="flex-1 h-px rule-tick opacity-60" />
          <span className="font-mono text-[10px] text-ink-500 tabular-nums">UNIT 07</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div
            className={`lg:col-span-7 transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2
              className="font-display font-bold text-ink-50 leading-[1.04] tracking-tight whitespace-pre-line"
              style={{ fontSize: 'clamp(30px, 4.6vw, 68px)' }}
            >
              {t(ui.contact.lead)}
            </h2>
            <p className="text-ink-300 font-light leading-relaxed mt-6 max-w-lg text-[15px]">
              {t(ui.contact.body)}
            </p>
          </div>

          {/* 銘板 */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div
              className="relative crop-mark p-7 md:p-8"
              style={{
                background: 'linear-gradient(150deg, #12171A 0%, #0B0E10 60%, #0E1316 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* 刻印風の細い線 */}
              <div className="absolute inset-x-7 top-[52px] h-px bg-line" />

              <p className="font-mono text-[9px] text-ink-500 tracking-label uppercase mb-7">
                Serial / Contact
              </p>

              <a
                href={`mailto:${meta.email}`}
                className="group block py-4 border-b border-line"
              >
                <span className="font-mono text-[9px] text-ink-500 tracking-label uppercase block mb-1.5">
                  Email
                </span>
                <span className="font-mono text-[13px] text-ink-100 group-hover:text-sig transition-colors duration-300 break-all">
                  {meta.email}
                </span>
              </a>

              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-4 border-b border-line"
              >
                <span className="font-mono text-[9px] text-ink-500 tracking-label uppercase block mb-1.5">
                  GitHub
                </span>
                <span className="font-mono text-[13px] text-ink-100 group-hover:text-sig transition-colors duration-300">
                  @HJRKTNG
                </span>
              </a>

              <div className="py-4">
                <span className="font-mono text-[9px] text-ink-500 tracking-label uppercase block mb-1.5">
                  Location
                </span>
                <span className="font-mono text-[13px] text-ink-100">
                  {t({ ja: '福岡 / 日本', en: 'Fukuoka, Japan' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
