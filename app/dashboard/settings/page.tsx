"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Cog } from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: "Test",
    email: "test-user@gmail.com",
    contactNumber: "1234567890",
    registrationDate: "2020-01-19 10:33:27",
  })

  // Simulate loading user data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the user profile
    alert("Profile updated successfully!")
  }

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
    <DashboardLayout userName={userData.name} userEmail={userData.email} pageTitle="Profile">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-6">User Profile</h2>

        <form onSubmit={handleUpdate} className="max-w-3xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Name:</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Email:</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full p-2 border rounded-md bg-gray-100"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Contact Number:</label>
            <input
              type="text"
              value={userData.contactNumber}
              onChange={(e) => setUserData({ ...userData, contactNumber: e.target.value })}
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-500 mb-2">Registration Date:</label>
            <input
              type="text"
              value={userData.registrationDate}
              className="w-full p-2 border rounded-md bg-gray-100"
              disabled
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
