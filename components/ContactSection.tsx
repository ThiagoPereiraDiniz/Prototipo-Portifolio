"use client"

import type React from "react"
import { useState } from "react"
import { QuantumFormField } from "./QuantumFormField"
import { useParticleSystem } from "@/hooks/useParticleSystem"

interface ContactFormData {
  name: string
  email: string
  message: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { burstParticles } = useParticleSystem()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.")
      return
    }

    setIsSubmitting(true)

    // Trigger particle burst effect
    burstParticles(10, 100)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      console.log("[v0] Form submitted:", formData)
    }, 2000)
  }

  const updateField = (field: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#172a45] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#0a192f]/80 to-[#172a45]/80 rounded-2xl p-8 sm:p-10 md:p-12 border border-[#64ffda]/30">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">✨</div>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#64ffda] mb-4">Transmission Successful</h3>
            <p className="text-[#f5f0e1] mb-2 text-sm sm:text-base">
              Your message has been quantum-entangled with our communication network.
            </p>
            <p className="text-[#b38728] text-sm sm:text-base">Thank you for your transmission, {formData.name}.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#172a45] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-[#f5f0e1]">
            Contato
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#64ffda] to-[#b38728] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0a192f]/80 to-[#172a45]/80 rounded-2xl p-6 sm:p-8 border border-[#64ffda]/30 h-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#64ffda] mb-4 sm:mb-6">Vamos Conversar</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#64ffda]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#64ffda]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#f5f0e1] font-medium text-sm sm:text-base">Email</p>
                    <a
                      href="mailto:thiagopereiradiniz17@gmail.com"
                      className="text-[#64ffda] hover:text-[#f5f0e1] transition-colors text-sm sm:text-base break-all"
                    >
                      thiagopereiradiniz17@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#64ffda]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#64ffda]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#f5f0e1] font-medium text-sm sm:text-base">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/thiagopereiradev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        console.log("[v0] LinkedIn link clicked:", "https://www.linkedin.com/in/thiagopereiradev/")
                      }
                      className="text-[#64ffda] hover:text-[#f5f0e1] transition-colors cursor-pointer text-sm sm:text-base"
                    >
                      /in/thiagopereiradev
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#64ffda]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#64ffda]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#f5f0e1] font-medium text-sm sm:text-base">GitHub</p>
                    <a
                      href="https://github.com/ThiagoPereiraDiniz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#64ffda] hover:text-[#f5f0e1] transition-colors text-sm sm:text-base"
                    >
                      /ThiagoPereiraDiniz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div
              className={`
                relative p-6 sm:p-8 bg-gradient-to-br from-[#0a192f]/80 to-[#172a45]/80 
                rounded-2xl border border-[#64ffda]/30 
                shadow-[0_0_30px_rgba(100,255,218,0.1)]
                ${isSubmitting ? "gradient-shift" : ""}
              `}
            >
              {/* Animated border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#64ffda] via-transparent via-[#ff8a00] via-transparent to-[#64ffda] rounded-2xl opacity-50 gradient-shift -z-10" />

              <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f0e1] mb-4 sm:mb-6">Envie uma Mensagem</h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <QuantumFormField
                  label="Nome"
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={updateField("name")}
                />

                <QuantumFormField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={updateField("email")}
                />

                <QuantumFormField
                  label="Mensagem"
                  type="textarea"
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={updateField("message")}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#64ffda] to-[#5e2ca5] 
                    text-[#0a192f] font-serif font-bold text-base sm:text-lg rounded-lg
                    transition-all duration-300 hover:-translate-y-1 
                    hover:shadow-[0_8px_25px_rgba(100,255,218,0.3)]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    ${isSubmitting ? "animate-pulse" : ""}
                  `}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
