"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"

export default function RegUsersPage() {
  const [userName] = useState("Test1")
  const [userEmail] = useState("adminuser@gmail.com")

  return (
    <AdminLayout userName={userName} userEmail={userEmail} pageTitle="Registered Users">
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium">Registered Users</h2>
        </div>

        <div className="p-6">
          <p>This page will display all registered users.</p>
        </div>
      </div>
    </AdminLayout>
  )
}
