"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FormAnimationProps {
  children: ReactNode
  isVisible: boolean
  direction: "left" | "right"
}

export function FormAnimation({ children, isVisible, direction }: FormAnimationProps) {
  const xValue = direction === "left" ? -100 : 100

  return (
    <motion.div
      initial={{ opacity: 0, x: xValue }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : xValue,
        display: isVisible ? "block" : "none",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
