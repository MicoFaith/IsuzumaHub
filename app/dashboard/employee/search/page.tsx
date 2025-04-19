"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { Eye } from "lucide-react"

export default function SearchPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API to search for appointments
    // For demo purposes, we'll show a result if the search contains "anuj"
    if (searchQuery.toLowerCase().includes("anuj")) {
      setSearchResults([
        {
          id: 1,
          appointmentNumber: "44061315",
          patientName: "Anuj kumar",
          mobileNumber: "1234567890",
          email: "shdfhdsgfhg@gmail.com",
          status: "Sample Collected",
        },
      ])
    } else {
      setSearchResults([])
    }

    setHasSearched(true)
  }

  const handleViewAppointment = (appointmentNumber: string) => {
    router.push(`/dashboard/employee/appointments/view/${appointmentNumber}`)
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Search">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Search by Appointment No./Name/Mobile No.</h2>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Appointment No./Name/Mobile No."
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {hasSearched && searchQuery && (
            <>
              {searchResults.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">Result against "{searchQuery}" keyword</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Number</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Patient Name</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Mobile Number</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((result, index) => (
                          <tr key={result.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4">{result.appointmentNumber}</td>
                            <td className="py-3 px-4">{result.patientName}</td>
                            <td className="py-3 px-4">{result.mobileNumber}</td>
                            <td className="py-3 px-4">{result.email}</td>
                            <td className="py-3 px-4">{result.status}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleViewAppointment(result.appointmentNumber)}
                                className="text-blue-500 hover:text-blue-700"
                                title="View Appointment Details"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Number</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Patient Name</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Mobile Number</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                          <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </EmployeeLayout>
  )
}
