"use client"

export function EngravingPoster() {
  return (
    <svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <clipPath id="frame">
          <rect x="40" y="40" width="720" height="1020" rx="4" />
        </clipPath>
        <pattern id="grain" width="200" height="200" patternUnits="userSpaceOnUse">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.06" />
            </feComponentTransfer>
          </filter>
          <rect width="200" height="200" filter="url(#noise)" />
        </pattern>
      </defs>

      <g clip="url(#frame)">
        {/* Background */}
        <rect x="40" y="40" width="720" height="1020" fill="#0A0E1A" />
        <rect x="40" y="40" width="720" height="1020" fill="url(#grain)" />

        {/* Outer border */}
        <rect x="56" y="56" width="688" height="988" fill="none" stroke="#1A2A4A" strokeWidth="0.5" />
        <rect x="64" y="64" width="672" height="972" fill="none" stroke="#1A2A4A" strokeWidth="0.5" />

        {/* Corner ornaments */}
        {[
          { x: 64, y: 64, rx: 1, ry: 1 },
          { x: 736, y: 64, rx: -1, ry: 1 },
          { x: 64, y: 1036, rx: 1, ry: -1 },
          { x: 736, y: 1036, rx: -1, ry: -1 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.rx === -1 ? 800 : 0}, ${c.ry === -1 ? 1100 : 0}) scale(${c.rx}, ${c.ry})`}>
            {/* Corner floral */}
            <path d="M64 64 L80 64 L80 80 M64 64 L64 80" fill="none" stroke="#2A4A7A" strokeWidth="0.5" />
            <path d="M72 72 Q80 64 80 72 Q72 80 72 72" fill="none" stroke="#4A7AB2" strokeWidth="0.3" />
          </g>
        ))}

        {/* Top ornamental band */}
        <line x1="120" y1="88" x2="680" y2="88" stroke="#1A2A4A" strokeWidth="0.3" />
        <line x1="100" y1="96" x2="700" y2="96" stroke="#1A2A4A" strokeWidth="0.3" />

        {/* Top decorative pattern */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`top-line-${i}`}
            x1={120 + i * 30}
            y1={92}
            x2={120 + i * 30 + 15}
            y2={84}
            stroke="#2A4A7A"
            strokeWidth="0.2"
          />
        ))}

        {/* ========== RADIAL BURST ========== */}
        {Array.from({ length: 72 }).map((_, i) => {
          const angle = (i * 5 * Math.PI) / 180
          const r1 = 180
          const r2 = 340
          const cx = 400
          const cy = 420
          return (
            <line
              key={`ray-${i}`}
              x1={cx + Math.cos(angle) * r1}
              y1={cy + Math.sin(angle) * r1}
              x2={cx + Math.cos(angle) * r2}
              y2={cy + Math.sin(angle) * r2}
              stroke="#1A2A4A"
              strokeWidth={i % 4 === 0 ? 0.6 : 0.2}
              opacity={i % 8 === 0 ? 1 : 0.5}
            />
          )
        })}

        {/* ========== CONCENTRIC CIRCLES ========== */}
        {[180, 190, 200, 215].map((r) => (
          <circle
            key={`ring-${r}`}
            cx={400}
            cy={420}
            r={r}
            fill="none"
            stroke={r === 200 ? "#4A7AB2" : "#1A2A4A"}
            strokeWidth={r === 200 ? 0.8 : 0.3}
          />
        ))}

        {/* Inner ring with dots */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180
          const r = 197
          return (
            <circle
              key={`dot-${i}`}
              cx={400 + Math.cos(angle) * r}
              cy={420 + Math.sin(angle) * r}
              r={1.2}
              fill="#4A7AB2"
              opacity={0.6}
            />
          )
        })}

        {/* ========== CENTRAL EMBLEM ========== */}
        {/* Triangle */}
        <polygon
          points="400,340 330,480 470,480"
          fill="none"
          stroke="#4A7AB2"
          strokeWidth="1.2"
          opacity={0.8}
        />

        {/* Triangle inner lines */}
        <line x1="400" y1="340" x2="400" y2="480" stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
        <line x1="365" y1="410" x2="435" y2="410" stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />

        {/* Eye in triangle */}
        <ellipse cx="400" cy="420" rx="24" ry="14" fill="none" stroke="#6A9AD2" strokeWidth="1" />
        <circle cx="400" cy="420" r="4" fill="#6A9AD2" opacity={0.8} />
        {/* Eye rays */}
        <line x1="376" y1="420" x2="360" y2="420" stroke="#6A9AD2" strokeWidth="0.5" opacity={0.6} />
        <line x1="424" y1="420" x2="440" y2="420" stroke="#6A9AD2" strokeWidth="0.5" opacity={0.6} />

        {/* Sun rays from center */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180
          const r1 = 24
          const r2 = 40
          return (
            <line
              key={`sun-ray-${i}`}
              x1={400 + Math.cos(angle) * r1}
              y1={420 - Math.sin(angle) * r1}
              x2={400 + Math.cos(angle) * r2}
              y2={420 - Math.sin(angle) * r2}
              stroke="#6A9AD2"
              strokeWidth="0.4"
              opacity={0.4}
            />
          )
        })}

        {/* ========== CROSS-HATCHING BANDS ========== */}
        {/* Top cross-hatching */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`hatch-top-${i}`}
            x1={200 + i * 18}
            y1={140}
            x2={200 + i * 18 + 8}
            y2={160}
            stroke="#1A2A4A"
            strokeWidth="0.2"
            opacity={0.4}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`hatch-top2-${i}`}
            x1={200 + i * 18 + 8}
            y1={140}
            x2={200 + i * 18}
            y2={160}
            stroke="#1A2A4A"
            strokeWidth="0.2"
            opacity={0.4}
          />
        ))}

        {/* ========== TYPOGRAPHY ========== */}
        {/* Main title */}
        <text x="400" y="560" textAnchor="middle" fill="#8BB8E8" fontFamily="'Times New Roman', 'Georgia', serif" fontSize="24" letterSpacing="8" fontWeight="400">
          EX NIHILO
        </text>
        <text x="400" y="590" textAnchor="middle" fill="#8BB8E8" fontFamily="'Times New Roman', 'Georgia', serif" fontSize="14" letterSpacing="12" fontWeight="300" fontStyle="italic">
          NIHIL FIT
        </text>

        {/* Decorative line under title */}
        <line x1="280" y1="610" x2="520" y2="610" stroke="#4A7AB2" strokeWidth="0.5" />
        <circle cx="400" cy="610" r="3" fill="#4A7AB2" opacity={0.6} />
        <line x1="300" y1="616" x2="500" y2="616" stroke="#1A2A4A" strokeWidth="0.3" />

        {/* Subtext */}
        <text x="400" y="650" textAnchor="middle" fill="#5A7A9A" fontFamily="'Helvetica Neue', Arial, sans-serif"           fontSize="8" letterSpacing="6" fontWeight="300">
          MEMENTO·MORI·CARPE·DIEM
        </text>

        {/* ========== BOTTOM ILLUSTRATION ========== */}
        {/* Mountains/landscape engraving */}
        <path d="M200 900 Q250 820 300 860 Q350 800 400 840 Q450 790 500 830 Q550 810 600 900" fill="none" stroke="#1A2A4A" strokeWidth="0.5" opacity={0.6} />
        <path d="M180 920 Q250 850 320 890 Q370 840 420 870 Q470 830 520 860 Q570 840 620 920" fill="none" stroke="#1A2A4A" strokeWidth="0.3" opacity={0.4} />

        {/* Cross-hatching on landscape */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`land-hatch-${i}`}
            x1={250 + i * 20}
            y1={870 + i * 3}
            x2={250 + i * 20 + 12}
            y2={870 + i * 3 + 6}
            stroke="#1A2A4A"
            strokeWidth="0.15"
            opacity={0.3}
          />
        ))}

        {/* ========== STARS / CELESTIAL ========== */}
        {[
          { x: 150, y: 130, s: 1.5 },
          { x: 650, y: 120, s: 1 },
          { x: 180, y: 180, s: 0.8 },
          { x: 620, y: 170, s: 1.2 },
          { x: 700, y: 250, s: 0.6 },
          { x: 100, y: 280, s: 0.8 },
          { x: 680, y: 350, s: 0.5 },
          { x: 120, y: 400, s: 0.7 },
        ].map((star, i) => (
          <g key={`star-${i}`}>
            <line x1={star.x - star.s * 4} y1={star.y} x2={star.x + star.s * 4} y2={star.y} stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
            <line x1={star.x} y1={star.y - star.s * 4} x2={star.x} y2={star.y + star.s * 4} stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
          </g>
        ))}

        {/* ========== GEOMETRIC BORDER BOTTOM ========== */}
        <line x1="100" y1="980" x2="700" y2="980" stroke="#1A2A4A" strokeWidth="0.3" />
        <line x1="120" y1="988" x2="680" y2="988" stroke="#1A2A4A" strokeWidth="0.3" />

        {/* Bottom zigzag */}
        {Array.from({ length: 24 }).map((_, i) => (
          <polyline
            key={`zigzag-${i}`}
            points={`${160 + i * 20},972 ${170 + i * 20},980 ${160 + i * 20},988`}
            fill="none"
            stroke="#2A4A7A"
            strokeWidth="0.3"
            opacity={0.5}
          />
        ))}

        {/* ========== BOTTOM TEXT ========== */}
        <text x="400" y="1010" textAnchor="middle" fill="#3B5B7B" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="7" letterSpacing="4">
          THE·NIGHT·WATCH·MMXXVI
        </text>

        {/* Bottom flourish */}
        <path d="M350 1020 Q400 1010 450 1020" fill="none" stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
      </g>
    </svg>
  )
}

// Mini previews for theme cards
export function EngravingPreviewUngu() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" fill="#0A0E1A" />
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180
        const r1 = 30
        const r2 = 65
        return (
          <line
            key={`pu-${i}`}
            x1={100 + Math.cos(angle) * r1}
            y1={70 + Math.sin(angle) * r1}
            x2={100 + Math.cos(angle) * r2}
            y2={70 + Math.sin(angle) * r2}
            stroke="#7C3AED"
            strokeWidth={i % 6 === 0 ? 0.8 : 0.2}
            opacity={i % 6 === 0 ? 0.8 : 0.3}
          />
        )
      })}
      <circle cx={100} cy={70} r={30} fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity={0.6} />
      <circle cx={100} cy={70} r={22} fill="none" stroke="#A78BFA" strokeWidth="1" opacity={0.5} />
      <polygon points="100,48 84,82 116,82" fill="none" stroke="#A78BFA" strokeWidth="0.8" opacity={0.6} />
      <circle cx={100} cy={70} r={3} fill="#C4B5FD" opacity={0.8} />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        return (
          <line key={`pu-ray-${i}`} x1={100} y1={70} x2={100 + Math.cos(angle) * 18} y2={70 + Math.sin(angle) * 18} stroke="#C4B5FD" strokeWidth="0.3" opacity={0.4} />
        )
      })}
    </svg>
  )
}

export function EngravingPreviewAbu() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" fill="#0A0A0A" />
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i * 7.5 * Math.PI) / 180
        const r1 = 20
        const r2 = 68
        return (
          <line
            key={`pa-${i}`}
            x1={100 + Math.cos(angle) * r1}
            y1={70 + Math.sin(angle) * r1}
            x2={100 + Math.cos(angle) * r2}
            y2={70 + Math.sin(angle) * r2}
            stroke="#555"
            strokeWidth={i % 8 === 0 ? 1 : 0.2}
            opacity={i % 8 === 0 ? 0.7 : 0.25}
          />
        )
      })}
      <circle cx={100} cy={70} r={28} fill="none" stroke="#666" strokeWidth="0.5" />
      <circle cx={100} cy={70} r={20} fill="none" stroke="#888" strokeWidth="1.2" />
      <path d="M85 65 Q100 50 115 65 Q100 80 85 65" fill="none" stroke="#999" strokeWidth="0.6" />
      <line x1="100" y1="55" x2="100" y2="75" stroke="#AAA" strokeWidth="0.4" />
      <line x1="90" y1="65" x2="110" y2="65" stroke="#AAA" strokeWidth="0.4" />
    </svg>
  )
}

export function EngravingPreviewKrem() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" fill="#F5F0EB" />
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * 11.25 * Math.PI) / 180
        const r1 = 25
        const r2 = 62
        return (
          <line
            key={`pk-${i}`}
            x1={100 + Math.cos(angle) * r1}
            y1={70 + Math.sin(angle) * r1}
            x2={100 + Math.cos(angle) * r2}
            y2={70 + Math.sin(angle) * r2}
            stroke="#8B7355"
            strokeWidth={i % 4 === 0 ? 0.6 : 0.15}
            opacity={i % 4 === 0 ? 0.5 : 0.2}
          />
        )
      })}
      <circle cx={100} cy={70} r={35} fill="none" stroke="#8B7355" strokeWidth="0.4" opacity={0.4} />
      <circle cx={100} cy={70} r={25} fill="none" stroke="#8B7355" strokeWidth="0.8" opacity={0.5} />
      <circle cx={100} cy={70} r={15} fill="none" stroke="#A08974" strokeWidth="0.5" opacity={0.4} />
      <text x="100" y="74" textAnchor="middle" fill="#5C4A33" fontFamily="Georgia, serif" fontSize="10" fontStyle="italic" opacity={0.7}>☿</text>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        return (
          <circle key={`pk-dot-${i}`} cx={100 + Math.cos(angle) * 25} cy={70 + Math.sin(angle) * 25} r={1} fill="#A08974" opacity={0.4} />
        )
      })}
    </svg>
  )
}

export function EngravingPreviewPink() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" fill="#FDF2F8" />
      {/* Floral engraving */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180
        const r1 = 18
        const r2 = 60
        return (
          <line
            key={`pp-${i}`}
            x1={100 + Math.cos(angle) * r1}
            y1={70 + Math.sin(angle) * r1}
            x2={100 + Math.cos(angle) * r2}
            y2={70 + Math.sin(angle) * r2}
            stroke="#EC4899"
            strokeWidth={i % 3 === 0 ? 0.7 : 0.15}
            opacity={i % 3 === 0 ? 0.4 : 0.15}
          />
        )
      })}
      <circle cx={100} cy={70} r={38} fill="none" stroke="#EC4899" strokeWidth="0.3" opacity={0.3} />
      <circle cx={100} cy={70} r={28} fill="none" stroke="#EC4899" strokeWidth="0.6" opacity={0.4} />
      {/* Flower petals */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const px = 100 + Math.cos(angle) * 14
        const py = 70 + Math.sin(angle) * 14
        return (
          <ellipse key={`petal-${i}`} cx={px} cy={py} rx={10} ry={6} fill="none" stroke="#EC4899" strokeWidth="0.5" opacity={0.5}
            transform={`rotate(${i * 60}, ${px}, ${py})`}
          />
        )
      })}
      <circle cx={100} cy={70} r={4} fill="#EC4899" opacity={0.6} />
      {/* Decorative leaves */}
      <path d="M70 85 Q85 75 90 80 Q80 80 70 85" fill="none" stroke="#BE185D" strokeWidth="0.3" opacity={0.4} />
      <path d="M130 85 Q115 75 110 80 Q120 80 130 85" fill="none" stroke="#BE185D" strokeWidth="0.3" opacity={0.4} />
    </svg>
  )
}
