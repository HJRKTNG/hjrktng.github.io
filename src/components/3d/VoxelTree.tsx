import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Group, Mesh, Vector3, Quaternion } from 'three'

// ── Amber palette (matches site accent) ──
const COLORS = {
  trunkDark:  '#2b1c10',
  trunkMid:   '#3f2a1a',
  trunkLight: '#5a3d24',
  leafDeep:   '#8a6530',
  leafMain:   '#c89240',
  leafMed:    '#d4a853',
  leafLight:  '#e8c07a',
  leafHigh:   '#f0d495',
}

interface Block {
  pos: [number, number, number]
  color: string
  type: 'trunk' | 'leaf'
  scale: number
}

function generateTree(): Block[] {
  const blocks: Block[] = []
  let seed = 1337
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  // Trunk — 5 blocks tall, slight shading
  const trunkColors = [COLORS.trunkDark, COLORS.trunkMid, COLORS.trunkMid, COLORS.trunkLight, COLORS.trunkLight]
  for (let y = -2; y < 3; y++) {
    blocks.push({ pos: [0, y, 0], color: trunkColors[y + 2], type: 'trunk', scale: 0.92 })
  }

  // Canopy — layered leaves in rough sphere
  const layers = [
    { y: 1, radius: 2.2, density: 0.35 },
    { y: 2, radius: 2.6, density: 0.75 },
    { y: 3, radius: 2.4, density: 0.85 },
    { y: 4, radius: 1.8, density: 0.80 },
    { y: 5, radius: 1.2, density: 0.65 },
    { y: 6, radius: 0.8, density: 0.55 },
  ]

  const leafColors = [COLORS.leafDeep, COLORS.leafMain, COLORS.leafMed, COLORS.leafLight, COLORS.leafHigh]

  layers.forEach(layer => {
    const r = Math.ceil(layer.radius)
    for (let x = -r; x <= r; x++) {
      for (let z = -r; z <= r; z++) {
        const distSq = x * x + z * z
        if (distSq > layer.radius * layer.radius) continue
        if (distSq < 0.1 && layer.y <= 2) continue // avoid overlap with trunk
        if (rand() > layer.density) continue
        // Weighted color — more mid/light toward outside
        const distNorm = Math.sqrt(distSq) / layer.radius
        const colorIdx = Math.min(
          leafColors.length - 1,
          Math.floor(distNorm * 2 + rand() * 3)
        )
        blocks.push({
          pos: [x, layer.y, z],
          color: leafColors[colorIdx],
          type: 'leaf',
          scale: 0.88 + rand() * 0.08,
        })
      }
    }
  })

  return blocks
}

function VoxelBlock({ block, mouseRef }: {
  block: Block
  mouseRef: React.MutableRefObject<Vector3 | null>
}) {
  const meshRef = useRef<Mesh>(null)
  const basePos = useMemo(() => new Vector3(...block.pos), [block.pos])
  const tempVec = useMemo(() => new Vector3(), [])
  const tempQuat = useMemo(() => new Quaternion(), [])

  useFrame(() => {
    if (!meshRef.current) return
    const m = mouseRef.current
    const offset = tempVec.set(0, 0, 0)

    if (m) {
      const worldPos = new Vector3()
      meshRef.current.getWorldPosition(worldPos)
      const dx = worldPos.x - m.x
      const dy = worldPos.y - m.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const radius = 2.2

      if (dist < radius && dist > 0.001) {
        const strength = Math.pow((radius - dist) / radius, 1.8)
        const pushX = (dx / dist) * strength * 1.1
        const pushY = (dy / dist) * strength * 1.1
        offset.set(pushX, pushY, strength * 0.5)
        // Parent group rotates — convert world-space push to local
        const parent = meshRef.current.parent
        if (parent) {
          parent.getWorldQuaternion(tempQuat)
          tempQuat.invert()
          offset.applyQuaternion(tempQuat)
        }
      }
    }

    const targetX = basePos.x + offset.x
    const targetY = basePos.y + offset.y
    const targetZ = basePos.z + offset.z
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.12
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.12
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.12
  })

  return (
    <mesh ref={meshRef} position={block.pos}>
      <boxGeometry args={[block.scale, block.scale, block.scale]} />
      <meshStandardMaterial
        color={block.color}
        roughness={0.78}
        metalness={block.type === 'leaf' ? 0.12 : 0.04}
        flatShading
      />
    </mesh>
  )
}

function TreeGroup({ mouseRef }: { mouseRef: React.MutableRefObject<Vector3 | null> }) {
  const groupRef = useRef<Group>(null)
  const blocks = useMemo(() => generateTree(), [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.32
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {blocks.map((b, i) => (
        <VoxelBlock key={i} block={b} mouseRef={mouseRef} />
      ))}
    </group>
  )
}

function MouseTracker({ mouseRef }: { mouseRef: React.MutableRefObject<Vector3 | null> }) {
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
    const onLeave = () => { mouseRef.current = null }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [gl, viewport.width, viewport.height, mouseRef])

  return null
}

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
    // Static fallback for accessibility
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
      camera={{ position: [0, 1.5, 10], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      style={{ background: 'transparent' }}
    >
      {/* Warm atmospheric lighting */}
      <ambientLight intensity={0.35} color="#fdf4e3" />
      <directionalLight position={[6, 9, 5]} intensity={1.3} color="#fde8b8" />
      <directionalLight position={[-5, 4, -4]} intensity={0.45} color="#d4a853" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#e8c07a" distance={14} />
      <pointLight position={[-3, -2, 3]} intensity={0.35} color="#b88c38" distance={10} />

      <MouseTracker mouseRef={mouseRef} />
      <TreeGroup mouseRef={mouseRef} />
    </Canvas>
  )
}
