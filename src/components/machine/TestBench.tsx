import { LoadBalancerDemo } from '../demo/LoadBalancerDemo'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLang } from '../../i18n'

/* ═══════════════════════════════════════════════════════════
   試験台 — UNIT 01 のゲート機構を、実際に動かして確かめる区画
   ═══════════════════════════════════════════════════════════ */

export function TestBench() {
  const { t } = useLang()
  const { ref, visible } = useScrollReveal({ threshold: 0.15 })

  return (
    <section className="relative bg-bg-base py-24 md:py-32">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center gap-5 mb-8">
            <span className="font-mono text-[10px] text-sig tracking-label uppercase">Test Bench</span>
            <div className="flex-1 h-px rule-tick opacity-60" />
            <span className="font-mono text-[10px] text-ink-500 tracking-wider">UNIT 01 · LIVE</span>
          </div>

          <p className="text-ink-300 font-light leading-relaxed text-[14px] max-w-2xl mb-8">
            {t({
              ja: '上のゲート機構を実際に動かせます。「分散 OFF」では全員が同じ瞬間にリクエストを送るためサーバーが詰まり、待ち行列が溢れてタイムアウトが出ます。「分散 ON」に切り替えると送信が時間差に散り、同じ台数のまま全件を捌き切ります。画面の残り秒数は、どちらでも全員同期しています。',
              en: 'You can run the gate mechanism yourself. With spreading OFF every request fires at once, the queue overflows and requests time out. Switch it ON and the same server handles every request — while the countdown on every screen stays perfectly in sync.',
            })}
          </p>

          <LoadBalancerDemo />
        </div>
      </div>
    </section>
  )
}
