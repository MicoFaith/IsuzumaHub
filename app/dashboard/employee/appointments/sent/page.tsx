"use client"

import { useState } from "react"
import { EmployeeLayout } from "@/components/employee-layout"

export default function SampleSentPage() {
  const [employeeName] = useState("Rakesh Jha")
  const [employeeEmail] = useState("rakesh@gmail.com")

  return (
    <EmployeeLayout employeeName={employeeName} employeeEmail={employeeEmail} pageTitle="Dashboard">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Sample Sent to Lab</h2>
        </div>

        <div className="p-6 text-center text-gray-500">
          <p>No samples currently sent to lab.</p>
        </div>
      </div>
    </EmployeeLayout>
  )
}
