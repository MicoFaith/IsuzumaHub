"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Cog } from "lucide-react"

// Sample appointment data
const appointmentDetails = {
  "44061315": {
    appointmentNumber: "44061315",
    patientName: "Anuj kumar",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    mobileNumber: "1234567890",
    email: "shdfhdsgfhg@gmail.com",
    appointmentDate: "2020-01-25",
    appointmentTime: "12:59",
    prescription: "NA",
    applyDate: "2020-01-19 10:35:42",
    status: "Not Updated Yet",
    adminRemark: "Not Updated Yet",
    updationDate: "Not Updated Yet",
    tests: [
      { id: 1, title: "HbA1c", price: 500 },
      { id: 2, title: "KFT", price: 500 },
    ],
    grandTotal: 1000,
  },
}

export default function AppointmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.id as string
  const [loading, setLoading] = useState(true)
  const [appointment, setAppointment] = useState<any>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")

  useEffect(() => {
    // Simulate API call to fetch appointment details
    const timer = setTimeout(() => {
      setAppointment(appointmentDetails[appointmentId as keyof typeof appointmentDetails] || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [appointmentId])

  const handleCancelOrder = () => {
    setShowCancelModal(true)
  }

  const handleUpdateOrder = () => {
    // In a real app, this would call an API to update the appointment status
    alert("Appointment cancelled successfully")
    setShowCancelModal(false)
    router.push("/dashboard/appointment-history")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-medium mb-4">Appointment Not Found</h2>
          <p>The requested appointment details could not be found.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium text-blue-600">Appointment Details</h2>
        </div>

        <div className="p-6">
          {/* Appointment Information */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Appointment Number</div>
                <div className="p-3">{appointment.appointmentNumber}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Patient Name</div>
                <div className="p-3">{appointment.patientName}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Gender</div>
                <div className="p-3">{appointment.gender}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Date of Birth</div>
                <div className="p-3">{appointment.dateOfBirth}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Mobile Number</div>
                <div className="p-3">{appointment.mobileNumber}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Email</div>
                <div className="p-3">{appointment.email}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Appointment Date</div>
                <div className="p-3">{appointment.appointmentDate}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Appointment Time</div>
                <div className="p-3">{appointment.appointmentTime}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Prescription</div>
                <div className="p-3">{appointment.prescription}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Date of Birth</div>
                <div className="p-3">{appointment.dateOfBirth}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Apply Date</div>
                <div className="p-3">{appointment.applyDate}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Status</div>
                <div className="p-3">{appointment.status}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Admin Remark</div>
                <div className="p-3">{appointment.adminRemark}</div>
              </div>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-50 p-3 font-medium border-b">Updation Date</div>
                <div className="p-3">{appointment.updationDate}</div>
              </div>
            </div>
          </div>

          {/* Test Details */}
          <div>
            <h3 className="text-lg font-medium text-blue-600 mb-4">Test Detail</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Test Title</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.tests.map((test: any, index: number) => (
                    <tr key={test.id} className="border-b">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{test.title}</td>
                      <td className="py-3 px-4">{test.price}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="py-3 px-4" colSpan={2}>
                      Grand Total
                    </td>
                    <td className="py-3 px-4">{appointment.grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Cancel this order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4 text-center">Cancel Appointment #{appointmentId}</h3>

            <div className="mb-4 border">
              <div className="grid grid-cols-2">
                <div className="p-3 border-r border-b font-medium">Appointment Number</div>
                <div className="p-3 border-b">{appointmentId}</div>
                <div className="p-3 border-r font-medium">Current Status</div>
                <div className="p-3">{appointment.status}</div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Reason for Cancel</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-3 border rounded-md h-32"
                placeholder="Enter reason for cancellation..."
              ></textarea>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleUpdateOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Update order
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
