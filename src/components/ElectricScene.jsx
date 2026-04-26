import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Particles({ count = 600 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.8 + Math.random() * 5
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.05
    ref.current.rotation.x = s.clock.elapsedTime * 0.018
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#13A538" sizeAttenuation transparent opacity={0.75} />
    </points>
  )
}

function CoreKnot({ scrollY }) {
  const ref = useRef()
  useFrame((s) => {
    ref.current.rotation.x = s.clock.elapsedTime * 0.13
    ref.current.rotation.y = s.clock.elapsedTime * 0.09 + scrollY * 0.0014
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.1, 0.32, 128, 16, 2, 3]} />
      <meshStandardMaterial
        color="#13A538"
        emissive="#0d7a29"
        emissiveIntensity={0.5}
        metalness={0.85}
        roughness={0.1}
      />
    </mesh>
  )
}

function Ring({ r, speed, color, rx = 0 }) {
  const ref = useRef()
  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * speed
    ref.current.rotation.x = rx + s.clock.elapsedTime * speed * 0.25
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[r, 0.018, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  )
}

function Scene({ scrollY }) {
  return (
    <group position={[1.6, 0, 0]}>
      <ambientLight intensity={0.1} />
      <pointLight position={[7, 7, 7]}   color="#13A538" intensity={5} />
      <pointLight position={[-6, -5, -4]} color="#00274E" intensity={3} />
      <pointLight position={[0, 0, 10]}   color="#ffffff" intensity={0.7} />
      <CoreKnot scrollY={scrollY} />
      <Ring r={2.2} speed={0.28}  color="#13A538" rx={0.5} />
      <Ring r={2.9} speed={-0.18} color="#003d75" rx={1.2} />
      <Ring r={3.6} speed={0.13}  color="#13A538" rx={0.8} />
      <Particles />
    </group>
  )
}

export default function ElectricScene({ scrollY = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 48 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <Scene scrollY={scrollY} />
    </Canvas>
  )
}
