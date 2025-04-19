"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Eye } from "lucide-react"

// Sample appointment data
const appointmentData = [
  {
    id: 1,
    appointmentNumber: "44061315",
    patientName: "Anuj kumar",
    mobileNumber: "1234567890",
    email: "shdfhdsgfhg@gmail.com",
    status: "Not Updated Yet",
  },
]

export default function AppointmentHistoryPage() {
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")
  const router = useRouter()

  const handleViewAppointment = (appointmentNumber: string) => {
    router.push(`/dashboard/appointment-history/${appointmentNumber}`)
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Appointment Details</h2>
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
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentData.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{appointment.id}</td>
                  <td className="py-3 px-4">{appointment.appointmentNumber}</td>
                  <td className="py-3 px-4">{appointment.patientName}</td>
                  <td className="py-3 px-4">{appointment.mobileNumber}</td>
                  <td className="py-3 px-4">{appointment.email}</td>
                  <td className="py-3 px-4">{appointment.status}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewAppointment(appointment.appointmentNumber)}
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
    </DashboardLayout>
  )
}
