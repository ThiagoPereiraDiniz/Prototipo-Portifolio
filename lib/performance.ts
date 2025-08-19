import type { PerfMetrics, WebVitals } from "@/types"

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerfMetrics
  private vitals: Partial<WebVitals> = {}
  private observers: PerformanceObserver[] = []

  private constructor() {
    this.metrics = {
      startTime: performance.now(),
      frameCount: 0,
      fps: 0,
      lastFrameTime: 0,
    }
    this.initializeObservers()
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private initializeObservers() {
    if (typeof window === "undefined") return
    if (!("PerformanceObserver" in window)) return

    // Long Task Observer
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn(`[v0] Long task detected: ${Math.round(entry.duration)}ms`)
        }
      })
      longTaskObserver.observe({ entryTypes: ["longtask"] })
      this.observers.push(longTaskObserver)
    } catch (e) {
      console.log("[v0] Long task observer not supported")
    }

    // Resource Timing Observer
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming
        if (resource.transferSize > 1000000) {
          // Warn about large resources (>1MB)
          console.warn(`[v0] Large resource loaded: ${resource.name} (${Math.round(resource.transferSize / 1024)}KB)`)
        }
      }
    })
    resourceObserver.observe({ entryTypes: ["resource"] })
    this.observers.push(resourceObserver)
  }

  updateFPS(fps: number) {
    this.metrics.fps = fps
    this.metrics.frameCount++
    this.metrics.lastFrameTime = performance.now()
  }

  updateVitals(vitals: Partial<WebVitals>) {
    this.vitals = { ...this.vitals, ...vitals }
  }

  getMetrics(): PerfMetrics & { vitals: Partial<WebVitals> } {
    return {
      ...this.metrics,
      vitals: this.vitals,
    }
  }

  // Throttle function for performance-critical operations
  throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
    let inThrottle: boolean
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }) as T
  }

  // Debounce function for user input
  debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }) as T
  }

  // Memory usage monitoring
  getMemoryUsage() {
    if ("memory" in performance) {
      const memory = (performance as any).memory
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      }
    }
    return null
  }

  // Clean up observers
  dispose() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers = []
  }
}

// Utility functions for performance optimization
export const performanceUtils = {
  // Preload critical resources
  preloadResource: (href: string, as: string) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = href
    link.as = as
    document.head.appendChild(link)
  },

  // Prefetch next page resources
  prefetchResource: (href: string) => {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = href
    document.head.appendChild(link)
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  },

  // Check connection quality
  getConnectionInfo: () => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      }
    }
    return null
  },

  // Adaptive loading based on connection
  shouldLoadHeavyContent: () => {
    const connection = performanceUtils.getConnectionInfo()
    if (!connection) return true // Default to loading if no info

    // Don't load heavy content on slow connections or save-data mode
    return connection.effectiveType !== "slow-2g" && connection.effectiveType !== "2g" && !connection.saveData
  },
}
