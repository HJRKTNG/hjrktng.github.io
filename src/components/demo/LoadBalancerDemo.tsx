import { useEffect, useRef, useState } from 'react'
import { ui } from '../../data/portfolio'
import { useLang } from '../../i18n'

/* ═══════════════════════════════════════════════════════
   時間差分散デモ — GOUN FES で使った設計をその場で体験する
   ・分散OFF: 全員が同じ瞬間にリクエスト → サーバーが詰まり タイムアウト発生
   ・分散ON : 送信をランダムにずらす（画面のカウントダウンは全員同期）→ 全件処理
   Canvas 2D / 依存ライブラリなし
   ═══════════════════════════════════════════════════════ */

const USERS = 48
const CYCLE_MS = 5200        // 1サイクル
const COUNTDOWN_MS = 1600    // 「3,2,1」表示
const SPREAD_MS = 1800       // 分散ONのときの送信ずらし幅
const TRAVEL_MS = 650        // 粒子の飛行時間
const CAPACITY_PER_TICK = 3  // 100msごとに処理できる件数
const TICK_MS = 100
const QUEUE_LIMIT = 14       // これを超えた到着はタイムアウト

const C = {
  bg: '#080A0B',
  grid: 'rgba(79,216,224,0.05)',
  user: '#2A3438',
  userFlash: '#9DF2F7',
  userDone: '#4FD8E0',
  userDrop: '#E0574F',
  particle: '#4FD8E0',
  particleTrail: 'rgba(79,216,224,0.30)',
  server: '#1A2226',
  serverEdge: '#39474D',
  queue: '#C9A227',
  ok: '#4FD8E0',
  bad: '#E0574F',
  text: '#8B999F',
}

interface Particle {
  user: number
  fireAt: number      // 発射時刻（サイクル内ms）
  arriveAt: number
  state: 'wait' | 'fly' | 'queued' | 'done' | 'dropped'
  queuedAt?: number
  doneAt?: number
  dropT?: number      // 落下アニメ用
}

interface Sim {
  mode: 'off' | 'on'
  cycleStart: number
  particles: Particle[]
  queue: number[]          // particle index の待ち行列
  processedThisCycle: number
  droppedThisCycle: number
  peakQueue: number
  lastTick: number
  seed: number
}

function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function newCycle(sim: Sim, now: number) {
  sim.cycleStart = now
  sim.queue = []
  sim.processedThisCycle = 0
  sim.droppedThisCycle = 0
  sim.peakQueue = 0
  sim.lastTick = 0
  sim.seed += 1
  sim.particles = Array.from({ length: USERS }, (_, i) => {
    const delay = sim.mode === 'on' ? rand(sim.seed * 1000 + i) * SPREAD_MS : 0
    const fireAt = COUNTDOWN_MS + delay
    return {
      user: i,
      fireAt,
      arriveAt: fireAt + TRAVEL_MS,
      state: 'wait' as const,
    }
  })
}

export function LoadBalancerDemo() {
  const { lang, t } = useLang()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simRef = useRef<Sim>({
    mode: 'off',
    cycleStart: 0,
    particles: [],
    queue: [],
    processedThisCycle: 0,
    droppedThisCycle: 0,
    peakQueue: 0,
    lastTick: 0,
    seed: 1,
  })
  const [mode, setMode] = useState<'off' | 'on'>('off')
  const [stats, setStats] = useState({ processed: 0, dropped: 0, peak: 0 })

  // モード切替 → 新サイクル
  useEffect(() => {
    const sim = simRef.current
    sim.mode = mode
    newCycle(sim, performance.now())
  }, [mode])

  // 統計の定期反映（Reactへは低頻度で）
  useEffect(() => {
    const id = setInterval(() => {
      const sim = simRef.current
      setStats({
        processed: sim.processedThisCycle,
        dropped: sim.droppedThisCycle,
        peak: sim.peakQueue,
      })
    }, 250)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let disposed = false

    const draw = (now: number) => {
      if (disposed) return
      const sim = simRef.current
      if (sim.cycleStart === 0) newCycle(sim, now)

      const parent = canvas.parentElement
      const cssW = parent ? parent.clientWidth : 640
      const cssH = 340
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr
        canvas.height = cssH * dpr
        canvas.style.width = `${cssW}px`
        canvas.style.height = `${cssH}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const W = cssW
      const H = cssH
      let tc = now - sim.cycleStart // サイクル内経過ms

      /* ── シミュレーション更新 ── */
      // 発射 → 到着 → キュー → 処理
      for (const p of sim.particles) {
        if (p.state === 'wait' && tc >= p.fireAt) p.state = 'fly'
        if (p.state === 'fly' && tc >= p.arriveAt) {
          if (sim.queue.length >= QUEUE_LIMIT) {
            p.state = 'dropped'
            p.dropT = tc
            sim.droppedThisCycle++
          } else {
            p.state = 'queued'
            p.queuedAt = tc
            sim.queue.push(p.user)
            sim.peakQueue = Math.max(sim.peakQueue, sim.queue.length)
          }
        }
      }
      // サーバー処理（TICK_MSごとにCAPACITY件）
      if (tc - sim.lastTick >= TICK_MS) {
        const ticks = Math.floor((tc - sim.lastTick) / TICK_MS)
        sim.lastTick += ticks * TICK_MS
        let budget = CAPACITY_PER_TICK * ticks
        while (budget > 0 && sim.queue.length > 0) {
          const idx = sim.queue.shift()!
          const p = sim.particles[idx]
          p.state = 'done'
          p.doneAt = tc
          sim.processedThisCycle++
          budget--
        }
      }
      // サイクル終了判定
      const allSettled = sim.particles.every(p => p.state === 'done' || p.state === 'dropped')
      if ((allSettled && tc > COUNTDOWN_MS + 1500) || tc > CYCLE_MS + 3000) {
        newCycle(sim, now)
        tc = 0
      }

      /* ── 描画 ── */
      ctx.fillStyle = C.bg
      ctx.fillRect(0, 0, W, H)

      // grid
      ctx.strokeStyle = C.grid
      ctx.lineWidth = 1
      for (let gx = 0; gx < W; gx += 40) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke()
      }
      for (let gy = 0; gy < H; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
      }

      const isMobile = W < 560
      const userCols = isMobile ? 4 : 6
      const userRows = Math.ceil(USERS / userCols)
      const cell = isMobile ? 18 : 22
      const gap = isMobile ? 8 : 10
      const gridW = userCols * cell + (userCols - 1) * gap
      const gridH = userRows * cell + (userRows - 1) * gap
      const gridX = 28
      const gridY = (H - gridH) / 2
      const serverX = W - (isMobile ? 84 : 120)
      const serverW = isMobile ? 42 : 56
      const serverCY = H / 2

      const userPos = (i: number) => {
        const col = i % userCols
        const row = Math.floor(i / userCols)
        return {
          x: gridX + col * (cell + gap) + cell / 2,
          y: gridY + row * (cell + gap) + cell / 2,
        }
      }

      // countdown 表示（両モードで全員同期 = 体験は同時）
      const cdRemain = COUNTDOWN_MS - tc
      const flash = tc >= COUNTDOWN_MS && tc < COUNTDOWN_MS + 260

      // users
      for (let i = 0; i < USERS; i++) {
        const p = sim.particles[i]
        const { x, y } = userPos(i)
        let color = C.user
        if (p) {
          if (flash) color = C.userFlash
          if (p.state === 'done') color = C.userDone
          if (p.state === 'dropped') color = C.userDrop
        }
        ctx.fillStyle = color
        const s = cell
        ctx.fillRect(x - s / 2, y - s / 2, s, s)
        // 微妙なハイライト（ボクセル感）
        ctx.fillStyle = 'rgba(255,255,255,0.07)'
        ctx.fillRect(x - s / 2, y - s / 2, s, 3)
      }

      // countdown text
      ctx.textAlign = 'center'
      if (cdRemain > 0) {
        const n = Math.ceil(cdRemain / (COUNTDOWN_MS / 3))
        ctx.fillStyle = C.userFlash
        ctx.font = '600 34px "IBM Plex Mono", monospace'
        ctx.fillText(String(n), gridX + gridW / 2, gridY - 18)
      } else if (flash) {
        ctx.fillStyle = C.userFlash
        ctx.font = '600 15px "IBM Plex Mono", monospace'
        ctx.fillText(t(ui.demo.voteNow), gridX + gridW / 2, gridY - 22)
      }

      // particles in flight
      for (const p of sim.particles) {
        if (p.state === 'fly') {
          const { x: ux, y: uy } = userPos(p.user)
          const prog = Math.min(1, Math.max(0, (tc - p.fireAt) / TRAVEL_MS))
          const eased = prog * prog * (3 - 2 * prog)
          const px = ux + (serverX - 14 - ux) * eased
          const py = uy + (serverCY - uy) * eased
          // trail
          ctx.fillStyle = C.particleTrail
          ctx.fillRect(px - 9, py - 2, 6, 4)
          ctx.fillStyle = C.particle
          ctx.fillRect(px - 3, py - 3, 6, 6)
        }
        if (p.state === 'dropped' && p.dropT !== undefined) {
          const dt = (tc - p.dropT) / 1000
          if (dt < 1.2) {
            const px = serverX - 26
            const py = serverCY + dt * dt * 220
            ctx.globalAlpha = Math.max(0, 1 - dt)
            ctx.fillStyle = C.bad
            ctx.fillRect(px - 3, py - 3, 6, 6)
            ctx.globalAlpha = 1
          }
        }
      }

      // queue（サーバー左に積む）
      const qN = sim.queue.length
      for (let qi = 0; qi < qN; qi++) {
        const qx = serverX - 22 - Math.floor(qi / 7) * 12
        const qy = serverCY + 36 - (qi % 7) * 12
        ctx.fillStyle = C.queue
        ctx.globalAlpha = 0.85
        ctx.fillRect(qx - 4, qy - 4, 8, 8)
        ctx.globalAlpha = 1
      }

      // server（ボクセルタワー）
      const load = Math.min(1, qN / QUEUE_LIMIT)
      const towerH = isMobile ? 110 : 140
      const blocks = 7
      for (let b = 0; b < blocks; b++) {
        const by = serverCY + towerH / 2 - ((b + 1) * towerH) / blocks
        const active = b / blocks < load
        ctx.fillStyle = active
          ? load > 0.85 ? C.bad : load > 0.5 ? '#d4a853' : C.ok
          : C.server
        ctx.fillRect(serverX, by + 2, serverW, towerH / blocks - 4)
        ctx.strokeStyle = C.serverEdge
        ctx.lineWidth = 1
        ctx.strokeRect(serverX + 0.5, by + 2.5, serverW - 1, towerH / blocks - 5)
      }
      // server label
      ctx.fillStyle = C.text
      ctx.font = '10px "IBM Plex Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText(t(ui.demo.server), serverX + serverW / 2, serverCY + towerH / 2 + 20)
      // overload indicator
      if (load >= 1) {
        ctx.fillStyle = C.bad
        ctx.font = '600 11px "IBM Plex Mono", monospace'
        ctx.fillText('OVERLOAD', serverX + serverW / 2, serverCY - towerH / 2 - 12)
      }

      // users label
      ctx.fillStyle = C.text
      ctx.font = '10px "IBM Plex Mono", monospace'
      ctx.fillText(`${USERS} ${t(ui.demo.users)}`, gridX + gridW / 2, gridY + gridH + 24)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
    }
  }, [lang, t])

  const okRate = stats.processed + stats.dropped > 0
    ? Math.round((stats.processed / (stats.processed + stats.dropped)) * 100)
    : null

  return (
    <div className="border border-line bg-bg-panel/85 overflow-hidden">
      {/* header */}
      <div className="p-5 md:p-6 border-b border-line flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <p className="font-mono text-[10px] text-sig tracking-label uppercase mb-2">
            Interactive Demo
          </p>
          <h3 className="text-ink-100 font-medium mb-1">{t(ui.demo.heading)}</h3>
          <p className="text-xs text-ink-400 font-light leading-relaxed max-w-xl">
            {t(ui.demo.sub)}
          </p>
        </div>
        {/* toggle */}
        <div className="flex items-center border border-line-bright font-mono text-xs shrink-0 self-start md:self-center">
          {(['off', 'on'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 tracking-wider transition-colors duration-300 ${
                mode === m
                  ? m === 'on'
                    ? 'bg-sig text-bg-deep'
                    : 'bg-[#E0574F] text-bg-deep'
                  : 'text-ink-400 hover:text-ink-100'
              }`}
              aria-pressed={mode === m}
            >
              {m === 'off' ? t(ui.demo.off) : t(ui.demo.on)}
            </button>
          ))}
        </div>
      </div>

      {/* canvas */}
      <div className="relative">
        <canvas ref={canvasRef} className="block w-full" />
      </div>

      {/* stats + sync note */}
      <div className="px-5 md:px-6 py-4 border-t border-line flex flex-wrap items-center gap-x-8 gap-y-2">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 bg-sig inline-block" />
          <span className="text-ink-400">{t(ui.demo.processed)}:</span>
          <span className="text-ink-100 tabular-nums">{stats.processed}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 bg-[#E0574F] inline-block" />
          <span className="text-ink-400">{t(ui.demo.dropped)}:</span>
          <span className={`tabular-nums ${stats.dropped > 0 ? 'text-[#E0574F]' : 'text-ink-100'}`}>
            {stats.dropped}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 bg-gold inline-block" />
          <span className="text-ink-400">{t(ui.demo.peak)}:</span>
          <span className="text-ink-100 tabular-nums">{stats.peak}</span>
          {okRate !== null && (
            <span className={`ml-2 ${okRate === 100 ? 'text-sig' : 'text-ink-400'}`}>
              ({okRate}% OK)
            </span>
          )}
        </div>
        <p className="font-mono text-[10px] text-ink-500 tracking-wide ml-auto">
          ✓ {t(ui.demo.countdown)}
        </p>
      </div>
    </div>
  )
}
