"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin-layout"
import { Cog, User, Calendar, FileText, AlertCircle, CheckCircle, XCircle, Database, Eye } from "lucide-react"

// Sample notification data
const notificationData = [
  {
    id: 1,
    type: "New Appointment",
    number: "65072796151",
    date: "2020-01-16",
    time: "19:08:48",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "New Appointment",
    number: "73208652",
    date: "2020-01-18",
    time: "20:18:20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "New Appointment",
    number: "44061315",
    date: "2020-01-19",
    time: "10:35:42",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Stats data
const statsData = [
  {
    id: 1,
    count: 4,
    title: "Total Reg Users",
    icon: <User className="w-6 h-6 text-blue-500" />,
    color: "blue",
    link: "reg-users",
  },
  {
    id: 2,
    count: 3,
    title: "Total New Appointment",
    icon: <Calendar className="w-6 h-6 text-red-500" />,
    color: "red",
    link: "appointments",
  },
  {
    id: 3,
    count: 2,
    title: "Total Approved Appointment",
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    color: "green",
    link: "appointments",
  },
  {
    id: 4,
    count: 1,
    title: "Total Rejected Appointment",
    icon: <XCircle className="w-6 h-6 text-yellow-500" />,
    color: "yellow",
    link: "appointments",
  },
  {
    id: 5,
    count: 0,
    title: "Appointment Cancelled",
    icon: <AlertCircle className="w-6 h-6 text-blue-500" />,
    color: "blue",
    link: "appointments",
  },
  {
    id: 6,
    count: 2,
    title: "Total Sample Received",
    icon: <Database className="w-6 h-6 text-red-500" />,
    color: "red",
    link: "lab",
  },
  {
    id: 7,
    count: 1,
    title: "Total Report Uploaded",
    icon: <FileText className="w-6 h-6 text-green-500" />,
    color: "green",
    link: "report",
  },
  {
    id: 8,
    count: 3,
    title: "Total Employee",
    icon: <User className="w-6 h-6 text-yellow-500" />,
    color: "yellow",
    link: "lab-employee",
  },
]

export default function AdminDashboardPage() {
  const [userName, setUserName] = useState("Test1")
  const [userEmail, setUserEmail] = useState("adminuser@gmail.com")
  const [loading, setLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleViewAppointment = (appointmentNumber: string) => {
    window.location.href = `/dashboard/admin/appointments/${appointmentNumber}`
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
    <AdminLayout userName={userName} userEmail={userEmail}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats Cards */}
        {statsData.map((stat) => (
          <div key={stat.id} className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{stat.count}</div>
                <div className="text-gray-400">{stat.icon}</div>
              </div>
              <div className="text-gray-600 mt-2">{stat.title}</div>
            </div>
            <Link
              href={`/dashboard/admin/${stat.link}`}
              className={`block w-full py-2 text-center text-white bg-${stat.color}-500 hover:bg-${stat.color}-600 transition-colors`}
            >
              View Detail
            </Link>
          </div>
        ))}
      </div>

      {/* Notifications Panel */}
      <div className="mt-6 bg-white rounded-md shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Recent Notifications</h2>
        <div className="space-y-4">
          {notificationData.map((notification) => (
            <div key={notification.id} className="flex items-start p-3 border rounded-md hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src={notification.avatar || "/placeholder.svg"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{notification.type}</div>
                <div className="text-sm text-gray-500">
                  {notification.number} at {notification.date} {notification.time}
                </div>
              </div>
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleViewAppointment(notification.number)}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
