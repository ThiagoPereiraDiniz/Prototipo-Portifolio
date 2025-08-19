import { ImperialHeader } from "@/components/ImperialHeader"
import { OptimizedHeroSection } from "@/components/OptimizedHeroSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { SkillsSection } from "@/components/SkillsSection"
import { ContactSection } from "@/components/ContactSection"
import { ImperialFooter } from "@/components/ImperialFooter"
import { AboutSection } from "@/components/AboutSection"
import { CertificatesSection } from "@/components/CertificatesSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-[#f5f0e1] overflow-x-hidden">
      <ImperialHeader />
      <main>
        <OptimizedHeroSection />
        <AboutSection />
        <SkillsSection />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <ImperialFooter />
    </div>
  )
}
