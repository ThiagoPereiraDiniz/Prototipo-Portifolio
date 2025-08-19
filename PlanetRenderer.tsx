"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import type { PlanetRendererProps, ThreeJSScene } from "@/types"

export function PlanetRenderer({ className = "", onLoad, onError }: PlanetRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<ThreeJSScene | null>(null)
  const animationIdRef = useRef<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const initThreeJS = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas || !window.THREE) {
      console.warn("[v0] WebGL or Three.js not available. Falling back to static version.")
      setHasError(true)
      onError?.(new Error("WebGL or Three.js not available"))
      return
    }

    try {
      console.log("[v0] Initializing Three.js planet renderer")

      // Initialize Three.js renderer
      const renderer = new window.THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

      // Camera setup - perspective for 3D effect
      const camera = new window.THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000)
      camera.position.set(0, 0, 15)

      // Scene setup with ambient light
      const scene = new window.THREE.Scene()

      // Ambient light for base illumination
      const ambientLight = new window.THREE.AmbientLight(0x404040, 0.7)
      scene.add(ambientLight)

      // Directional light for shadows and highlights
      const directionalLight = new window.THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 3, 5)
      scene.add(directionalLight)

      // Accent light with slight color
      const accentLight = new window.THREE.PointLight(0x64ffda, 1.5, 20)
      accentLight.position.set(-5, 1, 3)
      scene.add(accentLight)

      // Create the main planet
      const planetGeometry = new window.THREE.SphereGeometry(3, 64, 64)

      // Custom shader material for the planet
      const planetMaterial = new window.THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new window.THREE.Color("#0a192f") },
          uColor2: { value: new window.THREE.Color("#172a45") },
          uAccent: { value: new window.THREE.Color("#64ffda") },
          uGlow: { value: new window.THREE.Color("#ff8a00") },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vNormal = normal;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uAccent;
          uniform vec3 uGlow;
          
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          // Noise functions
          float hash(float n) {
            return fract(sin(n) * 43758.5453);
          }
          
          float noise(vec3 x) {
            vec3 p = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            
            float n = p.x + p.y * 57.0 + p.z * 113.0;
            return mix(
              mix(
                mix(hash(n), hash(n + 1.0), f.x),
                mix(hash(n + 57.0), hash(n + 58.0), f.x),
                f.y),
              mix(
                mix(hash(n + 113.0), hash(n + 114.0), f.x),
                mix(hash(n + 170.0), hash(n + 171.0), f.x),
                f.y),
              f.z);
          }
          
          float fbm(vec3 p) {
            float sum = 0.0;
            float amp = 1.0;
            float freq = 1.0;
            
            for(int i = 0; i < 6; i++) {
              sum += amp * noise(p * freq);
              amp *= 0.5;
              freq *= 2.0;
            }
            
            return sum;
          }
          
          void main() {
            // Base planet atmosphere gradient
            float atmosphereGradient = dot(vNormal, vec3(0, 0, 1)) * 0.5 + 0.5;
            vec3 baseColor = mix(uColor1, uColor2, atmosphereGradient);
            
            // Surface features with noise
            vec3 noisePos = vPosition * 2.0 + vec3(0.0, 0.0, uTime * 0.05);
            float noiseSample = fbm(noisePos);
            
            // Surface highlights
            float highlightIntensity = smoothstep(0.6, 0.8, noiseSample);
            vec3 surfaceHighlights = mix(baseColor, uAccent, highlightIntensity * 0.3);
            
            // Atmosphere glow on edges
            float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 3.0);
            vec3 atmosphereGlow = mix(surfaceHighlights, uGlow, fresnel * 0.6);
            
            // Final color
            gl_FragColor = vec4(atmosphereGlow, 1.0);
          }
        `,
      })

      const planet = new window.THREE.Mesh(planetGeometry, planetMaterial)
      scene.add(planet)

      // Create orbital paths
      const createOrbitalPath = (radius: number, color: number, segments = 128) => {
        const pathGeometry = new window.THREE.BufferGeometry()
        const positions = []

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2
          positions.push(radius * Math.cos(theta), 0, radius * Math.sin(theta))
        }

        pathGeometry.setAttribute("position", new window.THREE.Float32BufferAttribute(positions, 3))

        const pathMaterial = new window.THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.3,
        })

        return new window.THREE.Line(pathGeometry, pathMaterial)
      }

      // First moon orbital path
      const moonPath1 = createOrbitalPath(7, 0x64ffda)
      scene.add(moonPath1)

      // Second moon orbital path
      const moonPath2 = createOrbitalPath(9, 0xff8a00)
      scene.add(moonPath2)

      // Create the first moon
      const moon1Geometry = new window.THREE.SphereGeometry(0.5, 32, 32)
      const moon1Material = new window.THREE.MeshStandardMaterial({
        color: 0x64ffda,
        roughness: 0.7,
        metalness: 0.2,
        emissive: 0x64ffda,
        emissiveIntensity: 0.2,
      })

      const moon1 = new window.THREE.Mesh(moon1Geometry, moon1Material)
      scene.add(moon1)

      // Create the second moon
      const moon2Geometry = new window.THREE.SphereGeometry(0.7, 32, 32)
      const moon2Material = new window.THREE.MeshStandardMaterial({
        color: 0xff8a00,
        roughness: 0.6,
        metalness: 0.3,
        emissive: 0xff8a00,
        emissiveIntensity: 0.2,
      })

      const moon2 = new window.THREE.Mesh(moon2Geometry, moon2Material)
      scene.add(moon2)

      // Add stars to the background
      const starsGeometry = new window.THREE.BufferGeometry()
      const starsCount = 1000
      const starsPositions = []

      for (let i = 0; i < starsCount; i++) {
        const x = (Math.random() - 0.5) * 100
        const y = (Math.random() - 0.5) * 100
        const z = (Math.random() - 0.5) * 100

        if (Math.sqrt(x * x + y * y + z * z) > 20) {
          starsPositions.push(x, y, z)
        }
      }

      starsGeometry.setAttribute("position", new window.THREE.Float32BufferAttribute(starsPositions, 3))

      const starsMaterial = new window.THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
      })

      const stars = new window.THREE.Points(starsGeometry, starsMaterial)
      scene.add(stars)

      // Store scene reference
      sceneRef.current = {
        scene,
        camera,
        renderer,
        planet,
        moon1,
        moon2,
      }

      // Expose controller for external access
      window.planetController = sceneRef.current

      console.log("[v0] Planet renderer initialized successfully")
      setIsLoading(false)
      onLoad?.()
    } catch (error) {
      console.error("[v0] Planet renderer error:", error)
      setHasError(true)
      onError?.(error as Error)
    }
  }, [onLoad, onError])

  const animate = useCallback(() => {
    if (!sceneRef.current) return

    const { scene, camera, renderer, planet, moon1, moon2 } = sceneRef.current
    const time = performance.now() * 0.001

    // Rotate planet
    planet.rotation.y = time * 0.1

    // Update shader time uniform
    if (planet.material.uniforms) {
      planet.material.uniforms.uTime.value = time
    }

    // Update moon positions
    moon1.position.x = Math.cos(time * 0.3) * 7
    moon1.position.z = Math.sin(time * 0.3) * 7

    moon2.position.x = Math.cos(time * 0.2 + Math.PI) * 9
    moon2.position.z = Math.sin(time * 0.2 + Math.PI) * 9

    // Render scene
    renderer.render(scene, camera)

    animationIdRef.current = requestAnimationFrame(animate)
  }, [])

  const handleResize = useCallback(() => {
    if (!sceneRef.current || !canvasRef.current) return

    const { camera, renderer } = sceneRef.current
    const canvas = canvasRef.current
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)

    console.log("[v0] Planet renderer resized:", { width, height })
  }, [])

  // Initialize Three.js on mount
  useEffect(() => {
    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
      console.warn("[v0] WebGL not supported. Falling back to static version.")
      setHasError(true)
      return
    }

    const handleThreeJSReady = () => {
      if (window.THREE) {
        console.log("[v0] Three.js loaded and ready")
        initThreeJS()
      }
    }

    // Check if Three.js is already loaded
    if (window.THREE) {
      handleThreeJSReady()
    } else {
      // Listen for the custom event
      window.addEventListener("threeJSReady", handleThreeJSReady)

      // Fallback polling in case event doesn't fire
      let retryCount = 0
      const maxRetries = 50

      const checkThreeJS = () => {
        if (window.THREE) {
          handleThreeJSReady()
        } else if (retryCount < maxRetries) {
          retryCount++
          setTimeout(checkThreeJS, 100)
        } else {
          console.error("[v0] Three.js failed to load after 5 seconds")
          setHasError(true)
          onError?.(new Error("Three.js failed to load"))
        }
      }

      setTimeout(checkThreeJS, 100)
    }

    return () => {
      window.removeEventListener("threeJSReady", handleThreeJSReady)
    }
  }, [initThreeJS, onError])

  // Start animation loop
  useEffect(() => {
    if (!isLoading && !hasError && sceneRef.current) {
      animate()
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isLoading, hasError, animate])

  // Handle window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (sceneRef.current) {
        const { renderer } = sceneRef.current
        renderer.dispose()
        sceneRef.current = null
      }
    }
  }, [])

  if (hasError) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-[#172a45] to-[#0a192f] ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-[#64ffda]">
            <div className="text-6xl mb-4">🪐</div>
            <p className="font-mono text-sm">3D Planet Loading...</p>
            <p className="font-mono text-xs opacity-70">Initializing WebGL renderer</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="loading-spinner w-16 h-16 border-4 border-transparent border-t-[#64ffda] border-b-[#ff8a00] rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label="Interactive 3D planet with two moons in orbit"
      />
    </div>
  )
}
