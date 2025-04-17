import { DashboardLayout } from "@/components/dashboard-layout"

export default function AppointmentHistoryPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Appointment History">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Your Appointment History</h2>
        <p>This page will display your past and upcoming laboratory appointments.</p>
      </div>
    </DashboardLayout>
  )
}
