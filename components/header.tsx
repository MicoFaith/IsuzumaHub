"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-yellow-300 text-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold">
              <span className="text-black">ODLMS</span>
              <span className="text-white">lab</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/admin">Admin</NavLink>
            <NavLink href="/auth">Users</NavLink>
            <NavLink href="/employee">Employee</NavLink>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-yellow-300">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/about">About Us</MobileNavLink>
            <MobileNavLink href="/gallery">Gallery</MobileNavLink>
            <MobileNavLink href="/admin">Admin</MobileNavLink>
            <MobileNavLink href="/auth">Users</MobileNavLink>
            <MobileNavLink href="/employee">Employee</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-black hover:text-gray-700 font-medium transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-3 py-2 text-base font-medium text-black hover:bg-yellow-300 rounded-md">
      {children}
    </Link>
  )
}
