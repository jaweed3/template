"use client"

import { FormData, Product } from "@/types"
import { ImageUpload } from "./ImageUpload"

interface Props {
  data: FormData
  onChange: (data: FormData) => void
}

function emptyProduct(): Product {
  return { id: crypto.randomUUID(), name: "", description: "", price: "", image: null }
}

export function StepProducts({ data, onChange }: Props) {
  const update = (fields: Partial<FormData>) => onChange({ ...data, ...fields })

  const updateProduct = (id: string, fields: Partial<Product>) => {
    update({
      products: data.products.map((p) => (p.id === id ? { ...p, ...fields } : p)),
    })
  }

  const remove = (id: string) => {
    update({ products: data.products.filter((p) => p.id !== id) })
  }

  const add = () => {
    if (data.products.length < 6) {
      update({ products: [...data.products, emptyProduct()] })
    }
  }

  return (
    <div className="space-y-7 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold neon-text" style={{ fontFamily: "var(--font-display)" }}>Produk / Layanan</h2>
        <p className="text-[#6B6B8D]">Tambahkan produk atau jasa yang kamu jual</p>
      </div>

      <div className="space-y-4">
        {data.products.map((product, idx) => (
          <div
            key={product.id}
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
                    background: "rgba(0,212,255,0.1)",
                    color: "#00D4FF",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-[#8B8BA7]">Produk</span>
              </div>
              {data.products.length > 1 && (
                <button
                  onClick={() => remove(product.id)}
                  className="text-sm text-red-400/40 hover:text-red-400 transition px-3 py-1 rounded-lg bg-red-500/5 hover:bg-red-500/10"
                >
                  ✕ Hapus
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#5B5B7D] uppercase tracking-wider">Nama Produk</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                  placeholder="Nama produk"
                  className="input-neon text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#5B5B7D] uppercase tracking-wider">Harga</label>
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) => updateProduct(product.id, { price: e.target.value })}
                  placeholder="Contoh: 50.000"
                  className="input-neon text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-[#5B5B7D] uppercase tracking-wider">Deskripsi</label>
              <textarea
                value={product.description}
                onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                placeholder="Deskripsi singkat produk"
                rows={2}
                className="input-neon text-sm resize-none"
              />
            </div>

            <ImageUpload
              label="Foto Produk"
              value={product.image}
              onChange={(val) => updateProduct(product.id, { image: val })}
            />
          </div>
        ))}
      </div>

      {data.products.length < 6 && (
        <button onClick={add} className="btn-add">
          + Tambah Produk
        </button>
      )}
    </div>
  )
}
