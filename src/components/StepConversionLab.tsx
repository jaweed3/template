"use client"

import { motion } from "framer-motion"
import { ConversionGoal } from "@/types"

const goals: { id: ConversionGoal; label: string; icon: string; desc: string; detail: string }[] = [
  {
    id: "leads",
    label: "Lead Generation",
    icon: "🎯",
    desc: "Fokus mengumpulkan prospek",
    detail: "CTA besar, form capture, popup conversion",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Closing",
    icon: "💬",
    desc: "Direct chat ke penjual",
    detail: "Tombol WA menonjol, floating chat, quick reply",
  },
  {
    id: "booking",
    label: "Booking / Jadwal",
    icon: "📅",
    desc: "Customer booking langsung",
    detail: "Kalender, slot waktu, konfirmasi otomatis",
  },
  {
    id: "catalog",
    label: "Katalog Produk",
    icon: "🛍️",
    desc: "Display produk maksimal",
    detail: "Grid produk besar, filter, harga jelas",
  },
  {
    id: "branding",
    label: "Personal Branding",
    icon: "✨",
    desc: "Bangun personal brand",
    detail: "Storytelling, portofolio, social proof",
  },
]

export default function StepConversionLab({
  goal,
  onSelect,
  onNext,
  onBack,
}: {
  goal: ConversionGoal
  onSelect: (g: ConversionGoal) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div style={{ minHeight: "calc(100vh - 240px)", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 640, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
          PHASE 05 · CONVERSION LAB
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
          Apa tujuan{" "}
          <span className="neon-text">websitemu</span>?
        </h1>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem", marginBottom: 32, lineHeight: 1.5 }}>
          Pilih tujuan utama — kami akan mengatur layout, CTA, dan elemen website agar sesuai dengan goalmu.
        </p>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {goals.map((g, i) => {
          const selected = goal === g.id
          return (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => { onSelect(g.id); setTimeout(onNext, 300) }}
              style={{
                padding: "20px 24px",
                borderRadius: 16,
                background: selected ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.02)",
                border: selected ? "1px solid rgba(0,212,255,0.2)" : "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                textAlign: "left",
                cursor: "none",
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  background: selected ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
                  flexShrink: 0,
                }}
              >
                {g.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: selected ? "white" : "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                  {g.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", marginTop: 2 }}>
                  {g.detail}
                </div>
              </div>
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00D4FF, #7000FF)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    color: "#06060C",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
        <button className="btn-ghost-brand" onClick={onBack}>Kembali</button>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  )
}
