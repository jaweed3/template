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

    const url = await publishLandingPage(data.studentName, html)

    return NextResponse.json({ success: true, url })
  } catch (error: any) {
    console.error("Publish error:", error)
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat publish" },
      { status: 500 }
    )
  }
}
