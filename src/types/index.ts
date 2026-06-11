export type ThemeId = "mystic" | "luxury" | "brutalist" | "streetwear" | "agency" | "local"
export type Archetype = "visionary" | "rebel" | "teacher" | "explorer" | "craftsman" | "innovator"
export type ConversionGoal = "leads" | "whatsapp" | "booking" | "catalog" | "branding"

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string | null
}

export interface Testimonial {
  id: string
  text: string
  name: string
}

export interface BrandDNA {
  archetype: Archetype | null
  elegance: number  // 0 = elegant, 100 = playful
  minimalism: number // 0 = minimal, 100 = expressive
  modernity: number  // 0 = modern, 100 = classic
}

export interface TrustData {
  reviews: boolean
  photos: boolean
  certificates: boolean
  portfolio: boolean
  partners: boolean
}

export interface FormData {
  studentName: string
  businessName: string
  tagline: string
  about: string
  theme: ThemeId
  logo: string | null
  products: Product[]
  testimonials: Testimonial[]
  brandDna: BrandDNA
  trust: TrustData
  conversionGoal: ConversionGoal
  contact: {
    whatsapp: string
    email: string
    location: string
    instagram: string
    shopee: string
    tiktok: string
  }
}

export interface ThemeConfig {
  id: ThemeId
  label: string
  subtitle: string
  emoji: string
  colors: {
    primary: string
    secondary: string
    accent: string
    bg: string
    surface: string
    text: string
    textMuted: string
    glow: string
  }
}
