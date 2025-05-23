"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

export default function BetweenDatesResultsPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<any[]>([])
  const searchParams = useSearchParams()

  const fromDate = searchParams.get("from") || ""
  const toDate = searchParams.get("to") || ""

  useEffect(() => {
    // Simulate API call to fetch appointment data
    const timer = setTimeout(() => {
      setAppointments([
        {
          id: 1,
          appointmentNumber: "44061315",
          patientName: "Anuj kumar",
          mobileNumber: "1234567890",
          email: "shdfhdsgfhg@gmail.com",
          appointmentDate: "2020-01-25",
          status: "Report Uploaded",
        },
        {
          id: 2,
          appointmentNumber: "648548285",
          patientName: "Sunita Verma",
          mobileNumber: "7987897987",
          email: "sunita@gmail.com",
          appointmentDate: "2020-01-21",
          status: "Report Uploaded",
        },
        {
          id: 3,
          appointmentNumber: "865918268",
          patientName: "Jagdish Mishra",
          mobileNumber: "4789754454",
          email: "jag@gmail.com",
          appointmentDate: "2020-01-18",
          status: "Sample Collected",
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
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Reports">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Appointment Report</h2>
          <p className="text-sm text-gray-500 mt-2">
            Report from {fromDate} to {toDate}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Number</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Patient Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Mobile Number</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{appointment.appointmentNumber}</td>
                  <td className="py-3 px-4">{appointment.patientName}</td>
                  <td className="py-3 px-4">{appointment.mobileNumber}</td>
                  <td className="py-3 px-4">{appointment.email}</td>
                  <td className="py-3 px-4">{appointment.appointmentDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "Report Uploaded"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
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
                <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
