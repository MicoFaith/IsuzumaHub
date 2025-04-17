import { DashboardLayout } from "@/components/dashboard-layout"

export default function MedicalReportPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Medical Reports">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Your Medical Reports</h2>
        <p>This page will display your laboratory test results and medical reports.</p>
      </div>
    </DashboardLayout>
  )
}
