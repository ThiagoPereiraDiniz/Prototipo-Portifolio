import type { PerfMetrics, ParticleConfig, ThreeJSScene, A11yConfig } from "./index"

declare global {
  interface Window {
    // Performance monitoring
    perfMetrics?: PerfMetrics

    // Particle system API
    spiceParticles?: {
      config: ParticleConfig
      addParticle: () => void
      removeParticle: () => void
      setCollisionRadius: (radius: number) => void
    }

    // Planet renderer API
    planetController?: ThreeJSScene

    // Portfolio interactions API
    portfolioInteractions?: {
      perfMetrics: PerfMetrics
      isInViewport: (element: Element, offset?: number) => boolean
    }

    // Accessibility preferences
    a11yConfig?: A11yConfig

    // Debug utilities
    __DEV__?: boolean
    __PORTFOLIO_DEBUG__?: boolean
  }

  // CSS Custom Properties
  interface CSSStyleDeclaration {
    "--color-primary-blue"?: string
    "--color-secondary-blue"?: string
    "--color-accent-blue"?: string
    "--color-spice-orange"?: string
    "--color-spice-glow"?: string
    "--color-mystic-purple"?: string
    "--color-ancient-gold"?: string
    "--color-parchment"?: string
    "--color-glyph-emissive"?: string
  }

  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test"
      NEXT_PUBLIC_SITE_URL?: string
      NEXT_PUBLIC_ANALYTICS_ID?: string
      NEXT_PUBLIC_DEBUG_MODE?: string
    }
  }

  // Custom events
  interface WindowEventMap {
    "portfolio:loaded": CustomEvent<{ timestamp: number }>
    "portfolio:error": CustomEvent<{ error: Error; component: string }>
    "particle:burst": CustomEvent<{ count: number; delay: number }>
    "planet:rendered": CustomEvent<{ fps: number }>
    "form:submitted": CustomEvent<{ success: boolean; data: any }>
  }
}

// Module declarations for assets
declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.jpeg" {
  const content: string
  export default content
}

declare module "*.webp" {
  const content: string
  export default content
}

declare module "*.gif" {
  const content: string
  export default content
}

// CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.module.scss" {
  const classes: { [key: string]: string }
  export default classes
}
