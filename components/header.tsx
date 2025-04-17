"use client"

import type React from "react"
import { useState } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  onHomeClick: () => void
  onAboutClick: () => void
  onGalleryClick: () => void
}

export function Header({ onHomeClick, onAboutClick, onGalleryClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-blue-300 text-black sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={onHomeClick} className="flex items-center">
            <span className="text-3xl font-bold">
              <span className="text-black">Isuzuma</span>
              <span className="text-white">Hub</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavButton onClick={onHomeClick}>Home</NavButton>
            <NavButton onClick={onAboutClick}>About Us</NavButton>
            <NavButton onClick={onGalleryClick}>Gallery</NavButton>
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-300">
            <MobileNavButton onClick={onHomeClick}>Home</MobileNavButton>
            <MobileNavButton onClick={onAboutClick}>About Us</MobileNavButton>
            <MobileNavButton onClick={onGalleryClick}>Gallery</MobileNavButton>
            <MobileNavLink href="/admin">Admin</MobileNavLink>
            <MobileNavLink href="/auth">Users</MobileNavLink>
            <MobileNavLink href="/employee">Employee</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  )
}

function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="text-black hover:text-gray-700 font-medium transition-colors">
      {children}
    </button>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-black hover:text-gray-700 font-medium transition-colors">
      {children}
    </Link>
  )
}

function MobileNavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-blue-400 rounded-md"
    >
      {children}
    </button>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-blue-400 rounded-md"
    >
      {children}
    </Link>
  )
}
