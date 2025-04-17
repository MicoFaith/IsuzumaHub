"use client"

import type React from "react"
<<<<<<< HEAD
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
    <header className="bg-yellow-300 text-black sticky top-0 z-50">
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
=======

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
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
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
<<<<<<< HEAD
            <MobileNavButton onClick={onHomeClick}>Home</MobileNavButton>
            <MobileNavButton onClick={onAboutClick}>About Us</MobileNavButton>
            <MobileNavButton onClick={onGalleryClick}>Gallery</MobileNavButton>
=======
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/about">About Us</MobileNavLink>
            <MobileNavLink href="/gallery">Gallery</MobileNavLink>
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
            <MobileNavLink href="/admin">Admin</MobileNavLink>
            <MobileNavLink href="/auth">Users</MobileNavLink>
            <MobileNavLink href="/employee">Employee</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  )
}

<<<<<<< HEAD
function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="text-black hover:text-gray-700 font-medium transition-colors">
      {children}
    </button>
  )
}

=======
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-black hover:text-gray-700 font-medium transition-colors">
      {children}
    </Link>
  )
}

<<<<<<< HEAD
function MobileNavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-yellow-400 rounded-md"
    >
      {children}
    </button>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-yellow-400 rounded-md"
    >
=======
function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-3 py-2 text-base font-medium text-black hover:bg-yellow-300 rounded-md">
>>>>>>> 00619535c93a5e129c636900145b3177dfa1ad80
      {children}
    </Link>
  )
}
