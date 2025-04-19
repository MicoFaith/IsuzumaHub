"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Cog } from "lucide-react"

// Sample appointment details data
const appointmentDetails = {
  "917423456": {
    appointmentNumber: "917423456",
    patientName: "Ram",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    mobileNumber: "8456546546",
    email: "ram@gmail.com",
    appointmentDate: "2020-01-25",
    appointmentTime: "12:59",
    assignTo: "Lab1124",
    applyDate: "2020-01-19 10:35:42",
    orderFinalStatus: "Your Appointment has been approved",
    adminRemark: "Approved",
    prescription: "NA",
    tests: [
      { id: 1, title: "HbA1c", price: 500 },
      { id: 2, title: "KFT", price: 500 },
    ],
    grandTotal: 1000,
    trackingHistory: [
      {
        id: 1,
        remark: "Approved",
        status: "Approved(by Lab)",
        time: "2020-01-19 10:51:36",
      },
    ],
  },
  "987105601": {
    appointmentNumber: "987105601",
    patientName: "Sonam",
    gender: "Female",
    dateOfBirth: "1992-05-15",
    mobileNumber: "4554545455",
    email: "sonam@gmail.com",
    appointmentDate: "2020-01-26",
    appointmentTime: "10:30",
    assignTo: "Lab1125",
    applyDate: "2020-01-20 09:15:30",
    orderFinalStatus: "Your Appointment has been approved",
    adminRemark: "Approved",
    prescription: "NA",
    tests: [
      { id: 1, title: "TSH", price: 200 },
      { id: 2, title: "Lipid Profile", price: 300 },
    ],
    grandTotal: 500,
    trackingHistory: [
      {
        id: 1,
        remark: "Approved",
        status: "Approved(by Lab)",
        time: "2020-01-20 11:20:45",
      },
    ],
  },
  "44061315": {
    appointmentNumber: "44061315",
    patientName: "Anuj kumar",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    mobileNumber: "1234567890",
    email: "shdfhdsgfhg@gmail.com",
    appointmentDate: "2020-01-25",
    appointmentTime: "12:59",
    assignTo: "Lab1124",
    applyDate: "2020-01-19 10:35:42",
    orderFinalStatus: "Your Appointment has been approved",
    adminRemark: "Approved",
    prescription: "NA",
    tests: [
      { id: 1, title: "HbA1c", price: 500 },
      { id: 2, title: "KFT", price: 500 },
    ],
    grandTotal: 1000,
    trackingHistory: [
      {
        id: 1,
        remark: "Approved",
        status: "Approved(by Lab)",
        time: "2020-01-19 10:51:36",
      },
    ],
  },
}

export default function AppointmentDetailPage() {
  const params = useParams()
  const appointmentId = params.id as string
  const [loading, setLoading] = useState(true)
  const [appointment, setAppointment] = useState<any>(null)
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")

  useEffect(() => {
    // Simulate API call to fetch appointment details
    const timer = setTimeout(() => {
      setAppointment(appointmentDetails[appointmentId as keyof typeof appointmentDetails] || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [appointmentId])

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
      <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-medium mb-4">Appointment Not Found</h2>
          <p>The requested appointment details could not be found.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        {/* Patient and Appointment Information */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-0">
            <div className="border-b py-3">
              <div className="text-gray-600">Gender</div>
              <div>{appointment.gender}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Date of Birth</div>
              <div>{appointment.dateOfBirth}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Mobile Number</div>
              <div>{appointment.mobileNumber}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Email</div>
              <div>{appointment.email}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Appointment Date</div>
              <div>{appointment.appointmentDate}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Appointment Time</div>
              <div>{appointment.appointmentTime}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Assign To</div>
              <div>{appointment.assignTo}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Date of Birth</div>
              <div>{appointment.dateOfBirth}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Apply Date</div>
              <div>{appointment.applyDate}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Order Final Status</div>
              <div>{appointment.orderFinalStatus}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Admin Remark</div>
              <div>{appointment.adminRemark}</div>
            </div>
            <div className="border-b py-3">
              <div className="text-gray-600">Prescription</div>
              <div>{appointment.prescription}</div>
            </div>
          </div>
        </div>

        {/* Test Details */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-blue-600 mb-4">Test Detail</h3>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left font-medium text-gray-600">S.No</th>
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
        </div>

        {/* Tracking History */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-blue-600 mb-4">Tracking History</h3>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-3 px-4 text-left font-medium text-gray-600">#</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Remark</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {appointment.trackingHistory.map((history: any) => (
                  <tr key={history.id} className="border-b">
                    <td className="py-3 px-4">{history.id}</td>
                    <td className="py-3 px-4">{history.remark}</td>
                    <td className="py-3 px-4">{history.status}</td>
                    <td className="py-3 px-4">{history.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
