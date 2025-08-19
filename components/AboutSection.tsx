"use client"

import { useEffect, useRef } from "react"
import { SpiceParticleEmitter } from "./SpiceParticleEmitter"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0a192f] to-[#112240] overflow-hidden"
      id="about"
    >
      <SpiceParticleEmitter particleCount={15} className="absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#64ffda] to-[#f5f0e1] bg-clip-text text-transparent">
            Quem Sou Eu
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#64ffda] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-[#112240]/50 backdrop-blur-sm border border-[#64ffda]/20 rounded-lg p-6 sm:p-8 hover:border-[#64ffda]/40 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#64ffda]">Desenvolvedor Full Stack</h3>
            <p className="text-[#8892b0] leading-relaxed mb-4 text-sm sm:text-base">
              Sou um desenvolvedor apaixonado por tecnologia e inovação, especializado em criar soluções digitais que
              combinam funcionalidade excepcional com design elegante. Com experiência em desenvolvimento front-end e
              back-end, transformo ideias em realidade digital.
            </p>
            <p className="text-[#8892b0] leading-relaxed text-sm sm:text-base">
              Minha jornada na programação começou com curiosidade e evoluiu para uma paixão por resolver problemas
              complexos através de código limpo e arquiteturas bem estruturadas.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#64ffda]/10 to-[#112240]/50 backdrop-blur-sm border border-[#64ffda]/20 rounded-lg p-6 sm:p-8 hover:border-[#64ffda]/40 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#64ffda]/30 hover:border-[#64ffda]/60 transition-all duration-300 group cursor-pointer">
                <img
                  src="/profile-photo.jpg"
                  alt="Thiago Pereira Diniz - Desenvolvedor Full Stack"
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f0e1] mb-2">Desenvolvedor Criativo</h3>
              <p className="text-[#8892b0] text-sm sm:text-base">Transformando ideias em código</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-sm sm:text-base">Experiência</span>
                <span className="text-[#64ffda] font-semibold text-sm sm:text-base">1 ano</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-sm sm:text-base">Projetos</span>
                <span className="text-[#64ffda] font-semibold text-sm sm:text-base">10+ concluídos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-sm sm:text-base">Foco</span>
                <span className="text-[#64ffda] font-semibold text-sm sm:text-base">Full Stack</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-[#112240]/50 backdrop-blur-sm border border-[#64ffda]/20 rounded-lg p-4 sm:p-6 hover:border-[#64ffda]/40 transition-all duration-300">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#64ffda]">Linguagens de Programação</h4>
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "Python", "TypeScript", "C#", "HTML5", "CSS3", "Node.js"].map((lang) => (
                <span
                  key={lang}
                  className="px-2 sm:px-3 py-1 bg-[#64ffda]/10 text-[#64ffda] rounded-full text-xs sm:text-sm border border-[#64ffda]/20 hover:bg-[#64ffda]/20 transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#112240]/50 backdrop-blur-sm border border-[#64ffda]/20 rounded-lg p-4 sm:p-6 hover:border-[#64ffda]/40 transition-all duration-300">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#64ffda]">Front-End</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular", "Sass", "Bootstrap"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-[#f5f0e1]/10 text-[#f5f0e1] rounded-full text-xs sm:text-sm border border-[#f5f0e1]/20 hover:bg-[#f5f0e1]/20 transition-colors"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="bg-[#112240]/50 backdrop-blur-sm border border-[#64ffda]/20 rounded-lg p-4 sm:p-6 hover:border-[#64ffda]/40 transition-all duration-300">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#64ffda]">Back-End</h4>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Express.js", "NestJS", "GraphQL", "REST APIs", "Socket.io", "JWT"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 sm:px-3 py-1 bg-[#b38728]/10 text-[#b38728] rounded-full text-xs sm:text-sm border border-[#b38728]/20 hover:bg-[#b38728]/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#112240]/50 backdrop-blur-sm border border-[#64ffda]/20 rounded-lg p-4 sm:p-6 hover:border-[#64ffda]/40 transition-all duration-300">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#64ffda]">Banco de Dados</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 sm:px-3 py-1 bg-[#64ffda]/20 text-[#64ffda] rounded-full text-xs sm:text-sm border-2 border-[#64ffda]/40 font-semibold">
                MongoDB ⭐
              </span>
              {["PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase"].map((db) => (
                <span
                  key={db}
                  className="px-2 sm:px-3 py-1 bg-[#8892b0]/10 text-[#8892b0] rounded-full text-xs sm:text-sm border border-[#8892b0]/20 hover:bg-[#8892b0]/20 transition-colors"
                >
                  {db}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
