"use client"

import { useEffect, useState } from "react"
import type { WebVitals } from "@/types"

export function useWebVitals() {
  const [vitals, setVitals] = useState<Partial<WebVitals>>({})

  useEffect(() => {
    // Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        setVitals((prev) => ({ ...prev, LCP: lastEntry.startTime }))
        console.log("[v0] LCP:", Math.round(lastEntry.startTime), "ms")
      })

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint")
        if (fcpEntry) {
          setVitals((prev) => ({ ...prev, FCP: fcpEntry.startTime }))
          console.log("[v0] FCP:", Math.round(fcpEntry.startTime), "ms")
        }
      })

      fcpObserver.observe({ type: "paint", buffered: true })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        setVitals((prev) => ({ ...prev, CLS: clsValue }))
        console.log("[v0] CLS:", clsValue.toFixed(4))
      })

      clsObserver.observe({ type: "layout-shift", buffered: true })

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const firstInput = entries[0]
        if (firstInput) {
          const fid = firstInput.processingStart - firstInput.startTime
          setVitals((prev) => ({ ...prev, FID: fid }))
          console.log("[v0] FID:", Math.round(fid), "ms")
        }
      })

      fidObserver.observe({ type: "first-input", buffered: true })

      return () => {
        lcpObserver.disconnect()
        fcpObserver.disconnect()
        clsObserver.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])

  return vitals
}
