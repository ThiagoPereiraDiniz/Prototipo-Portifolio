"use client"

import { useEffect, useState } from "react"
import type { PerfMetrics } from "@/types"

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerfMetrics>({
    startTime: 0,
    frameCount: 0,
    fps: 0,
    lastFrameTime: 0,
  })

  useEffect(() => {
    const startTime = performance.now()

    setMetrics((prev) => ({
      ...prev,
      startTime,
    }))

    // DOM Content Loaded tracking
    const handleDOMContentLoaded = () => {
      const domContentLoaded = performance.now() - startTime
      console.log(`[v0] DOM Content Loaded: ${Math.round(domContentLoaded)}ms`)
    }

    // Window Load tracking
    const handleWindowLoad = () => {
      const windowLoaded = performance.now() - startTime
      console.log(`[v0] Window Loaded: ${Math.round(windowLoaded)}ms`)

      // Get First Paint metric
      const paintMetrics = performance.getEntriesByType("paint")
      paintMetrics.forEach((metric) => {
        if (metric.name === "first-paint") {
          console.log(`[v0] First Paint: ${Math.round(metric.startTime)}ms`)
        }
      })
    }

    // Largest Contentful Paint tracking
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log(`[v0] LCP: ${Math.round(lastEntry.startTime)}ms`)
      })

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })
    }

    // Add event listeners
    document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)
    window.addEventListener("load", handleWindowLoad)

    // Cleanup
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
      window.removeEventListener("load", handleWindowLoad)
    }
  }, [])

  // Update FPS counter
  useEffect(() => {
    let animationId: number

    const updateFPS = () => {
      const now = performance.now()

      setMetrics((prev) => {
        const newFrameCount = prev.frameCount + 1
        let newFPS = prev.fps

        if (now - prev.lastFrameTime >= 1000) {
          newFPS = Math.round(newFrameCount / ((now - prev.lastFrameTime) / 1000))
          return {
            ...prev,
            frameCount: 0,
            fps: newFPS,
            lastFrameTime: now,
          }
        }

        return {
          ...prev,
          frameCount: newFrameCount,
        }
      })

      animationId = requestAnimationFrame(updateFPS)
    }

    animationId = requestAnimationFrame(updateFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return metrics
}
