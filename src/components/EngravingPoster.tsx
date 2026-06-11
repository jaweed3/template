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
        <rect x="40" y="40" width="720" height="1020" fill="#0A0E1A" />
        <rect x="40" y="40" width="720" height="1020" fill="url(#grain)" />

        {/* Borders */}
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
            <path d="M64 64 L80 64 L80 80 M64 64 L64 80" fill="none" stroke="#2A4A7A" strokeWidth="0.5" />
            <path d="M72 72 Q80 64 80 72 Q72 80 72 72" fill="none" stroke="#4A7AB2" strokeWidth="0.3" />
          </g>
        ))}

        {/* Top ornamental band */}
        <line x1="120" y1="88" x2="680" y2="88" stroke="#1A2A4A" strokeWidth="0.3" />
        <line x1="100" y1="96" x2="700" y2="96" stroke="#1A2A4A" strokeWidth="0.3" />

        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`th-${i}`} x1={120 + i * 30} y1={92} x2={120 + i * 30 + 15} y2={84} stroke="#2A4A7A" strokeWidth="0.2" />
        ))}

        {/* RADIAL BURST */}
        {Array.from({ length: 72 }).map((_, i) => {
          const angle = (i * 5 * Math.PI) / 180
          return (
            <line key={`ray-${i}`} x1={400 + Math.cos(angle) * 180} y1={420 + Math.sin(angle) * 180} x2={400 + Math.cos(angle) * 340} y2={420 + Math.sin(angle) * 340} stroke="#1A2A4A" strokeWidth={i % 4 === 0 ? 0.6 : 0.2} opacity={i % 8 === 0 ? 1 : 0.5} />
          )
        })}

        {/* Concentric rings */}
        {[180, 190, 200, 215].map((r) => (
          <circle key={`rg-${r}`} cx={400} cy={420} r={r} fill="none" stroke={r === 200 ? "#4A7AB2" : "#1A2A4A"} strokeWidth={r === 200 ? 0.8 : 0.3} />
        ))}

        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180
          return <circle key={`rd-${i}`} cx={400 + Math.cos(angle) * 197} cy={420 + Math.sin(angle) * 197} r={1.2} fill="#4A7AB2" opacity={0.6} />
        })}

        {/* Central eye */}
        <polygon points="400,340 330,480 470,480" fill="none" stroke="#4A7AB2" strokeWidth="1.2" opacity={0.8} />
        <line x1="400" y1="340" x2="400" y2="480" stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
        <ellipse cx="400" cy="420" rx="24" ry="14" fill="none" stroke="#6A9AD2" strokeWidth="1" />
        <circle cx="400" cy="420" r="4" fill="#6A9AD2" opacity={0.8} />

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const r1 = 46
          const r2 = 60
          return <line key={`sr-${i}`} x1={400 + Math.cos(angle) * r1} y1={420 + Math.sin(angle) * r1} x2={400 + Math.cos(angle) * r2} y2={420 + Math.sin(angle) * r2} stroke="#6A9AD2" strokeWidth="0.4" opacity={0.5} />
        })}

        {/* Cross-hatching top */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`ht-${i}`} x1={200 + i * 18} y1={140} x2={200 + i * 18 + 8} y2={160} stroke="#1A2A4A" strokeWidth="0.2" opacity={0.4} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`ht2-${i}`} x1={200 + i * 18 + 8} y1={140} x2={200 + i * 18} y2={160} stroke="#1A2A4A" strokeWidth="0.2" opacity={0.4} />
        ))}

        {/* Typography */}
        <text x="400" y="560" textAnchor="middle" fill="#8BB8E8" fontFamily="'Times New Roman',Georgia,serif" fontSize="24" letterSpacing="8">EX NIHILO</text>
        <text x="400" y="590" textAnchor="middle" fill="#8BB8E8" fontFamily="'Times New Roman',Georgia,serif" fontSize="14" letterSpacing="12" fontStyle="italic">NIHIL FIT</text>
        <line x1="280" y1="610" x2="520" y2="610" stroke="#4A7AB2" strokeWidth="0.5" />
        <circle cx="400" cy="610" r="3" fill="#4A7AB2" opacity={0.6} />
        <text x="400" y="650" textAnchor="middle" fill="#5A7A9A" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="8" letterSpacing="6" fontWeight="300">MEMENTO·MORI·CARPE·DIEM</text>

        {/* Bottom landscape */}
        <path d="M200 900 Q250 820 300 860 Q350 800 400 840 Q450 790 500 830 Q550 810 600 900" fill="none" stroke="#1A2A4A" strokeWidth="0.5" opacity={0.6} />
        <path d="M180 920 Q250 850 320 890 Q370 840 420 870 Q470 830 520 860 Q570 840 620 920" fill="none" stroke="#1A2A4A" strokeWidth="0.3" opacity={0.4} />
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`lh-${i}`} x1={250 + i * 20} y1={870 + i * 3} x2={250 + i * 20 + 12} y2={870 + i * 3 + 6} stroke="#1A2A4A" strokeWidth="0.15" opacity={0.3} />
        ))}

        {/* Stars */}
        {[
          { x: 150, y: 130 }, { x: 650, y: 120 }, { x: 180, y: 180 }, { x: 620, y: 170 },
          { x: 700, y: 250 }, { x: 100, y: 280 }, { x: 680, y: 350 }, { x: 120, y: 400 },
        ].map((s, i) => (
          <g key={`st-${i}`}>
            <line x1={s.x - 6} y1={s.y} x2={s.x + 6} y2={s.y} stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
            <line x1={s.x} y1={s.y - 6} x2={s.x} y2={s.y + 6} stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
          </g>
        ))}

        {/* Bottom border */}
        <line x1="100" y1="980" x2="700" y2="980" stroke="#1A2A4A" strokeWidth="0.3" />
        <line x1="120" y1="988" x2="680" y2="988" stroke="#1A2A4A" strokeWidth="0.3" />
        {Array.from({ length: 24 }).map((_, i) => (
          <polyline key={`zz-${i}`} points={`${160 + i * 20},972 ${170 + i * 20},980 ${160 + i * 20},988`} fill="none" stroke="#2A4A7A" strokeWidth="0.3" opacity={0.5} />
        ))}
        <text x="400" y="1010" textAnchor="middle" fill="#3B5B7B" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="7" letterSpacing="4">THE·NIGHT·WATCH·MMXXVI</text>
        <path d="M350 1020 Q400 1010 450 1020" fill="none" stroke="#4A7AB2" strokeWidth="0.3" opacity={0.5} />
      </g>
    </svg>
  )
}

// ========== THEME CARD PREVIEWS — redesigned for 3:2 portrait cards ==========

export function EngravingPreviewUngu() {
  return (
    <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grain-u" width="100" height="100" patternUnits="userSpaceOnUse">
          <filter id="noise-u">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feFuncA type="linear" slope="0.08" />
          </filter>
          <rect width="100" height="100" filter="url(#noise-u)" />
        </pattern>
      </defs>
      <rect width="300" height="450" fill="#0A0A14" />
      <rect width="300" height="450" fill="url(#grain-u)" />
      <rect x="8" y="8" width="284" height="434" fill="none" stroke="#2A1A4A" strokeWidth="0.5" />

      {/* Radial burst */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i * 7.5 * Math.PI) / 180
        return <line key={`r-${i}`} x1={150 + Math.cos(a) * 45} y1={160 + Math.sin(a) * 45} x2={150 + Math.cos(a) * 140} y2={160 + Math.sin(a) * 140} stroke="#3A1A6A" strokeWidth={i % 6 === 0 ? 0.8 : 0.15} opacity={i % 6 === 0 ? 0.7 : 0.25} />
      })}

      {/* Rings */}
      <circle cx={150} cy={160} r={45} fill="none" stroke="#5A2A9A" strokeWidth="0.8" opacity={0.6} />
      <circle cx={150} cy={160} r={38} fill="none" stroke="#7C3AED" strokeWidth="1.2" opacity={0.5} />
      <circle cx={150} cy={160} r={30} fill="none" stroke="#A78BFA" strokeWidth="0.4" opacity={0.4} />

      {/* Dots on ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180
        return <circle key={`d-${i}`} cx={150 + Math.cos(a) * 38} cy={160 + Math.sin(a) * 38} r={1.5} fill="#A78BFA" opacity={0.5} />
      })}

      {/* Central emblem */}
      <polygon points="150,120 132,185 168,185" fill="none" stroke="#A78BFA" strokeWidth="1" opacity={0.7} />
      <ellipse cx={150} cy={158} rx={16} ry={10} fill="none" stroke="#C4B5FD" strokeWidth="0.8" opacity={0.7} />
      <circle cx={150} cy={158} r={3} fill="#C4B5FD" opacity={0.8} />

      {/* Rays from center */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return <line key={`ry-${i}`} x1={150 + Math.cos(a) * 12} y1={158 + Math.sin(a) * 12} x2={150 + Math.cos(a) * 22} y2={158 + Math.sin(a) * 22} stroke="#C4B5FD" strokeWidth="0.3" opacity={0.4} />
      })}

      {/* Top cross-hatch band */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h-${i}`} x1={50 + i * 18} y1={50} x2={50 + i * 18 + 8} y2={65} stroke="#3A1A6A" strokeWidth="0.2" opacity={0.4} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h2-${i}`} x1={50 + i * 18 + 8} y1={50} x2={50 + i * 18} y2={65} stroke="#3A1A6A" strokeWidth="0.2" opacity={0.4} />
      ))}

      {/* Text */}
      <line x1="60" y1="240" x2="240" y2="240" stroke="#5A2A9A" strokeWidth="0.4" opacity={0.5} />
      <text x="150" y="270" textAnchor="middle" fill="#A78BFA" fontFamily="Georgia,serif" fontSize="14" letterSpacing="6" opacity={0.8}>MYSTIC</text>
      <text x="150" y="290" textAnchor="middle" fill="#5A2A9A" fontFamily="Georgia,serif" fontSize="8" letterSpacing="4" fontStyle="italic" opacity={0.6}>AETERNUS</text>

      {/* Bottom decorative */}
      <path d="M80 370 Q150 340 220 370" fill="none" stroke="#5A2A9A" strokeWidth="0.4" opacity={0.4} />
      <path d="M90 390 Q150 365 210 390" fill="none" stroke="#3A1A6A" strokeWidth="0.3" opacity={0.3} />

      {/* Stars */}
      {[{ x: 40, y: 80 }, { x: 260, y: 75 }, { x: 50, y: 110 }, { x: 250, y: 105 }].map((s, i) => (
        <g key={`s-${i}`}>
          <line x1={s.x - 4} y1={s.y} x2={s.x + 4} y2={s.y} stroke="#A78BFA" strokeWidth="0.3" opacity={0.4} />
          <line x1={s.x} y1={s.y - 4} x2={s.x} y2={s.y + 4} stroke="#A78BFA" strokeWidth="0.3" opacity={0.4} />
        </g>
      ))}

      <text x="150" y="420" textAnchor="middle" fill="#3A1A6A" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="6" letterSpacing="3" opacity={0.5}>VIOLET·ODYSSEY</text>
    </svg>
  )
}

export function EngravingPreviewAbu() {
  return (
    <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grain-a" width="100" height="100" patternUnits="userSpaceOnUse">
          <filter id="noise-a">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feFuncA type="linear" slope="0.07" />
          </filter>
          <rect width="100" height="100" filter="url(#noise-a)" />
        </pattern>
      </defs>
      <rect width="300" height="450" fill="#080808" />
      <rect width="300" height="450" fill="url(#grain-a)" />
      <rect x="8" y="8" width="284" height="434" fill="none" stroke="#222" strokeWidth="0.5" />

      {/* Dense radial burst */}
      {Array.from({ length: 64 }).map((_, i) => {
        const a = (i * 5.625 * Math.PI) / 180
        return <line key={`r-${i}`} x1={150 + Math.cos(a) * 30} y1={160 + Math.sin(a) * 30} x2={150 + Math.cos(a) * 145} y2={160 + Math.sin(a) * 145} stroke="#333" strokeWidth={i % 8 === 0 ? 1 : 0.15} opacity={i % 8 === 0 ? 0.6 : 0.2} />
      })}

      {/* Concentric */}
      <circle cx={150} cy={160} r={50} fill="none" stroke="#444" strokeWidth="0.5" opacity={0.5} />
      <circle cx={150} cy={160} r={40} fill="none" stroke="#555" strokeWidth="1.5" opacity={0.4} />
      <circle cx={150} cy={160} r={30} fill="none" stroke="#666" strokeWidth="0.5" opacity={0.4} />

      {/* Geometric symbol */}
      <polygon points="150,120 120,185 180,185" fill="none" stroke="#666" strokeWidth="0.8" opacity={0.5} />
      <polygon points="150,135 130,175 170,175" fill="none" stroke="#777" strokeWidth="0.4" opacity={0.4} />
      <circle cx={150} cy={155} r={8} fill="none" stroke="#888" strokeWidth="0.6" opacity={0.5} />
      <circle cx={150} cy={155} r={2} fill="#999" opacity={0.5} />

      {/* Vertical axis */}
      <line x1="150" y1="110" x2="150" y2="195" stroke="#555" strokeWidth="0.3" opacity={0.3} />

      {/* Cross-hatch band */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`h-${i}`} x1={40 + i * 17} y1={45} x2={40 + i * 17 + 7} y2={60} stroke="#333" strokeWidth="0.2" opacity={0.3} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`h2-${i}`} x1={40 + i * 17 + 7} y1={45} x2={40 + i * 17} y2={60} stroke="#333" strokeWidth="0.2" opacity={0.3} />
      ))}

      {/* Bold typography */}
      <line x1="50" y1="240" x2="250" y2="240" stroke="#444" strokeWidth="0.5" opacity={0.4} />
      <text x="150" y="275" textAnchor="middle" fill="#777" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="18" letterSpacing="8" fontWeight="300">VOID</text>
      <text x="150" y="295" textAnchor="middle" fill="#555" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="8" letterSpacing="6" fontWeight="300">MACHINA</text>

      {/* Bottom lines */}
      <line x1="60" y1="380" x2="240" y2="380" stroke="#444" strokeWidth="0.3" opacity={0.3} />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`bl-${i}`} x1={80 + i * 15} y1={375} x2={80 + i * 15 + 7} y2={385} stroke="#444" strokeWidth="0.2" opacity={0.2} />
      ))}

      <text x="150" y="420" textAnchor="middle" fill="#333" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="6" letterSpacing="3">SHADOW·MONOCHROME</text>
    </svg>
  )
}

export function EngravingPreviewKrem() {
  return (
    <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grain-k" width="100" height="100" patternUnits="userSpaceOnUse">
          <filter id="noise-k">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feFuncA type="linear" slope="0.06" />
          </filter>
          <rect width="100" height="100" filter="url(#noise-k)" />
        </pattern>
      </defs>
      <rect width="300" height="450" fill="#F8F4EE" />
      <rect width="300" height="450" fill="url(#grain-k)" />
      <rect x="8" y="8" width="284" height="434" fill="none" stroke="#C4B5A0" strokeWidth="0.5" />

      {/* Radial burst */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i * 10 * Math.PI) / 180
        return <line key={`r-${i}`} x1={150 + Math.cos(a) * 35} y1={160 + Math.sin(a) * 35} x2={150 + Math.cos(a) * 145} y2={160 + Math.sin(a) * 145} stroke="#C4B5A0" strokeWidth={i % 6 === 0 ? 0.8 : 0.15} opacity={i % 6 === 0 ? 0.6 : 0.2} />
      })}

      {/* Rings */}
      <circle cx={150} cy={160} r={50} fill="none" stroke="#C4B5A0" strokeWidth="0.4" opacity={0.5} />
      <circle cx={150} cy={160} r={40} fill="none" stroke="#B8A58C" strokeWidth="0.8" opacity={0.5} />
      <circle cx={150} cy={160} r={35} fill="none" stroke="#A08974" strokeWidth="0.3" opacity={0.4} />

      {/* Zodiac ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const chars = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
        return (
          <text key={`z-${i}`} x={150 + Math.cos(a) * 40} y={160 + Math.sin(a) * 40} textAnchor="middle" dominantBaseline="central" fill="#B8A58C" fontFamily="Georgia,serif" fontSize="6" opacity={0.5}>
            {chars[i]}
          </text>
        )
      })}

      {/* Central compass */}
      <circle cx={150} cy={160} r={18} fill="none" stroke="#A08974" strokeWidth="0.8" opacity={0.6} />
      <line x1="132" y1="160" x2="168" y2="160" stroke="#A08974" strokeWidth="0.4" opacity={0.5} />
      <line x1="150" y1="142" x2="150" y2="178" stroke="#A08974" strokeWidth="0.4" opacity={0.5} />
      <circle cx={150} cy={160} r={3} fill="#A08974" opacity={0.6} />

      {/* Cross-hatch band */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h-${i}`} x1={50 + i * 18} y1={50} x2={50 + i * 18 + 6} y2={62} stroke="#D4C5B5" strokeWidth="0.2" opacity={0.4} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h2-${i}`} x1={50 + i * 18 + 6} y1={50} x2={50 + i * 18} y2={62} stroke="#D4C5B5" strokeWidth="0.2" opacity={0.4} />
      ))}

      {/* Floral ornaments */}
      <path d="M50 380 Q75 350 100 380 Q75 370 50 380" fill="none" stroke="#B8A58C" strokeWidth="0.3" opacity={0.4} />
      <path d="M200 380 Q225 350 250 380 Q225 370 200 380" fill="none" stroke="#B8A58C" strokeWidth="0.3" opacity={0.4} />

      {/* Typography */}
      <line x1="60" y1="240" x2="240" y2="240" stroke="#C4B5A0" strokeWidth="0.4" opacity={0.5} />
      <text x="150" y="270" textAnchor="middle" fill="#7A6B55" fontFamily="Georgia,serif" fontSize="14" letterSpacing="5" fontStyle="italic" opacity={0.8}>SAPIENTIA</text>
      <text x="150" y="290" textAnchor="middle" fill="#A08974" fontFamily="Georgia,serif" fontSize="7" letterSpacing="5" opacity={0.5}>ET·ELEGANTIA</text>

      {/* Bottom */}
      <path d="M100 410 Q150 395 200 410" fill="none" stroke="#C4B5A0" strokeWidth="0.3" opacity={0.3} />
      <text x="150" y="425" textAnchor="middle" fill="#C4B5A0" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="5" letterSpacing="3" opacity={0.4}>WARM·IVORY</text>
    </svg>
  )
}

export function EngravingPreviewPink() {
  return (
    <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grain-p" width="100" height="100" patternUnits="userSpaceOnUse">
          <filter id="noise-p">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feFuncA type="linear" slope="0.05" />
          </filter>
          <rect width="100" height="100" filter="url(#noise-p)" />
        </pattern>
      </defs>
      <rect width="300" height="450" fill="#FDF2F8" />
      <rect width="300" height="450" fill="url(#grain-p)" />
      <rect x="8" y="8" width="284" height="434" fill="none" stroke="#E8A0C0" strokeWidth="0.5" />

      {/* Radial burst */}
      {Array.from({ length: 32 }).map((_, i) => {
        const a = (i * 11.25 * Math.PI) / 180
        return <line key={`r-${i}`} x1={150 + Math.cos(a) * 25} y1={155 + Math.sin(a) * 25} x2={150 + Math.cos(a) * 145} y2={155 + Math.sin(a) * 145} stroke="#E8A0C0" strokeWidth={i % 4 === 0 ? 0.6 : 0.12} opacity={i % 4 === 0 ? 0.4 : 0.15} />
      })}

      {/* Floral rings */}
      <circle cx={150} cy={155} r={55} fill="none" stroke="#E8A0C0" strokeWidth="0.3" opacity={0.4} />
      <circle cx={150} cy={155} r={45} fill="none" stroke="#EC4899" strokeWidth="0.6" opacity={0.3} />
      <circle cx={150} cy={155} r={35} fill="none" stroke="#E8A0C0" strokeWidth="0.3" opacity={0.3} />

      {/* Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180
        const px = 150 + Math.cos(a) * 28
        const py = 155 + Math.sin(a) * 28
        return (
          <ellipse key={`p-${i}`} cx={px} cy={py} rx={14} ry={7} fill="none" stroke="#EC4899" strokeWidth="0.5" opacity={0.4}
            transform={`rotate(${i * 45}, ${px}, ${py})`}
          />
        )
      })}

      {/* Center */}
      <circle cx={150} cy={155} r={12} fill="none" stroke="#BE185D" strokeWidth="0.6" opacity={0.5} />
      <circle cx={150} cy={155} r={4} fill="#EC4899" opacity={0.5} />

      {/* Leaves */}
      <path d="M80 200 Q95 190 100 195 Q90 195 80 200" fill="none" stroke="#BE185D" strokeWidth="0.3" opacity={0.4} />
      <path d="M220 200 Q205 190 200 195 Q210 195 220 200" fill="none" stroke="#BE185D" strokeWidth="0.3" opacity={0.4} />

      {/* Cross-hatch band */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h-${i}`} x1={50 + i * 18} y1={50} x2={50 + i * 18 + 6} y2={62} stroke="#E8A0C0" strokeWidth="0.15" opacity={0.3} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h2-${i}`} x1={50 + i * 18 + 6} y1={50} x2={50 + i * 18} y2={62} stroke="#E8A0C0" strokeWidth="0.15" opacity={0.3} />
      ))}

      {/* Script typography */}
      <line x1="60" y1="245" x2="240" y2="245" stroke="#E8A0C0" strokeWidth="0.3" opacity={0.4} />
      <text x="150" y="275" textAnchor="middle" fill="#BE185D" fontFamily="Georgia,serif" fontSize="16" letterSpacing="8" fontStyle="italic" opacity={0.7}>BLUSH</text>
      <text x="150" y="295" textAnchor="middle" fill="#EC4899" fontFamily="Georgia,serif" fontSize="8" letterSpacing="5" opacity={0.5}>DREAM</text>

      {/* Bottom vines */}
      <path d="M60 400 Q90 385 120 400" fill="none" stroke="#E8A0C0" strokeWidth="0.3" opacity={0.3} />
      <path d="M180 400 Q210 385 240 400" fill="none" stroke="#E8A0C0" strokeWidth="0.3" opacity={0.3} />
      {/* Tiny dots on vines */}
      {[70, 85, 100].map((x, i) => (
        <circle key={`vd-${i}`} cx={60 + i * 20 + (i % 2) * 5} cy={395 + (i % 2) * 5} r={1} fill="#EC4899" opacity={0.3} />
      ))}

      <text x="150" y="425" textAnchor="middle" fill="#E8A0C0" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="5" letterSpacing="3" opacity={0.4}>BLUSH·DREAM</text>
    </svg>
  )
}
