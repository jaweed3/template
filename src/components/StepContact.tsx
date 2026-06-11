"use client"

import { FormData } from "@/types"

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

export function StepContact({ data, onChange }: Props) {
  const update = (fields: Partial<FormData>) => onChange({ ...data, ...fields })

  return (
    <div className="space-y-7 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-display)" }}>Kontak & Sosial Media</h2>
        <p className="text-[#6B6B8D]">Biar pelanggan gampang menghubungimu</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#8B8BA7]">WhatsApp <span className="text-[#FF2D95]">*</span></label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B5B7D] text-sm font-medium">+62</span>
            <input
              type="text"
              value={data.contact.whatsapp}
              onChange={(e) => update({ contact: { ...data.contact, whatsapp: e.target.value } })}
              placeholder="81234567890"
              className="input-neon pl-12"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#8B8BA7]">Email</label>
          <input
            type="email"
            value={data.contact.email}
            onChange={(e) => update({ contact: { ...data.contact, email: e.target.value } })}
            placeholder="email@example.com"
            className="input-neon"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#8B8BA7]">Lokasi</label>
        <input
          type="text"
          value={data.contact.location}
          onChange={(e) => update({ contact: { ...data.contact, location: e.target.value } })}
          placeholder="Contoh: Jakarta Selatan"
          className="input-neon"
        />
      </div>

      <div className="pt-6 border-t border-white/5">
        <h3 className="font-semibold mb-5 text-xs text-[#5B5B7D] uppercase tracking-[0.15em]">
          Sosial Media
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[#5B5B7D]">Instagram</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B5B7D] text-xs">@</span>
              <input
                type="text"
                value={data.contact.instagram}
                onChange={(e) => update({ contact: { ...data.contact, instagram: e.target.value } })}
                placeholder="username"
                className="input-neon pl-8 text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[#5B5B7D]">Shopee</label>
            <input
              type="text"
              value={data.contact.shopee}
              onChange={(e) => update({ contact: { ...data.contact, shopee: e.target.value } })}
              placeholder="link toko"
              className="input-neon text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[#5B5B7D]">TikTok</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B5B7D] text-xs">@</span>
              <input
                type="text"
                value={data.contact.tiktok}
                onChange={(e) => update({ contact: { ...data.contact, tiktok: e.target.value } })}
                placeholder="username"
                className="input-neon pl-8 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
