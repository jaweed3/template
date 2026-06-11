"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue } from "framer-motion"

const blobs = [
  { color: "rgba(0,212,255,0.12)", size: 600, speed: 0.3 },
  { color: "rgba(112,0,255,0.08)", size: 500, speed: 0.2 },
  { color: "rgba(255,45,149,0.06)", size: 400, speed: 0.25 },
]

export default function MeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    let frame: number
    let t = 0
    const animate = () => {
      t += 0.001
      x.set(Math.sin(t * 0.7) * 100)
      y.set(Math.cos(t * 0.5) * 80)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [x, y])

  return (
    <div ref={containerRef} className="mesh-bg" style={{ overflow: "hidden" }}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="mesh-blob"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
