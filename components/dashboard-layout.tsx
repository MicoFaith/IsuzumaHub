"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bell,
  Settings,
  LayoutDashboard,
  FileText,
  Calendar,
  Clock,
  FileBarChart,
  SearchIcon,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userName: string
  userEmail: string
  pageTitle?: string
}

export function DashboardLayout({ children, userName, userEmail, pageTitle = "Dashboard" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white w-64 flex-shrink-0 border-r ${sidebarOpen ? "block" : "hidden"} md:block`}>
        {/* Logo */}
        <div className="p-4 flex items-center text-blue-500">
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
        <div className="p-4 border-t border-b flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-gray-500">{userEmail}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-500"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/test-detail"
                className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-500"
              >
                <FileText className="w-5 h-5 mr-3" />
                View Test Detail
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/book-appointment"
                className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-500"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Book Appointment
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/appointment-history"
                className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-500"
              >
                <Clock className="w-5 h-5 mr-3" />
                Appointment History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/medical-report"
                className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-500"
              >
                <FileBarChart className="w-5 h-5 mr-3" />
                View Medical Report
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/search"
                className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-500"
              >
                <SearchIcon className="w-5 h-5 mr-3" />
                Search
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-blue-500 text-white h-16 flex items-center px-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden mr-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">{pageTitle}</h1>
          <div className="ml-auto flex items-center space-x-4">
            <button className="p-1">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-1">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}
