"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Database, FileText } from "lucide-react"

export default function LabManagementPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Lab Management">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Lab Management</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Database className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-medium">Sample Received</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View and manage samples that have been received from patients for testing.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/admin/lab/sample-received")}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Sample Received
              </button>
            </div>

            <div className="border rounded-md p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-lg font-medium">Uploaded Reports</h3>
              </div>
              <p className="text-gray-600 mb-6">
                View and manage test reports that have been uploaded and are ready for patients.
              </p>
              <button
                onClick={() => handleNavigate("/dashboard/admin/lab/uploaded-reports")}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                View Uploaded Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
