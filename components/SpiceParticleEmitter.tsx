"use client"

import { useEffect, useRef } from "react"

interface SpiceParticleEmitterProps {
  className?: string
  particleCount?: number
  intensity?: "low" | "medium" | "high"
  interactive?: boolean
}

export function SpiceParticleEmitter({
  className = "",
  particleCount = 20,
  intensity = "medium",
  interactive = false,
}: SpiceParticleEmitterProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Simple particle effect using CSS animations
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = `
        absolute w-1 h-1 bg-[#64ffda] rounded-full opacity-50
        animate-pulse pointer-events-none
      `
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 2}s`
      particle.style.animationDuration = `${2 + Math.random() * 3}s`

      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [particleCount])

  return <div ref={containerRef} className={`relative ${className}`} />
}
