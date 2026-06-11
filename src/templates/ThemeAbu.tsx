"use client"

import { FormData } from "@/types"

export function ThemeAbu({ data }: { data: FormData }) {
  const c = {
    primary: "#1F2937",
    secondary: "#111827",
    accent: "#9CA3AF",
    bg: "#030712",
    bgLight: "#F3F4F6",
    text: "#111827",
    textMuted: "#6B7280",
    gradient: "linear-gradient(135deg, #1F2937, #111827, #374151)",
  }

  return (
    <div className="font-sans">
      {/* HERO — bold, industrial, full dark */}
      <section
        className="relative min-h-screen flex items-center px-6"
        style={{ background: c.bg }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #374151 0%, transparent 40%), radial-gradient(circle at 80% 20%, #1F2937 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-4xl w-full mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {data.logo && (
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={data.logo}
                  alt={data.businessName}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white mb-6">
                {data.businessName}
              </h1>
              <p className="text-xl text-[#9CA3AF] max-w-xl mb-10 leading-relaxed">
                {data.tagline}
              </p>
              <a
                href={`https://wa.me/${data.contact.whatsapp}`}
                className="inline-block px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#9CA3AF] transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — minimal, wide */}
      <section className="py-32 px-6" style={{ background: c.bgLight }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8"
            style={{ color: c.text }}
          >
            Tentang
          </h2>
          <div className="w-24 h-1.5 bg-black mb-10" />
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: c.textMuted }}>
            {data.about}
          </p>
        </div>
      </section>

      {/* PRODUCTS — grid with border */}
      <section className="py-32 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-16"
            style={{ color: c.text }}
          >
            Produk
          </h2>
          <div className="grid md:grid-cols-3 gap-0 border-t border-l border-black/10">
            {data.products.map((p) => (
              <div
                key={p.id}
                className="p-8 border-b border-r border-black/10 flex flex-col hover:bg-[#F9FAFB] transition-colors"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-52 object-cover mb-6 grayscale hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-52 bg-[#F3F4F6] flex items-center justify-center mb-6 text-4xl">
                    ◆
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-3 uppercase" style={{ color: c.text }}>
                  {p.name}
                </h3>
                <p className="text-sm mb-6 flex-1" style={{ color: c.textMuted }}>
                  {p.description}
                </p>
                <span className="inline-block font-bold text-lg" style={{ color: c.text }}>
                  {p.price ? `Rp ${p.price}` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {data.testimonials.length > 0 && (
        <section className="py-32 px-6" style={{ background: c.bgLight }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-16"
              style={{ color: c.text }}
            >
              Testimoni
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.testimonials.map((t) => (
                <div key={t.id} className="border-l-8 p-8" style={{ borderColor: c.text, background: "#fff" }}>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: c.textMuted }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="font-bold uppercase tracking-wider text-sm" style={{ color: c.text }}>
                    — {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="py-32 px-6" style={{ background: c.bg }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
            Kontak
          </h2>
          <div className="w-24 h-1.5 bg-white mx-auto mb-12" />
          <div className="space-y-3 text-[#9CA3AF]">
            {data.contact.whatsapp && (
              <p>
                WA:{" "}
                <a href={`https://wa.me/${data.contact.whatsapp}`} className="text-white hover:text-[#9CA3AF] transition font-medium">
                  {data.contact.whatsapp}
                </a>
              </p>
            )}
            {data.contact.email && (
              <p>
                Email:{" "}
                <a href={`mailto:${data.contact.email}`} className="text-white hover:text-[#9CA3AF] transition font-medium">
                  {data.contact.email}
                </a>
              </p>
            )}
            {data.contact.location && <p>{data.contact.location}</p>}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {data.contact.instagram && (
              <a href={`https://instagram.com/${data.contact.instagram}`} target="_blank" className="px-8 py-3 border border-white/30 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition font-medium">
                IG
              </a>
            )}
            {data.contact.shopee && (
              <a href={data.contact.shopee} target="_blank" className="px-8 py-3 border border-white/30 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition font-medium">
                Shopee
              </a>
            )}
            {data.contact.tiktok && (
              <a href={`https://tiktok.com/@${data.contact.tiktok}`} target="_blank" className="px-8 py-3 border border-white/30 text-white uppercase tracking-widest text-sm hover:bg-white hover:text-black transition font-medium">
                TikTok
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-sm" style={{ background: "#000", color: "#4B5563" }}>
        &copy; 2026 {data.businessName}. Dibuat oleh {data.studentName}.
      </footer>
    </div>
  )
}
