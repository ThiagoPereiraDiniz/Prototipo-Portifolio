"use client"

import { useState, useEffect } from "react"
import type { NavigationItem } from "@/types"

const navigationItems: NavigationItem[] = [
  { href: "#hero", label: "Homeworld", scrollTarget: "hero" },
  { href: "#projects", label: "Artifacts", scrollTarget: "projects" },
  { href: "#skills", label: "Abilities", scrollTarget: "skills" },
  { href: "#contact", label: "Transmit", scrollTarget: "contact" },
]

export function ImperialHeader() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(targetId)
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      navigationItems.forEach(({ scrollTarget }) => {
        const element = document.getElementById(scrollTarget)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(scrollTarget)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0a192f]/85 backdrop-blur-md z-50 border-b border-[#b38728]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="glyph-pulse w-8 h-8 sm:w-10 sm:h-10 bg-[#b38728]/70 rounded-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-4 sm:w-5 h-0.5 bg-[#b38728] transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-4 sm:h-5 bg-[#b38728] transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-[#f5f0e1] to-[#64ffda] bg-clip-text text-transparent">
              Thiago Pereira Diniz
            </h1>
            <span className="hidden sm:block font-mono text-xs text-[#8892b0]">Full Stack Developer</span>
          </div>
        </div>

        <ul className="hidden md:flex gap-8">
          {navigationItems.map(({ href, label, scrollTarget }) => (
            <li key={scrollTarget}>
              <button
                onClick={() => scrollToSection(scrollTarget)}
                className={`
                  relative px-3 py-2 font-mono text-sm border border-transparent rounded transition-all duration-200
                  hover:border-[#64ffda]/50
                  ${
                    activeSection === scrollTarget
                      ? "text-[#64ffda] border-[#64ffda]/50"
                      : "text-[#f5f0e1] hover:text-[#64ffda]"
                  }
                `}
              >
                {label}
                <div
                  className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#64ffda] transition-all duration-300
                    ${activeSection === scrollTarget ? "w-full" : "w-0"}
                  `}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 text-[#64ffda] relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div
            className={`w-6 h-0.5 bg-current mb-1 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-current mb-1 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0a192f]/95 backdrop-blur-md border-b border-[#b38728] transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <ul className="flex flex-col py-4">
          {navigationItems.map(({ href, label, scrollTarget }) => (
            <li key={scrollTarget}>
              <button
                onClick={() => scrollToSection(scrollTarget)}
                className={`
                  w-full text-left px-6 py-3 font-mono text-sm transition-all duration-200
                  hover:bg-[#64ffda]/10 hover:text-[#64ffda]
                  ${activeSection === scrollTarget ? "text-[#64ffda] bg-[#64ffda]/5" : "text-[#f5f0e1]"}
                `}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
