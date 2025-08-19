"use client"

interface LoadingIndicatorProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "planet" | "spice" | "quantum"
}

export function LoadingIndicator({ className = "", size = "md", variant = "planet" }: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const variantClasses = {
    planet: "border-t-[#64ffda] border-b-[#ff8a00]",
    spice: "border-t-[#ff8a00] border-b-[#b38728]",
    quantum: "border-t-[#5e2ca5] border-b-[#64ffda]",
  }

  return (
    <div
      className={`loading-spinner ${sizeClasses[size]} border-4 border-transparent ${variantClasses[variant]} rounded-full ${className}`}
    >
      <div
        className="absolute inset-2 border-2 border-transparent border-t-[#b38728] border-b-[#5e2ca5] rounded-full loading-spinner"
        style={{ animationDirection: "reverse", animationDuration: "3s" }}
      />
      <div
        className="absolute inset-4 border-2 border-transparent border-t-[#ff8a00] border-b-[#64ffda] rounded-full loading-spinner"
        style={{ animationDuration: "1.5s" }}
      />
    </div>
  )
}
