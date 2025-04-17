"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AnimatedInputProps {
  type: string
  placeholder: string
  required?: boolean
}

export function AnimatedInput({ type, placeholder, required = false }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 border-b border-gray-300 outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}
