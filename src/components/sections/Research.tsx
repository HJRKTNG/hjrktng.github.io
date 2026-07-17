import { research, ui } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLang } from '../../i18n'

export function Research() {
  const { t } = useLang()
  const { ref, visible } = useScrollReveal({ threshold: 0.1 })
  const { ref: gradRef, visible: gradVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="research" className="py-28 bg-bg-base relative overflow-hidden">
      {/* background: faint node-graph decoration */}
      <svg
        className="absolute right-0 top-10 w-[480px] h-[480px] opacity-[0.05] pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[
          [40, 60], [100, 30], [160, 70], [70, 120], [140, 140], [30, 170], [170, 180],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 4} y={y - 4} width={8} height={8} fill="#d4a853" />
        ))}
        <path
          d="M40 60 L100 30 L160 70 M40 60 L70 120 L140 140 L160 70 M70 120 L30 170 M140 140 L170 180"
          stroke="#d4a853"
          strokeWidth="1"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-8 relative">
        <SectionHeading sub={t(ui.sections.researchSub)} num="03">Research</SectionHeading>

        <div className="max-w-3xl mb-14">
          <h3 className="font-display text-2xl md:text-3xl font-light text-ink-50 leading-snug mb-5 tracking-tight">
            {t(research.heading)}
          </h3>
          <p className="text-ink-300 font-light leading-loose text-[15px]">
            {t(research.intro)}
          </p>
        </div>

        {/* Story steps */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {research.steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative bg-bg-card border border-ink-500/25 p-6 hover:border-accent/30 transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${i * 130}ms` : '0ms' }}
            >
              {/* connector arrow (desktop) */}
              {i < research.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-accent/30 group-hover:text-accent/60 transition-colors z-10">
                  →
                </div>
              )}
              <span className="font-mono text-3xl font-light text-ink-500/40 tabular-nums block mb-4">
                {step.num}
              </span>
              <h4 className="text-ink-100 text-sm font-medium mb-3 leading-snug">
                {t(step.title)}
              </h4>
              <p className="text-xs text-ink-300 font-light leading-relaxed">
                {t(step.body)}
              </p>
            </div>
          ))}
        </div>

        {/* Grad school */}
        <div
          ref={gradRef}
          className={`relative p-6 md:p-8 border-l-2 border-accent/60 bg-bg-elevated/50 transition-all duration-700 ${
            gradVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-mono text-[10px] text-accent tracking-[0.25em] mb-3 uppercase">
            {t(ui.research.gradLabel)}
          </p>
          <p className="text-sm md:text-[15px] text-ink-200 font-light leading-loose max-w-3xl">
            {t(research.grad)}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {research.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 bg-accent/8 text-accent/80 border border-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
