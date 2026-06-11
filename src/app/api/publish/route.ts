import { NextRequest, NextResponse } from "next/server"
import { generateStaticHtml } from "@/templates/staticHtml"
import { publishLandingPage, checkStudentPageExists } from "@/lib/github"

const MAX_NAME_LENGTH = 60
const MAX_TAGLINE_LENGTH = 200
const MAX_ABOUT_LENGTH = 2000
const MAX_PRODUCTS = 20
const MAX_TESTIMONIALS = 20
const MAX_IMAGE_SIZE_MB = 5
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

const NAME_RE = /^[a-zA-Z0-9\s\-'.]+$/
const USERNAME_RE = /^[a-zA-Z0-9._]+$/
const PHONE_RE = /^[0-9]+$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitize(input: string): string {
  return input.replace(/[<>]/g, "").trim()
}

function slug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

function validateImageBase64(str: string): boolean {
  if (str.length > MAX_IMAGE_SIZE_BYTES) return false
  const mimeMatch = str.match(/^data:(image\/\w+);base64,/)
  if (!mimeMatch) return false
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  return allowedTypes.includes(mimeMatch[1])
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const errors: string[] = []

    // ─── studentName ───
    const studentName = sanitize(data.studentName || "")
    if (!studentName) errors.push("Nama siswa wajib diisi")
    else if (studentName.length > MAX_NAME_LENGTH) errors.push(`Nama siswa maksimal ${MAX_NAME_LENGTH} karakter`)
    else if (!NAME_RE.test(studentName)) errors.push("Nama siswa hanya boleh huruf, angka, spasi, dan tanda hubung")

    // ─── businessName ───
    const businessName = sanitize(data.businessName || "")
    if (!businessName) errors.push("Nama usaha wajib diisi")
    else if (businessName.length > MAX_NAME_LENGTH) errors.push(`Nama usaha maksimal ${MAX_NAME_LENGTH} karakter`)

    // ─── tagline ───
    const tagline = sanitize(data.tagline || "")
    if (tagline.length > MAX_TAGLINE_LENGTH) errors.push(`Tagline maksimal ${MAX_TAGLINE_LENGTH} karakter`)

    // ─── about ───
    const about = sanitize(data.about || "")
    if (about.length > MAX_ABOUT_LENGTH) errors.push(`Deskripsi maksimal ${MAX_ABOUT_LENGTH} karakter`)

    // ─── logo ───
    if (data.logo && typeof data.logo === "string" && !validateImageBase64(data.logo)) {
      errors.push("Logo tidak valid. Maksimal 5MB, format JPG/PNG/WebP/GIF")
    }

    // ─── whatsapp ───
    const wa = (data.contact?.whatsapp || "").replace(/[^0-9]/g, "")
    if (wa && !PHONE_RE.test(wa)) errors.push("Nomor WhatsApp tidak valid")
    if (wa && wa.length > 15) errors.push("Nomor WhatsApp maksimal 15 digit")

    // ─── email ───
    const email = (data.contact?.email || "").trim()
    if (email && !EMAIL_RE.test(email)) errors.push("Format email tidak valid")

    // ─── contact usernames ───
    const ig = (data.contact?.instagram || "").trim()
    if (ig && !USERNAME_RE.test(ig)) errors.push("Username Instagram hanya boleh huruf, angka, titik, underscore")
    const tiktok = (data.contact?.tiktok || "").trim()
    if (tiktok && !USERNAME_RE.test(tiktok)) errors.push("Username TikTok hanya boleh huruf, angka, titik, underscore")

    // ─── products ───
    const products = (data.products || []).slice(0, MAX_PRODUCTS)
    if (products.length > MAX_PRODUCTS) errors.push(`Produk maksimal ${MAX_PRODUCTS}`)
    for (const p of products) {
      if (p.name && p.name.length > 100) errors.push("Nama produk maksimal 100 karakter")
      if (p.description && p.description.length > 500) errors.push("Deskripsi produk maksimal 500 karakter")
      if (p.image && typeof p.image === "string" && !validateImageBase64(p.image)) {
        errors.push("Foto produk tidak valid. Maksimal 5MB per foto")
      }
    }

    // ─── testimonials ───
    const testimonials = (data.testimonials || []).slice(0, MAX_TESTIMONIALS)
    if (testimonials.length > MAX_TESTIMONIALS) errors.push(`Testimoni maksimal ${MAX_TESTIMONIALS}`)
    for (const t of testimonials) {
      if (t.text && t.text.length > 500) errors.push("Teks testimoni maksimal 500 karakter")
      if (t.name && t.name.length > 100) errors.push("Nama pemberi testimoni maksimal 100 karakter")
    }

    if (errors.length) {
      return NextResponse.json({ error: errors.join(". ") }, { status: 400 })
    }

    // ─── check duplicate student name ───
    const folderName = slug(studentName)

    try {
      const exists = await checkStudentPageExists(folderName)
      if (exists) {
        return NextResponse.json(
          { error: `Nama "${studentName}" sudah digunakan. Gunakan nama yang berbeda.` },
          { status: 409 }
        )
      }
    } catch {
      // if GitHub check fails, continue anyway
    }

    // ─── rebuild sanitized data ───
    const sanitized = {
      ...data,
      studentName,
      businessName,
      tagline,
      about,
      logo: data.logo || null,
      products,
      testimonials,
      contact: {
        whatsapp: wa,
        email,
        location: sanitize(data.contact?.location || "").slice(0, 200),
        instagram: ig,
        shopee: sanitize(data.contact?.shopee || "").slice(0, 500),
        tiktok,
      },
    }

    const html = generateStaticHtml(sanitized)

    await publishLandingPage(studentName, html)

    const baseUrl = process.env.PUBLIC_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || "template-three-roan.vercel.app"}`
    const url = `${baseUrl}/siswa/${folderName}`

    return NextResponse.json({ success: true, url })
  } catch (error: any) {
    console.error("Publish error:", error)
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat publish" },
      { status: 500 }
    )
  }
}
