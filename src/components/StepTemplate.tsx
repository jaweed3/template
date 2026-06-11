"use client"

import { useState } from "react"
import { ThemeId } from "@/types"
import { themeConfigs } from "@/templates/config"
import { EngravingPreviewUngu, EngravingPreviewAbu, EngravingPreviewKrem, EngravingPreviewPink } from "./EngravingPoster"

const previewComponents: Record<string, React.FC> = {
  ungu: EngravingPreviewUngu,
  abu: EngravingPreviewAbu,
  krem: EngravingPreviewKrem,
  pink: EngravingPreviewPink,
}

interface Props {
  value: ThemeId
  onChange: (theme: ThemeId) => void
}

export function StepTemplate({ value, onChange }: Props) {
  const [hovered, setHovered] = useState<ThemeId | null>(null)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-display)" }}>Pilih Tema</h2>
        <p className="text-[#6B6B8D]">Pilih tampilan yang paling cocok dengan usahamu</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {Object.values(themeConfigs).map((theme) => {
          const isActive = value === theme.id
          const isHovered = hovered === theme.id
          const Preview = previewComponents[theme.id]

          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              onMouseEnter={() => setHovered(theme.id)}
              onMouseLeave={() => setHovered(null)}
              className="group text-left rounded-2xl overflow-hidden transition-all duration-500 flex flex-col"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(0,212,255,0.06), transparent)"
                  : "var(--bg-card)",
                border: isActive
                  ? "1px solid rgba(0,212,255,0.2)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: isActive
                  ? "0 0 40px rgba(0,212,255,0.06)"
                  : isHovered
                  ? "0 0 20px rgba(255,255,255,0.03)"
                  : "none",
                transform: isActive ? "scale(1.01)" : isHovered ? "scale(1.005)" : "scale(1)",
              }}
            >
              {/* Poster preview — tall, full-width */}
              <div className="relative w-full" style={{ aspectRatio: "3/4", maxHeight: "380px" }}>
                {Preview && <Preview />}

                {/* Active badge */}
                {isActive && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #7000FF)",
                      color: "#07070D",
                      boxShadow: "0 0 16px rgba(0,212,255,0.5)",
                    }}
                  >
                    ✓
                  </div>
                )}

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24" style={{
                  background: "linear-gradient(transparent, rgba(7,7,13,0.85))",
                }} />

                {/* Theme info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{theme.emoji}</span>
                    <h3 className="font-bold text-white text-base" style={{ fontFamily: "var(--font-display)" }}>
                      {theme.label}
                    </h3>
                  </div>
                  <p className="text-xs text-[#8B8BA7] leading-relaxed line-clamp-2">
                    {theme.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
