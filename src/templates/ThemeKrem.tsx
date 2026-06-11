"use client"

import { FormData } from "@/types"

export function ThemeKrem({ data }: { data: FormData }) {
  const c = {
    primary: "#F5F0EB",
    secondary: "#E8DED5",
    accent: "#8B7355",
    bg: "#FAF7F4",
    bgLight: "#FDFBF9",
    text: "#2D1810",
    textMuted: "#8B7355",
    gradient: "linear-gradient(135deg, #F5F0EB, #E8DED5, #D4C5B5)",
  }

  return (
    <div className="font-serif">
      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
        style={{ background: c.bg }}
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
        <div className="relative z-10 text-center max-w-2xl">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.businessName}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-8 ring-2 ring-[#8B7355]/20 shadow-lg"
            />
          )}
          <h1
            className="text-5xl md:text-6xl font-light tracking-wide mb-4"
            style={{ color: c.text }}
          >
            {data.businessName}
          </h1>
          <div className="w-16 h-px mx-auto mb-6" style={{ background: c.accent }} />
          <p className="text-lg leading-relaxed mb-10 font-sans" style={{ color: c.textMuted }}>
            {data.tagline}
          </p>
          <a
            href={`https://wa.me/${data.contact.whatsapp}`}
            className="inline-flex items-center gap-2 px-10 py-4 font-sans tracking-wider text-sm uppercase"
            style={{
              background: c.text,
              color: c.bg,
            }}
          >
            Hubungi Kami
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-28 px-6" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6" style={{ color: c.text }}>
            Tentang Kami
          </h2>
          <div className="w-16 h-px mx-auto mb-8" style={{ background: c.accent }} />
          <p className="text-lg leading-relaxed font-sans" style={{ color: c.textMuted }}>
            {data.about}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-28 px-6" style={{ background: c.bg }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-4" style={{ color: c.text }}>
            Produk
          </h2>
          <div className="w-16 h-px mx-auto mb-16" style={{ background: c.accent }} />
          <div className="grid md:grid-cols-3 gap-8">
            {data.products.map((p) => (
              <div
                key={p.id}
                className="bg-white overflow-hidden"
                style={{ boxShadow: "0 2px 30px rgba(139,115,85,0.06)" }}
              >
                <div className="h-56 overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: c.secondary }}>
                      <span className="text-3xl opacity-40">✦</span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: c.text }}>
                    {p.name}
                  </h3>
                  <p className="text-sm mb-6 font-sans leading-relaxed" style={{ color: c.textMuted }}>
                    {p.description}
                  </p>
                  <span className="text-sm font-semibold font-sans tracking-wider" style={{ color: c.accent }}>
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
        <section className="py-28 px-6" style={{ background: "#fff" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-4" style={{ color: c.text }}>
              Testimoni
            </h2>
            <div className="w-16 h-px mx-auto mb-16" style={{ background: c.accent }} />
            <div className="grid md:grid-cols-2 gap-10">
              {data.testimonials.map((t) => (
                <div key={t.id} className="relative pl-8 border-l" style={{ borderColor: c.accent }}>
                  <p className="text-base leading-relaxed italic mb-4 font-sans" style={{ color: c.textMuted }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-sm font-semibold" style={{ color: c.text }}>
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="py-28 px-6" style={{ background: c.bg }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6" style={{ color: c.text }}>
            Hubungi Kami
          </h2>
          <div className="w-16 h-px mx-auto mb-12" style={{ background: c.accent }} />
          <div className="space-y-3 font-sans" style={{ color: c.textMuted }}>
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
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {data.contact.instagram && (
              <a href={`https://instagram.com/${data.contact.instagram}`} target="_blank" className="px-6 py-3 font-sans text-sm tracking-wider uppercase border" style={{ borderColor: c.accent, color: c.text }}>
                Instagram
              </a>
            )}
            {data.contact.shopee && (
              <a href={data.contact.shopee} target="_blank" className="px-6 py-3 font-sans text-sm tracking-wider uppercase border" style={{ borderColor: c.accent, color: c.text }}>
                Shopee
              </a>
            )}
            {data.contact.tiktok && (
              <a href={`https://tiktok.com/@${data.contact.tiktok}`} target="_blank" className="px-6 py-3 font-sans text-sm tracking-wider uppercase border" style={{ borderColor: c.accent, color: c.text }}>
                TikTok
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center font-sans text-sm" style={{ background: c.text, color: c.bg }}>
        &copy; 2026 {data.businessName}. Dibuat oleh {data.studentName}.
      </footer>
    </div>
  )
}
