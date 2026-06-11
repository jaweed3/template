"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FormData, BrandDNA, Archetype } from "@/types"

const archetypes: { id: Archetype; label: string; desc: string }[] = [
  { id: "visionary", label: "Visionary", desc: "Melihat masa depan, berani bermimpi besar" },
  { id: "rebel", label: "Rebel", desc: "Menentang arus, bikin statement berani" },
  { id: "teacher", label: "Teacher", desc: "Menginspirasi dengan pengetahuan dan kepercayaan" },
  { id: "explorer", label: "Explorer", desc: "Petualang, selalu mencari yang baru" },
  { id: "craftsman", label: "Craftsman", desc: "Detail-oriented, kualitas nomor satu" },
  { id: "innovator", label: "Innovator", desc: "Bikin yang belum pernah ada sebelumnya" },
]

export default function StepBrandDNA({
  form,
  dna,
  onUpdate,
  onUpdateForm,
  onNext,
  onBack,
}: {
  form: FormData
  dna: BrandDNA
  onUpdate: (d: BrandDNA) => void
  onUpdateForm: (p: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const [phase, setPhase] = useState<"intro" | "archetype" | "sliders">("intro")

  return (
    <div style={{ minHeight: "calc(100vh - 240px)", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 640, margin: "0 auto" }}>
      {phase === "intro" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            PHASE 02 · BRAND DNA
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: "0 auto",
              maxWidth: 500,
            }}
          >
            Let&apos;s shape your{" "}
            <span className="neon-text">brand</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem", marginTop: 16, maxWidth: 400, margin: "16px auto 0", lineHeight: 1.6 }}>
            Sebelum kita bentuk kepribadian brandmu, kenalan dulu yuk.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 400, margin: "32px auto 0" }}>
            <input
              className="input-brand"
              placeholder="Namamu"
              value={form.studentName}
              onChange={(e) => onUpdateForm({ studentName: e.target.value })}
            />
            <input
              className="input-brand"
              placeholder="Nama bisnismu"
              value={form.businessName}
              onChange={(e) => onUpdateForm({ businessName: e.target.value })}
            />
            <input
              className="input-brand"
              placeholder="Tagline (opsional)"
              value={form.tagline}
              onChange={(e) => onUpdateForm({ tagline: e.target.value })}
            />
            <textarea
              className="input-brand"
              placeholder="Cerita singkat tentang bisnismu (opsional)"
              value={form.about}
              onChange={(e) => onUpdateForm({ about: e.target.value })}
              style={{ resize: "none", minHeight: 80 }}
            />
          </div>
          <motion.button
            className="btn-launch"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (!form.studentName.trim() || !form.businessName.trim()) return
              setPhase("archetype")
            }}
            style={{ marginTop: 32, opacity: form.studentName.trim() && form.businessName.trim() ? 1 : 0.3 }}
          >
            <span>Mulai</span>
          </motion.button>
        </motion.div>
      )}

      {phase === "archetype" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            PERTANYAAN 1/2
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: "0 0 32px",
            }}
          >
            Jika brandmu manusia,
            <br />
            dia seperti apa?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {archetypes.map((a, i) => (
              <motion.button
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={`btn-ghost-brand ${dna.archetype === a.id ? "selected" : ""}`}
                onClick={() => {
                  onUpdate({ ...dna, archetype: a.id })
                  setTimeout(() => setPhase("sliders"), 300)
                }}
                whileHover={{ scale: 1.01, x: 4 }}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: dna.archetype === a.id ? "rgba(0,212,255,0.06)" : "rgba(255,255,255,0.02)",
                  border: dna.archetype === a.id ? "1px solid rgba(0,212,255,0.2)" : "1px solid rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    background: dna.archetype === a.id ? "linear-gradient(135deg, #00D4FF, #7000FF)" : "rgba(255,255,255,0.04)",
                    color: dna.archetype === a.id ? "#06060C" : "rgba(255,255,255,0.3)",
                    flexShrink: 0,
                  }}
                >
                  {a.label[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: dna.archetype === a.id ? "white" : "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
                    {a.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", marginTop: 2 }}>
                    {a.desc}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <button className="btn-ghost-brand" onClick={onBack} style={{ fontSize: "0.85rem" }}>
              Kembali
            </button>
          </div>
        </motion.div>
      )}

      {phase === "sliders" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            PERTANYAAN 2/2
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              margin: "0 0 8px",
            }}
          >
            Pilih energi brandmu
          </h2>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem", marginBottom: 40 }}>
            Geser untuk menyesuaikan kepribadian brand
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
                <span>Elegant</span>
                <span>Playful</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dna.elegance}
                onChange={(e) => onUpdate({ ...dna, elegance: Number(e.target.value) })}
                className="slider-brand"
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
                <span>Minimal</span>
                <span>Expressive</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dna.minimalism}
                onChange={(e) => onUpdate({ ...dna, minimalism: Number(e.target.value) })}
                className="slider-brand"
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
                <span>Modern</span>
                <span>Classic</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dna.modernity}
                onChange={(e) => onUpdate({ ...dna, modernity: Number(e.target.value) })}
                className="slider-brand"
              />
            </div>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 12 }}>
            <button className="btn-ghost-brand" onClick={() => setPhase("archetype")}>
              Kembali
            </button>
            <button className="btn-launch" onClick={onNext} style={{ flex: 1 }}>
              <span>Lanjutkan</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
