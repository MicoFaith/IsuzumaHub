"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Plus, List } from "lucide-react"

export default function LabEmployeePage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()

  const handleAddEmployee = () => {
    router.push("/dashboard/admin/lab-employee/add")
  }

  const handleManageEmployees = () => {
    router.push("/dashboard/admin/lab-employee/manage")
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Lab Employees">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Lab Employees</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-4">Add New Employee</h3>
              <p className="text-gray-600 mb-6">
                Add a new lab employee to the system with details like name, contact information, and credentials.
              </p>
              <button
                onClick={handleAddEmployee}
                className="flex items-center justify-center w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Employee
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-4">Manage Employees</h3>
              <p className="text-gray-600 mb-6">
                View, edit, or delete existing lab employees in the system. Manage employee details and access.
              </p>
              <button
                onClick={handleManageEmployees}
                className="flex items-center justify-center w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <List className="w-5 h-5 mr-2" />
                Manage Employees
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
