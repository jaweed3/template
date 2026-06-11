"use client"

import { ThemeId } from "@/types"
import { themeConfigs } from "@/templates/config"

const previewBg: Record<string, string> = {
  ungu: "radial-gradient(circle at 30% 40%, #7C3AED, #1E1B4B)",
  abu: "radial-gradient(circle at 30% 40%, #374151, #030712)",
  krem: "linear-gradient(135deg, #F5F0EB, #E8DED5)",
  pink: "radial-gradient(circle at 30% 40%, #EC4899, #FDF2F8)",
}

const previewText: Record<string, string> = {
  ungu: "#C4B5FD",
  abu: "#9CA3AF",
  krem: "#2D1810",
  pink: "#831843",
}

interface Props {
  value: ThemeId
  onChange: (theme: ThemeId) => void
}

export function StepTemplate({ value, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold gradient-text">Pilih Tema</h2>
        <p className="text-[#8B8BA7]">Pilih tampilan yang paling cocok dengan usahamu</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {Object.values(themeConfigs).map((theme) => {
          const isActive = value === theme.id
          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              className={`group text-left rounded-2xl overflow-hidden transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-[#818CF8] shadow-lg shadow-[#818CF8]/20 scale-[1.02]"
                  : "hover:scale-[1.01] hover:shadow-lg hover:shadow-white/5"
              }`}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Preview */}
              <div
                className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{ background: previewBg[theme.id] }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-1">{theme.emoji}</div>
                  <div
                    className="text-xs font-medium tracking-wider uppercase"
                    style={{ color: previewText[theme.id] }}
                  >
                    {theme.label}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#818CF8] flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-[#818CF8]/30">
                    ✓
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{theme.emoji}</span>
                  <h3 className="font-bold text-white">{theme.label}</h3>
                </div>
                <p className="text-sm text-[#8B8BA7]">{theme.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
