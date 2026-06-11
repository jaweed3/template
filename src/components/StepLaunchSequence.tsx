"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FormData } from "@/types"
import { themeConfigs } from "@/templates/config"

const launchPhases = [
  { label: "Generating Identity", duration: 1500 },
  { label: "Crafting Layout", duration: 1200 },
  { label: "Optimizing Conversion", duration: 1000 },
  { label: "Preparing Launch", duration: 800 },
]

function Particle({ index }: { index: number }) {
  const particleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = particleRef.current
    if (!el) return
    const animate = () => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const size = 2 + Math.random() * 4
      const opacity = 0.1 + Math.random() * 0.3
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.opacity = `${opacity}`
      setTimeout(animate, 1000 + Math.random() * 2000)
    }
    animate()
  }, [])

  return (
    <div
      ref={particleRef}
      style={{
        position: "fixed",
        borderRadius: "50%",
        background: "#00D4FF",
        transition: "all 2s ease-in-out",
        pointerEvents: "none",
        boxShadow: "0 0 6px rgba(0,212,255,0.3)",
      }}
    />
  )
}

export default function StepLaunchSequence({
  form,
  publishing,
  published,
  onPublish,
  onBack,
  onReset,
}: {
  form: FormData
  publishing: boolean
  published: boolean
  onPublish: () => void
  onBack: () => void
  onReset: () => void
}) {
  const [launching, setLaunching] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!launching || complete) return

    const totalDuration = launchPhases.reduce((s, p) => s + p.duration, 0)
    const startTime = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(pct)

      let accumulated = 0
      for (let i = 0; i < launchPhases.length; i++) {
        accumulated += launchPhases[i].duration
        if (elapsed < accumulated) {
          setPhaseIndex(i)
          break
        }
        if (i === launchPhases.length - 1 && elapsed >= accumulated) {
          setPhaseIndex(i)
        }
      }

      if (pct >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setComplete(true)
      }
    }, 50)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [launching, complete])

  const handleLaunch = () => {
    setLaunching(true)
    onPublish()
  }

  if (complete || published) {
    return (
      <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00D4FF, #7000FF, #FF2D95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            marginBottom: 32,
            boxShadow: "0 0 80px rgba(0,212,255,0.2)",
          }}
        >
          ✦
        </motion.div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
          }}
        >
          Brand <span className="neon-text">Launched!</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.3)", marginBottom: 32, maxWidth: 400, lineHeight: 1.6 }}>
          Websitemu sudah live.
          <br />
          Bagikan link ini ke seluruh dunia.
        </p>
        <div
          className="glass"
          style={{
            borderRadius: 16,
            padding: "16px 24px",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 12,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <div style={{ flex: 1, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            jaweed3.github.io/template/siswa/{form.studentName || "nama"}/
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.clipboard.writeText(`https://jaweed3.github.io/template/siswa/${form.studentName || "nama"}/`)
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.15)",
              color: "#00D4FF",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              cursor: "none",
              flexShrink: 0,
            }}
          >
            Copy Link
          </motion.button>
        </div>
        <motion.button
          className="btn-launch"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
        >
          <span>Buat Brand Baru</span>
        </motion.button>
      </div>
    )
  }

  if (launching) {
    return (
      <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        {/* Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Central blueprint circle */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(0,212,255,0.08)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px dashed rgba(0,212,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Phase label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phaseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {launchPhases[phaseIndex].label}
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="launch-progress-track" style={{ width: 280 }}>
            <motion.div
              className="launch-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", color: "rgba(255,255,255,0.15)" }}>
            {Math.round(progress)}%
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "calc(100vh - 240px)", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 640, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
          PHASE 06 · LAUNCH SEQUENCE
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: "0 0 8px",
          }}
        >
          Siap{" "}
          <span className="neon-text">Launch</span>?
        </h1>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem", marginBottom: 40, lineHeight: 1.6 }}>
          Semua sudah siap. Website akan langsung live di
          <br />
          <span style={{ color: "rgba(0,212,255,0.4)", fontFamily: "var(--font-display)", fontSize: "0.85rem" }}>
            jaweed3.github.io/template/siswa/{form.studentName || "nama"}/
          </span>
        </p>
      </motion.div>

      {/* Summary preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="glass"
        style={{ borderRadius: 20, padding: 24, marginBottom: 32 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", marginBottom: 4, letterSpacing: "0.05em" }}>THEME</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{themeConfigs[form.theme]?.label}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", marginBottom: 4, letterSpacing: "0.05em" }}>GOAL</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{form.conversionGoal}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", marginBottom: 4, letterSpacing: "0.05em" }}>PRODUK</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{form.products.length} produk</div>
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", marginBottom: 4, letterSpacing: "0.05em" }}>TESTIMONI</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{form.testimonials.length} testimoni</div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-ghost-brand" onClick={onBack} disabled={publishing}>
          Kembali
        </button>
        <motion.button
          className="btn-launch"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLaunch}
          disabled={publishing}
          style={{ flex: 1, position: "relative" }}
        >
          {publishing ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ display: "inline-block" }}
              >
                ◌
              </motion.span>
              Mempublikasikan...
            </span>
          ) : (
            <span>🚀 Launch Brand</span>
          )}
        </motion.button>
      </div>
    </div>
  )
}
