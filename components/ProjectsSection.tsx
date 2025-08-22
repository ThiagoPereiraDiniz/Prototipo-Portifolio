// src/components/ui/ProjectsSection.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
// Caminho de importação para o arquivo de dados
import { projects, ProjectData } from "../data/projects";

const hologramGradients = {
  "arrakis-ui": "from-[#172a45] to-[#5e2ca5]",
  "thopter-patterns": "from-[#ff8a00] to-[#5e2ca5]",
  "bene-gesserit": "from-[#64ffda] to-[#172a45]",
  "tetris-game": "from-[#64ffda] to-[#172a45]",
};

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenModal = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

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
                    {/* Hologram Display (agora com a imagem) */}
                    <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`Screenshot do projeto ${project.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Scanline Effect */}
                      <div className="scanline-effect absolute inset-0" />
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

                      {/* Botão que abre o modal */}
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#64ffda] hover:text-[#ff8a00] transition-colors group/link"
                      >
                        Ver detalhes
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes do Projeto */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#172a45] rounded-lg p-6 max-w-2xl w-full relative border border-[#64ffda]/20 overflow-y-auto max-h-[90vh]">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white text-lg">
              &times;
            </button>
            <h3 className="font-serif text-2xl font-medium mb-4 text-[#64ffda]">{selectedProject.title}</h3>
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={600}
              height={400}
              className="rounded-lg mb-4"
            />
            {/* Usa ReactMarkdown para renderizar o texto com formatação */}
            <div className="text-white mb-4">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{selectedProject.fullDescription}</ReactMarkdown>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs font-mono bg-[#64ffda]/10 text-[#64ffda] rounded">
                  {tech}
                </span>
              ))}
            </div>
            {/* Renderiza os links apenas se existirem */}
            <div className="flex gap-4">
              {selectedProject.link && (
                <a href={selectedProject.link} className="font-mono text-sm text-[#ff8a00] hover:underline" target="_blank" rel="noopener noreferrer">
                  Acessar site
                </a>
              )}
              {selectedProject.githubLink && (
                <a href={selectedProject.githubLink} className="font-mono text-sm text-[#ff8a00] hover:underline" target="_blank" rel="noopener noreferrer">
                  Ver no GitHub
                </a>
              )}
              {!selectedProject.link && !selectedProject.githubLink && (
                <span className="font-mono text-sm text-[#f5f0e1]/50">
                  Sem links de acesso disponíveis.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}