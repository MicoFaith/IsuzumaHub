"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { Eye } from "lucide-react"

// Sample appointment data
const appointmentData = [
  {
    id: 1,
    appointmentNumber: "865918268",
    patientName: "Jagdish Mishra",
    mobileNumber: "4789754454",
    email: "jag@gmail.com",
    status: "Delivered to Lab",
  },
  {
    id: 2,
    appointmentNumber: "648548285",
    patientName: "Sunita Verma",
    mobileNumber: "7987897987",
    email: "sunita@gmail.com",
    status: "Report Uploaded",
  },
  {
    id: 3,
    appointmentNumber: "44061315",
    patientName: "Anuj kumar",
    mobileNumber: "1234567890",
    email: "shdfhdsgfhg@gmail.com",
    status: "On the Way",
  },
]

export default function TotalAppointmentsPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const router = useRouter()

  const handleViewAppointment = (appointmentNumber: string) => {
    router.push(`/dashboard/employee/appointments/view/${appointmentNumber}`)
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Delivered to Lab":
        return "bg-blue-100 text-blue-800"
      case "Report Uploaded":
        return "bg-green-100 text-green-800"
      case "On the Way":
        return "bg-yellow-100 text-yellow-800"
      case "Sample Collected":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Total Assign Appointment</h2>
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
              {appointmentData.map((appointment, index) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{appointment.appointmentNumber}</td>
                  <td className="py-3 px-4">{appointment.patientName}</td>
                  <td className="py-3 px-4">{appointment.mobileNumber}</td>
                  <td className="py-3 px-4">{appointment.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
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
    </EmployeeLayout>
  )
}
