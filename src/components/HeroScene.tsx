import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { MathUtils } from 'three'
import type { Group, Mesh } from 'three'

function Scene() {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const shell = useRef<Mesh>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    // On wide screens the object sits to the right, so the text has room on the left.
    const baseX = state.viewport.width > 6 ? 2.2 : 0

    // The whole object drifts gently toward the mouse.
    g.position.x = MathUtils.damp(g.position.x, baseX + state.pointer.x * 0.6, 4, delta)
    g.position.y = MathUtils.damp(g.position.y, state.pointer.y * 0.4, 4, delta)

    if (core.current) {
      core.current.rotation.y += delta * 0.25
      core.current.rotation.x += delta * 0.1
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12
      shell.current.rotation.z += delta * 0.08
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
        {/* Solid, softly wobbling core */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.4, 8]} />
          <MeshDistortMaterial
            color="#b8a9ff"
            distort={0.35}
            speed={1.6}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>

        {/* Wireframe shell around it */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[2.1, 2]} />
          <meshBasicMaterial color="#8de3c9" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#8de3c9" />
      <Stars radius={60} depth={40} count={2500} factor={4} fade speed={0.6} />
      <Scene />
    </Canvas>
  )
}
