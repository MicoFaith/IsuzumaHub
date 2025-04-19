"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Calendar, BarChart, Users, DollarSign } from "lucide-react"

export default function ReportPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Reports">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-medium dark:text-white">Reports</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-medium dark:text-white">Between Dates Report</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate reports on appointments between specific dates.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/admin/report/between-dates")}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Generate Report
              </button>
            </div>

            <div className="border dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <DollarSign className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-lg font-medium dark:text-white">Sales Report</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate reports on sales by month or year within a specific date range.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/admin/report/sales")}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Generate Report
              </button>
            </div>

            <div className="border dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-lg font-medium dark:text-white">Employee Wise Report</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate reports on employee performance and sample collection metrics.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/admin/report/employee-wise")}
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                Generate Report
              </button>
            </div>

            <div className="border dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <BarChart className="w-8 h-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-medium dark:text-white">Custom Reports</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate custom reports based on various parameters and metrics.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/admin/report")}
                className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
