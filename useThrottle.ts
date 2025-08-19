"use client"

import { useCallback, useRef } from "react"

export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const lastCall = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastCall.current >= delay) {
        lastCall.current = now
        return callback(...args)
      } else {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(
          () => {
            lastCall.current = Date.now()
            callback(...args)
          },
          delay - (now - lastCall.current),
        )
      }
    }) as T,
    [callback, delay],
  )
}
