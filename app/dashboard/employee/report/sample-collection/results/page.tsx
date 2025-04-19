"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { Cog } from "lucide-react"

export default function SampleCollectionResultsPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const [loading, setLoading] = useState(true)
  const [reportData, setReportData] = useState<any[]>([])
  const searchParams = useSearchParams()

  const fromDate = searchParams.get("from") || "2020-01-01"
  const toDate = searchParams.get("to") || "2020-01-31"

  // Format dates for display
  const formatDate = (dateStr: string) => {
    // This is a simple function to format the date
    // In a real app, you would use a proper date library
    return dateStr
  }

  useEffect(() => {
    // Simulate API call to fetch report data
    const timer = setTimeout(() => {
      setReportData([
        {
          id: 1,
          employeeId: "Lab1124",
          name: "Rakesh Jha",
          sampleAssign: 3,
          sampleCollected: 3,
          remainingSample: 0,
        },
      ])
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [fromDate, toDate])

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
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Report">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Sample Collected Reports</h2>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg">
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
                {reportData.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{item.employeeId}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.sampleAssign}</td>
                    <td className="py-3 px-4">{item.sampleCollected}</td>
                    <td className="py-3 px-4">{item.remainingSample}</td>
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
      </div>
    </EmployeeLayout>
  )
}
