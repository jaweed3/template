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
      <div className="text-center py-16 space-y-4">
        <span className="text-6xl">👀</span>
        <h2 className="text-3xl font-bold">Preview & Publish</h2>
        <p className="text-gray-500">Isi dulu data usahamu di langkah sebelumnya ya!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Preview & Publish</h2>
        <p className="text-gray-500">Cek tampilan landing page-mu, kalau sudah oke langsung publish!</p>
      </div>

      {!showPreview ? (
        <div className="text-center">
          <button
            onClick={() => setShowPreview(true)}
            className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            👁️ Lihat Preview
          </button>
        </div>
      ) : (
        <>
          {/* PREVIEW */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 text-xs text-gray-500 border-b">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2">Preview — {data.businessName}</span>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              <ThemeComponent data={data} />
            </div>
          </div>

          {/* RINGKASAN */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="text-2xl font-bold">{data.products.length}</div>
              <div className="text-xs text-gray-500">Produk</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="text-2xl font-bold">{data.testimonials.length}</div>
              <div className="text-xs text-gray-500">Testimoni</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="text-2xl font-bold">{data.contact.whatsapp ? "✓" : "—"}</div>
              <div className="text-xs text-gray-500">WhatsApp</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="text-2xl font-bold">{data.logo ? "✓" : "—"}</div>
              <div className="text-xs text-gray-500">Logo</div>
            </div>
          </div>

          {/* PUBLISH */}
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
