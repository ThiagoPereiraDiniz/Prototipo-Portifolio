"use client"

import { lazy, Suspense } from "react"
import { LoadingIndicator } from "./LoadingIndicator"
import { ErrorBoundary } from "./ErrorBoundary"
import type { PlanetRendererProps } from "@/types"

const PlanetRenderer = lazy(() =>
  import("./PlanetRenderer").then((module) => ({
    default: module.PlanetRenderer,
  })),
)

export function LazyPlanetRenderer(props: PlanetRendererProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full bg-gradient-to-br from-[#172a45] to-[#0a192f] rounded-lg flex items-center justify-center">
          <div className="text-center text-[#64ffda]">
            <div className="text-4xl mb-4">🪐</div>
            <p className="font-mono text-sm">3D Renderer Unavailable</p>
          </div>
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <LoadingIndicator size="lg" variant="planet" />
          </div>
        }
      >
        <PlanetRenderer {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}
