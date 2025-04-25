"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Bell,
  Settings,
  ChevronLeft,
  Home,
  User,
  FileText,
  Calendar,
  Clock,
  FileBarChart,
  Search,
  LogOut,
  Cog,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react"
import { useTheme } from "@/components/theme-context"
import { ThemeSettings } from "@/components/theme-settings"
import axios from "axios"

axios.defaults.withCredentials = true

interface DashboardLayoutProps {
  children: React.ReactNode
  userName?: string
  userEmail?: string
  pageTitle?: string
}

export function DashboardLayout({
  children,
  userName: initialUserName,
  userEmail: initialUserEmail,
  pageTitle = "Dashboard",
}: DashboardLayoutProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [themeSettingsOpen, setThemeSettingsOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const [userName, setUserName] = useState(initialUserName || "User")
  const [userEmail, setUserEmail] = useState(initialUserEmail || "")
  const [userRole, setUserRole] = useState("USER")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data from /dashboard")
        const response = await axios.get("http://localhost:8081/dashboard", {
          withCredentials: true,
        })
        console.log("Dashboard response status:", response.status)
        console.log("Dashboard response data:", response.data)
        const { fullName, email, role } = response.data
        setUserName(fullName)
        setUserEmail(email)
        setUserRole(role)
      } catch (err: any) {
        console.error("Failed to fetch user data:", err)
        console.log("Error response:", err.response ? err.response.data : "No response data")
        console.log("Error status:", err.response ? err.response.status : "No status")
        setError("Failed to load user data. Please log in again.")
        setTimeout(() => {
          router.push("/auth")
        }, 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    try {
      console.log("Logging out")
      await axios.post("http://localhost:8081/logout")
      router.push("/auth")
    } catch (err: any) {
      console.error("Logout failed:", err)
      router.push("/auth")
    }
  }

  const isActive = (path: string) => {
    if (pathname === path) return true
    if (path === "/dashboard/test-detail" && pathname.startsWith("/dashboard/test-detail/")) return true
    return false
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-white w-[180px] flex-shrink-0 border-r flex flex-col">
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

          {dropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-md z-10 border">
              <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link href="/dashboard/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
              <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
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

        <nav className="flex-1">
          <ul className="py-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard")
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
                href="/dashboard/test-detail"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/test-detail")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                View Test Detail
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/book-appointment"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/book-appointment")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Calendar className="w-5 h-5" />
                </div>
                Book Appointment
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/appointment-history"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/appointment-history")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <Clock className="w-5 h-5" />
                </div>
                Appointment History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/medical-report"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/medical-report")
                    ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="w-6 flex justify-center mr-3">
                  <FileBarChart className="w-5 h-5" />
                </div>
                View Medical Report
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/search"
                className={`flex items-center px-4 py-2 ${
                  isActive("/dashboard/search")
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
            {userRole === "ADMIN" && (
              <li>
                <Link
                  href="/dashboard/admin/users"
                  className={`flex items-center px-4 py-2 ${
                    isActive("/dashboard/admin/users")
                      ? "text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="w-6 flex justify-center mr-3">
                    <User className="w-5 h-5" />
                  </div>
                  Manage Users
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="p-4 text-xs text-gray-500 text-center border-t">
          Online Diagnostic Lab Management System © {new Date().getFullYear()}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-blue-500 text-white h-12 flex items-center px-4">
          <Link href="/dashboard" className="flex items-center">
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>{pageTitle}</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <button className="p-1" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-1">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-1" onClick={() => setThemeSettingsOpen(true)}>
              <Settings className="w-5 h-5" />
            </button>
            <div className="relative" ref={profileDropdownRef}>
              <button
                className="flex items-center text-white focus:outline-none"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <User className="w-5 h-5 mr-1" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-700">
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Cog className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
          {children}
        </main>
      </div>
      <ThemeSettings isOpen={themeSettingsOpen} onClose={() => setThemeSettingsOpen(false)} />
    </div>
  )
}