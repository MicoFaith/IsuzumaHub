"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"

export default function AddEmployeePage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()
  const [employeeData, setEmployeeData] = useState({
    employeeId: "",
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmployeeData({
      ...employeeData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API to add the employee
    console.log("Adding employee:", employeeData)

    // Redirect to the manage employees page
    router.push("/dashboard/admin/lab-employee/manage")
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Add Employee Detail</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employeeId" className="block text-gray-600 mb-2">
                  Employee ID:
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={employeeData.employeeId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-gray-600 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-gray-600 mb-2">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={employeeData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-600 mb-2">
                  Address:
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={employeeData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-600 mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={employeeData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
