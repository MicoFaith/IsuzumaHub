import { DashboardLayout } from "@/components/dashboard-layout"

export default function TestDetailPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="View Test Detail">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Test Details</h2>
        <p>This page will display detailed information about your laboratory tests.</p>
      </div>
    </DashboardLayout>
  )
}
