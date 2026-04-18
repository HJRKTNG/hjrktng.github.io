import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Group,
  InstancedMesh as InstancedMeshType,
  Object3D,
  Vector3,
  Color,
} from 'three'

/* ── サイトのアンバーテーマに調和する暖色系パレット ── */
const COLORS = {
  // 幹の色
  trunkDark: '#261608',
  trunkMid: '#3d2514',
  trunkLight: '#55361e',
  trunkRoot: '#302010',
  // 葉の色 — 暖色寄りのグリーン
  leafDeep: '#1c3d22',
  leafDark: '#28582e',
  leafForest: '#34723e',
  leafMain: '#408c4c',
  leafMed: '#4ea256',
  leafLight: '#5eb85e',
  leafBright: '#72cc6c',
  leafHigh: '#88dc84',
  leafSun: '#4c8a3a',
  leafGold: '#5e8c32',
  // 小物（岩、キノコなど）の色
  rockDark: '#3a3028',
  rockLight: '#554a40',
  shroomStem: '#e6d3ba',
  shroomCap: '#d66842', // 温かみのある赤オレンジ
  shroomSpots: '#f4e3c5',
}

interface Block {
  pos: [number, number, number]
  color: string
  type: 'trunk' | 'leaf'
  scale: number
}

/* シード付き乱数生成器 */
function makeRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/* ハッシュノイズ — 有機的な形状のため */
function hashNoise(x: number, y: number, z: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
  return (n - Math.floor(n)) * 2 - 1
}

/* ═══════════════════════════════════════════
   オーク型の自然な木を生成
   — 幹: 根元フレア → テーパー → 分岐
   — 枝: 5本の太枝が樹冠へ
   — 樹冠: 14ローブの不整形な広がり
   ═══════════════════════════════════════════ */
function generateOakTree(): Block[] {
  const blocks: Block[] = []
  const rand = makeRng(42)
  const S = 0.48 // ボクセル間隔
  const VS = 0.44 // ボクセル表示サイズ

  /* ─── 幹：根元フレアから上に向かってテーパー ─── */
  for (let y = -5; y <= 3; y++) {
    let radius: number
    if (y <= -3) {
      // 根元フレア — 下に広がる
      radius = 1.7 + (-3 - y) * 0.4
    } else if (y <= 1) {
      // メイン幹 — 緩やかなテーパー
      radius = 1.4 - (y + 3) * 0.1
    } else {
      // 上部 — 分岐エリアで細くなる
      radius = 0.85 - (y - 1) * 0.18
    }

    const r = Math.ceil(radius)
    for (let x = -r; x <= r; x++) {
      for (let z = -r; z <= r; z++) {
        const dist = Math.sqrt(x * x + z * z)
        // ノイズで幹の表面を不規則に
        const noise = hashNoise(x * 0.5, y * 0.3, z * 0.5) * 0.25
        if (dist <= radius + noise) {
          const dn = dist / Math.max(radius, 0.1)
          const color =
            y <= -3
              ? COLORS.trunkRoot
              : dn > 0.65
                ? COLORS.trunkDark
                : dn > 0.35
                  ? COLORS.trunkMid
                  : COLORS.trunkLight
          blocks.push({
            pos: [x * S, y * S, z * S],
            color,
            type: 'trunk',
            scale: VS,
          })
        }
      }
    }
  }

  /* ─── 太枝 — 幹から外側に伸びて樹冠に入る ─── */
  const branches = [
    { angle: 15, elev: 32, len: 3.5, startY: 1.5, thick: 0.7 },
    { angle: 88, elev: 38, len: 4.0, startY: 1.0, thick: 0.75 },
    { angle: 158, elev: 28, len: 3.8, startY: 2.0, thick: 0.65 },
    { angle: 230, elev: 35, len: 3.5, startY: 1.0, thick: 0.7 },
    { angle: 312, elev: 42, len: 4.2, startY: 1.5, thick: 0.8 },
  ]

  branches.forEach((br) => {
    const a = (br.angle * Math.PI) / 180
    const e = (br.elev * Math.PI) / 180
    const dx = Math.cos(a) * Math.cos(e)
    const dy = Math.sin(e)
    const dz = Math.sin(a) * Math.cos(e)

    for (let t = 0; t <= br.len; t += 0.5) {
      const px = dx * t
      const py = br.startY + dy * t
      const pz = dz * t
      // 先端に向かって細くなる
      const th = br.thick * (1 - (t / br.len) * 0.55)
      const tr = Math.ceil(th)

      for (let bx = -tr; bx <= tr; bx++) {
        for (let bz = -tr; bz <= tr; bz++) {
          const bdist = Math.sqrt(bx * bx + bz * bz)
          if (bdist > th) continue
          blocks.push({
            pos: [(px + bx * 0.3) * S, py * S, (pz + bz * 0.3) * S],
            color: bdist > th * 0.5 ? COLORS.trunkDark : COLORS.trunkMid,
            type: 'trunk',
            scale: VS * 0.85,
          })
        }
      }
    }
  })

  /* ─── 樹冠：マルチローブで不整形な広がり ─── */
  // ローブ中心の定義（広く広がるオーク型の冠を形成）
  const lobes = [
    // 中央上部（メインボリューム）
    { cx: 0, cy: 5.0, cz: 0, r: 3.2 },
    { cx: 0, cy: 7.0, cz: 0, r: 2.4 },
    // 枝先に対応する主要ローブ（幅広に広がる）
    { cx: 3.2, cy: 4.0, cz: 0.8, r: 2.7 },
    { cx: 1.0, cy: 3.5, cz: 3.5, r: 2.5 },
    { cx: -3.4, cy: 4.5, cz: 1.2, r: 2.5 },
    { cx: -2.2, cy: 3.8, cz: -3.0, r: 2.6 },
    { cx: 1.5, cy: 4.2, cz: -3.4, r: 2.8 },
    // 隙間を埋めるサブローブ
    { cx: -1.5, cy: 3.2, cz: 2.8, r: 2.0 },
    { cx: 2.5, cy: 3.5, cz: -1.5, r: 2.0 },
    { cx: -2.8, cy: 4.0, cz: -0.5, r: 2.2 },
    { cx: 0.5, cy: 2.8, cz: -2.2, r: 1.7 },
    // 下部の垂れ下がりローブ
    { cx: -2.2, cy: 2.2, cz: 0.8, r: 1.5 },
    { cx: 2.2, cy: 2.5, cz: -0.8, r: 1.6 },
    { cx: 0, cy: 2.2, cz: 2.8, r: 1.3 },
  ]

  const leafPalette = [
    COLORS.leafDeep,
    COLORS.leafDark,
    COLORS.leafForest,
    COLORS.leafMain,
    COLORS.leafMed,
    COLORS.leafLight,
    COLORS.leafBright,
    COLORS.leafHigh,
    COLORS.leafSun,
    COLORS.leafGold,
  ]

  const step = 0.48 // スキャン間隔（細かいほど密）
  const scan = 6.5 // スキャン範囲

  for (let x = -scan; x <= scan; x += step) {
    for (let z = -scan; z <= scan; z += step) {
      for (let y = 0.5; y <= 9; y += step) {
        let best = Infinity
        let inside = false

        // 各ローブとの距離をチェック
        for (let li = 0; li < lobes.length; li++) {
          const l = lobes[li]
          const ddx = x - l.cx
          const ddy = (y - l.cy) * 1.15 // Y方向を少し扁平にして広がりを強調
          const ddz = z - l.cz
          const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz)
          // ノイズでローブの境界をやや不規則に（振幅控えめで隙間を減らす）
          const nr =
            l.r + hashNoise(x * 0.55 + li * 7.3, y * 0.4, z * 0.55) * 0.35
          const n = d / nr
          if (n < 1) {
            inside = true
            if (n < best) best = n
          }
        }

        if (!inside) continue
        // 幹の内部を除外
        if (Math.sqrt(x * x + z * z) < 0.55 && y < 3.5) continue

        // 密度：内部ほど密、端ほど疎（全体的に高密度に）
        const density =
          best < 0.3
            ? 0.96
            : best < 0.55
              ? 0.92
              : best < 0.75
                ? 0.72
                : 0.40
        if (rand() > density) continue

        // 色の選択：高さと深さに基づく（上部ほど明るく）
        const hNorm = (y - 1) / 7
        const cFactor = hNorm * 0.35 + (1 - best) * 0.35 + rand() * 0.3
        const cIdx = Math.min(
          leafPalette.length - 1,
          Math.floor(cFactor * (leafPalette.length - 1)),
        )

        blocks.push({
          pos: [x * S, y * S, z * S],
          color: leafPalette[cIdx],
          type: 'leaf',
          scale: 0.38 + rand() * 0.1,
        })
      }
    }
  }

  /* ─── 根元周りの小物（岩、キノコ、草） ─── */
  // 岩をいくつか配置
  const numRocks = 8;
  for(let i=0; i<numRocks; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = 1.6 + rand() * 2.2;
    const rx = Math.cos(angle) * dist;
    const rz = Math.sin(angle) * dist;
    const ry = -5 + rand() * 0.3; // 地面付近
    const rockSize = 1 + Math.floor(rand() * 2); // 1~2ブロックの塊
    for(let bx=0; bx<rockSize; bx++) {
      for(let by=0; by<rockSize; by++) {
        for(let bz=0; bz<rockSize; bz++) {
          if(rand() > 0.3) {
            blocks.push({
              pos: [(rx+bx*0.4)*S, (ry+by*0.4)*S, (rz+bz*0.4)*S],
              color: rand() > 0.5 ? COLORS.rockLight : COLORS.rockDark,
              type: 'trunk',
              scale: VS * (1.1 + rand() * 0.6), // 少し大きく
            });
          }
        }
      }
    }
  }

  // キノコをいくつか配置
  const numShrooms = 2; // 量を減らす
  for(let i=0; i<numShrooms; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = 1.8 + rand() * 1.5;
    const mx = Math.cos(angle) * dist;
    const mz = Math.sin(angle) * dist;
    const my = -5;
    
    // 柄
    const stemH = 1 + Math.floor(rand() * 1.5);
    for(let h=0; h<stemH; h++) {
      blocks.push({ pos: [mx*S, (my+h*0.7)*S, mz*S], color: COLORS.shroomStem, type: 'trunk', scale: VS * 0.5 }); // 小さく
    }
    
    // 傘 (3x3 クロス)
    const capY = my + stemH * 0.7;
    for(let cx=-1; cx<=1; cx++) {
      for(let cz=-1; cz<=1; cz++) {
        if(Math.abs(cx)===1 && Math.abs(cz)===1) continue; // 角を削る
        const isSpot = rand() > 0.75;
        blocks.push({
          pos: [(mx+cx*0.4)*S, capY*S, (mz+cz*0.4)*S], // 間隔も狭く
          color: isSpot ? COLORS.shroomSpots : COLORS.shroomCap,
          type: 'trunk',
          scale: VS * 0.7, // 小さく
        });
      }
    }
    // 傘の頂点
    blocks.push({
      pos: [mx*S, (capY+0.4)*S, mz*S],
      color: COLORS.shroomCap,
      type: 'trunk',
      scale: VS * 0.55, // 小さく
    });
  }

  // 小さな草やシダを配置
  const numGrass = 18;
  for(let i=0; i<numGrass; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = 1.5 + rand() * 2.5;
    const gx = Math.cos(angle) * dist;
    const gz = Math.sin(angle) * dist;
    const gy = -5; // 地面

    const height = 1 + Math.floor(rand() * 2);
    for(let h=0; h<=height; h++) {
      blocks.push({
        pos: [gx*S, (gy+h*0.8)*S, gz*S],
        color: leafPalette[Math.floor(rand() * 3) + 2], // 濃い目の緑
        type: 'leaf', // 葉と同じ質感
        scale: VS * (0.6 - h*0.1),
      });
    }
  }

  return blocks
}

/* ═══════════════════════════════════════════
   InstancedMesh でボクセルを効率的に描画
   — マウスプッシュインタラクション
   — 葉の風揺れアニメーション
   ═══════════════════════════════════════════ */
function TreeInstancedMesh({
  blocks,
  mouseRef,
  groupRef,
  roughness,
  metalness,
}: {
  blocks: Block[]
  mouseRef: React.MutableRefObject<Vector3 | null>
  groupRef: React.RefObject<Group | null>
  roughness: number
  metalness: number
}) {
  const meshRef = useRef<InstancedMeshType>(null)
  const dummy = useMemo(() => new Object3D(), [])

  // ベース位置の配列（flat Float32Array）
  const basePos = useMemo(() => {
    const a = new Float32Array(blocks.length * 3)
    blocks.forEach((b, i) => {
      a[i * 3] = b.pos[0]
      a[i * 3 + 1] = b.pos[1]
      a[i * 3 + 2] = b.pos[2]
    })
    return a
  }, [blocks])

  // 現在位置（lerp用）
  const curPos = useMemo(() => new Float32Array(basePos), [basePos])

  /* 色の初期設定 */
  useEffect(() => {
    if (!meshRef.current) return
    const c = new Color()
    blocks.forEach((b, i) => {
      c.set(b.color)
      meshRef.current!.setColorAt(i, c)
    })
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true
  }, [blocks])

  /* 初回のマトリクス設定 */
  useEffect(() => {
    if (!meshRef.current) return
    blocks.forEach((b, i) => {
      dummy.position.set(...b.pos)
      dummy.scale.setScalar(b.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [blocks, dummy])

  /* 毎フレーム：マウス反応 + 風揺れ + lerp */
  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return
    const m = mouseRef.current
    // グループの Y 軸回転を取得（効率的な座標変換のため）
    const theta = groupRef.current.rotation.y
    const cosT = Math.cos(theta)
    const sinT = Math.sin(theta)
    const gp = groupRef.current.position
    const t = clock.elapsedTime

    for (let i = 0; i < blocks.length; i++) {
      const bx = basePos[i * 3]
      const by = basePos[i * 3 + 1]
      const bz = basePos[i * 3 + 2]
      let ox = 0,
        oy = 0,
        oz = 0

      /* マウスプッシュ — スクリーン空間2Dで距離計算、常にカメラ方向に押し出す */
      if (m) {
        // ボクセルのワールド座標（Y回転適用）— スクリーン上のX/Yに対応
        // Three.jsのY回転(右手系): x' = x*cos + z*sin, z' = -x*sin + z*cos
        const wx = bx * cosT + bz * sinT + gp.x
        const wy = by + gp.y
        // スクリーン空間（2D）でマウスとの距離・方向を計算
        const dx = wx - m.x
        const dy = wy - m.y
        const dist2D = Math.sqrt(dx * dx + dy * dy)
        const pushR = 2.5
        if (dist2D < pushR && dist2D > 0.001) {
          const s = Math.pow((pushR - dist2D) / pushR, 1.8)
          // スクリーン空間でのプッシュ: X/Yはカーソルから離れる方向
          const pwx = (dx / dist2D) * s * 1.0
          const pwy = (dy / dist2D) * s * 1.0
          // Z方向は常にカメラの方（手前 = +Z）へ押し出す
          const pwz = s * 0.5
          // ワールドプッシュ (pwx, pwy, pwz) → ローカルプッシュ (逆回転: -theta)
          // ox = pwx*cos(-t) + pwz*sin(-t) = pwx*cosT - pwz*sinT
          // oz = -pwx*sin(-t) + pwz*cos(-t) = pwx*sinT + pwz*cosT
          ox = pwx * cosT - pwz * sinT
          oy = pwy
          oz = pwx * sinT + pwz * cosT
        }
      }

      /* 風揺れ — 葉のみ、高さに応じて強さが変わる */
      if (blocks[i].type === 'leaf') {
        const windStr = Math.max(0, by - 0.3) * 0.01
        ox += Math.sin(t * 0.7 + bx * 0.6 + bz * 0.4) * windStr
        oz += Math.sin(t * 0.5 + bx * 0.3 + bz * 0.7) * windStr * 0.6
      }

      // 目標位置へ lerp（滑らかな復帰）
      const tx = bx + ox
      const ty = by + oy
      const tz = bz + oz
      curPos[i * 3] += (tx - curPos[i * 3]) * 0.12
      curPos[i * 3 + 1] += (ty - curPos[i * 3 + 1]) * 0.12
      curPos[i * 3 + 2] += (tz - curPos[i * 3 + 2]) * 0.12

      dummy.position.set(curPos[i * 3], curPos[i * 3 + 1], curPos[i * 3 + 2])
      dummy.scale.setScalar(blocks[i].scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, blocks.length]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={roughness} metalness={metalness} />
    </instancedMesh>
  )
}

/* ═══════════════════════════════════════════
   ボクセルの小鳥 — 樹の周りを飛行
   — 楕円軌道 + 上下の揺れ
   — 羽ばたきアニメーション
   ═══════════════════════════════════════════ */
function VoxelBird({
  orbitRadius,
  orbitSpeed,
  baseHeight,
  phase,
  color = '#3d2010',
}: {
  orbitRadius: number
  orbitSpeed: number
  baseHeight: number
  phase: number
  color?: string
}) {
  const ref = useRef<Group>(null)
  const lw = useRef<Group>(null)
  const rw = useRef<Group>(null)
  const s = 0.15 // 鳥のボクセルサイズ（視認性のため大きめ）

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * orbitSpeed + phase
    if (ref.current) {
      // 楕円軌道 + 上下の揺れで自然な飛行感
      ref.current.position.set(
        Math.cos(t) * orbitRadius,
        baseHeight + Math.sin(t * 1.7) * 0.35,
        Math.sin(t) * orbitRadius * 0.85,
      )
      // 進行方向を向く
      ref.current.rotation.y = -t + Math.PI / 2
    }
    // 羽ばたき
    const flap = Math.sin(clock.elapsedTime * 9 + phase) * 0.55
    if (lw.current) lw.current.rotation.z = flap
    if (rw.current) rw.current.rotation.z = -flap
  })

  return (
    <group ref={ref}>
      {/* 胴体 */}
      <mesh>
        <boxGeometry args={[s, s * 0.75, s * 1.6]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* 頭 */}
      <mesh position={[0, s * 0.1, s * 1]}>
        <boxGeometry args={[s * 0.65, s * 0.6, s * 0.6]} />
        <meshStandardMaterial color="#2a1508" roughness={0.85} />
      </mesh>
      {/* 左翼 */}
      <group ref={lw} position={[-s * 0.45, 0, 0]}>
        <mesh position={[-s * 0.55, 0, 0]}>
          <boxGeometry args={[s * 1.2, s * 0.18, s * 1.1]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.8} />
        </mesh>
      </group>
      {/* 右翼 */}
      <group ref={rw} position={[s * 0.45, 0, 0]}>
        <mesh position={[s * 0.55, 0, 0]}>
          <boxGeometry args={[s * 1.2, s * 0.18, s * 1.1]} />
          <meshStandardMaterial color="#4a2e18" roughness={0.8} />
        </mesh>
      </group>
      {/* 尾 */}
      <mesh position={[0, s * 0.15, -s * 0.95]}>
        <boxGeometry args={[s * 0.4, s * 0.12, s * 0.5]} />
        <meshStandardMaterial color="#352010" roughness={0.85} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   ボクセルのリス — 根元周辺をウロチョロする
   ═══════════════════════════════════════════ */
function VoxelSquirrel({
  orbitRadius,
  orbitSpeed,
  baseHeight,
  phase,
  minAngle,
  maxAngle,
}: {
  orbitRadius: number
  orbitSpeed: number
  baseHeight: number
  phase: number
  minAngle: number
  maxAngle: number
}) {
  const ref = useRef<Group>(null)
  const tail = useRef<Group>(null)
  const s = 0.20 // ボクセルサイズ

  const state = useRef({
    angle: phase,
    mode: 'stop' as 'run' | 'stop',
    timer: Math.random() * 2,
    runSpeed: orbitSpeed * 1.5,
    hopPhase: 0,
  })

  useFrame(({ clock }, delta) => {
    const st = state.current
    st.timer -= delta

    if (st.timer <= 0) {
      if (st.mode === 'stop') {
        st.mode = 'run'
        st.timer = 0.3 + Math.random() * 0.8 // 短い時間ダッシュ
        // 基本は順方向だがたまに逆走
        st.runSpeed = orbitSpeed * (Math.random() > 0.2 ? (1.5 + Math.random()) : -(0.8 + Math.random()))
      } else {
        st.mode = 'stop'
        st.timer = 0.5 + Math.random() * 2.0 // 長めに立ち止まる
        st.hopPhase = 0
      }
    }

    const isRunning = st.mode === 'run'
    if (isRunning) {
      st.angle += st.runSpeed * delta
      
      // 手前で見切れないように、指定された角度の範囲内に動きを制限する
      if (st.angle < minAngle) {
        st.angle = minAngle
        st.runSpeed = Math.abs(st.runSpeed)
      } else if (st.angle > maxAngle) {
        st.angle = maxAngle
        st.runSpeed = -Math.abs(st.runSpeed)
      }

      st.hopPhase += delta * 20
    }

    if (ref.current) {
      const hOffset = isRunning ? Math.abs(Math.sin(st.hopPhase)) * 0.15 : 0
      ref.current.position.set(
        Math.cos(st.angle) * orbitRadius,
        baseHeight + hOffset,
        Math.sin(st.angle) * orbitRadius,
      )

      // 進行方向に滑らかに向きを変える
      const targetY = st.runSpeed > 0 ? -st.angle + Math.PI / 2 : -st.angle - Math.PI / 2
      const curY = ref.current.rotation.y
      let diff = (targetY - curY) % (Math.PI * 2)
      if (diff > Math.PI) diff -= Math.PI * 2
      if (diff < -Math.PI) diff += Math.PI * 2
      ref.current.rotation.y += diff * 0.2
    }
    if (tail.current) {
      // しっぽの揺れ: 走るときは寝て大きく、止まるときは立って小さく
      tail.current.rotation.x = isRunning
        ? Math.sin(st.hopPhase) * 0.3 + 0.4
        : Math.sin(clock.elapsedTime * 3 + phase) * 0.05 + 0.1
    }
  })

  const colorBody = '#b55a2a'
  const colorDark = '#8b3d16'

  return (
    <group ref={ref}>
      {/* 胴体 */}
      <mesh position={[0, s * 0.6, 0]}>
        <boxGeometry args={[s * 0.8, s * 0.6, s * 1.2]} />
        <meshStandardMaterial color={colorBody} roughness={0.9} />
      </mesh>
      {/* 頭 */}
      <mesh position={[0, s * 1.0, s * 0.6]}>
        <boxGeometry args={[s * 0.7, s * 0.6, s * 0.6]} />
        <meshStandardMaterial color={colorBody} roughness={0.9} />
      </mesh>
      {/* 耳 */}
      <mesh position={[-s * 0.25, s * 1.4, s * 0.5]}>
        <boxGeometry args={[s * 0.2, s * 0.25, s * 0.2]} />
        <meshStandardMaterial color={colorDark} roughness={0.9} />
      </mesh>
      <mesh position={[s * 0.25, s * 1.4, s * 0.5]}>
        <boxGeometry args={[s * 0.2, s * 0.25, s * 0.2]} />
        <meshStandardMaterial color={colorDark} roughness={0.9} />
      </mesh>
      {/* しっぽ */}
      <group ref={tail} position={[0, s * 0.8, -s * 0.5]}>
        <mesh position={[0, s * 0.6, -s * 0.2]}>
          <boxGeometry args={[s * 0.6, s * 1.2, s * 0.6]} />
          <meshStandardMaterial color={colorBody} roughness={0.9} />
        </mesh>
        <mesh position={[0, s * 1.3, -s * 0.4]}>
          <boxGeometry args={[s * 0.5, s * 0.4, s * 0.5]} />
          <meshStandardMaterial color={colorDark} roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

/* ═══════════════════════════════════════════
   ボクセルクラウド (空の立体ブロック雲)
   ═══════════════════════════════════════════ */
function VoxelCloud({
  startPos,
  speed,
  scale = 1,
  mouseRef,
}: {
  startPos: [number, number, number]
  speed: number
  scale?: number
  mouseRef: React.MutableRefObject<Vector3 | null>
}) {
  const meshRef = useRef<InstancedMeshType>(null)
  const groupRef = useRef<Group>(null)
  const dummy = useMemo(() => new Object3D(), [])

  const blocks = useMemo(() => {
    const res = []
    const rng = makeRng(startPos[0] * 100 + Math.abs(startPos[1]))
    const numBlocks = 25 // 細かいブロックにする
    for (let i = 0; i < numBlocks; i++) {
      const x = (rng() - 0.5) * 4.0
      const y = (rng() - 0.5) * 1.5
      const z = (rng() - 0.5) * 2.0
      const s = 0.5 + rng() * 1.2
      res.push({
        ox: x, oy: y, oz: z,
        s: s,
        phase: rng() * Math.PI * 2,
      })
    }
    return res
  }, [startPos])

  const currentPos = useRef(new Vector3(...startPos))

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    let x = startPos[0] + t * speed
    if (speed > 0 && x > 40) x = -40 + (x - 40)
    if (speed < 0 && x < -40) x = 40 + (x + 40)

    currentPos.current.set(x, startPos[1], startPos[2])

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current)
    }

    if (!meshRef.current) return

    const pushR = 4.0
    let mx = 0, my = 0, hasMouse = false
    if (mouseRef.current) {
      mx = mouseRef.current.x
      my = mouseRef.current.y
      hasMouse = true
    }

    blocks.forEach((b, i) => {
      let bx = b.ox
      let by = b.oy
      let bz = b.oz

      if (hasMouse) {
        const wx = currentPos.current.x + bx * scale
        const wy = currentPos.current.y + by * scale
        const dx = wx - mx
        const dy = wy - my
        const dist2D = Math.sqrt(dx * dx + dy * dy)
        
        if (dist2D < pushR) {
          const force = Math.pow((pushR - dist2D) / pushR, 2.0)
          const angle = Math.atan2(dy, dx)
          bx += Math.cos(angle) * force * 1.5
          by += Math.sin(angle) * force * 1.5 + force * 0.5
          bz += force * 1.0
        }
      }

      by += Math.sin(t * 2 + b.phase) * 0.1

      dummy.position.set(bx, by, bz)
      dummy.scale.setScalar(b.s)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef} scale={scale}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ebdfcc" roughness={0.9} />
      </instancedMesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   ボクセルグラウンド (浮島風の地面)
   ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   ボクセルグラウンド (浮島風の地面・草剥がれギミック付き)
   ═══════════════════════════════════════════ */
function VoxelGround({ mouseRef }: { mouseRef: React.MutableRefObject<Vector3 | null> }) {
  const meshRefGrass = useRef<InstancedMeshType>(null)
  const meshRefSoil = useRef<InstancedMeshType>(null)
  const dummy = useMemo(() => new Object3D(), [])

  // GrassとSoilのブロック群を生成
  const { grass, soil } = useMemo(() => {
    const g = []
    const s = []
    const rng = makeRng(888)
    const R = 6.0
    const step = 0.5
    
    // 表面は茶色を用いず複数パターンの緑、中は茶色のパレット
    const paletteGrass = ['#384d1a', '#4a5d23', '#5c7028', '#6a822b']
    const paletteFlower = ['#e84a5f', '#ff847c', '#f8b195', '#f6e58d']
    const paletteSoil = ['#352010', '#2a1a0d', '#1f1309']
    
    const pushGrass = (pos: number[], size: number[], color: string, isF: boolean) => {
      g.push({ ox: pos[0], oy: pos[1], oz: pos[2], size, color, isFlower: isF })
    }
    const pushSoil = (pos: number[], size: number[], color: string) => {
      s.push({ ox: pos[0], oy: pos[1], oz: pos[2], size, color })
    }

    // 土台・下層の土 (表面からは見えにくい・または少し下)
    const rockR = 5.0
    for (let x = -rockR; x <= rockR; x += step * 1.5) {
      for (let z = -rockR; z <= rockR; z += step * 1.5) {
        if (x * x + z * z <= rockR * rockR) {
          const h = 1.0 + rng() * 2.0
          pushSoil([x, -3.4 - 0.5 - h / 2, z], [step * 1.5, h, step * 1.5], paletteSoil[Math.floor(rng() * paletteSoil.length)])
        }
      }
    }

    // メインの島（表面の草・花、その直下の下地としての土）
    for (let x = -R; x <= R; x += step) {
      for (let z = -R; z <= R; z += step) {
        if (x * x + z * z <= R * R) {
          const h = 0.5 + rng() * 0.8
          const topY = -3.4 - h / 2
          
          // 下層の土ブロック（同じ位置に配置）
          pushSoil([x, topY, z], [step * 0.95, h, step * 0.95], paletteSoil[Math.floor(rng() * paletteSoil.length)])
          
          // 上層の草ブロック（土の上に載るイメージ）
          // 草は土より少し高く配置して完全に覆う
          const isFlower = rng() > 0.92
          let color = paletteGrass[Math.floor(rng() * paletteGrass.length)]
          let isF = false
          if (isFlower) {
            color = paletteFlower[Math.floor(rng() * paletteFlower.length)]
            isF = true
          }
          // 草や花は動く
          pushGrass([x, topY + (isF ? 0.3 : 0.1), z], [step * 1.0, isF ? step * 0.8 : h * 1.1, step * 1.0], color, isF)
        }
      }
    }

    // 画面下部全体に広がる背景の地面（広域）
    const wideR = 20.0
    const wideStep = 1.0
    for (let x = -wideR; x <= wideR; x += wideStep) {
      for (let z = -wideR; z <= wideR; z += wideStep) {
        if (x * x + z * z > (R - 0.5) * (R - 0.5)) {
          if (rng() > 0.25) {
            const h = 1.0 + rng() * 2.0
            const drop = Math.max(0, (Math.sqrt(x*x + z*z) - R) * 0.15)
            const topY = -3.4 - rng() * 0.4 - drop
            
            // 下地の土
            pushSoil([x, topY, z], [wideStep * 0.95, h, wideStep * 0.95], paletteSoil[Math.floor(rng() * paletteSoil.length)])
            
            // 上層の草
            const isFlower = rng() > 0.95
            let color = isFlower ? paletteFlower[0] : '#3a4a1c'
            if (!isFlower && rng() > 0.5) color = '#2e3b15'

            pushGrass([x, topY + 0.1, z], [wideStep * 1.0, h * 1.05, wideStep * 1.0], color, isFlower)
          }
        }
      }
    }
    return { grass: g, soil: s }
  }, [])

  // Soil (土) は静的
  useEffect(() => {
    if (!meshRefSoil.current) return
    soil.forEach((b, i) => {
      dummy.position.set(b.ox, b.oy, b.oz)
      dummy.scale.set(b.size[0], b.size[1], b.size[2])
      dummy.updateMatrix()
      meshRefSoil.current!.setMatrixAt(i, dummy.matrix)
      meshRefSoil.current!.setColorAt(i, new Color(b.color))
    })
    meshRefSoil.current.instanceMatrix.needsUpdate = true
    if(meshRefSoil.current.instanceColor) meshRefSoil.current.instanceColor.needsUpdate = true
  }, [soil, dummy])

  // Grass (草・花) は色設定と毎フレームのインタラクション
  useEffect(() => {
    if (!meshRefGrass.current) return
    grass.forEach((b, i) => {
      meshRefGrass.current!.setColorAt(i, new Color(b.color))
    })
    if(meshRefGrass.current.instanceColor) meshRefGrass.current.instanceColor.needsUpdate = true
  }, [grass])

  useFrame(() => {
    if (!meshRefGrass.current) return
    
    const pushR = 3.5
    let mx = 0, my = 0, hasMouse = false
    if (mouseRef.current) {
      mx = mouseRef.current.x
      my = mouseRef.current.y
      hasMouse = true
    }

    grass.forEach((b, i) => {
      let bx = b.ox
      let by = b.oy
      let bz = b.oz

      if (hasMouse) {
        const dx = bx - mx
        const dy = by - my
        const dist2D = Math.sqrt(dx * dx + dy * dy)
        if (dist2D < pushR) {
          const force = Math.pow((pushR - dist2D) / pushR, 2.0)
          const angle = Math.atan2(dy, dx)
          // 草や花が外側に弾け、上に浮く（剥がれるギミックをかなり控えめに）
          bx += Math.cos(angle) * force * 0.8
          by += force * 1.2
          bz += Math.sin(angle) * force * 0.6
          
          if(b.isFlower) {
            by += force * 0.5 // 花は少し余分に高く飛ぶ
          }
        }
      }

      dummy.position.set(bx, by, bz)
      dummy.scale.set(b.size[0], b.size[1], b.size[2])
      
      // 飛んでいる時は少し回転させるとより立体的でボクセルっぽい
      if (hasMouse && (bx !== b.ox || by !== b.oy)) {
        const dx = bx - b.ox
        const dy = by - b.oy
        dummy.rotation.set(dy * 0.5, dx * 0.5, 0)
      } else {
        dummy.rotation.set(0, 0, 0)
      }

      dummy.updateMatrix()
      meshRefGrass.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRefGrass.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      {/* 土（動かない下層） */}
      <instancedMesh ref={meshRefSoil} args={[undefined, undefined, soil.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.95} />
      </instancedMesh>
      {/* 草と花（インタラクティブに動いて剥がれる上層） */}
      <instancedMesh ref={meshRefGrass} args={[undefined, undefined, grass.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   環境パーティクル (光の塵)
   ═══════════════════════════════════════════ */
function AtmosphereParticles() {
  const meshRef = useRef<InstancedMeshType>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const count = 45

  const particles = useMemo(() => {
    const rng = makeRng(888)
    return Array.from({ length: count }).map(() => ({
      pos: [(rng() - 0.5) * 40, (rng() - 0.5) * 20 + 4, (rng() - 0.5) * 15 - 5] as [number, number, number],
      speed: 0.15 + rng() * 0.2,
      phase: rng() * Math.PI * 2,
    }))
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime

    particles.forEach((p, i) => {
      const y = p.pos[1] + Math.sin(t * p.speed + p.phase) * 1.5
      const x = p.pos[0] + Math.cos(t * p.speed * 0.8 + p.phase) * 1.0
      dummy.position.set(x, y, p.pos[2])
      dummy.scale.setScalar(0.12)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#e8c07a" transparent opacity={0.65} />
    </instancedMesh>
  )
}

/* ═══ 木グループ — 回転 + 幹/葉を分離描画 ═══ */
function TreeGroup({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<Vector3 | null>
}) {
  const groupRef = useRef<Group>(null)

  // 幹と葉を分離（別々のマテリアル設定で描画）
  const { trunk, leaves } = useMemo(() => {
    const all = generateOakTree()
    return {
      trunk: all.filter((b) => b.type === 'trunk'),
      leaves: all.filter((b) => b.type === 'leaf'),
    }
  }, [])

  // ゆっくり回転
  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.22
  })

  return (
    <group ref={groupRef} position={[0, -1.0, 0]}>
      {/* 幹 — 粗くマットな質感 */}
      <TreeInstancedMesh
        blocks={trunk}
        mouseRef={mouseRef}
        groupRef={groupRef}
        roughness={0.88}
        metalness={0.02}
      />
      {/* 葉 — 少し光沢のある質感 */}
      <TreeInstancedMesh
        blocks={leaves}
        mouseRef={mouseRef}
        groupRef={groupRef}
        roughness={0.62}
        metalness={0.14}
      />
    </group>
  )
}

/* ═══ マウス位置追跡 ═══ */
function MouseTracker({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<Vector3 | null>
}) {
  const { viewport, gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1
      const wx = (ndcX * viewport.width) / 2
      const wy = (ndcY * viewport.height) / 2
      if (!mouseRef.current) mouseRef.current = new Vector3(wx, wy, 0)
      else mouseRef.current.set(wx, wy, 0)
    }
    const onLeave = () => {
      mouseRef.current = null
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [gl, viewport.width, viewport.height, mouseRef])

  return null
}

/* ═══ メインエクスポート ═══ */
export function VoxelTree() {
  const mouseRef = useRef<Vector3 | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (reduceMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="font-display text-[180px] font-light text-accent/15 leading-none select-none">
          木
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [-8, 0, 20], fov: 40, zoom: 1.1 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      {/* 暖かみのある環境光 */}
      <ambientLight intensity={0.35} color="#fdf4e3" />
      <directionalLight position={[6, 9, 5]} intensity={1.3} color="#fde8b8" />
      <directionalLight
        position={[-5, 4, -4]}
        intensity={0.45}
        color="#d4a853"
      />
      <pointLight
        position={[0, 0, 5]}
        intensity={0.6}
        color="#e8c07a"
        distance={14}
      />
      <pointLight
        position={[-3, -2, 3]}
        intensity={0.35}
        color="#b88c38"
        distance={10}
      />

      <MouseTracker mouseRef={mouseRef} />
      <TreeGroup mouseRef={mouseRef} />

      {/* 浮島風の地面（草が剥がれるインタラクション付き） */}
      <VoxelGround mouseRef={mouseRef} />

      {/* 背景のアニメーション */}
      <AtmosphereParticles />
      <VoxelCloud startPos={[-25, 10, -15]} speed={0.25} scale={1.2} mouseRef={mouseRef} />
      <VoxelCloud startPos={[-12, 14, -20]} speed={0.15} scale={1.0} mouseRef={mouseRef} />
      <VoxelCloud startPos={[8, 11, -12]} speed={0.20} scale={1.4} mouseRef={mouseRef} />
      <VoxelCloud startPos={[20, 15, -18]} speed={0.10} scale={1.1} mouseRef={mouseRef} />
      <VoxelCloud startPos={[0, 6, -22]} speed={-0.12} scale={0.9} mouseRef={mouseRef} />

      {/* 小鳥たち — 異なる軌道径・速度・高さで飛行 */}
      <VoxelBird
        orbitRadius={4.5}
        orbitSpeed={0.35}
        baseHeight={2.5}
        phase={0}
      />
      <VoxelBird
        orbitRadius={5.8}
        orbitSpeed={0.26}
        baseHeight={1.5}
        phase={2.2}
      />
      <VoxelBird
        orbitRadius={3.8}
        orbitSpeed={0.42}
        baseHeight={3.0}
        phase={4.5}
      />

      {/* リスたち */}
      <VoxelSquirrel orbitRadius={2.4} orbitSpeed={0.6} baseHeight={-3.4} phase={0.0} minAngle={-Math.PI * 0.3} maxAngle={Math.PI * 0.15} />
      <VoxelSquirrel orbitRadius={2.8} orbitSpeed={-0.45} baseHeight={-3.4} phase={Math.PI} minAngle={Math.PI * 0.85} maxAngle={Math.PI * 1.3} />
    </Canvas>
  )
}
