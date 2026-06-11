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
      testimonials: data.testimonials.map((t) =>
        t.id === id ? { ...t, ...fields } : t
      ),
    })
  }

  const remove = (id: string) => {
    update({ testimonials: data.testimonials.filter((t) => t.id !== id) })
  }

  const add = () => {
    if (data.testimonials.length < 6) {
      update({ testimonials: [...data.testimonials, emptyTestimonial()] })
    }
  }

  return (
    <div className="space-y-7 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-display)" }}>Testimoni</h2>
        <p className="text-[#6B6B8D]">Apa kata pelanggan tentang produkmu? (opsional)</p>
      </div>

      <div className="space-y-4">
        {data.testimonials.map((t, idx) => (
          <div
            key={t.id}
            className="rounded-2xl p-6 space-y-4 animate-slide-up"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "rgba(255,45,149,0.1)",
                    color: "#FF2D95",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-[#8B8BA7]">Testimoni</span>
              </div>
              {data.testimonials.length > 1 && (
                <button
                  onClick={() => remove(t.id)}
                  className="text-sm text-red-400/40 hover:text-red-400 transition px-3 py-1 rounded-lg bg-red-500/5 hover:bg-red-500/10"
                >
                  ✕ Hapus
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-[#5B5B7D] uppercase tracking-wider">Isi Testimoni</label>
              <textarea
                value={t.text}
                onChange={(e) => updateItem(t.id, { text: e.target.value })}
                placeholder="&quot;Produknya bagus banget, pelayanannya ramah!&quot;"
                rows={3}
                className="input-neon text-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-[#5B5B7D] uppercase tracking-wider">Nama Pelanggan</label>
              <input
                type="text"
                value={t.name}
                onChange={(e) => updateItem(t.id, { name: e.target.value })}
                placeholder="Contoh: Siti Rahma"
                className="input-neon text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {data.testimonials.length < 6 && (
        <button onClick={add} className="btn-add">
          + Tambah Testimoni
        </button>
      )}
    </div>
  )
}
