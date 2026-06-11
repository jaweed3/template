"use client"

import { FormData } from "@/types"

export function ThemeUngu({ data }: { data: FormData }) {
  const c = {
    primary: "#7C3AED",
    secondary: "#4F46E5",
    accent: "#C4B5FD",
    bg: "#0F0A2E",
    bgLight: "#F5F3FF",
    text: "#1E1B4B",
    textMuted: "#6B7280",
    gradient: "linear-gradient(135deg, #7C3AED, #4F46E5, #6366F1)",
  }

  return (
    <div className="font-sans">
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        style={{ background: c.bg }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, #7C3AED 0%, transparent 50%), radial-gradient(circle at 70% 50%, #4F46E5 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 text-center max-w-2xl">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.businessName}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-6 ring-4 ring-[#7C3AED]/30 shadow-xl shadow-[#7C3AED]/20"
            />
          )}
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #C4B5FD, #818CF8, #A78BFA)",
            }}
          >
            {data.businessName}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#A5B4FC] leading-relaxed">
            {data.tagline}
          </p>
          <a
            href={`https://wa.me/${data.contact.whatsapp}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
            style={{ background: c.gradient }}
          >
            Hubungi via WA
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6" style={{ background: c.bgLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: c.text }}>
            Tentang{" "}
            <span style={{ color: c.primary }}>Kami</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-8 rounded-full"
            style={{ background: c.gradient }}
          />
          <p className="text-lg leading-relaxed" style={{ color: c.textMuted }}>
            {data.about}
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 px-6" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: c.text }}>
            Produk <span style={{ color: c.primary }}>Kami</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-12 rounded-full"
            style={{ background: c.gradient }}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {data.products.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ boxShadow: "0 4px 20px rgba(124,58,237,0.1)" }}
              >
                <div className="h-48 overflow-hidden" style={{ background: c.bgLight }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl" style={{ color: c.accent }}>
                      📦
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: c.text }}>
                    {p.name}
                  </h3>
                  <p className="mb-4" style={{ color: c.textMuted }}>
                    {p.description}
                  </p>
                  <span
                    className="inline-block px-4 py-2 rounded-full text-white font-semibold text-sm"
                    style={{ background: c.gradient }}
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
        <section className="py-24 px-6" style={{ background: c.bgLight }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: c.text }}>
              Kata <span style={{ color: c.primary }}>Mereka</span>
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-12 rounded-full"
              style={{ background: c.gradient }}
            />
            <div className="grid md:grid-cols-2 gap-6">
              {data.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl relative"
                  style={{
                    background: "#fff",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.08)",
                  }}
                >
                  <span className="text-5xl absolute -top-2 left-4 opacity-20" style={{ color: c.primary }}>
                    &ldquo;
                  </span>
                  <p className="relative z-10 italic mb-4" style={{ color: c.textMuted }}>
                    {t.text}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Hubungi <span style={{ color: c.accent }}>Kami</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-12 rounded-full"
            style={{ background: c.gradient }}
          />
          <div className="space-y-4 text-white/80">
            {data.contact.whatsapp && (
              <p>
                WhatsApp:{" "}
                <a href={`https://wa.me/${data.contact.whatsapp}`} className="text-[#A5B4FC] hover:underline font-medium">
                  {data.contact.whatsapp}
                </a>
              </p>
            )}
            {data.contact.email && (
              <p>
                Email:{" "}
                <a href={`mailto:${data.contact.email}`} className="text-[#A5B4FC] hover:underline font-medium">
                  {data.contact.email}
                </a>
              </p>
            )}
            {data.contact.location && <p>{data.contact.location}</p>}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {data.contact.instagram && (
              <a
                href={`https://instagram.com/${data.contact.instagram}`}
                target="_blank"
                className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition font-medium backdrop-blur-sm"
              >
                Instagram
              </a>
            )}
            {data.contact.shopee && (
              <a
                href={data.contact.shopee}
                target="_blank"
                className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition font-medium backdrop-blur-sm"
              >
                Shopee
              </a>
            )}
            {data.contact.tiktok && (
              <a
                href={`https://tiktok.com/@${data.contact.tiktok}`}
                target="_blank"
                className="px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition font-medium backdrop-blur-sm"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-sm" style={{ background: "#07051A", color: "#6B7280" }}>
        &copy; 2026 {data.businessName}. Dibuat oleh {data.studentName}.
      </footer>
    </div>
  )
}
