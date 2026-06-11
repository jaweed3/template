"use client"

import { FormData } from "@/types"

export function ThemePink({ data }: { data: FormData }) {
  const c = {
    primary: "#EC4899",
    secondary: "#FBCFE8",
    accent: "#BE185D",
    bg: "#FDF2F8",
    bgLight: "#FFF5F9",
    text: "#831843",
    textMuted: "#BE185D",
    gradient: "linear-gradient(135deg, #EC4899, #F472B6, #FBCFE8)",
  }

  return (
    <div className="font-sans">
      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFF5F9 0%, #FDF2F8 50%, #FCE7F3 100%)" }}
      >
        {/* decorative circles */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20" style={{ background: c.primary }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full opacity-10" style={{ background: c.primary }} />
        <div className="absolute top-1/2 right-20 w-20 h-20 rounded-full opacity-15" style={{ background: c.accent }} />

        <div className="relative z-10 text-center max-w-2xl">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.businessName}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-6 ring-4 ring-[#EC4899]/20 shadow-lg shadow-[#EC4899]/10"
            />
          )}
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: c.text }}>
            {data.businessName}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-0.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-2 h-2 rounded-full" style={{ background: c.primary }} />
            <span className="w-8 h-0.5 rounded-full" style={{ background: c.primary }} />
          </div>
          <p className="text-lg leading-relaxed mb-10" style={{ color: c.textMuted }}>
            {data.tagline}
          </p>
          <a
            href={`https://wa.me/${data.contact.whatsapp}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
          >
            Hubungi via WA
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: c.text }}>
            Tentang Kami
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
          </div>
          <p className="text-lg leading-relaxed" style={{ color: c.textMuted }}>
            {data.about}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 px-6" style={{ background: c.bgLight }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: c.text }}>
            Produk Kami
          </h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.products.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 25px rgba(236,72,153,0.08)",
                }}
              >
                <div className="h-48 overflow-hidden" style={{ background: c.secondary }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">🌸</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: c.text }}>
                    {p.name}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: c.textMuted }}>
                    {p.description}
                  </p>
                  <span
                    className="inline-block px-5 py-2 rounded-full text-white font-semibold text-sm"
                    style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
                  >
                    {p.price ? `Rp ${p.price}` : "Hubungi untuk harga"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {data.testimonials.length > 0 && (
        <section className="py-24 px-6" style={{ background: "#fff" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: c.text }}>
              Kata Mereka
            </h2>
            <div className="flex items-center justify-center gap-2 mb-12">
              <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.primary }} />
              <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl"
                  style={{
                    background: c.bgLight,
                    boxShadow: "0 2px 15px rgba(236,72,153,0.06)",
                  }}
                >
                  <p className="text-base leading-relaxed italic mb-4" style={{ color: c.textMuted }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="font-semibold" style={{ color: c.text }}>
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="py-24 px-6" style={{ background: c.bg }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: c.text }}>
            Hubungi Kami
          </h2>
          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.primary }} />
            <span className="w-6 h-0.5 rounded-full" style={{ background: c.primary }} />
          </div>
          <div className="space-y-3" style={{ color: c.textMuted }}>
            {data.contact.whatsapp && (
              <p>
                WhatsApp:{" "}
                <a href={`https://wa.me/${data.contact.whatsapp}`} className="font-medium" style={{ color: c.text }}>
                  {data.contact.whatsapp}
                </a>
              </p>
            )}
            {data.contact.email && (
              <p>
                Email:{" "}
                <a href={`mailto:${data.contact.email}`} className="font-medium" style={{ color: c.text }}>
                  {data.contact.email}
                </a>
              </p>
            )}
            {data.contact.location && <p style={{ color: c.text }}>{data.contact.location}</p>}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {data.contact.instagram && (
              <a
                href={`https://instagram.com/${data.contact.instagram}`}
                target="_blank"
                className="px-6 py-3 rounded-full font-medium text-sm border-2 transition hover:scale-105"
                style={{ borderColor: c.primary, color: c.primary }}
              >
                Instagram
              </a>
            )}
            {data.contact.shopee && (
              <a
                href={data.contact.shopee}
                target="_blank"
                className="px-6 py-3 rounded-full font-medium text-sm border-2 transition hover:scale-105"
                style={{ borderColor: c.primary, color: c.primary }}
              >
                Shopee
              </a>
            )}
            {data.contact.tiktok && (
              <a
                href={`https://tiktok.com/@${data.contact.tiktok}`}
                target="_blank"
                className="px-6 py-3 rounded-full font-medium text-sm border-2 transition hover:scale-105"
                style={{ borderColor: c.primary, color: c.primary }}
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-sm" style={{ background: c.text, color: "#FDF2F8" }}>
        &copy; 2026 {data.businessName}. Dibuat oleh {data.studentName}.
      </footer>
    </div>
  )
}
