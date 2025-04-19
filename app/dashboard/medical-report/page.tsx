"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Download, Eye } from "lucide-react"

// Sample report data
const reportData = [
  {
    id: "R44061315",
    testName: "HbA1c",
    testDate: "2023-05-15",
    reportDate: "2023-05-16",
    status: "Available",
  },
  {
    id: "R44061316",
    testName: "Lipid Profile",
    testDate: "2023-06-20",
    reportDate: "2023-06-21",
    status: "Available",
  },
  {
    id: "R44061317",
    testName: "Dengue Antigen NS1, IgG & IgM",
    testDate: "2023-07-05",
    reportDate: "Pending",
    status: "Processing",
  },
]

export default function MedicalReportPage() {
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Medical Reports</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">Report ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Test Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Test Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Report Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{report.id}</td>
                  <td className="py-3 px-4">{report.testName}</td>
                  <td className="py-3 px-4">{report.testDate}</td>
                  <td className="py-3 px-4">{report.reportDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {report.status === "Available" && (
                        <>
                          <button className="text-blue-500 hover:text-blue-700" title="View Report">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-green-500 hover:text-green-700" title="Download Report">
                            <Download className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
