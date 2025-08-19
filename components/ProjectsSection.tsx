"use client"

import { useState } from "react"

interface ProjectData {
  id: string
  title: string
  description: string
  technologies: string[]
  link: string
  hologramType: "arrakis-ui" | "thopter-patterns" | "bene-gesserit" | "tetris-game"
}

const projects: ProjectData[] = [
  {
    id: "arrakis-ui",
    title: "Arrakis UI Framework",
    description: "House Atreides-approved interface patterns",
    technologies: ["Spline", "Three.js", "Quantum CSS"],
    link: "#",
    hologramType: "arrakis-ui",
  },
  {
    id: "thopter-patterns",
    title: "Ornithopter Flight Simulator",
    description: "Interactive flight pattern visualization with desert adaptation protocols",
    technologies: ["WebGL", "Fluid Dynamics", "Framer Motion"],
    link: "#",
    hologramType: "thopter-patterns",
  },
  {
    id: "registration-system",
    title: "Sistema de Inscrições Full Stack",
    description:
      "Plataforma completa de inscrições desenvolvida com Node.js, Express e MongoDB. Inclui autenticação JWT, validação de dados, dashboard administrativo e sistema de notificações por email.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "React", "Tailwind CSS"],
    link: "#",
    hologramType: "arrakis-ui",
  },
  {
    id: "ecommerce-dashboard",
    title: "Dashboard E-commerce Analytics",
    description:
      "Dashboard interativo para análise de vendas e métricas de e-commerce. Visualizações em tempo real, relatórios personalizados e integração com APIs de pagamento.",
    technologies: ["React", "Chart.js", "Node.js", "PostgreSQL", "TypeScript"],
    link: "#",
    hologramType: "thopter-patterns",
  },
  {
    id: "tetris-game",
    title: "Tetris Game",
    description:
      "Jogo Tetris completo desenvolvido com JavaScript vanilla, HTML5 Canvas e CSS3. Inclui sistema de pontuação, níveis progressivos, preview da próxima peça e controles responsivos.",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Logic"],
    link: "/tetris",
    hologramType: "tetris-game",
  },
]

const hologramGradients = {
  "arrakis-ui": "from-[#172a45] to-[#5e2ca5]",
  "thopter-patterns": "from-[#ff8a00] to-[#5e2ca5]",
  "bene-gesserit": "from-[#64ffda] to-[#172a45]",
  "tetris-game": "from-[#64ffda] to-[#172a45]",
}

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#172a45] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-[#f5f0e1]">
            Artifacts of Creation
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#64ffda] to-[#b38728] mx-auto" />
        </div>

        {/* Holotable Container */}
        <div className="perspective-1000">
          <div className="transform-gpu rotate-x-2 p-4 sm:p-6 md:p-8 bg-[#172a45]/70 rounded-2xl border border-[#64ffda]/20 shadow-[0_0_30px_rgba(100,255,218,0.1)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group relative transform-gpu transition-all duration-500 hover:-translate-y-3 hover:scale-105"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Card */}
                  <div className="bg-[#0a192f]/50 rounded-lg overflow-hidden border border-[#64ffda]/10 group-hover:border-[#64ffda]/30 transition-all duration-300">
                    {/* Hologram Display */}
                    <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                      <div
                        className={`
                          absolute inset-0 bg-gradient-to-br ${hologramGradients[project.hologramType]} opacity-70
                          group-hover:opacity-100 transition-all duration-500 group-hover:scale-105
                        `}
                      />

                      {/* Scanline Effect */}
                      <div className="scanline-effect absolute inset-0" />

                      {/* Hologram Content Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[#64ffda] text-2xl sm:text-3xl md:text-4xl opacity-50 group-hover:opacity-80 transition-opacity">
                          {project.hologramType === "arrakis-ui" && "🏛️"}
                          {project.hologramType === "thopter-patterns" && "🚁"}
                          {project.hologramType === "bene-gesserit" && "🔮"}
                          {project.hologramType === "tetris-game" && "🎮"}
                        </div>
                      </div>

                      {/* Hover scan line */}
                      <div
                        className={`
                          absolute top-0 left-0 w-full h-1 bg-[#64ffda] transform -translate-x-full
                          ${hoveredProject === project.id ? "animate-[scan_0.8s_ease-in-out]" : ""}
                        `}
                      />
                    </div>

                    {/* Project Details */}
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="font-serif text-lg sm:text-xl font-medium mb-3 text-[#64ffda] group-hover:text-[#ff8a00] transition-colors">
                        {project.title}
                      </h3>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono bg-[#64ffda]/10 text-[#64ffda] rounded border border-[#64ffda]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <p className="text-[#f5f0e1]/80 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {project.description}
                      </p>

                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#64ffda] hover:text-[#ff8a00] transition-colors group/link"
                      >
                        Access Archives
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
