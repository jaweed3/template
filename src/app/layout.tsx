import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Landing Page Builder — SMK",
  description: "Buat landing page usahamu sendiri dalam 5 menit, gratis!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full font-sans bg-white text-black">{children}</body>
    </html>
  )
}
