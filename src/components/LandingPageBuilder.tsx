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

const steps = [
  { num: 1, label: "Tema", icon: "🎨" },
  { num: 2, label: "Profil", icon: "📋" },
  { num: 3, label: "Produk", icon: "📦" },
  { num: 4, label: "Testimoni", icon: "💬" },
  { num: 5, label: "Kontak", icon: "📞" },
  { num: 6, label: "Preview", icon: "🚀" },
]

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
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#07070D" }}>
        <div className="max-w-md w-full text-center space-y-6 glass rounded-3xl p-12">
          <div className="text-7xl">🎉</div>
          <h2 className="text-3xl font-bold gradient-text">Selamat!</h2>
          <p className="text-[#8B8BA7]">Landing page-mu sudah live!</p>
          <a
            href={publishedUrl}
            target="_blank"
            className="inline-flex items-center justify-center w-full gap-2 btn-primary text-lg"
          >
            🔗 Lihat Landing Page
          </a>
          <div className="p-4 rounded-2xl bg-white/5 text-sm text-[#8B8BA7] break-all border border-white/5">
            {publishedUrl}
          </div>
          <button
            onClick={() => { setPublishedUrl(null); setStep(0); setData(initialData) }}
            className="text-sm text-[#8B8BA7] hover:text-white transition underline"
          >
            Buat landing page lain
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#07070D" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <h1 className="font-bold text-lg gradient-text">
              Landing Page Builder
            </h1>
          </div>
          <span className="text-sm text-[#8B8BA7]">
            Step {step + 1}/{steps.length}
          </span>
        </div>
        {/* Progress */}
        <div className="h-[2px] bg-white/5">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${((step + 1) / steps.length) * 100}%`,
              background: "linear-gradient(90deg, #818CF8, #C084FC, #E879F9)",
              boxShadow: "0 0 20px rgba(129,140,248,0.3)",
            }}
          />
        </div>
      </header>

      {/* BODY */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {steps.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                i === step
                  ? "glass text-white font-semibold"
                  : i < step
                  ? "text-[#818CF8]"
                  : "text-[#3B3B54]"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="glass rounded-3xl p-8 md:p-10">
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
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
            className="btn-ghost"
          >
            ← Sebelumnya
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="btn-primary"
            >
              Selanjutnya →
            </button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </div>
  )
}
