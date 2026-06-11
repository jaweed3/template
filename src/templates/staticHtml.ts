import { FormData } from "@/types"
import { themeConfigs } from "./config"

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

export function generateStaticHtml(data: FormData): string {
  const theme = themeConfigs[data.theme]
  if (!theme) throw new Error(`Theme ${data.theme} not found`)

  const { colors } = theme
  const isDark = true // all themes are dark bg
  const isLuxury = data.theme === "luxury"
  const isBrutalist = data.theme === "brutalist"
  const isStreetwear = data.theme === "streetwear"

  const heroBg = isStreetwear
    ? `linear-gradient(135deg, ${colors.bg}, #1a0510)`
    : isBrutalist
    ? `linear-gradient(135deg, ${colors.bg}, #111111)`
    : isLuxury
    ? `linear-gradient(135deg, ${colors.bg}, #1a1208)`
    : `linear-gradient(135deg, ${colors.bg}, #0a0a18)`

  const ctaButton = (href: string, label: string, isOutline = false) => {
    if (isBrutalist) {
      return `<a href="${href}" style="display:inline-block;padding:16px 40px;background:white;color:black;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;font-size:0.875rem;text-decoration:none;border:none;">${esc(label)}</a>`
    }
    if (isLuxury) {
      return `<a href="${href}" style="display:inline-block;padding:16px 48px;font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.15em;font-size:0.75rem;text-decoration:none;background:${colors.primary};color:${isDark ? colors.bg : "white"};border:1px solid ${colors.primary};">${esc(label)}</a>`
    }
    if (isStreetwear) {
      return `<a href="${href}" style="display:inline-block;padding:16px 40px;border-radius:9999px;background:linear-gradient(135deg, ${colors.primary}, ${colors.secondary});color:white;font-weight:800;text-transform:uppercase;font-size:0.875rem;text-decoration:none;box-shadow:0 8px 30px rgba(255,45,85,0.3);">${esc(label)}</a>`
    }
    // default
    return `<a href="${href}" style="display:inline-block;padding:16px 40px;border-radius:9999px;color:white;font-weight:700;font-size:1.125rem;text-decoration:none;background:linear-gradient(135deg, ${colors.primary}, ${colors.secondary});box-shadow:0 8px 30px ${colors.glow};">${esc(label)}</a>`
  }

  const heroHtml = `
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;background:${heroBg};position:relative;overflow:hidden;font-family:Inter, sans-serif;">
  <div style="position:absolute;inset:0;opacity:0.15;background:radial-gradient(circle at 30% 50%, ${colors.primary} 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${colors.secondary} 0%, transparent 50%);"></div>
  ${isLuxury ? `<div style="position:absolute;inset:0;opacity:0.03;background-image:url(&#34;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A84B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&#34;);"></div>` : ""}
  ${isBrutalist ? `<div style="position:absolute;inset:0;background:radial-gradient(circle at 20% 80%, ${colors.secondary} 0%, transparent 40%), radial-gradient(circle at 80% 20%, ${colors.accent} 0%, transparent 40%);"></div>` : ""}
  <div style="position:relative;z-index:10;text-align:${isBrutalist ? "left" : "center"};max-width:${isBrutalist ? "800px" : "600px"};${isBrutalist ? "width:100%;" : ""}">
    ${data.logo ? `<img src="${esc(data.logo)}" alt="${esc(data.businessName)}" style="width:${isBrutalist ? "120px" : "112px"};height:${isBrutalist ? "120px" : "112px"};border-radius:${isBrutalist ? "0" : "50%"};object-fit:cover;margin:0 ${isBrutalist ? "0 32px" : "auto 32px"};${isBrutalist ? "filter:grayscale(100%);contrast(1.25);" : `border:4px solid ${colors.glow};box-shadow:0 10px 40px ${colors.glow};`}" />` : ""}
    <h1 style="font-size:${isBrutalist ? "4rem" : "clamp(2.5rem,6vw,4rem)"};margin:0 0 16px;font-weight:${isBrutalist ? "900" : "800"};${isBrutalist ? "text-transform:uppercase;letter-spacing:-0.05em;" : ""}color:${isLuxury ? colors.text : "white"};">${esc(data.businessName)}</h1>
    ${isLuxury ? `<div style="width:64px;height:1px;margin:0 auto 24px;background:${colors.primary};"></div>` : ""}
    <p style="font-size:1.125rem;margin:0 0 32px;color:${colors.textMuted};line-height:1.7;${isBrutalist ? "max-width:560px;" : ""}">${esc(data.tagline)}</p>
    ${data.contact.whatsapp ? ctaButton(`https://wa.me/${esc(data.contact.whatsapp)}`, "Hubungi via WA") : ""}
  </div>
</section>`

  const aboutHtml = data.about ? `
<section style="padding:96px 24px;background:${colors.bg};font-family:Inter,sans-serif;">
  <div style="max-width:720px;margin:0 auto;text-align:center;">
    <h2 style="font-size:2rem;margin:0 0 32px;font-weight:700;color:${colors.text};">Tentang <span style="color:${colors.primary};">Kami</span></h2>
    <div style="width:80px;height:4px;margin:0 auto 32px;border-radius:4px;background:linear-gradient(90deg, ${colors.primary}, ${colors.secondary});"></div>
    <p style="font-size:1.125rem;line-height:1.8;color:${colors.textMuted};">${esc(data.about)}</p>
  </div>
</section>` : ""

  const productsHtml = data.products.length ? `
<section style="padding:96px 24px;background:${isDark ? "#08080F" : "#fff"};font-family:Inter,sans-serif;">
  <div style="max-width:960px;margin:0 auto;">
    <h2 style="font-size:2rem;font-weight:700;text-align:center;margin:0 0 16px;color:${colors.text};">Produk <span style="color:${colors.primary};">Kami</span></h2>
    <div style="width:80px;height:4px;margin:0 auto 48px;border-radius:4px;background:linear-gradient(90deg, ${colors.primary}, ${colors.secondary});"></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
      ${data.products.map((p) => `
      <div style="border-radius:16px;overflow:hidden;transition:all 0.3s;box-shadow:0 4px 20px ${colors.glow};background:${colors.surface};border:1px solid rgba(255,255,255,0.04);">
        <div style="height:192px;overflow:hidden;background:rgba(255,255,255,0.02);>${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover;" />` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;color:${colors.textMuted};">📦</div>`}</div>
        <div style="padding:24px;">
          <h3 style="font-size:1.25rem;font-weight:700;margin:0 0 8px;color:${colors.text};">${esc(p.name)}</h3>
          <p style="margin:0 0 16px;font-size:0.875rem;color:${colors.textMuted};line-height:1.5;">${esc(p.description)}</p>
          <span style="display:inline-block;padding:8px 20px;border-radius:9999px;color:white;font-weight:600;font-size:0.875rem;background:linear-gradient(90deg, ${colors.primary}, ${colors.secondary});">${p.price ? `Rp ${esc(p.price)}` : "Hubungi untuk harga"}</span>
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>` : ""

  const testimonialsHtml = data.testimonials.length ? `
<section style="padding:96px 24px;background:${colors.bg};font-family:Inter,sans-serif;">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-size:2rem;font-weight:700;text-align:center;margin:0 0 16px;color:${colors.text};">Kata <span style="color:${colors.primary};">Mereka</span></h2>
    <div style="width:80px;height:4px;margin:0 auto 48px;border-radius:4px;background:linear-gradient(90deg, ${colors.primary}, ${colors.secondary});"></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;">
      ${data.testimonials.map((t) => `
      <div style="padding:24px;border-radius:16px;position:relative;background:${colors.surface};border:1px solid rgba(255,255,255,0.04);">
        <span style="font-size:3rem;position:absolute;top:-8px;left:16px;opacity:0.2;color:${colors.primary};">&ldquo;</span>
        <p style="position:relative;z-index:1;font-style:italic;margin:0 0 16px;color:${colors.textMuted};line-height:1.6;">${esc(t.text)}</p>
        <p style="font-weight:600;margin:0;color:${colors.text};">— ${esc(t.name)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>` : ""

  const socialLinks = [
    data.contact.instagram && `<a href="https://instagram.com/${esc(data.contact.instagram)}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:9999px;border:2px solid ${colors.primary};color:${colors.primary};text-decoration:none;font-weight:500;font-size:0.9rem;">Instagram</a>`,
    data.contact.shopee && `<a href="${esc(data.contact.shopee)}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:9999px;border:2px solid ${colors.primary};color:${colors.primary};text-decoration:none;font-weight:500;font-size:0.9rem;">Shopee</a>`,
    data.contact.tiktok && `<a href="https://tiktok.com/@${esc(data.contact.tiktok)}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:9999px;border:2px solid ${colors.primary};color:${colors.primary};text-decoration:none;font-weight:500;font-size:0.9rem;">TikTok</a>`,
  ].filter(Boolean).join("")

  const contactHtml = `
<section style="padding:96px 24px;background:${colors.bg};font-family:Inter,sans-serif;">
  <div style="max-width:600px;margin:0 auto;text-align:center;">
    <h2 style="font-size:2rem;font-weight:700;margin:0 0 32px;color:${colors.text};">Hubungi <span style="color:${colors.accent};">Kami</span></h2>
    <div style="width:80px;height:4px;margin:0 auto 32px;border-radius:4px;background:linear-gradient(90deg, ${colors.primary}, ${colors.secondary});"></div>
    <div style="color:${colors.textMuted};line-height:2;">
      ${data.contact.whatsapp ? `<p>WhatsApp: <a href="https://wa.me/${esc(data.contact.whatsapp)}" style="color:${colors.primary};font-weight:600;text-decoration:none;">${esc(data.contact.whatsapp)}</a></p>` : ""}
      ${data.contact.email ? `<p>Email: <a href="mailto:${esc(data.contact.email)}" style="color:${colors.primary};font-weight:600;text-decoration:none;">${esc(data.contact.email)}</a></p>` : ""}
      ${data.contact.location ? `<p>${esc(data.contact.location)}</p>` : ""}
    </div>
    ${socialLinks ? `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:40px;">${socialLinks}</div>` : ""}
  </div>
</section>`

  const footerHtml = `
<footer style="padding:32px 24px;text-align:center;font-size:0.875rem;background:#050508;color:rgba(255,255,255,0.2);font-family:Inter,sans-serif;">
  &copy; 2026 ${esc(data.businessName)}. Dibuat oleh ${esc(data.studentName)}.
</footer>`

  const body = [heroHtml, aboutHtml, productsHtml, testimonialsHtml, contactHtml, footerHtml].join("\n")

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(data.businessName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <meta name="description" content="${esc(data.tagline || data.about)}" />
  <meta property="og:title" content="${esc(data.businessName)}" />
  <meta property="og:description" content="${esc(data.tagline || data.about)}" />
  ${data.logo ? `<meta property="og:image" content="${data.logo}" />` : ""}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    img { max-width: 100%; height: auto; display: block; }
    body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background: #06060C; color: #EDEDF0; }
    a { transition: opacity 0.2s; }
    a:hover { opacity: 0.8; }
  </style>
</head>
<body>
${body}
</body>
</html>`
}
