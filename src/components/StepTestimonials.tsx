"use client"

import { FormData, Testimonial } from "@/types"

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

function emptyTestimonial(): Testimonial {
  return { id: crypto.randomUUID(), text: "", name: "" }
}

export function StepTestimonials({ data, onChange }: Props) {
  const update = (fields: Partial<FormData>) => onChange({ ...data, ...fields })

  const updateItem = (id: string, fields: Partial<Testimonial>) => {
    update({
      testimonials: data.testimonials.map((t) => (t.id === id ? { ...t, ...fields } : t)),
    })
  }

  const remove = (id: string) => {
    update({ testimonials: data.testimonials.filter((t) => t.id !== id) })
  }

  const add = () => {
    update({ testimonials: [...data.testimonials, emptyTestimonial()] })
  }

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Testimoni</h2>
        <p className="text-gray-500">Apa kata pelanggan tentang produkmu? (opsional)</p>
      </div>

      <div className="space-y-6">
        {data.testimonials.map((t, idx) => (
          <div key={t.id} className="p-6 rounded-2xl border border-gray-100 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">Testimoni {idx + 1}</span>
              {data.testimonials.length > 1 && (
                <button onClick={() => remove(t.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">
                  Hapus
                </button>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Isi Testimoni</label>
              <textarea
                value={t.text}
                onChange={(e) => updateItem(t.id, { text: e.target.value })}
                placeholder="&quot;Produknya bagus banget, pelayanannya ramah!&quot;"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Nama Pelanggan</label>
              <input
                type="text"
                value={t.name}
                onChange={(e) => updateItem(t.id, { name: e.target.value })}
                placeholder="Contoh: Siti Rahma"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600 transition font-medium text-sm"
      >
        + Tambah Testimoni
      </button>
    </div>
  )
}
