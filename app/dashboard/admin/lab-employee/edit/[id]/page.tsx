"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

// Sample employee details data
const employeeDetails = {
  Lab1124: {
    employeeId: "Lab1124",
    name: "Rakesh Jha",
    mobileNumber: "8797977979",
    email: "rakesh@gmail.com",
    address: "Mumbai, India",
    joiningDate: "2020-01-15 10:30:45",
  },
  Lab1125: {
    employeeId: "Lab1125",
    name: "Manprit Singh",
    mobileNumber: "8546546485",
    email: "mohrisingh@gmail.com",
    address: "Delhi, India",
    joiningDate: "2020-01-16 11:20:30",
  },
  Lab1126: {
    employeeId: "Lab1126",
    name: "Test",
    mobileNumber: "8797979777",
    email: "test@gmail.com",
    address: "Bangalore, India",
    joiningDate: "2020-01-17 09:15:22",
  },
  lab11112: {
    employeeId: "lab11112",
    name: "Sanjeev Kumar",
    mobileNumber: "2398746532",
    email: "sanjeev@test.com",
    address: "New Delhi India",
    joiningDate: "2020-01-19 10:53:51",
  },
}

export default function EditEmployeePage() {
  const params = useParams()
  const router = useRouter()
  const employeeId = params.id as string
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState<any>(null)
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    joiningDate: "",
  })

  useEffect(() => {
    // Simulate API call to fetch employee details
    const timer = setTimeout(() => {
      const employeeDetail = employeeDetails[employeeId as keyof typeof employeeDetails] || null
      setEmployee(employeeDetail)
      if (employeeDetail) {
        setFormData({
          employeeId: employeeDetail.employeeId,
          name: employeeDetail.name,
          mobileNumber: employeeDetail.mobileNumber,
          email: employeeDetail.email,
          address: employeeDetail.address,
          joiningDate: employeeDetail.joiningDate,
        })
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [employeeId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API to update the employee
    console.log("Updating employee:", formData)

    // Redirect to the manage employees page
    router.push("/dashboard/admin/lab-employee/manage")
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

  if (!employee) {
    return (
      <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-medium mb-4">Employee Not Found</h2>
          <p>The requested employee details could not be found.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
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
                  value={formData.employeeId}
                  className="w-full p-2 border rounded-md bg-gray-100"
                  readOnly
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
                  value={formData.name}
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
                  value={formData.mobileNumber}
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
                  value={formData.email}
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
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="joiningDate" className="block text-gray-600 mb-2">
                  Joining Date:
                </label>
                <input
                  type="text"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  className="w-full p-2 border rounded-md bg-gray-100"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
