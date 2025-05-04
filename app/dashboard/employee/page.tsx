"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/employee-layout"
import { Cog } from "lucide-react"
import axios from "axios"

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true)
  const [employeeName, setEmployeeName] = useState("Rakesh Jha")
  const [employeeEmail, setEmployeeEmail] = useState("rakesh@gmail.com")
  const router = useRouter()
  const [profileLoading, setProfileLoading] = useState(true)
  const [error, setError] = useState("")

  // Statistics data
  const [stats, setStats] = useState({
    newAssignAppointments: 1,
    sampleCollected: 0,
    sampleSentToLab: 1,
    totalAppointments: 3,
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/employee/me", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const { email, fullName } = response.data;
          setEmployeeEmail(email);
          setEmployeeName(fullName);
        } else {
          setError("Failed to fetch profile.");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "An error occurred while fetching profile."
        );
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleViewNewAssignAppointments = () => {
    router.push("/dashboard/employee/appointments/new")
  }

  const handleViewSampleCollected = () => {
    router.push("/dashboard/employee/appointments/collected")
  }

  const handleViewSampleSentToLab = () => {
    router.push("/dashboard/employee/appointments/sent")
  }

  const handleViewTotalAppointments = () => {
    router.push("/dashboard/employee/appointments/total")
  }

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin">
          <Cog className="h-8 w-8 text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* New Assign Appointment Card */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-500">{stats.newAssignAppointments}</div>
            <div className="text-gray-600 mt-2">Total New Assign Appointment</div>
          </div>
          <button
            onClick={handleViewNewAssignAppointments}
            className="block w-full py-2 text-center text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            View Detail
          </button>
        </div>

        {/* Sample Collected Card */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="text-3xl font-bold text-red-500">{stats.sampleCollected}</div>
            <div className="text-gray-600 mt-2">Total Sample Collected</div>
          </div>
          <button
            onClick={handleViewSampleCollected}
            className="block w-full py-2 text-center text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            View Detail
          </button>
        </div>

        {/* Sample Sent to Lab Card */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="text-3xl font-bold text-green-500">{stats.sampleSentToLab}</div>
            <div className="text-gray-600 mt-2">Total Sample Sent to Lab</div>
          </div>
          <button
            onClick={handleViewSampleSentToLab}
            className="block w-full py-2 text-center text-white bg-green-500 hover:bg-green-600 transition-colors"
          >
            View Detail
          </button>
        </div>

        {/* Total Appointment Card */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="text-3xl font-bold text-yellow-500">{stats.totalAppointments}</div>
            <div className="text-gray-600 mt-2">Total Appointment</div>
          </div>
          <button
            onClick={handleViewTotalAppointments}
            className="block w-full py-2 text-center text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
          >
            View Detail
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
    </EmployeeLayout>
  )
}