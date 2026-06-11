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
    update({ products: [...data.products, emptyProduct()] })
  }

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Produk / Layanan</h2>
        <p className="text-gray-500">Tambahkan produk atau jasa yang kamu jual</p>
      </div>

      <div className="space-y-6">
        {data.products.map((product, idx) => (
          <div key={product.id} className="p-6 rounded-2xl border border-gray-100 space-y-4 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">Produk {idx + 1}</span>
              {data.products.length > 1 && (
                <button onClick={() => remove(product.id)} className="text-red-400 hover:text-red-600 text-sm font-medium">
                  Hapus
                </button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">Nama Produk</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                  placeholder="Nama produk"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">Harga</label>
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) => updateProduct(product.id, { price: e.target.value })}
                  placeholder="Contoh: 50.000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Deskripsi</label>
              <textarea
                value={product.description}
                onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                placeholder="Deskripsi singkat produk"
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-sm resize-none"
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

      <button
        onClick={add}
        className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600 transition font-medium text-sm"
      >
        + Tambah Produk
      </button>
    </div>
  )
}
