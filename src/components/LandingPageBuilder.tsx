"use client"

import { useState } from "react"
import { FormData, ThemeId } from "@/types"
import { StepTemplate } from "./StepTemplate"
import { StepProfile } from "./StepProfile"
import { StepProducts } from "./StepProducts"
import { StepTestimonials } from "./StepTestimonials"
import { StepContact } from "./StepContact"
import { StepPreview } from "./StepPreview"

const initialData: FormData = {
  studentName: "",
  businessName: "",
  tagline: "",
  about: "",
  theme: "ungu",
  logo: null,
  products: [{ id: "1", name: "", description: "", price: "", image: null }],
  testimonials: [{ id: "1", text: "", name: "" }],
  contact: {
    whatsapp: "",
    email: "",
    location: "",
    instagram: "",
    shopee: "",
    tiktok: "",
  },
}

const stepLabels = ["Tema", "Profil", "Produk", "Testimoni", "Kontak", "Preview"]

export function LandingPageBuilder() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(initialData)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return data.studentName.trim() && data.businessName.trim()
    if (step === 2) return data.products.some((p) => p.name.trim())
    return true
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    setError(null)
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Gagal publish")
      setPublishedUrl(result.url)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsPublishing(false)
    }
  }

  if (publishedUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 glass-glow rounded-3xl p-12 animate-slide-up">
          <div className="text-7xl animate-float">🎉</div>
          <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-display)" }}>Selamat!</h2>
          <p className="text-[#6B6B8D]">Landing page-mu sudah live!</p>
          <a
            href={publishedUrl}
            target="_blank"
            className="inline-flex items-center justify-center w-full gap-2 btn-neon-primary text-lg"
          >
            🔗 Lihat Landing Page
          </a>
          <div className="p-4 rounded-2xl bg-white/5 text-sm text-[#6B6B8D] break-all border border-white/5">
            {publishedUrl}
          </div>
          <button
            onClick={() => { setPublishedUrl(null); setStep(0); setData(initialData) }}
            className="text-sm text-[#6B6B8D] hover:text-white transition underline"
          >
            Buat landing page lain
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl" style={{ filter: "drop-shadow(0 0 8px rgba(0,212,255,0.5))" }}>⚡</span>
            <h1 className="font-bold text-lg neon-text" style={{ fontFamily: "var(--font-display)" }}>
              LP Builder
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#3B3B54] font-mono">{String(step + 1).padStart(2, "0")}/06</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-[2px] bg-white/5">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${((step + 1) / 6) * 100}%`,
              background: "linear-gradient(90deg, #00D4FF, #7000FF, #FF2D95)",
              boxShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
          />
        </div>
      </header>

      {/* BODY */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {stepLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className="flex items-center gap-2 group"
            >
              <div className={`step-dot ${i === step ? "active" : i < step ? "done" : "pending"}`} />
              <span
                className={`text-xs hidden sm:inline transition-colors ${
                  i === step ? "text-white" : "text-[#3B3B54]"
                }`}
              >
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <span className="w-6 h-px bg-white/5 hidden sm:block" />
              )}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div className="glass-glow rounded-3xl p-8 md:p-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {step === 0 && (
            <StepTemplate
              value={data.theme}
              onChange={(theme: ThemeId) => setData({ ...data, theme })}
            />
          )}
          {step === 1 && <StepProfile data={data} onChange={setData} />}
          {step === 2 && <StepProducts data={data} onChange={setData} />}
          {step === 3 && <StepTestimonials data={data} onChange={setData} />}
          {step === 4 && <StepContact data={data} onChange={setData} />}
          {step === 5 && (
            <StepPreview data={data} onPublish={handlePublish} isPublishing={isPublishing} />
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-slide-up">
            {error}
          </div>
        )}
      </main>

      {/* NAVIGATION */}
      <footer className="border-t border-white/5 glass">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="btn-neon-ghost"
          >
            ← Sebelumnya
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="btn-neon-primary"
            >
              Lanjut →
            </button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </div>
  )
}
