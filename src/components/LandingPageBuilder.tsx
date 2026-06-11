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

const steps = ["Tema", "Profil", "Produk", "Testimoni", "Kontak", "Preview"]

export function LandingPageBuilder() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(initialData)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return data.studentName.trim() && data.businessName.trim()
    if (step === 2) {
      const valid = data.products.filter((p) => p.name.trim())
      return valid.length >= 1
    }
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
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <span className="text-6xl">🎉</span>
          <h2 className="text-3xl font-bold">Selamat!</h2>
          <p className="text-gray-500">Landing page-mu sudah live!</p>
          <a
            href={publishedUrl}
            target="_blank"
            className="inline-block px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            🔗 Lihat Landing Page
          </a>
          <div className="p-4 rounded-xl bg-gray-50 text-sm text-gray-500 break-all">
            {publishedUrl}
          </div>
          <button
            onClick={() => { setPublishedUrl(null); setStep(0); setData(initialData) }}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
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
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">Landing Page Builder</h1>
          <span className="text-sm text-gray-400">Step {step + 1}/{steps.length}</span>
        </div>
        {/* Progress */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </header>

      {/* BODY */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
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

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}
      </main>

      {/* NAVIGATION */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          {/* Step indicators */}
          <div className="hidden sm:flex items-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === step ? "w-8 bg-black" : i < step ? "bg-gray-400" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          ) : (
            <div />
          )}
        </div>
      </footer>
    </div>
  )
}
