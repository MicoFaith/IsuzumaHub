"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"

export default function SampleCollectionReportPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API to generate the report
    // For demo purposes, we'll navigate to the results page
    router.push(`/dashboard/employee/report/sample-collection/results?from=${fromDate}&to=${toDate}`)
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Report">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Sample Collection Report</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="fromDate" className="block text-gray-600 mb-2">
                  From Date:
                </label>
                <input
                  type="text"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="toDate" className="block text-gray-600 mb-2">
                  To Date:
                </label>
                <input
                  type="text"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </EmployeeLayout>
  )
}
