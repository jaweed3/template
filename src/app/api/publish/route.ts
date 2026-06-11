import { NextRequest, NextResponse } from "next/server"
import { generateStaticHtml } from "@/templates/staticHtml"
import { publishLandingPage } from "@/lib/github"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.studentName || !data.businessName) {
      return NextResponse.json(
        { error: "Nama dan nama usaha wajib diisi" },
        { status: 400 }
      )
    }

    const html = generateStaticHtml(data)
    const folderName = data.studentName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

    await publishLandingPage(data.studentName, html)

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
