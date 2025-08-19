import type React from "react"
export interface PerfMetrics {
  startTime: number
  frameCount: number
  fps: number
  lastFrameTime: number
  scrollEvents?: number
  lastScrollTime?: number
  scrollThrottleMs?: number
}

export interface ParticleConfig {
  particleCount: number
  minSize: number
  maxSize: number
  minSpeed: number
  maxSpeed: number
  colors: string[]
  containerWidth: number
  containerHeight: number
  glowIntensity: number
  collisionRadius: number
  particleLifetime: number
  emissionRate: number
  boundaryElasticity: number
}

export interface MousePosition {
  x: number | undefined
  y: number | undefined
  radius: number
}

export interface ProjectData {
  id: string
  title: string
  description: string
  technologies: string[]
  link: string
  hologramType: "arrakis-ui" | "thopter-patterns" | "bene-gesserit"
}

export interface SkillData {
  title: string
  percentage: number
  category: "design" | "development" | "quantum"
}

export interface LoreEntry {
  threshold: number
  title: string
  content: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface PlanetRendererProps {
  className?: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

export interface ParticleSystemProps {
  className?: string
  config?: Partial<ParticleConfig>
  mouseInteraction?: boolean
}

export interface NavigationItem {
  href: string
  label: string
  scrollTarget: string
}

export interface ThreeJSScene {
  scene: any
  camera: any
  renderer: any
  planet: any
  moon1: any
  moon2: any
}

// Global window extensions
declare global {
  interface Window {
    THREE?: any
    planetController?: ThreeJSScene
    spiceParticles?: {
      config: ParticleConfig
      addParticle: () => void
      removeParticle: () => void
      setCollisionRadius: (radius: number) => void
    }
    portfolioInteractions?: {
      perfMetrics: PerfMetrics
      isInViewport: (element: Element, offset?: number) => boolean
    }
    perfMetrics?: PerfMetrics
  }
}

export interface AnimationConfig {
  duration: number
  easing: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
  delay?: number
  iterations?: number | "infinite"
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"
}

export interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  animationClass?: string
  delay?: number
}

export interface ThreeJSMaterial {
  uniforms?: {
    [key: string]: { value: any }
  }
  vertexShader?: string
  fragmentShader?: string
  transparent?: boolean
  opacity?: number
}

export interface ThreeJSGeometry {
  setAttribute: (name: string, attribute: any) => void
  dispose: () => void
}

export interface ThreeJSMesh {
  geometry: ThreeJSGeometry
  material: ThreeJSMaterial
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
}

export interface PlanetRendererState {
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
  fps?: number
  isWebGLSupported: boolean
}

export interface FormValidation {
  isValid: boolean
  errors: Record<string, string[]>
  touched: Record<string, boolean>
}

export interface FormFieldConfig {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  customValidator?: (value: string) => string | null
}

export interface QuantumFormFieldProps {
  label: string
  type?: "text" | "email" | "textarea" | "password"
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
  validation?: FormFieldConfig
  error?: string
}

export interface ParticleState {
  x: number
  y: number
  z: number
  velocityX: number
  velocityY: number
  velocityZ: number
  size: number
  baseSize: number
  color: string
  opacity: number
  age: number
  lifetime: number
  isActive: boolean
}

export interface ParticleForce {
  x: number
  y: number
  z: number
  strength: number
  radius: number
  type: "attract" | "repel" | "orbital"
}

export interface ParticleEmitter {
  position: { x: number; y: number; z: number }
  rate: number
  burst: number
  lifetime: number
  spread: number
  velocity: { min: number; max: number }
  size: { min: number; max: number }
  colors: string[]
}

export interface HologramProjectProps {
  project: ProjectData
  isHovered: boolean
  onHover: (projectId: string | null) => void
  className?: string
}

export interface SkillRingProps {
  skill: SkillData
  isVisible: boolean
  animationDelay?: number
  size?: "sm" | "md" | "lg"
}

export interface NavigationState {
  activeSection: string
  isMenuOpen: boolean
  scrollDirection: "up" | "down"
  lastScrollY: number
}

export interface SectionVisibility {
  hero: boolean
  projects: boolean
  skills: boolean
  contact: boolean
}

export interface ThemeColors {
  primary: {
    blue: string
    secondary: string
    accent: string
  }
  spice: {
    orange: string
    glow: string
  }
  fantasy: {
    purple: string
    gold: string
    parchment: string
    emissive: string
  }
}

export interface ResponsiveBreakpoints {
  sm: number
  md: number
  lg: number
  xl: number
  "2xl": number
}

export interface LayoutConfig {
  maxWidth: string
  padding: {
    mobile: string
    tablet: string
    desktop: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
}

export interface ErrorState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  retryCount: number
  maxRetries: number
}

export interface FallbackProps {
  error?: Error
  resetError?: () => void
  className?: string
}

export interface WebVitals {
  CLS: number
  FID: number
  FCP: number
  LCP: number
  TTFB: number
}

export interface PerformanceEntry {
  name: string
  entryType: string
  startTime: number
  duration: number
}

export interface ResourceTiming extends PerformanceEntry {
  initiatorType: string
  transferSize: number
  encodedBodySize: number
  decodedBodySize: number
}

export interface A11yConfig {
  reducedMotion: boolean
  highContrast: boolean
  screenReader: boolean
  keyboardNavigation: boolean
}

export interface AriaAttributes {
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
  "aria-expanded"?: boolean
  "aria-hidden"?: boolean
  "aria-live"?: "polite" | "assertive" | "off"
  role?: string
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  message: string
  timestamp: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

export interface ContactSubmission {
  id: string
  formData: ContactFormData
  timestamp: string
  status: "pending" | "sent" | "failed"
  retryCount: number
}

export interface ComponentState<T = any> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdated: string | null
}

export interface AsyncOperation<T = any> {
  execute: () => Promise<T>
  cancel: () => void
  retry: () => Promise<T>
  status: "idle" | "pending" | "success" | "error"
}

export interface CustomEventMap {
  "particle:burst": CustomEvent<{ count: number; delay: number }>
  "planet:loaded": CustomEvent<{ scene: ThreeJSScene }>
  "form:submit": CustomEvent<{ data: ContactFormData }>
  "navigation:change": CustomEvent<{ section: string }>
  "scroll:threshold": CustomEvent<{ percentage: number }>
}

export interface EventEmitter {
  on<K extends keyof CustomEventMap>(event: K, listener: (e: CustomEventMap[K]) => void): void
  off<K extends keyof CustomEventMap>(event: K, listener: (e: CustomEventMap[K]) => void): void
  emit<K extends keyof CustomEventMap>(event: K, data: CustomEventMap[K]["detail"]): void
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type NonEmptyArray<T> = [T, ...T[]]

export type Awaitable<T> = T | Promise<T>

export type ValueOf<T> = T[keyof T]

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

export type ComponentWithChildren<P = {}> = P & {
  children?: React.ReactNode
}

export type ComponentWithClassName<P = {}> = P & {
  className?: string
}

export type ComponentWithRef<T, P = {}> = P & {
  ref?: React.Ref<T>
}

export type ForwardRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  ComponentWithRef<T, P> & React.RefAttributes<T>
>

export interface UseAsyncReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: () => Promise<void>
  reset: () => void
}

export interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T | ((prev: T) => T)) => void
  removeValue: () => void
}

export interface UseDebounceReturn<T> {
  debouncedValue: T
  cancel: () => void
  flush: () => void
}
