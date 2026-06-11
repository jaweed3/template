import { NextRequest } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const rawUrl = `https://raw.githubusercontent.com/jaweed3/template/main/siswa/${encodeURIComponent(slug)}/index.html`

  try {
    const res = await fetch(rawUrl, { next: { revalidate: 30 } })
    if (!res.ok) {
      return new Response("Halaman tidak ditemukan", { status: 404 })
    }
    const html = await res.text()
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=30",
      },
    })
  } catch {
    return new Response("Gagal memuat halaman", { status: 500 })
  }
}
