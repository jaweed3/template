import { EngravingPoster } from "@/components/EngravingPoster"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ex Nihilo Nihil Fit — Poster",
  description: "Neo-classical engraving poster design",
}

export default function PosterPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4" style={{ background: "#06060C" }}>
      <div className="max-w-[600px] w-full">
        <EngravingPoster />
        <p className="text-center mt-6 text-[#3B3B54] text-xs tracking-[0.2em] uppercase">
          Neo-classical engraving · risograph · mmxxvi
        </p>
      </div>
    </div>
  )
}
