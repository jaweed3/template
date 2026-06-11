"use client"

import { useId } from "react"
import { ThemeId } from "@/types"

interface Props {
  themeId: ThemeId
  primary: string
  secondary: string
  accent: string
  width?: number
  height?: number
}

function Mystic({ c, w, h }: { c: { p: string; s: string; a: string }; w: number; h: number }) {
  const cx = w / 2
  const cy = h / 2
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none">
      <rect width={w} height={h} rx={0} fill={c.p} fillOpacity={0.06} />
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.38} stroke={c.p} strokeWidth={0.8} fill="none" />
      <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.35} stroke={c.p} strokeWidth={0.3} fill="none" strokeDasharray="3 3" />
      <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.32} stroke={c.s} strokeWidth={0.5} fill="none" />
      {/* Radial burst */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={cx + Math.cos((i * 30 * Math.PI) / 180) * 24}
          y1={cy + Math.sin((i * 30 * Math.PI) / 180) * 24}
          x2={cx + Math.cos((i * 30 * Math.PI) / 180) * Math.min(w, h) * 0.38}
          y2={cy + Math.sin((i * 30 * Math.PI) / 180) * Math.min(w, h) * 0.38}
          stroke={c.a}
          strokeWidth={0.3}
          opacity={0.5}
        />
      ))}
      {/* Central eye */}
      <ellipse cx={cx} cy={cy - 4} rx={8} ry={4} stroke={c.p} strokeWidth={0.8} fill="none" />
      <circle cx={cx} cy={cy - 4} r={2} fill={c.p} />
      {/* Crescent */}
      <path
        d={`M ${cx - 20} ${cy - 20} A 22 22 0 1 1 ${cx - 18} ${cy - 28}`}
        stroke={c.s}
        strokeWidth={0.6}
        fill="none"
      />
      {/* Stars */}
      {[[cx - 35, cy - 30], [cx + 30, cy - 25], [cx - 25, cy + 30], [cx + 35, cy + 28]].map(
        ([x, y], i) => (
          <text key={i} x={x} y={y} fill={c.a} fontSize={6} opacity={0.4}>
            ✦
          </text>
        )
      )}
      {/* Bottom text band */}
      <line x1={cx - 40} y1={cy + 42} x2={cx + 40} y2={cy + 42} stroke={c.p} strokeWidth={0.4} />
      <line x1={cx - 36} y1={cy + 46} x2={cx + 36} y2={cy + 46} stroke={c.s} strokeWidth={0.2} opacity={0.5} />
      {/* Hatching lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i + 100}
          x1={10 + i * 3}
          y1={h - 18}
          x2={14 + i * 3}
          y2={h - 8}
          stroke={c.a}
          strokeWidth={0.2}
          opacity={0.15}
        />
      ))}
    </svg>
  )
}

function Luxury({ c, w, h }: { c: { p: string; s: string; a: string }; w: number; h: number }) {
  const cx = w / 2
  const cy = h / 2
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none">
      <rect width={w} height={h} fill={c.p} fillOpacity={0.04} />
      {/* Ornamental frame */}
      <rect x={16} y={16} width={w - 32} height={h - 32} rx={2} stroke={c.p} strokeWidth={0.6} fill="none" />
      <rect x={20} y={20} width={w - 40} height={h - 40} rx={1} stroke={c.p} strokeWidth={0.2} opacity={0.4} />
      {/* Diamond center */}
      <path d={`M ${cx} ${cy - 30} L ${cx + 25} ${cy} L ${cx} ${cy + 30} L ${cx - 25} ${cy} Z`} stroke={c.p} strokeWidth={0.6} fill="none" />
      <path d={`M ${cx} ${cy - 18} L ${cx + 15} ${cy} L ${cx} ${cy + 18} L ${cx - 15} ${cy} Z`} stroke={c.s} strokeWidth={0.3} fill="none" />
      {/* Laurel leaves */}
      {[
        { x: cx - 30, y: cy - 18, rot: -40 },
        { x: cx + 30, y: cy - 18, rot: 40 },
        { x: cx - 30, y: cy + 18, rot: 40 },
        { x: cx + 30, y: cy + 18, rot: -40 },
      ].map(({ x, y, rot }, i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d="M 0 0 C -6 -8 -4 -18 0 -22 C 4 -18 6 -8 0 0" stroke={c.a} strokeWidth={0.4} fill="none" />
          <line x1={0} y1={0} x2={0} y2={-22} stroke={c.a} strokeWidth={0.2} opacity={0.4} />
        </g>
      ))}
      {/* Scrollwork top */}
      <path d={`M ${cx - 40} ${cy - 38} Q ${cx - 20} ${cy - 48} ${cx} ${cy - 38}`} stroke={c.s} strokeWidth={0.4} fill="none" />
      <path d={`M ${cx} ${cy - 38} Q ${cx + 20} ${cy - 48} ${cx + 40} ${cy - 38}`} stroke={c.s} strokeWidth={0.4} fill="none" />
      {/* Flourishes */}
      <path d={`M ${cx - 50} ${cy + 38} Q ${cx - 30} ${cy + 48} ${cx - 20} ${cy + 38}`} stroke={c.a} strokeWidth={0.3} fill="none" opacity={0.4} />
      <path d={`M ${cx + 50} ${cy + 38} Q ${cx + 30} ${cy + 48} ${cx + 20} ${cy + 38}`} stroke={c.a} strokeWidth={0.3} fill="none" opacity={0.4} />
    </svg>
  )
}

function Brutalist({ c, w, h }: { c: { p: string; s: string; a: string }; w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none">
      <rect width={w} height={h} fill={c.p} fillOpacity={0.02} />
      {/* Bold geometric blocks */}
      <rect x={20} y={20} width={w - 40} height={h - 40} stroke={c.p} strokeWidth={1.5} fill="none" />
      <rect x={32} y={32} width={w - 64} height={h - 64} stroke={c.s} strokeWidth={0.3} fill="none" />
      {/* Diagonal slash */}
      <line x1={0} y1={0} x2={w} y2={h} stroke={c.a} strokeWidth={0.8} opacity={0.3} />
      <line x1={w} y1={0} x2={0} y2={h} stroke={c.a} strokeWidth={0.8} opacity={0.3} />
      {/* Cross */}
      <line x1={cx(w, h)} y1={80} x2={cx(w, h)} y2={h - 80} stroke={c.p} strokeWidth={1.2} />
      <line x1={60} y1={cy(w, h)} x2={w - 60} y2={cy(w, h)} stroke={c.p} strokeWidth={1.2} />
      {/* Circle */}
      <circle cx={cx(w, h)} cy={cy(w, h)} r={36} stroke={c.a} strokeWidth={0.6} fill="none" />
      {/* Hatch pattern bottom */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={28 + i * 8} y1={h - 32} x2={32 + i * 8} y2={h - 20} stroke={c.s} strokeWidth={0.3} opacity={0.2} />
      ))}
    </svg>
  )
  function cx(w: number, h: number) { return w / 2 }
  function cy(w: number, h: number) { return h / 2 }
}

function Streetwear({ c, w, h }: { c: { p: string; s: string; a: string }; w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none">
      <rect width={w} height={h} fill={c.p} fillOpacity={0.04} />
      {/* Dynamic burst */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={w / 2}
          y1={h / 2}
          x2={w / 2 + Math.cos((i * 45 * Math.PI) / 180) * 100}
          y2={h / 2 + Math.sin((i * 45 * Math.PI) / 180) * 100}
          stroke={c.p}
          strokeWidth={0.5 + i * 0.1}
          opacity={0.3 + i * 0.05}
        />
      ))}
      {/* Jagged shape */}
      <path d={`M ${w / 2 - 30} ${h / 2 - 40} L ${w / 2} ${h / 2 - 50} L ${w / 2 + 30} ${h / 2 - 40} L ${w / 2 + 35} ${h / 2} L ${w / 2 + 30} ${h / 2 + 40} L ${w / 2} ${h / 2 + 50} L ${w / 2 - 30} ${h / 2 + 40} L ${w / 2 - 35} ${h / 2} Z`} stroke={c.p} strokeWidth={0.6} fill="none" />
      {/* Inner shape */}
      <path d={`M ${w / 2 - 16} ${h / 2 - 22} L ${w / 2} ${h / 2 - 28} L ${w / 2 + 16} ${h / 2 - 22} L ${w / 2 + 18} ${h / 2} L ${w / 2 + 16} ${h / 2 + 22} L ${w / 2} ${h / 2 + 28} L ${w / 2 - 16} ${h / 2 + 22} L ${w / 2 - 18} ${h / 2} Z`} stroke={c.s} strokeWidth={0.4} fill="none" />
      {/* Dots */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={30 + i * 40} cy={h - 30} r={2} fill={c.a} opacity={0.3} />
      ))}
    </svg>
  )
}

function Agency({ c, w, h }: { c: { p: string; s: string; a: string }; w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none">
      <rect width={w} height={h} fill={c.p} fillOpacity={0.04} />
      {/* Grid */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`v${i}`} x1={28 + i * 40} y1={20} x2={28 + i * 40} y2={h - 20} stroke={c.p} strokeWidth={0.15} opacity={0.2} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1={20} y1={24 + i * 40} x2={w - 20} y2={24 + i * 40} stroke={c.p} strokeWidth={0.15} opacity={0.2} />
      ))}
      {/* Central tech motif */}
      <circle cx={w / 2} cy={h / 2} r={32} stroke={c.p} strokeWidth={0.5} fill="none" />
      <circle cx={w / 2} cy={h / 2} r={24} stroke={c.s} strokeWidth={0.3} fill="none" strokeDasharray="2 3" />
      <circle cx={w / 2} cy={h / 2} r={8} fill={c.p} opacity={0.3} />
      {/* Connection lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const x = w / 2 + Math.cos(angle) * 40
        const y = h / 2 + Math.sin(angle) * 40
        return <circle key={i} cx={x} cy={y} r={2} fill={c.a} opacity={0.4} />
      })}
      {/* Bottom bar */}
      <rect x={60} y={h - 24} width={w - 120} height={2} fill={c.p} opacity={0.2} />
      <rect x={80} y={h - 18} width={w - 160} height={1} fill={c.s} opacity={0.15} />
    </svg>
  )
}

function Local({ c, w, h }: { c: { p: string; s: string; a: string }; w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none">
      <rect width={w} height={h} fill={c.p} fillOpacity={0.04} />
      {/* Central tree/branch motif */}
      <path
        d={`M ${w / 2} ${h - 30} L ${w / 2} ${h / 2 + 10}`}
        stroke={c.p}
        strokeWidth={0.8}
        fill="none"
      />
      {/* Branches left */}
      <path d={`M ${w / 2} ${h / 2 - 5} Q ${w / 2 - 20} ${h / 2 - 15} ${w / 2 - 30} ${h / 2 - 5}`} stroke={c.s} strokeWidth={0.4} fill="none" />
      <path d={`M ${w / 2} ${h / 2 + 5} Q ${w / 2 - 15} ${h / 2 + 15} ${w / 2 - 25} ${h / 2 + 5}`} stroke={c.s} strokeWidth={0.3} fill="none" />
      {/* Branches right */}
      <path d={`M ${w / 2} ${h / 2 - 5} Q ${w / 2 + 20} ${h / 2 - 15} ${w / 2 + 30} ${h / 2 - 5}`} stroke={c.s} strokeWidth={0.4} fill="none" />
      <path d={`M ${w / 2} ${h / 2 + 5} Q ${w / 2 + 15} ${h / 2 + 15} ${w / 2 + 25} ${h / 2 + 5}`} stroke={c.s} strokeWidth={0.3} fill="none" />
      {/* Leaves */}
      {[
        [w / 2 - 30, h / 2 - 5],
        [w / 2 - 25, h / 2 + 5],
        [w / 2 + 30, h / 2 - 5],
        [w / 2 + 25, h / 2 + 5],
        [w / 2, h / 2 - 20],
        [w / 2, h / 2 + 20],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={6} ry={4} stroke={c.a} strokeWidth={0.3} fill="none" opacity={0.5} />
      ))}
      {/* Ground line */}
      <path d={`M ${w / 2 - 36} ${h - 30} Q ${w / 2 - 20} ${h - 34} ${w / 2} ${h - 30} Q ${w / 2 + 20} ${h - 26} ${w / 2 + 36} ${h - 30}`} stroke={c.p} strokeWidth={0.3} fill="none" />
      {/* Small dots */}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx={40 + i * 44} cy={h - 12} r={1} fill={c.a} opacity={0.2} />
      ))}
    </svg>
  )
}

export default function EngravingPreview({ themeId, primary, secondary, accent, width = 240, height = 320 }: Props) {
  const c = { p: primary, s: secondary, a: accent }
  const props = { c, w: width, h: height }

  return (
    <div style={{ width, height, overflow: "hidden", borderRadius: 12 }}>
      {themeId === "mystic" && <Mystic {...props} />}
      {themeId === "luxury" && <Luxury {...props} />}
      {themeId === "brutalist" && <Brutalist {...props} />}
      {themeId === "streetwear" && <Streetwear {...props} />}
      {themeId === "agency" && <Agency {...props} />}
      {themeId === "local" && <Local {...props} />}
    </div>
  )
}
