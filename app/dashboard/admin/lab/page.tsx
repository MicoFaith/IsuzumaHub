"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"

export default function LabManagementPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Lab Management">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Lab Management</h2>
        </div>

        <div className="p-6">
          <p>This page will allow you to manage lab settings and operations.</p>
        </div>
      </div>
    </AdminLayout>
  )
}
