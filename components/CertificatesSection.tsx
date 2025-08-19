"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Award } from "lucide-react"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  category: string
  image: string // Path to PNG converted from PDF
  pdfUrl?: string // Optional PDF link
  credentialId?: string
  skills: string[]
  featured?: boolean // Para destacar os melhores certificados
  hours?: number // Carga horária
  description?: string // Descrição detalhada
}

const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "HTML e CSS: Responsividade e Publicação de Projetos",
    issuer: "Alura",
    date: "27 de março de 2025",
    category: "Frontend",
    image: "/certificates/html-css-responsividade.png",
    pdfUrl: "/certificates/html-css-responsividade-publicacao.pdf",
    credentialId: "ALURA-RESP-PUB-001",
    skills: [
      "HTML5",
      "CSS3",
      "Responsive Design",
      "Mobile-First",
      "Media Queries",
      "Flexbox",
      "Grid Layout",
      "Web Publishing",
      "Cross-browser Compatibility",
      "Performance Optimization",
    ],
    featured: true, // Destacado por ser essencial para frontend moderno
    hours: 6,
    description: "Desenvolvimento de layouts responsivos e técnicas de publicação web profissional",
  },
  {
    id: "cert-2",
    title: "Começando em Programação: Carreira e Primeiros Passos",
    issuer: "Alura",
    date: "12 de maio de 2025",
    category: "Soft Skills",
    image: "/certificates/comecando-programacao.png",
    pdfUrl: "/certificates/comecando-programacao-carreira.pdf",
    credentialId: "ALURA-CAREER-002",
    skills: [
      "Career Planning",
      "Programming Fundamentals",
      "Tech Industry",
      "Professional Development",
      "Learning Path",
      "Problem Solving",
      "Logical Thinking",
    ],
    hours: 1,
    description: "Fundamentos de carreira em programação e planejamento profissional",
  },
  {
    id: "cert-3",
    title: "Game Design: Viabilizando o Jogo como Produto",
    issuer: "Alura",
    date: "02 de maio de 2025",
    category: "Game Dev",
    image: "/certificates/game-design-produto.png",
    pdfUrl: "/certificates/game-design-viabilizando-produto.pdf",
    credentialId: "ALURA-GD-PROD-003",
    skills: [
      "Game Design",
      "Product Management",
      "Monetization Strategies",
      "User Experience",
      "Market Analysis",
      "Business Model",
      "Player Psychology",
      "Game Economics",
      "Product Strategy",
    ],
    featured: true, // Destacado por combinar design e negócios
    hours: 8,
    description: "Estratégias avançadas para transformar jogos em produtos comerciais viáveis",
  },
  {
    id: "cert-4",
    title: "HTML e CSS: Classes, Posicionamento e Flexbox",
    issuer: "Alura",
    date: "06 de março de 2025",
    category: "Frontend",
    image: "/certificates/html-css-flexbox.png",
    pdfUrl: "/certificates/html-css-classes-flexbox.pdf",
    credentialId: "ALURA-FLEX-004",
    skills: [
      "HTML5",
      "CSS3",
      "Flexbox",
      "CSS Classes",
      "Layout Positioning",
      "CSS Selectors",
      "Responsive Layouts",
      "Modern CSS",
      "Box Model",
    ],
    hours: 8,
    description: "Domínio de técnicas modernas de layout com Flexbox e posicionamento CSS",
  },
  {
    id: "cert-5",
    title: "Git e GitHub: Compartilhando e Colaborando em Projetos",
    issuer: "Alura",
    date: "03 de abril de 2025",
    category: "DevOps",
    image: "/certificates/git-github.png",
    pdfUrl: "/certificates/git-github-colaboracao.pdf",
    credentialId: "ALURA-GIT-005",
    skills: [
      "Git",
      "GitHub",
      "Version Control",
      "Collaboration",
      "Branching",
      "Merging",
      "Pull Requests",
      "Code Review",
      "Team Development",
      "Open Source",
    ],
    featured: true, // Destacado por ser essencial para qualquer desenvolvedor
    hours: 8,
    description: "Controle de versão avançado e colaboração em projetos de desenvolvimento",
  },
  {
    id: "cert-6",
    title: "HTML e CSS: Cabeçalho, Footer e Variáveis CSS",
    issuer: "Alura",
    date: "06 de março de 2025",
    category: "Frontend",
    image: "/certificates/html-css-cabecalho-footer.png",
    pdfUrl: "/certificates/html-css-cabecalho-footer-variaveis.pdf",
    credentialId: "ALURA-VAR-006",
    skills: [
      "HTML5",
      "CSS3",
      "CSS Variables",
      "Custom Properties",
      "Header Design",
      "Footer Design",
      "CSS Architecture",
      "Maintainable CSS",
    ],
    hours: 6,
    description: "Estruturação de layouts com variáveis CSS e componentes reutilizáveis",
  },
  {
    id: "cert-7",
    title: "Aprendizagem: Personalizando sua Rotina de Estudos com ChatGPT",
    issuer: "Alura",
    date: "27 de junho de 2025",
    category: "AI",
    image: "/certificates/aprendizagem-chatgpt.png",
    pdfUrl: "/certificates/aprendizagem-chatgpt-rotina.pdf",
    credentialId: "ALURA-AI-LEARN-007",
    skills: [
      "ChatGPT",
      "AI-Assisted Learning",
      "Prompt Engineering",
      "Study Optimization",
      "Productivity",
      "Learning Automation",
      "AI Tools",
      "Personal Development",
    ],
    featured: true, // Destacado por ser pioneiro em IA para aprendizado
    hours: 6,
    description: "Otimização de estudos usando inteligência artificial e técnicas de prompt engineering",
  },
  {
    id: "cert-8",
    title: "Aprender a Aprender: Técnicas para seu Autodesenvolvimento",
    issuer: "Alura",
    date: "22 de maio de 2025",
    category: "Soft Skills",
    image: "/certificates/aprender-a-aprender.png",
    pdfUrl: "/certificates/aprender-aprender-autodesenvolvimento.pdf",
    credentialId: "ALURA-LEARN-008",
    skills: [
      "Learning Techniques",
      "Self-Development",
      "Study Methods",
      "Memory Techniques",
      "Focus Management",
      "Goal Setting",
      "Growth Mindset",
      "Metacognition",
    ],
    hours: 8,
    description: "Técnicas científicas de aprendizado e desenvolvimento de habilidades metacognitivas",
  },
  {
    id: "cert-9",
    title: "Game Design: Definindo os Princípios de um Jogo Digital",
    issuer: "Alura",
    date: "24 de abril de 2025",
    category: "Game Dev",
    image: "/certificates/game-design-principios.png",
    pdfUrl: "/certificates/game-design-principios-jogo-digital.pdf",
    credentialId: "ALURA-GD-PRIN-009",
    skills: [
      "Game Design Theory",
      "Game Mechanics",
      "Player Experience",
      "Game Balance",
      "Core Gameplay",
      "Game Systems",
      "Design Principles",
      "Interactive Design",
    ],
    featured: true, // Destacado por teoria avançada de game design
    hours: 8,
    description: "Fundamentos teóricos e práticos do design de jogos digitais",
  },
  {
    id: "cert-10",
    title: "HTML e CSS: Ambientes de Desenvolvimento, Estrutura de Arquivos e Tags",
    issuer: "Alura",
    date: "24 de fevereiro de 2025",
    category: "Frontend",
    image: "/certificates/html-css-ambiente-arquivos.png",
    pdfUrl: "/certificates/html-css-ambiente-estrutura-tags.pdf",
    credentialId: "ALURA-ENV-010",
    skills: [
      "HTML5",
      "CSS3",
      "Development Environment",
      "File Structure",
      "Semantic HTML",
      "HTML Tags",
      "Web Standards",
      "Code Organization",
      "Best Practices",
    ],
    hours: 8,
    description: "Configuração de ambiente de desenvolvimento e estruturação profissional de projetos web",
  },
  {
    id: "cert-11",
    title: "JavaScript: Métodos de Array",
    issuer: "Alura",
    date: "05 de agosto de 2025",
    category: "Programming",
    image: "/certificates/javascript-array-methods.png",
    pdfUrl: "/certificates/javascript-metodos-array.pdf",
    credentialId: "ALURA-JS-ARRAY-011",
    skills: [
      "JavaScript",
      "Array Methods",
      "map()",
      "filter()",
      "reduce()",
      "forEach()",
      "find()",
      "some()",
      "every()",
      "Functional Programming",
      "ES6+",
    ],
    featured: true, // Destacado por ser JavaScript avançado
    hours: 8,
    description: "Domínio completo dos métodos de array em JavaScript para manipulação eficiente de dados",
  },
  {
    id: "cert-12",
    title: "Lógica de Programação: Praticando com Desafios",
    issuer: "Alura",
    date: "24 de fevereiro de 2025",
    category: "Programming",
    image: "/certificates/logica-programacao-desafios.png",
    pdfUrl: "/certificates/logica-programacao-desafios.pdf",
    credentialId: "ALURA-LOGIC-CHAL-012",
    skills: [
      "Problem Solving",
      "Algorithms",
      "Logic Programming",
      "Code Challenges",
      "Debugging",
      "Optimization",
      "Critical Thinking",
      "Programming Patterns",
    ],
    hours: 8,
    description: "Resolução de desafios complexos de lógica de programação e algoritmos",
  },
  {
    id: "cert-13",
    title: "IA: Explorando o Potencial da Inteligência Artificial Generativa",
    issuer: "Alura",
    date: "27 de junho de 2025",
    category: "AI",
    image: "/certificates/ia-inteligencia-artificial-generativa.png",
    pdfUrl: "/certificates/ia-inteligencia-artificial-generativa.pdf",
    credentialId: "ALURA-AI-GEN-013",
    skills: [
      "Generative AI",
      "Machine Learning",
      "AI Applications",
      "Prompt Engineering",
      "AI Ethics",
      "Large Language Models",
      "AI Tools",
      "Innovation",
      "Future Technology",
    ],
    featured: true, // Destacado por ser IA generativa avançada
    hours: 8,
    description: "Exploração avançada das capacidades e aplicações da inteligência artificial generativa",
  },
  {
    id: "cert-14",
    title: "JavaScript: Manipulando Elementos no DOM",
    issuer: "Alura",
    date: "27 de março de 2025",
    category: "Programming",
    image: "/certificates/javascript-dom.png",
    pdfUrl: "/certificates/javascript-manipulando-dom.pdf",
    credentialId: "ALURA-JS-DOM-014",
    skills: [
      "JavaScript",
      "DOM Manipulation",
      "Event Handling",
      "Element Selection",
      "Dynamic Content",
      "Web APIs",
      "Interactive Web",
      "Frontend Development",
    ],
    hours: 6,
    description: "Manipulação avançada do DOM para criar interfaces web interativas e dinâmicas",
  },
  {
    id: "cert-15",
    title: "JavaScript para Web: Crie Páginas Dinâmicas",
    issuer: "Alura",
    date: "27 de março de 2025",
    category: "Programming",
    image: "/certificates/javascript-web-paginas-dinamicas.png",
    pdfUrl: "/certificates/javascript-web-paginas-dinamicas.pdf",
    credentialId: "ALURA-JS-WEB-015",
    skills: [
      "JavaScript",
      "Web Development",
      "Dynamic Pages",
      "User Interaction",
      "Event Listeners",
      "Form Validation",
      "AJAX",
      "Responsive Design",
      "Modern Web",
    ],
    featured: true, // Destacado por ser curso completo de JavaScript web
    hours: 10,
    description: "Desenvolvimento completo de páginas web dinâmicas e interativas com JavaScript",
  },
  {
    id: "cert-16",
    title: "JavaScript: Construindo Páginas Dinâmicas",
    issuer: "Alura",
    date: "27 de junho de 2025",
    category: "Programming",
    image: "/certificates/javascript-construindo-paginas-dinamicas.png",
    pdfUrl: "/certificates/javascript-construindo-paginas-dinamicas.pdf",
    credentialId: "ALURA-JS-BUILD-016",
    skills: [
      "JavaScript",
      "Dynamic Web Pages",
      "Interactive Elements",
      "User Experience",
      "Modern JavaScript",
      "Web Components",
      "Progressive Enhancement",
      "Performance",
    ],
    hours: 8,
    description: "Construção de páginas web dinâmicas com foco em experiência do usuário e performance",
  },
  {
    id: "cert-17",
    title: "JavaScript: Utilizando Tipos, Variáveis e Funções",
    issuer: "Alura",
    date: "17 de agosto de 2025",
    category: "Programming",
    image: "/certificates/javascript-tipos-variaveis-funcoes.png",
    pdfUrl: "/certificates/javascript-tipos-variaveis-funcoes.pdf",
    credentialId: "ALURA-JS-FUND-017",
    skills: [
      "JavaScript Fundamentals",
      "Data Types",
      "Variables",
      "Functions",
      "Scope",
      "Hoisting",
      "ES6+ Features",
      "Best Practices",
      "Clean Code",
    ],
    hours: 8,
    description: "Fundamentos sólidos de JavaScript com foco em tipos, variáveis e funções",
  },
  {
    id: "cert-18",
    title: "Python para Data Science: Primeiros Passos",
    issuer: "Alura",
    date: "17 de agosto de 2025",
    category: "Data Science",
    image: "/certificates/python-data-science.png",
    pdfUrl: "/certificates/python-data-science-primeiros-passos.pdf",
    credentialId: "ALURA-PY-DS-018",
    skills: [
      "Python",
      "Data Science",
      "Data Analysis",
      "Pandas",
      "NumPy",
      "Data Visualization",
      "Statistical Analysis",
      "Machine Learning Basics",
      "Jupyter Notebooks",
    ],
    featured: true, // Destacado por ser Data Science
    hours: 10,
    description: "Introdução completa ao Python para análise de dados e ciência de dados",
  },
  {
    id: "cert-19",
    title: "Lógica de Programação: Explore Funções e Listas",
    issuer: "Alura",
    date: "24 de fevereiro de 2025",
    category: "Programming",
    image: "/certificates/logica-programacao-funcoes-listas.png",
    pdfUrl: "/certificates/logica-programacao-funcoes-listas.pdf",
    credentialId: "ALURA-LOGIC-FUNC-019",
    skills: [
      "Programming Logic",
      "Functions",
      "Lists",
      "Data Structures",
      "Algorithms",
      "Code Organization",
      "Modular Programming",
      "Problem Decomposition",
    ],
    hours: 6,
    description: "Estruturas de dados fundamentais e organização de código com funções e listas",
  },
  {
    id: "cert-20",
    title: "Lógica de Programação: Mergulhe em Programação com JavaScript",
    issuer: "Alura",
    date: "18 de fevereiro de 2025",
    category: "Programming",
    image: "/certificates/logica-programacao-javascript.png",
    pdfUrl: "/certificates/logica-programacao-javascript.pdf",
    credentialId: "ALURA-LOGIC-JS-020",
    skills: [
      "JavaScript",
      "Programming Logic",
      "Problem Solving",
      "Conditional Logic",
      "Loops",
      "Variables",
      "Basic Algorithms",
      "Programming Fundamentals",
    ],
    hours: 6,
    description: "Fundamentos de lógica de programação aplicados ao JavaScript",
  },
  {
    id: "cert-21",
    title: "Unity 2D Parte 1: Criando um Jogo 2D",
    issuer: "Alura",
    date: "24 de abril de 2025",
    category: "Game Dev",
    image: "/certificates/unity-2d-parte-1.png",
    pdfUrl: "/certificates/unity-2d-parte-1.pdf",
    credentialId: "ALURA-UNITY-2D-021",
    skills: [
      "Unity 2D",
      "Game Development",
      "C# Programming",
      "Sprite Animation",
      "Physics 2D",
      "Game Objects",
      "Scene Management",
      "Mobile Game Development",
      "Game Mechanics",
    ],
    hours: 8,
    description: "Desenvolvimento completo de jogos 2D usando Unity Engine com C#",
  },
  {
    id: "cert-22",
    title: "React: Desenvolvendo com JavaScript",
    issuer: "Alura",
    date: "17 de agosto de 2025",
    category: "Frontend",
    image: "/certificates/react-desenvolvendo-javascript.png",
    pdfUrl: "/certificates/react-desenvolvendo-javascript.pdf",
    credentialId: "ALURA-REACT-JS-022",
    skills: [
      "React.js",
      "JavaScript ES6+",
      "JSX",
      "Components",
      "State Management",
      "Props",
      "Event Handling",
      "Hooks",
      "Virtual DOM",
      "Modern Frontend",
    ],
    featured: true, // Destacado por ser React avançado
    hours: 14,
    description: "Desenvolvimento avançado de aplicações web modernas com React.js e JavaScript",
  },
  {
    id: "cert-23",
    title: "Programa Trilhas Inova - Programação de Jogos",
    issuer: "SECTI/FAPEMA - Governo do Maranhão",
    date: "26 de julho de 2025",
    category: "Inovação",
    image: "/certificates/programa-trilhas-inova.png",
    pdfUrl: "/certificates/programa-trilhas-inova-jogos.pdf",
    credentialId: "TRILHAS-INOVA-GAMES-023",
    skills: [
      "Game Programming",
      "Innovation Program",
      "Government Initiative",
      "Startup Ecosystem",
      "Technology Innovation",
      "Game Industry",
      "Entrepreneurship",
      "Research & Development",
      "Public-Private Partnership",
      "Regional Development",
    ],
    featured: true, // Destacado por ser programa governamental extenso
    hours: 400,
    description:
      "Programa governamental de inovação em jogos digitais com foco em startups e desenvolvimento tecnológico regional",
  },
  {
    id: "cert-24",
    title: "Unity 2D Parte 2: Adicionando Efeitos Visuais ao seu Jogo",
    issuer: "Alura",
    date: "24 de abril de 2025",
    category: "Game Dev",
    image: "/certificates/unity-2d-parte-2-efeitos.png",
    pdfUrl: "/certificates/unity-2d-parte-2-efeitos.pdf",
    credentialId: "ALURA-UNITY-VFX-024",
    skills: [
      "Unity 2D",
      "Visual Effects",
      "Particle Systems",
      "Animation",
      "Shader Effects",
      "Post-Processing",
      "Game Polish",
      "UI Effects",
      "Performance Optimization",
    ],
    hours: 8,
    description: "Criação de efeitos visuais avançados e polimento de jogos 2D no Unity",
  },
  {
    id: "cert-25",
    title: "Unity: Criando um Jogo Metroidvania 2D",
    issuer: "Alura",
    date: "17 de agosto de 2025",
    category: "Game Dev",
    image: "/certificates/unity-metroidvania-2d.png",
    pdfUrl: "/certificates/unity-metroidvania-2d.pdf",
    credentialId: "ALURA-METROIDVANIA-025",
    skills: [
      "Unity 2D",
      "Metroidvania Design",
      "Level Design",
      "Player Progression",
      "Map System",
      "Ability Gating",
      "Save System",
      "Complex Game Mechanics",
      "Game Architecture",
    ],
    featured: true, // Destacado por ser jogo complexo
    hours: 12,
    description: "Desenvolvimento de jogo Metroidvania completo com sistemas avançados de progressão e exploração",
  },
]

const categories = [
  "Todos",
  "Frontend",
  "Game Dev",
  "Programming",
  "Data Science",
  "AI",
  "DevOps",
  "Inovação",
  "Soft Skills",
]

export function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showAll, setShowAll] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const filteredCertificates =
    selectedCategory === "Todos" ? certificates : certificates.filter((cert) => cert.category === selectedCategory)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3)
      else if (window.innerWidth >= 768) setItemsPerView(2)
      else setItemsPerView(1)
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  const nextSlide = () => {
    if (currentIndex < filteredCertificates.length - itemsPerView) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }


  const visibleCertificates = showAll
    ? filteredCertificates
    : filteredCertificates.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 bg-gradient-to-b from-[#112240] to-[#0a192f] overflow-hidden"
      id="certificates"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-[#f5f0e1]">
            Certificações & Conquistas
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#64ffda] to-[#b38728] mx-auto mb-8" />
          <p className="text-[#8892b0] max-w-2xl mx-auto">
            Uma coleção de {certificates.length} certificações que demonstram minha jornada de aprendizado contínuo
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentIndex(0)
                setShowAll(false)
              }}
              className={`
                px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
                ${selectedCategory === category
                  ? "bg-[#64ffda] text-[#0a192f] shadow-lg"
                  : "bg-[#112240] text-[#64ffda] border border-[#64ffda]/30 hover:border-[#64ffda] hover:bg-[#64ffda]/10"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        {!showAll && (
          <div className="relative mb-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0 || isTransitioning}
                className="p-3 bg-[#112240] border border-[#64ffda]/30 rounded-lg text-[#64ffda] hover:border-[#64ffda] hover:bg-[#64ffda]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex-1 mx-6 overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                  onTransitionEnd={() => {
                    if (currentIndex >= filteredCertificates.length) {
                      setIsTransitioning(false)
                      setCurrentIndex(0) // volta para o início
                    }
                  }}
                >
                  {[...filteredCertificates, ...filteredCertificates.slice(0, itemsPerView)].map((cert, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <CertificateCard certificate={cert} onClick={() => setSelectedCert(cert)} />
                    </div>
                  ))}
                </div>
              </div>




              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="p-3 bg-[#112240] border border-[#64ffda]/30 rounded-lg text-[#64ffda] hover:border-[#64ffda] hover:bg-[#64ffda]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.ceil(filteredCertificates.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true)
                      setCurrentIndex(index * itemsPerView)
                      setTimeout(() => setIsTransitioning(false), 500)
                    }
                  }}
                  className={`
                    transition-all duration-500 rounded-full
                    ${Math.floor(currentIndex / itemsPerView) === index
                      ? "w-8 h-3 bg-[#64ffda]"
                      : "w-3 h-3 bg-[#64ffda]/30 hover:bg-[#64ffda]/50 hover:scale-125"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        )}

        {/* Show All Grid */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} onClick={() => setSelectedCert(cert)} />
            ))}
          </div>
        )}

        {/* Toggle View Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-gradient-to-r from-[#64ffda] to-[#5e2ca5] text-[#0a192f] font-serif font-bold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {showAll ? "Ver Carousel" : `Ver Todos (${certificates.length})`}
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />}
    </section>
  )
}

// Certificate Card Component
function CertificateCard({ certificate, onClick }: { certificate: Certificate; onClick: () => void }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer backdrop-blur-sm border rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 ${certificate.featured
        ? "bg-gradient-to-br from-[#64ffda]/10 to-[#b38728]/10 border-[#64ffda]/40 shadow-lg shadow-[#64ffda]/20"
        : "bg-[#112240]/50 border-[#64ffda]/20 hover:border-[#64ffda]/40"
        }`}
    >
      {/* Featured Badge */}
      {certificate.featured && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 text-xs font-mono bg-gradient-to-r from-[#64ffda] to-[#b38728] text-[#0a192f] rounded-full font-bold">
            ⭐ DESTAQUE
          </span>
        </div>
      )}

      {/* Certificate Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#172a45] to-[#0a192f] overflow-hidden">
        {!imageError ? (
          <img
            src={certificate.image || "/placeholder.svg"}
            alt={certificate.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-[#64ffda]">
              <Award size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-mono">Imagem não encontrada</p>
              <p className="text-xs text-[#8892b0] mt-1">Execute o script de conversão</p>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink size={20} className="text-[#64ffda]" />
        </div>
      </div>

      {/* Certificate Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`px-2 py-1 text-xs font-mono rounded border ${certificate.featured
              ? "bg-[#64ffda]/20 text-[#64ffda] border-[#64ffda]/40"
              : "bg-[#64ffda]/10 text-[#64ffda] border-[#64ffda]/20"
              }`}
          >
            {certificate.category}
          </span>
          <div className="flex items-center gap-2 text-xs text-[#8892b0]">
            {certificate.hours && <span className="flex items-center gap-1">⏱️ {certificate.hours}h</span>}
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {certificate.date.split(" de ")[2]} {/* Mostra apenas o ano */}
            </span>
          </div>
        </div>

        <h3
          className={`font-serif text-lg font-medium mb-1 transition-colors line-clamp-2 ${certificate.featured
            ? "text-[#64ffda] group-hover:text-[#b38728]"
            : "text-[#f5f0e1] group-hover:text-[#64ffda]"
            }`}
        >
          {certificate.title}
        </h3>

        <p className="text-sm text-[#8892b0] mb-3">{certificate.issuer}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {certificate.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-1 text-xs bg-[#172a45] text-[#64ffda] rounded">
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 text-xs bg-[#172a45] text-[#8892b0] rounded">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Certificate Modal Component
function CertificateModal({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a192f] border border-[#64ffda]/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#64ffda]/20">
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-2xl text-[#f5f0e1]">{certificate.title}</h3>
            {certificate.featured && (
              <span className="px-3 py-1 text-sm font-mono bg-gradient-to-r from-[#64ffda] to-[#b38728] text-[#0a192f] rounded-full font-bold">
                ⭐ DESTAQUE
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-[#8892b0] hover:text-[#64ffda] transition-colors">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Certificate Image */}
            <div className="space-y-4">
              <img
                src={certificate.image || "/placeholder.svg"}
                alt={certificate.title}
                className="w-full rounded-lg border border-[#64ffda]/20"
              />

              {certificate.pdfUrl && (
                <a
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-lg hover:bg-[#64ffda]/90 transition-colors"
                >
                  <ExternalLink size={16} />
                  Ver PDF Original
                </a>
              )}
            </div>

            {/* Certificate Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-[#64ffda] mb-2">Detalhes</h4>
                <div className="space-y-2 text-[#8892b0]">
                  <p>
                    <strong>Emissor:</strong> {certificate.issuer}
                  </p>
                  <p>
                    <strong>Data de Conclusão:</strong> {certificate.date}
                  </p>
                  <p>
                    <strong>Categoria:</strong> {certificate.category}
                  </p>
                  {certificate.hours && (
                    <p>
                      <strong>Carga Horária:</strong> {certificate.hours} horas
                    </p>
                  )}
                  {certificate.credentialId && (
                    <p>
                      <strong>ID do Certificado:</strong> {certificate.credentialId}
                    </p>
                  )}
                </div>
              </div>

              {certificate.description && (
                <div>
                  <h4 className="text-lg font-semibold text-[#64ffda] mb-2">Descrição</h4>
                  <p className="text-[#8892b0] leading-relaxed">{certificate.description}</p>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-[#64ffda] mb-3">
                  Habilidades Desenvolvidas ({certificate.skills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, index) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-lg border transition-all duration-200 ${index < 3
                        ? "bg-[#64ffda]/20 text-[#64ffda] border-[#64ffda]/40 font-medium"
                        : "bg-[#112240] text-[#8892b0] border-[#64ffda]/20 hover:border-[#64ffda]/40 hover:text-[#64ffda]"
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
