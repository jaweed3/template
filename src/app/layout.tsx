import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/CustomCursor"
import MeshBackground from "@/components/MeshBackground"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Brand Launch Studio",
  description: "Launch your brand identity — from zero to live in minutes",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        <MeshBackground />
        {children}
      </body>
    </html>
  )
}
