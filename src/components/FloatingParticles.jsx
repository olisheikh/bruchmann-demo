import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Stars({ count = 350 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [count])

  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.016
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.008) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#13A538" sizeAttenuation transparent opacity={0.55} />
    </points>
  )
}

export default function FloatingParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1]}
    >
      <ambientLight intensity={1} />
      <Stars />
    </Canvas>
  )
}
