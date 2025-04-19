"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Cog } from "lucide-react"

export default function UserDashboard() {
  const [userName, setUserName] = useState("Test")
  const [userEmail, setUserEmail] = useState("test-user@gmail.com")
  const [loading, setLoading] = useState(true)

  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail}>
      <div className="bg-white p-6 rounded-md shadow-sm mb-6">
        <h2 className="text-xl text-blue-600 font-medium">Welcome to IsuzumaHub!! {userName}</h2>
      </div>

      {/* Empty content area to match the design */}
      <div className="h-[500px]"></div>
    </DashboardLayout>
  )
}
