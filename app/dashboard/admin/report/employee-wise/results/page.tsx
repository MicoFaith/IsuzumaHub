"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

export default function EmployeeWiseReportResultsPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [loading, setLoading] = useState(true)
  const [employeeData, setEmployeeData] = useState<any[]>([])
  const searchParams = useSearchParams()

  const fromDate = searchParams.get("from") || "2020-01-01"
  const toDate = searchParams.get("to") || "2020-01-31"

  useEffect(() => {
    // Simulate API call to fetch employee data
    const timer = setTimeout(() => {
      setEmployeeData([
        {
          id: 1,
          employeeId: "Lab1124",
          name: "Rakesh Jha",
          sampleAssign: 3,
          sampleCollected: 3,
          remainingSample: 0,
        },
        {
          id: 2,
          employeeId: "Lab1125",
          name: "Manprit Singh",
          sampleAssign: 1,
          sampleCollected: 0,
          remainingSample: 1,
        },
        {
          id: 3,
          employeeId: "Lab1126",
          name: "Test",
          sampleAssign: 2,
          sampleCollected: 1,
          remainingSample: 1,
        },
      ])
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [fromDate, toDate])

  const formatDate = (date: string) => {
    // In a real app, this would properly format the date
    return date
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
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Reports">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Sample Collected Reports</h2>
          <p className="text-sm text-center mt-2">
            Report from {formatDate(fromDate)} to {formatDate(toDate)}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Employee ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Sample Assign</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Sample Collected</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Remaining Sample</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{employee.employeeId}</td>
                  <td className="py-3 px-4">{employee.name}</td>
                  <td className="py-3 px-4">{employee.sampleAssign}</td>
                  <td className="py-3 px-4">{employee.sampleCollected}</td>
                  <td className="py-3 px-4">{employee.remainingSample}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Employee ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Sample Assign</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Sample Collected</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Remaining Sample</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
