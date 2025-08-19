"use client"

import { useEffect, useState } from "react"

export function useThreeJS() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if Three.js is already loaded
    if (window.THREE) {
      setIsLoaded(true)
      return
    }

    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
      console.warn("[v0] WebGL not supported")
      setHasError(true)
      return
    }

    // Wait for Three.js to load from CDN
    const checkThreeJS = () => {
      if (window.THREE) {
        console.log("[v0] Three.js loaded successfully")
        setIsLoaded(true)
      } else {
        setTimeout(checkThreeJS, 100)
      }
    }

    // Start checking after a short delay
    const timeoutId = setTimeout(checkThreeJS, 100)

    // Timeout after 10 seconds
    const errorTimeoutId = setTimeout(() => {
      if (!window.THREE) {
        console.error("[v0] Three.js failed to load within timeout")
        setHasError(true)
      }
    }, 10000)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(errorTimeoutId)
    }
  }, [])

  return { isLoaded, hasError }
}
