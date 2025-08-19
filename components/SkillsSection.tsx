"use client"

import { useRef, useEffect, useState } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface SkillData {
  title: string
  percentage: number
  category: "frontend" | "backend" | "language"
}

interface LoreEntry {
  threshold: number
  title: string
  content: string
}

const skills: SkillData[] = [
  { title: "JavaScript", percentage: 100, category: "language" },
  { title: "HTML5", percentage: 100, category: "frontend" },
  { title: "CSS3", percentage: 100, category: "frontend" },
  { title: "React", percentage: 95, category: "frontend" },
  { title: "Node.js", percentage: 90, category: "backend" },
  { title: "Python", percentage: 85, category: "language" },
]

const loreEntries: LoreEntry[] = [
  {
    threshold: 0.3,
    title: "Fundamentos Sólidos",
    content:
      "A base do desenvolvimento web moderno está na tríade HTML5, CSS3 e JavaScript. Dominar essas tecnologias é essencial para criar experiências digitais excepcionais.",
  },
  {
    threshold: 0.6,
    title: "Especialização Front-End",
    content:
      "React e suas tecnologias associadas permitem criar interfaces de usuário dinâmicas e responsivas, transformando ideias em aplicações web interativas.",
  },
  {
    threshold: 0.9,
    title: "Full Stack Development",
    content:
      "A combinação de Node.js no backend com React no frontend cria um ecossistema JavaScript completo, permitindo desenvolvimento ágil e eficiente.",
  },
]

function SkillRing({ skill, isVisible }: { skill: SkillData; isVisible: boolean }) {
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    if (isVisible && !animationStarted) {
      setAnimationStarted(true)
    }
  }, [isVisible, animationStarted])

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (skill.percentage / 100) * circumference

  const getSkillColor = (category: string) => {
    switch (category) {
      case "language":
        return "#64ffda"
      case "frontend":
        return "#f5f0e1"
      case "backend":
        return "#b38728"
      default:
        return "#64ffda"
    }
  }

  const skillColor = getSkillColor(skill.category)

  return (
    <div className="flex flex-col items-center w-48">
      <div className="relative w-32 h-32 mb-6">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(100, 255, 218, 0.1)" strokeWidth="5" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={skillColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animationStarted ? strokeDashoffset : circumference}
            className="transition-all duration-[3s] ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xl" style={{ color: skillColor }}>
            {skill.percentage}%
          </span>
        </div>
      </div>
      <h3 className="font-serif text-center text-[#f5f0e1] leading-tight">{skill.title}</h3>
    </div>
  )
}

function LoreContainer() {
  const [currentLore, setCurrentLore] = useState(loreEntries[0])
  const [isVisible, setIsVisible] = useState(false)
  const loreRef = useRef<HTMLDivElement>(null)
  const isInView = useIntersectionObserver(loreRef, { threshold: 0.3 })

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
  }, [isInView])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)

      let activeEntry = loreEntries[0]
      for (let i = loreEntries.length - 1; i >= 0; i--) {
        if (scrollPercent >= loreEntries[i].threshold) {
          activeEntry = loreEntries[i]
          break
        }
      }

      if (activeEntry !== currentLore) {
        setCurrentLore(activeEntry)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentLore])

  return (
    <div
      ref={loreRef}
      className={`
        p-6 bg-gradient-to-br from-[#0a192f]/80 to-[#5e2ca5]/30 
        rounded-lg border border-[#b38728] 
        shadow-[0_0_20px_rgba(179,135,40,0.1)]
        transform transition-all duration-700
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}
      `}
    >
      <h4 className="font-serif text-[#b38728] text-lg mb-3">{currentLore.title}</h4>
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#b38728] to-transparent" />
        <p className="text-[#f5f0e1] italic leading-relaxed">{currentLore.content}</p>
      </div>
    </div>
  )
}

export function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(skillsRef, { threshold: 0.2 })

  return (
    <section id="skills" className="py-20 px-6 bg-[#0a192f] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-[#f5f0e1]">
            Abilities & Proficiencies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#64ffda] to-[#b38728] mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div ref={skillsRef} className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {skills.map((skill) => (
                <SkillRing key={skill.title} skill={skill} isVisible={isVisible} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <LoreContainer />
          </div>
        </div>
      </div>
    </section>
  )
}
