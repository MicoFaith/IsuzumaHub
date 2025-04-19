"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"

export default function SalesReportPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [fromDate, setFromDate] = useState("01-01-2020")
  const [toDate, setToDate] = useState("")
  const [reportType, setReportType] = useState("month")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would validate dates and then navigate to results
    router.push(`/dashboard/admin/report/sales/results?from=${fromDate}&to=${toDate}&type=${reportType}`)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Reports">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Sales Report</h2>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="flex items-center">
                <label htmlFor="fromDate" className="w-32 text-gray-600">
                  From Date:
                </label>
                <input
                  type="text"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="flex-1 p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="toDate" className="w-32 text-gray-600">
                  To Date:
                </label>
                <input
                  type="text"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  className="flex-1 p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="w-32 text-gray-600">Request Type:</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reportType"
                      value="month"
                      checked={reportType === "month"}
                      onChange={() => setReportType("month")}
                      className="mr-2"
                    />
                    Month wise
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="reportType"
                      value="year"
                      checked={reportType === "year"}
                      onChange={() => setReportType("year")}
                      className="mr-2"
                    />
                    Year wise
                  </label>
                </div>
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
    </AdminLayout>
  )
}
