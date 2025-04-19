<<<<<<< HEAD
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Eye } from "lucide-react"

// Sample test data
const testData = [
  { id: 1, title: "HbA1c", price: 500 },
  { id: 2, title: "TSH", price: 200 },
  { id: 3, title: "KFT", price: 500 },
  { id: 4, title: "Dengue Antigen NS1, IgG & IgM", price: 500 },
  { id: 5, title: "Urine R/M Measure", price: 110 },
  { id: 6, title: "Lipid Profile", price: 300 },
  { id: 7, title: "cxbcsdf", price: 1000 },
]

export default function TestDetailPage() {
  const router = useRouter()
  const [userName] = useState("Test")
  const [userEmail] = useState("test-user@gmail.com")

  const handleViewTest = (testId: number) => {
    router.push(`/dashboard/test-detail/${testId}`)
  }

  return (
    <DashboardLayout userName={userName} userEmail={userEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Test Details</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium text-gray-600">S No</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Test Title</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Price</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {testData.map((test) => (
                <tr key={test.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{test.id}</td>
                  <td className="py-3 px-4">{test.title}</td>
                  <td className="py-3 px-4">{test.price}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleViewTest(test.id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View Test Details"
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
                <th className="py-3 px-4 text-left font-medium text-gray-600">Test Title</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Price</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
=======
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TestDetailPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="View Test Detail">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Test Details</h2>
        <p>This page will display detailed information about your laboratory tests.</p>
>>>>>>> 78240d95df05eb70a7c1f09f313a3f9211787d64
      </div>
    </DashboardLayout>
  )
}
