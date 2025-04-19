"use client"

import type React from "react"

import { useState } from "react"
import { EmployeeLayout } from "@/components/employee-layout"

export default function ChangePasswordPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match")
      return
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    // In a real app, this would call an API to change the password
    // Simulate API call
    setTimeout(() => {
      setSuccess("Password changed successfully!")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Change Password">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-medium dark:text-white">Change Password</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md dark:bg-green-900/30 dark:text-green-400">
                {success}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Current Password:
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-gray-600 dark:text-gray-400 mb-2">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-600 dark:text-gray-400 mb-2">
                  Confirm New Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </EmployeeLayout>
  )
}
