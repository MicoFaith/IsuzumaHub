import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "IsuzumaHub - Laboratory Management System",
  description: "Comprehensive Laboratory Management System for all your lab needs",
=======
  title: "ODLMS - Laboratory Management System",
  description: "Online Digital Laboratory Management System",
    generator: 'v0.dev'
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className="scroll-smooth">
=======
    <html lang="en">
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
      <body className={inter.className}>{children}</body>
    </html>
  )
}
<<<<<<< HEAD
=======


import './globals.css'
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
