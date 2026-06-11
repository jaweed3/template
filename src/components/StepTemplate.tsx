"use client"

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
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-display)" }}>Pilih Tema</h2>
        <p className="text-[#6B6B8D]">Pilih tampilan yang paling cocok dengan usahamu</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.values(themeConfigs).map((theme) => {
          const isActive = value === theme.id
          const Preview = previewComponents[theme.id]
          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              className="group text-left rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                border: isActive
                  ? "1px solid rgba(0,212,255,0.25)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: isActive ? "0 0 30px rgba(0,212,255,0.08)" : "none",
              }}
            >
              {/* Engraving preview */}
              <div className="h-36 overflow-hidden relative">
                {Preview && <Preview />}
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #7000FF)",
                      color: "#07070D",
                      boxShadow: "0 0 12px rgba(0,212,255,0.4)",
                    }}
                  >
                    ✓
                  </div>
                )}
                {/* Theme name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3" style={{
                  background: "linear-gradient(transparent, rgba(7,7,13,0.9))",
                }}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{theme.emoji}</span>
                    <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {theme.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 pt-3">
                <p className="text-sm text-[#6B6B8D]">{theme.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
