export type ThemeId = "ungu" | "abu" | "krem" | "pink"

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

export interface FormData {
  studentName: string
  businessName: string
  tagline: string
  about: string
  theme: ThemeId
  logo: string | null
  products: Product[]
  testimonials: Testimonial[]
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
  description: string
  emoji: string
  colors: {
    primary: string
    secondary: string
    accent: string
    bg: string
    bgLight: string
    text: string
    textMuted: string
    gradient: string
  }
}
