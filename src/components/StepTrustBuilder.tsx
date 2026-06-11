"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrustData, Testimonial } from "@/types"

export default function StepTrustBuilder({
  trust,
  testimonials,
  onUpdate,
  onNext,
  onBack,
}: {
  trust: TrustData
  testimonials: Testimonial[]
  onUpdate: (t: TrustData, testimonials?: Testimonial[]) => void
  onNext: () => void
  onBack: () => void
}) {
  const [showTestimonialInput, setShowTestimonialInput] = useState(false)
  const [newText, setNewText] = useState("")
  const [newName, setNewName] = useState("")

  const trustItems: { key: keyof TrustData; label: string; icon: string }[] = [
    { key: "reviews", label: "Testimonials", icon: "⭐" },
    { key: "photos", label: "Foto Produk", icon: "📸" },
    { key: "certificates", label: "Sertifikat", icon: "🏆" },
    { key: "portfolio", label: "Portofolio", icon: "📁" },
    { key: "partners", label: "Partners", icon: "🤝" },
  ]

  const trustedCount = trustItems.filter((item) => trust[item.key]).length
  const trustScore = Math.round((trustedCount / trustItems.length) * 70 + (testimonials.length > 0 ? 15 : 5) + 10)
  const capped = Math.min(trustScore, 100)

  const addTestimonial = () => {
    if (!newText.trim() || !newName.trim()) return
    const t: Testimonial = { id: Math.random().toString(36).slice(2), text: newText, name: newName }
    onUpdate(trust, [...testimonials, t])
    setNewText("")
    setNewName("")
  }

  const removeTestimonial = (id: string) => {
    onUpdate(trust, testimonials.filter((t) => t.id !== id))
  }

  return (
    <div style={{ minHeight: "calc(100vh - 240px)", maxWidth: 640, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
          PHASE 04 · TRUST BUILDER
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 5vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: "0 0 8px",
          }}
        >
          Bangun{" "}
          <span className="neon-text">Kredibilitas</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem", marginBottom: 32 }}>
          Semakin tinggi Trust Score, semakin percaya customer padamu
        </p>
      </motion.div>

      {/* Trust Score Meter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass"
        style={{ borderRadius: 20, padding: 24, marginBottom: 32, textAlign: "center" }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", marginBottom: 8 }}>
          TRUST LEVEL
        </div>
        <motion.div
          key={capped}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3.5rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          <span className="neon-text">{capped}%</span>
        </motion.div>
        <div className="trust-meter-track" style={{ marginTop: 16, marginBottom: 4 }}>
          <motion.div
            className="trust-meter-fill"
            initial={{ width: 0 }}
            animate={{ width: `${capped}%` }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: `linear-gradient(90deg, #FF2D95, #7000FF, #00D4FF)`,
              boxShadow: `0 0 20px rgba(0,212,255,${0.05 + capped / 500})`,
            }}
          />
        </div>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.15)", marginTop: 4 }}>
          {trustedCount}/5 trust signals aktif
        </div>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}
      >
        {trustItems.map((item) => (
          <motion.button
            key={item.key}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onUpdate({ ...trust, [item.key]: !trust[item.key] })}
            style={{
              padding: "16px 20px",
              borderRadius: 14,
              background: trust[item.key] ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)",
              border: trust[item.key] ? "1px solid rgba(0,212,255,0.15)" : "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              cursor: "none",
              transition: "all 0.2s",
            }}
          >
            <span style={{ color: trust[item.key] ? "white" : "rgba(255,255,255,0.3)" }}>
              {item.icon} {item.label}
            </span>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: trust[item.key] ? "linear-gradient(135deg, #00D4FF, #7000FF)" : "rgba(255,255,255,0.05)",
                border: trust[item.key] ? "none" : "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                color: trust[item.key] ? "#06060C" : "transparent",
                transition: "all 0.2s",
              }}
            >
              {trust[item.key] ? "✓" : ""}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
            ⭐ Testimonial ({testimonials.length})
          </div>
          <button
            className="btn-ghost-brand"
            onClick={() => setShowTestimonialInput(!showTestimonialInput)}
            style={{ padding: "6px 14px", fontSize: "0.8rem" }}
          >
            {showTestimonialInput ? "Tutup" : "+ Tambah"}
          </button>
        </div>

        <AnimatePresence>
          {showTestimonialInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass"
              style={{ borderRadius: 14, padding: 16, marginBottom: 12, overflow: "hidden" }}
            >
              <textarea
                className="input-brand"
                placeholder="Tulis testimoni..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                style={{ resize: "none", minHeight: 80, marginBottom: 8 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  className="input-brand"
                  placeholder="Nama customer"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ flex: 1, padding: "10px 14px", fontSize: "0.9rem" }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={addTestimonial}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #00D4FF, #7000FF)",
                    border: "none",
                    color: "#06060C",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    cursor: "none",
                  }}
                >
                  Tambah
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass"
            style={{ borderRadius: 14, padding: 16, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, marginBottom: 4 }}>{t.text}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>{t.name}</div>
            </div>
            <button
              onClick={() => removeTestimonial(t.id)}
              style={{ background: "none", border: "none", color: "rgba(255,45,85,0.4)", fontSize: "0.9rem", cursor: "none", padding: 4 }}
            >
              ✕
            </button>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
        <button className="btn-ghost-brand" onClick={onBack}>Kembali</button>
        <button className="btn-launch" onClick={onNext} style={{ flex: 1 }}>
          <span>Lanjutkan</span>
        </button>
      </div>
    </div>
  )
}
