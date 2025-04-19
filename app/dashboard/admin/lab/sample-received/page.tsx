"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Eye, Cog } from "lucide-react"

export default function SampleReceivedPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const [loading, setLoading] = useState(true)
  const [samples, setSamples] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Simulate API call to fetch sample data
    const timer = setTimeout(() => {
      setSamples([
        {
          id: 1,
          appointmentNumber: "44061315",
          patientName: "Anuj kumar",
          mobileNumber: "1234567890",
          email: "shdfhdsgfhg@gmail.com",
          status: "Sample Received",
          employeeId: "Lab1124",
          employeeName: "Rakesh Jha",
          receivedDate: "2020-01-20",
        },
        {
          id: 2,
          appointmentNumber: "648548285",
          patientName: "Sunita Verma",
          mobileNumber: "7987897987",
          email: "sunita@gmail.com",
          status: "Sample Received",
          employeeId: "Lab1124",
          employeeName: "Rakesh Jha",
          receivedDate: "2020-01-21",
        },
      ])
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleViewSample = (appointmentNumber: string) => {
    router.push(`/dashboard/admin/lab/sample-received/${appointmentNumber}`)
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
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Sample Received">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Sample Received</h2>
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
                <th className="py-3 px-4 text-left font-medium text-gray-600">Employee</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample, index) => (
                <tr key={sample.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{sample.appointmentNumber}</td>
                  <td className="py-3 px-4">{sample.patientName}</td>
                  <td className="py-3 px-4">{sample.mobileNumber}</td>
                  <td className="py-3 px-4">{sample.email}</td>
                  <td className="py-3 px-4">{sample.employeeName}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {sample.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewSample(sample.appointmentNumber)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View Sample Details"
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
                <th className="py-3 px-4 text-left font-medium text-gray-600">Employee</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
