import { LoginForm } from "@/components/login-form"

export default function EmployeeLoginPage() {
  return <LoginForm title="Sign In With Your Employee Account" redirectTo="/dashboard/employee" />
}
"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { EmployeeLayout } from "@/components/employee-layout"
import { Cog, User, Lock, LogOut } from "lucide-react"
import { useTheme } from "@/components/theme-context"

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true)
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme } = useTheme()

  // Statistics data
  const [stats, setStats] = useState({
    newAssignAppointments: 0,
    sampleCollected: 0,
    sampleSentToLab: 2,
    totalAppointments: 3,
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleViewDetail = (type: string) => {
    switch (type) {
      case "new":
        router.push("/dashboard/employee/appointments/new")
        break
      case "collected":
        router.push("/dashboard/employee/appointments/collected")
        break
      case "sent":
        router.push("/dashboard/employee/appointments/sent")
        break
      case "total":
        router.push("/dashboard/employee/appointments/total")
        break
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail}>
      <div className="relative">
        {/* Profile Dropdown */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-700"
          >
            <div className="py-1">
              <Link
                href="/dashboard/employee/profile"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User className="w-4 h-4 mr-2" />
                My Profile
              </Link>
              <Link
                href="/dashboard/employee/change-password"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Link>
              <button
                onClick={() => router.push("/employee")}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New Assign Appointment Card */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-500">{stats.newAssignAppointments}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Total New Assign Appointment</div>
            </div>
            <button
              onClick={() => handleViewDetail("new")}
              className="block w-full py-2 text-center text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              View Detail
            </button>
          </div>

          {/* Sample Collected Card */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="text-3xl font-bold text-red-500">{stats.sampleCollected}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Total Sample Collected</div>
            </div>
            <button
              onClick={() => handleViewDetail("collected")}
              className="block w-full py-2 text-center text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              View Detail
            </button>
          </div>

          {/* Sample Sent to Lab Card */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="text-3xl font-bold text-green-500">{stats.sampleSentToLab}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Total Sample Sent to Lab</div>
            </div>
            <button
              onClick={() => handleViewDetail("sent")}
              className="block w-full py-2 text-center text-white bg-green-500 hover:bg-green-600 transition-colors"
            >
              View Detail
            </button>
          </div>

          {/* Total Appointment Card */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="text-3xl font-bold text-yellow-500">{stats.totalAppointments}</div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">Total Appointment</div>
            </div>
            <button
              onClick={() => handleViewDetail("total")}
              className="block w-full py-2 text-center text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
            >
              View Detail
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p>Online Diagnostic Management System ©2020</p>
        </div>
      </div>
    </EmployeeLayout>
  )
}
