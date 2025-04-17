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

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Tests */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Tests</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-3">
              <div className="font-medium">Blood Test</div>
              <div className="text-sm text-gray-500">Completed on May 15, 2023</div>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="font-medium">Urine Analysis</div>
              <div className="text-sm text-gray-500">Pending results</div>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="font-medium">COVID-19 Test</div>
              <div className="text-sm text-gray-500">Scheduled for May 25, 2023</div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-md mr-3 text-xs font-medium">
                MAY
                <br />
                25
              </div>
              <div>
                <div className="font-medium">COVID-19 Test</div>
                <div className="text-sm text-gray-500">10:30 AM with Dr. Johnson</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 p-2 rounded-md mr-3 text-xs font-medium">
                JUN
                <br />
                02
              </div>
              <div>
                <div className="font-medium">Annual Checkup</div>
                <div className="text-sm text-gray-500">9:00 AM with Dr. Smith</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
              Book New Appointment
            </button>
            <button className="w-full bg-white border border-blue-500 hover:bg-blue-50 text-blue-500 py-2 px-4 rounded-md transition-colors">
              View Latest Reports
            </button>
            <button className="w-full bg-white border border-blue-500 hover:bg-blue-50 text-blue-500 py-2 px-4 rounded-md transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 text-center text-gray-500 text-sm">
        Online Diagnostic Lab Management System @ {new Date().getFullYear()}
      </div>
    </DashboardLayout>
  )
}
