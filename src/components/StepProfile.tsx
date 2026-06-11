"use client"

import { FormData } from "@/types"
import { ImageUpload } from "./ImageUpload"

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

export function StepProfile({ data, onChange }: Props) {
  const update = (fields: Partial<FormData>) => onChange({ ...data, ...fields })

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Profil Usaha</h2>
        <p className="text-gray-500">Ceritakan tentang bisnismu</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Nama Kamu *</label>
        <input
          type="text"
          value={data.studentName}
          onChange={(e) => update({ studentName: e.target.value })}
          placeholder="Contoh: Andi Pratama"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Nama Usaha *</label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => update({ businessName: e.target.value })}
          placeholder="Contoh: Andi Bakery"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Tagline</label>
        <input
          type="text"
          value={data.tagline}
          onChange={(e) => update({ tagline: e.target.value })}
          placeholder="Contoh: Roti fresh homemade, tanpa pengawet"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Tentang Usaha</label>
        <textarea
          value={data.about}
          onChange={(e) => update({ about: e.target.value })}
          placeholder="Ceritakan tentang usahamu, visi, dan apa yang membedakanmu dari yang lain..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition resize-none"
        />
      </div>

      <ImageUpload
        label="Logo Usaha"
        value={data.logo}
        onChange={(val) => update({ logo: val })}
      />
    </div>
  )
}
