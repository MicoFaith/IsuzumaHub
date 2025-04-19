"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

export default function AppointmentsPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()

  const handleViewNewAppointments = () => {
    router.push("/dashboard/admin/appointments/new")
  }

  const handleViewApprovedAppointments = () => {
    router.push("/dashboard/admin/appointments/approved")
  }

  const handleViewRejectedAppointments = () => {
    router.push("/dashboard/admin/appointments/rejected")
  }

  const handleViewCancelledAppointments = () => {
    router.push("/dashboard/admin/appointments/cancelled")
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Appointments">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Appointments</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-medium">New Appointments</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View and manage new appointment requests that need to be approved or rejected.
              </p>
              <button
                onClick={handleViewNewAppointments}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View New Appointments
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-lg font-medium">Approved Appointments</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View and manage appointments that have been approved and are scheduled.
              </p>
              <button
                onClick={handleViewApprovedAppointments}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                View Approved Appointments
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <XCircle className="w-8 h-8 text-red-500 mr-3" />
                <h3 className="text-lg font-medium">Rejected Appointments</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View appointments that have been rejected and the reasons for rejection.
              </p>
              <button
                onClick={handleViewRejectedAppointments}
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                View Rejected Appointments
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-lg font-medium">Cancelled Appointments</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View appointments that have been cancelled by users or by the system.
              </p>
              <button
                onClick={handleViewCancelledAppointments}
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              >
                View Cancelled Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
