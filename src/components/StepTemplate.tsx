"use client"

import { ThemeId } from "@/types"
import { themeConfigs } from "@/templates/config"

const previewThemes: Record<string, string> = {
  ungu: "from-violet-600 to-indigo-500",
  abu: "from-gray-900 to-gray-700",
  krem: "from-amber-100 to-stone-200",
  pink: "from-pink-400 to-rose-300",
}

interface Props {
  value: ThemeId
  onChange: (theme: ThemeId) => void
}

export function StepTemplate({ value, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Pilih Tema</h2>
        <p className="text-gray-500">Pilih tampilan yang paling cocok dengan usahamu</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {Object.values(themeConfigs).map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`relative group text-left p-1 rounded-2xl transition-all duration-200 ${
              value === theme.id
                ? "ring-2 ring-black shadow-lg scale-[1.02]"
                : "hover:shadow-md hover:scale-[1.01]"
            }`}
          >
            <div
              className={`rounded-xl h-40 bg-gradient-to-br ${previewThemes[theme.id]} flex items-center justify-center overflow-hidden`}
            >
              <span className="text-5xl">{theme.emoji}</span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{theme.emoji}</span>
                <h3 className="font-bold">{theme.label}</h3>
              </div>
              <p className="text-sm text-gray-500">{theme.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
