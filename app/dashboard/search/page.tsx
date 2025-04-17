import { DashboardLayout } from "@/components/dashboard-layout"

export default function SearchPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Search">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Search</h2>
        <p>This page will allow you to search for tests, appointments, and reports.</p>
      </div>
    </DashboardLayout>
  )
}
