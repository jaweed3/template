"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FormData, Product } from "@/types"
import { ImageUpload } from "@/components/ImageUpload"

type Module = "products" | "promo" | "cta" | "whatsapp" | "gallery" | "faq" | "contact"

const modules: { id: Module; label: string; icon: string }[] = [
  { id: "products", label: "Produk", icon: "📦" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "contact", label: "Kontak", icon: "📞" },
  { id: "cta", label: "CTA Button", icon: "🎯" },
  { id: "promo", label: "Promo", icon: "🏷️" },
  { id: "gallery", label: "Galeri", icon: "🖼️" },
  { id: "faq", label: "FAQ", icon: "❓" },
]

export default function StepOfferEngine({
  form,
  onUpdate,
  onNext,
  onBack,
}: {
  form: FormData
  onUpdate: (p: Partial<FormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const [activeModules, setActiveModules] = useState<Module[]>(["products", "whatsapp", "cta"])

  const toggleModule = (id: Module) => {
    setActiveModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const addProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).slice(2),
      name: "",
      description: "",
      price: "",
      image: null,
    }
    onUpdate({ products: [...form.products, newProduct] })
  }

  const updateProduct = (id: string, partial: Partial<Product>) => {
    onUpdate({
      products: form.products.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    })
  }

  const removeProduct = (id: string) => {
    onUpdate({ products: form.products.filter((p) => p.id !== id) })
  }

  const isActive = (id: Module) => activeModules.includes(id)

  return (
    <div style={{ minHeight: "calc(100vh - 240px)", maxWidth: 640, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
          PHASE 03 · OFFER ENGINE
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 5vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: "0 0 8px",
          }}
        >
          Susun{" "}
          <span className="neon-text">Penawaranmu</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem", marginBottom: 32 }}>
          Pilih modul yang mau ditampilkan, lalu isi detailnya
        </p>
      </motion.div>

      {/* Module toggles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}
      >
        {modules.map((m) => {
          const active = isActive(m.id)
          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleModule(m.id)}
              style={{
                padding: "10px 18px",
                borderRadius: 12,
                background: active ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.02)",
                border: active ? "1px solid rgba(0,212,255,0.2)" : "1px solid rgba(255,255,255,0.04)",
                color: active ? "white" : "rgba(255,255,255,0.3)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                cursor: "none",
                transition: "all 0.2s",
              }}
            >
              {m.icon} {m.label}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Products module */}
      {isActive("products") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
              Produk
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={addProduct}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                background: "rgba(0,212,255,0.06)",
                border: "1px solid rgba(0,212,255,0.1)",
                color: "#00D4FF",
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                cursor: "none",
              }}
            >
              + Tambah Produk
            </motion.button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {form.products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass"
                style={{ borderRadius: 16, padding: 20 }}
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 80, height: 80, flexShrink: 0, borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
                    <ImageUpload
                      value={product.image}
                      onChange={(img) => updateProduct(product.id, { image: img })}
                      compact
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      className="input-brand"
                      placeholder="Nama produk"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                      style={{ padding: "10px 14px", fontSize: "0.9rem" }}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        className="input-brand"
                        placeholder="Harga"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, { price: e.target.value })}
                        style={{ padding: "10px 14px", fontSize: "0.9rem", flex: 1 }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeProduct(product.id)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 10,
                          background: "rgba(255,45,85,0.08)",
                          border: "1px solid rgba(255,45,85,0.15)",
                          color: "rgba(255,45,85,0.6)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8rem",
                          cursor: "none",
                          alignSelf: "flex-end",
                        }}
                      >
                        Hapus
                      </motion.button>
                    </div>
                    <textarea
                      className="input-brand"
                      placeholder="Deskripsi produk (opsional)"
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                      style={{ padding: "10px 14px", fontSize: "0.9rem", resize: "none", minHeight: 60 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* WhatsApp module */}
      {isActive("whatsapp") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="glass"
          style={{ borderRadius: 16, padding: 20, marginTop: 16 }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
            💬 WhatsApp
          </div>
          <input
            className="input-brand"
            placeholder="Nomor WhatsApp (contoh: 628123456789)"
            value={form.contact.whatsapp}
            onChange={(e) => onUpdate({ contact: { ...form.contact, whatsapp: e.target.value } })}
          />
        </motion.div>
      )}

      {/* Contact module */}
      {isActive("contact") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="glass"
          style={{ borderRadius: 16, padding: 20, marginTop: 16 }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
            📞 Kontak & Sosial Media
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              className="input-brand"
              placeholder="Email"
              value={form.contact.email}
              onChange={(e) => onUpdate({ contact: { ...form.contact, email: e.target.value } })}
            />
            <input
              className="input-brand"
              placeholder="Lokasi (contoh: Jakarta Selatan)"
              value={form.contact.location}
              onChange={(e) => onUpdate({ contact: { ...form.contact, location: e.target.value } })}
            />
            <input
              className="input-brand"
              placeholder="Username Instagram (tanpa @)"
              value={form.contact.instagram}
              onChange={(e) => onUpdate({ contact: { ...form.contact, instagram: e.target.value } })}
            />
            <input
              className="input-brand"
              placeholder="Link Shopee"
              value={form.contact.shopee}
              onChange={(e) => onUpdate({ contact: { ...form.contact, shopee: e.target.value } })}
            />
            <input
              className="input-brand"
              placeholder="Username TikTok"
              value={form.contact.tiktok}
              onChange={(e) => onUpdate({ contact: { ...form.contact, tiktok: e.target.value } })}
            />
          </div>
        </motion.div>
      )}

      {/* CTA module */}
      {isActive("cta") && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass"
          style={{ borderRadius: 16, padding: 20, marginTop: 16 }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
            🎯 CTA Button
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="input-brand"
              placeholder="Teks tombol (contoh: Pesan Sekarang)"
              style={{ flex: 1 }}
            />
            <input
              className="input-brand"
              placeholder="Link (opsional)"
              style={{ flex: 1 }}
            />
          </div>
        </motion.div>
      )}

      <div style={{ marginTop: 48, display: "flex", gap: 12 }}>
        <button className="btn-ghost-brand" onClick={onBack}>Kembali</button>
        <button className="btn-launch" onClick={onNext} style={{ flex: 1 }}>
          <span>Lanjutkan</span>
        </button>
      </div>
    </div>
  )
}
