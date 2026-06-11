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
        <h2 className="text-3xl font-bold gradient-text">Testimoni</h2>
        <p className="text-[#8B8BA7]">Apa kata pelanggan tentang produkmu? (opsional)</p>
      </div>

      <div className="space-y-4">
        {data.testimonials.map((t, idx) => (
          <div
            key={t.id}
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "rgba(192,132,252,0.15)",
                    color: "#C084FC",
                  }}
                >
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-[#A5A5C0]">Testimoni</span>
              </div>
              {data.testimonials.length > 1 && (
                <button
                  onClick={() => remove(t.id)}
                  className="text-sm text-red-400/60 hover:text-red-400 transition px-3 py-1 rounded-lg bg-red-500/5 hover:bg-red-500/10"
                >
                  Hapus
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-[#6B6B85] uppercase tracking-wider">Isi Testimoni</label>
              <textarea
                value={t.text}
                onChange={(e) => updateItem(t.id, { text: e.target.value })}
                placeholder="&quot;Produknya bagus banget, pelayanannya ramah!&quot;"
                rows={3}
                className="input-base text-sm resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-[#6B6B85] uppercase tracking-wider">Nama Pelanggan</label>
              <input
                type="text"
                value={t.name}
                onChange={(e) => updateItem(t.id, { name: e.target.value })}
                placeholder="Contoh: Siti Rahma"
                className="input-base text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {data.testimonials.length < 6 && (
        <button
          onClick={add}
          className="w-full py-4 rounded-2xl border border-dashed transition font-medium text-sm"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            color: "#6B6B85",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
            e.currentTarget.style.color = "#A5A5C0"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
            e.currentTarget.style.color = "#6B6B85"
          }}
        >
          + Tambah Testimoni
        </button>
      )}
    </div>
  )
}
