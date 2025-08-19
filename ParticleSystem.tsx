"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import type { ParticleSystemProps, ParticleConfig, MousePosition } from "@/types"

// Default particle configuration
const defaultConfig: ParticleConfig = {
  particleCount: 30,
  minSize: 5,
  maxSize: 20,
  minSpeed: 0.5,
  maxSpeed: 2,
  colors: [
    "rgba(255, 138, 0, 0.7)", // Spice orange
    "rgba(179, 135, 40, 0.6)", // Ancient gold
    "rgba(100, 255, 218, 0.5)", // Accent blue
  ],
  containerWidth: 0,
  containerHeight: 0,
  glowIntensity: 0.7,
  collisionRadius: 20,
  particleLifetime: 8000,
  emissionRate: 500,
  boundaryElasticity: 0.8,
}

class Particle {
  x: number
  y: number
  z: number
  baseSize: number
  size: number
  velocityX: number
  velocityY: number
  velocityZ: number
  color: string
  element: HTMLDivElement
  creationTime: number
  lifetime: number
  config: ParticleConfig

  constructor(config: ParticleConfig, container: HTMLElement) {
    this.config = config
    this.init(container)
  }

  init(container: HTMLElement) {
    // Random position within container
    this.x = Math.random() * this.config.containerWidth
    this.y = Math.random() * this.config.containerHeight
    this.z = Math.random() * 100 // For 3D effect

    // Random size
    this.baseSize = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize
    this.size = this.baseSize * (this.z / 100 + 0.5) // Size based on z-depth

    // Random direction and speed
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * (this.config.maxSpeed - this.config.minSpeed) + this.config.minSpeed
    this.velocityX = Math.cos(angle) * speed
    this.velocityY = Math.sin(angle) * speed
    this.velocityZ = (Math.random() - 0.5) * speed

    // Random color from config
    this.color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)]

    // Create DOM element
    this.element = document.createElement("div")
    this.element.className = "particle absolute rounded-full pointer-events-none"
    this.element.style.backgroundColor = this.color
    this.element.style.boxShadow = `0 0 ${this.config.glowIntensity * 10}px ${this.color}`
    this.element.style.width = `${this.size}px`
    this.element.style.height = `${this.size}px`
    this.element.style.transform = "translate(-50%, -50%)"
    this.element.style.willChange = "transform, opacity"

    // Add to container
    container.appendChild(this.element)

    // Set lifetime
    this.creationTime = performance.now()
    this.lifetime = this.config.particleLifetime + Math.random() * 2000 // Add some randomness
  }

  update(particles: Particle[], mouse: MousePosition, mouseOverContainer: boolean): boolean {
    // Calculate age
    const age = performance.now() - this.creationTime
    const lifePercent = age / this.lifetime

    // Remove if too old
    if (lifePercent >= 1) {
      this.remove()
      return false
    }

    // Opacity based on lifetime (fade in and out)
    const opacity = lifePercent < 0.1 ? lifePercent * 10 : lifePercent > 0.9 ? (1 - lifePercent) * 10 : 1

    // Move particle
    this.x += this.velocityX
    this.y += this.velocityY
    this.z += this.velocityZ

    // Keep z in bounds
    if (this.z < 0) {
      this.z = 0
      this.velocityZ *= -this.config.boundaryElasticity
    } else if (this.z > 100) {
      this.z = 100
      this.velocityZ *= -this.config.boundaryElasticity
    }

    // Update size based on z
    this.size = this.baseSize * (this.z / 100 + 0.5)

    // Boundary collision detection
    if (this.x < 0) {
      this.x = 0
      this.velocityX *= -this.config.boundaryElasticity
    } else if (this.x > this.config.containerWidth) {
      this.x = this.config.containerWidth
      this.velocityX *= -this.config.boundaryElasticity
    }

    if (this.y < 0) {
      this.y = 0
      this.velocityY *= -this.config.boundaryElasticity
    } else if (this.y > this.config.containerHeight) {
      this.y = this.config.containerHeight
      this.velocityY *= -this.config.boundaryElasticity
    }

    // Mouse interaction - repel particles
    if (mouseOverContainer && mouse.x !== undefined && mouse.y !== undefined) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius + this.size / 2) {
        // Calculate repulsion direction
        const angle = Math.atan2(dy, dx)
        const force = (mouse.radius - distance) / mouse.radius

        // Apply force
        this.velocityX += Math.cos(angle) * force
        this.velocityY += Math.sin(angle) * force
      }
    }

    // Particle-to-particle collision
    particles.forEach((otherParticle) => {
      if (otherParticle === this) return

      const dx = this.x - otherParticle.x
      const dy = this.y - otherParticle.y
      const dz = this.z - otherParticle.z
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
      const minDistance = (this.size + otherParticle.size) / 2

      if (distance < minDistance) {
        // Calculate repulsion direction
        const angle = Math.atan2(dy, dx)
        const force = ((minDistance - distance) / minDistance) * 0.05

        // Apply force
        this.velocityX += Math.cos(angle) * force
        this.velocityY += Math.sin(angle) * force
        this.velocityZ += dz > 0 ? force : -force

        // Slight color blend on collision
        if (Math.random() > 0.8) {
          this.color = otherParticle.color
          this.element.style.backgroundColor = this.color
          this.element.style.boxShadow = `0 0 ${this.config.glowIntensity * 10}px ${this.color}`
        }
      }
    })

    // Update DOM element
    this.element.style.width = `${this.size}px`
    this.element.style.height = `${this.size}px`
    this.element.style.opacity = opacity.toString()
    this.element.style.transform = `translate(calc(${this.x}px - 50%), calc(${this.y}px - 50%)) translateZ(${this.z / 10}px)`

    return true // Particle is still active
  }

  remove() {
    // Remove from DOM
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }
}

export function ParticleSystem({ className = "", config: userConfig, mouseInteraction = true }: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number>()
  const lastEmissionTimeRef = useRef(0)
  const mouseRef = useRef<MousePosition>({
    x: undefined,
    y: undefined,
    radius: defaultConfig.collisionRadius,
  })
  const [mouseOverContainer, setMouseOverContainer] = useState(false)
  const [config, setConfig] = useState<ParticleConfig>(defaultConfig)

  // Update config when container size changes or user config changes
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const newConfig: ParticleConfig = {
      ...defaultConfig,
      ...userConfig,
      containerWidth: container.offsetWidth,
      containerHeight: container.offsetHeight,
    }

    setConfig(newConfig)
    mouseRef.current.radius = newConfig.collisionRadius
  }, [userConfig])

  // Initialize particles
  const initParticles = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    console.log("[v0] Initializing particle system with", config.particleCount, "particles")

    // Clear existing particles
    particlesRef.current.forEach((particle) => particle.remove())
    particlesRef.current = []

    // Create new particles
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push(new Particle(config, container))
    }
  }, [config])

  // Emit new particles periodically
  const emitParticles = useCallback(
    (timestamp: number) => {
      if (timestamp - lastEmissionTimeRef.current > config.emissionRate) {
        const container = containerRef.current
        if (container && particlesRef.current.length < config.particleCount) {
          particlesRef.current.push(new Particle(config, container))
        }
        lastEmissionTimeRef.current = timestamp
      }
    },
    [config],
  )

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      // Update and filter out dead particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (!particlesRef.current[i].update(particlesRef.current, mouseRef.current, mouseOverContainer)) {
          particlesRef.current.splice(i, 1)
        }
      }

      // Emit new particles
      emitParticles(timestamp)

      // Continue animation loop
      animationIdRef.current = requestAnimationFrame(animate)
    },
    [mouseOverContainer, emitParticles],
  )

  // Mouse move handler
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!mouseInteraction || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = event.clientX - rect.left
      mouseRef.current.y = event.clientY - rect.top
    },
    [mouseInteraction],
  )

  // Mouse enter handler
  const handleMouseEnter = useCallback(() => {
    if (mouseInteraction) {
      setMouseOverContainer(true)
    }
  }, [mouseInteraction])

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setMouseOverContainer(false)
    mouseRef.current.x = undefined
    mouseRef.current.y = undefined
  }, [])

  // Resize handler
  const handleResize = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const newConfig = {
      ...config,
      containerWidth: container.offsetWidth,
      containerHeight: container.offsetHeight,
    }

    setConfig(newConfig)
    console.log("[v0] Particle system resized:", { width: newConfig.containerWidth, height: newConfig.containerHeight })
  }, [config])

  // Initialize particles when config changes
  useEffect(() => {
    if (config.containerWidth > 0 && config.containerHeight > 0) {
      initParticles()
    }
  }, [config, initParticles])

  // Start animation loop
  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [animate])

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
      particlesRef.current.forEach((particle) => particle.remove())
      particlesRef.current = []
    }
  }, [])

  // Expose API for external control
  useEffect(() => {
    window.spiceParticles = {
      config,
      addParticle: () => {
        const container = containerRef.current
        if (container) {
          particlesRef.current.push(new Particle(config, container))
        }
      },
      removeParticle: () => {
        if (particlesRef.current.length > 0) {
          const particle = particlesRef.current.pop()
          particle?.remove()
        }
      },
      setCollisionRadius: (radius: number) => {
        mouseRef.current.radius = radius
      },
    }

    return () => {
      delete window.spiceParticles
    }
  }, [config])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#ff8a00]/5 rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive particle system"
    />
  )
}
