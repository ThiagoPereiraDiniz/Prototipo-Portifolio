"use client"

import { useState } from "react"

interface QuantumFormFieldProps {
  label: string
  type?: "text" | "email" | "textarea"
  id: string
  name: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

export function QuantumFormField({
  label,
  type = "text",
  id,
  name,
  required = false,
  value,
  onChange,
  onBlur,
  onFocus,
  className = "",
  placeholder,
  disabled = false,
  error,
}: QuantumFormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const baseClasses = `
    w-full px-4 py-3 bg-[#0a192f]/50 border rounded-lg
    text-[#f5f0e1] placeholder-[#8892b0]
    transition-all duration-300 focus:outline-none
    ${isFocused ? "border-[#64ffda] shadow-[0_0_10px_rgba(100,255,218,0.3)]" : "border-[#64ffda]/30"}
    ${error ? "border-red-500" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-[#64ffda]">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={4}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseClasses}
        />
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}
