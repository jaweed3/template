"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [mouseX, mouseY])

  useEffect(() => {
    const links = document.querySelectorAll("a, button, [data-cursor-hover]")
    const enlarge = () => {
      cursorRef.current?.style.setProperty("width", "16px")
      cursorRef.current?.style.setProperty("height", "16px")
      cursorRef.current?.style.setProperty("background", "#00D4FF")
      ringRef.current?.style.setProperty("width", "56px")
      ringRef.current?.style.setProperty("height", "56px")
      ringRef.current?.style.setProperty("border-color", "rgba(0,212,255,0.5)")
    }
    const shrink = () => {
      cursorRef.current?.style.setProperty("width", "8px")
      cursorRef.current?.style.setProperty("height", "8px")
      ringRef.current?.style.setProperty("width", "40px")
      ringRef.current?.style.setProperty("height", "40px")
      ringRef.current?.style.setProperty("border-color", "rgba(0,212,255,0.3)")
    }
    links.forEach((el) => {
      el.addEventListener("mouseenter", enlarge)
      el.addEventListener("mouseleave", shrink)
    })
    return () => {
      links.forEach((el) => {
        el.removeEventListener("mouseenter", enlarge)
        el.removeEventListener("mouseleave", shrink)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor-dot"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
