"use client"

import { useRef, useEffect, useState } from "react"

interface PlanetRendererProps {
  className?: string
}

export default function NativePlanetRenderer({ className = "" }: PlanetRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    console.log("[v0] Initializing native planet renderer with full animation support")

    try {
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("Canvas 2D context not available")
      }

      // Set canvas size
      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        canvas.style.width = rect.width + "px"
        canvas.style.height = rect.height + "px"
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Animation variables
      let time = 0
      const centerX = canvas.width / (2 * window.devicePixelRatio)
      const centerY = canvas.height / (2 * window.devicePixelRatio)
      const planetRadius = Math.min(centerX, centerY) * 0.3

      // Create gradient for planet
      const createPlanetGradient = (x: number, y: number, radius: number) => {
        const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius)
        gradient.addColorStop(0, "#64ffda")
        gradient.addColorStop(0.3, "#172a45")
        gradient.addColorStop(0.7, "#0a192f")
        gradient.addColorStop(1, "#000814")
        return gradient
      }

      // Draw stars
      const drawStars = () => {
        ctx.fillStyle = "#ffffff"
        for (let i = 0; i < 100; i++) {
          const x = (Math.random() * canvas.width) / window.devicePixelRatio
          const y = (Math.random() * canvas.height) / window.devicePixelRatio
          const size = Math.random() * 2
          ctx.globalAlpha = Math.random() * 0.8 + 0.2
          ctx.fillRect(x, y, size, size)
        }
        ctx.globalAlpha = 1
      }

      // Draw planet with animated surface
      const drawPlanet = (x: number, y: number, radius: number, rotation: number) => {
        // Planet base
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = createPlanetGradient(x, y, radius)
        ctx.fill()

        // Surface features (animated)
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const featureX = Math.cos(angle) * radius * 0.6
          const featureY = Math.sin(angle) * radius * 0.6

          ctx.beginPath()
          ctx.arc(featureX, featureY, radius * 0.1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(100, 255, 218, ${0.3 + Math.sin(time + i) * 0.2})`
          ctx.fill()
        }

        ctx.restore()

        // Atmosphere glow
        const glowGradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 1.3)
        glowGradient.addColorStop(0, "rgba(100, 255, 218, 0)")
        glowGradient.addColorStop(1, "rgba(100, 255, 218, 0.3)")

        ctx.beginPath()
        ctx.arc(x, y, radius * 1.3, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
      }

      // Draw moon
      const drawMoon = (x: number, y: number, radius: number, color: string) => {
        const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius)
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, "#000814")

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Moon glow
        const glowGradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 1.5)
        glowGradient.addColorStop(0, `${color}00`)
        glowGradient.addColorStop(1, `${color}80`)

        ctx.beginPath()
        ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
      }

      // Draw orbital path
      const drawOrbitalPath = (centerX: number, centerY: number, radius: number, color: string) => {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.3
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Animation loop
      const animate = () => {
        time += 0.016 // ~60fps

        // Clear canvas with space background
        ctx.fillStyle = "#000814"
        ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

        // Draw animated stars
        drawStars()

        // Draw orbital paths with subtle glow
        drawOrbitalPath(centerX, centerY, planetRadius * 2.3, "#64ffda")
        drawOrbitalPath(centerX, centerY, planetRadius * 3, "#ff8a00")

        // Draw main planet with rotation
        drawPlanet(centerX, centerY, planetRadius, time * 0.1)

        // Calculate moon positions with smooth orbital motion
        const moon1X = centerX + Math.cos(time * 0.3) * planetRadius * 2.3
        const moon1Y = centerY + Math.sin(time * 0.3) * planetRadius * 2.3
        const moon2X = centerX + Math.cos(time * 0.2 + Math.PI) * planetRadius * 3
        const moon2Y = centerY + Math.sin(time * 0.2 + Math.PI) * planetRadius * 3

        // Draw moons with enhanced glow effects
        drawMoon(moon1X, moon1Y, planetRadius * 0.15, "#64ffda")
        drawMoon(moon2X, moon2Y, planetRadius * 0.2, "#ff8a00")

        animationRef.current = requestAnimationFrame(animate)
      }

      // Start animation immediately
      animate()
      setIsLoading(false)
      console.log("[v0] Native planet renderer initialized and animating successfully")

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    } catch (err) {
      console.error("[v0] Planet renderer error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
      setIsLoading(false)
    }
  }, [])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-slate-900 text-red-400 ${className}`}>
        <div className="text-center">
          <div className="text-sm">Planet renderer error</div>
          <div className="text-xs opacity-70">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-cyan-400">
          <div className="text-sm animate-pulse">Initializing planet renderer...</div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />
    </div>
  )
}
