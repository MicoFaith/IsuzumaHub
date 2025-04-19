"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { Cog, Filter, Download, Calendar, User, MapPin, Phone, FileText } from "lucide-react"

// Define appointment type
interface Appointment {
  id: string
  patientName: string
  patientContact: string
  address: string
  testType: string
  date: string
  time: string
  status: string
}

export default function AppointmentDetails() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")

  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "new"

  // Page title mapping
  const titleMap: Record<string, string> = {
    new: "New Assign Appointments",
    collected: "Sample Collected Appointments",
    sent: "Sample Sent to Lab Appointments",
    total: "Total Appointments",
  }

  // Status color mapping
  const statusColorMap: Record<string, string> = {
    Assigned: "bg-blue-100 text-blue-800",
    "On the Way": "bg-yellow-100 text-yellow-800",
    "Sample Collected": "bg-green-100 text-green-800",
    "Sent to Lab": "bg-purple-100 text-purple-800",
    "Report Delivered": "bg-gray-100 text-gray-800",
    Cancelled: "bg-red-100 text-red-800",
  }

  // Simulate loading data
  useEffect(() => {
    // Mock data based on type
    const mockData: Record<string, Appointment[]> = {
      new: [
        {
          id: "APT44061315",
          patientName: "John Doe",
          patientContact: "+1 234-567-8901",
          address: "123 Main St, New York, NY",
          testType: "Blood Test",
          date: "2023-05-15",
          time: "10:00 AM",
          status: "Assigned",
        },
      ],
      collected: [
        {
          id: "APT44061316",
          patientName: "Jane Smith",
          patientContact: "+1 234-567-8902",
          address: "456 Oak St, Boston, MA",
          testType: "COVID-19 Test",
          date: "2023-05-16",
          time: "11:30 AM",
          status: "Sample Collected",
        },
      ],
      sent: [
        {
          id: "APT44061317",
          patientName: "Robert Johnson",
          patientContact: "+1 234-567-8903",
          address: "789 Pine St, Chicago, IL",
          testType: "Lipid Profile",
          date: "2023-05-17",
          time: "09:15 AM",
          status: "Sent to Lab",
        },
        {
          id: "APT44061318",
          patientName: "Emily Davis",
          patientContact: "+1 234-567-8904",
          address: "101 Elm St, San Francisco, CA",
          testType: "Complete Blood Count",
          date: "2023-05-18",
          time: "02:45 PM",
          status: "Sent to Lab",
        },
      ],
      total: [
        {
          id: "APT44061315",
          patientName: "John Doe",
          patientContact: "+1 234-567-8901",
          address: "123 Main St, New York, NY",
          testType: "Blood Test",
          date: "2023-05-15",
          time: "10:00 AM",
          status: "Assigned",
        },
        {
          id: "APT44061316",
          patientName: "Jane Smith",
          patientContact: "+1 234-567-8902",
          address: "456 Oak St, Boston, MA",
          testType: "COVID-19 Test",
          date: "2023-05-16",
          time: "11:30 AM",
          status: "Sample Collected",
        },
        {
          id: "APT44061317",
          patientName: "Robert Johnson",
          patientContact: "+1 234-567-8903",
          address: "789 Pine St, Chicago, IL",
          testType: "Lipid Profile",
          date: "2023-05-17",
          time: "09:15 AM",
          status: "Sent to Lab",
        },
      ],
    }

    setTimeout(() => {
      setAppointments(mockData[type] || [])
      setFilteredAppointments(mockData[type] || [])
      setLoading(false)
    }, 1000)
  }, [type])

  // Filter appointments
  useEffect(() => {
    let result = [...appointments]

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((apt) => apt.status === filterStatus)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (apt) =>
          apt.patientName.toLowerCase().includes(term) ||
          apt.id.toLowerCase().includes(term) ||
          apt.testType.toLowerCase().includes(term),
      )
    }

    setFilteredAppointments(result)
  }, [filterStatus, searchTerm, appointments])

  // Handle view appointment details
  const handleViewAppointment = (id: string) => {
    window.location.href = `/dashboard/employee/appointments/view/${id}`
  }

  // Handle export to CSV
  const handleExport = () => {
    // In a real app, this would generate and download a CSV file
    alert("Export functionality would be implemented here")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <EmployeeLayout
      employeeName={employeeName}
      employeeEmail={employeeEmail}
      pageTitle={titleMap[type] || "Appointment Details"}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            {titleMap[type] || "Appointment Details"}
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, ID or test..."
                className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  className="pl-10 pr-4 py-2 border rounded-md appearance-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Assigned">Assigned</option>
                  <option value="On the Way">On the Way</option>
                  <option value="Sample Collected">Sample Collected</option>
                  <option value="Sent to Lab">Sent to Lab</option>
                  <option value="Report Delivered">Report Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No appointments found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">There are no appointments matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Appointment ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Patient Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Test Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{appointment.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-400" />
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {appointment.patientContact}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {appointment.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">{appointment.testType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{appointment.date}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[appointment.status] || "bg-gray-100 text-gray-800"}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewAppointment(appointment.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </EmployeeLayout>
  )
}

// Search icon component
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
