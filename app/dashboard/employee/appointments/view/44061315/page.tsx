"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { Cog, Download } from "lucide-react"

// Sample appointment with updated status
const appointmentWithUpdatedStatus = {
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
  orderFinalStatus: "On the Way",
  adminRemark: "On the way",
  prescription: "prescription.pdf",
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
    {
      id: 2,
      remark: "On the way",
      status: "On the Way(by Lab)",
      time: "2020-01-19 10:56:21",
    },
  ],
}

export default function UpdatedAppointmentDetailPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [appointment, setAppointment] = useState<any>(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionData, setActionData] = useState({
    remark: "",
    status: "On the Way",
  })

  useEffect(() => {
    // Simulate API call to fetch appointment details
    const timer = setTimeout(() => {
      setAppointment(appointmentWithUpdatedStatus)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleTakeAction = () => {
    setShowActionModal(true)
  }

  const handleCloseModal = () => {
    setShowActionModal(false)
  }

  const handleUpdateStatus = () => {
    // In a real app, this would call an API to update the appointment status
    console.log(`Updating appointment status to ${actionData.status}`)

    // Update the local state to reflect changes
    const updatedAppointment = {
      ...appointment,
      orderFinalStatus: actionData.status,
      adminRemark: actionData.remark || actionData.status,
      trackingHistory: [
        ...appointment.trackingHistory,
        {
          id: appointment.trackingHistory.length + 1,
          remark: actionData.remark || actionData.status,
          status: `${actionData.status}(by Lab)`,
          time: new Date().toISOString().replace("T", " ").substring(0, 19),
        },
      ],
    }

    setAppointment(updatedAppointment)
    setShowActionModal(false)
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

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-medium text-blue-600">Appointment Details</h2>
        </div>

        <div className="p-4">
          {/* Appointment Information */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b py-3">
                <div className="text-gray-600">Appointment Number</div>
                <div>{appointment.appointmentNumber}</div>
              </div>
              <div className="border-b py-3">
                <div className="text-gray-600">Patient Name</div>
                <div>{appointment.patientName}</div>
              </div>
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
                <div>
                  <a href="#" className="text-blue-500 hover:underline flex items-center">
                    <Download className="h-4 w-4 mr-1" /> Download Prescription
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Test Details */}
          <div className="mb-6">
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
          <div className="mb-6">
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

          {/* Take Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleTakeAction}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Take Action
            </button>
          </div>
        </div>
      </div>

      {/* Take Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Take Action</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block font-medium mb-2">Remark:</label>
                <textarea
                  value={actionData.remark}
                  onChange={(e) => setActionData({ ...actionData, remark: e.target.value })}
                  className="w-full p-3 border rounded-md h-24"
                  placeholder="Enter remark..."
                ></textarea>
              </div>

              <div>
                <label className="block font-medium mb-2">Status:</label>
                <div className="relative">
                  <select
                    value={actionData.status}
                    onChange={(e) => setActionData({ ...actionData, status: e.target.value })}
                    className="w-full p-2 border rounded-md appearance-none pr-8"
                  >
                    <option value="On the Way">On the Way</option>
                    <option value="Sample Collected">Sample Collected</option>
                    <option value="Delivered to Lab">Delivered to Lab</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </EmployeeLayout>
  )
}
