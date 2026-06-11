"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ThemeId } from "@/types"
import { themeConfigs } from "@/templates/config"

const themes: { id: ThemeId; gradient: string }[] = [
  { id: "mystic", gradient: "linear-gradient(135deg, #1a0a2e, #06060C, #0a1628)" },
  { id: "luxury", gradient: "linear-gradient(135deg, #1a1208, #0F0D0A, #080604)" },
  { id: "brutalist", gradient: "linear-gradient(135deg, #111111, #030303, #0a0a0a)" },
  { id: "streetwear", gradient: "linear-gradient(135deg, #1a0510, #0A0A0A, #0a050a)" },
  { id: "agency", gradient: "linear-gradient(135deg, #060618, #06060C, #080a14)" },
  { id: "local", gradient: "linear-gradient(135deg, #06120a, #080C0A, #060a08)" },
]

export default function StepDiscover({
  selected,
  onSelect,
}: {
  selected: ThemeId
  onSelect: (id: ThemeId) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ minHeight: "calc(100vh - 240px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 48 }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
          PHASE 01 · DISCOVER
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Pilih{" "}
          <span className="neon-text">Identitas</span>
          <br />
          Visual Brandmu
        </h1>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem", marginTop: 12, maxWidth: 480, lineHeight: 1.6 }}>
          Setiap tema punya kepribadian unik. Gerakkan kursor ke card untuk melihat preview.
        </p>
      </motion.div>

      <motion.div
        ref={scrollRef}
        className="carousel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          paddingBottom: 20,
          margin: "0 -24px",
          paddingLeft: 24,
          paddingRight: 24,
          scrollSnapType: "x mandatory",
        }}
      >
        {Object.values(themeConfigs).map((theme, i) => {
          const isSelected = selected === theme.id
          const bg = themes.find((t) => t.id === theme.id)?.gradient || ""

          return (
            <motion.button
              key={theme.id}
              data-cursor-hover
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              onClick={() => onSelect(theme.id)}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.setProperty("--scale", "1.04")
                el.style.setProperty("--rotate", "1deg")
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.setProperty("--scale", "1")
                el.style.setProperty("--rotate", "0deg")
              }}
              style={{
                minWidth: 280,
                maxWidth: 280,
                height: 400,
                borderRadius: 24,
                background: bg,
                border: isSelected ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.04)",
                padding: 0,
                cursor: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                scrollSnapAlign: "start",
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s",
                transform: "scale(var(--scale, 1)) rotate(var(--rotate, 0deg))",
                boxShadow: isSelected ? `0 0 60px ${theme.colors.glow}` : "none",
                outline: "none",
                flexShrink: 0,
              }}
            >
              {/* Hover glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at center, ${theme.colors.glow} 0%, transparent 60%)`,
                  opacity: isSelected ? 0.4 : 0,
                  transition: "opacity 0.4s",
                  pointerEvents: "none",
                }}
              />

              {/* Emoji */}
              <div style={{ fontSize: "3rem", marginBottom: 16, position: "relative", zIndex: 1 }}>
                {theme.emoji}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {theme.label}
              </div>

              {/* Subtitle */}
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 6,
                  letterSpacing: "0.05em",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {theme.subtitle}
              </div>

              {/* Bottom accent bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  opacity: isSelected ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
