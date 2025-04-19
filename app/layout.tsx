import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IsuzumaHub - Laboratory Management System",
  description: "Comprehensive Laboratory Management System for all your lab needs",
<<<<<<< HEAD
    generator: 'v0.dev'
=======
>>>>>>> 78240d95df05eb70a7c1f09f313a3f9211787d64
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
