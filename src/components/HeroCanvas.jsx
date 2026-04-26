import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './HeroCanvas.css'

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const greenLight = new THREE.PointLight(0x13A538, 3, 10)
    greenLight.position.set(2, 2, 3)
    scene.add(greenLight)

    const blueLight = new THREE.PointLight(0x00274E, 2, 10)
    blueLight.position.set(-2, -1, 2)
    scene.add(blueLight)

    const goldLight = new THREE.PointLight(0xFFC704, 1.5, 8)
    goldLight.position.set(0, 3, 1)
    scene.add(goldLight)

    // Create main fuse-switch housing
    const housingGeo = new THREE.BoxGeometry(1.2, 1.8, 0.6, 2, 2, 2)
    const housingMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a2e,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 0.5,
    })
    const housing = new THREE.Mesh(housingGeo, housingMat)
    scene.add(housing)

    // Green front panel
    const panelGeo = new THREE.BoxGeometry(0.9, 1.4, 0.05)
    const panelMat = new THREE.MeshPhysicalMaterial({
      color: 0x13A538,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x13A538,
      emissiveIntensity: 0.15,
    })
    const panel = new THREE.Mesh(panelGeo, panelMat)
    panel.position.z = 0.32
    scene.add(panel)

    // Fuse element (cylindrical)
    const fuseGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16)
    const fuseMat = new THREE.MeshPhysicalMaterial({
      color: 0xdddddd,
      metalness: 0.9,
      roughness: 0.1,
    })
    const fuse = new THREE.Mesh(fuseGeo, fuseMat)
    fuse.rotation.z = Math.PI / 2
    fuse.position.set(0, 0.1, 0.4)
    scene.add(fuse)

    // Fuse glass body
    const fuseBodyGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.55, 16)
    const fuseBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffee,
      transparent: true,
      opacity: 0.45,
      transmission: 0.6,
      roughness: 0.0,
    })
    const fuseBody = new THREE.Mesh(fuseBodyGeo, fuseBodyMat)
    fuseBody.rotation.z = Math.PI / 2
    fuseBody.position.set(0, 0.1, 0.4)
    scene.add(fuseBody)

    // Connection rails (busbars)
    const railMat = new THREE.MeshStandardMaterial({ color: 0xc0a020, metalness: 0.95, roughness: 0.05 })
    
    for (let i = -1; i <= 1; i += 2) {
      const railGeo = new THREE.BoxGeometry(0.06, 0.06, 2.5)
      const rail = new THREE.Mesh(railGeo, railMat)
      rail.position.set(i * 0.5, 0.1, -0.8)
      scene.add(rail)

      // Terminal blocks
      const termGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18)
      const termMat = new THREE.MeshStandardMaterial({ color: 0x334455, metalness: 0.5, roughness: 0.5 })
      const term = new THREE.Mesh(termGeo, termMat)
      term.position.set(i * 0.5, 0.1, -1.8)
      scene.add(term)
    }

    // LED indicator
    const ledGeo = new THREE.SphereGeometry(0.065, 16, 16)
    const ledMat = new THREE.MeshPhysicalMaterial({
      color: 0x13A538,
      emissive: 0x13A538,
      emissiveIntensity: 2.0,
      transparent: true,
      opacity: 0.95,
    })
    const led = new THREE.Mesh(ledGeo, ledMat)
    led.position.set(0, 0.5, 0.35)
    scene.add(led)

    // Small mounting screws
    const screwGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 8)
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 })
    const screwPositions = [[-0.35, 0.6], [0.35, 0.6], [-0.35, -0.6], [0.35, -0.6]]
    screwPositions.forEach(([x, y]) => {
      const screw = new THREE.Mesh(screwGeo, screwMat)
      screw.rotation.x = Math.PI / 2
      screw.position.set(x, y, 0.34)
      scene.add(screw)
    })

    // Floating particle system (electricity sparks)
    const particleCount = 80
    const positions = new Float32Array(particleCount * 3)
    const particleSpeeds = []
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.006,
        z: 0
      })
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x13A538,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Orbit group for the main device
    const deviceGroup = new THREE.Group()
    deviceGroup.add(housing)
    deviceGroup.add(panel)
    deviceGroup.add(fuse)
    deviceGroup.add(fuseBody)
    deviceGroup.add(led)
    screwPositions.forEach((_, idx) => {
      // Already added to scene but let's just track the group
    })
    scene.add(deviceGroup)

    // Mouse interaction
    let mouseX = 0, mouseY = 0
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Resize
    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation
    let frame = 0
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame++

      const t = frame * 0.008

      // Device gentle rotation based on mouse
      deviceGroup.rotation.y = Math.sin(t * 0.3) * 0.4 + mouseX * 0.2
      deviceGroup.rotation.x = Math.sin(t * 0.2) * 0.15 + mouseY * 0.1

      // LED pulsing
      ledMat.emissiveIntensity = 1.5 + Math.sin(t * 4) * 0.8
      greenLight.intensity = 2.5 + Math.sin(t * 4) * 0.8

      // Particles drift
      const pos = particleGeo.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += particleSpeeds[i].x
        pos[i * 3 + 1] += particleSpeeds[i].y
        if (Math.abs(pos[i * 3]) > 4) particleSpeeds[i].x *= -1
        if (Math.abs(pos[i * 3 + 1]) > 4) particleSpeeds[i].y *= -1
      }
      particleGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="hero-canvas" />
}
