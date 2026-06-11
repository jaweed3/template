"use client"

import { FormData } from "@/types"
import { ThemeUngu } from "@/templates/ThemeUngu"
import { ThemeAbu } from "@/templates/ThemeAbu"
import { ThemeKrem } from "@/templates/ThemeKrem"
import { ThemePink } from "@/templates/ThemePink"
import { useState } from "react"

interface Props {
  data: FormData
  onPublish: () => Promise<void>
  isPublishing: boolean
}

const themes: Record<string, React.FC<{ data: FormData }>> = {
  ungu: ThemeUngu,
  abu: ThemeAbu,
  krem: ThemeKrem,
  pink: ThemePink,
}

export function StepPreview({ data, onPublish, isPublishing }: Props) {
  const [showPreview, setShowPreview] = useState(false)
  const ThemeComponent = themes[data.theme]

  if (!data.businessName || !data.studentName) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl">👀</div>
        <h2 className="text-3xl font-bold gradient-text">Preview & Publish</h2>
        <p className="text-[#8B8BA7]">Isi dulu data usahamu di langkah sebelumnya ya!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold gradient-text">Preview & Publish</h2>
        <p className="text-[#8B8BA7]">Cek tampilan landing page-mu, kalau sudah oke langsung publish!</p>
      </div>

      {!showPreview ? (
        <div className="text-center">
          <button
            onClick={() => setShowPreview(true)}
            className="btn-glow inline-flex items-center gap-2"
          >
            👁️ Lihat Preview
          </button>
        </div>
      ) : (
        <>
          {/* PREVIEW FRAME */}
          <div className="rounded-2xl overflow-hidden" style={{
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 60px rgba(129,140,248,0.05)",
          }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-[#6B6B85]">{data.businessName} — Preview</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <ThemeComponent data={data} />
            </div>
          </div>

          {/* RINGKASAN */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Produk", value: data.products.length.toString() },
              { label: "Testimoni", value: data.testimonials.length.toString() },
              { label: "WhatsApp", value: data.contact.whatsapp ? "✓" : "—" },
              { label: "Logo", value: data.logo ? "✓" : "—" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="text-2xl font-bold gradient-text">{item.value}</div>
                <div className="text-xs text-[#6B6B85] mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* PUBLISH */}
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="w-full py-4 btn-primary text-lg flex items-center justify-center gap-2"
          >
            {isPublishing ? (
              <>⏳ Menerbitkan...</>
            ) : (
              <>🚀 Publish Landing Page!</>
            )}
          </button>
        </>
      )}
    </div>
  )
}
