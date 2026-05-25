import { Preload } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 76
const NEIGHBORS_PER_NODE = 3
const MUTED = '#CDCDE0'
const ACCENT = '#FF9C01'

function createRandom(seed) {
  let value = seed

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

function createNodes() {
  const random = createRandom(724)

  return Array.from({ length: NODE_COUNT }, (_, index) => {
    const angle = random() * Math.PI * 2
    const radius = 1.6 + random() * 4.8

    return {
      x: Math.cos(angle) * radius + (random() - 0.5) * 1.4,
      y: (random() - 0.5) * 5.8,
      z: Math.sin(angle) * 1.8 + (random() - 0.5) * 2.8,
      phase: random() * Math.PI * 2 + index * 0.13,
      speed: 0.16 + random() * 0.32,
      drift: 0.05 + random() * 0.12,
    }
  })
}

function createConnections(nodes) {
  const connections = []
  const used = new Set()

  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((candidate, candidateIndex) => ({
        index: candidateIndex,
        distance:
          (node.x - candidate.x) ** 2 +
          (node.y - candidate.y) ** 2 +
          (node.z - candidate.z) ** 2,
      }))
      .filter((candidate) => candidate.index !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, NEIGHBORS_PER_NODE)

    nearest.forEach((candidate) => {
      const from = Math.min(index, candidate.index)
      const to = Math.max(index, candidate.index)
      const key = `${from}-${to}`

      if (!used.has(key)) {
        used.add(key)
        connections.push([from, to])
      }
    })
  })

  return connections
}

function writeNodePosition(node, time, index, target, offset) {
  const localTime = time * node.speed + node.phase

  target[offset] =
    node.x +
    Math.sin(localTime * 1.7) * node.drift +
    Math.sin(time * 0.11 + index * 0.37) * 0.08
  target[offset + 1] =
    node.y +
    Math.cos(localTime * 1.35) * node.drift * 1.4 +
    Math.sin(time * 0.09 + index) * 0.05
  target[offset + 2] =
    node.z +
    Math.sin(localTime * 1.1 + index * 0.27) * node.drift * 1.8
}

function AccentNode({ node, index }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const position = useMemo(() => new Float32Array(3), [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const pulse = Math.max(0, Math.sin(time * 1.1 + node.phase * 1.8)) ** 3

    writeNodePosition(node, time, index, position, 0)

    if (meshRef.current) {
      meshRef.current.position.set(position[0], position[1], position[2])
      meshRef.current.scale.setScalar(0.045 + pulse * 0.08)
    }

    if (materialRef.current) {
      materialRef.current.opacity = 0.22 + pulse * 0.68
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 14, 14]} />
      <meshBasicMaterial
        ref={materialRef}
        color={ACCENT}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function NetworkScene() {
  const groupRef = useRef(null)
  const pointsRef = useRef(null)
  const linesRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const nodes = useMemo(createNodes, [])
  const connections = useMemo(() => createConnections(nodes), [nodes])
  const accentNodes = useMemo(
    () => nodes.filter((_, index) => index % 11 === 0 || index % 17 === 0),
    [nodes],
  )

  const pointPositions = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3)
    nodes.forEach((node, index) => writeNodePosition(node, 0, index, positions, index * 3))
    return positions
  }, [nodes])

  const linePositions = useMemo(
    () => new Float32Array(connections.length * 2 * 3),
    [connections],
  )

  useEffect(() => {
    function handlePointerMove(event) {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime()

    nodes.forEach((node, index) => {
      writeNodePosition(node, time, index, pointPositions, index * 3)
    })

    connections.forEach(([from, to], index) => {
      const lineOffset = index * 6
      const fromOffset = from * 3
      const toOffset = to * 3

      linePositions[lineOffset] = pointPositions[fromOffset]
      linePositions[lineOffset + 1] = pointPositions[fromOffset + 1]
      linePositions[lineOffset + 2] = pointPositions[fromOffset + 2]
      linePositions[lineOffset + 3] = pointPositions[toOffset]
      linePositions[lineOffset + 4] = pointPositions[toOffset + 1]
      linePositions[lineOffset + 5] = pointPositions[toOffset + 2]
    })

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointerRef.current.y * 0.08,
        delta * 1.7,
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerRef.current.x * 0.1,
        delta * 1.7,
      )
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointerRef.current.x * 0.16,
        delta * 1.4,
      )
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        -pointerRef.current.y * 0.12,
        delta * 1.4,
      )
    }
  })

  return (
    <group ref={groupRef} scale={viewport.width < 6 ? 0.78 : 1}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={MUTED} transparent opacity={0.12} depthWrite={false} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={MUTED}
          size={0.038}
          sizeAttenuation
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </points>

      {accentNodes.map((node) => (
        <AccentNode key={node.phase} node={node} index={nodes.indexOf(node)} />
      ))}
    </group>
  )
}

export default function NetworkBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-bg-primary">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 54 }}
        className="h-full w-full"
        dpr={[1, 1.6]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <NetworkScene />
        <Preload all />
      </Canvas>
    </div>
  )
}
