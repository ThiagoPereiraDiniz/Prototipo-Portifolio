declare global {
  namespace THREE {
    // Core Three.js classes
    class WebGLRenderer {
      constructor(parameters?: {
        canvas?: HTMLCanvasElement
        antialias?: boolean
        alpha?: boolean
        premultipliedAlpha?: boolean
        preserveDrawingBuffer?: boolean
        powerPreference?: "default" | "high-performance" | "low-power"
      })
      setSize(width: number, height: number): void
      setPixelRatio(ratio: number): void
      render(scene: Scene, camera: Camera): void
      dispose(): void
      domElement: HTMLCanvasElement
    }

    class Scene {
      constructor()
      add(object: Object3D): void
      remove(object: Object3D): void
      children: Object3D[]
    }

    class PerspectiveCamera extends Camera {
      constructor(fov?: number, aspect?: number, near?: number, far?: number)
      aspect: number
      fov: number
      near: number
      far: number
      updateProjectionMatrix(): void
    }

    class Camera extends Object3D {
      position: Vector3
    }

    class Object3D {
      position: Vector3
      rotation: Euler
      scale: Vector3
      add(object: Object3D): void
      remove(object: Object3D): void
    }

    class Vector3 {
      constructor(x?: number, y?: number, z?: number)
      x: number
      y: number
      z: number
      set(x: number, y: number, z: number): Vector3
    }

    class Euler {
      constructor(x?: number, y?: number, z?: number, order?: string)
      x: number
      y: number
      z: number
    }

    class Color {
      constructor(color?: string | number)
      r: number
      g: number
      b: number
    }

    // Geometry classes
    class BufferGeometry {
      constructor()
      setAttribute(name: string, attribute: BufferAttribute): void
      dispose(): void
    }

    class SphereGeometry extends BufferGeometry {
      constructor(radius?: number, widthSegments?: number, heightSegments?: number)
    }

    class BufferAttribute {
      constructor(array: ArrayLike<number>, itemSize: number)
    }

    class Float32BufferAttribute extends BufferAttribute {
      constructor(array: ArrayLike<number>, itemSize: number)
    }

    // Material classes
    class Material {
      transparent?: boolean
      opacity?: number
      dispose(): void
    }

    class ShaderMaterial extends Material {
      constructor(parameters?: {
        uniforms?: { [key: string]: { value: any } }
        vertexShader?: string
        fragmentShader?: string
        transparent?: boolean
        opacity?: number
      })
      uniforms: { [key: string]: { value: any } }
    }

    class MeshStandardMaterial extends Material {
      constructor(parameters?: {
        color?: number | string
        roughness?: number
        metalness?: number
        emissive?: number | string
        emissiveIntensity?: number
      })
      color: Color
      roughness: number
      metalness: number
      emissive: Color
      emissiveIntensity: number
    }

    class LineBasicMaterial extends Material {
      constructor(parameters?: {
        color?: number | string
        transparent?: boolean
        opacity?: number
      })
      color: Color
    }

    class PointsMaterial extends Material {
      constructor(parameters?: {
        color?: number | string
        size?: number
        transparent?: boolean
        opacity?: number
      })
      color: Color
      size: number
    }

    // Mesh and other objects
    class Mesh extends Object3D {
      constructor(geometry?: BufferGeometry, material?: Material)
      geometry: BufferGeometry
      material: Material
    }

    class Line extends Object3D {
      constructor(geometry?: BufferGeometry, material?: Material)
      geometry: BufferGeometry
      material: Material
    }

    class Points extends Object3D {
      constructor(geometry?: BufferGeometry, material?: Material)
      geometry: BufferGeometry
      material: Material
    }

    // Light classes
    class Light extends Object3D {
      color: Color
      intensity: number
    }

    class AmbientLight extends Light {
      constructor(color?: number | string, intensity?: number)
    }

    class DirectionalLight extends Light {
      constructor(color?: number | string, intensity?: number)
      position: Vector3
    }

    class PointLight extends Light {
      constructor(color?: number | string, intensity?: number, distance?: number)
      position: Vector3
      distance: number
    }
  }

  interface Window {
    THREE: typeof THREE
  }
}

export {}
