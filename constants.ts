import type { ThemeColors, ResponsiveBreakpoints, LayoutConfig, ParticleConfig } from "@/types"

export const THEME_COLORS: ThemeColors = {
  primary: {
    blue: "#0a192f",
    secondary: "#172a45",
    accent: "#64ffda",
  },
  spice: {
    orange: "#ff8a00",
    glow: "rgba(255, 138, 0, 0.3)",
  },
  fantasy: {
    purple: "#5e2ca5",
    gold: "#b38728",
    parchment: "#f5f0e1",
    emissive: "rgba(179, 135, 40, 0.7)",
  },
} as const

export const BREAKPOINTS: ResponsiveBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export const LAYOUT: LayoutConfig = {
  maxWidth: "1400px",
  padding: {
    mobile: "1rem",
    tablet: "2rem",
    desktop: "3rem",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
} as const

export const DEFAULT_PARTICLE_CONFIG: ParticleConfig = {
  particleCount: 30,
  minSize: 5,
  maxSize: 20,
  minSpeed: 0.5,
  maxSpeed: 2,
  colors: ["rgba(255, 138, 0, 0.7)", "rgba(179, 135, 40, 0.6)", "rgba(100, 255, 218, 0.5)"],
  containerWidth: 0,
  containerHeight: 0,
  glowIntensity: 0.7,
  collisionRadius: 20,
  particleLifetime: 8000,
  emissionRate: 500,
  boundaryElasticity: 0.8,
} as const

export const ANIMATION_DURATIONS = {
  fast: 200,
  medium: 400,
  slow: 800,
  planet: 10000,
  particle: 8000,
} as const

export const Z_INDEX = {
  base: 1,
  hover: 2,
  dropdown: 10,
  sticky: 20,
  modal: 100,
  navigation: 1000,
  tooltip: 2000,
} as const

export const PERFORMANCE_THRESHOLDS = {
  fps: {
    good: 60,
    acceptable: 30,
    poor: 15,
  },
  lcp: {
    good: 2500,
    acceptable: 4000,
  },
  fid: {
    good: 100,
    acceptable: 300,
  },
} as const

export const ACCESSIBILITY_SETTINGS = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  highContrastQuery: "(prefers-contrast: high)",
  colorSchemeQuery: "(prefers-color-scheme: dark)",
  focusVisibleSupported: CSS.supports("selector(:focus-visible)"),
} as const

export const API_ENDPOINTS = {
  contact: "/api/contact",
  analytics: "/api/analytics",
  health: "/api/health",
} as const

export const ERROR_MESSAGES = {
  webgl: "WebGL is not supported in your browser",
  threejs: "Three.js failed to load",
  particle: "Particle system initialization failed",
  form: "Form submission failed",
  network: "Network error occurred",
  generic: "An unexpected error occurred",
} as const

export const SUCCESS_MESSAGES = {
  form: "Message sent successfully",
  load: "Application loaded successfully",
  render: "3D scene rendered successfully",
} as const
