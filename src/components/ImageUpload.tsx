"use client"

import { useRef, useState } from "react"

interface Props {
  value: string | null
  onChange: (value: string | null) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "Upload Foto" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const handleFile = (file: File) => {
    setLoading(true)
    const reader = new FileReader()
    reader.onload = () => {
      onChange(reader.result as string)
      setLoading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-[#5B5B7D] uppercase tracking-wider">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
        style={{
          background: value
            ? "rgba(0,255,135,0.03)"
            : "rgba(255,255,255,0.02)",
          border: `2px dashed ${
            value ? "rgba(0,255,135,0.3)" : "rgba(255,255,255,0.06)"
          }`,
        }}
        onMouseEnter={(e) => {
          if (!value) e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"
        }}
        onMouseLeave={(e) => {
          if (!value) e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-sm text-[#5B5B7D]">
            <span className="w-5 h-5 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
            <span>Mengupload...</span>
          </div>
        ) : value ? (
          <div className="relative inline-block">
            <img
              src={value}
              alt="Preview"
              className="max-h-36 rounded-xl mx-auto shadow-lg"
            />
            <button
              onClick={(e) => { e.stopPropagation(); onChange(null) }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm transition shadow-lg hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #FF2D95, #7000FF)",
                color: "white",
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="text-[#5B5B7D]">
            <svg className="w-10 h-10 mx-auto mb-2 opacity-50 group-hover:opacity-80 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Klik untuk upload foto</p>
            <p className="text-xs mt-1 opacity-40">JPG, PNG (max 5MB)</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  )
}
