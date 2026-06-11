"use client"

import { FormData } from "@/types"

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

export function StepContact({ data, onChange }: Props) {
  const update = (fields: Partial<FormData>) => onChange({ ...data, ...fields })

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Kontak & Sosial Media</h2>
        <p className="text-gray-500">Biar pelanggan gampang menghubungimu</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">No. WhatsApp *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+62</span>
            <input
              type="text"
              value={data.contact.whatsapp}
              onChange={(e) => update({ contact: { ...data.contact, whatsapp: e.target.value } })}
              placeholder="81234567890"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={data.contact.email}
            onChange={(e) => update({ contact: { ...data.contact, email: e.target.value } })}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Lokasi</label>
        <input
          type="text"
          value={data.contact.location}
          onChange={(e) => update({ contact: { ...data.contact, location: e.target.value } })}
          placeholder="Contoh: Jakarta Selatan"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
        />
      </div>

      <div className="pt-4 border-t border-gray-100">
        <h3 className="font-semibold mb-4 text-sm text-gray-500 uppercase tracking-wider">Sosial Media</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500">Instagram</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">@</span>
              <input
                type="text"
                value={data.contact.instagram}
                onChange={(e) => update({ contact: { ...data.contact, instagram: e.target.value } })}
                placeholder="username"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500">Shopee (link toko)</label>
            <input
              type="text"
              value={data.contact.shopee}
              onChange={(e) => update({ contact: { ...data.contact, shopee: e.target.value } })}
              placeholder="https://shopee.co.id/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500">TikTok</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">@</span>
              <input
                type="text"
                value={data.contact.tiktok}
                onChange={(e) => update({ contact: { ...data.contact, tiktok: e.target.value } })}
                placeholder="username"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
