"use client"

import { ThemeId } from "@/types"
import { themeConfigs } from "@/templates/config"

const previewBg: Record<string, string> = {
  ungu: "radial-gradient(circle at 30% 40%, #7C3AED, #1E1B4B)",
  abu: "radial-gradient(circle at 30% 40%, #374151, #030712)",
  krem: "linear-gradient(135deg, #F5F0EB, #E8DED5)",
  pink: "radial-gradient(circle at 30% 40%, #EC4899, #FDF2F8)",
}

const previewAccent: Record<string, string> = {
  ungu: "#C4B5FD",
  abu: "#9CA3AF",
  krem: "#2D1810",
  pink: "#831843",
}

const badgeColors: Record<string, string> = {
  ungu: "rgba(124,58,237,0.2)",
  abu: "rgba(156,163,175,0.2)",
  krem: "rgba(139,115,85,0.2)",
  pink: "rgba(236,72,153,0.2)",
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
          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              className="group text-left rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${badgeColors[theme.id]}, transparent)`
                  : "var(--bg-card)",
                border: isActive
                  ? `1px solid ${theme.id === "krem" ? "rgba(139,115,85,0.3)" : "rgba(0,212,255,0.2)"}`
                  : "1px solid var(--border-subtle)",
                boxShadow: isActive ? "0 0 30px rgba(0,212,255,0.08)" : "none",
              }}
            >
              {/* Preview strip */}
              <div
                className="h-32 flex items-center justify-center relative"
                style={{ background: previewBg[theme.id] }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-1">{theme.emoji}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: previewAccent[theme.id] }}>
                    {theme.label}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #7000FF)",
                      color: "#07070D",
                      boxShadow: "0 0 12px rgba(0,212,255,0.4)",
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{theme.emoji}</span>
                  <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{theme.label}</h3>
                </div>
                <p className="text-sm text-[#6B6B8D]">{theme.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
