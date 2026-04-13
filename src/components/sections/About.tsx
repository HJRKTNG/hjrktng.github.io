import { meta, about } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-24 bg-bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading sub="自己紹介">About</SectionHeading>

        <div className="grid md:grid-cols-3 gap-10">
          {/* テキスト */}
          <div className="md:col-span-2 space-y-5">
            <p className="text-slate-300 leading-loose whitespace-pre-line">{about.intro}</p>
            <p className="text-slate-400 leading-loose">{about.goals}</p>
            <div className="p-4 rounded-lg bg-bg-elevated border border-accent/20">
              <p className="text-xs text-accent font-mono mb-1">海外経験</p>
              <p className="text-sm text-slate-300">{about.abroad}</p>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className="space-y-4">
            <div className="bg-bg-card rounded-xl p-5 border border-white/7">
              <h3 className="text-xs font-mono text-accent mb-4 tracking-widest">PROFILE</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-slate-500 mb-0.5">大学</dt>
                  <dd className="text-sm text-slate-300">九州大学</dd>
                  <dd className="text-xs text-slate-500">工学部 電気情報工学科 4年</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 mb-0.5">出身</dt>
                  <dd className="text-sm text-slate-300">開成高等学校</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 mb-0.5">居住地</dt>
                  <dd className="text-sm text-slate-300">福岡</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 mb-0.5">TOEIC</dt>
                  <dd className="text-sm text-slate-300">670点</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 mb-0.5">GitHub</dt>
                  <dd>
                    <a
                      href={meta.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-hover font-mono transition-colors"
                    >
                      @HJRKTNG
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
