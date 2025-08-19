"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { PerformanceMonitor } from "@/lib/performance"
import { useWebVitals } from "@/hooks/useWebVitals"
import type { PerfMetrics, WebVitals } from "@/types"

interface PerformanceContextType {
  metrics: PerfMetrics & { vitals: Partial<WebVitals> }
  monitor: PerformanceMonitor
}

const PerformanceContext = createContext<PerformanceContextType | null>(null)

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [monitor] = useState(() => PerformanceMonitor.getInstance())
  const vitals = useWebVitals()
  const [metrics, setMetrics] = useState(() => monitor.getMetrics())

  useEffect(() => {
    monitor.updateVitals(vitals)
    setMetrics(monitor.getMetrics())
  }, [vitals, monitor])

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(monitor.getMetrics())
    }, 1000)

    return () => clearInterval(interval)
  }, [monitor])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      monitor.dispose()
    }
  }, [monitor])

  return <PerformanceContext.Provider value={{ metrics, monitor }}>{children}</PerformanceContext.Provider>
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error("usePerformance must be used within a PerformanceProvider")
  }
  return context
}
