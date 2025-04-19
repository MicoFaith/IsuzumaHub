"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

export default function RegisteredUsersPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call to fetch user data
    const timer = setTimeout(() => {
      setUsers([
        {
          id: 1,
          fullName: "Jagdish Mishra",
          mobileNumber: "8508687677",
          email: "jag@gmail.com",
        },
        {
          id: 2,
          fullName: "Rakesh Wadwa",
          mobileNumber: "7656756565",
          email: "rak@gmail.com",
        },
        {
          id: 3,
          fullName: "Anuj",
          mobileNumber: "1234567890",
          email: "rak@gmail.com",
        },
        {
          id: 4,
          fullName: "Test",
          mobileNumber: "1234567890",
          email: "testuser@gmail.com",
        },
      ])
      setLoading(false)
    }, 500)

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
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Registered Users">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">View Register Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Full Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">MobileNumber</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.fullName}</td>
                  <td className="py-3 px-4">{user.mobileNumber}</td>
                  <td className="py-3 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Full Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">MobileNumber</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
