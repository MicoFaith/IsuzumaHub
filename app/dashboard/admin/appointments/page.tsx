"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Eye } from "lucide-react"

// Sample appointment data
const appointmentData = [
  {
    id: "44061315",
    patientName: "Anuj kumar",
    mobileNumber: "1234567890",
    email: "shdfhdsgfhg@gmail.com",
    appointmentDate: "2020-01-25",
    status: "Not Updated Yet",
  },
  {
    id: "65072796151",
    patientName: "John Doe",
    mobileNumber: "9876543210",
    email: "john@example.com",
    appointmentDate: "2020-01-16",
    status: "Approved",
  },
  {
    id: "73208652",
    patientName: "Jane Smith",
    mobileNumber: "5555555555",
    email: "jane@example.com",
    appointmentDate: "2020-01-18",
    status: "Rejected",
  },
]

export default function AppointmentsPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()

  const handleViewAppointment = (appointmentId: string) => {
    router.push(`/dashboard/admin/appointments/${appointmentId}`)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Appointments">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Appointments</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Number</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Patient Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Mobile Number</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Appointment Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentData.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{appointment.id}</td>
                  <td className="py-3 px-4">{appointment.patientName}</td>
                  <td className="py-3 px-4">{appointment.mobileNumber}</td>
                  <td className="py-3 px-4">{appointment.email}</td>
                  <td className="py-3 px-4">{appointment.appointmentDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewAppointment(appointment.id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View Appointment Details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
