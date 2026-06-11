import { FormData } from "@/types"

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function section(label: string, html: string): string {
  if (!html) return ""
  return html
}

const c = {
  ungu: {
    bg: "#0F0A2E", bgLight: "#F5F3FF", text: "#1E1B4B", textMuted: "#6B7280",
    primary: "#7C3AED", secondary: "#4F46E5", accent: "#C4B5FD",
    gradient: "linear-gradient(135deg, #7C3AED, #4F46E5, #6366F1)",
    heroGrad: "linear-gradient(135deg, #C4B5FD, #818CF8, #A78BFA)",
    font: "Inter, sans-serif",
  },
  abu: {
    bg: "#030712", bgLight: "#F3F4F6", text: "#111827", textMuted: "#6B7280",
    primary: "#1F2937", secondary: "#111827", accent: "#9CA3AF",
    gradient: "linear-gradient(135deg, #1F2937, #111827, #374151)",
    heroGrad: "#FFFFFF",
    font: "Inter, sans-serif",
  },
  krem: {
    bg: "#FAF7F4", bgLight: "#FDFBF9", text: "#2D1810", textMuted: "#8B7355",
    primary: "#F5F0EB", secondary: "#E8DED5", accent: "#8B7355",
    gradient: "linear-gradient(135deg, #F5F0EB, #E8DED5, #D4C5B5)",
    heroGrad: "#2D1810",
    font: "Playfair Display, Inter, serif",
  },
  pink: {
    bg: "#FDF2F8", bgLight: "#FFF5F9", text: "#831843", textMuted: "#BE185D",
    primary: "#EC4899", secondary: "#FBCFE8", accent: "#BE185D",
    gradient: "linear-gradient(135deg, #EC4899, #F472B6, #FBCFE8)",
    heroGrad: "#831843",
    font: "Inter, sans-serif",
  },
}

function heroUngu(data: FormData, t: typeof c.ungu): string {
  return `
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;background:${t.bg};position:relative;overflow:hidden;font-family:${t.font};">
  <div style="position:absolute;inset:0;opacity:0.2;background:radial-gradient(circle at 30% 50%, #7C3AED 0%, transparent 50%), radial-gradient(circle at 70% 50%, #4F46E5 0%, transparent 50%);"></div>
  <div style="position:relative;z-index:10;text-align:center;max-width:600px;">
    ${data.logo ? `<img src="${escape(data.logo)}" alt="${escape(data.businessName)}" style="width:112px;height:112px;border-radius:50%;object-fit:cover;margin:0 auto 24px;border:4px solid rgba(196,181,253,0.3);box-shadow:0 10px 40px rgba(124,58,237,0.2);" />` : ""}
    <h1 style="font-size:3rem;margin:0 0 16px;font-weight:800;background:${t.heroGrad};-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${escape(data.businessName)}</h1>
    <p style="font-size:1.125rem;margin:0 0 32px;color:#A5B4FC;line-height:1.7;">${escape(data.tagline)}</p>
    ${data.contact.whatsapp ? `<a href="https://wa.me/${escape(data.contact.whatsapp)}" style="display:inline-block;padding:16px 40px;border-radius:50px;color:white;font-weight:700;font-size:1.125rem;text-decoration:none;background:${t.gradient};box-shadow:0 8px 30px rgba(124,58,237,0.3);">Hubungi via WA</a>` : ""}
  </div>
</section>`
}

function heroAbu(data: FormData, t: typeof c.abu): string {
  return `
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;background:${t.bg};position:relative;overflow:hidden;font-family:${t.font};">
  <div style="position:absolute;inset:0;background:radial-gradient(circle at 20% 80%, #374151 0%, transparent 40%), radial-gradient(circle at 80% 20%, #1F2937 0%, transparent 40%);"></div>
  <div style="position:relative;z-index:10;max-width:800px;width:100%;">
    <div style="display:flex;flex-direction:column;align-items:flex-start;gap:32px;">
      ${data.logo ? `<div style="width:120px;height:120px;flex-shrink:0;"><img src="${escape(data.logo)}" alt="${escape(data.businessName)}" style="width:100%;height:100%;object-fit:cover;filter:grayscale(100%);contrast(1.25);" /></div>` : ""}
      <div>
        <h1 style="font-size:4rem;margin:0 0 24px;font-weight:900;text-transform:uppercase;letter-spacing:-0.05em;color:white;line-height:1;">${escape(data.businessName)}</h1>
        <p style="font-size:1.25rem;margin:0 0 40px;color:#9CA3AF;max-width:560px;line-height:1.7;">${escape(data.tagline)}</p>
        ${data.contact.whatsapp ? `<a href="https://wa.me/${escape(data.contact.whatsapp)}" style="display:inline-block;padding:16px 40px;background:white;color:black;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;font-size:0.875rem;text-decoration:none;">Hubungi Kami</a>` : ""}
      </div>
    </div>
  </div>
</section>`
}

function heroKrem(data: FormData, t: typeof c.krem): string {
  return `
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;background:${t.bg};position:relative;overflow:hidden;text-align:center;font-family:${t.font};">
  <div style="position:absolute;inset:0;opacity:0.03;background-image:url(&#34;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&#34;);"></div>
  <div style="position:relative;z-index:10;max-width:600px;">
    ${data.logo ? `<img src="${escape(data.logo)}" alt="${escape(data.businessName)}" style="width:96px;height:96px;border-radius:50%;object-fit:cover;margin:0 auto 32px;border:2px solid rgba(139,115,85,0.2);box-shadow:0 4px 20px rgba(0,0,0,0.06);" />` : ""}
    <h1 style="font-size:3rem;margin:0 0 16px;font-weight:300;letter-spacing:0.02em;color:${t.text};">${escape(data.businessName)}</h1>
    <div style="width:64px;height:1px;margin:0 auto 24px;background:${t.accent};"></div>
    <p style="font-size:1.125rem;margin:0 0 40px;color:${t.textMuted};line-height:1.7;">${escape(data.tagline)}</p>
    ${data.contact.whatsapp ? `<a href="https://wa.me/${escape(data.contact.whatsapp)}" style="display:inline-block;padding:16px 40px;font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.05em;font-size:0.875rem;text-decoration:none;background:${t.text};color:${t.bg};">Hubungi Kami</a>` : ""}
  </div>
</section>`
}

function heroPink(data: FormData, t: typeof c.pink): string {
  return `
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;position:relative;overflow:hidden;text-align:center;font-family:${t.font};background:linear-gradient(135deg, #FFF5F9 0%, #FDF2F8 50%, #FCE7F3 100%);">
  <div style="position:absolute;top:40px;left:40px;width:160px;height:160px;border-radius:50%;opacity:0.2;background:${t.primary};"></div>
  <div style="position:absolute;bottom:40px;right:40px;width:240px;height:240px;border-radius:50%;opacity:0.1;background:${t.primary};"></div>
  <div style="position:absolute;top:50%;right:80px;width:80px;height:80px;border-radius:50%;opacity:0.15;background:${t.accent};"></div>
  <div style="position:relative;z-index:10;max-width:600px;">
    ${data.logo ? `<img src="${escape(data.logo)}" alt="${escape(data.businessName)}" style="width:112px;height:112px;border-radius:50%;object-fit:cover;margin:0 auto 24px;border:4px solid rgba(236,72,153,0.2);box-shadow:0 10px 30px rgba(236,72,153,0.1);" />` : ""}
    <h1 style="font-size:3rem;margin:0 0 16px;font-weight:800;color:${t.text};">${escape(data.businessName)}</h1>
    <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:24px;">
      <span style="width:32px;height:2px;border-radius:2px;background:${t.primary};display:inline-block;"></span>
      <span style="width:8px;height:8px;border-radius:50%;background:${t.primary};display:inline-block;"></span>
      <span style="width:32px;height:2px;border-radius:2px;background:${t.primary};display:inline-block;"></span>
    </div>
    <p style="font-size:1.125rem;margin:0 0 40px;color:${t.textMuted};line-height:1.7;">${escape(data.tagline)}</p>
    ${data.contact.whatsapp ? `<a href="https://wa.me/${escape(data.contact.whatsapp)}" style="display:inline-block;padding:16px 32px;border-radius:50px;color:white;font-weight:700;font-size:1.125rem;text-decoration:none;box-shadow:0 8px 25px rgba(236,72,153,0.3);background:linear-gradient(135deg, ${t.primary}, ${t.accent});">Hubungi via WA</a>` : ""}
  </div>
</section>`
}

function aboutSection(data: FormData, t: any): string {
  return `
<section style="padding:96px 24px;background:${t.bgLight};font-family:Inter,sans-serif;">
  <div style="max-width:720px;margin:0 auto;text-align:center;">
    <h2 style="font-size:2rem;margin:0 0 32px;font-weight:700;color:${t.text};">Tentang <span style="color:${t.primary};">Kami</span></h2>
    <div style="width:80px;height:4px;margin:0 auto 32px;border-radius:4px;background:${t.gradient};"></div>
    <p style="font-size:1.125rem;line-height:1.8;color:${t.textMuted};">${escape(data.about)}</p>
  </div>
</section>`
}

function productsSection(data: FormData, t: any, themeId: string): string {
  const isAbu = themeId === "abu"
  const isKrem = themeId === "krem"
  const cards = data.products.map((p) => {
    if (isAbu) {
      return `
<div style="padding:32px;border-bottom:1px solid rgba(0,0,0,0.1);border-right:1px solid rgba(0,0,0,0.1);display:flex;flex-direction:column;">
  ${p.image ? `<img src="${escape(p.image)}" alt="${escape(p.name)}" style="width:100%;height:208px;object-fit:cover;margin-bottom:24px;filter:grayscale(100%);" />` : `<div style="width:100%;height:208px;background:#F3F4F6;display:flex;align-items:center;justify-content:center;margin-bottom:24px;font-size:2rem;">◆</div>`}
  <h3 style="font-size:1.5rem;font-weight:800;text-transform:uppercase;margin:0 0 12px;color:${t.text};">${escape(p.name)}</h3>
  <p style="font-size:0.875rem;margin:0 0 24px;flex:1;color:${t.textMuted};">${escape(p.description)}</p>
  <span style="font-weight:700;font-size:1.125rem;color:${t.text};">${p.price ? `Rp ${escape(p.price)}` : "—"}</span>
</div>`
    }
    if (isKrem) {
      return `
<div style="background:white;overflow:hidden;box-shadow:0 2px 30px rgba(139,115,85,0.06);">
  <div style="height:224px;overflow:hidden;">${p.image ? `<img src="${escape(p.image)}" alt="${escape(p.name)}" style="width:100%;height:100%;object-fit:cover;" />` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${t.secondary};"><span style="font-size:2rem;opacity:0.4;">✦</span></div>`}</div>
  <div style="padding:32px;">
    <h3 style="font-size:1.25rem;font-weight:600;margin:0 0 12px;color:${t.text};">${escape(p.name)}</h3>
    <p style="font-size:0.875rem;margin:0 0 24px;line-height:1.6;color:${t.textMuted};">${escape(p.description)}</p>
    <span style="font-size:0.875rem;font-weight:600;letter-spacing:0.05em;color:${t.accent};">${p.price ? `Rp ${escape(p.price)}` : "Hubungi untuk harga"}</span>
  </div>
</div>`
    }
    // default (ungu/pink)
    const isPink = themeId === "pink"
    return `
<div style="border-radius:${isPink ? "24px" : "16px"};overflow:hidden;transition:all 0.3s;box-shadow:0 4px 20px ${isPink ? "rgba(236,72,153,0.08)" : "rgba(124,58,237,0.1)"};background:white;">
  <div style="height:192px;overflow:hidden;background:${isPink ? t.secondary : t.bgLight};">${p.image ? `<img src="${escape(p.image)}" alt="${escape(p.name)}" style="width:100%;height:100%;object-fit:cover;" />` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;">${isPink ? "🌸" : "📦"}</div>`}</div>
  <div style="padding:24px;">
    <h3 style="font-size:1.25rem;font-weight:700;margin:0 0 8px;color:${t.text};">${escape(p.name)}</h3>
    <p style="margin:0 0 16px;color:${t.textMuted};">${escape(p.description)}</p>
    <span style="display:inline-block;padding:8px 20px;border-radius:${isPink ? "9999px" : "9999px"};color:white;font-weight:600;font-size:0.875rem;background:${t.gradient};">${p.price ? `Rp ${escape(p.price)}` : "Hubungi untuk harga"}</span>
  </div>
</div>`
  }).join("")

  const label = isAbu ? `<h2 style="font-size:3rem;margin:0 0 64px;font-weight:900;text-transform:uppercase;letter-spacing:-0.03em;color:${t.text};">Produk</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));border-top:1px solid rgba(0,0,0,0.1);border-left:1px solid rgba(0,0,0,0.1);">${cards}</div>`
    : isKrem ? `<h2 style="font-size:2rem;font-weight:300;letter-spacing:0.02em;text-align:center;margin:0 0 16px;color:${t.text};">Produk</h2>
<div style="width:64px;height:1px;margin:0 auto 64px;background:${t.accent};"></div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;">${cards}</div>`
    : `<h2 style="font-size:2rem;font-weight:700;text-align:center;margin:0 0 16px;color:${t.text};">Produk <span style="color:${t.primary};">Kami</span></h2>
<div style="width:80px;height:4px;margin:0 auto 48px;border-radius:4px;background:${t.gradient};"></div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">${cards}</div>`

  return `<section style="padding:96px 24px;background:${isKrem ? t.bg : "#fff"};font-family:Inter,sans-serif;"><div style="max-width:960px;margin:0 auto;">${label}</div></section>`
}

function testimonialsSection(data: FormData, t: any, themeId: string): string {
  if (!data.testimonials.length) return ""
  const items = data.testimonials.map((item) => {
    if (themeId === "abu") {
      return `<div style="border-left:8px solid ${t.text};padding:32px;background:white;">
  <p style="font-size:1.125rem;line-height:1.6;margin:0 0 24px;color:${t.textMuted};">&ldquo;${escape(item.text)}&rdquo;</p>
  <p style="font-weight:700;text-transform:uppercase;letter-spacing:0.05em;font-size:0.875rem;margin:0;color:${t.text};">— ${escape(item.name)}</p>
</div>`
    }
    if (themeId === "krem") {
      return `<div style="padding-left:32px;border-left:1px solid ${t.accent};">
  <p style="font-size:1rem;line-height:1.6;font-style:italic;margin:0 0 16px;color:${t.textMuted};">&ldquo;${escape(item.text)}&rdquo;</p>
  <p style="font-size:0.875rem;font-weight:600;margin:0;color:${t.text};">${escape(item.name)}</p>
</div>`
    }
    // default
    const isPink = themeId === "pink"
    return `<div style="padding:24px;border-radius:${isPink ? "16px" : "16px"};position:relative;background:white;box-shadow:0 4px 20px ${isPink ? "rgba(236,72,153,0.06)" : "rgba(124,58,237,0.08)"};">
  <span style="font-size:3rem;position:absolute;top:-8px;left:16px;opacity:0.2;color:${t.primary};">&ldquo;</span>
  <p style="position:relative;z-index:1;font-style:italic;margin:0 0 16px;color:${t.textMuted};">${escape(item.text)}</p>
  <p style="font-weight:600;margin:0;color:${t.text};">— ${escape(item.name)}</p>
</div>`
  }).join("")

  const label = themeId === "abu"
    ? `<h2 style="font-size:3rem;margin:0 0 64px;font-weight:900;text-transform:uppercase;letter-spacing:-0.03em;color:${t.text};">Testimoni</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px;">${items}</div>`
    : themeId === "krem"
    ? `<h2 style="font-size:2rem;font-weight:300;letter-spacing:0.02em;text-align:center;margin:0 0 16px;color:${t.text};">Testimoni</h2>
<div style="width:64px;height:1px;margin:0 auto 64px;background:${t.accent};"></div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;">${items}</div>`
    : `<h2 style="font-size:2rem;font-weight:700;text-align:center;margin:0 0 16px;color:${t.text};">Kata <span style="color:${t.primary};">Mereka</span></h2>
<div style="width:80px;height:4px;margin:0 auto 48px;border-radius:4px;background:${t.gradient};"></div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;">${items}</div>`

  return `<section style="padding:96px 24px;background:${themeId === "abu" || themeId === "krem" ? t.bgLight : "#fff"};font-family:Inter,sans-serif;"><div style="max-width:800px;margin:0 auto;">${label}</div></section>`
}

function contactSection(data: FormData, t: any, themeId: string): string {
  const isDark = themeId === "ungu" || themeId === "abu"
  const bg = themeId === "ungu" ? t.bg : themeId === "abu" ? t.bg : themeId === "krem" ? t.bg : t.bg
  const textColor = isDark ? "white" : t.text
  const linkColor = themeId === "ungu" ? "#A5B4FC" : isDark ? "white" : t.text

  const socials = [
    data.contact.instagram && `<a href="https://instagram.com/${escape(data.contact.instagram)}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:${themeId === "pink" ? "9999px" : themeId === "krem" ? "0" : "9999px"};${isDark ? "background:rgba(255,255,255,0.1);color:white;backdrop-filter:blur(4px);" : themeId === "krem" ? "border:1px solid " + t.accent + ";color:" + t.text : "border:2px solid " + t.primary + ";color:" + t.primary};text-decoration:none;font-weight:500;font-size:0.9rem;">Instagram</a>`,
    data.contact.shopee && `<a href="${escape(data.contact.shopee)}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:${themeId === "pink" ? "9999px" : themeId === "krem" ? "0" : "9999px"};${isDark ? "background:rgba(255,255,255,0.1);color:white;backdrop-filter:blur(4px);" : themeId === "krem" ? "border:1px solid " + t.accent + ";color:" + t.text : "border:2px solid " + t.primary + ";color:" + t.primary};text-decoration:none;font-weight:500;font-size:0.9rem;">Shopee</a>`,
    data.contact.tiktok && `<a href="https://tiktok.com/@${escape(data.contact.tiktok)}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:${themeId === "pink" ? "9999px" : themeId === "krem" ? "0" : "9999px"};${isDark ? "background:rgba(255,255,255,0.1);color:white;backdrop-filter:blur(4px);" : themeId === "krem" ? "border:1px solid " + t.accent + ";color:" + t.text : "border:2px solid " + t.primary + ";color:" + t.primary};text-decoration:none;font-weight:500;font-size:0.9rem;">TikTok</a>`,
  ].filter(Boolean).join("")

  return `<section style="padding:96px 24px;background:${bg};font-family:Inter,sans-serif;">
  <div style="max-width:600px;margin:0 auto;text-align:center;">
    <h2 style="font-size:2rem;font-weight:700;margin:0 0 32px;color:${textColor};">Hubungi <span style="color:${t.accent};">Kami</span></h2>
    <div style="width:80px;height:4px;margin:0 auto 32px;border-radius:4px;background:${t.gradient};"></div>
    <div style="color:${isDark ? "rgba(255,255,255,0.7)" : t.textMuted};line-height:2;">
      ${data.contact.whatsapp ? `<p>WhatsApp: <a href="https://wa.me/${escape(data.contact.whatsapp)}" style="color:${linkColor};font-weight:600;text-decoration:none;">${escape(data.contact.whatsapp)}</a></p>` : ""}
      ${data.contact.email ? `<p>Email: <a href="mailto:${escape(data.contact.email)}" style="color:${linkColor};font-weight:600;text-decoration:none;">${escape(data.contact.email)}</a></p>` : ""}
      ${data.contact.location ? `<p>${escape(data.contact.location)}</p>` : ""}
    </div>
    ${socials ? `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:40px;">${socials}</div>` : ""}
  </div>
</section>`
}

function footerSection(data: FormData, t: any, themeId: string): string {
  const bg = themeId === "abu" ? "#000" : themeId === "krem" ? t.text : themeId === "pink" ? t.text : "#07051A"
  const color = themeId === "krem" || themeId === "pink" ? t.bg : "#6B7280"
  return `<footer style="padding:32px 24px;text-align:center;font-size:0.875rem;background:${bg};color:${color};font-family:Inter,sans-serif;">&copy; 2026 ${escape(data.businessName)}. Dibuat oleh ${escape(data.studentName)}.</footer>`
}

export function generateStaticHtml(data: FormData): string {
  const t = c[data.theme]
  if (!t) throw new Error(`Theme ${data.theme} not found`)

  let heroHtml = ""
  if (data.theme === "ungu") heroHtml = heroUngu(data, t as any)
  else if (data.theme === "abu") heroHtml = heroAbu(data, t as any)
  else if (data.theme === "krem") heroHtml = heroKrem(data, t as any)
  else if (data.theme === "pink") heroHtml = heroPink(data, t as any)

  const body = [
    heroHtml,
    aboutSection(data, t),
    productsSection(data, t, data.theme),
    testimonialsSection(data, t, data.theme),
    contactSection(data, t, data.theme),
    footerSection(data, t, data.theme),
  ].join("\n")

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escape(data.businessName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <meta name="description" content="${escape(data.tagline || data.about)}" />
  <meta property="og:title" content="${escape(data.businessName)}" />
  <meta property="og:description" content="${escape(data.tagline || data.about)}" />
  ${data.logo ? `<meta property="og:image" content="${data.logo}" />` : ""}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    img { max-width: 100%; height: auto; display: block; }
    body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    a { transition: opacity 0.2s; }
    a:hover { opacity: 0.8; }
  </style>
</head>
<body>
${body}
</body>
</html>`
}
