import { FormData, ThemeId } from "@/types"
import { themeConfigs } from "./config"

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function slug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

// ────────────────────────────── THEME STYLE PRESETS ──────────────────────────────

type ThemeStyle = {
  headingFont: string
  bodyFont: string
  heroAlign: "center" | "left"
  cardRadius: string
  cardStyle: string
  sectionSpacing: string
  divider: string
  buttonStyle: "rounded" | "sharp" | "pill" | "outline"
  decorative: string
  heroDecor: string
  headingWeight: string
  headingSize: string
  useGlass: boolean
  useGradients: boolean
  useBorders: boolean
  proseWidth: string
}

const themeStyles: Record<ThemeId, ThemeStyle> = {
  mystic: {
    headingFont: "'Space Grotesk', sans-serif",
    bodyFont: "Inter, sans-serif",
    heroAlign: "center",
    cardRadius: "20px",
    cardStyle: "background:rgba(124,58,237,0.04);border:1px solid rgba(124,58,237,0.1);backdrop-filter:blur(12px);",
    sectionSpacing: "120px 24px",
    divider: `<div style="width:60px;height:3px;margin:0 auto 48px;border-radius:4px;background:linear-gradient(90deg,#7C3AED,#A78BFA);"></div>`,
    buttonStyle: "rounded",
    decorative: `<div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.08),transparent 60%);pointer-events:none;"></div>`,
    heroDecor: `<div style="position:absolute;inset:0;opacity:0.12;background:radial-gradient(circle at 30% 50%,#7C3AED 0%,transparent 50%),radial-gradient(circle at 70% 50%,#4F46E5 0%,transparent 50%);"></div>`,
    headingWeight: "800",
    headingSize: "clamp(2.5rem,7vw,4.5rem)",
    useGlass: true,
    useGradients: true,
    useBorders: false,
    proseWidth: "640px",
  },
  brutalist: {
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
    heroAlign: "left",
    cardRadius: "0",
    cardStyle: "border:1px solid rgba(255,255,255,0.1);",
    sectionSpacing: "100px 24px",
    divider: `<div style="width:100%;height:1px;margin:0 0 48px;background:rgba(255,255,255,0.06);"></div>`,
    buttonStyle: "sharp",
    decorative: ``,
    heroDecor: `<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.01) 40px,rgba(255,255,255,0.01) 41px);"></div>`,
    headingWeight: "900",
    headingSize: "clamp(3rem,8vw,5rem)",
    useGlass: false,
    useGradients: false,
    useBorders: true,
    proseWidth: "720px",
  },
  luxury: {
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont: "Inter, sans-serif",
    heroAlign: "center",
    cardRadius: "0",
    cardStyle: "border:1px solid rgba(212,168,75,0.08);background:rgba(212,168,75,0.02);",
    sectionSpacing: "120px 24px",
    divider: `<div style="width:48px;height:1px;margin:0 auto 40px;background:rgba(212,168,75,0.3);"></div>`,
    buttonStyle: "outline",
    decorative: `<div style="position:absolute;inset:0;opacity:0.02;background-image:url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23D4A84B\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');pointer-events:none;"></div>`,
    heroDecor: `<div style="position:absolute;inset:0;opacity:0.06;background:radial-gradient(circle at 50% 50%,rgba(212,168,75,0.2),transparent 60%);"></div>`,
    headingWeight: "400",
    headingSize: "clamp(2.5rem,6vw,4rem)",
    useGlass: false,
    useGradients: false,
    useBorders: true,
    proseWidth: "600px",
  },
  streetwear: {
    headingFont: "'DM Sans', sans-serif",
    bodyFont: "Inter, sans-serif",
    heroAlign: "center",
    cardRadius: "24px",
    cardStyle: "border:1px solid rgba(255,45,85,0.12);background:rgba(255,45,85,0.04);backdrop-filter:blur(8px);",
    sectionSpacing: "100px 24px",
    divider: `<div style="width:80px;height:4px;margin:0 auto 40px;border-radius:4px;background:linear-gradient(90deg,#FF2D55,#FFD60A);"></div>`,
    buttonStyle: "pill",
    decorative: `<div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,45,85,0.06),transparent 60%);pointer-events:none;"></div>`,
    heroDecor: `<div style="position:absolute;inset:0;opacity:0.08;background:radial-gradient(circle at 30% 50%,#FF2D55 0%,transparent 50%),radial-gradient(circle at 70% 50%,#FFD60A 0%,transparent 50%);"></div>`,
    headingWeight: "800",
    headingSize: "clamp(2.5rem,7vw,4rem)",
    useGlass: true,
    useGradients: true,
    useBorders: false,
    proseWidth: "640px",
  },
  agency: {
    headingFont: "'Space Grotesk', sans-serif",
    bodyFont: "Inter, sans-serif",
    heroAlign: "center",
    cardRadius: "16px",
    cardStyle: "border:1px solid rgba(0,212,255,0.08);background:rgba(0,212,255,0.03);backdrop-filter:blur(16px);",
    sectionSpacing: "120px 24px",
    divider: `<div style="width:64px;height:2px;margin:0 auto 48px;background:linear-gradient(90deg,#00D4FF,#7000FF);"></div>`,
    buttonStyle: "rounded",
    decorative: `<div style="position:absolute;inset:0;opacity:0.03;background-image:linear-gradient(0deg,transparent 49px,rgba(0,212,255,0.08) 49px,rgba(0,212,255,0.08) 50px),linear-gradient(90deg,transparent 49px,rgba(0,212,255,0.08) 49px,rgba(0,212,255,0.08) 50px);background-size:50px 50px;pointer-events:none;"></div>`,
    heroDecor: `<div style="position:absolute;inset:0;opacity:0.06;background:radial-gradient(circle at 30% 50%,#00D4FF 0%,transparent 50%),radial-gradient(circle at 70% 50%,#7000FF 0%,transparent 50%);"></div>`,
    headingWeight: "800",
    headingSize: "clamp(2.5rem,7vw,4rem)",
    useGlass: true,
    useGradients: true,
    useBorders: false,
    proseWidth: "640px",
  },
  local: {
    headingFont: "'DM Sans', sans-serif",
    bodyFont: "Inter, sans-serif",
    heroAlign: "center",
    cardRadius: "20px",
    cardStyle: "border:1px solid rgba(52,211,153,0.08);background:rgba(52,211,153,0.03);",
    sectionSpacing: "100px 24px",
    divider: `<div style="width:64px;height:3px;margin:0 auto 40px;border-radius:4px;background:linear-gradient(90deg,#34D399,#FBBF24);"></div>`,
    buttonStyle: "rounded",
    decorative: `<div style="position:absolute;inset:0;opacity:0.04;background-image:radial-gradient(circle at 20% 30%,rgba(52,211,153,0.1) 0%,transparent 50%),radial-gradient(circle at 80% 70%,rgba(251,191,36,0.08) 0%,transparent 50%);pointer-events:none;"></div>`,
    heroDecor: `<div style="position:absolute;inset:0;opacity:0.08;background:radial-gradient(circle at 50% 50%,rgba(52,211,153,0.08),transparent 60%);"></div>`,
    headingWeight: "700",
    headingSize: "clamp(2.2rem,6vw,3.5rem)",
    useGlass: false,
    useGradients: true,
    useBorders: false,
    proseWidth: "640px",
  },
}

// ────────────────────────────── BRANDDNA HELPERS ──────────────────────────────

function dnaModifiers(data: FormData) {
  const { brandDna } = data
  const isElegant = brandDna.elegance < 35
  const isPlayful = brandDna.elegance > 65
  const isMinimal = brandDna.minimalism < 35
  const isExpressive = brandDna.minimalism > 65
  const isModern = brandDna.modernity < 35
  const isClassic = brandDna.modernity > 65

  return { isElegant, isPlayful, isMinimal, isExpressive, isModern, isClassic }
}

function archetypeHeadline(archetype: string, name: string): string {
  switch (archetype) {
    case "visionary": return `The Future of <em style="font-style:normal;color:inherit;">${esc(name)}</em>`
    case "rebel": return `<span style="display:block;font-size:0.4em;font-weight:400;opacity:0.3;letter-spacing:0.15em;margin-bottom:12px;">DIFFERENT. ON PURPOSE.</span>${esc(name)}`
    case "teacher": return `Helping You <em style="font-style:normal;color:inherit;">Grow With</em> ${esc(name)}`
    case "explorer": return `Discover <em style="font-style:normal;color:inherit;">${esc(name)}</em>`
    case "craftsman": return `Made With <em style="font-style:normal;color:inherit;">Precision</em><br/>${esc(name)}`
    case "innovator": return `Introducing <em style="font-style:normal;color:inherit;">${esc(name)}</em>`
    default: return esc(name)
  }
}

// ────────────────────────────── SECTION: HERO ──────────────────────────────

function sectionHero(data: FormData, ts: ThemeStyle, tc: typeof themeConfigs.mystic.colors): string {
  const { brandDna } = data
  const m = dnaModifiers(data)
  const headline = archetypeHeadline(brandDna.archetype || "", data.businessName)

  const heroPad = m.isMinimal ? "80px 24px" : "48px 24px"
  const heroMinH = m.isExpressive ? "100vh" : "90vh"
  const titleSize = m.isClassic ? ts.headingSize.replace("clamp", "clamp").replace("4.5rem", "3.5rem").replace("5rem", "4rem") : ts.headingSize

  return `<section style="min-height:${heroMinH};display:flex;align-items:center;justify-content:center;padding:${heroPad};position:relative;overflow:hidden;font-family:${ts.bodyFont};">
  ${ts.heroDecor}
  ${ts.decorative}
  <div style="position:relative;z-index:10;text-align:${ts.heroAlign};max-width:${ts.proseWidth};${ts.heroAlign === "left" ? "width:100%;" : ""}">
    ${data.logo ? `<img src="${esc(data.logo)}" alt="${esc(data.businessName)}" style="width:80px;height:80px;border-radius:${ts.cardRadius};object-fit:cover;margin:0 ${ts.heroAlign === "left" ? "0 0 32px" : "auto 32px"};box-shadow:0 10px 40px ${tc.glow};border:2px solid rgba(255,255,255,0.06);${ts.heroAlign === "left" ? "" : "display:block;"}" />` : ""}
    <h1 style="font-family:${ts.headingFont};font-size:${titleSize};font-weight:${ts.headingWeight};margin:0 0 20px;line-height:1.08;letter-spacing:${m.isElegant ? "-0.01em" : "-0.03em"};color:${tc.text};">${headline}</h1>
    ${data.tagline ? `<p style="font-size:${m.isElegant ? "1rem" : "1.125rem"};margin:0 0 40px;color:${tc.textMuted};line-height:1.7;max-width:${m.isMinimal ? "480px" : "560px"};${ts.heroAlign === "left" ? "" : "margin:0 auto 40px;"}">${esc(data.tagline)}</p>` : ""}
    ${data.contact.whatsapp ? ctaHtml(data.contact.whatsapp, ts, tc, m) : ""}
  </div>
</section>`
}

function ctaHtml(wa: string, ts: ThemeStyle, tc: any, m: ReturnType<typeof dnaModifiers>): string {
  const href = `https://wa.me/${esc(wa)}`
  const label = "Hubungi via WhatsApp"
  const btnPad = m.isMinimal ? "14px 36px" : "16px 40px"
  const btnSize = m.isElegant ? "0.875rem" : "1rem"

  switch (ts.buttonStyle) {
    case "sharp":
      return `<a href="${href}" style="display:inline-block;padding:${btnPad};background:white;color:black;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;font-size:${btnSize};text-decoration:none;">${label}</a>`
    case "outline":
      return `<a href="${href}" style="display:inline-block;padding:${btnPad};font-family:Inter,sans-serif;text-transform:uppercase;letter-spacing:0.15em;font-size:0.75rem;text-decoration:none;background:transparent;color:${tc.primary};border:1px solid ${tc.primary};">${label}</a>`
    case "pill":
      return `<a href="${href}" style="display:inline-block;padding:${btnPad};border-radius:9999px;background:linear-gradient(135deg,${tc.primary},${tc.secondary});color:white;font-weight:800;text-transform:uppercase;font-size:${btnSize};text-decoration:none;box-shadow:0 8px 30px ${tc.glow};">${label}</a>`
    default:
      return `<a href="${href}" style="display:inline-block;padding:${btnPad};border-radius:9999px;color:white;font-weight:700;font-size:${btnSize};text-decoration:none;background:linear-gradient(135deg,${tc.primary},${tc.secondary});box-shadow:0 8px 30px ${tc.glow};">${label}</a>`
  }
}

// ────────────────────────────── SECTION: PROBLEM → SOLUTION ──────────────────────────────

function sectionProblemSolution(data: FormData, ts: ThemeStyle, tc: any): string {
  const m = dnaModifiers(data)
  if (m.isMinimal) return ""

  const problemText = "Bingung cara membangun kehadiran digital untuk bisnismu?"
  const solutionText = `Kami hadir untuk membantu ${esc(data.businessName)} tumbuh dan dikenal lebih banyak orang.`

  return `<section style="padding:${ts.sectionSpacing};background:${tc.bg};font-family:${ts.bodyFont};">
  <div style="max-width:${ts.proseWidth};margin:0 auto;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;${ts.heroAlign === "left" ? "" : "text-align:center;"}">
      <div>
        <div style="font-family:${ts.headingFont};font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:${tc.textMuted};margin-bottom:16px;">Problem</div>
        <p style="font-size:1.25rem;line-height:1.6;color:${tc.text};font-weight:500;">${problemText}</p>
      </div>
      <div>
        <div style="font-family:${ts.headingFont};font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:${tc.textMuted};margin-bottom:16px;">Solution</div>
        <p style="font-size:1.25rem;line-height:1.6;color:${tc.text};">${solutionText}</p>
      </div>
    </div>
  </div>
</section>`
}

// ────────────────────────────── SECTION: ABOUT ──────────────────────────────

function sectionAbout(data: FormData, ts: ThemeStyle, tc: any): string {
  if (!data.about) return ""

  const m = dnaModifiers(data)
  const aboutTitle = data.conversionGoal === "branding" ? "Tentang Saya" : "Tentang Kami"
  const containerStyle = m.isMinimal ? `max-width:${ts.proseWidth};margin:0 auto;` : `max-width:${ts.proseWidth};margin:0 auto;position:relative;`

  return `<section style="padding:${ts.sectionSpacing};background:${m.isClassic ? `${tc.bg}` : `rgba(255,255,255,0.01)`};font-family:${ts.bodyFont};">
  <div style="${containerStyle}text-align:${ts.heroAlign};">
    <h2 style="font-family:${ts.headingFont};font-size:${m.isElegant ? "1.8rem" : "2rem"};font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">${aboutTitle}</h2>
    ${ts.divider}
    <p style="font-size:${m.isElegant ? "1rem" : "1.125rem"};line-height:1.8;color:${tc.textMuted};">${esc(data.about)}</p>
  </div>
</section>`
}

// ────────────────────────────── SECTION: PRODUCTS ──────────────────────────────

function sectionProducts(data: FormData, ts: ThemeStyle, tc: any): string {
  if (!data.products.length) return ""

  const m = dnaModifiers(data)
  const isExpressiveGrid = m.isExpressive ? "minmax(240px,1fr)" : "minmax(280px,1fr)"

  const productTitle = data.conversionGoal === "catalog" ? "Koleksi Produk" : data.conversionGoal === "branding" ? "Layanan Saya" : "Produk Kami"

  return `<section style="padding:${ts.sectionSpacing};background:${tc.bg};font-family:${ts.bodyFont};">
  <div style="max-width:960px;margin:0 auto;text-align:${ts.heroAlign};">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">${productTitle}</h2>
    ${ts.divider}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${isExpressiveGrid}));gap:${m.isElegant ? "32px" : "24px"};">
      ${data.products.map((p) => {
        const priceTag = ts.useGradients
          ? `<span style="display:inline-block;padding:8px 20px;border-radius:9999px;color:white;font-weight:600;font-size:0.875rem;background:linear-gradient(90deg,${tc.primary},${tc.secondary});">${p.price ? `Rp ${esc(p.price)}` : "Hubungi"}</span>`
          : `<span style="font-weight:700;font-size:1rem;color:${tc.primary};">${p.price ? `Rp ${esc(p.price)}` : "Hubungi"}</span>`

        return `<div style="border-radius:${ts.cardRadius};overflow:hidden;${ts.cardStyle}">
          ${p.image
            ? `<div style="height:${m.isExpressive ? "220px" : "192px"};overflow:hidden;"><img src="${esc(p.image)}" alt="${esc(p.name)}" style="width:100%;height:100%;object-fit:cover;" /></div>`
            : `<div style="height:${m.isExpressive ? "220px" : "192px"};display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.02);"><span style="font-size:2.5rem;opacity:0.15;">✦</span></div>`}
          <div style="padding:${m.isElegant ? "28px" : "24px"};${ts.heroAlign === "left" ? "text-align:left;" : ""}">
            <h3 style="font-family:${ts.headingFont};font-size:1.15rem;font-weight:600;margin:0 0 8px;color:${tc.text};">${esc(p.name)}</h3>
            ${p.description ? `<p style="margin:0 0 16px;font-size:0.85rem;color:${tc.textMuted};line-height:1.6;">${esc(p.description)}</p>` : ""}
            ${priceTag}
          </div>
        </div>`
      }).join("")}
    </div>
  </div>
</section>`
}

// ────────────────────────────── SECTION: TRUST (Testimonials + Certificates + Partners) ──────────────────────────────

function sectionTrust(data: FormData, ts: ThemeStyle, tc: any): string {
  const m = dnaModifiers(data)
  const parts: string[] = []

  // Testimonials
  if (data.trust.reviews && data.testimonials.length) {
    parts.push(`
    <div style="margin-bottom:${data.trust.certificates || data.trust.partners ? "64px" : "0"};">
      <h3 style="font-family:${ts.headingFont};font-size:1.5rem;font-weight:${ts.headingWeight};margin:0 0 32px;color:${tc.text};">Apa Kata Mereka</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
        ${data.testimonials.map((t) => `
        <div style="padding:24px;border-radius:${ts.cardRadius};${ts.cardStyle}position:relative;">
          <span style="font-size:2.5rem;position:absolute;top:8px;left:16px;opacity:0.1;color:${tc.primary};">&ldquo;</span>
          <p style="position:relative;z-index:1;font-style:italic;margin:0 0 16px;color:${tc.textMuted};line-height:1.6;font-size:0.9rem;">${esc(t.text)}</p>
          <p style="font-weight:600;margin:0;color:${tc.text};font-size:0.85rem;">— ${esc(t.name)}</p>
        </div>`).join("")}
      </div>
    </div>`)
  }

  // Certificates
  if (data.trust.certificates) {
    parts.push(`
    <div style="margin-bottom:${data.trust.partners ? "64px" : "0"};text-align:center;">
      <h3 style="font-family:${ts.headingFont};font-size:1.5rem;font-weight:${ts.headingWeight};margin:0 0 24px;color:${tc.text};">Sertifikat &amp; Kredensial</h3>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;">
        ${["Pemasaran Digital", "Bisnis Online", "Brand Strategy"].map((cert) =>
          `<div style="padding:16px 24px;border-radius:${ts.cardRadius};${ts.cardStyle}display:flex;align-items:center;gap:10px;">
            <span style="font-size:1.2rem;">🏆</span>
            <span style="font-size:0.85rem;color:${tc.text};">${cert}</span>
          </div>`
        ).join("")}
      </div>
    </div>`)
  }

  // Partners
  if (data.trust.partners) {
    parts.push(`
    <div style="text-align:center;">
      <h3 style="font-family:${ts.headingFont};font-size:1.5rem;font-weight:${ts.headingWeight};margin:0 0 24px;color:${tc.text};">Trusted By</h3>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px;opacity:0.3;">
        ${["Partner A", "Partner B", "Partner C"].map((p) =>
          `<div style="font-family:${ts.headingFont};font-size:1rem;font-weight:700;color:${tc.text};">${esc(p)}</div>`
        ).join("")}
      </div>
    </div>`)
  }

  if (!parts.length) return ""

  return `<section style="padding:${ts.sectionSpacing};background:${m.isClassic ? tc.bg : "rgba(255,255,255,0.01)"};font-family:${ts.bodyFont};">
  <div style="max-width:800px;margin:0 auto;text-align:${ts.heroAlign};">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 48px;color:${tc.text};">Kepercayaan</h2>
    ${ts.divider}
    ${parts.join("")}
  </div>
</section>`
}

// ────────────────────────────── SECTION: LEAD FORM ──────────────────────────────

function sectionLeadForm(data: FormData, ts: ThemeStyle, tc: any): string {
  if (data.conversionGoal !== "leads") return ""

  return `<section style="padding:${ts.sectionSpacing};background:${tc.bg};font-family:${ts.bodyFont};">
  <div style="max-width:480px;margin:0 auto;text-align:center;">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">Dapatkan Penawaran Terbaik</h2>
    ${ts.divider}
    <p style="color:${tc.textMuted};margin-bottom:32px;line-height:1.6;">Isi data kamu dan kami akan menghubungi dalam 1x24 jam.</p>
    <form style="display:flex;flex-direction:column;gap:12px;">
      <input type="text" placeholder="Nama" style="width:100%;padding:14px 18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:${ts.cardRadius};color:white;font-size:0.95rem;outline:none;" />
      <input type="email" placeholder="Email" style="width:100%;padding:14px 18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:${ts.cardRadius};color:white;font-size:0.95rem;outline:none;" />
      <textarea placeholder="Pesan" style="width:100%;padding:14px 18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:${ts.cardRadius};color:white;font-size:0.95rem;outline:none;min-height:100px;resize:none;"></textarea>
      <button type="submit" style="padding:16px 40px;border:none;border-radius:${ts.cardRadius};color:${tc.bg};font-weight:700;font-size:1rem;cursor:pointer;background:linear-gradient(90deg,${tc.primary},${tc.secondary});">Kirim</button>
    </form>
  </div>
</section>`
}

// ────────────────────────────── SECTION: SERVICES (for Booking goal) ──────────────────────────────

function sectionServices(data: FormData, ts: ThemeStyle, tc: any): string {
  if (data.conversionGoal !== "booking") return ""

  const services = [
    { name: "Konsultasi", desc: "Diskusi kebutuhan bisnismu", icon: "💡" },
    { name: "Strategi", desc: "Perencanaan brand & marketing", icon: "📋" },
    { name: "Eksekusi", desc: "Implementasi bersama tim", icon: "🚀" },
  ]

  return `<section style="padding:${ts.sectionSpacing};background:rgba(255,255,255,0.01);font-family:${ts.bodyFont};">
  <div style="max-width:800px;margin:0 auto;text-align:center;">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">Layanan</h2>
    ${ts.divider}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
      ${services.map((s) => `
      <div style="padding:32px 24px;border-radius:${ts.cardRadius};${ts.cardStyle}text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:16px;">${s.icon}</div>
        <h3 style="font-family:${ts.headingFont};font-size:1.1rem;font-weight:600;margin:0 0 8px;color:${tc.text};">${s.name}</h3>
        <p style="font-size:0.85rem;color:${tc.textMuted};line-height:1.5;">${s.desc}</p>
      </div>`).join("")}
    </div>
  </div>
</section>`
}

// ────────────────────────────── SECTION: HOW IT WORKS (for Booking) ──────────────────────────────

function sectionHowItWorks(data: FormData, ts: ThemeStyle, tc: any): string {
  if (data.conversionGoal !== "booking") return ""

  const steps = ["Konsultasi", "Persetujuan", "Eksekusi", "Launch"]
  return `<section style="padding:${ts.sectionSpacing};background:${tc.bg};font-family:${ts.bodyFont};">
  <div style="max-width:600px;margin:0 auto;">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 48px;color:${tc.text};text-align:center;">Cara Kerja</h2>
    ${ts.divider}
    <div style="display:flex;flex-direction:column;gap:24px;">
      ${steps.map((s, i) => `
      <div style="display:flex;align-items:center;gap:20px;">
        <div style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:${ts.headingFont};font-weight:700;background:linear-gradient(135deg,${tc.primary},${tc.secondary});color:${tc.bg};flex-shrink:0;">${i + 1}</div>
        <div>
          <div style="font-weight:600;color:${tc.text};">${s}</div>
          <div style="font-size:0.85rem;color:${tc.textMuted};margin-top:4px;">Lorem ipsum dolor sit amet</div>
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>`
}

// ────────────────────────────── SECTION: FEATURED PRODUCTS (for Catalog goal) ──────────────────────────────

function sectionFeaturedProducts(data: FormData, ts: ThemeStyle, tc: any): string {
  if (data.conversionGoal !== "catalog" || !data.products.length) return ""

  const featured = data.products.slice(0, 3)
  return `<section style="padding:${ts.sectionSpacing};background:rgba(255,255,255,0.01);font-family:${ts.bodyFont};">
  <div style="max-width:960px;margin:0 auto;text-align:center;">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">Produk Unggulan</h2>
    ${ts.divider}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;">
      ${featured.map((p) => `
      <div style="border-radius:${ts.cardRadius};overflow:hidden;${ts.cardStyle}">
        ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" style="width:100%;height:240px;object-fit:cover;" />` : `<div style="height:240px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.02);"><span style="font-size:3rem;opacity:0.15;">✦</span></div>`}
        <div style="padding:24px;">
          <h3 style="font-family:${ts.headingFont};font-size:1.25rem;font-weight:700;margin:0 0 8px;color:${tc.text};">${esc(p.name)}</h3>
          <p style="font-size:0.85rem;color:${tc.textMuted};margin-bottom:16px;">${p.description ? esc(p.description) : ""}</p>
          <span style="font-weight:700;color:${tc.primary};">${p.price ? `Rp ${esc(p.price)}` : "Hubungi"}</span>
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>`
}

// ────────────────────────────── SECTION: CTA BANNER ──────────────────────────────

function sectionCTABanner(data: FormData, ts: ThemeStyle, tc: any): string {
  if (data.conversionGoal === "leads") return "" // lead form already acts as CTA

  return `<section style="padding:${ts.sectionSpacing};background:linear-gradient(135deg,${tc.primary}08,${tc.secondary}08);font-family:${ts.bodyFont};text-align:center;">
  <div style="max-width:480px;margin:0 auto;">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">Siap Memulai?</h2>
    <p style="color:${tc.textMuted};margin-bottom:32px;line-height:1.6;">Hubungi kami sekarang dan dapatkan penawaran terbaik untuk bisnismu.</p>
    ${data.contact.whatsapp ? ctaHtml(data.contact.whatsapp, ts, tc, dnaModifiers(data)) : ""}
  </div>
</section>`
}

// ────────────────────────────── SECTION: CONTACT ──────────────────────────────

function sectionContact(data: FormData, ts: ThemeStyle, tc: any): string {
  const socialLinks = [
    data.contact.instagram && `<a href="https://instagram.com/${esc(data.contact.instagram)}" target="_blank" style="display:inline-block;padding:10px 22px;border-radius:${ts.cardRadius};${ts.buttonStyle === "outline" ? `border:1px solid ${tc.primary};color:${tc.primary};` : `border:1px solid rgba(255,255,255,0.08);color:${tc.textMuted};`}text-decoration:none;font-size:0.85rem;">Instagram</a>`,
    data.contact.shopee && `<a href="${esc(data.contact.shopee)}" target="_blank" style="display:inline-block;padding:10px 22px;border-radius:${ts.cardRadius};${ts.buttonStyle === "outline" ? `border:1px solid ${tc.primary};color:${tc.primary};` : `border:1px solid rgba(255,255,255,0.08);color:${tc.textMuted};`}text-decoration:none;font-size:0.85rem;">Shopee</a>`,
    data.contact.tiktok && `<a href="https://tiktok.com/@${esc(data.contact.tiktok)}" target="_blank" style="display:inline-block;padding:10px 22px;border-radius:${ts.cardRadius};${ts.buttonStyle === "outline" ? `border:1px solid ${tc.primary};color:${tc.primary};` : `border:1px solid rgba(255,255,255,0.08);color:${tc.textMuted};`}text-decoration:none;font-size:0.85rem;">TikTok</a>`,
  ].filter(Boolean).join("")

  return `<section style="padding:${ts.sectionSpacing};background:${tc.bg};font-family:${ts.bodyFont};">
  <div style="max-width:${ts.proseWidth};margin:0 auto;text-align:center;">
    <h2 style="font-family:${ts.headingFont};font-size:2rem;font-weight:${ts.headingWeight};margin:0 0 16px;color:${tc.text};">Hubungi Kami</h2>
    ${ts.divider}
    <div style="color:${tc.textMuted};line-height:2.2;font-size:0.95rem;">
      ${data.contact.whatsapp ? `<p>WhatsApp: <a href="https://wa.me/${esc(data.contact.whatsapp)}" style="color:${tc.primary};font-weight:600;text-decoration:none;">${esc(data.contact.whatsapp)}</a></p>` : ""}
      ${data.contact.email ? `<p>Email: <a href="mailto:${esc(data.contact.email)}" style="color:${tc.primary};font-weight:600;text-decoration:none;">${esc(data.contact.email)}</a></p>` : ""}
      ${data.contact.location ? `<p>📍 ${esc(data.contact.location)}</p>` : ""}
    </div>
    ${socialLinks ? `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:32px;">${socialLinks}</div>` : ""}
  </div>
</section>`
}

// ────────────────────────────── SECTION: FLOATING WA (for WhatsApp goal) ──────────────────────────────

function floatingWA(data: FormData, ts: ThemeStyle, tc: any): string {
  if (data.conversionGoal !== "whatsapp" || !data.contact.whatsapp) return ""

  return `<a href="https://wa.me/${esc(data.contact.whatsapp)}" style="position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#25D366,#128C7E);display:flex;align-items:center;justify-content:center;color:white;font-size:1.8rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,0.4);z-index:999;border:none;">💬</a>`
}

// ────────────────────────────── SECTION: FOOTER ──────────────────────────────

function sectionFooter(data: FormData, ts: ThemeStyle, tc: any): string {
  return `<footer style="padding:32px 24px;text-align:center;font-size:0.8rem;background:#050508;color:rgba(255,255,255,0.12);font-family:${ts.bodyFont};border-top:1px solid rgba(255,255,255,0.03);">
  &copy; 2026 ${esc(data.businessName)}. Dibuat oleh ${esc(data.studentName)}.
</footer>`
}

// ────────────────────────────── MAIN GENERATOR ──────────────────────────────

export function generateStaticHtml(data: FormData): string {
  const tc = themeConfigs[data.theme]
  if (!tc) throw new Error(`Theme ${data.theme} not found`)

  const ts = themeStyles[data.theme]
  const cc = tc.colors

  // Determine section order based on conversion goal
  const sections: string[] = []

  sections.push(sectionHero(data, ts, cc))

  switch (data.conversionGoal) {
    case "leads":
      sections.push(sectionProblemSolution(data, ts, cc))
      sections.push(sectionAbout(data, ts, cc))
      sections.push(sectionProducts(data, ts, cc))
      sections.push(sectionLeadForm(data, ts, cc))
      sections.push(sectionTrust(data, ts, cc))
      break
    case "catalog":
      sections.push(sectionFeaturedProducts(data, ts, cc))
      sections.push(sectionProducts(data, ts, cc))
      sections.push(sectionAbout(data, ts, cc))
      sections.push(sectionTrust(data, ts, cc))
      sections.push(sectionCTABanner(data, ts, cc))
      break
    case "whatsapp":
      sections.push(sectionProblemSolution(data, ts, cc))
      sections.push(sectionTrust(data, ts, cc))
      sections.push(sectionProducts(data, ts, cc))
      sections.push(sectionAbout(data, ts, cc))
      sections.push(sectionCTABanner(data, ts, cc))
      break
    case "booking":
      sections.push(sectionServices(data, ts, cc))
      sections.push(sectionHowItWorks(data, ts, cc))
      sections.push(sectionTrust(data, ts, cc))
      sections.push(sectionAbout(data, ts, cc))
      sections.push(sectionCTABanner(data, ts, cc))
      break
    case "branding":
      sections.push(sectionAbout(data, ts, cc))
      sections.push(sectionProducts(data, ts, cc)) // used as "Layanan Saya"
      sections.push(sectionTrust(data, ts, cc))
      sections.push(sectionCTABanner(data, ts, cc))
      break
    default:
      sections.push(sectionAbout(data, ts, cc))
      sections.push(sectionProducts(data, ts, cc))
      sections.push(sectionTrust(data, ts, cc))
      sections.push(sectionCTABanner(data, ts, cc))
  }

  sections.push(sectionContact(data, ts, cc))
  sections.push(sectionFooter(data, ts, cc))

  const body = sections.join("\n")

  const headingFontUrl = ts.headingFont.includes("Playfair")
    ? `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap`
    : ts.headingFont.includes("Space Grotesk")
    ? `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap`
    : ts.headingFont.includes("DM Sans")
    ? `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;700;800&display=swap`
    : `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap`

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(data.businessName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${headingFontUrl}" rel="stylesheet" />
  <meta name="description" content="${esc(data.tagline || data.about)}" />
  <meta property="og:title" content="${esc(data.businessName)}" />
  <meta property="og:description" content="${esc(data.tagline || data.about)}" />
  ${data.logo ? `<meta property="og:image" content="${data.logo}" />` : ""}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    img { max-width: 100%; height: auto; display: block; }
    body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; background: #06060C; color: #EDEDF0; overflow-x: hidden; }
    a { transition: opacity 0.2s; }
    a:hover { opacity: 0.8; }
    input, textarea, button { font-family: inherit; }
    ::placeholder { color: rgba(255,255,255,0.15); }
    @media (max-width: 640px) {
      section { padding-left: 16px !important; padding-right: 16px !important; }
      [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
    }
  </style>
</head>
<body>
${body}
${floatingWA(data, ts, cc)}
</body>
</html>`
}
