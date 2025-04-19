"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { FileText, BarChart, Calendar, Database } from "lucide-react"

export default function ReportPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Reports">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Reports</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-medium">Sample Collection Report</h3>
              </div>
              <p className="text-gray-600 mb-6">Generate reports on sample collections within a specific date range.</p>
              <button
                onClick={() => handleNavigate("/dashboard/employee/report/sample-collection")}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Generate Report
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-lg font-medium">Appointment Report</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Generate reports on appointments and their statuses within a specific date range.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/employee/report")}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Generate Report
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Database className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-lg font-medium">Test Report</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Generate reports on tests performed and their results within a specific date range.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/employee/report")}
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Generate Report
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <BarChart className="w-8 h-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-medium">Performance Report</h3>
              </div>
              <p className="text-gray-600 mb-6">Generate reports on employee performance and efficiency metrics.</p>
              <button
                onClick={() => handleNavigate("/dashboard/employee/report")}
                className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}
