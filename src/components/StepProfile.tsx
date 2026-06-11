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
    <div className="space-y-7 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold gradient-text">Profil Usaha</h2>
        <p className="text-[#8B8BA7]">Ceritakan tentang bisnismu</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#A5A5C0]">Nama Kamu *</label>
        <input
          type="text"
          value={data.studentName}
          onChange={(e) => update({ studentName: e.target.value })}
          placeholder="Contoh: Andi Pratama"
          className="input-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#A5A5C0]">Nama Usaha *</label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => update({ businessName: e.target.value })}
          placeholder="Contoh: Andi Bakery"
          className="input-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#A5A5C0]">Tagline</label>
        <input
          type="text"
          value={data.tagline}
          onChange={(e) => update({ tagline: e.target.value })}
          placeholder="Contoh: Roti fresh homemade, tanpa pengawet"
          className="input-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#A5A5C0]">Tentang Usaha</label>
        <textarea
          value={data.about}
          onChange={(e) => update({ about: e.target.value })}
          placeholder="Ceritakan tentang usahamu, visi, dan apa yang membedakanmu dari yang lain..."
          rows={4}
          className="input-base resize-none"
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
