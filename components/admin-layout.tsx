"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Bell,
  Settings,
  ChevronLeft,
  Home,
  User,
  Users,
  Calendar,
  FileText,
  Search,
  LogOut,
  Cog,
  BarChart,
  Layers,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  userName: string
  userEmail: string
  pageTitle?: string
}

export function AdminLayout({ children, userName, userEmail, pageTitle = "Dashboard" }: AdminLayoutProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    // In a real app, this would call the logout function from auth context
    router.push("/admin")
  }

  // Update the isActive function to handle dynamic routes
  const isActive = (path: string) => {
    if (pathname === path) return true
    // For dynamic routes
    if (path !== "/dashboard/admin" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="bg-white w-[180px] flex-shrink-0 border-r flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center text-blue-500 border-b">
          <div className="mr-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold">IsuzumaHub</span>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b relative">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="font-medium">{userName}</div>
              <div className="text-sm text-gray-500">{userEmail}</div>
            </div>
            <button className="ml-auto text-gray-400" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <ChevronLeft className={`w-4 h-4 transform ${dropdownOpen ? "rotate-90" : "-rotate-90"}`} />
            </button>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-md z-10 border">
              <Link
                href="/dashboard/admin/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
              <Link
                href="/dashboard/admin/settings"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Cog className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="py-2">
            <li>
              <Link
                href="/dashboard/admin"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Home className="w-5 h-5" />
                </div>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/test"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/test")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                Test
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/lab-employee"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/lab-employee")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Users className="w-5 h-5" />
                </div>
                Lab Employee
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/appointments"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/appointments")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Calendar className="w-5 h-5" />
                </div>
                Appointments
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/lab"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/lab")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Layers className="w-5 h-5" />
                </div>
                Lab
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/reg-users"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/reg-users")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <User className="w-5 h-5" />
                </div>
                View Reg Users
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/search"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/search")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Search className="w-5 h-5" />
                </div>
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/report"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/admin/report")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <BarChart className="w-5 h-5" />
                </div>
                Report
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 text-xs text-gray-500 text-center border-t">
          Online Diagnostic Lab Management System © {new Date().getFullYear()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-blue-500 text-white h-12 flex items-center px-4">
          <Link href="/dashboard/admin" className="flex items-center">
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>{pageTitle}</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <button className="p-1">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-1">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-1">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
