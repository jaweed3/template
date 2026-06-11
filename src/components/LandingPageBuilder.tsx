"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FormData, BrandDNA, TrustData, ConversionGoal, ThemeId } from "@/types"
import StepDiscover from "@/components/StepDiscover"
import StepBrandDNA from "@/components/StepBrandDNA"
import StepOfferEngine from "@/components/StepOfferEngine"
import StepTrustBuilder from "@/components/StepTrustBuilder"
import StepConversionLab from "@/components/StepConversionLab"
import StepLaunchSequence from "@/components/StepLaunchSequence"

const steps = [
  { id: "discover", number: "01", label: "Discover", subtitle: "Pilih identitas visual brandmu" },
  { id: "dna", number: "02", label: "Identity", subtitle: "Bentuk kepribadian brand" },
  { id: "offer", number: "03", label: "Offer", subtitle: "Susun penawaranmu" },
  { id: "trust", number: "04", label: "Trust", subtitle: "Bangun kredibilitas" },
  { id: "conversion", number: "05", label: "Conversion", subtitle: "Optimasi tujuan" },
  { id: "launch", number: "06", label: "Launch", subtitle: "Luncurkan brandmu" },
]

const defaultForm: FormData = {
  studentName: "",
  businessName: "",
  tagline: "",
  about: "",
  theme: "mystic",
  logo: null,
  products: [],
  testimonials: [],
  brandDna: { archetype: null, elegance: 50, minimalism: 50, modernity: 50 },
  trust: { reviews: false, photos: false, certificates: false, portfolio: false, partners: false },
  conversionGoal: "catalog",
  contact: { whatsapp: "", email: "", location: "", instagram: "", shopee: "", tiktok: "" },
}

const slideVariants = {
  enter: { opacity: 0, x: 80, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -80, scale: 0.97 },
}

export default function LandingPageBuilder() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(defaultForm)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  const updateForm = (partial: Partial<FormData>) => setForm((f) => ({ ...f, ...partial }))

  const handlePublish = async () => {
    setPublishing(true)
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      setPublished(true)
    } catch (e) {
      console.error(e)
      alert("Gagal publish. Coba lagi.")
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Step indicator */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "linear-gradient(180deg, rgba(6,6,12,0.8) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.6)" }}>
          BRAND LAUNCH
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
          {steps.map((s, i) => (
            <div
              key={s.id}
              style={{
                flex: 1,
                height: 2,
                borderRadius: 1,
                background: i <= step ? "linear-gradient(90deg, #00D4FF, #7000FF)" : "rgba(255,255,255,0.06)",
                transition: "background 0.4s",
              }}
            />
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>
          {steps[step].number}/{steps.length}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "100px 24px 140px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {step === 0 && (
              <StepDiscover
                selected={form.theme}
                onSelect={(theme: ThemeId) => { updateForm({ theme }); setStep(1) }}
              />
            )}
            {step === 1 && (
              <StepBrandDNA
                form={form}
                dna={form.brandDna}
                onUpdate={(brandDna: BrandDNA) => updateForm({ brandDna })}
                onUpdateForm={updateForm}
                onNext={() => setStep(2)}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <StepOfferEngine
                form={form}
                onUpdate={updateForm}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepTrustBuilder
                trust={form.trust}
                testimonials={form.testimonials}
                onUpdate={(trust: TrustData, testimonials) => {
                  updateForm({ trust })
                  if (testimonials) updateForm({ testimonials })
                }}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <StepConversionLab
                goal={form.conversionGoal}
                onSelect={(conversionGoal: ConversionGoal) => updateForm({ conversionGoal })}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            )}
            {step === 5 && (
              <StepLaunchSequence
                form={form}
                publishing={publishing}
                published={published}
                onPublish={handlePublish}
                onBack={() => setStep(4)}
                onReset={() => { setStep(0); setForm(defaultForm); setPublished(false) }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating navigation (for steps with Next/Back) */}
      {step >= 1 && step <= 4 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(0deg, rgba(6,6,12,0.95) 0%, transparent 100%)",
            backdropFilter: "blur(12px)",
            zIndex: 50,
          }}
        >
            <button className="btn-ghost-brand" onClick={() => setStep(step - 1)}>
            Kembali
          </button>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.1em" }}>
            {steps[step].number} · {steps[step].label.toUpperCase()}
          </div>
          <div />
        </div>
      )}
    </div>
  )
}
