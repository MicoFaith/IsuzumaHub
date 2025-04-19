"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"

export default function BetweenDatesReportPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would validate dates and then navigate to results
    router.push(`/dashboard/admin/report/between-dates/results?from=${fromDate}&to=${toDate}`)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Reports">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Between Dates Report of Appointments</h2>
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
