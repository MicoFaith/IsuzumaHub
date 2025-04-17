import { DashboardLayout } from "@/components/dashboard-layout"

export default function BookAppointmentPage() {
  return (
    <DashboardLayout userName="Test" userEmail="test-user@gmail.com" pageTitle="Book Appointment">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-medium mb-4">Book a New Appointment</h2>
        <p>This page will allow you to schedule new laboratory appointments.</p>
      </div>
    </DashboardLayout>
  )
}
