"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { EmployeeLayout } from "@/components/employee-layout"
import { Cog } from "lucide-react"

export default function EmployeeProfilePage() {
  const [loading, setLoading] = useState(true)
  const [employeeData, setEmployeeData] = useState({
    name: "Rakesh Jha",
    email: "rakesh@gmail.com",
    employeeId: "Lab1124",
    mobileNumber: "8797977979",
    address: "Mumbai, India",
    joiningDate: "2020-01-15 10:30:45",
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to update the profile
    alert("Profile updated successfully!")
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
    <EmployeeLayout employeeName={employeeData.name} employeeEmail={employeeData.email} pageTitle="My Profile">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-medium dark:text-white">My Profile</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleUpdate} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employeeId" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Employee ID:
                </label>
                <input
                  type="text"
                  id="employeeId"
                  value={employeeData.employeeId}
                  className="w-full p-2 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={employeeData.name}
                  onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
                  className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={employeeData.email}
                  className="w-full p-2 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  value={employeeData.mobileNumber}
                  onChange={(e) => setEmployeeData({ ...employeeData, mobileNumber: e.target.value })}
                  className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Address:
                </label>
                <textarea
                  id="address"
                  value={employeeData.address}
                  onChange={(e) => setEmployeeData({ ...employeeData, address: e.target.value })}
                  rows={3}
                  className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                ></textarea>
              </div>

              <div>
                <label htmlFor="joiningDate" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Joining Date:
                </label>
                <input
                  type="text"
                  id="joiningDate"
                  value={employeeData.joiningDate}
                  className="w-full p-2 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </EmployeeLayout>
  )
}
