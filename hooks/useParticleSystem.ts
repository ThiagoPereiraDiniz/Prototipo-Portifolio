"use client"

import { useCallback } from "react"

export function useParticleSystem() {
  const burstParticles = useCallback((count: number, delay = 0) => {
    console.log(`[v0] Particle burst: ${count} particles with ${delay}ms delay`)
    // Particle burst implementation would go here
  }, [])

  return {
    burstParticles,
  }
}
