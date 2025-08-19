"use client"

export function ImperialFooter() {
  return (
    <footer className="py-12 px-6 bg-[#0a192f] border-t border-[#b38728] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Footer Glyph */}
          <div className="w-8 h-8 bg-[#b38728]/70 rounded-full relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-[#b38728] transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-[#b38728] transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s" }} />
          </div>

          <p className="font-mono text-[#f5f0e1]/80 text-center">© 2025 Thiago Pereira Diniz | Full Stack Developer</p>
        </div>

        {/* Particle Boundary */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64ffda] via-[#ff8a00] via-[#64ffda] to-transparent" />
      </div>
    </footer>
  )
}
