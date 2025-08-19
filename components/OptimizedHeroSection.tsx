"use client"

import { useState, useEffect, memo } from "react"
import NativePlanetRenderer from "./NativePlanetRenderer"
import { ErrorBoundary } from "./ErrorBoundary"
import { performanceUtils } from "@/lib/performance"

const ctaTexts = ["Harness the Voice", "Summon the Waters", "Command the Spice"]

function OptimizedHeroSectionComponent() {
  const [ctaText, setCtaText] = useState(ctaTexts[0])
  const [ctaIndex, setCtaIndex] = useState(0)
  const [shouldLoadPlanet, setShouldLoadPlanet] = useState(false)

  useEffect(() => {
    const shouldLoad = performanceUtils.shouldLoadHeavyContent()
    setShouldLoadPlanet(shouldLoad)

    if (!shouldLoad) {
      console.log("[v0] Skipping 3D planet due to slow connection or save-data mode")
    }
  }, [])

  // Dynamic CTA text based on "planetary alignment"
  useEffect(() => {
    const interval = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % ctaTexts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setCtaText(ctaTexts[ctaIndex])
  }, [ctaIndex])

  const handleCtaClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 pt-20">
      {/* Planet Container */}
      <div className="relative w-full h-[50vh] lg:h-full order-2 lg:order-1">
        {shouldLoadPlanet ? (
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
            <NativePlanetRenderer className="w-full h-full" />
          </ErrorBoundary>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#172a45] to-[#0a192f] rounded-lg flex items-center justify-center">
            <div className="text-center text-[#64ffda]">
              <div className="text-6xl mb-4">🪐</div>
              <p className="font-mono text-sm">Optimized for your connection</p>
            </div>
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center lg:text-left px-4 lg:px-8 order-1 lg:order-2">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 bg-gradient-to-r from-[#f5f0e1] to-[#b38728] bg-clip-text text-transparent">
          Imperial Design Archives
        </h2>

        <p className="font-mono text-lg md:text-xl mb-8 text-[#64ffda]">Interfacing with the spice of creation</p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
          <button
            onClick={handleCtaClick}
            className="
              group relative px-8 py-4 
              bg-gradient-to-r from-[#64ffda] to-[#5e2ca5] 
              text-[#0a192f] font-serif font-bold text-lg
              rounded-lg overflow-hidden
              transition-all duration-300
              hover:transform hover:-translate-y-1 
              hover:shadow-[0_8px_25px_rgba(100,255,218,0.3)]
            "
          >
            <span className="relative z-10">{ctaText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff8a00] to-[#b38728] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Voice wave effect on hover */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>

          {/* Orbital Indicator */}
          <div className="relative w-12 h-12 border-2 border-[#64ffda] rounded-full flex items-center justify-center">
            <div className="orbital-motion w-5 h-5 bg-[#ff8a00] rounded-full absolute" />
            <div className="absolute inset-0 border border-[#64ffda]/30 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

export const OptimizedHeroSection = memo(OptimizedHeroSectionComponent)
