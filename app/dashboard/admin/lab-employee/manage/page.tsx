"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Edit, Trash2 } from "lucide-react"

// Sample employee data
const employeeData = [
  {
    id: 1,
    employeeId: "Lab1124",
    name: "Rakesh Jha",
    mobileNumber: "8797977979",
    email: "rakesh@gmail.com",
  },
  {
    id: 2,
    employeeId: "Lab1125",
    name: "Manprit Singh",
    mobileNumber: "8546546485",
    email: "mohrisingh@gmail.com",
  },
  {
    id: 3,
    employeeId: "Lab1126",
    name: "Test",
    mobileNumber: "8797979777",
    email: "test@gmail.com",
  },
  {
    id: 4,
    employeeId: "lab11112",
    name: "Sanjeev",
    mobileNumber: "2398746532",
    email: "sanjeev@test.com",
  },
]

export default function ManageEmployeesPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [employees, setEmployees] = useState(employeeData)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null)
  const router = useRouter()

  const handleEditEmployee = (employeeId: string) => {
    router.push(`/dashboard/admin/lab-employee/edit/${employeeId}`)
  }

  const handleDeleteClick = (employeeId: number) => {
    setEmployeeToDelete(employeeId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (employeeToDelete) {
      // In a real app, this would call an API to delete the employee
      setEmployees(employees.filter((employee) => employee.id !== employeeToDelete))
      setShowDeleteModal(false)
      setEmployeeToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setEmployeeToDelete(null)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Manage Employee</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Employee ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">MobileNumber</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{employee.employeeId}</td>
                  <td className="py-3 px-4">{employee.name}</td>
                  <td className="py-3 px-4">{employee.mobileNumber}</td>
                  <td className="py-3 px-4">{employee.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEmployee(employee.employeeId)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Employee"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Employee"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Employee ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">MobileNumber</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this employee? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
