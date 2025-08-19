"use client"

import { lazy, Suspense, memo } from "react"
import type { ParticleSystemProps } from "@/types"

const ParticleSystem = lazy(() =>
  import("./ParticleSystem").then((module) => ({
    default: module.ParticleSystem,
  })),
)

export const LazyParticleSystem = memo(function LazyParticleSystem(props: ParticleSystemProps) {
  return (
    <Suspense fallback={<div className="w-full h-full bg-[#ff8a00]/5 rounded-lg animate-pulse" />}>
      <ParticleSystem {...props} />
    </Suspense>
  )
})
